import Image from "next/image";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/Section";
import { CapabilityCard, type Capability } from "@/components/CapabilityCard";
import { ProcessStepper } from "@/components/ProcessStepper";
import { ThinkCard } from "@/components/ThinkCard";
import { SelectedWorkGrid } from "@/components/SelectedWorkGrid";
import { HeroReveal } from "@/components/HeroReveal";
import { ClientLogos } from "@/components/ClientLogos";
import { Testimonial, type TestimonialEntry } from "@/components/Testimonial";
import { ResourceCTA } from "@/components/ResourceCTA";
import { getAllThink, getAllWork, getFeaturedResource } from "@/lib/content";

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
    image: "/images/capabilities/design.jpg",
  },
  {
    title: "Strategy",
    description:
      "I help individuals and organizations move from scattered ideas to clearer direction, stronger positioning, and practical systems.",
    image: "/images/capabilities/strategy.jpg",
  },
  {
    title: "Education",
    description:
      "I teach creatives how to move beyond software proficiency and develop the thinking, discipline, systems, and professional skills required to thrive.",
    image: "/images/capabilities/education.jpg",
  },
  {
    title: "Leadership",
    description:
      "I develop creative teams, media units, and communities by building cultures that encourage excellence, growth, initiative, collaboration, and purpose.",
    image: "/images/capabilities/leadership.jpg",
  },
];

export default function Home() {
  const latestThink = getAllThink().slice(0, 3);
  const featuredResource = getFeaturedResource();
  const selectedWork = getAllWork().slice(0, 3);

  return (
    <div className="theme-dark-fixed -mb-10 bg-paper pb-10 text-ink">
      <Section className="relative overflow-hidden px-[0px] pb-[10px] pt-[10px] md:flex md:h-[calc(100dvh-81px)] md:items-center md:px-[0px] md:pb-[10px] md:pt-[10px]">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gradient-to-br from-accent/10 via-muted/10 to-transparent blur-3xl"
        />
        <div className="relative isolate grid min-h-[560px] gap-0 md:h-full md:min-h-0 md:w-full md:grid-cols-[2fr_3fr] md:grid-rows-1 md:items-center">
          <HeroReveal delay={0.15} className="absolute inset-0 -z-10 md:relative md:z-auto md:h-full md:self-stretch">
            <div className="relative h-full w-full overflow-hidden md:aspect-auto md:-mt-[10px] md:-mb-[10px] md:h-[calc(100%+20px)] md:rounded-2xl">
              <Image
                src="/images/reiziger-ashu-hero-portrait.webp"
                alt="Reiziger Ashu"
                fill
                priority
                sizes="(min-width: 768px) 60vw, 100vw"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-paper/60 md:hidden" />
            </div>
          </HeroReveal>
          <div className="relative z-10 flex flex-col justify-end pb-8 pl-[10px] pr-[10px] md:justify-center md:pb-0 md:pl-[80px] md:pr-[0px]">
            <HeroReveal delay={0}>
              <h1 className="font-display text-[2em] font-bold leading-tight tracking-tight md:text-[3em]">
                Reiziger Ashu
              </h1>
            </HeroReveal>
            <HeroReveal delay={0.2}>
              <p className="mt-6 max-w-2xl text-ink/80 md:text-muted">
                Designer, strategist, educator, and creative leader passionate about using
                design to help people and organizations discover who they are, communicate
                what they believe, and build what they envision.
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
          </div>
        </div>
      </Section>

      <Section className="pt-[40px] pb-[40px] md:pt-[40px] md:pb-[40px]">
        <p className="text-center text-sm font-semibold uppercase tracking-widest text-muted">
          Trusted by teams building something worth naming
        </p>
      </Section>
      <div className="mt-8">
        <ClientLogos />
      </div>

      {selectedWork.length > 0 && (
        <>
          <Section className="pt-[40px] pb-[40px] md:pt-[40px] md:pb-[40px]">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading eyebrow="Selected Work" title="Design systems and brand identities, built to last." />
              <Link
                href="/work"
                className="text-sm font-semibold uppercase tracking-wide text-accent hover:underline"
              >
                See All Work →
              </Link>
            </div>
          </Section>
          <div className="mt-10">
            <SelectedWorkGrid entries={selectedWork} />
          </div>
        </>
      )}

      <Section className="pt-[40px] pb-[40px] text-center md:pt-[40px] md:pb-[40px]">
        <SectionHeading
          title="Design is more than aesthetics."
          description="I believe design is a tool for understanding. It helps us discover identity, communicate vision, solve problems, organize complexity, and create experiences that move people."
          centered
        />
        <div className="mx-auto mt-10 max-w-3xl">
          <ProcessStepper current="Design" />
        </div>
      </Section>

      <Section className="pt-[40px] pb-[40px] md:pt-[40px] md:pb-[40px]">
        <SectionHeading
          eyebrow="Expertise"
          title="What I do"
          description="A holistic approach bridging the gap between high-level vision and execution."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CAPABILITIES.map((capability, i) => (
            <CapabilityCard key={capability.title} {...capability} index={i + 1} />
          ))}
        </div>
      </Section>

      {featuredResource && (
        <ResourceCTA
          resource={featuredResource}
          headline={featuredResource.frontmatter.heroHeadline}
          body={`Download my free ${featuredResource.frontmatter.title} and evaluate your brand before investing in a redesign.`}
          ctaLabel="Get the Free Guide →"
          variant="centered"
        />
      )}

      <Section className="pt-[40px] pb-[40px] md:pt-[40px] md:pb-[40px]">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">Ventures</p>
        <div className="mt-3 max-w-2xl">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
            Building the future
          </h2>
          <p className="mt-4 text-lg text-ink/70">
            Beyond consulting, I am actively building ventures that institutionalize my
            philosophy on design, education, and strategic growth.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-ink/5 p-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">
              Creative Consultancy
            </p>
            <h3 className="mt-2 font-display text-xl font-bold tracking-tight">Sigma Studio</h3>
            <p className="mt-3 text-ink/70">
              A strategic design consultancy partnering with visionary organizations to define
              their identity, communicate their value, and architect scalable digital
              experiences.
            </p>
            <Link
              href="/build"
              className="mt-6 inline-block text-sm font-semibold uppercase tracking-wide text-ink"
            >
              Visit Sigma Studio →
            </Link>
          </div>
          <div className="rounded-2xl bg-ink/5 p-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">
              Design Education
            </p>
            <h3 className="mt-2 font-display text-xl font-bold tracking-tight">
              Sigma Studio Academy
            </h3>
            <p className="mt-3 text-ink/70">
              An educational platform dedicated to teaching the strategic, non-aesthetic
              foundations of design leadership, systems thinking, and intentional growth.
            </p>
            <Link
              href="/build"
              className="mt-6 inline-block text-sm font-semibold uppercase tracking-wide text-ink"
            >
              Visit the Academy →
            </Link>
          </div>
        </div>
      </Section>

      {latestThink.length > 0 && (
        <Section className="pt-[40px] pb-[40px] md:pt-[40px] md:pb-[40px]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="What I Think" title="Recent writing" />
            <Link
              href="/think"
              className="text-sm font-semibold uppercase tracking-wide text-accent hover:underline"
            >
              View All Articles →
            </Link>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {latestThink.map((entry) => (
              <ThinkCard key={entry.slug} entry={entry} />
            ))}
          </div>
        </Section>
      )}

      <Section className="pt-[40px] pb-[40px] md:pt-[40px] md:pb-[40px]">
        <SectionHeading eyebrow="Kind Words" title="Words from people I've worked with" />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {TESTIMONIALS.map((testimonial, i) => (
            <Testimonial key={i} {...testimonial} />
          ))}
        </div>
      </Section>

      <Section className="pt-[40px] pb-[40px] md:pt-[40px] md:pb-[40px]">
        <div className="relative overflow-hidden rounded-3xl border border-line p-12 text-center md:p-20">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/images/have-an-idea-worth-building-poster.jpg"
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/videos/have-an-idea-worth-building.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/55" />
          <div className="relative">
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              Have an idea worth building?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              Whether you&apos;re developing a brand, solving a communication problem, building a
              creative team, or exploring an idea that needs structure, I&apos;d love to hear
              about it.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-block rounded-full bg-ink px-6 py-3 text-sm font-semibold uppercase tracking-wide text-paper transition-opacity hover:opacity-90"
            >
              Start a Conversation →
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
