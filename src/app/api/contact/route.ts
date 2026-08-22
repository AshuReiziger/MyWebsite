import { NextResponse } from "next/server";

interface ContactPayload {
  name?: string;
  email?: string;
  projectType?: string;
  message?: string;
}

export async function POST(request: Request) {
  const body = (await request.json()) as ContactPayload;
  const { name, email, projectType, message } = body;

  if (!name || !email || !projectType || !message) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  // TODO: wire up real delivery (e.g. Resend) once an API key is configured.
  // For now this just confirms the submission was received.
  console.log("New contact submission:", { name, email, projectType, message });

  return NextResponse.json({ ok: true });
}
