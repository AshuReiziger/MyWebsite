import Link from "next/link";
import type { ContentEntry, WorkFrontmatter } from "@/lib/content";
import { WorkImage } from "@/components/WorkImage";
import { ArrowRightIcon } from "@/components/icons";

/**
 * Full-bleed, image-forward portfolio teaser for the home page — deliberately
 * rendered outside any Section's max-w-[min(90%,1440px)] container so the grid spans the
 * full viewport width. The first entry runs as a wide hero tile, the rest
 * fill a masonry-style row beneath it.
 */
export function SelectedWorkGrid({ entries }: { entries: ContentEntry<WorkFrontmatter>[] }) {
  const [hero, ...rest] = entries;
  if (!hero) return null;

  return (
    <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3">
      <WorkTile
        entry={hero}
        large
        className="aspect-[4/5] sm:col-span-2 sm:aspect-[21/9] lg:col-span-3"
      />
      {rest.map((entry) => (
        <WorkTile key={entry.slug} entry={entry} className="aspect-[4/5]" />
      ))}
    </div>
  );
}

function WorkTile({
  entry,
  className,
  large = false,
}: {
  entry: ContentEntry<WorkFrontmatter>;
  className: string;
  large?: boolean;
}) {
  const { slug, frontmatter } = entry;
  const label =
    frontmatter.tags && frontmatter.tags.length > 0 ? frontmatter.tags[0] : frontmatter.category;

  return (
    <Link href={`/work/${slug}`} className={`group relative block overflow-hidden ${className}`}>
      <WorkImage
        src={frontmatter.coverImage}
        alt={frontmatter.title}
        className="h-full w-full bg-gradient-to-br from-accent/30 via-paper to-paper grayscale transition-[filter,transform] duration-500 group-hover:scale-105 group-hover:grayscale-0"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-paper/95 via-paper/25 to-transparent" />
      <div className={"absolute inset-x-0 bottom-0 " + (large ? "p-6 md:p-10" : "p-5 md:p-6")}>
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">
          {label} &mdash; {frontmatter.client}
        </p>
        <h3
          className={
            "mt-2 font-display font-bold tracking-tight text-ink " +
            (large ? "text-2xl md:text-4xl" : "text-lg md:text-xl")
          }
        >
          {frontmatter.title}
        </h3>
        <span className="mt-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-ink/80 opacity-0 transition-opacity group-hover:opacity-100">
          View Case Study <ArrowRightIcon className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}
