import type { Metadata } from "next";
import Image from "next/image";
import { Section, SectionHeading } from "@/components/Section";
import { Timeline, type TimelineEntry } from "@/components/Timeline";
import { HeroReveal } from "@/components/HeroReveal";

export const metadata: Metadata = {
  title: "About — Reiziger Ashu",
  description: "The designer behind the work.",
};

const JOURNEY: TimelineEntry[] = [
  {
    period: "2021 — The Beginning",
    title: "The Beginning",
    description:
      "Establishing the foundations of visual language and understanding the core principles of composition, typography, and user interaction. The focus was on learning the syntax of design before attempting to write poetry.",
  },
  {
    period: "2022–2023 — The Craft",
    title: "The Craft",
    description:
      "Deepening technical expertise. Moving beyond aesthetics to solve complex usability problems. This era was defined by a rigorous pursuit of pixel-perfect execution and an obsession with detail.",
  },
  {
    period: "2023–2024 — The Strategist",
    title: "The Strategist",
    description:
      "Bridging the gap between design and business objectives. Learning to articulate the 'why' behind design decisions and aligning product vision with market realities. Design became a tool for organizational growth.",
  },
  {
    period: "2024–2025 — The Builder",
    title: "The Builder",
    description:
      "Transitioning from contributing to establishing ecosystems. Designing scalable systems, architecting holistic experiences, and leading cross-functional initiatives from conception to deployment.",
  },
  {
    period: "2026 → The Transformation",
    title: "The Transformation",
    description: "Shaping the future narrative…",
  },
];

const VALUES = [
  {
    title: "Purpose",
    description:
      "Design must have intent. I believe in creating solutions that are not just beautiful, but meaningful — addressing real user needs and driving sustainable business value.",
  },
  {
    title: "Excellence",
    description:
      "A commitment to the highest standards of craft. Rejecting 'good enough' in favor of rigorous iteration and continuous refinement.",
  },
  {
    title: "Curiosity",
    description:
      "The relentless desire to understand 'why'. Staying open to new paradigms, technologies, and perspectives to inform better design decisions.",
  },
  {
    title: "Integrity",
    description:
      "Designing ethically and honestly. Ensuring that digital experiences respect user privacy, promote accessibility, and foster trust.",
  },
  {
    title: "Impact",
    description: "Measuring success by the positive change created in the real world.",
  },
  {
    title: "Stewardship",
    description:
      "Taking responsibility for the long-term health of the products and systems I build.",
  },
];

export default function AboutPage() {
  return (
    <div className="theme-dark-fixed -mb-10 bg-paper pb-10 text-ink">
      <Section className="relative overflow-hidden px-[0px] pb-[10px] pt-[10px] md:flex md:h-[calc(100dvh-81px)] md:items-center md:px-[0px] md:pb-[10px] md:pt-[10px]">
        <div className="grid gap-10 md:h-full md:w-full md:grid-cols-[3fr_2fr] md:grid-rows-1 md:items-center md:gap-0">
          <HeroReveal delay={0.15} className="md:h-full md:self-stretch">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl md:aspect-auto md:-mt-[10px] md:-mb-[10px] md:h-[calc(100%+20px)]">
              <Image
                src="/images/reiziger-ashu-portrait.jpg"
                alt="Reiziger Ashu"
                fill
                priority
                sizes="(min-width: 768px) 60vw, 100vw"
                className="object-cover object-[50%_22%]"
              />
            </div>
          </HeroReveal>
          <div className="md:pr-[80px]">
            <HeroReveal delay={0}>
              <h1 className="font-display text-[3em] font-bold leading-tight tracking-tight">
                The Designer
                <br />
                Behind the Work
              </h1>
            </HeroReveal>
            <HeroReveal delay={0.2}>
              <blockquote className="mt-6 max-w-xl font-display text-xl italic text-muted">
                &ldquo;I didn&apos;t begin designing because I wanted to make things look good. I
                began because I became fascinated by the power of ideas.&rdquo;
              </blockquote>
            </HeroReveal>
          </div>
        </div>
      </Section>

      <Section outerClassName="bg-ink/5 border-y border-line" className="pb-20 pt-[10px] md:pb-40">
        <div className="grid gap-10 md:grid-cols-[1fr_2fr]">
          <div>
            <h3 className="font-display text-2xl font-bold tracking-tight">The Journey</h3>
            <p className="mt-3 text-muted">
              A linear progression of mastery, evolving from foundational craft to visionary
              leadership.
            </p>
          </div>
          <Timeline entries={JOURNEY} current="2021 — The Beginning" />
        </div>
      </Section>

      <div className="relative overflow-hidden">
        <Image
          src="/images/about-values-desk.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative mx-auto max-w-[1920px] px-3 pb-[40px] pt-[40px] md:px-10 md:pb-[40px] md:pt-[40px]">
          <SectionHeading centered divider title="What guides my work" />
          <div className="mt-12 border-t border-ink/15">
            {VALUES.map((value, i) => (
              <div
                key={value.title}
                className="grid gap-2 border-b border-ink/15 py-6 md:grid-cols-[80px_1fr_2fr] md:items-baseline md:gap-8"
              >
                <span className="font-display text-sm font-semibold text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-lg font-bold tracking-tight">{value.title}</h3>
                <p className="text-sm text-ink/80">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
