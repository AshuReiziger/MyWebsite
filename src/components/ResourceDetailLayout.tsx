import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { ContentEntry, ResourceFrontmatter } from "@/lib/content";
import { Section } from "@/components/Section";
import { WorkImage } from "@/components/WorkImage";
import { ResourceLeadForm } from "@/components/ResourceLeadForm";
import { AnalyticsPageView } from "@/components/AnalyticsPageView";
import { HeroReveal } from "@/components/HeroReveal";

/**
 * Reusable template for every resource's own landing page. A new resource
 * needs nothing beyond a new .mdx file in src/content/resources — this
 * component (and the [slug] route that renders it) never changes.
 */
export function ResourceDetailLayout({ entry }: { entry: ContentEntry<ResourceFrontmatter> }) {
  const { slug, frontmatter } = entry;

  return (
    <>
      <AnalyticsPageView event="resource_page_view" properties={{ resource: slug }} />

      <Section className="pt-16 md:pt-24">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <HeroReveal delay={0}>
              <p className="text-sm font-semibold uppercase tracking-widest text-accent">
                {frontmatter.type} · {frontmatter.category}
              </p>
            </HeroReveal>
            <HeroReveal delay={0.1}>
              <h1 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl">
                {frontmatter.heroHeadline ?? frontmatter.title}
              </h1>
            </HeroReveal>
            <HeroReveal delay={0.2}>
              <p className="mt-6 max-w-md text-lg text-muted">
                {frontmatter.heroSubcopy ?? frontmatter.longDescription}
              </p>
            </HeroReveal>
            <HeroReveal delay={0.3}>
              {frontmatter.hasAssessment ? (
                <>
                  <Link
                    href={`/resources/${slug}/assessment`}
                    className="mt-8 inline-block rounded-full bg-ink px-6 py-3 text-sm font-semibold uppercase tracking-wide text-paper transition-opacity hover:opacity-90"
                  >
                    Take the 3-Minute Assessment →
                  </Link>
                  <div className="mt-4">
                    <a href="#get-guide" className="text-sm font-semibold text-accent hover:underline">
                      Prefer to just get the PDF? Jump to email signup ↓
                    </a>
                  </div>
                </>
              ) : (
                <a
                  href="#get-guide"
                  className="mt-8 inline-block rounded-full bg-ink px-6 py-3 text-sm font-semibold uppercase tracking-wide text-paper transition-opacity hover:opacity-90"
                >
                  Get the Free {frontmatter.type}
                </a>
              )}
            </HeroReveal>
          </div>
          <WorkImage
            src={frontmatter.coverImage}
            alt={frontmatter.title}
            className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-accent/40 via-line to-line"
          />
        </div>
      </Section>

      <Section className="pt-0">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">
          What the {frontmatter.type.toLowerCase()} covers
        </p>
        <h2 className="mt-2 font-display text-2xl font-bold tracking-tight md:text-3xl">
          {frontmatter.covers.length} areas, one clearer picture.
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {frontmatter.covers.map((area) => (
            <div key={area.title} className="rounded-2xl border border-line p-6">
              <h3 className="font-display text-lg font-bold tracking-tight">{area.title}</h3>
              <p className="mt-2 text-sm text-muted">{area.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {entry.content.trim() && (
        <Section className="pt-0">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">Preview</p>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight md:text-3xl">
            Read the full {frontmatter.type.toLowerCase()} before you download it.
          </h2>
          <div className="prose prose-neutral mt-10 max-w-2xl">
            <MDXRemote source={entry.content} />
          </div>
        </Section>
      )}

      <Section className="pt-0">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">
              Who it&apos;s for
            </p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {frontmatter.audience.map((person) => (
                <li key={person} className="flex items-center gap-2 text-muted">
                  <span className="h-1.5 w-1.5 shrink-0 bg-accent" />
                  {person}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">
              What you&apos;ll get
            </p>
            <p className="mt-4 text-muted">{frontmatter.whatYoullGet}</p>
          </div>
        </div>
      </Section>

      <Section className="pt-0" id="get-guide">
        <div className="panel-tint rounded-2xl border-l-2 border-accent p-10 md:p-14">
          <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
            Get the Free {frontmatter.type}
          </h2>
          <p className="mt-3 max-w-xl text-muted">
            Enter your details below and I&apos;ll send the {frontmatter.title} straight to your
            inbox — no spam, unsubscribe anytime.
          </p>
          <div className="mt-8 max-w-xl">
            <ResourceLeadForm resourceSlug={slug} resourceTitle={frontmatter.title} />
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <p className="text-center text-sm text-muted">
          Looking for something else?{" "}
          <Link href="/resources" className="font-semibold text-accent hover:underline">
            Browse all resources →
          </Link>
        </p>
      </Section>
    </>
  );
}
