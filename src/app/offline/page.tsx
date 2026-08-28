import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "You're Offline — Reiziger Ashu",
};

export default function OfflinePage() {
  return (
    <div className="theme-dark-fixed -mb-32 bg-paper pb-32 text-ink">
      <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 py-24 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">Offline</p>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
          No connection right now.
        </h1>
        <p className="mt-4 max-w-md text-lg text-muted">
          It looks like you&apos;ve lost your internet connection. Reconnect and refresh to keep
          browsing.
        </p>
      </div>
    </div>
  );
}
