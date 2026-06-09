/**
 * Small shared utilities for the authoring scripts (Field-to-Story, Grants).
 */
import fs from "node:fs";

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
