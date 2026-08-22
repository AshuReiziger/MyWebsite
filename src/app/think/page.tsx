import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/Section";
import { ThinkIndex } from "@/components/ThinkIndex";
import { getAllThink } from "@/lib/content";

export const metadata: Metadata = {
  title: "Think — Reiziger Ashu",
  description: "Ideas, frameworks, and writing on design, identity, systems, and leadership.",
};

export default function ThinkPage() {
  const articles = getAllThink();

  return (
    <Section className="pt-16 md:pt-24">
      <SectionHeading
        title="Things I'm Thinking About"
        description="A digital journal exploring the intersections of design, systems thinking, and intentional leadership."
        centered
      />
      <div className="mt-12">
        <ThinkIndex entries={articles} />
      </div>
    </Section>
  );
}
