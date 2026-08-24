import { notFound } from "next/navigation";
import { AssessmentFlow } from "@/components/AssessmentFlow";
import { getAllResources, getResourceBySlug } from "@/lib/content";
import { getAssessmentBySlug } from "@/lib/assessments";

export function generateStaticParams() {
  return getAllResources()
    .filter((entry) => entry.frontmatter.hasAssessment)
    .map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: PageProps<"/resources/[slug]/assessment">) {
  const { slug } = await params;
  const entry = getResourceBySlug(slug);
  const assessment = entry?.frontmatter.hasAssessment ? getAssessmentBySlug(slug) : null;
  if (!entry || !assessment) return {};

  const title = `${entry.frontmatter.title} — Interactive Assessment | Reiziger Ashu`;
  const description = `Take the interactive ${entry.frontmatter.title} and get your personalized score across ${assessment.areas.length} areas of your brand.`;

  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default async function AssessmentPage({ params }: PageProps<"/resources/[slug]/assessment">) {
  const { slug } = await params;
  const entry = getResourceBySlug(slug);
  const assessment = entry?.frontmatter.hasAssessment ? getAssessmentBySlug(slug) : null;

  if (!entry || !assessment) notFound();

  return <AssessmentFlow resource={entry} assessment={assessment} />;
}
