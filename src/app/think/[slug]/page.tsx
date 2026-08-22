import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Section } from "@/components/Section";
import { getAllThink, getThinkBySlug } from "@/lib/content";

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
      </article>
    </Section>
  );
}
