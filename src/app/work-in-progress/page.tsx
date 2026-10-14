"use client";

import { useRouter } from "next/navigation";
import { WIP_RETURN_PATH_KEY } from "@/components/WorkInProgressLink";

export default function WorkInProgressPage() {
  const router = useRouter();

  const handleBack = () => {
    let returnPath: string | null = null;
    try {
      returnPath = sessionStorage.getItem(WIP_RETURN_PATH_KEY);
      sessionStorage.removeItem(WIP_RETURN_PATH_KEY);
    } catch {
      // sessionStorage unavailable — fall back to home below.
    }

    router.push(returnPath || "/");
  };

  return (
    <div className="theme-dark-fixed -mb-10 bg-paper pb-10 text-ink">
      <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 py-24 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">
          Coming Soon
        </p>
        <h1 className="mt-4 font-display text-[2em] font-bold tracking-tight">
          Work in progress. Please come back later.
        </h1>
        <p className="mt-4 max-w-md text-muted">
          This page is still being built. In the meantime, feel free to head back to where you
          came from.
        </p>
        <div className="mt-8">
          <button
            type="button"
            onClick={handleBack}
            className="rounded-full bg-ink px-6 py-3 text-sm font-semibold uppercase tracking-wide text-paper transition-opacity hover:opacity-90"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
