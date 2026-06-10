/**
 * Small shared utilities for the authoring scripts.
 */
import fs from "node:fs";

/** Render a string list as markdown bullets (shared by the prompt builders). */
export const bullets = (items: string[]): string =>
  items.map((i) => `- ${i}`).join("\n");

/**
 * The value following a CLI flag. Fails loudly when the flag is given without
 * one (`--input` at the end, or followed by another flag) instead of letting
 * `undefined` flow into file reads with a confusing error.
 */
export function argValue(argv: string[], i: number, flag: string): string {
  const v = argv[i];
  if (v === undefined || v.startsWith("-")) {
    throw new Error(`Missing value for ${flag}`);
  }
  return v;
}

/**
 * Today as YYYY-MM-DD in the LOCAL timezone. `toISOString()` is UTC — for a
 * founder in Asia/Bangkok that dates anything drafted before 07:00 as
 * yesterday.
 */
export function todayLocalISO(d = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Load KEY=VALUE pairs from .env.local (e.g. ANTHROPIC_API_KEY) without a dep. */
export function loadLocalEnv(file = ".env.local"): void {
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m && process.env[m[1]] === undefined) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
}

/** Turn a title into a filesystem-safe slug. */
export function slugify(s: string): string {
  return (
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 50) || "draft"
  );
}
