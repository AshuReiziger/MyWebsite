import type { Metadata } from "next";
import Image from "next/image";
import { Section, SectionHeading } from "@/components/Section";
import { Timeline, type TimelineEntry } from "@/components/Timeline";
import { IconBadge } from "@/components/icons";
import {
  PurposeIcon,
  ExcellenceIcon,
  CuriosityIcon,
  IntegrityIcon,
  ImpactIcon,
  StewardshipIcon,
} from "@/components/icons";

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
    icon: <PurposeIcon />,
  },
  {
    title: "Excellence",
    description:
      "A commitment to the highest standards of craft. Rejecting 'good enough' in favor of rigorous iteration and continuous refinement.",
    icon: <ExcellenceIcon />,
  },
  {
    title: "Curiosity",
    description:
      "The relentless desire to understand 'why'. Staying open to new paradigms, technologies, and perspectives to inform better design decisions.",
    icon: <CuriosityIcon />,
  },
  {
    title: "Integrity",
    description:
      "Designing ethically and honestly. Ensuring that digital experiences respect user privacy, promote accessibility, and foster trust.",
    icon: <IntegrityIcon />,
  },
  {
    title: "Impact",
    description: "Measuring success by the positive change created in the real world.",
    icon: <ImpactIcon />,
  },
  {
    title: "Stewardship",
    description:
      "Taking responsibility for the long-term health of the products and systems I build.",
    icon: <StewardshipIcon />,
  },
];

export default function AboutPage() {
  const [purpose, excellence, curiosity, integrity, impact, stewardship] = VALUES;

  return (
    <div className="theme-dark-fixed -mb-32 bg-paper pb-32 text-ink">
      <Section className="pt-16 text-center md:pt-24">
        <SectionHeading centered divider title="The Designer Behind the Work" />
        <blockquote className="mx-auto mt-10 max-w-2xl border-l-2 border-accent pl-6 text-left font-display text-xl italic">
          &ldquo;I didn&apos;t begin designing because I wanted to make things look good. I began
          because I became fascinated by the power of ideas.&rdquo;
        </blockquote>
        <div className="relative mt-16 h-screen w-full overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-accent/30 via-paper to-paper">
          <Image
            src="/images/reiziger-ashu-portrait.jpg"
            alt="Reiziger Ashu"
            fill
            className="object-cover object-[50%_22%]"
          />
        </div>
      </Section>

      <Section outerClassName="bg-ink/5 border-y border-line">
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

      <Section className="pt-0">
        <SectionHeading centered divider title="What guides my work" />
        <div className="mt-12 grid auto-rows-[minmax(220px,auto)] grid-cols-1 gap-6 md:grid-cols-3">
          <ValueCard value={purpose} className="md:col-span-2" />
          <ValueCard value={excellence} />
          <ValueCard value={curiosity} />
          <ValueCard value={integrity} />
          <div className="grid grid-rows-2 gap-6">
            <CompactValueCard value={impact} />
            <CompactValueCard value={stewardship} />
          </div>
        </div>
      </Section>
    </div>
  );
}

function ValueCard({
  value,
  className,
}: {
  value: (typeof VALUES)[number];
  className?: string;
}) {
  return (
    <div className={`rounded-2xl border border-line p-8 transition-colors hover:border-accent/50 ${className ?? ""}`}>
      <IconBadge>{value.icon}</IconBadge>
      <h3 className="mt-6 font-display text-lg font-bold tracking-tight">{value.title}</h3>
      <p className="mt-3 text-muted">{value.description}</p>
    </div>
  );
}

function CompactValueCard({ value }: { value: (typeof VALUES)[number] }) {
  return (
    <div className="flex flex-col justify-center rounded-2xl border border-line p-6 transition-colors hover:border-accent/50">
      <h3 className="flex items-center gap-2 font-display text-lg font-bold tracking-tight">
        <span className="h-2 w-2 shrink-0 bg-accent" />
        {value.title}
      </h3>
      <p className="mt-2 text-sm text-muted">{value.description}</p>
    </div>
  );
}
