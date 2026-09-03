import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/Section";
import { OfferingCard } from "@/components/OfferingCard";
import { WORKSHOPS, WORKSHOP_DISCOUNTS } from "@/content/workshops";

export const metadata: Metadata = {
  title: "Workshops — Reiziger Ashu",
  description: "Practical, hands-on workshops for creatives and teams who learn best by doing.",
};

export default function WorkshopsPage() {
  return (
    <div className="theme-dark-fixed -mb-32 bg-paper pb-32 text-ink">
      <Section className="pt-16 md:pt-24">
        <SectionHeading
          eyebrow="Teach"
          title="Workshops"
          description="Practical, hands-on learning experiences for creatives and teams who learn best by doing."
          centered
        />
        <div className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WORKSHOPS.map((workshop) => (
            <OfferingCard
              key={workshop.slug}
              tag="Workshop"
              title={workshop.title}
              description={workshop.subhead}
              href={`/teach/workshops/${workshop.slug}`}
            />
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="mx-auto max-w-3xl rounded-2xl border border-line p-8 text-center md:p-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">Discounts</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {WORKSHOP_DISCOUNTS.map((discount) => (
              <div key={discount.name}>
                <p className="font-display text-sm font-bold tracking-tight">{discount.name}</p>
                <p className="mt-1 text-sm text-muted">{discount.detail}</p>
              </div>
            ))}
          </div>
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
            href="/teach/workshops/book"
            className="mt-8 inline-block rounded-full bg-ink px-6 py-3 text-sm font-semibold uppercase tracking-wide text-paper transition-opacity hover:opacity-90"
          >
            Book a Workshop →
          </Link>
        </div>
      </Section>
    </div>
  );
}
