"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { track } from "@/lib/analytics";

const AUDIENCE_OPTIONS = [
  "Business Owner",
  "Entrepreneur",
  "Designer / Creative",
  "Marketing Professional",
  "Organization / Institution",
  "Student",
  "Other",
];

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "border-b border-line bg-transparent px-0 py-2 outline-none focus:border-ink";
const labelClass = "text-xs font-semibold uppercase tracking-widest text-ink";

export function ResourceLeadForm({
  resourceSlug,
  resourceTitle,
  extraPayload,
  submitLabel = "Send Me the Guide",
  onSuccess,
}: {
  resourceSlug: string;
  resourceTitle: string;
  /** Merged into the POST body — used by the assessment flow to attach the computed score. */
  extraPayload?: Record<string, unknown>;
  submitLabel?: string;
  /** When provided, called instead of rendering the default "on its way" success state — the caller owns what happens next (e.g. the assessment flow unlocks its results). */
  onSuccess?: () => void;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const startedRef = useRef(false);

  function handleFirstInteraction() {
    if (startedRef.current) return;
    startedRef.current = true;
    track("resource_form_start", { resource: resourceSlug });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/resources/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, resourceSlug, ...extraPayload }),
      });

      if (!response.ok) throw new Error("Request failed");
      setStatus("success");
      track("resource_form_submit", { resource: resourceSlug });
      track("newsletter_signup", { resource: resourceSlug });
      track("resource_download", { resource: resourceSlug });
      form.reset();
      onSuccess?.();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success" && onSuccess) {
    return null;
  }

  if (status === "success") {
    return (
      <div>
        <h3 className="font-display text-2xl font-bold tracking-tight">
          Your guide is on its way.
        </h3>
        <p className="mt-3 text-muted">
          Check your inbox for the {resourceTitle}. If you don&apos;t see it in a few
          minutes, check spam or promotions.
        </p>
        <p className="mt-8 text-xs font-semibold uppercase tracking-widest text-muted">
          Continue Exploring
        </p>
        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/work" className="text-sm font-semibold uppercase tracking-wide hover:text-accent">
            My Work
          </Link>
          <Link href="/think" className="text-sm font-semibold uppercase tracking-wide hover:text-accent">
            Think
          </Link>
          <Link href="/teach" className="text-sm font-semibold uppercase tracking-wide hover:text-accent">
            Teach
          </Link>
          <Link href="/contact" className="text-sm font-semibold uppercase tracking-wide hover:text-accent">
            Work With Me
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} onChange={handleFirstInteraction} className="flex flex-col gap-6">
      <div className="grid gap-6 md:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className={labelClass}>First Name</span>
          <input
            name="firstName"
            required
            autoComplete="given-name"
            placeholder="Your first name"
            className={inputClass}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className={labelClass}>Email Address</span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="you@domain.com"
            className={inputClass}
          />
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className={labelClass}>What best describes you? (optional)</span>
        <select name="role" defaultValue="" className={inputClass}>
          <option value="">Prefer not to say</option>
          {AUDIENCE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-2 self-start rounded-full bg-ink px-6 py-3 text-sm font-semibold uppercase tracking-wide text-paper transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {status === "submitting" ? "Sending…" : submitLabel}
      </button>

      {status === "error" && (
        <p role="alert" className="text-sm text-accent">
          Something went wrong sending that — please try again in a moment.
        </p>
      )}
    </form>
  );
}
