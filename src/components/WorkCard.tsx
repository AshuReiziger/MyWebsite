import Link from "next/link";
import type { ContentEntry, WorkFrontmatter } from "@/lib/content";
import { ArrowRightIcon } from "@/components/icons";
import { WorkImage } from "@/components/WorkImage";

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]!.toUpperCase())
    .join("");
}

export function WorkCard({
  entry,
  index,
}: {
  entry: ContentEntry<WorkFrontmatter>;
  index: number;
}) {
  const { slug, frontmatter } = entry;
  const reversed = index % 2 === 1;
  const services = (frontmatter.tags && frontmatter.tags.length > 0
    ? frontmatter.tags
    : [frontmatter.category]
  ).join(" · ");

  return (
    <div>
      <Link
        href={`/work/${slug}`}
        className="group grid overflow-hidden rounded-2xl md:grid-cols-2"
      >
        <WorkImage
          src={frontmatter.coverImage}
          alt={frontmatter.title}
          className={
            "aspect-[4/3] bg-gradient-to-br from-accent/70 via-paper to-paper grayscale transition-[filter] duration-500 group-hover:grayscale-0 md:aspect-auto md:min-h-[440px] " +
            (reversed ? "md:order-2" : "")
          }
        />
        <div
          className={
            "flex min-h-[320px] flex-col justify-between p-8 md:min-h-[440px] md:p-12 " +
            (reversed ? "panel-tint md:order-1" : "bg-paper")
          }
        >
          <div
            className={
              "flex h-10 w-10 items-center justify-center rounded-lg font-display text-sm font-bold text-accent " +
              (reversed ? "bg-accent/20" : "bg-ink/10")
            }
          >
            {getInitials(frontmatter.client)}
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted">
              {services} — {frontmatter.client}
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight">
              {frontmatter.title}
            </h2>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted">
              View Case Study
            </span>
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent text-paper transition-transform group-hover:scale-105">
              <ArrowRightIcon className="h-5 w-5" />
            </span>
          </div>
        </div>
      </Link>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <WorkImage
          src={frontmatter.gallery?.[0]}
          alt={`${frontmatter.title} — supporting image`}
          className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-line to-muted/20"
        />
        <WorkImage
          src={frontmatter.gallery?.[1]}
          alt={`${frontmatter.title} — supporting image`}
          className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-line to-muted/20"
        />
      </div>
    </div>
  );
}
