"use client";

import { useState, type FormEvent } from "react";
import { PillToggle } from "@/components/PillToggle";

const EVENT_TYPES = [
  "Conference",
  "University / School",
  "Corporate Training",
  "Panel / Podcast",
  "Community Event",
  "Other",
];

const FORMATS = ["In-person", "Virtual", "Hybrid"];

const AUDIENCE_SIZES = ["Under 50", "50–150", "150–500", "500+"];

const SESSION_FORMATS = ["Keynote", "Workshop-style Talk", "Panel", "Fireside Chat / Interview", "Other"];

const SESSION_LENGTHS = ["15–30 min", "30–60 min", "60+ min / Half-day"];

const BUDGET_OPTIONS = [
  "Paid engagement",
  "Travel/stipend only",
  "Unpaid — exposure/community",
  "Not decided yet",
];

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "border-b border-line bg-transparent px-0 py-2 outline-none focus:border-ink";
const labelClass = "text-xs font-semibold uppercase tracking-widest text-ink";
const sectionClass = "text-xs font-semibold uppercase tracking-widest text-accent";

export function SpeakingForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [format, setFormat] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/speaking/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, format }),
      });

      if (!response.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
      setFormat("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div>
        <h3 className="font-display text-2xl font-bold tracking-tight">
          Speaking request received.
        </h3>
        <p className="mt-3 text-muted">
          We&apos;ll respond within 3–5 business days to confirm availability and fit.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10">
      <div className="flex flex-col gap-6">
        <p className={sectionClass}>About You &amp; Your Organization</p>
        <div className="grid gap-6 md:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className={labelClass}>Full Name</span>
            <input name="fullName" required placeholder="Your name" className={inputClass} />
          </label>
          <label className="flex flex-col gap-2">
            <span className={labelClass}>Organization / Event Name</span>
            <input name="organization" required placeholder="Organization or event name" className={inputClass} />
          </label>
          <label className="flex flex-col gap-2">
            <span className={labelClass}>Your Role / Title</span>
            <input name="role" placeholder="Your title" className={inputClass} />
          </label>
          <label className="flex flex-col gap-2">
            <span className={labelClass}>Email</span>
            <input type="email" name="email" required placeholder="you@domain.com" className={inputClass} />
          </label>
          <label className="flex flex-col gap-2">
            <span className={labelClass}>Phone / WhatsApp</span>
            <input type="tel" name="phone" required placeholder="+237 …" className={inputClass} />
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <p className={sectionClass}>About the Event</p>
        <div className="grid gap-6 md:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className={labelClass}>Event Name</span>
            <input name="eventName" required placeholder="Name of the event" className={inputClass} />
          </label>
          <label className="flex flex-col gap-2">
            <span className={labelClass}>Event Type</span>
            <select name="eventType" required defaultValue="" className={inputClass}>
              <option value="" disabled>
                Select a type
              </option>
              {EVENT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2">
            <span className={labelClass}>Event Date(s)</span>
            <input type="date" name="eventDate" required className={inputClass} />
          </label>
          <label className="flex flex-col gap-2">
            <span className={labelClass}>Expected Audience Size</span>
            <select name="audienceSize" defaultValue="" className={inputClass}>
              <option value="">Prefer not to say</option>
              {AUDIENCE_SIZES.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="flex flex-col gap-2">
          <span className={labelClass}>Format</span>
          <PillToggle name="Format" options={FORMATS} value={format} onChange={setFormat} />
          <input type="hidden" name="eventFormat" value={format} />
        </div>

        {(format === "In-person" || format === "Hybrid") && (
          <label className="flex flex-col gap-2">
            <span className={labelClass}>Location</span>
            <input name="location" placeholder="City / venue" className={inputClass} />
          </label>
        )}

        <label className="flex flex-col gap-2">
          <span className={labelClass}>Who Will Be in the Room?</span>
          <textarea
            name="audience"
            rows={3}
            placeholder="e.g. students, executives, creatives, general public…"
            className={inputClass}
          />
        </label>
      </div>

      <div className="flex flex-col gap-6">
        <p className={sectionClass}>The Ask</p>
        <label className="flex flex-col gap-2">
          <span className={labelClass}>Topic or Theme You&apos;d Like Covered</span>
          <textarea name="topic" rows={3} className={inputClass} />
        </label>

        <div className="grid gap-6 md:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className={labelClass}>Session Format</span>
            <select name="sessionFormat" defaultValue="" className={inputClass}>
              <option value="">Select a format</option>
              {SESSION_FORMATS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2">
            <span className={labelClass}>Session Length</span>
            <select name="sessionLength" defaultValue="" className={inputClass}>
              <option value="">Select a length</option>
              {SESSION_LENGTHS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="flex flex-col gap-2">
          <span className={labelClass}>Is There a Budget or Honorarium for This?</span>
          <select name="budget" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              Select an option
            </option>
            {BUDGET_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className={labelClass}>Anything Else We Should Know</span>
          <textarea name="notes" rows={3} className={inputClass} />
        </label>
      </div>

      <div>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="self-start rounded-full bg-ink px-6 py-3 text-sm font-semibold uppercase tracking-wide text-paper transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {status === "submitting" ? "Sending…" : "Send Speaking Request →"}
        </button>
        <p className="mt-3 text-sm text-muted">
          We&apos;ll respond within 3–5 business days to confirm availability and fit.
        </p>
        {status === "error" && (
          <p role="alert" className="mt-3 text-sm text-accent">
            Something went wrong sending that — please try again in a moment.
          </p>
        )}
      </div>
    </form>
  );
}
