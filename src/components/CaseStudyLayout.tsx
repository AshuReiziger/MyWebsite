import Link from "next/link";
import type { ReactNode } from "react";
import type { ContentEntry, WorkFrontmatter } from "@/lib/content";
import { WorkImage } from "@/components/WorkImage";

export function CaseStudyLayout({
  entry,
  related,
  children,
}: {
  entry: ContentEntry<WorkFrontmatter>;
  related: ContentEntry<WorkFrontmatter>[];
  children: ReactNode;
}) {
  const { frontmatter } = entry;
  const chips = Array.from(
    new Set([frontmatter.year, frontmatter.category, ...(frontmatter.tags ?? [])])
  );

  return (
    <div className="theme-dark-fixed -mb-10 bg-paper pb-10 text-ink">
      <div className="mx-auto flex max-w-3xl flex-col gap-8 px-6 pt-16 pb-16 md:pt-24 md:pb-24">
        <h1 className="font-display text-[2em] font-bold tracking-tight">{frontmatter.title}</h1>
        <div className="flex flex-wrap gap-3">
          {chips.map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-line px-4 py-1 text-xs font-semibold uppercase tracking-widest text-muted"
            >
              {chip}
            </span>
          ))}
        </div>
        <p className="max-w-xl leading-relaxed text-muted">{frontmatter.summary}</p>
      </div>

      <div className="mt-12 md:mt-16">
        <WorkImage
          src={frontmatter.coverImage}
          alt={frontmatter.title}
          className="aspect-[16/9] bg-gradient-to-br from-accent/30 via-paper to-paper grayscale transition-[filter] duration-700 hover:grayscale-0"
        />
      </div>

      <div className="mt-[10px] flex flex-col gap-[10px] md:mt-[10px] md:gap-[10px]">
        {frontmatter.sections.map((section, i) =>
          section.type === "text" ? (
            <div key={i} className="mx-auto max-w-3xl px-6 py-16 md:py-24">
              {section.heading && (
                <h2 className="font-display text-2xl font-bold tracking-tight">
                  {section.heading}
                </h2>
              )}
              <p className="mt-4 text-lg leading-relaxed text-muted">{section.body}</p>
            </div>
          ) : (
            <div
              key={i}
              className={
                section.images.length > 1
                  ? "grid grid-cols-1 gap-1 sm:grid-cols-2"
                  : "grid grid-cols-1"
              }
            >
              {section.images.slice(0, 2).map((src, j) => (
                <WorkImage
                  key={j}
                  src={src}
                  alt={`${frontmatter.title} — image ${i + 1}.${j + 1}`}
                  className={
                    (section.images.length > 1 ? "aspect-square" : "aspect-[16/9]") +
                    " bg-gradient-to-br from-accent/30 via-paper to-paper"
                  }
                />
              ))}
            </div>
          )
        )}
      </div>

      {entry.content.trim() && (
        <div className="prose prose-invert mx-auto mt-20 max-w-[1920px] px-3 md:mt-40 md:px-10">
          {children}
        </div>
      )}

      {related.length > 0 && (
        <div className="mx-auto mt-24 max-w-[1920px] px-3 py-24 md:mt-40 md:px-10 md:py-40">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted">
            Related Projects
          </p>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
            {related.map((item) => (
              <Link key={item.slug} href={`/work/${item.slug}`} className="group block">
                <WorkImage
                  src={item.frontmatter.coverImage}
                  alt={item.frontmatter.title}
                  className="aspect-[4/3] bg-gradient-to-br from-accent/30 via-paper to-paper grayscale transition-[filter] duration-700 group-hover:grayscale-0"
                />
                <h3 className="mt-4 font-display text-lg font-bold tracking-tight transition-colors group-hover:text-accent">
                  {item.frontmatter.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="panel-tint mt-24 px-3 py-24 text-center md:mt-40 md:px-10 md:py-40">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">Let&apos;s Build</p>
        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight md:text-4xl">
          Have an idea worth building?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted">
          Whether you&apos;re developing a brand, solving a communication problem, or exploring an
          idea that needs structure, I&apos;d love to hear about it.
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-block rounded-full bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wide text-paper transition-opacity hover:opacity-90"
        >
          Start a Conversation →
        </Link>
      </div>
    </div>
  );
}
