import Link from "next/link";
import type { ContentEntry, WorkFrontmatter } from "@/lib/content";
import { WorkImage } from "@/components/WorkImage";
import { ArrowRightIcon } from "@/components/icons";

// Every entry renders as one full-width, single-row tile — the same
// treatment the bento layout's hero tile used to get exclusively — with
// the client/title copy overlaid on the image itself via a gradient scrim,
// rather than as a separate text block underneath the card.
export function WorkCard({ entry }: { entry: ContentEntry<WorkFrontmatter> }) {
  const { slug, frontmatter } = entry;
  const label =
    frontmatter.tags && frontmatter.tags.length > 0 ? frontmatter.tags[0] : frontmatter.category;

  return (
    <Link
      href={`/work/${slug}`}
      className="group relative block aspect-[16/9] w-full overflow-hidden rounded-2xl border border-line"
    >
      <WorkImage
        src={frontmatter.coverImage}
        alt={frontmatter.title}
        className="h-full w-full bg-gradient-to-br from-accent/30 via-paper to-paper grayscale transition-[filter,transform] duration-700 group-hover:scale-105 group-hover:grayscale-0"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-paper/95 via-paper/25 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">
          {label} &mdash; {frontmatter.client}
        </p>
        <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink md:text-4xl">
          {frontmatter.title}
        </h2>
        <span className="mt-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-ink/80 opacity-0 transition-opacity group-hover:opacity-100">
          View Case Study <ArrowRightIcon className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}
