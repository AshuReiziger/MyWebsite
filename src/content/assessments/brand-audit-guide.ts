import type { Assessment, AssessmentArea, AssessmentQuestion } from "./types";
export type { AreaIconKey, AssessmentArea, AssessmentOption, AssessmentQuestion, Assessment } from "./types";

const AREAS: AssessmentArea[] = [
  {
    id: "positioning",
    label: "Brand Positioning",
    icon: "positioning",
    insights: {
      high: "Your positioning is clear and differentiated — the highest-leverage move now is protecting it as you grow, not rebuilding it.",
      mid: "Your positioning is understood internally but not yet distinct in the market. Sharpening your point of differentiation is the highest-leverage fix available to you right now.",
      low: "Right now it's genuinely hard to tell what makes you different. A focused positioning exercise would pay off faster than any other single change.",
    },
  },
  {
    id: "messaging",
    label: "Brand Messaging",
    icon: "messaging",
    insights: {
      high: "Your message travels well — it holds up across channels and stays outcome-focused. Keep it consistent as the team grows.",
      mid: "Your core message is fairly consistent across channels — tightening it into one repeatable line would make it easier for others to repeat on your behalf.",
      low: "Your message shifts depending on where people encounter it. Writing down one clear, outcome-focused message would immediately raise every score below it.",
    },
  },
  {
    id: "visual-identity",
    label: "Visual Identity",
    icon: "visual-identity",
    insights: {
      high: "Your visual system is documented and consistently applied — it's doing real work building recognition.",
      mid: "Your visual system is solid but under-applied — a few missing usage guidelines would help it hold up as you scale.",
      low: "Without documented guidelines, your visual identity is likely inconsistent wherever someone besides you touches it. This is often the fastest fix on the list.",
    },
  },
  {
    id: "consistency",
    label: "Brand Consistency",
    icon: "consistency",
    insights: {
      high: "Your brand could survive you stepping away for a week — that's a real sign of a working system, not just good intentions.",
      mid: "Cross-channel consistency is one of your biggest gaps. A lightweight brand guide would close most of this quickly.",
      low: "Right now, brand consistency depends entirely on you being in the room. Documenting even the basics would change that fast.",
    },
  },
  {
    id: "customer-experience",
    label: "Customer Experience",
    icon: "customer-experience",
    insights: {
      high: "Customers consistently describe your experience well — the opportunity now is turning that into referrals and testimonials.",
      mid: "Your customer experience is generally positive but inconsistent. Standardizing your best moments would raise the floor.",
      low: "There's a real gap between what you promise and what customers experience. This is worth investigating before spending more on marketing.",
    },
  },
  {
    id: "perception",
    label: "Brand Perception",
    icon: "perception",
    insights: {
      high: "How you're perceived closely matches how you intend to be seen — a strong foundation to build on.",
      mid: "There's a gap between how you intend to be seen and how you're actually perceived — worth a short customer perception check-in.",
      low: "You don't yet have a clear read on how you're actually perceived. That blind spot is worth closing before any other brand investment.",
    },
  },
];

const QUESTIONS: AssessmentQuestion[] = [
  // Brand Positioning
  {
    area: "positioning",
    prompt:
      "When someone unfamiliar with your brand describes what you do, how consistent are their answers?",
    options: [
      { label: "Everyone says almost the same thing", points: 3 },
      { label: "Most people are close, with some variation", points: 2 },
      { label: "Answers vary quite a bit depending on who you ask", points: 1 },
      { label: "People often guess, or aren't sure at all", points: 0 },
    ],
  },
  {
    area: "positioning",
    prompt: "How would you describe your position compared to your closest competitors?",
    options: [
      { label: "Clearly different — there's no real overlap", points: 3 },
      { label: "Different in a few ways, similar in others", points: 2 },
      { label: "Mostly similar, with small differences", points: 1 },
      { label: "Hard to tell us apart", points: 0 },
    ],
  },
  {
    area: "positioning",
    prompt:
      "If you had to explain why someone should choose you over anyone else, in one sentence, could you?",
    options: [
      { label: "Yes — it's clear and I say it the same way every time", points: 3 },
      { label: "Yes, but I'd phrase it differently each time", points: 2 },
      { label: "I could, but it would take more than a sentence", points: 1 },
      { label: "Not really — I'd struggle to answer that", points: 0 },
    ],
  },
  // Brand Messaging
  {
    area: "messaging",
    prompt:
      "Across your website, social media, and sales conversations, how consistent is your core message?",
    options: [
      { label: "Exactly the same message everywhere", points: 3 },
      { label: "Same idea, different wording", points: 2 },
      { label: "Somewhat consistent, some drift", points: 1 },
      { label: "Different messages depending on the channel", points: 0 },
    ],
  },
  {
    area: "messaging",
    prompt: "Do your marketing materials talk more about features or about outcomes for the customer?",
    options: [
      { label: "Almost entirely about outcomes and results", points: 3 },
      { label: "A healthy mix of both", points: 2 },
      { label: "Mostly features, with occasional outcomes", points: 1 },
      { label: "Almost entirely features", points: 0 },
    ],
  },
  {
    area: "messaging",
    prompt: "How often do you update or revisit your core messaging?",
    options: [
      { label: "It's documented and reviewed regularly", points: 3 },
      { label: "We revisit it occasionally", points: 2 },
      { label: "It exists somewhere but we rarely look at it", points: 1 },
      { label: "It's never been written down", points: 0 },
    ],
  },
  // Visual Identity
  {
    area: "visual-identity",
    prompt: "Do you have documented guidelines for your logo, colors, and fonts?",
    options: [
      { label: "Yes, a full guide everyone follows", points: 3 },
      { label: "Some basics are documented", points: 2 },
      { label: "It's mostly in my head, not written down", points: 1 },
      { label: "No guidelines exist", points: 0 },
    ],
  },
  {
    area: "visual-identity",
    prompt: "How consistent does your visual identity look across your website, social, and printed materials?",
    options: [
      { label: "Instantly recognizable as the same brand everywhere", points: 3 },
      { label: "Mostly consistent, a few inconsistencies", points: 2 },
      { label: "Noticeably different in places", points: 1 },
      { label: "Looks like different brands", points: 0 },
    ],
  },
  {
    area: "visual-identity",
    prompt: "When did you last update your visual identity to reflect where your business is today?",
    options: [
      { label: "Recently, and it fits well", points: 3 },
      { label: "A while ago, but it still mostly fits", points: 2 },
      { label: "It's outdated but functional", points: 1 },
      { label: "It no longer reflects the business at all", points: 0 },
    ],
  },
  // Brand Consistency
  {
    area: "consistency",
    prompt: "If a new team member joined tomorrow, could they represent your brand correctly without asking you?",
    options: [
      { label: "Yes, everything they need is documented", points: 3 },
      { label: "Mostly, with a few gaps", points: 2 },
      { label: "They'd need a lot of guidance", points: 1 },
      { label: "No — it all lives in my head", points: 0 },
    ],
  },
  {
    area: "consistency",
    prompt: "How consistent is your tone of voice across emails, social posts, and customer service?",
    options: [
      { label: "Very consistent — it feels like one voice", points: 3 },
      { label: "Mostly consistent", points: 2 },
      { label: "It varies depending on who's writing", points: 1 },
      { label: "Very inconsistent", points: 0 },
    ],
  },
  {
    area: "consistency",
    prompt: "Do you have a system (templates, guidelines, checklists) for maintaining brand consistency?",
    options: [
      { label: "Yes, and the team actively uses it", points: 3 },
      { label: "Something exists, but isn't always used", points: 2 },
      { label: "We've talked about it but haven't built it", points: 1 },
      { label: "No system exists", points: 0 },
    ],
  },
  // Customer Experience
  {
    area: "customer-experience",
    prompt: "How would your customers describe their experience working with you?",
    options: [
      { label: "Consistently excellent, and they tell others", points: 3 },
      { label: "Generally positive", points: 2 },
      { label: "Mixed — depends on the situation", points: 1 },
      { label: "I'm not confident it's positive", points: 0 },
    ],
  },
  {
    area: "customer-experience",
    prompt: "Do you actively collect feedback from customers about their experience?",
    options: [
      { label: "Yes, regularly and systematically", points: 3 },
      { label: "Occasionally, informally", points: 2 },
      { label: "Rarely", points: 1 },
      { label: "Never", points: 0 },
    ],
  },
  {
    area: "customer-experience",
    prompt: "How well does your customer experience match the promises made in your marketing?",
    options: [
      { label: "It matches or exceeds what we promise", points: 3 },
      { label: "Mostly matches", points: 2 },
      { label: "There's a noticeable gap", points: 1 },
      { label: "There's a significant gap", points: 0 },
    ],
  },
  // Brand Perception
  {
    area: "perception",
    prompt: "How do you think your brand is perceived by people who don't know you personally?",
    options: [
      { label: "Exactly how we intend to be perceived", points: 3 },
      { label: "Mostly how we intend, with some gaps", points: 2 },
      { label: "Somewhat different from what we intend", points: 1 },
      { label: "I honestly don't know", points: 0 },
    ],
  },
  {
    area: "perception",
    prompt: "Have you ever asked customers or prospects directly how they perceive your brand?",
    options: [
      { label: "Yes, and we use that feedback", points: 3 },
      { label: "Yes, informally", points: 2 },
      { label: "We've thought about it but haven't done it", points: 1 },
      { label: "No, never", points: 0 },
    ],
  },
  {
    area: "perception",
    prompt: "If your brand disappeared tomorrow, how much would people notice or miss it?",
    options: [
      { label: "Significantly — we've built real recognition", points: 3 },
      { label: "Some people would notice", points: 2 },
      { label: "A few loyal customers might", points: 1 },
      { label: "Probably not much", points: 0 },
    ],
  },
];

export const brandAuditAssessment: Assessment = {
  areas: AREAS,
  questions: QUESTIONS,
};
