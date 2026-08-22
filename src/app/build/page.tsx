import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/Section";

export const metadata: Metadata = {
  title: "Build — Reiziger Ashu",
  description: "Sigma Studio, Sigma Studio Academy, and other initiatives.",
};

const OTHER_INITIATIVES = [
  "Community projects",
  "Church media initiatives",
  "Design education projects",
  "National development projects",
  "Fellowships",
  "Research",
  "Creative experiments",
];

export default function BuildPage() {
  return (
    <>
      <Section className="pt-16 md:pt-24">
        <SectionHeading
          eyebrow="Build"
          title="I don't only work on projects. I build platforms."
        />
      </Section>

      <Section outerClassName="bg-ink text-paper">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-paper/5 p-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">
              Creative Consultancy
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight">Sigma Studio</h2>
            <p className="mt-4 text-paper/70">
              A design-driven creative studio helping organizations clarify their identity,
              communicate their vision, and build meaningful brands.
            </p>
            <a
              href="#"
              className="mt-6 inline-block text-sm font-semibold uppercase tracking-wide"
            >
              Visit Sigma Studio →
            </a>
          </div>

          <div className="rounded-2xl bg-paper/5 p-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">
              Design Education
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight">
              Sigma Studio Academy
            </h2>
            <p className="mt-4 text-paper/70">
              An educational platform equipping creatives with technical excellence, strategic
              thinking, entrepreneurial competence, ethical leadership, and purpose-driven
              character.
            </p>
            <a
              href="#"
              className="mt-6 inline-block text-sm font-semibold uppercase tracking-wide"
            >
              Explore the Academy →
            </a>
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <SectionHeading eyebrow="Other Initiatives" title="Beyond the studio and the academy" />
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {OTHER_INITIATIVES.map((item) => (
            <li key={item} className="rounded-xl border border-line px-5 py-4 text-muted">
              {item}
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
