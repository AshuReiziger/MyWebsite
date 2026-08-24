"use client";

import Link from "next/link";
import clsx from "clsx";
import type { ContentEntry, ResourceFrontmatter } from "@/lib/content";
import { track } from "@/lib/analytics";

/**
 * Reusable "recommend a resource" block — used compact on the homepage and
 * inline at the end of Think articles (opt-in via a `relatedResource` slug
 * in that article's frontmatter). Copy defaults come from the resource's
 * own frontmatter but every field can be overridden per placement, since
 * the same resource reads differently as a homepage teaser vs. an
 * article's "go deeper" prompt.
 */
export function ResourceCTA({
  resource,
  eyebrow = "Free Resource",
  headline,
  body,
  ctaLabel,
  variant = "compact",
}: {
  resource: ContentEntry<ResourceFrontmatter>;
  eyebrow?: string;
  headline?: string;
  body?: string;
  ctaLabel?: string;
  variant?: "compact" | "inline";
}) {
  const { slug, frontmatter } = resource;
  const resolvedHeadline = headline ?? frontmatter.heroHeadline ?? frontmatter.title;
  const resolvedBody = body ?? frontmatter.description;
  const resolvedCta = ctaLabel ?? `Get the Free ${frontmatter.type} →`;

  return (
    <div
      className={clsx(
        "panel-tint rounded-2xl border-l-2 border-accent p-6 md:p-8",
        variant === "compact" && "flex flex-col gap-5 md:flex-row md:items-center md:justify-between"
      )}
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">{eyebrow}</p>
        <h3 className="mt-2 font-display text-xl font-bold tracking-tight md:text-2xl">
          {resolvedHeadline}
        </h3>
        {resolvedBody && <p className="mt-2 max-w-xl text-muted">{resolvedBody}</p>}
      </div>
      <Link
        href={`/resources/${slug}`}
        onClick={() => track("resource_cta_click", { resource: slug, variant })}
        className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-ink px-6 py-3 text-sm font-semibold uppercase tracking-wide text-paper transition-opacity hover:opacity-90 md:self-auto"
      >
        {resolvedCta}
      </Link>
    </div>
  );
}
