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
    id: "clarity",
    label: "Clarity",
    icon: "clarity",
    insights: {
      high: "Priorities and briefs are clear enough that the team rarely has to guess what you actually want — protect that as the team grows, since clarity is usually the first thing to slip.",
      mid: "Clarity is decent but inconsistent — briefs or priorities occasionally need a follow-up conversation to actually land. Tightening how work gets handed off would close most of this gap.",
      low: "Right now, priorities and briefs depend heavily on you being available to clarify them. Writing down what \"good\" looks like before work starts would raise every other score on this check.",
    },
  },
  {
    id: "feedback",
    label: "Feedback Culture",
    icon: "feedback",
    insights: {
      high: "Feedback moves early, specifically, and safely enough that people actually use it — that's a genuine asset most teams never build.",
      mid: "Feedback exists but isn't always specific or early enough to change the outcome. A simple structure for what a critique should include would sharpen this fast.",
      low: "Feedback is either too vague to act on or arrives too late to matter. This is often the single highest-leverage fix available to a creative team.",
    },
  },
  {
    id: "workload",
    label: "Workload & Pace",
    icon: "workload",
    insights: {
      high: "Capacity and deadlines are realistically matched, and no one person is silently propping up the whole operation — a sign the team can absorb more work without breaking.",
      mid: "Pace is mostly sustainable but strains around certain deadlines or people. Spreading load more evenly would prevent this from becoming a bigger issue.",
      low: "The team is likely running on unsustainable pace or leaning on one bottleneck person. This tends to surface as turnover or quiet burnout before it shows up anywhere else.",
    },
  },
  {
    id: "growth",
    label: "Growth & Ownership",
    icon: "growth",
    insights: {
      high: "People are visibly developing and taking ownership rather than just executing — this is what keeps strong creatives on a team long-term.",
      mid: "Some ownership and growth is happening, but it's not consistent or visible enough for people to feel a real trajectory. A clearer path forward would help retention.",
      low: "Right now, growth and ownership aren't really happening — people are producing, not developing. This is usually the quiet reason a strong team member eventually leaves.",
    },
  },
];

const QUESTIONS: AssessmentQuestion[] = [
  {
    area: "clarity",
    prompt: "Each team member could explain their role's priorities without checking with you first.",
    options: SCALE,
  },
  {
    area: "clarity",
    prompt: "Creative briefs are clear enough that work rarely misses the mark on the first pass.",
    options: SCALE,
  },
  {
    area: "clarity",
    prompt: "The team understands how their work connects to the business's actual goals.",
    options: SCALE,
  },
  {
    area: "feedback",
    prompt: "Feedback is specific and actionable, not just \"I don't love it, try again.\"",
    options: SCALE,
  },
  {
    area: "feedback",
    prompt: "Team members feel safe giving each other honest critique, not just agreeing with the loudest voice.",
    options: SCALE,
  },
  {
    area: "feedback",
    prompt: "Feedback happens early enough in a project to actually change the outcome.",
    options: SCALE,
  },
  {
    area: "workload",
    prompt: "Deadlines are generally realistic, not consistently rushed.",
    options: SCALE,
  },
  {
    area: "workload",
    prompt: "No single person is a bottleneck that everything else waits on.",
    options: SCALE,
  },
  {
    area: "workload",
    prompt: "The team rarely works late nights or weekends to hit avoidable deadlines.",
    options: SCALE,
  },
  {
    area: "growth",
    prompt: "Team members are learning new skills, not repeating the same work indefinitely.",
    options: SCALE,
  },
  {
    area: "growth",
    prompt: "People take ownership of their projects rather than waiting to be told every step.",
    options: SCALE,
  },
  {
    area: "growth",
    prompt: "There's a visible path for someone junior to grow into a more senior role here.",
    options: SCALE,
  },
];

export const creativeTeamHealthCheckAssessment: Assessment = {
  areas: AREAS,
  questions: QUESTIONS,
  scoreBands: [
    {
      min: 60,
      label: "Healthy",
      description:
        "Healthy team. Keep doing what's working, and revisit this check quarterly — health can slip fast during a busy season.",
    },
    {
      min: 40,
      label: "Early Warning",
      description:
        "Early warning signs. Pick the lowest-scoring section and address it directly this month before it compounds.",
    },
    {
      min: 0,
      label: "Needs Attention",
      description:
        "The team is likely already showing symptoms — turnover risk, missed deadlines, or quiet disengagement. This needs a direct conversation with the team, not just a private fix.",
    },
  ],
};
