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
    <div className="theme-dark-fixed -mb-32 bg-paper pb-32 text-ink">
      <Section className="pt-16 md:pt-24">
        <SectionHeading
          eyebrow="Portfolio"
          title="Where Ideas Become Visible"
          description="A collection of identities, campaigns, systems, and creative solutions built for people and organizations with something meaningful to communicate."
          centered
        />
        <div className="mx-auto mt-16 flex max-w-5xl flex-col gap-24">
          {work.map((entry, i) => (
            <WorkCard key={entry.slug} entry={entry} index={i} />
          ))}
        </div>
      </Section>
    </div>
  );
}
