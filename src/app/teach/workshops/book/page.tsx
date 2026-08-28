import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/Section";
import { WorkshopBookingForm } from "@/components/WorkshopBookingForm";

export const metadata: Metadata = {
  title: "Book a Workshop — Reiziger Ashu",
  description: "Book a hands-on workshop for yourself, your team, or your organization.",
};

export default async function BookWorkshopPage({ searchParams }: PageProps<"/teach/workshops/book">) {
  const params = await searchParams;
  const workshop = typeof params.workshop === "string" ? params.workshop : undefined;

  return (
    <div className="theme-dark-fixed -mb-32 bg-paper pb-32 text-ink">
      <Section className="pt-16 md:pt-24">
        <SectionHeading
          eyebrow="Teach"
          title="Book a Workshop"
          description="Tell us which workshop, when, and for how many — we'll confirm availability and send payment details."
        />
        <div className="mt-12 max-w-2xl">
          <WorkshopBookingForm initialWorkshopSlug={workshop} />
        </div>
      </Section>
    </div>
  );
}
