import { notFound } from "next/navigation";
import { WorkshopDetailLayout } from "@/components/WorkshopDetailLayout";
import { WORKSHOPS, getWorkshopBySlug } from "@/content/workshops";

export function generateStaticParams() {
  return WORKSHOPS.map((workshop) => ({ slug: workshop.slug }));
}

export async function generateMetadata({ params }: PageProps<"/teach/workshops/[slug]">) {
  const { slug } = await params;
  const workshop = getWorkshopBySlug(slug);
  if (!workshop) return {};

  const title = `${workshop.title} Workshop — Reiziger Ashu`;
  const description = workshop.subhead;

  return {
    title,
    description,
    openGraph: { title, description },
    twitter: { card: "summary", title, description },
  };
}

export default async function WorkshopDetailPage({ params }: PageProps<"/teach/workshops/[slug]">) {
  const { slug } = await params;
  const workshop = getWorkshopBySlug(slug);

  if (!workshop) notFound();

  return <WorkshopDetailLayout workshop={workshop} />;
}
