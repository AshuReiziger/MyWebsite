import { NextResponse } from "next/server";
import { Resend } from "resend";
import { CONTACT_EMAIL } from "@/lib/constants";

interface MentorshipApplicationPayload {
  fullName?: string;
  email?: string;
  phone?: string;
  occupation?: string;
  portfolio?: string;
  track?: string;
  currentState?: string;
  threeMonthGoal?: string;
  mentorBefore?: string;
  mentorBeforeDetails?: string;
  preferredFormat?: string;
  cadence?: string;
  preferredDelivery?: string;
  availability?: string;
  commitment?: string;
  heardAbout?: string;
}

function line(label: string, value?: string): string {
  return value ? `${label}: ${value}\n` : "";
}

export async function POST(request: Request) {
  const body = (await request.json()) as MentorshipApplicationPayload;
  const { fullName, email, phone, commitment } = body;

  if (!fullName || !email || !phone || !commitment) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set — mentorship application cannot send email.");
    return NextResponse.json({ error: "Email delivery is not configured." }, { status: 500 });
  }

  const resend = new Resend(apiKey);

  const text =
    `MENTORSHIP APPLICATION\n\n` +
    `About You\n` +
    line("Full Name", fullName) +
    line("Email", email) +
    line("Phone / WhatsApp", phone) +
    line("Current Role / Occupation", body.occupation) +
    line("Portfolio / Work Samples", body.portfolio) +
    `\nYour Goals\n` +
    line("Track", body.track) +
    line("Where They Are Right Now", body.currentState) +
    line("3-Month Goal", body.threeMonthGoal) +
    line("Worked With a Mentor Before?", body.mentorBefore) +
    line("Prior Mentor Experience", body.mentorBeforeDetails) +
    `\nLogistics\n` +
    line("Preferred Format", body.preferredFormat) +
    line("Preferred Cadence", body.cadence) +
    line("Preferred Delivery", body.preferredDelivery) +
    line("General Availability", body.availability) +
    `\nCommitment\n` +
    line("Can Commit to Full Track Length?", commitment) +
    line("How They Heard About Sigma Studio", body.heardAbout);

  const { error } = await resend.emails.send({
    from: "Reiziger Ashu Website <hello@reizigerashu.com>",
    to: CONTACT_EMAIL,
    replyTo: email,
    subject: `Mentorship application: ${fullName}${body.track ? ` — ${body.track}` : ""}`,
    text,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Failed to send application." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
