import Link from "next/link";
import type { ContentEntry, WorkFrontmatter } from "@/lib/content";

export function WorkCard({ entry }: { entry: ContentEntry<WorkFrontmatter> }) {
  const { slug, frontmatter } = entry;

  return (
    <Link
      href={`/work/${slug}`}
      className="group block overflow-hidden rounded-2xl border border-line transition-colors hover:border-ink"
    >
      <div className="flex aspect-video items-center justify-center bg-ink/5 text-sm uppercase tracking-widest text-muted">
        {frontmatter.category}
      </div>
      <div className="p-6">
        <p className="text-xs uppercase tracking-widest text-accent">
          {frontmatter.client} · {frontmatter.year}
        </p>
        <h3 className="mt-2 font-display text-xl font-semibold tracking-tight group-hover:underline">
          {frontmatter.title}
        </h3>
        <p className="mt-2 text-muted">{frontmatter.summary}</p>
      </div>
    </Link>
  );
}
