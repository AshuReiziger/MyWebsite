"use client";

import { useState, type FormEvent } from "react";

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
const labelClass = "text-xs font-semibold uppercase tracking-widest text-ink";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

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
        <select name="projectType" required defaultValue="" className={inputClass}>
          <option value="" disabled>
            Select an area
          </option>
          {AREAS_OF_INTEREST.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
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
