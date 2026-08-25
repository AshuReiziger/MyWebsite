import Link from "next/link";
import type { MentorshipDetail } from "@/content/mentorship";
import { Section } from "@/components/Section";
import { HeroReveal } from "@/components/HeroReveal";

export function MentorshipDetailLayout({ track }: { track: MentorshipDetail }) {
  return (
    <>
      <Section className="pt-16 md:pt-24">
        <div className="mx-auto max-w-2xl text-center">
          <HeroReveal delay={0}>
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">Mentorship</p>
          </HeroReveal>
          <HeroReveal delay={0.1}>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl">
              {track.title}
            </h1>
          </HeroReveal>
          <HeroReveal delay={0.2}>
            <p className="mt-6 text-lg text-muted">{track.subhead}</p>
          </HeroReveal>
          <HeroReveal delay={0.3}>
            <Link
              href="/contact"
              className="mt-8 inline-block rounded-full bg-ink px-6 py-3 text-sm font-semibold uppercase tracking-wide text-paper transition-opacity hover:opacity-90"
            >
              Apply for Mentorship →
            </Link>
          </HeroReveal>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">Why This Track</p>
          <p className="mt-4 text-lg text-muted">{track.whyBody}</p>
        </div>
      </Section>

      <Section className="pt-0">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">
          What We&apos;ll Work On
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {track.whatWellWorkOn.map((point, index) => (
            <div key={point.title} className="rounded-2xl border border-line p-6">
              <span className="font-display text-2xl font-bold text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-lg font-bold tracking-tight">{point.title}</h3>
              <p className="mt-2 text-sm text-muted">{point.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="panel-tint rounded-2xl border-l-2 border-accent p-10 md:p-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">
            Format &amp; Details
          </p>
          <dl className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-semibold text-muted">Duration</dt>
              <dd className="mt-1 text-ink">{track.format.duration}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-muted">Format</dt>
              <dd className="mt-1 text-ink">{track.format.format}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-muted">Cadence</dt>
              <dd className="mt-1 text-ink">{track.format.cadence}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-muted">Delivery</dt>
              <dd className="mt-1 text-ink">{track.format.delivery}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-muted">Investment</dt>
              <dd className="mt-1 text-ink">{track.format.investment}</dd>
            </div>
          </dl>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">
              Who It&apos;s For
            </p>
            <p className="mt-4 text-muted">{track.whoItsFor}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">
              What You&apos;ll Walk Away With
            </p>
            <p className="mt-4 text-muted">{track.walkAwayWith}</p>
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="rounded-3xl border border-line p-12 text-center md:p-20">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
            Ready to start {track.title}?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Tell me where you are right now and what you&apos;re hoping to work through — we&apos;ll take it
            from there.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-ink px-6 py-3 text-sm font-semibold uppercase tracking-wide text-paper transition-opacity hover:opacity-90"
          >
            Apply for Mentorship →
          </Link>
        </div>
      </Section>

      <Section className="pt-0">
        <p className="text-center text-sm text-muted">
          Looking for something else?{" "}
          <Link href="/teach/mentorship" className="font-semibold text-accent hover:underline">
            Browse all mentorship tracks →
          </Link>
        </p>
      </Section>
    </>
  );
}
