import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Under Maintenance — Reiziger Ashu",
};

export default function MaintenancePage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-accent">Be Right Back</p>
      <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
        A quick refresh is underway.
      </h1>
      <p className="mt-4 max-w-md text-lg text-muted">
        The site is offline briefly for scheduled updates. Check back shortly — or use the
        WhatsApp button if it&apos;s urgent.
      </p>
    </div>
  );
}
