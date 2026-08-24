import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getResourceBySlug } from "@/lib/content";
import { subscribeToList } from "@/lib/email-provider";

interface ResourceSubscribePayload {
  firstName?: string;
  email?: string;
  role?: string;
  resourceSlug?: string;
}

const CONTACT_EMAIL = "ashu.reiziger45@gmail.com";

export async function POST(request: Request) {
  const body = (await request.json()) as ResourceSubscribePayload;
  const { firstName, email, role, resourceSlug } = body;

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

  const { error } = await resend.emails.send({
    from: "Reiziger Ashu <onboarding@resend.dev>",
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
