import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/Section";
import { SpeakingForm } from "@/components/SpeakingForm";

export const metadata: Metadata = {
  title: "Invite Me to Speak — Reiziger Ashu",
  description: "Book Reiziger Ashu to speak at your conference, school, corporate event, or panel.",
};

export default function SpeakingPage() {
  return (
    <Section className="pt-16 md:pt-24">
      <SectionHeading
        eyebrow="Teach"
        title="Invite Me to Speak"
        description="Tell me about your event and what you're hoping to cover — I'll follow up to confirm fit and availability."
      />
      <div className="mt-12 max-w-2xl">
        <SpeakingForm />
      </div>
    </Section>
  );
}
