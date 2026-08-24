export interface WorkshopLearnPoint {
  title: string;
  description: string;
}

export interface WorkshopFormat {
  duration: string;
  groupSize: string;
  delivery: string;
  materials: string;
  investment: string;
}

export interface WorkshopDetail {
  slug: string;
  title: string;
  subhead: string;
  whyBody: string;
  whatYoullLearn: WorkshopLearnPoint[];
  format: WorkshopFormat;
  whoItsFor: string;
  walkAwayWith: string;
}

export const WORKSHOP_DISCOUNTS = [
  { name: "Early Bird", detail: "10% off, paid 2+ weeks ahead" },
  { name: "Group Booking", detail: "15% off per seat, 4+ from the same organization" },
  { name: "Sigma School Students & Alumni", detail: "20% off" },
];

export const WORKSHOPS: WorkshopDetail[] = [
  {
    slug: "strategic-design",
    title: "Strategic Design",
    subhead: "Learn to solve business problems through design — not just make them look better.",
    whyBody:
      "Most design training teaches software. This workshop teaches the thing software can't: how to diagnose a business problem, choose the right design response, and defend that choice to people who don't design for a living.",
    whatYoullLearn: [
      {
        title: "Framing the Real Problem",
        description: "Separating what a client asks for from what they actually need.",
      },
      {
        title: "Design as a Business Tool",
        description: "Connecting design decisions to business outcomes, not aesthetic preference.",
      },
      {
        title: "The Strategic Design Process",
        description: "A repeatable path from ambiguous brief to defensible direction.",
      },
      {
        title: "Presenting & Defending Decisions",
        description: "Explaining design choices in language stakeholders respond to.",
      },
    ],
    format: {
      duration: "Full-day (6 hours)",
      groupSize: "8–15 participants",
      delivery: "In-person, with a virtual option for teams outside Buea",
      materials: "Workbook + strategic brief templates included",
      investment: "25,000 FCFA per seat",
    },
    whoItsFor:
      "Design teams who execute well but struggle to justify decisions; marketing/brand leads who commission design work; founders making design calls without a design background.",
    walkAwayWith:
      "A repeatable framework for approaching any design problem strategically, plus the language to defend decisions in the room, not after the meeting.",
  },
  {
    slug: "visual-communication",
    title: "Visual Communication",
    subhead: "Say more with less — how layout, color, type, and image do the persuading before anyone reads a word.",
    whyBody:
      "Most people treat visual communication as decoration applied after the real thinking is done. This workshop treats it as the argument itself — building layouts, hierarchies, and image choices that communicate clearly on their own, before a single caption is read.",
    whatYoullLearn: [
      {
        title: "Reading Before Reading",
        description: "How hierarchy and layout guide the eye before anyone processes a word.",
      },
      {
        title: "Color & Type as Argument",
        description: "Using color and typography deliberately, not decoratively.",
      },
      {
        title: "Composing for Clarity",
        description: "Grids, whitespace, and contrast that make complex information easy to scan.",
      },
      {
        title: "Critique & Revision",
        description: "A hands-on session applying the above to real participant work.",
      },
    ],
    format: {
      duration: "Half-day (4 hours)",
      groupSize: "10–20 participants",
      delivery: "In-person or virtual",
      materials: "Visual communication workbook + a working template library",
      investment: "15,000 FCFA per seat",
    },
    whoItsFor:
      "Content creators, marketers, and junior designers whose work needs to communicate clearly without a designer double-checking every piece; non-designers who regularly build slides, flyers, or social content.",
    walkAwayWith:
      "A working eye for what makes a layout communicate versus merely decorate, and a personal checklist to run any visual through before it goes out.",
  },
  {
    slug: "branding",
    title: "Branding",
    subhead: "Build brands with real strategic backbone — from positioning through to visual execution.",
    whyBody:
      "A logo is not a brand. This workshop walks the full arc of building a brand that holds together — starting from strategy, not a mood board — so participants leave able to build brands that mean something, not just look like something.",
    whatYoullLearn: [
      {
        title: "Positioning Before Pixels",
        description: "Defining who a brand serves and why, before any visual work starts.",
      },
      {
        title: "From Strategy to System",
        description: "Translating a positioning statement into a coherent visual identity.",
      },
      {
        title: "Brand Voice & Consistency",
        description: "Keeping a brand recognizable across every touchpoint it appears on.",
      },
      {
        title: "Stress-Testing the Brand",
        description: "Pressure-testing a strategy and identity against real market scenarios.",
      },
    ],
    format: {
      duration: "Full-day (6 hours), or split across two half-day sessions",
      groupSize: "8–15 participants",
      delivery: "In-person, with a virtual option",
      materials: "Brand Positioning Worksheet + Brand Identity Checklist included",
      investment: "30,000 FCFA per seat",
    },
    whoItsFor:
      "Business owners planning a rebrand or new launch; designers who want to lead brand projects on real strategic grounding, not just execute a client's visual preferences.",
    walkAwayWith:
      "A completed positioning draft for a real brand of your own (or a case brand), and a working process to run on your next branding project.",
  },
  {
    slug: "creative-business",
    title: "Creative Business",
    subhead: "The business side of creative work — pricing, contracts, clients, and getting paid what you're worth.",
    whyBody:
      "Most creatives learn craft and never learn business, then wonder why talent doesn't translate to income. This workshop covers the unglamorous systems — pricing, contracts, client management — that decide whether a creative practice survives its first hard year.",
    whatYoullLearn: [
      {
        title: "Pricing With Confidence",
        description: "Moving from guesswork to a defensible pricing model.",
      },
      {
        title: "Contracts & Scope",
        description: "Protecting your time and your work with agreements that actually hold.",
      },
      {
        title: "Managing Difficult Clients",
        description: "Handling scope creep, late payment, and unclear feedback without losing the relationship.",
      },
      {
        title: "Building Repeat Business",
        description: "Turning one-off projects into an ongoing income stream.",
      },
    ],
    format: {
      duration: "Half-day (4 hours)",
      groupSize: "10–20 participants",
      delivery: "In-person or virtual",
      materials: "Pricing worksheet + sample contract template included",
      investment: "15,000 FCFA per seat",
    },
    whoItsFor:
      "Freelance and independent creatives pricing their work reactively; small studio owners formalizing how they run client engagements.",
    walkAwayWith:
      "A defensible pricing structure for your own services, and a contract template you can use on your very next project.",
  },
  {
    slug: "creative-leadership",
    title: "Creative Leadership",
    subhead: "Lead creative people and teams — from giving useful feedback to running a healthy studio culture.",
    whyBody:
      "Being promoted to lead a creative team rarely comes with training in how to actually lead one. This workshop covers the specific leadership skills creative work demands — structured critique, creative development, workload management — that generic management training doesn't touch.",
    whatYoullLearn: [
      {
        title: "Feedback That Develops, Not Deflates",
        description: "Giving critique that improves work and grows people.",
      },
      {
        title: "Delegation Without Losing Quality",
        description: "Handing off creative ownership without losing the standard.",
      },
      {
        title: "Managing Creative Workload",
        description: "Protecting pace and output without burning out the team.",
      },
      {
        title: "Building a Culture People Stay For",
        description: "The small, repeatable practices that keep creative teams engaged.",
      },
    ],
    format: {
      duration: "Full-day (6 hours)",
      groupSize: "8–15 participants",
      delivery: "In-person, with a virtual option",
      materials: "Creative Team Health Check + Development Guide included",
      investment: "25,000 FCFA per seat",
    },
    whoItsFor:
      "Newly promoted creative leads and studio owners managing a team for the first time; established leads wanting to formalize practices they've been running on instinct.",
    walkAwayWith:
      "A concrete critique framework to use in your next team review, and a clear read on your own team's health going into the workshop.",
  },
  {
    slug: "systems-thinking",
    title: "Systems Thinking",
    subhead: "Build repeatable systems so creative output doesn't depend on constant improvisation.",
    whyBody:
      "Talented individuals and teams often plateau not because the work gets harder, but because nothing about how the work gets made is repeatable. This workshop teaches participants to design the systems — intake, delivery, pricing, growth — that let creative output scale without depending on memory and mood.",
    whatYoullLearn: [
      {
        title: "Spotting What's Actually Broken",
        description: "Diagnosing where inconsistency is costing you time, money, or quality.",
      },
      {
        title: "Designing Repeatable Processes",
        description: "Turning ad hoc habits into documented, repeatable systems.",
      },
      {
        title: "Systems for a Team",
        description: "Building processes that work when you're not the one doing every step.",
      },
      {
        title: "Maintaining Systems Under Pressure",
        description: "Keeping systems alive once deadlines and busy seasons hit.",
      },
    ],
    format: {
      duration: "Half-day (4 hours)",
      groupSize: "10–20 participants",
      delivery: "In-person or virtual",
      materials: "Building a System Around Your Skill guide + SOP Starter Kit included",
      investment: "15,000 FCFA per seat",
    },
    whoItsFor:
      "Independent creatives and small studio owners whose quality or delivery still depends on who's having a good day; teams scaling past what one person can personally oversee.",
    walkAwayWith:
      "At least one documented system, built during the workshop, ready to use on your very next project.",
  },
];

export function getWorkshopBySlug(slug: string): WorkshopDetail | null {
  return WORKSHOPS.find((workshop) => workshop.slug === slug) ?? null;
}
