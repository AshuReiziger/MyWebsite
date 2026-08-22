"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import type { ContentEntry, ThinkFrontmatter } from "@/lib/content";
import { ThinkCard } from "@/components/ThinkCard";
import { FeaturedThinkCard } from "@/components/FeaturedThinkCard";
import { QuoteCard } from "@/components/QuoteCard";

const INITIAL_VISIBLE = 3;
const LOAD_MORE_STEP = 3;

export function ThinkIndex({ entries }: { entries: ContentEntry<ThinkFrontmatter>[] }) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(entries.map((e) => e.frontmatter.category)))],
    [entries]
  );

  const [selected, setSelected] = useState("All");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  function selectCategory(category: string) {
    setSelected(category);
    setVisibleCount(INITIAL_VISIBLE);
  }

  const showFeatured = selected === "All";
  const featured = showFeatured ? entries[0] : null;
  const rest = showFeatured
    ? entries.slice(1)
    : entries.filter((e) => e.frontmatter.category === selected);

  const visibleRest = rest.slice(0, visibleCount);
  const hasMore = visibleCount < rest.length;

  return (
    <>
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => selectCategory(category)}
            className={clsx(
              "rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-colors",
              selected === category
                ? "bg-ink text-paper"
                : "border border-line text-muted hover:border-ink hover:text-ink"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {featured && (
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <FeaturedThinkCard entry={featured} />
          <QuoteCard
            quote="I don't just design things; I design the conditions for things to be designed well."
            attribution="Reiziger Ashu"
          />
        </div>
      )}

      {visibleRest.length > 0 && (
        <div className={clsx("grid gap-6 sm:grid-cols-2 md:grid-cols-3", showFeatured && "mt-6")}>
          {visibleRest.map((entry) => (
            <ThinkCard key={entry.slug} entry={entry} />
          ))}
        </div>
      )}

      {rest.length === 0 && !featured && (
        <p className="mt-12 text-center text-muted">No articles in this category yet.</p>
      )}

      {hasMore && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((v) => v + LOAD_MORE_STEP)}
            className="rounded-full border border-line px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-colors hover:border-ink"
          >
            Load More Thoughts
          </button>
        </div>
      )}
    </>
  );
}
