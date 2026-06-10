/**
 * The approval checklist, baked in — shared by every drafting tool.
 *
 * Deterministic scans that DO NOT trust the model: location leaks, possible
 * un-consented names, voice slips, figures that resemble unverified/placeholder
 * values, and honesty overclaims (registration / tax-deductibility PRASM can't
 * claim yet). Scans flag for a human; they never green-light publishing. Each
 * tool layers its own manual checklist on top.
 */
import { facts } from "@/content/storyBank";

export type Finding = { section: string; note: string };

// NOTE: every scan list below is English-only, matching the current
// English-only site. When Thai/Burmese content lands (docs/concept.md §3.7),
// these scans silently pass non-English text — they'll need equivalents in
// those scripts before drafting in them.
const AVOID_WORDS = [
  "victims",
  "victim",
  "needy",
  "beneficiary",
  "beneficiaries",
  "the poor",
];

// Phrases that would overclaim PRASM's legal status (it is not yet registered).
const OVERCLAIM_PATTERNS: { re: RegExp; label: string }[] = [
  { re: /\btax[-\s]?deductible\b/i, label: "tax-deductible" },
  { re: /\btax[-\s]?exempt\b/i, label: "tax-exempt" },
  { re: /\b501\s?\(?c\)?\s?\(?3\)?\b/i, label: "501(c)(3)" },
  {
    re: /\bregistered\s+(?:charity|ngo|non-?profit|foundation)\b/i,
    label: "registered charity/NGO",
  },
  {
    re: /\baudited\s+(?:financials|accounts|statements)\b/i,
    label: "audited financials",
  },
  { re: /\bcharitable\s+status\b/i, label: "charitable status" },
];

// Title-case tokens that are safe to see paired (place/region/org words).
const SAFE_TITLE_WORDS = new Set([
  "Mae",
  "Hong",
  "Son",
  "Thailand",
  "Thai",
  "Myanmar",
  "Burma",
  "Burmese",
  "Kayan",
  "Prasm",
]);

// Common sentence-leading capitalized words — skip these to cut name-scan noise.
const TITLE_STOPWORDS = new Set([
  "The",
  "A",
  "An",
  "And",
  "But",
  "Or",
  "Our",
  "We",
  "They",
  "He",
  "She",
  "It",
  "This",
  "That",
  "These",
  "Those",
  "In",
  "On",
  "At",
  "For",
  "With",
  "Without",
  "From",
  "To",
  "Of",
  "As",
  "If",
  "When",
  "While",
  "Their",
  "His",
  "Her",
  "Its",
  "What",
  "Why",
  "How",
  "Here",
  "There",
  "No",
  "Not",
  "One",
  "Some",
  "Many",
  "Most",
  "Every",
  "Each",
  "Both",
  "After",
  "Before",
]);

// Numeric cores of any fact that is NOT verified (placeholder or unverified).
const UNVERIFIED_NUMBERS = Array.from(
  new Set(
    facts
      .filter((f) => f.status !== "verified")
      .flatMap((f) => f.claim.match(/\d+/g) ?? []),
  ),
);

function scanAvoidWords(section: string, text: string): Finding[] {
  return AVOID_WORDS.filter((w) =>
    new RegExp(`\\b${w}\\b`, "i").test(text),
  ).map((w) => ({
    section,
    note: `Voice — avoid-word "${w}" appears; rephrase (people are partners, not victims).`,
  }));
}

function scanOverclaim(section: string, text: string): Finding[] {
  return OVERCLAIM_PATTERNS.filter((p) => p.re.test(text)).map((p) => ({
    section,
    note: `Honesty — mentions "${p.label}"; PRASM is not yet registered. Confirm this is an honest disclosure ("not yet"), not a claim.`,
  }));
}

function scanLocation(section: string, text: string): Finding[] {
  const out: Finding[] = [];
  if (/\b\d{1,3}\.\d{4,}\b/.test(text) || /\b\d{1,3}\s?°/.test(text)) {
    out.push({
      section,
      note: "Location — looks like map coordinates; remove.",
    });
  }
  const named = text.match(/\bvillages?\s+(?:of|named|called)\s+[A-Z]\w+/i);
  if (named) {
    out.push({
      section,
      note: `Location — appears to name the village ("${named[0]}"); never identify it.`,
    });
  }
  return out;
}

function scanNames(section: string, text: string): Finding[] {
  const matches = text.match(/\b[A-Z][a-z]+\s+[A-Z][a-z]+\b/g) ?? [];
  const suspects = Array.from(new Set(matches)).filter((m) => {
    const [a, b] = m.split(/\s+/);
    if (TITLE_STOPWORDS.has(a)) return false;
    if (SAFE_TITLE_WORDS.has(a) && SAFE_TITLE_WORDS.has(b)) return false;
    return true;
  });
  return suspects.map((s) => ({
    section,
    note: `Consent — "${s}" looks like a personal name; confirm consent to be named, or anonymize.`,
  }));
}

function scanFigures(section: string, text: string): Finding[] {
  const numbers = text.match(/\d+/g) ?? [];
  return Array.from(new Set(numbers))
    .filter((n) => UNVERIFIED_NUMBERS.includes(n))
    .map((n) => ({
      section,
      note: `Figure — "${n}" resembles an unverified/placeholder number; confirm it's grounded in a verified fact or remove it.`,
    }));
}

export function runChecks(
  sections: { label: string; text: string }[],
): Finding[] {
  const findings: Finding[] = [];
  for (const { label, text } of sections) {
    findings.push(
      ...scanAvoidWords(label, text),
      ...scanOverclaim(label, text),
      ...scanLocation(label, text),
      ...scanNames(label, text),
      ...scanFigures(label, text),
    );
  }
  return findings;
}

export function formatFindings(findings: Finding[]): string {
  if (!findings.length) return "  no automated flags";
  return findings.map((f) => `  - [${f.section}] ${f.note}`).join("\n");
}
