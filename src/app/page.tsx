import Link from "next/link";
import { Section, SectionHeading } from "@/components/Section";
import { CapabilityCard, type Capability } from "@/components/CapabilityCard";
import { ThinkCard } from "@/components/ThinkCard";
import { getAllThink } from "@/lib/content";

const CAPABILITIES: Capability[] = [
  {
    title: "Design",
    description:
      "I create visual identities, communication systems, digital experiences, and strategic design solutions that help ideas become clear, compelling, and memorable.",
    tags: ["Brand Identity", "Graphic Design", "Art Direction", "Visual Communication", "Digital Design"],
  },
  {
    title: "Strategy",
    description:
      "I help individuals and organizations move from scattered ideas to clearer direction, stronger positioning, and practical systems.",
    tags: ["Brand Strategy", "Creative Strategy", "Design Strategy", "Systems Thinking", "Consultation"],
  },
  {
    title: "Education",
    description:
      "I teach creatives how to move beyond software proficiency and develop the thinking, discipline, systems, and professional skills required to thrive.",
    tags: ["Design Training", "Creative Development", "Workshops", "Mentorship", "Professional Development"],
  },
  {
    title: "Leadership",
    description:
      "I develop creative teams, media units, and communities by building cultures that encourage excellence, growth, initiative, collaboration, and purpose.",
    tags: ["Creative Leadership", "Team Development", "Media Leadership", "Volunteer Development", "Organizational Culture"],
  },
];

export default function Home() {
  const latestThink = getAllThink().slice(0, 3);

  return (
    <>
      <Section className="pt-16 md:pt-24">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">
          Reiziger Ashu
        </p>
        <h1 className="mt-4 max-w-4xl font-display text-4xl font-semibold tracking-tight md:text-6xl">
          I don&apos;t just design things. I design what they can become.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted md:text-xl">
          I&apos;m a designer, strategist, educator, and creative leader passionate about using
          design to help people and organizations discover who they are, communicate what they
          believe, and build what they envision.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/work"
            className="rounded-full bg-ink px-6 py-3 text-sm font-semibold uppercase tracking-wide text-paper transition-opacity hover:opacity-90"
          >
            Explore My Work →
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-line px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-colors hover:border-ink"
          >
            Let&apos;s Work Together
          </Link>
        </div>
      </Section>

      <Section className="pt-0">
        <SectionHeading eyebrow="What I Do" title="Four ways I create clarity" />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {CAPABILITIES.map((capability) => (
            <CapabilityCard key={capability.title} {...capability} />
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <SectionHeading
          eyebrow="What I've Built"
          title="Platforms, not just projects"
          description="Sigma Studio and Sigma Studio Academy anchor a growing ecosystem of design, education, and leadership work."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-line p-8">
            <h3 className="font-display text-xl font-semibold tracking-tight">Sigma Studio</h3>
            <p className="mt-1 text-sm uppercase tracking-wide text-muted">
              Creative Consultancy & Design Studio
            </p>
            <p className="mt-4 text-muted">
              A design-driven creative studio helping organizations clarify their identity,
              communicate their vision, and build meaningful brands.
            </p>
            <Link href="/build" className="mt-6 inline-block text-sm font-semibold uppercase tracking-wide">
              Visit Sigma Studio →
            </Link>
          </div>
          <div className="rounded-2xl border border-line p-8">
            <h3 className="font-display text-xl font-semibold tracking-tight">
              Sigma Studio Academy
            </h3>
            <p className="mt-1 text-sm uppercase tracking-wide text-muted">
              Developing the next generation of strategic designers
            </p>
            <p className="mt-4 text-muted">
              An educational platform equipping creatives with technical excellence, strategic
              thinking, entrepreneurial competence, ethical leadership, and purpose-driven
              character.
            </p>
            <Link href="/build" className="mt-6 inline-block text-sm font-semibold uppercase tracking-wide">
              Explore the Academy →
            </Link>
          </div>
        </div>
      </Section>

      {latestThink.length > 0 && (
        <Section className="pt-0">
          <SectionHeading eyebrow="What I Think" title="Recent writing" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {latestThink.map((entry) => (
              <ThinkCard key={entry.slug} entry={entry} />
            ))}
          </div>
        </Section>
      )}

      <Section className="pt-0">
        <div className="rounded-3xl border border-line p-12 text-center md:p-20">
          <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Have an idea worth building?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Whether you&apos;re developing a brand, solving a communication problem, building a
            creative team, or exploring an idea that needs structure, I&apos;d love to hear about
            it.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-ink px-6 py-3 text-sm font-semibold uppercase tracking-wide text-paper transition-opacity hover:opacity-90"
          >
            Start a Conversation →
          </Link>
        </div>
      </Section>
    </>
  );
}
