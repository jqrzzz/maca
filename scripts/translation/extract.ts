/**
 * Translation extractor (v0) — groundwork for the (deferred) Thai/Burmese site.
 *
 * Walks every content module and emits one CSV row per translatable English
 * string: module, path, english, translation (empty column for the translator).
 * Technical values (hrefs, slugs, icon keys, dates, image keys) are skipped by
 * key name and by pattern. Output goes to drafts/translation/ (git-ignored) —
 * regenerate any time; the content modules stay the single source of truth.
 *
 * Run via:  npm run translate:extract
 */
import fs from "node:fs";
import path from "node:path";

import * as site from "@/content/site";
import * as nav from "@/content/nav";
import * as home from "@/content/home";
import * as about from "@/content/about";
import * as need from "@/content/need";
import * as programs from "@/content/programs";
import * as stats from "@/content/stats";
import * as faqs from "@/content/faqs";
import * as getInvolved from "@/content/getInvolved";
import * as donations from "@/content/donations";
import * as transparency from "@/content/transparency";
import * as governance from "@/content/governance";
import * as press from "@/content/press";
import * as terms from "@/content/legal/terms";
import * as privacy from "@/content/legal/privacy";
import * as donationPolicy from "@/content/legal/donationPolicy";
import * as accessibility from "@/content/legal/accessibility";
import * as safeguarding from "@/content/legal/safeguarding";
import * as codeOfConduct from "@/content/legal/codeOfConduct";
import * as conflictOfInterest from "@/content/legal/conflictOfInterest";
import * as complaints from "@/content/legal/complaints";
import * as fundsProtection from "@/content/legal/fundsProtection";
import { getAllFieldNotes } from "@/content/fieldNotes";

const MODULES: Record<string, unknown> = {
  site,
  nav,
  home,
  about,
  need,
  programs,
  stats,
  faqs,
  getInvolved,
  donations,
  transparency,
  governance,
  press,
  "legal/terms": terms,
  "legal/privacy": privacy,
  "legal/donationPolicy": donationPolicy,
  "legal/accessibility": accessibility,
  "legal/safeguarding": safeguarding,
  "legal/codeOfConduct": codeOfConduct,
  "legal/conflictOfInterest": conflictOfInterest,
  "legal/complaints": complaints,
  "legal/fundsProtection": fundsProtection,
  fieldNotes: { notes: getAllFieldNotes() },
};

/** Keys whose string values are technical, not prose. */
const SKIP_KEYS = new Set([
  "href",
  "url",
  "slug",
  "key",
  "icon",
  "id",
  "image",
  "heroImage",
  "date",
  "email",
  "type",
  "status",
  "consent",
]);

/** Patterns that mark a string as non-translatable. */
function isTechnicalString(s: string): boolean {
  if (/^\//.test(s) || /^https?:\/\//.test(s)) return true; // paths/URLs
  if (/^\d{4}-\d{2}-\d{2}/.test(s)) return true; // ISO dates
  if (/^[\d\s.,%+–-]+$/.test(s)) return true; // pure numbers ("40+", "100%")
  if (/^[a-z][a-zA-Z0-9]*$/.test(s) && !s.includes(" ")) return true; // identifiers
  return false;
}

type Row = { module: string; path: string; english: string };
const rows: Row[] = [];

function walk(moduleName: string, value: unknown, trail: string): void {
  if (typeof value === "string") {
    if (!value.trim() || isTechnicalString(value)) return;
    rows.push({ module: moduleName, path: trail, english: value });
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((v, i) => walk(moduleName, v, `${trail}[${i}]`));
    return;
  }
  if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      if (typeof v === "string" && SKIP_KEYS.has(k)) continue;
      if (typeof v === "function") continue;
      walk(moduleName, v, trail ? `${trail}.${k}` : k);
    }
  }
}

const csvEscape = (s: string) => `"${s.replace(/"/g, '""')}"`;

function main(): void {
  for (const [name, mod] of Object.entries(MODULES)) {
    walk(name, mod, "");
  }

  const header = "module,path,english,translation";
  const csv = [
    header,
    ...rows.map((r) =>
      [r.module, r.path, r.english, ""].map(csvEscape).join(","),
    ),
  ].join("\n");

  const outDir = path.join("drafts", "translation");
  fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, "worksheet.csv");
  fs.writeFileSync(outFile, csv);

  const words = rows.reduce(
    (n, r) => n + (r.english.match(/\S+/g) ?? []).length,
    0,
  );
  const perModule = rows.reduce<Record<string, number>>((acc, r) => {
    acc[r.module] = (acc[r.module] ?? 0) + 1;
    return acc;
  }, {});

  console.log(`\nTranslation worksheet → ${outFile}`);
  console.log(
    `${rows.length} strings · ~${words.toLocaleString("en-US")} words across ${Object.keys(perModule).length} modules`,
  );
  console.log("\nPer module:");
  for (const [m, count] of Object.entries(perModule).sort(
    (a, b) => b[1] - a[1],
  )) {
    console.log(`  ${String(count).padStart(4)}  ${m}`);
  }
  console.log(
    "\nHand the CSV to a translator; the content modules remain the source of truth.",
  );
}

main();
