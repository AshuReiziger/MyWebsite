import { NextResponse } from "next/server";
import { Resend } from "resend";

interface ContactPayload {
  name?: string;
  email?: string;
  projectType?: string;
  message?: string;
}

const CONTACT_EMAIL = "ashu.reiziger45@gmail.com";

export async function POST(request: Request) {
  const body = (await request.json()) as ContactPayload;
  const { name, email, projectType, message } = body;

  if (!name || !email || !projectType || !message) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set — contact form cannot send email.");
    return NextResponse.json({ error: "Email delivery is not configured." }, { status: 500 });
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: "Reiziger Ashu Website <hello@reizigerashu.com>",
    to: CONTACT_EMAIL,
    replyTo: email,
    subject: `New inquiry from ${name} — ${projectType}`,
    text: `Name: ${name}\nEmail: ${email}\nArea of Interest: ${projectType}\n\n${message}`,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Failed to send message." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
