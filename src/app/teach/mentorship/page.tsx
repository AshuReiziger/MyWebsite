import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/Section";
import { OfferingCard } from "@/components/OfferingCard";

export const metadata: Metadata = {
  title: "Mentorship — Reiziger Ashu",
  description: "One-on-one and small-group guidance for designers and creatives who want a faster, less isolated path forward.",
};

const MENTORSHIP_TRACKS = [
  {
    title: "Career Development",
    description: "Guidance on where your creative career is headed and how to get there with intention.",
  },
  {
    title: "Portfolio Building",
    description: "Hands-on feedback to shape a portfolio that shows range, judgment, and results.",
  },
  {
    title: "Professional Practice",
    description: "Support in building the habits, workflows, and standards of a working professional.",
  },
  {
    title: "Creative Business",
    description: "Guidance on pricing, contracts, and running a creative practice like a real business.",
  },
  {
    title: "Personal Positioning",
    description: "Help defining your creative point of view and how you want to be known in the industry.",
  },
  {
    title: "Building Systems Around Your Skill",
    description: "Support turning individual talent into a structured, repeatable, and scalable way of working.",
  },
];

export default function MentorshipPage() {
  return (
    <>
      <Section className="pt-16 md:pt-24">
        <SectionHeading
          eyebrow="Teach"
          title="Mentorship"
          description="One-on-one and small-group guidance for designers and creatives who want a faster, less isolated path forward."
          centered
        />
        <div className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MENTORSHIP_TRACKS.map((track) => (
            <OfferingCard key={track.title} tag="Mentorship Track" title={track.title} description={track.description} />
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
            href="/contact"
            className="mt-8 inline-block rounded-full bg-ink px-6 py-3 text-sm font-semibold uppercase tracking-wide text-paper transition-opacity hover:opacity-90"
          >
            Start Mentorship →
          </Link>
        </div>
      </Section>
    </>
  );
}
