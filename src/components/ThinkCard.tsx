import Link from "next/link";
import type { ContentEntry, ThinkFrontmatter } from "@/lib/content";

export function ThinkCard({ entry }: { entry: ContentEntry<ThinkFrontmatter> }) {
  const { slug, frontmatter } = entry;

  return (
    <Link
      href={`/think/${slug}`}
      className="group block rounded-2xl border border-line p-6 transition-colors hover:border-ink"
    >
      <p className="text-xs uppercase tracking-widest text-accent">
        {frontmatter.category} ·{" "}
        {new Date(frontmatter.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
        })}
      </p>
      <h3 className="mt-2 font-display text-xl font-bold tracking-tight group-hover:underline">
        {frontmatter.title}
      </h3>
      <p className="mt-2 text-muted">{frontmatter.excerpt}</p>
    </Link>
  );
}
