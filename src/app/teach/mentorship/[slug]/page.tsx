import { notFound } from "next/navigation";
import { MentorshipDetailLayout } from "@/components/MentorshipDetailLayout";
import { MENTORSHIP_TRACKS, getMentorshipTrackBySlug } from "@/content/mentorship";

export function generateStaticParams() {
  return MENTORSHIP_TRACKS.map((track) => ({ slug: track.slug }));
}

export async function generateMetadata({ params }: PageProps<"/teach/mentorship/[slug]">) {
  const { slug } = await params;
  const track = getMentorshipTrackBySlug(slug);
  if (!track) return {};

  const title = `${track.title} Mentorship — Reiziger Ashu`;
  const description = track.subhead;

  return {
    title,
    description,
    openGraph: { title, description },
    twitter: { card: "summary", title, description },
  };
}

export default async function MentorshipDetailPage({ params }: PageProps<"/teach/mentorship/[slug]">) {
  const { slug } = await params;
  const track = getMentorshipTrackBySlug(slug);

  if (!track) notFound();

  return <MentorshipDetailLayout track={track} />;
}
