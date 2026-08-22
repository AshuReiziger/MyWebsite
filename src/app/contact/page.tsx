import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/Section";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Reiziger Ashu",
  description: "Have an idea worth building? Let's talk.",
};

export default function ContactPage() {
  return (
    <Section className="pt-16 md:pt-24">
      <SectionHeading
        eyebrow="Contact"
        title="Have an idea worth building?"
        description="Whether you're developing a brand, solving a communication problem, building a creative team, or exploring an idea that needs structure, I'd love to hear about it."
      />
      <div className="mt-12 max-w-2xl">
        <ContactForm />
      </div>
    </Section>
  );
}
