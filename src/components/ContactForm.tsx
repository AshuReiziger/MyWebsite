"use client";

import { useState, type FormEvent } from "react";

const PROJECT_TYPES = [
  "Design Project",
  "Strategy / Consulting",
  "Training / Workshop",
  "Speaking",
  "Collaboration",
  "Other",
];

type Status = "idle" | "submitting" | "success" | "error";

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
      <p className="rounded-2xl border border-line p-8 text-lg">
        Thanks for reaching out — I&apos;ll get back to you soon.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid gap-6 md:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium uppercase tracking-wide text-muted">Name</span>
          <input
            name="name"
            required
            className="rounded-lg border border-line bg-transparent px-4 py-3 outline-none focus:border-ink"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium uppercase tracking-wide text-muted">Email</span>
          <input
            type="email"
            name="email"
            required
            className="rounded-lg border border-line bg-transparent px-4 py-3 outline-none focus:border-ink"
          />
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className="text-sm font-medium uppercase tracking-wide text-muted">
          Project Type
        </span>
        <select
          name="projectType"
          required
          defaultValue=""
          className="rounded-lg border border-line bg-transparent px-4 py-3 outline-none focus:border-ink"
        >
          <option value="" disabled>
            Select one
          </option>
          {PROJECT_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-sm font-medium uppercase tracking-wide text-muted">Message</span>
        <textarea
          name="message"
          required
          rows={5}
          className="rounded-lg border border-line bg-transparent px-4 py-3 outline-none focus:border-ink"
        />
      </label>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="self-start rounded-full bg-ink px-6 py-3 text-sm font-semibold uppercase tracking-wide text-paper transition-opacity hover:opacity-90 disabled:opacity-50"
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
