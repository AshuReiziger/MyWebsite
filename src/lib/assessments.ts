import { brandAuditAssessment } from "@/content/assessments/brand-audit-guide";
import { creativeTeamHealthCheckAssessment } from "@/content/assessments/creative-team-health-check";
import { mediaTeamAuditAssessment } from "@/content/assessments/media-team-audit";
import type { Assessment } from "@/content/assessments/types";

const ASSESSMENTS: Record<string, Assessment> = {
  "brand-audit-guide": brandAuditAssessment,
  "creative-team-health-check": creativeTeamHealthCheckAssessment,
  "media-team-audit": mediaTeamAuditAssessment,
};

export function getAssessmentBySlug(slug: string): Assessment | null {
  return ASSESSMENTS[slug] ?? null;
}

export type { Assessment, AssessmentArea, AssessmentQuestion, AssessmentOption, AreaIconKey, ScoreBand } from "@/content/assessments/types";
