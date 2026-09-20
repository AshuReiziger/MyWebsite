"use client";

import { useState } from "react";
import type { ContentEntry, WorkFrontmatter } from "@/lib/content";
import { WorkCard } from "@/components/WorkCard";

const INITIAL_VISIBLE = 4;
const LOAD_MORE_STEP = 4;

export function WorkIndex({ entries }: { entries: ContentEntry<WorkFrontmatter>[] }) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  const visible = entries.slice(0, visibleCount);
  const hasMore = visibleCount < entries.length;
  const canShowLess = visibleCount > INITIAL_VISIBLE;

  return (
    <>
      <div className="mt-16 flex flex-col gap-5">
        {visible.map((entry) => (
          <WorkCard key={entry.slug} entry={entry} />
        ))}
      </div>

      {(hasMore || canShowLess) && (
        <div className="mt-10 flex justify-center gap-4">
          {hasMore && (
            <button
              type="button"
              onClick={() => setVisibleCount((v) => v + LOAD_MORE_STEP)}
              className="rounded-full border border-line px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-colors hover:border-ink"
            >
              Show More Work
            </button>
          )}
          {canShowLess && (
            <button
              type="button"
              onClick={() => setVisibleCount(INITIAL_VISIBLE)}
              className="rounded-full border border-line px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-colors hover:border-ink"
            >
              Show Less
            </button>
          )}
        </div>
      )}
    </>
  );
}
