import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
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

  const related = getAllWork()
    .filter((e) => e.slug !== slug)
    .slice(0, 2);

  return (
    <CaseStudyLayout entry={entry} related={related}>
      <MDXRemote source={entry.content} />
    </CaseStudyLayout>
  );
}
