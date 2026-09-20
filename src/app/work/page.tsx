import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/Section";
import { WorkIndex } from "@/components/WorkIndex";
import { getAllWork } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work — Reiziger Ashu",
  description: "Selected work: identities, campaigns, systems, and creative solutions.",
};

export default function WorkPage() {
  const work = getAllWork();

  return (
    <div className="theme-dark-fixed -mb-10 bg-paper pb-10 text-ink">
      <Section className="pt-16 md:pt-24">
        <SectionHeading
          eyebrow="Portfolio"
          title="Where Ideas Become Visible"
          description="A collection of identities, campaigns, systems, and creative solutions built for people and organizations with something meaningful to communicate."
        />
        <WorkIndex entries={work} />
      </Section>
    </div>
  );
}
