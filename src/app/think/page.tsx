import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/Section";
import { ThinkCard } from "@/components/ThinkCard";
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
        eyebrow="Think"
        title="Things I'm thinking about"
        description="Design · Identity · Systems · Leadership · Creativity · Transformation"
      />
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {articles.map((entry) => (
          <ThinkCard key={entry.slug} entry={entry} />
        ))}
      </div>
    </Section>
  );
}
