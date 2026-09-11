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

interface CompanionAttachment {
  mediaType?: string;
  data?: string; // base64, no "data:...;base64," prefix
}

interface CompanionPayload {
  message?: string;
  history?: CompanionMessage[];
  attachments?: CompanionAttachment[];
}

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";
const MODEL = process.env.SIGMA_COMPANION_MODEL || "claude-sonnet-4-5-20250929";
const MAX_HISTORY_MESSAGES = 20; // keep request payloads and cost bounded
const MAX_MESSAGE_LENGTH = 4000;

// Attachments are single-turn only — never persisted into `history` or resent on
// later requests (the widget only ever sends them on the turn a file was picked;
// history entries are always plain text, a lightweight "[Attached: ...]" note
// rather than the file itself). That keeps request size bounded regardless of how
// long a conversation runs, well under Vercel Functions' request body limit.
const MAX_ATTACHMENTS = 3;
const MAX_ATTACHMENTS_TOTAL_BYTES = 4_000_000; // combined raw (decoded) bytes
const ALLOWED_ATTACHMENT_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
  "application/pdf",
]);
const BASE64_RE = /^[A-Za-z0-9+/]+={0,2}$/;

interface ContentBlock {
  type: "text" | "image" | "document";
  text?: string;
  source?: { type: "base64"; media_type: string; data: string };
}

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
  const rawAttachments = Array.isArray(body.attachments) ? body.attachments : [];

  if (rawAttachments.length > MAX_ATTACHMENTS) {
    return NextResponse.json(
      { error: `You can attach at most ${MAX_ATTACHMENTS} files per message.` },
      { status: 400 }
    );
  }

  const attachmentBlocks: ContentBlock[] = [];
  let totalAttachmentBytes = 0;
  for (const att of rawAttachments) {
    const mediaType = typeof att?.mediaType === "string" ? att.mediaType : "";
    const data = typeof att?.data === "string" ? att.data : "";
    if (!ALLOWED_ATTACHMENT_TYPES.has(mediaType)) {
      return NextResponse.json(
        { error: "Attachments must be an image (PNG/JPEG/WebP/GIF) or a PDF." },
        { status: 400 }
      );
    }
    if (!data || !BASE64_RE.test(data)) {
      return NextResponse.json({ error: "Attachment data is invalid." }, { status: 400 });
    }
    // Decoded byte length from a base64 string, without allocating a Buffer just to
    // measure it: 4 chars encode 3 bytes, minus one byte per trailing "=" pad.
    const padding = data.endsWith("==") ? 2 : data.endsWith("=") ? 1 : 0;
    totalAttachmentBytes += (data.length / 4) * 3 - padding;
    if (totalAttachmentBytes > MAX_ATTACHMENTS_TOTAL_BYTES) {
      return NextResponse.json(
        { error: "Attachments are too large — please keep the total under 4MB." },
        { status: 400 }
      );
    }
    attachmentBlocks.push(
      mediaType === "application/pdf"
        ? { type: "document", source: { type: "base64", media_type: mediaType, data } }
        : { type: "image", source: { type: "base64", media_type: mediaType, data } }
    );
  }

  if (!message && attachmentBlocks.length === 0) {
    return NextResponse.json({ error: "Missing 'message'." }, { status: 400 });
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json({ error: "Message is too long." }, { status: 400 });
  }

  // Sanitize/clamp history: only well-formed {role, content} pairs, last
  // MAX_HISTORY_MESSAGES kept. History is always plain text — see the
  // single-turn-attachments note above.
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

  const newUserContent: string | ContentBlock[] =
    attachmentBlocks.length > 0
      ? [...attachmentBlocks, ...(message ? [{ type: "text" as const, text: message }] : [])]
      : message;

  const messages = [...cleanHistory, { role: "user" as const, content: newUserContent }];

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
