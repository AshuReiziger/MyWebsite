import Link from "next/link";
import type { ReactNode } from "react";
import type { ContentEntry, WorkFrontmatter } from "@/lib/content";
import { WorkImage } from "@/components/WorkImage";

const BEATS: { key: keyof WorkFrontmatter; num: string; heading: string }[] = [
  { key: "challenge", num: "01 — The Challenge", heading: "Understanding the Challenge" },
  { key: "insight", num: "02 — The Insight", heading: "Naming What Was Missing" },
  { key: "strategy", num: "03 — The Strategy", heading: "Building the Strategic Foundation" },
  { key: "impact", num: "04 — The Impact", heading: "Proven by Results" },
];

const GALLERY_SPAN = [
  "md:col-span-2 md:row-span-2 aspect-square md:aspect-auto",
  "aspect-square",
  "aspect-square",
  "md:col-span-2 lg:col-span-1 aspect-[16/9] lg:aspect-square",
];

export function CaseStudyLayout({
  entry,
  next,
  children,
}: {
  entry: ContentEntry<WorkFrontmatter>;
  next: ContentEntry<WorkFrontmatter> | null;
  children: ReactNode;
}) {
  const { frontmatter } = entry;
  const chips = Array.from(
    new Set([frontmatter.year, frontmatter.category, ...(frontmatter.tags ?? [])])
  );

  return (
    <div className="theme-dark-fixed -mb-32 bg-paper pb-32 text-ink">
      <div className="mx-auto max-w-[min(90%,1680px)] px-6 pt-16 md:px-20 md:pt-24">
        <div className="grid items-center gap-8 lg:grid-cols-12">
          <div className="order-2 flex flex-col gap-8 lg:order-1 lg:col-span-5">
            <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              {frontmatter.title}
            </h1>
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
            <p className="max-w-xl text-lg leading-relaxed text-muted">{frontmatter.summary}</p>
          </div>
          <div className="order-1 lg:order-2 lg:col-span-7">
            <WorkImage
              src={frontmatter.coverImage}
              alt={frontmatter.title}
              className="aspect-[4/5] rounded-2xl border border-line bg-gradient-to-br from-accent/30 via-paper to-paper grayscale transition-[filter] duration-700 hover:grayscale-0"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-[min(90%,1680px)] px-6 md:mt-40 md:px-20">
        <div className="grid auto-rows-[minmax(220px,auto)] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2, 3].map((i) => (
            <WorkImage
              key={i}
              src={frontmatter.gallery?.[i]}
              alt={`${frontmatter.title} — gallery image ${i + 1}`}
              className={
                "overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-accent/30 via-paper to-paper transition-transform duration-700 hover:scale-[1.02] " +
                GALLERY_SPAN[i]
              }
            />
          ))}
        </div>
      </div>

      <div className="mx-auto flex max-w-3xl flex-col gap-16 px-6 pt-20 md:gap-20 md:pt-40">
        {BEATS.map(({ key, num, heading }) => (
          <div key={key}>
            <p className="font-display text-sm font-bold text-accent">{num}</p>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight">{heading}</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">{frontmatter[key]}</p>
          </div>
        ))}

        <div>
          <p className="font-display text-sm font-bold text-accent">05 — The Design</p>
          <h2 className="mt-3 font-display text-2xl font-bold tracking-tight">
            Designing the Solution
          </h2>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[0, 1, 2].map((i) => (
              <WorkImage
                key={i}
                src={frontmatter.gallery?.[BEATS.length + i]}
                alt={`${frontmatter.title} — design detail`}
                className="aspect-square rounded-2xl bg-gradient-to-br from-accent/70 via-paper to-paper"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="prose prose-invert mx-auto mt-20 max-w-[min(90%,1680px)] px-6 md:mt-40 md:px-20">
        {children}
      </div>

      {next && (
        <div className="mx-auto mt-24 flex max-w-[min(90%,1680px)] flex-col items-center gap-6 px-6 py-24 text-center md:mt-40 md:px-20 md:py-40">
          <span className="rounded-full border border-line px-6 py-2 text-xs font-semibold uppercase tracking-widest text-muted">
            Next Project
          </span>
          <Link href={`/work/${next.slug}`} className="group relative inline-block">
            <h2 className="font-display text-3xl font-bold tracking-tight transition-colors group-hover:text-accent md:text-5xl">
              {next.frontmatter.title}
            </h2>
            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent transition-all duration-500 ease-in-out group-hover:w-full" />
          </Link>
        </div>
      )}

      <div className="panel-tint mt-24 px-6 py-24 text-center md:mt-40 md:px-20 md:py-40">
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
