import type { Metadata } from "next";
import Image from "next/image";
import { Section, SectionHeading } from "@/components/Section";
import { Timeline, type TimelineEntry } from "@/components/Timeline";

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
      <Section className="pb-0 pt-16 text-center md:pb-0 md:pt-24">
        <SectionHeading centered divider title="The Designer Behind the Work" />
        <blockquote className="mx-auto mt-10 max-w-2xl border-l-2 border-accent pl-6 text-left font-display text-xl italic">
          &ldquo;I didn&apos;t begin designing because I wanted to make things look good. I began
          because I became fascinated by the power of ideas.&rdquo;
        </blockquote>
      </Section>

      <div className="group relative mt-16 aspect-[4/5] w-full overflow-hidden bg-gradient-to-br from-accent/30 via-paper to-paper md:aspect-auto md:h-screen">
        <Image
          src="/images/reiziger-ashu-portrait.jpg"
          alt="Reiziger Ashu"
          fill
          className="object-cover object-[50%_22%] grayscale transition-[filter] duration-700 group-hover:grayscale-0"
        />
      </div>

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

      <Section className="pb-8 pt-0 md:pb-40">
        <SectionHeading centered divider title="What guides my work" />
        <div className="mt-12 border-t border-line">
          {VALUES.map((value, i) => (
            <div
              key={value.title}
              className="grid gap-2 border-b border-line py-6 md:grid-cols-[80px_1fr_2fr] md:items-baseline md:gap-8"
            >
              <span className="font-display text-sm font-semibold text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-lg font-bold tracking-tight">{value.title}</h3>
              <p className="text-sm text-muted">{value.description}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
