import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/Section";
import { OfferingCard } from "@/components/OfferingCard";
import { MENTORSHIP_TRACKS } from "@/content/mentorship";

export const metadata: Metadata = {
  title: "Mentorship — Reiziger Ashu",
  description: "One-on-one and small-group guidance for designers and creatives who want a faster, less isolated path forward.",
};

export default function MentorshipPage() {
  return (
    <div className="theme-dark-fixed -mb-32 bg-paper pb-32 text-ink">
      <Section className="pt-16 md:pt-24">
        <SectionHeading
          eyebrow="Teach"
          title="Mentorship"
          description="One-on-one and small-group guidance for designers and creatives who want a faster, less isolated path forward."
          centered
        />
        <div className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MENTORSHIP_TRACKS.map((track) => (
            <OfferingCard
              key={track.slug}
              tag="Mentorship Track"
              title={track.title}
              description={track.subhead}
              href={`/teach/mentorship/${track.slug}`}
            />
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="rounded-3xl border border-line p-12 text-center md:p-20">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
            Ready for a less isolated path forward?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Tell me which track fits where you are right now, and what you&apos;re hoping to work through — we&apos;ll
            take it from there.
          </p>
          <Link
            href="/teach/mentorship/apply"
            className="mt-8 inline-block rounded-full bg-ink px-6 py-3 text-sm font-semibold uppercase tracking-wide text-paper transition-opacity hover:opacity-90"
          >
            Start Mentorship →
          </Link>
        </div>
      </Section>
    </div>
  );
}
