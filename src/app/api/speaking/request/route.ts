import { NextResponse } from "next/server";
import { Resend } from "resend";
import { CONTACT_EMAIL } from "@/lib/constants";

interface SpeakingRequestPayload {
  fullName?: string;
  organization?: string;
  role?: string;
  email?: string;
  phone?: string;
  eventName?: string;
  eventType?: string;
  eventDate?: string;
  eventFormat?: string;
  location?: string;
  audienceSize?: string;
  audience?: string;
  topic?: string;
  sessionFormat?: string;
  sessionLength?: string;
  budget?: string;
  notes?: string;
}

function line(label: string, value?: string): string {
  return value ? `${label}: ${value}\n` : "";
}

export async function POST(request: Request) {
  const body = (await request.json()) as SpeakingRequestPayload;
  const { fullName, organization, email, phone, eventName, eventType, eventDate, budget } = body;

  if (!fullName || !organization || !email || !phone || !eventName || !eventType || !eventDate || !budget) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set — speaking request cannot send email.");
    return NextResponse.json({ error: "Email delivery is not configured." }, { status: 500 });
  }

  const resend = new Resend(apiKey);

  const text =
    `SPEAKING REQUEST\n\n` +
    `About You & Your Organization\n` +
    line("Full Name", fullName) +
    line("Organization / Event Name", organization) +
    line("Role / Title", body.role) +
    line("Email", email) +
    line("Phone / WhatsApp", phone) +
    `\nAbout the Event\n` +
    line("Event Name", eventName) +
    line("Event Type", eventType) +
    line("Event Date(s)", eventDate) +
    line("Format", body.eventFormat) +
    line("Location", body.location) +
    line("Expected Audience Size", body.audienceSize) +
    line("Who Will Be in the Room?", body.audience) +
    `\nThe Ask\n` +
    line("Topic or Theme", body.topic) +
    line("Session Format", body.sessionFormat) +
    line("Session Length", body.sessionLength) +
    line("Budget / Honorarium", budget) +
    line("Anything Else", body.notes);

  const { error } = await resend.emails.send({
    from: "Reiziger Ashu Website <hello@reizigerashu.com>",
    to: CONTACT_EMAIL,
    replyTo: email,
    subject: `Speaking request: ${eventName} (${organization})`,
    text,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Failed to send request." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
