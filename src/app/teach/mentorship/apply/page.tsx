import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/Section";
import { MentorshipApplicationForm } from "@/components/MentorshipApplicationForm";

export const metadata: Metadata = {
  title: "Apply for Mentorship — Reiziger Ashu",
  description: "Apply for 1-on-1 or small-group mentorship with Reiziger Ashu.",
};

export default async function MentorshipApplyPage({
  searchParams,
}: PageProps<"/teach/mentorship/apply">) {
  const params = await searchParams;
  const track = typeof params.track === "string" ? params.track : undefined;

  return (
    <Section className="pt-16 md:pt-24">
      <SectionHeading
        eyebrow="Teach"
        title="Apply for Mentorship"
        description="Tell me where you are right now and what you're hoping to work through — we'll take it from there."
      />
      <div className="mt-12 max-w-2xl">
        <MentorshipApplicationForm initialTrackSlug={track} />
      </div>
    </Section>
  );
}
