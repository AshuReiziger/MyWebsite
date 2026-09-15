import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/Section";
import { HeroReveal } from "@/components/HeroReveal";
import { ArrowRightIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Teach — Reiziger Ashu",
  description: "Design training, workshops, mentorship, and speaking.",
};

const OFFERINGS: {
  title: string;
  description: string;
  href?: string;
  cta?: string;
  image?: string;
}[] = [
  {
    title: "Design Training",
    description:
      "Structured programs designed to elevate technical mastery and conceptual thinking for mid-level designers aiming for senior roles.",
    image: "/images/teach/design-training.jpg",
  },
  {
    title: "Workshops",
    description:
      "Intensive, collaborative sessions focusing on specific strategic frameworks, design systems, or creative leadership challenges.",
    href: "/teach/workshops",
    cta: "See Workshops",
    image: "/images/teach/workshops.jpg",
  },
  {
    title: "Mentorship",
    description:
      "1-on-1 guidance focusing on career trajectory, portfolio refinement, and navigating the complexities of the design industry.",
    href: "/teach/mentorship",
    cta: "See Mentorship Tracks",
    image: "/images/teach/mentorship.jpg",
  },
  {
    title: "Free Resources",
    description: "Practical guides, frameworks and tools for designers, creatives and organizations.",
    href: "/resources",
    cta: "Explore Resources",
    image: "/images/teach/free-resources.jpg",
  },
];

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
    <div className="theme-dark-fixed -mb-10 bg-paper pb-10 text-ink">
      <Section className="relative overflow-hidden px-[0px] pb-[10px] pt-[10px] md:flex md:h-[calc(100dvh-81px)] md:items-center md:px-[0px] md:pb-[10px] md:pt-[10px]">
        <div className="grid gap-10 md:h-full md:w-full md:grid-cols-[2fr_3fr] md:grid-rows-1 md:items-center md:gap-0">
          <div className="md:pl-[80px]">
            <HeroReveal delay={0}>
              <h1 className="font-display text-[3em] font-bold leading-tight tracking-tight">
                I believe knowledge should multiply.
              </h1>
            </HeroReveal>
            <HeroReveal delay={0.2}>
              <p className="mt-6 max-w-md text-muted">
                Everything I learn shouldn&apos;t end with me. Part of my work is helping other
                creatives develop the thinking, skills, systems, and character required to use
                their gifts meaningfully.
              </p>
            </HeroReveal>
          </div>
          <HeroReveal delay={0.15} className="md:h-full md:self-stretch">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl md:aspect-auto md:-mt-[10px] md:-mb-[10px] md:h-[calc(100%+20px)]">
              <Image
                src="/images/teach-hero-portrait.webp"
                alt=""
                fill
                priority
                sizes="(min-width: 768px) 60vw, 100vw"
                className="object-cover object-top"
              />
            </div>
          </HeroReveal>
        </div>
      </Section>

      <Section className="pt-[40px] pb-[40px] md:pt-[40px] md:pb-[40px]">
        <div className="grid gap-6 md:grid-cols-2">
          {OFFERINGS.map((offering) => {
            const content = (
              <>
                <h3 className="font-display text-lg font-bold tracking-tight">
                  {offering.title}
                </h3>
                <p className="mt-2 text-muted">{offering.description}</p>
                {offering.href && offering.cta && (
                  <span className="mt-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-accent">
                    {offering.cta} <ArrowRightIcon className="h-4 w-4" />
                  </span>
                )}
              </>
            );

            const cardClassName = `group relative isolate overflow-hidden rounded-2xl border border-line p-8 transition-colors hover:border-accent/50${
              offering.image ? " min-h-[360px] md:aspect-square" : ""
            }`;

            const inner = offering.image ? (
              <>
                <Image
                  src={offering.image}
                  alt=""
                  fill
                  className="-z-10 object-cover grayscale transition-[filter,transform] duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-paper/90 via-paper/75 to-paper/90" />
                {content}
              </>
            ) : (
              content
            );

            if (offering.href) {
              return (
                <Link key={offering.title} href={offering.href} className={cardClassName}>
                  {inner}
                </Link>
              );
            }

            return (
              <div key={offering.title} className={cardClassName}>
                {inner}
              </div>
            );
          })}
        </div>
      </Section>

      <Section className="pt-[40px] pb-[40px] md:pt-[40px] md:pb-[40px]">
        <div className="rounded-2xl border-l-2 border-accent bg-paper p-10 shadow-sm md:p-14">
          <SectionHeading title="Invite me to speak" />
          <p className="mt-4 max-w-xl text-muted">
            I regularly speak at conferences, corporate retreats, and educational institutions.
            My talks blend theoretical depth with practical application.
          </p>
          <p className="mt-8 text-xs font-semibold uppercase tracking-widest text-muted">
            Core Topics
          </p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {SPEAKING_TOPICS.map((topic) => (
              <li key={topic} className="flex items-center gap-2 text-muted">
                <span className="h-1.5 w-1.5 shrink-0 bg-accent" />
                {topic}
              </li>
            ))}
          </ul>
          <Link
            href="/teach/speaking"
            className="mt-8 inline-block rounded-full border border-line px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-colors hover:border-ink"
          >
            Book a Session
          </Link>
        </div>
      </Section>
    </div>
  );
}
