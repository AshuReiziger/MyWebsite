import Link from "next/link";
import type { ContentEntry, ThinkFrontmatter } from "@/lib/content";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function ThinkCard({
  entry,
  showImage = true,
}: {
  entry: ContentEntry<ThinkFrontmatter>;
  showImage?: boolean;
}) {
  const { slug, frontmatter } = entry;
  const dark = frontmatter.accent;

  return (
    <Link
      href={`/think/${slug}`}
      className={
        "group flex flex-col rounded-2xl p-6 transition-colors " +
        (dark
          ? "bg-ink text-paper hover:bg-ink/90"
          : "border border-line hover:border-accent/50")
      }
    >
      {showImage && !dark && (
        <div className="mb-4 aspect-[4/3] rounded-xl bg-gradient-to-br from-accent/40 via-line to-line" />
      )}
      <span
        className={
          "inline-block w-fit rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest " +
          (dark ? "bg-paper/10 text-accent" : "bg-accent/10 text-accent")
        }
      >
        {frontmatter.category}
      </span>
      <h3 className="mt-3 font-display text-xl font-bold tracking-tight group-hover:underline">
        {frontmatter.title}
      </h3>
      <p className={"mt-2 text-sm " + (dark ? "text-paper/70" : "text-muted")}>
        {frontmatter.excerpt}
      </p>
      <span
        className={
          "mt-4 text-sm font-semibold uppercase tracking-wide " +
          (dark ? "text-accent" : "text-ink")
        }
      >
        Read More →
      </span>
    </Link>
  );
}

export { formatDate };
