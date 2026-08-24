import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/Section";
import { OfferingCard } from "@/components/OfferingCard";

export const metadata: Metadata = {
  title: "Workshops — Reiziger Ashu",
  description: "Practical, hands-on workshops for creatives and teams who learn best by doing.",
};

const WORKSHOPS = [
  {
    title: "Strategic Design",
    description: "A workshop on solving business problems through design thinking, not just making things look good.",
  },
  {
    title: "Visual Communication",
    description: "A workshop on communicating clearly and persuasively through layout, color, typography, and image.",
  },
  {
    title: "Branding",
    description: "A workshop on building brands with real strategic backbone, from positioning through to visual execution.",
  },
  {
    title: "Creative Business",
    description: "A workshop on the business side of creative work: pricing, contracts, clients, and getting paid what you're worth.",
  },
  {
    title: "Creative Leadership",
    description: "A workshop on leading creative people and teams, from giving useful feedback to running a healthy studio culture.",
  },
  {
    title: "Systems Thinking",
    description: "A workshop on building repeatable systems so creative output doesn't depend on constant improvisation.",
  },
];

export default function WorkshopsPage() {
  return (
    <>
      <Section className="pt-16 md:pt-24">
        <SectionHeading
          eyebrow="Teach"
          title="Workshops"
          description="Practical, hands-on learning experiences for creatives and teams who learn best by doing."
          centered
        />
        <div className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WORKSHOPS.map((workshop) => (
            <OfferingCard key={workshop.title} tag="Workshop" title={workshop.title} description={workshop.description} />
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="rounded-3xl border border-line p-12 text-center md:p-20">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
            Want to bring this to your team?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Workshops can run for a single team or a whole organization, in person or remote. Tell me what your
            team needs and we&apos;ll figure out the right session together.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-ink px-6 py-3 text-sm font-semibold uppercase tracking-wide text-paper transition-opacity hover:opacity-90"
          >
            Book a Workshop →
          </Link>
        </div>
      </Section>
    </>
  );
}
