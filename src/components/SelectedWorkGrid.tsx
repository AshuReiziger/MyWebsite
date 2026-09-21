import Link from "next/link";
import type { ContentEntry, WorkFrontmatter } from "@/lib/content";
import { WorkImage } from "@/components/WorkImage";
import { ArrowRightIcon } from "@/components/icons";

/**
 * Full-bleed, image-forward portfolio teaser for the home page — deliberately
 * rendered outside any Section's max-w-[1920px] container so the grid spans the
 * full viewport width. Every entry renders full-width, one per row.
 */
export function SelectedWorkGrid({ entries }: { entries: ContentEntry<WorkFrontmatter>[] }) {
  if (entries.length === 0) return null;

  return (
    <div className="flex flex-col gap-1">
      {entries.map((entry) => (
        <WorkTile key={entry.slug} entry={entry} />
      ))}
    </div>
  );
}

function WorkTile({ entry }: { entry: ContentEntry<WorkFrontmatter> }) {
  const { slug, frontmatter } = entry;
  const label =
    frontmatter.tags && frontmatter.tags.length > 0 ? frontmatter.tags[0] : frontmatter.category;

  return (
    <Link
      href={`/work/${slug}`}
      className="group relative block aspect-[4/5] w-full overflow-hidden sm:aspect-[21/9]"
    >
      <WorkImage
        src={frontmatter.coverImage}
        alt={frontmatter.title}
        className="h-full w-full bg-gradient-to-br from-accent/30 via-paper to-paper grayscale transition-[filter,transform] duration-500 group-hover:scale-105 group-hover:grayscale-0"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-paper/95 via-paper/25 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">
          {label} &mdash; {frontmatter.client}
        </p>
        <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink md:text-4xl">
          {frontmatter.title}
        </h3>
        <span className="mt-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-ink/80 opacity-0 transition-opacity group-hover:opacity-100">
          View Case Study <ArrowRightIcon className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}
