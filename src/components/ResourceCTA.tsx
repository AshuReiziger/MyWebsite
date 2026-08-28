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
  variant?: "compact" | "inline" | "centered";
}) {
  const { slug, frontmatter } = resource;
  const resolvedHeadline = headline ?? frontmatter.heroHeadline ?? frontmatter.title;
  const resolvedBody = body ?? frontmatter.description;
  const resolvedCta = ctaLabel ?? `Get the Free ${frontmatter.type} →`;
  const centered = variant === "centered";

  const cta = (
    <Link
      href={`/resources/${slug}`}
      onClick={() => track("resource_cta_click", { resource: slug, variant })}
      className={clsx(
        "inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold uppercase tracking-wide text-paper transition-opacity hover:opacity-90",
        centered ? "mt-6" : "self-start md:self-auto"
      )}
    >
      {resolvedCta}
    </Link>
  );

  const text = (
    <div className={centered ? "max-w-xl" : undefined}>
      <p className="text-xs font-semibold uppercase tracking-widest text-accent">{eyebrow}</p>
      <h3 className="mt-2 font-display text-xl font-bold tracking-tight md:text-2xl">
        {resolvedHeadline}
      </h3>
      {resolvedBody && (
        <p className={clsx("mt-2 text-muted", centered ? "mx-auto max-w-md" : "max-w-xl")}>
          {resolvedBody}
        </p>
      )}
    </div>
  );

  // Centered variant is a full-bleed band (no rounded card, no
  // max-w-[min(90%,1680px)] constraint) — render it as a direct sibling in
  // the page, not inside a Section, so the background spans the full
  // viewport width.
  if (centered) {
    return (
      <div className="panel-tint-strong w-full py-16 md:py-20">
        <div className="mx-auto flex max-w-[min(90%,1680px)] flex-col items-center px-6 text-center md:px-20">
          {text}
          {cta}
        </div>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "panel-tint rounded-2xl border-l-2 border-accent p-6 md:p-8",
        variant === "compact" && "flex flex-col gap-5 md:flex-row md:items-center md:justify-between"
      )}
    >
      {text}
      {cta}
    </div>
  );
}
