import { notFound } from "next/navigation";
import { ResourceDetailLayout } from "@/components/ResourceDetailLayout";
import { getAllResources, getResourceBySlug } from "@/lib/content";

export function generateStaticParams() {
  return getAllResources().map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: PageProps<"/resources/[slug]">) {
  const { slug } = await params;
  const entry = getResourceBySlug(slug);
  if (!entry) return {};

  const title = entry.frontmatter.metaTitle ?? `Free ${entry.frontmatter.title} | Reiziger Ashu`;
  const description = entry.frontmatter.metaDescription ?? entry.frontmatter.description;
  const images = entry.frontmatter.coverImage ? [entry.frontmatter.coverImage] : undefined;

  return {
    title,
    description,
    openGraph: { title, description, images },
    twitter: { card: "summary_large_image", title, description, images },
  };
}

export default async function ResourceDetailPage({ params }: PageProps<"/resources/[slug]">) {
  const { slug } = await params;
  const entry = getResourceBySlug(slug);

  if (!entry) notFound();

  return <ResourceDetailLayout entry={entry} />;
}
