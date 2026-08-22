import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/Section";
import { Timeline, type TimelineEntry } from "@/components/Timeline";
import { FrameworkDiagram } from "@/components/FrameworkDiagram";

export const metadata: Metadata = {
  title: "About — Reiziger Ashu",
  description: "The designer behind the work.",
};

const JOURNEY: TimelineEntry[] = [
  {
    period: "2021 — The Beginning",
    title: "Started the design career",
    description: "The first steps into design, driven by curiosity more than craft.",
  },
  {
    period: "2022–2023 — The Craft",
    title: "Developing technical excellence",
    description: "Building fluency and discovering a design voice.",
  },
  {
    period: "2023–2024 — The Strategist",
    title: "Beyond producing graphics",
    description: "Moving toward understanding brands, people, communication, and systems.",
  },
  {
    period: "2024–2025 — The Builder",
    title: "Developing Sigma Studio",
    description: "Expanding into training, consulting, and systems.",
  },
  {
    period: "2026 → The Transformation",
    title: "Building a broader ecosystem",
    description: "Design, education, leadership, and national transformation.",
  },
];

const VALUES = [
  { title: "Purpose", description: "I believe creative work should serve something bigger than aesthetics." },
  { title: "Excellence", description: "I pursue quality because the work represents the thinking behind it." },
  { title: "Curiosity", description: "I remain a student because better questions lead to better solutions." },
  { title: "Integrity", description: "I want the way I work to be as meaningful as what I produce." },
  { title: "Impact", description: "The ultimate measure isn't attention. It's meaningful change." },
  { title: "Stewardship", description: "Skills, opportunities, relationships, and influence are things to develop and use responsibly." },
];

export default function AboutPage() {
  return (
    <>
      <Section className="pt-16 md:pt-24">
        <SectionHeading eyebrow="About" title="The Designer Behind the Work" />
        <div className="mt-8 max-w-2xl space-y-4 text-lg text-muted">
          <p>
            I didn&apos;t begin designing because I wanted to make things look good. I began
            because I became fascinated by the power of ideas.
          </p>
          <p>
            An idea can remain invisible until someone gives it language. A vision can remain
            confusing until someone gives it structure. An organization can struggle to
            communicate its value until someone helps it discover its identity.
          </p>
          <p className="font-medium text-ink">That&apos;s what design became for me. A way of making invisible things visible.</p>
        </div>
      </Section>

      <Section className="pt-0">
        <SectionHeading eyebrow="The Journey" title="How this came together" />
        <div className="mt-12 max-w-2xl">
          <Timeline entries={JOURNEY} />
        </div>
      </Section>

      <Section className="pt-0">
        <SectionHeading eyebrow="Philosophy" title="Design is more than aesthetics." />
        <div className="mt-8 max-w-2xl space-y-4 text-lg text-muted">
          <p>
            I believe design is a tool for understanding. It helps us discover identity,
            communicate vision, solve problems, organize complexity, and create experiences that
            move people.
          </p>
          <p className="font-medium text-ink">
            The best design doesn&apos;t simply attract attention. It creates clarity. It creates
            connection. It creates movement.
          </p>
        </div>
        <div className="mt-12 overflow-x-auto">
          <FrameworkDiagram />
        </div>
      </Section>

      <Section className="pt-0">
        <SectionHeading eyebrow="Values" title="What guides my work" />
        <div className="mt-12 grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {VALUES.map((value) => (
            <div key={value.title}>
              <h3 className="font-display text-lg font-semibold tracking-tight">{value.title}</h3>
              <p className="mt-2 text-muted">{value.description}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
