"use client";

import "./globals.css";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center px-6 text-center antialiased">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">Error</p>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
          The site hit a snag.
        </h1>
        <p className="mt-4 max-w-md text-lg text-muted">
          Something went wrong at the top level. Try reloading — if this keeps happening, reach
          out via the WhatsApp button once the page recovers.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-8 rounded-full bg-ink px-6 py-3 text-sm font-semibold uppercase tracking-wide text-paper transition-opacity hover:opacity-90"
        >
          Reload
        </button>
      </body>
    </html>
  );
}
