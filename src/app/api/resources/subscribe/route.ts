import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getResourceBySlug } from "@/lib/content";
import { subscribeToList } from "@/lib/email-provider";
import { getAssessmentBySlug } from "@/lib/assessments";
import type { AssessmentResult } from "@/lib/assessment-scoring";
import { CONTACT_EMAIL } from "@/lib/constants";

interface ResourceSubscribePayload {
  firstName?: string;
  email?: string;
  role?: string;
  resourceSlug?: string;
  /** Present when the submission came from the interactive assessment flow rather than a plain download form. */
  assessmentScore?: AssessmentResult;
}

export async function POST(request: Request) {
  const body = (await request.json()) as ResourceSubscribePayload;
  const { firstName, email, role, resourceSlug, assessmentScore } = body;

  if (!firstName || !email || !resourceSlug) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const resource = getResourceBySlug(resourceSlug);
  if (!resource) {
    return NextResponse.json({ error: "Unknown resource." }, { status: 404 });
  }

  // Best-effort: add the subscriber to the configured email marketing
  // platform's list. Not wired up yet, misconfigured, or briefly down —
  // none of that should block delivering the resource itself below.
  const listResult = await subscribeToList({
    firstName,
    email,
    role,
    resourceSlug: resource.slug,
    resourceTitle: resource.frontmatter.title,
    assessmentScore: assessmentScore?.overall,
  });
  if (!listResult.ok && !listResult.skipped) {
    console.error(`Failed to add ${email} to email list for ${resource.slug}: ${listResult.error}`);
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set — resource cannot be delivered.");
    return NextResponse.json({ error: "Email delivery is not configured." }, { status: 500 });
  }

  const downloadUrl = new URL(resource.frontmatter.downloadFile, request.url).toString();
  const resend = new Resend(apiKey);

  const { subject, text } = buildDeliveryEmail({
    firstName,
    resourceTitle: resource.frontmatter.title,
    resourceSlug: resource.slug,
    downloadUrl,
    assessmentScore,
  });

  const { error } = await resend.emails.send({
    from: "Reiziger Ashu <hello@reizigerashu.com>",
    to: email,
    replyTo: CONTACT_EMAIL,
    subject,
    text,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Failed to send resource." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

function buildDeliveryEmail({
  firstName,
  resourceTitle,
  resourceSlug,
  downloadUrl,
  assessmentScore,
}: {
  firstName: string;
  resourceTitle: string;
  resourceSlug: string;
  downloadUrl: string;
  assessmentScore?: AssessmentResult;
}): { subject: string; text: string } {
  if (!assessmentScore) {
    return {
      subject: `Your ${resourceTitle} is on its way`,
      text: `Hi ${firstName},\n\nHere's your copy of the ${resourceTitle}:\n${downloadUrl}\n\nIf you have any questions, just reply to this email.\n\n— Reiziger Ashu`,
    };
  }

  const assessment = getAssessmentBySlug(resourceSlug);
  const breakdown = assessmentScore.byArea
    .map(({ area, score }) => {
      const label = assessment?.areas.find((a) => a.id === area)?.label ?? area;
      return `- ${label}: ${Math.round(score)} / 100`;
    })
    .join("\n");

  return {
    subject: `Your Brand Audit Score: ${Math.round(assessmentScore.overall)} / 100`,
    text: `Hi ${firstName},\n\nHere's your full Brand Audit breakdown:\n\nOverall: ${Math.round(assessmentScore.overall)} / 100\n${breakdown}\n\nAnd here's your copy of the ${resourceTitle}:\n${downloadUrl}\n\nIf you have any questions, just reply to this email.\n\n— Reiziger Ashu`,
  };
}
