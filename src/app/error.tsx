"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="theme-dark-fixed -mb-32 bg-paper pb-32 text-ink">
      <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 py-24 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">Error</p>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
          Something went wrong.
        </h1>
        <p className="mt-4 max-w-md text-lg text-muted">
          An unexpected error occurred while loading this page. You can try again, or head back
          home.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-full bg-ink px-6 py-3 text-sm font-semibold uppercase tracking-wide text-paper transition-opacity hover:opacity-90"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="rounded-full border border-line px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-colors hover:border-ink"
          >
            Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}
