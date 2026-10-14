import { PDFDocument, StandardFonts, rgb, type PDFFont } from "pdf-lib";
import type { Assessment } from "@/lib/assessments";
import type { AssessmentResult } from "@/lib/assessment-scoring";
import { insightTier } from "@/lib/assessment-scoring";

const PAGE_WIDTH = 612;
const PAGE_HEIGHT = 792;
const MARGIN = 56;
const ACCENT = rgb(0xb5 / 255, 0x99 / 255, 0x5d / 255);
const INK = rgb(0x0e / 255, 0x0e / 255, 0x0e / 255);
const MUTED = rgb(0x64 / 255, 0x74 / 255, 0x8b / 255);

/** Wraps `text` to fit within `maxWidth`, measured against `font` at `size`. */
function wrapText(text: string, font: PDFFont, size: number, maxWidth: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = "";

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(candidate, size) > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
}

/**
 * Renders a scored assessment's results (overall score, band, and each
 * area's breakdown + insight) as a standalone PDF — the document emailed
 * to a visitor after they unlock an on-site assessment, in place of a
 * static guide download.
 */
export async function generateAssessmentResultsPdf({
  resourceTitle,
  firstName,
  assessment,
  result,
}: {
  resourceTitle: string;
  firstName: string;
  assessment: Assessment;
  result: AssessmentResult;
}): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);

  let page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  let y = PAGE_HEIGHT - MARGIN;
  const contentWidth = PAGE_WIDTH - MARGIN * 2;

  function ensureSpace(height: number) {
    if (y - height < MARGIN) {
      page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
      y = PAGE_HEIGHT - MARGIN;
    }
  }

  function drawText(
    text: string,
    { font = regular, size = 11, color = INK, gap = 16 }: { font?: PDFFont; size?: number; color?: ReturnType<typeof rgb>; gap?: number } = {}
  ) {
    const lines = wrapText(text, font, size, contentWidth);
    for (const line of lines) {
      ensureSpace(gap);
      page.drawText(line, { x: MARGIN, y, size, font, color });
      y -= gap;
    }
  }

  drawText(resourceTitle, { font: bold, size: 12, color: ACCENT, gap: 20 });
  drawText(`Results for ${firstName}`, { font: bold, size: 22, gap: 32 });
  drawText(`Overall score: ${Math.round(result.overall)} / 100`, { font: bold, size: 14, gap: 24 });

  if (assessment.scoreBands) {
    const band = [...assessment.scoreBands].sort((a, b) => b.min - a.min).find((b) => result.overall >= b.min);
    if (band) {
      drawText(band.label, { font: bold, size: 12, color: ACCENT, gap: 16 });
      drawText(band.description, { size: 11, color: MUTED, gap: 20 });

      if (band.recommendations?.length) {
        drawText("Recommended next steps", { font: bold, size: 12, gap: 18 });
        for (const step of band.recommendations) {
          drawText(`•  ${step}`, { size: 11, color: MUTED, gap: 16 });
        }
        y -= 4;
      }
    }
  }

  ensureSpace(10);
  y -= 6;
  page.drawLine({
    start: { x: MARGIN, y },
    end: { x: PAGE_WIDTH - MARGIN, y },
    thickness: 1,
    color: rgb(0.88, 0.88, 0.88),
  });
  y -= 24;

  drawText("Breakdown by area", { font: bold, size: 14, gap: 24 });

  for (const { area: areaId, score } of result.byArea) {
    const areaMeta = assessment.areas.find((a) => a.id === areaId);
    if (!areaMeta) continue;

    ensureSpace(24);
    drawText(`${areaMeta.label} — ${score} / 100`, { font: bold, size: 12, gap: 18 });
    drawText(areaMeta.insights[insightTier(score)], { size: 11, color: MUTED, gap: 16 });
    y -= 8;
  }

  return pdf.save();
}
