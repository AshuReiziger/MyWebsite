export type AreaIconKey =
  | "positioning"
  | "messaging"
  | "visual-identity"
  | "consistency"
  | "customer-experience"
  | "perception"
  | "clarity"
  | "feedback"
  | "workload"
  | "growth"
  | "strategy"
  | "quality"
  | "workflow"
  | "measurement";

export interface AssessmentArea {
  id: string;
  label: string;
  icon: AreaIconKey;
  insights: { low: string; mid: string; high: string };
}

export interface AssessmentOption {
  label: string;
  points: number;
}

export interface AssessmentQuestion {
  /** Matches an AssessmentArea.id */
  area: string;
  prompt: string;
  options: AssessmentOption[];
}

export interface ScoreBand {
  /** Inclusive lower bound on the 0-100 overall score; the highest matching band wins. */
  min: number;
  label: string;
  description: string;
}

export interface Assessment {
  areas: AssessmentArea[];
  questions: AssessmentQuestion[];
  /** Optional overall-score narrative, shown alongside the score ring (ungated) rather than per-area. */
  scoreBands?: ScoreBand[];
}
