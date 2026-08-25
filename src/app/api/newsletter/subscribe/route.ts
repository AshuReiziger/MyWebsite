import { NextResponse } from "next/server";
import { subscribeToList } from "@/lib/email-provider";

interface NewsletterPayload {
  email?: string;
}

export async function POST(request: Request) {
  const { email } = (await request.json()) as NewsletterPayload;

  if (!email) {
    return NextResponse.json({ error: "Missing email." }, { status: 400 });
  }

  const result = await subscribeToList({
    firstName: "",
    email,
    resourceSlug: "newsletter",
    resourceTitle: "Newsletter",
  });

  if (!result.ok) {
    if (result.skipped) {
      console.error("Newsletter signup received but EMAIL_PROVIDER is not configured.");
      return NextResponse.json({ error: "Newsletter signup is not configured yet." }, { status: 500 });
    }
    console.error(`Failed to subscribe ${email} to the newsletter: ${result.error}`);
    return NextResponse.json({ error: "Failed to subscribe." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
