import Link from "next/link";
import type { ReactNode } from "react";
import type { ContentEntry, WorkFrontmatter } from "@/lib/content";

const BEATS: { key: keyof WorkFrontmatter; num: string; heading: string }[] = [
  { key: "challenge", num: "01 — The Challenge", heading: "Understanding the Challenge" },
  { key: "insight", num: "02 — The Insight", heading: "Naming What Was Missing" },
  { key: "strategy", num: "03 — The Strategy", heading: "Building the Strategic Foundation" },
  { key: "impact", num: "04 — The Impact", heading: "Proven by Results" },
];

export function CaseStudyLayout({
  entry,
  related,
  children,
}: {
  entry: ContentEntry<WorkFrontmatter>;
  related: ContentEntry<WorkFrontmatter>[];
  children: ReactNode;
}) {
  const { frontmatter } = entry;

  return (
    <div className="theme-dark-fixed -mb-32 bg-paper pb-32 text-ink">
      <div className="mx-auto max-w-6xl px-6 pt-16 md:pt-24">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">
          {frontmatter.client} · {frontmatter.year} · {frontmatter.category}
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight md:text-5xl">
          {frontmatter.title}
        </h1>
        <p className="mt-5 max-w-xl text-lg text-muted">{frontmatter.summary}</p>
        <div className="mt-12 aspect-[21/9] rounded-2xl bg-gradient-to-br from-accent/70 via-paper to-paper" />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-20 px-6 pt-20 md:gap-28 md:pt-28">
        {BEATS.map(({ key, num, heading }, i) => (
          <div key={key} className="grid gap-10 md:grid-cols-2 md:items-center md:gap-16">
            <div className={i % 2 === 1 ? "md:order-2" : undefined}>
              <p className="font-display text-sm font-bold text-accent">{num}</p>
              <h2 className="mt-3 font-display text-2xl font-bold tracking-tight">{heading}</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted">{frontmatter[key]}</p>
            </div>
            <div
              className={
                "aspect-[4/3] rounded-2xl bg-gradient-to-br from-accent/70 via-paper to-paper " +
                (i % 2 === 1 ? "md:order-1" : "")
              }
            />
          </div>
        ))}

        <div>
          <p className="text-center font-display text-sm font-bold text-accent">05 — The Design</p>
          <h2 className="mt-3 text-center font-display text-2xl font-bold tracking-tight">
            Designing the Solution
          </h2>
          <div className="mt-10 grid grid-cols-3 gap-6">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-accent/70 via-paper to-paper" />
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-accent/70 via-paper to-paper" />
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-accent/70 via-paper to-paper" />
          </div>
        </div>
      </div>

      <div className="prose prose-invert mx-auto mt-20 max-w-6xl px-6 md:mt-28">{children}</div>

      {related.length > 0 && (
        <div className="mx-auto max-w-6xl px-6 pt-24 md:pt-28">
          <h2 className="font-display text-2xl font-bold tracking-tight">Related Projects</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/work/${r.slug}`}
                className="group overflow-hidden rounded-2xl border border-line transition-colors hover:border-accent/50"
              >
                <div className="aspect-video bg-gradient-to-br from-line to-muted/20" />
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                    {r.frontmatter.category}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-bold tracking-tight group-hover:underline">
                    {r.frontmatter.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="panel-tint mt-24 px-6 py-24 text-center md:mt-28">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">Let&apos;s Build</p>
        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight md:text-4xl">
          Have an idea worth building?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted">
          Whether you&apos;re developing a brand, solving a communication problem, or exploring an
          idea that needs structure, I&apos;d love to hear about it.
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-block rounded-full bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wide text-paper transition-opacity hover:opacity-90"
        >
          Start a Conversation →
        </Link>
      </div>
    </div>
  );
}
