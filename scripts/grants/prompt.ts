/**
 * Grants copilot (v0) — prompt assembly. The shared grounding block
 * (scripts/lib/grounding.ts) supplies PRASM's voice, verified facts, and consent
 * rules; this file adds the grants intro, the output contract, and the per-run
 * funder profile.
 */
import { storyBeats } from "@/content/storyBank";
import { buildGroundingBlock } from "../lib/grounding";
import { bullets } from "../lib/util";
import type { FunderProfile } from "./types";

/** JSON schema for structured output — maps 1:1 to GrantDraft. */
export const grantSchema: Record<string, unknown> = {
  type: "object",
  additionalProperties: false,
  properties: {
    summary: { type: "string" },
    answers: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          question: { type: "string" },
          answer: { type: "string" },
        },
        required: ["question", "answer"],
      },
    },
    statusDisclosure: { type: "string" },
    fitNote: { type: "string" },
  },
  required: ["summary", "answers", "statusDisclosure", "fitNote"],
};

const INTRO =
  "You are the grants writer for PRASM, a small, founder-led initiative supporting Kayan refugees from Myanmar who live, largely undocumented and off-grid, in the hills of Mae Hong Son, Thailand. You draft funding applications tailored to a specific funder, grounded in PRASM's real story. You draft; a human reviews, refines, and submits. You never submit anything.";

const OUTPUT_CONTRACT = [
  "OUTPUT",
  'Tailor everything to THIS funder: their focus, geography, and questions. Where the funder asks for a figure you don\'t have, describe it qualitatively or write "[to be provided]" rather than inventing one. Be honest about status: PRASM is an emerging, founder-led initiative not yet formally registered. Never imply charity registration, tax-deductibility, or audited financials.',
  "",
  "Return ONLY JSON matching the provided schema:",
  bullets([
    "summary: about 80 to 120 words on who PRASM is and what we are asking this funder to support, framed for their priorities.",
    'answers: one object per funder question, in the funder\'s order, each shaped as {"question": <restate the question>, "answer": <a grounded, in-voice answer that respects any word limit>}. Answer every question. If a question can\'t be answered from grounded facts, say what we can honestly say and mark the gap "[to be provided]".',
    "statusDisclosure: a short, honest paragraph on PRASM's legal status and what it means for a funder, covering that there are no tax-deductible receipts or audited financials yet, that support reaches the community directly, and that we account for any gift on request.",
    "fitNote: 2 to 3 sentences, INTERNAL (for the founder, not for submission), on how well this funder fits PRASM, and any gap or mismatch to weigh before applying.",
  ]),
].join("\n");

export function buildSystemPrompt(): string {
  return `${INTRO}\n\n${buildGroundingBlock()}\n\n${OUTPUT_CONTRACT}`;
}

export function buildUserPrompt(p: FunderProfile): string {
  const lines: string[] = ["FUNDER PROFILE", `Funder: ${p.funder}`];
  if (p.sample) {
    lines.push("[SAMPLE PROFILE: illustrative, not a real funder]");
  }
  if (p.focus) lines.push(`Focus: ${p.focus}`);
  if (p.funds) lines.push(`Funds: ${p.funds}`);
  if (p.geography) lines.push(`Geography: ${p.geography}`);
  if (p.amount) lines.push(`Typical/requested amount: ${p.amount}`);
  if (p.deadline) lines.push(`Deadline: ${p.deadline}`);
  if (p.wordLimit) {
    lines.push(`Word guidance: about ${p.wordLimit} words per answer`);
  }
  if (p.project) lines.push(`Project we are seeking support for: ${p.project}`);
  if (p.notes) lines.push(`Extra context: ${p.notes}`);
  lines.push("");

  lines.push("QUESTIONS TO ANSWER (in order):");
  p.questions.forEach((q, i) => lines.push(`${i + 1}. ${q}`));
  lines.push("");

  lines.push(
    "PRASM STORY THREADS (ground your answers in these; do not copy verbatim):",
  );
  for (const b of storyBeats) lines.push(`- ${b.title}: ${b.summary}`);
  lines.push("");

  lines.push(
    "Draft the application now, grounded only in the above and the verified facts in your instructions.",
  );
  return lines.join("\n");
}
