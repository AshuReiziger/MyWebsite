import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/Section";
import { WorkCard } from "@/components/WorkCard";
import { getAllWork } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work — Reiziger Ashu",
  description: "Selected work: identities, campaigns, systems, and creative solutions.",
};

export default function WorkPage() {
  const work = getAllWork();

  return (
    <Section className="pt-16 md:pt-24">
      <SectionHeading
        eyebrow="Portfolio"
        title="Selected Work"
        description="A collection of identities, campaigns, systems, experiences, and creative solutions built for people and organizations with something meaningful to communicate."
        centered
      />
      <div className="mx-auto mt-16 flex max-w-5xl flex-col gap-8">
        {work.map((entry) => (
          <WorkCard key={entry.slug} entry={entry} />
        ))}
      </div>
    </Section>
  );
}
