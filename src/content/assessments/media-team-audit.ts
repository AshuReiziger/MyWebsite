import type { Assessment, AssessmentArea, AssessmentQuestion } from "./types";

const SCALE = [
  { label: "1 — Not in place", points: 1 },
  { label: "2", points: 2 },
  { label: "3 — Somewhat true", points: 3 },
  { label: "4", points: 4 },
  { label: "5 — Strong & consistent", points: 5 },
];

const AREAS: AssessmentArea[] = [
  {
    id: "strategic-alignment",
    label: "Strategic Alignment",
    icon: "strategy",
    insights: {
      high: "Content clearly ties back to named business goals and a specific audience — the team knows why it's making what it's making.",
      mid: "There's some strategic grounding, but content planning still drifts toward \"staying active\" more than serving a specific goal. Naming the objective before each piece would tighten this.",
      low: "Content isn't clearly tied to business goals right now — it's being produced, but not for a stated reason. This is the highest-leverage fix on this audit.",
    },
  },
  {
    id: "output-quality",
    label: "Output Quality",
    icon: "quality",
    insights: {
      high: "Quality and brand consistency hold up regardless of who's making the content — a real sign of a mature process, not just individual talent.",
      mid: "Quality is generally solid but noticeably depends on who's producing it. Documenting brand guidelines more explicitly would close that gap.",
      low: "Quality and consistency vary significantly by creator, and content likely doesn't stand up well against competitors. This is worth addressing before increasing output volume.",
    },
  },
  {
    id: "workflow",
    label: "Workflow",
    icon: "workflow",
    insights: {
      high: "There's a documented pipeline with clear approvals and organized assets — the team could function even if you stepped away for a week.",
      mid: "A workflow exists but isn't fully documented or consistently followed, so things occasionally fall through the cracks. Writing it down properly would remove a lot of friction.",
      low: "Content creation is largely ad hoc right now, with unclear approvals and hard-to-find assets. This is usually where wasted hours are hiding.",
    },
  },
  {
    id: "measurement",
    label: "Measurement",
    icon: "measurement",
    insights: {
      high: "Performance is tracked, reviewed regularly, and actually shapes what gets made next — the team is optimizing, not just producing.",
      mid: "Some metrics are tracked, but they aren't consistently reviewed or acted on. Building a simple, regular reporting habit would make the data actually useful.",
      low: "There's little to no regular measurement happening, so it's genuinely unclear whether the content is working. This blind spot should be closed before scaling production further.",
    },
  },
];

const QUESTIONS: AssessmentQuestion[] = [
  {
    area: "strategic-alignment",
    prompt: "Content produced ties back to a specific, named business objective, not just \"staying active.\"",
    options: SCALE,
  },
  {
    area: "strategic-alignment",
    prompt: "The team could explain who each piece of content is actually for.",
    options: SCALE,
  },
  {
    area: "strategic-alignment",
    prompt: "Content themes are planned ahead, not decided the morning of posting.",
    options: SCALE,
  },
  {
    area: "output-quality",
    prompt: "Visual and written quality is consistent, not dependent on who happened to make it.",
    options: SCALE,
  },
  {
    area: "output-quality",
    prompt: "Brand guidelines (color, tone, logo use) are followed without needing correction.",
    options: SCALE,
  },
  {
    area: "output-quality",
    prompt: "Content stands up well against competitors' output in the same space.",
    options: SCALE,
  },
  {
    area: "workflow",
    prompt: "There's a documented content calendar or pipeline, not an ad hoc scramble.",
    options: SCALE,
  },
  {
    area: "workflow",
    prompt: "Approval steps are clear, so content isn't published without the right sign-off — or bottlenecked waiting for it.",
    options: SCALE,
  },
  {
    area: "workflow",
    prompt: "Raw files, captions, and assets are organized and findable by someone other than the creator.",
    options: SCALE,
  },
  {
    area: "measurement",
    prompt: "Basic performance metrics are tracked and reviewed on a regular schedule.",
    options: SCALE,
  },
  {
    area: "measurement",
    prompt: "The team adjusts what it makes based on what past content actually performed, not instinct alone.",
    options: SCALE,
  },
  {
    area: "measurement",
    prompt: "Leadership sees a simple, regular report — not just anecdotal impressions of \"doing well.\"",
    options: SCALE,
  },
];

export const mediaTeamAuditAssessment: Assessment = {
  areas: AREAS,
  questions: QUESTIONS,
  scoreBands: [
    {
      min: 80,
      label: "Strong",
      description:
        "Strong, strategically-aligned media function. Focus on protecting what's working as the team or output scales.",
    },
    {
      min: 53,
      label: "Functional but Drifting",
      description:
        "Functional but drifting. Usually a strategy or measurement gap, not a talent gap — revisit Strategic Alignment and Measurement first.",
    },
    {
      min: 0,
      label: "Needs Attention",
      description:
        "Content is likely busywork disconnected from results. Pause new production briefly to fix workflow and strategy before making more of it.",
    },
  ],
};
