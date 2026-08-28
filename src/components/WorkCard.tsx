import Link from "next/link";
import type { ContentEntry, WorkFrontmatter } from "@/lib/content";
import { WorkImage } from "@/components/WorkImage";

// A hand-tuned bento arrangement for exactly 4 tiles: one full-width hero,
// two half-width tiles side by side, then a full-width tile offset by one
// column. Falls back to a plain half-width tile for any 5th+ entry.
const COL_SPAN = ["md:col-span-12", "md:col-span-6", "md:col-span-6", "md:col-span-10 md:col-start-2"];
const ASPECT = ["aspect-[16/9]", "aspect-square", "aspect-square", "aspect-[21/9]"];

export function WorkCard({
  entry,
  index,
}: {
  entry: ContentEntry<WorkFrontmatter>;
  index: number;
}) {
  const { slug, frontmatter } = entry;
  const colSpan = COL_SPAN[index] ?? "md:col-span-6";
  const aspect = ASPECT[index] ?? "aspect-[4/3]";

  return (
    <Link href={`/work/${slug}`} className={`group col-span-1 ${colSpan}`}>
      <div className={`relative w-full overflow-hidden rounded-2xl border border-line ${aspect}`}>
        <WorkImage
          src={frontmatter.coverImage}
          alt={frontmatter.title}
          className="h-full w-full bg-gradient-to-br from-accent/30 via-paper to-paper grayscale transition-[filter,transform] duration-700 group-hover:scale-105 group-hover:grayscale-0"
        />
        <div className="absolute bottom-6 left-6 rounded-full border border-line bg-paper px-4 py-2">
          <span className="text-xs font-semibold uppercase tracking-widest">{frontmatter.client}</span>
        </div>
      </div>
      <h2 className="mt-6 font-display text-2xl font-bold tracking-tight transition-colors group-hover:text-accent md:text-3xl">
        {frontmatter.title}
      </h2>
      <div className="mt-4 h-px w-full bg-line" />
    </Link>
  );
}
