import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getResourceBySlug } from "@/lib/content";
import { subscribeToList } from "@/lib/email-provider";
import { getAssessmentBySlug } from "@/lib/assessments";
import type { AssessmentResult } from "@/lib/assessment-scoring";
import { generateAssessmentResultsPdf } from "@/lib/generateAssessmentResultsPdf";
import { CONTACT_EMAIL, SITE_URL } from "@/lib/constants";

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

  const resend = new Resend(apiKey);

  // Resources with an on-site assessment never hand out the static guide
  // PDF — the visitor's own scored results are generated on the fly and
  // emailed as a PDF attachment instead.
  if (assessmentScore) {
    const assessment = getAssessmentBySlug(resource.slug);
    if (!assessment) {
      return NextResponse.json({ error: "Unknown assessment." }, { status: 404 });
    }

    const pdfBytes = await generateAssessmentResultsPdf({
      resourceTitle: resource.frontmatter.title,
      firstName,
      assessment,
      result: assessmentScore,
    });

    const { subject, text } = buildAssessmentEmail({ firstName, resourceTitle: resource.frontmatter.title, assessment, assessmentScore });

    const { error } = await resend.emails.send({
      from: "Reiziger Ashu <hello@reizigerashu.com>",
      to: email,
      replyTo: CONTACT_EMAIL,
      subject,
      text,
      attachments: [
        {
          filename: `${resource.slug}-results.pdf`,
          content: Buffer.from(pdfBytes),
        },
      ],
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send results." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  }

  const downloadUrl = new URL(resource.frontmatter.downloadFile, SITE_URL).toString();

  const { error } = await resend.emails.send({
    from: "Reiziger Ashu <hello@reizigerashu.com>",
    to: email,
    replyTo: CONTACT_EMAIL,
    subject: `Your ${resource.frontmatter.title} is on its way`,
    text: `Hi ${firstName},\n\nHere's your copy of the ${resource.frontmatter.title}:\n${downloadUrl}\n\nIf you have any questions, just reply to this email.\n\n— Reiziger Ashu`,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Failed to send resource." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

function buildAssessmentEmail({
  firstName,
  resourceTitle,
  assessment,
  assessmentScore,
}: {
  firstName: string;
  resourceTitle: string;
  assessment: ReturnType<typeof getAssessmentBySlug>;
  assessmentScore: AssessmentResult;
}): { subject: string; text: string } {
  const breakdown = assessmentScore.byArea
    .map(({ area, score }) => {
      const label = assessment?.areas.find((a) => a.id === area)?.label ?? area;
      return `- ${label}: ${Math.round(score)} / 100`;
    })
    .join("\n");

  return {
    subject: `Your ${resourceTitle} score: ${Math.round(assessmentScore.overall)} / 100`,
    text: `Hi ${firstName},\n\nHere's your full ${resourceTitle} breakdown:\n\nOverall: ${Math.round(assessmentScore.overall)} / 100\n${breakdown}\n\nYour full results are attached as a PDF.\n\nIf you have any questions, just reply to this email.\n\n— Reiziger Ashu`,
  };
}
