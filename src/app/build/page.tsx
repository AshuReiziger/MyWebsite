import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import { BuildSidebar } from "@/components/BuildSidebar";

export const metadata: Metadata = {
  title: "Build — Reiziger Ashu",
  description: "Sigma Studio, Sigma Studio Academy, and other initiatives.",
};

const OTHER_INITIATIVES = [
  {
    title: "Community Projects",
    description: "Grassroots initiatives leveraging design thinking to solve local challenges and foster civic engagement.",
  },
  {
    title: "Church Media",
    description: "Elevating faith-based communication through strategic branding, broadcast design, and digital platforms.",
  },
  {
    title: "Fellowships",
    description: "Mentorship programs and intensive incubators designed to nurture emerging talent and visionary founders.",
  },
  {
    title: "Design Education",
    description: "Curricula and workshops that bring strategic design thinking into classrooms and community programs.",
  },
  {
    title: "National Development",
    description: "Applying design and systems thinking to public-sector challenges at a national scale.",
  },
  {
    title: "Research",
    description: "Original inquiry into design systems, creative leadership, and organizational transformation.",
  },
  {
    title: "Creative Experiments",
    description: "Small, self-directed projects that test new ideas before they become anything more formal.",
  },
];

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4">
      <hr className="flex-1 border-line" />
      <p className="text-xs font-semibold uppercase tracking-widest text-accent">{label}</p>
    </div>
  );
}

function OutlinedLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="mt-6 inline-block rounded-full border border-line px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-colors hover:border-ink"
    >
      {children}
    </a>
  );
}

export default function BuildPage() {
  return (
    <div className="theme-dark-fixed -mb-10 bg-paper pb-10 text-ink">
      <div className="mx-auto max-w-[1920px] px-3 py-16 md:px-10 md:py-24">
        <div className="grid gap-12 md:grid-cols-[220px_1fr]">
        <BuildSidebar />

        <div className="flex flex-col gap-20">
          <div>
            <h1 className="border-l-2 border-accent pl-6 font-display text-[2em] uppercase leading-tight tracking-tight">
              <span className="font-bold">I don&apos;t only work on projects.</span>
              <br />
              <span className="text-muted">I build platforms.</span>
            </h1>
            <p className="mt-6 max-w-xl text-muted">
              My practice extends beyond individual design outputs. I engineer ecosystems —
              ventures and educational platforms designed to scale strategic clarity and
              develop the next generation of creative leadership.
            </p>
          </div>

          <div>
            <SectionDivider label="Flagship Venture" />
            <div className="relative mt-8 overflow-hidden rounded-2xl">
              <Image
                src="/images/build-sigma-studio-desk.webp"
                alt=""
                fill
                sizes="(min-width: 768px) 1400px, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/55" />
              <div className="relative p-8 md:max-w-lg md:p-12">
                <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ink">
                  Creative Consultancy
                </span>
                <h2 className="mt-4 font-display text-3xl font-bold tracking-tight">
                  Sigma Studio
                </h2>
                <p className="mt-4 max-w-md text-muted">
                  A design-driven creative studio helping organizations clarify their identity,
                  communicate their vision, and build meaningful brands. We bridge the gap
                  between high-level business strategy and rigorous visual execution.
                </p>
                <OutlinedLink href="#">Visit Sigma Studio →</OutlinedLink>
              </div>
            </div>
          </div>

          <div>
            <SectionDivider label="Educational Platform" />
            <div className="mt-8 rounded-2xl bg-accent/10 p-8 md:p-10">
              <div className="grid gap-8 md:grid-cols-2 md:items-center">
                <div>
                  <h2 className="font-display text-3xl font-bold tracking-tight">
                    Sigma Studio Academy
                  </h2>
                  <p className="mt-4 max-w-md text-muted">
                    Developing the next generation of strategic designers. An educational
                    platform equipping creatives with technical excellence, strategic thinking,
                    entrepreneurial competence, ethical leadership, and purpose-driven character.
                  </p>
                  <ul className="mt-5 flex flex-col gap-2">
                    {[
                      "Technical Mastery & Execution",
                      "Strategic Business Alignment",
                      "Ethical & Purpose-Driven Leadership",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-muted">
                        <span className="h-1.5 w-1.5 shrink-0 bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#"
                    className="mt-6 inline-block rounded-full bg-ink px-6 py-3 text-sm font-semibold uppercase tracking-wide text-paper transition-opacity hover:opacity-90"
                  >
                    Explore the Academy
                  </a>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-square rounded-2xl bg-gradient-to-br from-line to-muted/20" />
                  <div className="aspect-square rounded-2xl bg-gradient-to-br from-muted/20 to-line" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <SectionDivider label="Community & Ecosystem" />
            <div className="mt-8 border-t border-line">
              {OTHER_INITIATIVES.map((item, i) => (
                <div
                  key={item.title}
                  className="grid gap-2 border-b border-line py-6 md:grid-cols-[80px_1fr_2fr] md:items-baseline md:gap-8"
                >
                  <span className="font-display text-sm font-semibold text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-lg font-bold tracking-tight">{item.title}</h3>
                  <p className="text-sm text-muted">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
