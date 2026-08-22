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

      <Section className="pt-0">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-line p-8">
            <h2 className="font-display text-2xl font-semibold tracking-tight">Sigma Studio</h2>
            <p className="mt-1 text-sm uppercase tracking-wide text-muted">
              Creative Consultancy &amp; Design Studio
            </p>
            <p className="mt-4 text-muted">
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

          <div className="rounded-2xl border border-line p-8">
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Sigma Studio Academy
            </h2>
            <p className="mt-1 text-sm uppercase tracking-wide text-muted">
              Developing the next generation of strategic designers
            </p>
            <p className="mt-4 text-muted">
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
