import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/Section";
import { IconBadge, CompassIcon, WorkshopIcon, MentorshipIcon, ResourcesIcon, ArrowRightIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Teach — Reiziger Ashu",
  description: "Design training, workshops, mentorship, and speaking.",
};

const OFFERINGS: {
  title: string;
  description: string;
  icon: ReactNode;
  href?: string;
  cta?: string;
}[] = [
  {
    title: "Design Training",
    description:
      "Structured programs designed to elevate technical mastery and conceptual thinking for mid-level designers aiming for senior roles.",
    icon: <CompassIcon />,
  },
  {
    title: "Workshops",
    description:
      "Intensive, collaborative sessions focusing on specific strategic frameworks, design systems, or creative leadership challenges.",
    icon: <WorkshopIcon />,
  },
  {
    title: "Mentorship",
    description:
      "1-on-1 guidance focusing on career trajectory, portfolio refinement, and navigating the complexities of the design industry.",
    icon: <MentorshipIcon />,
  },
  {
    title: "Free Resources",
    description: "Practical guides, frameworks and tools for designers, creatives and organizations.",
    icon: <ResourcesIcon />,
    href: "/resources",
    cta: "Explore Resources",
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
    <>
      <Section className="pt-16 md:pt-24">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h1 className="font-display text-4xl uppercase leading-tight tracking-tight md:text-5xl">
              I believe knowledge should multiply.
            </h1>
            <p className="mt-6 max-w-md text-lg text-muted">
              Everything I learn shouldn&apos;t end with me. Part of my work is helping other
              creatives develop the thinking, skills, systems, and character required to use
              their gifts meaningfully.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-block rounded-full bg-ink px-6 py-3 text-sm font-semibold uppercase tracking-wide text-paper transition-opacity hover:opacity-90"
            >
              Learn With Me →
            </Link>
          </div>
          <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-line to-muted/20" />
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-6 md:grid-cols-2">
          {OFFERINGS.map((offering) => {
            const content = (
              <>
                <IconBadge>{offering.icon}</IconBadge>
                <h3 className="mt-5 font-display text-lg font-bold tracking-tight">
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

            if (offering.href) {
              return (
                <Link
                  key={offering.title}
                  href={offering.href}
                  className="group rounded-2xl border border-line p-8 transition-colors hover:border-accent/50"
                >
                  {content}
                </Link>
              );
            }

            return (
              <div key={offering.title} className="rounded-2xl border border-line p-8">
                {content}
              </div>
            );
          })}
        </div>
      </Section>

      <Section className="pt-0">
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
            href="/contact"
            className="mt-8 inline-block rounded-full border border-line px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-colors hover:border-ink"
          >
            Book a Session
          </Link>
        </div>
      </Section>
    </>
  );
}
