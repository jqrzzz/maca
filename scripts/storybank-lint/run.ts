/**
 * Story Bank lint (v0) — keeps the grounding spine honest as it grows.
 *
 * Deterministic checks, no API:
 *  - facts: unique ids, claim + source present, no verified fact carrying a
 *    number that belongs to a placeholder/unverified fact (catches accidental
 *    "promotion" of a placeholder into established truth)
 *  - story beats: unique ids, every cited source file actually exists,
 *    summaries + themes present
 *  - people: valid consent levels; consent below "full" must not pair with a
 *    full personal name or (warn) a public image
 *  - boilerplate/voice: required fields present; the "place" wording can't
 *    contain coordinates or precise numbers
 *
 * Errors exit 1 (CI-friendly); warnings exit 0.
 *
 * Run via:  npm run storybank:lint
 */
import fs from "node:fs";
import {
  facts,
  storyBeats,
  people,
  boilerplate,
  voice,
} from "@/content/storyBank";

type Issue = { level: "error" | "warn"; where: string; note: string };
const issues: Issue[] = [];
const err = (where: string, note: string) =>
  issues.push({ level: "error", where, note });
const warn = (where: string, note: string) =>
  issues.push({ level: "warn", where, note });

const CONSENT_LEVELS = new Set([
  "full",
  "first-name",
  "anonymous",
  "role-only",
  "composite",
]);
const FACT_STATUSES = new Set(["verified", "unverified", "placeholder"]);
const NAME_PATTERN = /^[A-Z][a-z]+\s+[A-Z][a-z]+/;

function uniqueIds(where: string, ids: string[]): void {
  const seen = new Set<string>();
  for (const id of ids) {
    if (seen.has(id)) err(where, `duplicate id "${id}"`);
    seen.add(id);
  }
}

// --- facts ---
uniqueIds(
  "facts",
  facts.map((f) => f.id),
);
const unverifiedNumbers = new Set(
  facts
    .filter((f) => f.status !== "verified")
    .flatMap((f) => f.claim.match(/\d+/g) ?? []),
);
for (const f of facts) {
  if (!f.claim.trim()) err(`facts.${f.id}`, "empty claim");
  if (!f.source.trim()) err(`facts.${f.id}`, "missing source");
  if (!FACT_STATUSES.has(f.status)) {
    err(`facts.${f.id}`, `invalid status "${f.status}"`);
  }
  if (f.status === "verified") {
    const overlap = (f.claim.match(/\d+/g) ?? []).filter((n) =>
      unverifiedNumbers.has(n),
    );
    if (overlap.length) {
      warn(
        `facts.${f.id}`,
        `verified claim contains number(s) ${overlap.join(", ")} that also appear in placeholder/unverified facts — confirm it isn't a promoted placeholder`,
      );
    }
  }
}

// --- story beats ---
uniqueIds(
  "storyBeats",
  storyBeats.map((b) => b.id),
);
for (const b of storyBeats) {
  if (!b.summary.trim()) err(`beats.${b.id}`, "empty summary");
  if (!b.themes.length) err(`beats.${b.id}`, "no themes");
  for (const src of b.sources) {
    if (!fs.existsSync(src)) {
      err(`beats.${b.id}`, `cited source file does not exist: ${src}`);
    }
  }
}

// --- people ---
uniqueIds(
  "people",
  people.map((p) => p.id),
);
for (const p of people) {
  if (!CONSENT_LEVELS.has(p.consent)) {
    err(`people.${p.id}`, `invalid consent level "${p.consent}"`);
  }
  if (p.consent !== "full" && NAME_PATTERN.test(p.publicReference)) {
    err(
      `people.${p.id}`,
      `publicReference "${p.publicReference}" looks like a full personal name but consent is "${p.consent}"`,
    );
  }
  if (p.imageOK && (p.consent === "anonymous" || p.consent === "role-only")) {
    warn(
      `people.${p.id}`,
      `imageOK is true but consent is "${p.consent}" — confirm an image really is cleared`,
    );
  }
}

// --- boilerplate + voice ---
for (const [k, v] of Object.entries(boilerplate)) {
  if (!String(v).trim()) err(`boilerplate.${k}`, "empty");
}
if (/\d{1,3}\.\d{3,}/.test(boilerplate.place)) {
  err("boilerplate.place", "contains what looks like coordinates");
}
for (const [k, v] of Object.entries(voice)) {
  if (Array.isArray(v) && v.length === 0) err(`voice.${k}`, "empty list");
}

// --- report ---
const errors = issues.filter((i) => i.level === "error");
const warnings = issues.filter((i) => i.level === "warn");
console.log(
  `\nStory Bank lint — ${facts.length} facts · ${storyBeats.length} beats · ${people.length} people`,
);
if (!issues.length) {
  console.log("✅ clean — no errors, no warnings\n");
} else {
  for (const i of issues) {
    console.log(`  ${i.level === "error" ? "✖" : "⚠"} [${i.where}] ${i.note}`);
  }
  console.log(`\n${errors.length} error(s), ${warnings.length} warning(s)\n`);
}
process.exit(errors.length ? 1 : 0);
