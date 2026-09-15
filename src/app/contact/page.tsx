import type { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Reiziger Ashu",
  description: "Have an idea worth building? Let's talk.",
};

export default function ContactPage() {
  return (
    <div className="theme-dark-fixed -mb-10 bg-paper pb-10 text-ink">
      <div className="mx-auto max-w-[1920px] px-3 py-16 md:px-10 md:py-24">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h1 className="border-l-2 border-accent pl-6 font-display text-[2em] uppercase leading-tight tracking-tight">
              Have an idea worth building?
            </h1>
            <p className="mt-6 max-w-md text-muted">
              Whether you&apos;re developing a brand, solving a communication problem, building a
              creative team, or exploring an idea that needs structure, I&apos;d love to hear
              about it.
            </p>
            <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/images/contact-page-studio-desk.webp"
                alt=""
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-paper p-8 shadow-sm md:p-10">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
