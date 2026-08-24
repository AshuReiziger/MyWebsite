"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import type { ContentEntry, ResourceFrontmatter } from "@/lib/content";
import { ResourceCard } from "@/components/ResourceCard";

export function ResourcesIndex({ resources }: { resources: ContentEntry<ResourceFrontmatter>[] }) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(resources.map((r) => r.frontmatter.category)))],
    [resources]
  );

  const [selected, setSelected] = useState("All");

  const visible =
    selected === "All"
      ? resources
      : resources.filter((r) => r.frontmatter.category === selected);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setSelected(category)}
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

      {visible.length > 0 ? (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((entry) => (
            <ResourceCard key={entry.slug} entry={entry} />
          ))}
        </div>
      ) : (
        <p className="mt-12 text-center text-muted">No resources in this category yet.</p>
      )}
    </>
  );
}
