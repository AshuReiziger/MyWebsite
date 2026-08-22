import type { ReactNode } from "react";
import type { WorkFrontmatter } from "@/lib/content";

const PARTS: { key: keyof WorkFrontmatter; label: string }[] = [
  { key: "challenge", label: "The Challenge" },
  { key: "insight", label: "The Insight" },
  { key: "strategy", label: "The Strategy" },
  { key: "impact", label: "The Impact" },
];

export function CaseStudyLayout({
  frontmatter,
  children,
}: {
  frontmatter: WorkFrontmatter;
  children: ReactNode;
}) {
  return (
    <article>
      <header className="mb-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">
          {frontmatter.client} · {frontmatter.year} · {frontmatter.category}
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
          {frontmatter.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">{frontmatter.summary}</p>
      </header>

      <div className="grid gap-10 border-y border-line py-12 md:grid-cols-2">
        {PARTS.map(({ key, label }) => (
          <div key={key}>
            <h2 className="font-display text-lg font-bold tracking-tight">{label}</h2>
            <p className="mt-2 text-muted">{frontmatter[key]}</p>
          </div>
        ))}
      </div>

      <div className="prose prose-neutral mt-12 max-w-none">{children}</div>
    </article>
  );
}
