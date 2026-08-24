import { brandAuditAssessment, type Assessment } from "@/content/assessments/brand-audit-guide";

const ASSESSMENTS: Record<string, Assessment> = {
  "brand-audit-guide": brandAuditAssessment,
};

export function getAssessmentBySlug(slug: string): Assessment | null {
  return ASSESSMENTS[slug] ?? null;
}

export type { Assessment, AssessmentArea, AssessmentQuestion, AssessmentOption, AreaIconKey } from "@/content/assessments/brand-audit-guide";
