"use client";

import { useState, type FormEvent } from "react";
import { track } from "@/lib/analytics";

type Status = "idle" | "submitting" | "success" | "error";

export function NewsletterForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [email, setEmail] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error("Request failed");
      setStatus("success");
      track("newsletter_signup", { source: "footer" });
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return <p className="text-sm text-paper/80">You&apos;re subscribed — thanks for joining.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-start">
      <label className="sr-only" htmlFor="newsletter-email">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="you@domain.com"
        className="w-full max-w-xs border-b border-paper/30 bg-transparent px-0 py-2 text-sm text-paper placeholder:text-paper/40 outline-none focus:border-paper sm:w-56"
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="shrink-0 rounded-full border border-paper/30 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-paper transition-colors hover:border-paper disabled:opacity-50"
      >
        {status === "submitting" ? "Joining…" : "Subscribe"}
      </button>
      {status === "error" && (
        <p role="alert" className="text-xs text-accent sm:basis-full">
          Something went wrong — please try again.
        </p>
      )}
    </form>
  );
}
