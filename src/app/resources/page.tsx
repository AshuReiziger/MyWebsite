import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { ResourcesIndex } from "@/components/ResourcesIndex";
import { HeroReveal } from "@/components/HeroReveal";
import { getAllResources } from "@/lib/content";

export const metadata: Metadata = {
  title: "Resources — Reiziger Ashu",
  description:
    "Free guides, frameworks, checklists and templates for creatives, entrepreneurs and organizations who want to develop stronger ideas, brands and systems.",
};

export default function ResourcesPage() {
  const resources = getAllResources();

  return (
    <div className="theme-dark-fixed -mb-32 bg-paper pb-32 text-ink">
      <Section className="pt-16 md:pt-24">
        <div className="mx-auto max-w-2xl text-center">
          <HeroReveal delay={0}>
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">Teach</p>
          </HeroReveal>
          <HeroReveal delay={0.1}>
            <h1 className="mt-4 font-display text-4xl uppercase leading-tight tracking-tight md:text-5xl">
              Tools to help you think, build &amp; create better.
            </h1>
          </HeroReveal>
          <HeroReveal delay={0.2}>
            <p className="mt-6 text-lg text-muted">
              Free guides, frameworks, checklists and templates I&apos;ve created to help
              creatives, entrepreneurs and organizations develop stronger ideas, brands and
              systems.
            </p>
          </HeroReveal>
        </div>

        <div className="mt-16">
          {resources.length > 0 ? (
            <ResourcesIndex resources={resources} />
          ) : (
            <p className="text-center text-muted">
              New resources are on the way — check back soon.
            </p>
          )}
        </div>
      </Section>
    </div>
  );
}
