import { NextResponse } from "next/server";
import { SIGMA_COMPANION_SYSTEM_PROMPT } from "./systemPrompt";

/**
 * Sigma Companion — chat backend for the widget in public/sigma-companion-widget.js.
 * Ported in from the standalone sigma-companion-webapp delivery (originally meant to
 * be its own separate Vercel deployment, called cross-origin) — since this site and
 * that widget share the same Vercel account and the site's stack is now known, there
 * was no reason to run two projects. The system prompt and API key stay server-only
 * here exactly as they did in the original: this route is the only place either is
 * used, and neither is ever sent to the browser.
 */

interface CompanionMessage {
  role: "user" | "assistant";
  content: string;
}

interface CompanionPayload {
  message?: string;
  history?: CompanionMessage[];
}

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";
const MODEL = process.env.SIGMA_COMPANION_MODEL || "claude-sonnet-4-5-20250929";
const MAX_HISTORY_MESSAGES = 20; // keep request payloads and cost bounded
const MAX_MESSAGE_LENGTH = 4000;

export async function POST(request: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("ANTHROPIC_API_KEY is not set — Sigma Companion cannot respond.");
    return NextResponse.json(
      { error: "Server is not configured yet. Missing ANTHROPIC_API_KEY." },
      { status: 500 }
    );
  }

  let body: CompanionPayload;
  try {
    body = (await request.json()) as CompanionPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const message = typeof body.message === "string" ? body.message.trim() : "";
  const history = Array.isArray(body.history) ? body.history : [];

  if (!message) {
    return NextResponse.json({ error: "Missing 'message'." }, { status: 400 });
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json({ error: "Message is too long." }, { status: 400 });
  }

  // Sanitize/clamp history: only well-formed {role, content} pairs, last
  // MAX_HISTORY_MESSAGES kept.
  const cleanHistory = history
    .filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.length > 0 &&
        m.content.length <= MAX_MESSAGE_LENGTH
    )
    .slice(-MAX_HISTORY_MESSAGES)
    .map((m) => ({ role: m.role, content: m.content }));

  const messages = [...cleanHistory, { role: "user" as const, content: message }];

  let upstream: Response;
  try {
    upstream = await fetch(ANTHROPIC_API_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 900,
        system: SIGMA_COMPANION_SYSTEM_PROMPT,
        messages,
      }),
    });
  } catch (err) {
    console.error("Sigma Companion handler error:", err);
    return NextResponse.json({ error: "Something went wrong on our end. Please try again." }, { status: 500 });
  }

  if (!upstream.ok) {
    const errText = await upstream.text();
    console.error("Anthropic API error:", upstream.status, errText);
    return NextResponse.json(
      { error: "Sigma Companion is having trouble thinking right now. Please try again shortly." },
      { status: 502 }
    );
  }

  const data = await upstream.json();
  const reply =
    Array.isArray(data.content) && data.content.length > 0
      ? data.content.map((block: { text?: string }) => block.text || "").join("")
      : "Sorry, I couldn't generate a response just now.";

  return NextResponse.json({ reply });
}
