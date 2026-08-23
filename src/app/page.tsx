import Link from "next/link";
import { Section, SectionHeading } from "@/components/Section";
import { CapabilityCard, type Capability } from "@/components/CapabilityCard";
import { ProcessStepper } from "@/components/ProcessStepper";
import { ThinkCard } from "@/components/ThinkCard";
import { HeroReveal } from "@/components/HeroReveal";
import { ClientLogos } from "@/components/ClientLogos";
import { Testimonial, type TestimonialEntry } from "@/components/Testimonial";
import { ResourceCTA } from "@/components/ResourceCTA";
import { DesignIcon, StrategyIcon, EducationIcon, LeadershipIcon } from "@/components/icons";
import { getAllThink, getFeaturedResource } from "@/lib/content";

// Placeholder testimonials — replace with real client feedback once available.
const TESTIMONIALS: TestimonialEntry[] = [
  {
    quote:
      "Placeholder testimonial — replace with a real quote from a client describing the impact of the work.",
    name: "Client Name",
    role: "Role, Company",
    project: "Project name",
  },
  {
    quote:
      "Placeholder testimonial — replace with a real quote from a client describing the impact of the work.",
    name: "Client Name",
    role: "Role, Company",
    project: "Project name",
  },
];

const CAPABILITIES: Capability[] = [
  {
    title: "Design",
    description:
      "I create visual identities, communication systems, digital experiences, and strategic design solutions that help ideas become clear, compelling, and memorable.",
    icon: <DesignIcon />,
  },
  {
    title: "Strategy",
    description:
      "I help individuals and organizations move from scattered ideas to clearer direction, stronger positioning, and practical systems.",
    icon: <StrategyIcon />,
  },
  {
    title: "Education",
    description:
      "I teach creatives how to move beyond software proficiency and develop the thinking, discipline, systems, and professional skills required to thrive.",
    icon: <EducationIcon />,
  },
  {
    title: "Leadership",
    description:
      "I develop creative teams, media units, and communities by building cultures that encourage excellence, growth, initiative, collaboration, and purpose.",
    icon: <LeadershipIcon />,
  },
];

export default function Home() {
  const latestThink = getAllThink().slice(0, 3);
  const featuredResource = getFeaturedResource();

  return (
    <>
      <Section className="relative overflow-hidden pt-16 md:pt-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gradient-to-br from-accent/10 via-muted/10 to-transparent blur-3xl"
        />
        <HeroReveal delay={0}>
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            Reiziger Ashu
          </p>
        </HeroReveal>
        <HeroReveal delay={0.1}>
          <h1 className="mt-4 max-w-4xl font-display text-4xl uppercase leading-tight tracking-tight md:text-6xl">
            I don&apos;t just design things. I design what they can become.
          </h1>
        </HeroReveal>
        <HeroReveal delay={0.2}>
          <p className="mt-6 max-w-2xl text-lg text-muted md:text-xl">
            I&apos;m Reiziger Ashu — a designer, strategist, educator, and creative leader
            passionate about using design to help people and organizations discover who they
            are, communicate what they believe, and build what they envision.
          </p>
        </HeroReveal>
        <HeroReveal delay={0.3}>
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
              Work With Me
            </Link>
          </div>
        </HeroReveal>
      </Section>

      <Section className="pt-0">
        <p className="text-center text-sm font-semibold uppercase tracking-widest text-muted">
          Trusted by teams building something worth naming
        </p>
        <div className="mt-8">
          <ClientLogos />
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <SectionHeading
            title="Design is more than aesthetics."
            description="I believe design is a tool for understanding. It helps us discover identity, communicate vision, solve problems, organize complexity, and create experiences that move people."
          />
          <ProcessStepper current="Design" />
        </div>
      </Section>

      <Section className="pt-0">
        <SectionHeading
          eyebrow="Expertise"
          title="What I do"
          description="A holistic approach bridging the gap between high-level vision and execution."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {CAPABILITIES.map((capability, i) => (
            <CapabilityCard key={capability.title} {...capability} index={i + 1} />
          ))}
        </div>
      </Section>

      {featuredResource && (
        <Section className="pt-0">
          <ResourceCTA
            resource={featuredResource}
            headline={featuredResource.frontmatter.heroHeadline}
            body={`Download my free ${featuredResource.frontmatter.title} and evaluate your brand before investing in a redesign.`}
            ctaLabel="Get the Free Guide →"
          />
        </Section>
      )}

      <Section outerClassName="bg-ink text-paper">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">Ventures</p>
        <div className="mt-3 max-w-2xl">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
            Building the future
          </h2>
          <p className="mt-4 text-lg text-paper/70">
            Beyond consulting, I am actively building ventures that institutionalize my
            philosophy on design, education, and strategic growth.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-paper/5 p-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">
              Creative Consultancy
            </p>
            <h3 className="mt-2 font-display text-xl font-bold tracking-tight">Sigma Studio</h3>
            <p className="mt-3 text-paper/70">
              A strategic design consultancy partnering with visionary organizations to define
              their identity, communicate their value, and architect scalable digital
              experiences.
            </p>
            <Link
              href="/build"
              className="mt-6 inline-block text-sm font-semibold uppercase tracking-wide text-paper"
            >
              Visit Sigma Studio →
            </Link>
          </div>
          <div className="rounded-2xl bg-paper/5 p-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">
              Design Education
            </p>
            <h3 className="mt-2 font-display text-xl font-bold tracking-tight">
              Sigma Studio Academy
            </h3>
            <p className="mt-3 text-paper/70">
              An educational platform dedicated to teaching the strategic, non-aesthetic
              foundations of design leadership, systems thinking, and intentional growth.
            </p>
            <Link
              href="/build"
              className="mt-6 inline-block text-sm font-semibold uppercase tracking-wide text-paper"
            >
              Visit the Academy →
            </Link>
          </div>
        </div>
      </Section>

      {latestThink.length > 0 && (
        <Section className="pt-20 md:pt-28">
          <SectionHeading eyebrow="What I Think" title="Recent writing" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {latestThink.map((entry) => (
              <ThinkCard key={entry.slug} entry={entry} />
            ))}
          </div>
        </Section>
      )}

      <Section className="pt-0">
        <SectionHeading eyebrow="Kind Words" title="Words from people I've worked with" />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {TESTIMONIALS.map((testimonial, i) => (
            <Testimonial key={i} {...testimonial} />
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="rounded-3xl border border-line p-12 text-center md:p-20">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
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
