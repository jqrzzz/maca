/**
 * Donor-thanks (v0) — prompt assembly. The shared grounding block
 * (scripts/lib/grounding.ts) supplies PRASM's voice, verified facts, and consent
 * rules; this file adds the donor-relations intro, the output contract, and the
 * per-run donation details. The load-bearing rule here is honesty about tax
 * status — PRASM cannot issue tax-deductible receipts.
 */
import { storyBeats } from "@/content/storyBank";
import { buildGroundingBlock } from "../lib/grounding";
import { bullets } from "../lib/util";
import type { DonationEvent } from "./types";

/** JSON schema for structured output — maps 1:1 to ThankYou. */
export const thankSchema: Record<string, unknown> = {
  type: "object",
  additionalProperties: false,
  properties: {
    subject: { type: "string" },
    body: { type: "string" },
    shortVersion: { type: "string" },
  },
  required: ["subject", "body", "shortVersion"],
};

const INTRO =
  "You are the donor-relations writer for PRASM — a small, founder-led initiative supporting Kayan refugees from Myanmar who live, largely undocumented and off-grid, in the hills of Mae Hong Son, Thailand. You write warm, honest, personal thank-you notes to people who have supported PRASM. You draft; a human reviews and sends — you never send anything.";

const OUTPUT_CONTRACT = [
  "OUTPUT",
  "Be warm, specific, and brief. Thank the supporter genuinely and connect their gift to the real work — medical care and transport, the hand-written records that also help prove identity, the village's solar/water/food self-reliance — without inventing specific outcomes, numbers, or names. If they directed their gift somewhere, acknowledge it. Address them by name if given; otherwise use a warm, natural greeting. Gracious, not gushing.",
  "",
  "CRITICAL HONESTY: PRASM is an emerging initiative not yet formally registered and CANNOT issue tax-deductible receipts. Never imply a tax receipt, deductibility, or charitable-tax status. If a receipt seems expected, say honestly that we're not yet able to provide tax receipts, but can confirm the gift and account for how it's used.",
  "",
  "Return ONLY JSON matching the provided schema:",
  bullets([
    "subject — a short, warm email subject.",
    "body — the thank-you, about 80–150 words.",
    "shortVersion — 1–2 sentences usable as a text, DM, or receipt note.",
  ]),
].join("\n");

export function buildSystemPrompt(): string {
  return `${INTRO}\n\n${buildGroundingBlock()}\n\n${OUTPUT_CONTRACT}`;
}

export function buildUserPrompt(e: DonationEvent): string {
  const lines: string[] = ["DONATION"];
  if (e.sample) {
    lines.push("[SAMPLE — illustrative, not a real donation]");
  }
  lines.push(`Donor: ${e.donor ?? "(name not given — use a warm greeting)"}`);
  if (e.amount) lines.push(`Amount: ${e.amount}`);
  if (e.method) lines.push(`Method: ${e.method}`);
  if (e.recurring) lines.push("Recurring monthly supporter: yes");
  if (e.firstTime) lines.push("First-time gift: yes");
  if (e.earmark) lines.push(`Directed to: ${e.earmark}`);
  if (e.note) lines.push(`Their note: "${e.note}"`);
  if (e.personal) lines.push(`Personal touch to include: ${e.personal}`);
  lines.push(`Preferred flavor: ${e.channel ?? "email"}`);
  lines.push("");

  lines.push(
    "PRASM STORY THREADS (ground any mention of the work in these; do not copy verbatim):",
  );
  for (const b of storyBeats) lines.push(`- ${b.title}: ${b.summary}`);
  lines.push("");

  lines.push(
    "Write the thank-you now, grounded only in the above and the verified facts in your instructions.",
  );
  return lines.join("\n");
}
