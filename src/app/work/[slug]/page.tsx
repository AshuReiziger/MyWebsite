import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Section } from "@/components/Section";
import { CaseStudyLayout } from "@/components/CaseStudyLayout";
import { getAllWork, getWorkBySlug } from "@/lib/content";

export function generateStaticParams() {
  return getAllWork().map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const entry = getWorkBySlug(slug);
  if (!entry) return {};

  return {
    title: `${entry.frontmatter.title} — Reiziger Ashu`,
    description: entry.frontmatter.summary,
  };
}

export default async function WorkCaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const entry = getWorkBySlug(slug);

  if (!entry) notFound();

  return (
    <Section className="pt-16 md:pt-24">
      <CaseStudyLayout frontmatter={entry.frontmatter}>
        <MDXRemote source={entry.content} />
      </CaseStudyLayout>
    </Section>
  );
}
