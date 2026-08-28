"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import type { ContentEntry, ResourceFrontmatter } from "@/lib/content";
import type { Assessment, AreaIconKey } from "@/content/assessments/types";
import { scoreAssessment, insightTier, type AssessmentResult } from "@/lib/assessment-scoring";
import { ScoreRing } from "@/components/ScoreRing";
import { ResourceLeadForm } from "@/components/ResourceLeadForm";
import { Section } from "@/components/Section";
import { track } from "@/lib/analytics";
import {
  ArrowRightIcon,
  CompassIcon,
  MessageIcon,
  DiamondIcon,
  LayersIcon,
  HeartIcon,
  EyeIcon,
  LockIcon,
  DownloadIcon,
  LightbulbIcon,
  BriefcaseIcon,
  ImpactIcon,
  StrategyIcon,
} from "@/components/icons";

const AREA_ICONS: Record<AreaIconKey, ReactNode> = {
  positioning: <CompassIcon />,
  messaging: <MessageIcon />,
  "visual-identity": <DiamondIcon />,
  consistency: <LayersIcon />,
  "customer-experience": <HeartIcon />,
  perception: <EyeIcon />,
  clarity: <LightbulbIcon />,
  feedback: <MessageIcon />,
  workload: <BriefcaseIcon />,
  growth: <ImpactIcon />,
  strategy: <CompassIcon />,
  quality: <DiamondIcon />,
  workflow: <LayersIcon />,
  measurement: <StrategyIcon />,
};

type Stage = "intro" | "question" | "locked" | "unlocked";

export function AssessmentFlow({
  resource,
  assessment,
}: {
  resource: ContentEntry<ResourceFrontmatter>;
  assessment: Assessment;
}) {
  const { slug, frontmatter } = resource;
  const { questions, areas } = assessment;

  const [stage, setStage] = useState<Stage>("intro");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>(() => questions.map(() => -1));
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [showGate, setShowGate] = useState(false);

  const question = questions[step];
  const area = areas.find((a) => a.id === question?.area);

  function selectAnswer(optionIndex: number) {
    setAnswers((prev) => {
      const next = [...prev];
      next[step] = optionIndex;
      return next;
    });
  }

  function goNext() {
    if (step < questions.length - 1) {
      setStep((s) => s + 1);
      return;
    }
    const computed = scoreAssessment(questions, answers);
    setResult(computed);
    setStage("locked");
    track("assessment_completed", { resource: slug, score: computed.overall });
  }

  function goBack() {
    if (step === 0) {
      setStage("intro");
      return;
    }
    setStep((s) => s - 1);
  }

  return (
    <div className="theme-dark-fixed -mb-32 bg-paper pb-32 text-ink">
      <Section className="pt-16 md:pt-24">
      <div className="mx-auto flex max-w-2xl items-center justify-between">
        <Link href={`/resources/${slug}`} className="text-xs font-semibold uppercase tracking-widest text-muted hover:text-ink">
          &larr; Exit Assessment
        </Link>
        {stage === "question" && (
          <span className="text-xs font-semibold uppercase tracking-widest text-muted">
            Question {step + 1} of {questions.length}
          </span>
        )}
      </div>

      {stage === "intro" && (
        <div className="mx-auto mt-12 max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            Free Assessment &middot; {frontmatter.category}
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold uppercase leading-tight tracking-tight md:text-5xl">
            {frontmatter.heroHeadline ?? frontmatter.title}
          </h1>
          <p className="mx-auto mt-6 max-w-md text-lg text-muted">
            Answer {questions.length} quick questions and get an instant score across {areas.length} areas of your
            brand &mdash; positioning, messaging, visual identity and more.
          </p>
          <button
            type="button"
            onClick={() => {
              track("assessment_start", { resource: slug });
              setStage("question");
            }}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold uppercase tracking-wide text-paper transition-opacity hover:opacity-90"
          >
            Start Assessment <ArrowRightIcon className="h-4 w-4" />
          </button>
          <p className="mt-4 text-sm text-muted">
            {questions.length} questions &middot; About 3 minutes &middot; Completely free
          </p>

          <div className="mx-auto mt-16 grid max-w-xl grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
            {areas.map((a) => (
              <div key={a.id} className="flex flex-col items-center gap-2 text-center">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  {AREA_ICONS[a.icon]}
                </span>
                <span className="text-xs font-semibold">{a.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {stage === "question" && question && (
        <div className="mx-auto mt-4 max-w-2xl">
          <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-line">
            <div
              className="h-full rounded-full bg-accent transition-all"
              style={{ width: `${((step + 1) / questions.length) * 100}%` }}
            />
          </div>

          <p className="mt-10 text-xs font-semibold uppercase tracking-widest text-accent">{area?.label}</p>
          <h2 className="mt-4 font-display text-2xl font-bold leading-snug tracking-tight md:text-3xl">
            {question.prompt}
          </h2>

          <div className="mt-8 flex flex-col gap-3">
            {question.options.map((option, i) => {
              const selected = answers[step] === i;
              return (
                <label
                  key={option.label}
                  className={
                    "flex cursor-pointer items-center gap-4 rounded-2xl border p-5 transition-colors " +
                    (selected ? "border-accent bg-accent/[0.08]" : "border-line hover:border-ink/30")
                  }
                >
                  <input
                    type="radio"
                    name={`question-${step}`}
                    className="sr-only"
                    checked={selected}
                    onChange={() => selectAnswer(i)}
                  />
                  <span
                    className={
                      "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-[1.5px] " +
                      (selected ? "border-accent" : "border-line")
                    }
                  >
                    {selected && <span className="h-2.5 w-2.5 rounded-full bg-accent" />}
                  </span>
                  <span className="text-[15px]">{option.label}</span>
                </label>
              );
            })}
          </div>

          <div className="mt-10 flex items-center justify-between">
            <button
              type="button"
              onClick={goBack}
              className="text-sm font-semibold uppercase tracking-wide text-muted hover:text-ink"
            >
              &larr; Back
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={answers[step] === -1}
              className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3 text-sm font-semibold uppercase tracking-wide text-paper transition-opacity hover:opacity-90 disabled:opacity-40"
            >
              {step < questions.length - 1 ? "Next" : "See My Results"} <ArrowRightIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {(stage === "locked" || stage === "unlocked") && result && (
        <div className="mx-auto mt-8 max-w-2xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">
              {stage === "unlocked" ? "Your Results · Unlocked" : "Your Results"}
            </p>
            <h1 className="mt-3 font-display text-3xl font-bold tracking-tight">
              {stage === "unlocked" ? "Here’s where your brand stands." : `Your ${frontmatter.title} is ready.`}
            </h1>
            <p className="mx-auto mt-3 max-w-sm text-muted">
              Based on your {questions.length} answers, here&rsquo;s how your brand stacks up today.
            </p>
            <div className="mt-10">
              <ScoreRing score={result.overall} />
            </div>
            {assessment.scoreBands && (
              <div className="mx-auto mt-8 max-w-md">
                {(() => {
                  const band = [...assessment.scoreBands]
                    .sort((a, b) => b.min - a.min)
                    .find((b) => result.overall >= b.min);
                  if (!band) return null;
                  return (
                    <>
                      <p className="text-sm font-semibold uppercase tracking-widest text-accent">
                        {band.label}
                      </p>
                      <p className="mt-2 text-sm text-muted">{band.description}</p>
                    </>
                  );
                })()}
              </div>
            )}
          </div>

          <div className="relative mt-14">
            <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-muted">Breakdown by Area</p>
            <div className={stage === "locked" ? "pointer-events-none select-none blur-[5px] opacity-50" : ""}>
              {result.byArea.map(({ area: areaId, score }) => {
                const areaMeta = areas.find((a) => a.id === areaId);
                if (!areaMeta) return null;
                return (
                  <div key={areaId} className="border-b border-line py-5 last:border-0">
                    <div className="flex items-center gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                        {AREA_ICONS[areaMeta.icon]}
                      </span>
                      <span className="flex-1 text-[15px] font-bold">{areaMeta.label}</span>
                      <div className="h-1.5 w-28 overflow-hidden rounded-full bg-line">
                        <div className="h-full rounded-full bg-accent" style={{ width: `${score}%` }} />
                      </div>
                      <span className="w-16 shrink-0 text-right text-sm text-muted">{score} / 100</span>
                    </div>
                    {stage === "unlocked" && (
                      <p className="mt-2 pl-[52px] text-sm leading-relaxed text-muted">
                        {areaMeta.insights[insightTier(score)]}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {stage === "locked" && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex items-center gap-3 rounded-full border border-line bg-paper px-6 py-3 shadow-sm">
                  <LockIcon className="h-4 w-4 text-accent" />
                  <span className="text-sm font-semibold">See what&rsquo;s driving each score</span>
                </div>
              </div>
            )}
          </div>

          {stage === "locked" && !showGate && (
            <div className="mt-14 rounded-2xl border border-line p-10 text-center">
              <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <LockIcon className="h-5 w-5" />
              </span>
              <h3 className="font-display text-xl font-bold tracking-tight">Unlock Your Full Results</h3>
              <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
                Get your complete breakdown, personalized recommendations for each area, and the full{" "}
                {frontmatter.title} PDF &mdash; sent straight to your inbox.
              </p>
              <button
                type="button"
                onClick={() => setShowGate(true)}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3 text-sm font-semibold uppercase tracking-wide text-paper transition-opacity hover:opacity-90"
              >
                Unlock My Results <ArrowRightIcon className="h-4 w-4" />
              </button>
            </div>
          )}

          {stage === "unlocked" && (
            <div className="mt-14 rounded-3xl border border-line p-10 text-center md:p-14">
              <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                Want help closing these gaps?
              </h2>
              <p className="mx-auto mt-3 max-w-sm text-muted">
                I help brands turn audits like this into a clear, prioritized action plan.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold uppercase tracking-wide text-paper transition-opacity hover:opacity-90"
                >
                  Work With Me <ArrowRightIcon className="h-4 w-4" />
                </Link>
                <a
                  href={frontmatter.downloadFile}
                  download
                  className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-colors hover:border-ink"
                >
                  <DownloadIcon className="h-4 w-4" /> Download Full PDF Guide
                </a>
              </div>
            </div>
          )}
        </div>
      )}

      {showGate && result && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-black/55"
            onClick={() => setShowGate(false)}
            aria-hidden
          />
          <div className="relative w-full max-w-md rounded-2xl bg-paper p-10 text-center shadow-2xl">
            <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <LockIcon className="h-5 w-5" />
            </span>
            <h3 className="font-display text-xl font-bold tracking-tight">Unlock Your Full Results</h3>
            <p className="mt-2 text-sm text-muted">
              Enter your email to see your full breakdown, personalized recommendations, and get the complete{" "}
              {frontmatter.title} PDF.
            </p>
            <div className="mt-7 text-left">
              <ResourceLeadForm
                resourceSlug={slug}
                resourceTitle={frontmatter.title}
                extraPayload={{ assessmentScore: result }}
                submitLabel="Unlock My Results →"
                onSuccess={() => {
                  track("assessment_unlocked", { resource: slug, score: result.overall });
                  setShowGate(false);
                  setStage("unlocked");
                }}
              />
            </div>
            <p className="mt-4 text-xs text-muted">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      )}
      </Section>
    </div>
  );
}
