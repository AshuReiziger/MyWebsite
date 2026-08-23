"use client";

import Link from "next/link";
import type { ContentEntry, ResourceFrontmatter } from "@/lib/content";
import { WorkImage } from "@/components/WorkImage";
import { ArrowRightIcon } from "@/components/icons";
import { track } from "@/lib/analytics";

export function ResourceCard({ entry }: { entry: ContentEntry<ResourceFrontmatter> }) {
  const { slug, frontmatter } = entry;

  return (
    <Link
      href={`/resources/${slug}`}
      onClick={() => track("resource_card_click", { resource: slug })}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line transition-colors hover:border-accent/50"
    >
      <WorkImage
        src={frontmatter.coverImage}
        alt={frontmatter.title}
        className="aspect-[4/3] bg-gradient-to-br from-accent/40 via-line to-line"
      />
      <div className="flex flex-1 flex-col p-6">
        <span className="text-xs font-semibold uppercase tracking-widest text-accent">
          {frontmatter.type} · {frontmatter.category}
        </span>
        <h3 className="mt-3 font-display text-xl font-bold tracking-tight group-hover:underline">
          {frontmatter.title}
        </h3>
        <p className="mt-2 flex-1 text-sm text-muted">{frontmatter.description}</p>
        <span className="mt-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-ink">
          Get the Free {frontmatter.type} <ArrowRightIcon className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
