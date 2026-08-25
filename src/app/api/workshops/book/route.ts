import { NextResponse } from "next/server";
import { Resend } from "resend";
import { CONTACT_EMAIL } from "@/lib/constants";

interface WorkshopBookingPayload {
  workshop?: string;
  preferredDate?: string;
  format?: string;
  seats?: number;
  bookingType?: string;
  organizationName?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  additionalParticipants?: string;
  discounts?: string[];
  notes?: string;
}

function line(label: string, value?: string): string {
  return value ? `${label}: ${value}\n` : "";
}

export async function POST(request: Request) {
  const body = (await request.json()) as WorkshopBookingPayload;
  const { workshop, preferredDate, seats, bookingType, fullName, email, phone } = body;

  if (!workshop || !preferredDate || !seats || !bookingType || !fullName || !email || !phone) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set — workshop booking cannot send email.");
    return NextResponse.json({ error: "Email delivery is not configured." }, { status: 500 });
  }

  const resend = new Resend(apiKey);

  const text =
    `WORKSHOP BOOKING\n\n` +
    `Workshop Selection\n` +
    line("Workshop", workshop) +
    line("Preferred Date", preferredDate) +
    line("Format", body.format) +
    line("Number of Seats", String(seats)) +
    `\nBooking Type\n` +
    line("Individual or Group", bookingType) +
    line("Organization Name", body.organizationName) +
    `\nContact Details\n` +
    line("Full Name", fullName) +
    line("Email", email) +
    line("Phone / WhatsApp", phone) +
    (seats > 1 ? `\nParticipant Details\n` + line("Additional Participants", body.additionalParticipants) : "") +
    (body.discounts?.length ? `\nDiscount Eligibility\n${body.discounts.map((d) => `- ${d}`).join("\n")}\n` : "") +
    line("\nNotes", body.notes);

  const { error } = await resend.emails.send({
    from: "Reiziger Ashu Website <hello@reizigerashu.com>",
    to: CONTACT_EMAIL,
    replyTo: email,
    subject: `Workshop booking: ${workshop} — ${fullName}`,
    text,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Failed to send booking." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
