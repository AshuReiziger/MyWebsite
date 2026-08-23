import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Section } from "@/components/Section";
import { ResourceCTA } from "@/components/ResourceCTA";
import { getAllThink, getResourceBySlug, getThinkBySlug } from "@/lib/content";

export function generateStaticParams() {
  return getAllThink().map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: PageProps<"/think/[slug]">) {
  const { slug } = await params;
  const entry = getThinkBySlug(slug);
  if (!entry) return {};

  return {
    title: `${entry.frontmatter.title} — Reiziger Ashu`,
    description: entry.frontmatter.excerpt,
  };
}

export default async function ThinkArticlePage({ params }: PageProps<"/think/[slug]">) {
  const { slug } = await params;
  const entry = getThinkBySlug(slug);

  if (!entry) notFound();

  const relatedResource = entry.frontmatter.relatedResource
    ? getResourceBySlug(entry.frontmatter.relatedResource)
    : null;

  return (
    <Section className="pt-16 md:pt-24">
      <article>
        <header className="mb-12 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            {entry.frontmatter.category} ·{" "}
            {new Date(entry.frontmatter.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
            {entry.frontmatter.title}
          </h1>
          <p className="mt-4 text-lg text-muted">{entry.frontmatter.excerpt}</p>
        </header>
        <div className="prose prose-neutral max-w-none">
          <MDXRemote source={entry.content} />
        </div>
        {relatedResource && (
          <div className="mt-16 max-w-2xl">
            <ResourceCTA
              resource={relatedResource}
              eyebrow="Go Deeper"
              headline="Want to apply this idea to your own brand?"
              body={undefined}
              ctaLabel={`Download the Free ${relatedResource.frontmatter.title} →`}
              variant="inline"
            />
          </div>
        )}
      </article>
    </Section>
  );
}
