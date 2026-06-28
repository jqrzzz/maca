/**
 * Small shared primitives for the /preview demo (admin + member views).
 * Presentational only, so they can live in the client bundle without hooks.
 */

export type Tone = "clay" | "forest" | "gold" | "neutral";

export const card = "rounded-[20px] border border-line bg-cream shadow-soft";

export const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

export const initials = (name: string): string =>
  name
    .replace(/[^a-zA-Z ]/g, "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase() || "?";

export const roleTone: Record<string, Tone> = {
  admin: "clay",
  treasurer: "forest",
  board: "forest",
  "content-approver": "gold",
  volunteer: "neutral",
};

export function Avatar({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-clay-50 font-semibold text-clay-700 ${className}`}
      aria-hidden
    >
      {initials(name)}
    </span>
  );
}
