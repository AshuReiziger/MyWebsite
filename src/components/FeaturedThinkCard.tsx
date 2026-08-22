import Link from "next/link";
import type { ContentEntry, ThinkFrontmatter } from "@/lib/content";
import { formatDate } from "@/components/ThinkCard";

export function FeaturedThinkCard({ entry }: { entry: ContentEntry<ThinkFrontmatter> }) {
  const { slug, frontmatter } = entry;

  return (
    <Link
      href={`/think/${slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line transition-colors hover:border-accent/50"
    >
      <div className="aspect-[16/10] bg-gradient-to-br from-accent/40 via-line to-line" />
      <div className="p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">
          {frontmatter.category} · {formatDate(frontmatter.date)}
        </p>
        <h3 className="mt-3 font-display text-2xl font-bold tracking-tight group-hover:underline">
          {frontmatter.title}
        </h3>
        <p className="mt-3 text-muted">{frontmatter.excerpt}</p>
        <span className="mt-4 inline-block text-sm font-semibold uppercase tracking-wide">
          Read More →
        </span>
      </div>
    </Link>
  );
}
