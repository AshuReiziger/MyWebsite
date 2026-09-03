import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Under Maintenance — Reiziger Ashu",
};

export default function MaintenancePage() {
  return (
    <div className="theme-dark-fixed -mb-32 bg-paper pb-32 text-ink">
      <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 py-24 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">
          Be Right Back
        </p>
        <h1 className="mt-4 font-display text-[2em] font-bold tracking-tight">
          A quick refresh is underway.
        </h1>
        <p className="mt-4 max-w-md text-muted">
          The site is offline briefly for scheduled updates. Check back shortly — or use the
          WhatsApp button if it&apos;s urgent.
        </p>
      </div>
    </div>
  );
}
