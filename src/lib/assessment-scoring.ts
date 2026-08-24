import type { AssessmentQuestion } from "@/content/assessments/brand-audit-guide";

export interface AreaScore {
  area: string;
  score: number;
}

export interface AssessmentResult {
  overall: number;
  byArea: AreaScore[];
}

/** `answers[i]` is the selected option index for `questions[i]`, or -1 if unanswered. */
export function scoreAssessment(
  questions: AssessmentQuestion[],
  answers: number[]
): AssessmentResult {
  const totals = new Map<string, { sum: number; max: number }>();

  questions.forEach((question, i) => {
    const maxPoints = Math.max(...question.options.map((o) => o.points));
    const selected = question.options[answers[i]];
    const entry = totals.get(question.area) ?? { sum: 0, max: 0 };
    entry.sum += selected?.points ?? 0;
    entry.max += maxPoints;
    totals.set(question.area, entry);
  });

  const byArea: AreaScore[] = Array.from(totals.entries()).map(([area, { sum, max }]) => ({
    area,
    score: max > 0 ? Math.round((sum / max) * 100) : 0,
  }));

  const overall =
    byArea.length > 0 ? Math.round(byArea.reduce((total, a) => total + a.score, 0) / byArea.length) : 0;

  return { overall, byArea };
}

export function insightTier(score: number): "low" | "mid" | "high" {
  if (score >= 71) return "high";
  if (score >= 41) return "mid";
  return "low";
}
