import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/Section";

export const metadata: Metadata = {
  title: "Teach — Reiziger Ashu",
  description: "Design training, workshops, mentorship, and speaking.",
};

const OFFERINGS = ["Design Training", "Workshops", "Mentorship", "Speaking", "Resources"];

const SPEAKING_TOPICS = [
  "Design & Visual Communication",
  "Strategic Creativity",
  "Building Systems Around Your Skill",
  "Creative Leadership",
  "The Thriving Designer",
  "Designing for Transformation",
  "Identity & Purpose",
  "Building Creative Teams",
  "Media & Creative Ministry",
];

export default function TeachPage() {
  return (
    <>
      <Section className="pt-16 md:pt-24">
        <SectionHeading eyebrow="Teach" title="I believe knowledge should multiply." />
        <div className="mt-8 max-w-2xl space-y-4 text-lg text-muted">
          <p>Everything I learn shouldn&apos;t end with me.</p>
          <p>
            Part of my work is helping other creatives develop the thinking, skills, systems, and
            character required to use their gifts meaningfully.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          {OFFERINGS.map((offering) => (
            <span
              key={offering}
              className="rounded-full border border-line px-4 py-2 text-sm uppercase tracking-wide text-muted"
            >
              {offering}
            </span>
          ))}
        </div>
        <Link
          href="/contact"
          className="mt-8 inline-block rounded-full bg-ink px-6 py-3 text-sm font-semibold uppercase tracking-wide text-paper transition-opacity hover:opacity-90"
        >
          Learn With Me →
        </Link>
      </Section>

      <Section className="pt-0">
        <SectionHeading eyebrow="Speaking / Training" title="Invite me to speak" />
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {SPEAKING_TOPICS.map((topic) => (
            <li key={topic} className="rounded-xl border border-line px-5 py-4 text-muted">
              {topic}
            </li>
          ))}
        </ul>
        <Link
          href="/contact"
          className="mt-8 inline-block rounded-full border border-line px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-colors hover:border-ink"
        >
          Book a Session
        </Link>
      </Section>
    </>
  );
}
