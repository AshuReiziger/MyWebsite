import Link from "next/link";
import type { ContentEntry, WorkFrontmatter } from "@/lib/content";

const SUMMARY_PARTS: { key: keyof WorkFrontmatter; label: string }[] = [
  { key: "challenge", label: "Challenge" },
  { key: "strategy", label: "Strategy & Design" },
  { key: "impact", label: "Impact" },
];

export function WorkCard({ entry }: { entry: ContentEntry<WorkFrontmatter> }) {
  const { slug, frontmatter } = entry;

  return (
    <Link
      href={`/work/${slug}`}
      className="group grid gap-8 rounded-2xl border border-line p-6 transition-colors hover:border-accent/50 md:grid-cols-5 md:p-8"
    >
      <div className="md:col-span-2">
        <div className="flex aspect-[4/3] items-center justify-center rounded-xl bg-gradient-to-br from-accent/70 via-ink to-ink text-sm uppercase tracking-widest text-paper grayscale transition-[filter] duration-500 group-hover:grayscale-0">
          {frontmatter.category}
        </div>
      </div>

      <div className="md:col-span-3">
        {frontmatter.tags && frontmatter.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-accent/10 px-3 py-1 text-xs text-ink"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight group-hover:underline">
          {frontmatter.title}
        </h2>

        <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-accent">
          Strategic Overview
        </p>
        <hr className="mt-2 border-line" />

        <div className="mt-4 flex flex-col gap-4">
          {SUMMARY_PARTS.map(({ key, label }) => (
            <div key={key}>
              <p className="font-semibold text-ink">{label}</p>
              <p className="mt-1 text-muted">{frontmatter[key]}</p>
            </div>
          ))}
        </div>

        <span className="mt-6 inline-block text-sm font-semibold uppercase tracking-wide">
          View Case Study →
        </span>
      </div>
    </Link>
  );
}
