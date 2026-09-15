"use client";

import { useState, type FormEvent } from "react";
import { CustomSelect } from "@/components/CustomSelect";

const AREAS_OF_INTEREST = [
  "Design Project",
  "Strategy / Consulting",
  "Training / Workshop",
  "Speaking",
  "Collaboration",
  "Other",
];

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "border-b border-line bg-transparent px-0 py-2 outline-none focus:border-ink";
const selectTriggerClass = "border-b bg-transparent px-0 py-2 peer-focus:border-ink";
const labelClass = "text-xs font-semibold uppercase tracking-widest text-ink";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [projectTypeError, setProjectTypeError] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    // readOnly (required for the custom dropdown's click-to-open behavior)
    // exempts the field from native HTML5 required validation, so this is
    // checked by hand instead of relying on the browser to block submission.
    if (!data.projectType) {
      setProjectTypeError(true);
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="text-lg">Thanks for reaching out — I&apos;ll get back to you soon.</p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid gap-6 md:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className={labelClass}>Full Name</span>
          <input name="name" required placeholder="Your name" className={inputClass} />
        </label>
        <label className="flex flex-col gap-2">
          <span className={labelClass}>Email Address</span>
          <input
            type="email"
            name="email"
            required
            placeholder="you@domain.com"
            className={inputClass}
          />
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className={labelClass}>Area of Interest</span>
        <CustomSelect
          name="projectType"
          options={AREAS_OF_INTEREST}
          placeholder="Select an area"
          required
          error={projectTypeError}
          onChange={() => setProjectTypeError(false)}
          className={selectTriggerClass}
        />
        {projectTypeError && (
          <p className="text-xs text-accent">Please select an area of interest.</p>
        )}
      </label>

      <label className="flex flex-col gap-2">
        <span className={labelClass}>Project Details</span>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Tell me a bit about what you have in mind…"
          className={inputClass}
        />
      </label>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-2 self-start rounded-full bg-ink px-6 py-3 text-sm font-semibold uppercase tracking-wide text-paper transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {status === "submitting" ? "Sending…" : "Start a Conversation →"}
      </button>

      {status === "error" && (
        <p className="text-sm text-accent">
          Something went wrong sending that — please try again in a moment.
        </p>
      )}
    </form>
  );
}
