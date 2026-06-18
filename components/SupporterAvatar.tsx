import { Heart } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Initials avatar for the supporters wall. Decorative (the supporter's name is
 * always shown as text beside it), so it is aria-hidden. "Anonymous" gets a
 * heart instead of initials.
 */

const tones = [
  "from-clay-500 to-clay-700 text-cream",
  "from-forest-500 to-forest-700 text-cream",
  "from-gold-400 to-clay-300 text-forest-700",
];

const STOP = new Set(["the", "and", "of", "for", "a", "an"]);

function getInitials(name: string): string {
  const letters = name
    .split(/\s+/)
    .map((w) => w.replace(/[^a-zA-Z]/g, ""))
    .filter((w) => w.length > 0 && !STOP.has(w.toLowerCase()))
    .map((w) => w[0]!.toUpperCase());
  return letters.slice(0, 2).join("") || name.slice(0, 1).toUpperCase();
}

/** Stable tone pick so a given name always renders the same color. */
function toneFor(name: string): string {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return tones[h % tones.length]!;
}

const sizeMap = {
  sm: { box: "h-11 w-11 text-sm", icon: "h-4 w-4" },
  md: { box: "h-14 w-14 text-base", icon: "h-6 w-6" },
  lg: { box: "h-20 w-20 text-2xl", icon: "h-8 w-8" },
} as const;

export function SupporterAvatar({
  name,
  size = "md",
  className,
}: {
  name: string;
  size?: keyof typeof sizeMap;
  className?: string;
}) {
  const anon = name.trim().toLowerCase() === "anonymous";
  const s = sizeMap[size];
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br font-display font-semibold shadow-soft",
        anon ? "from-forest-500 to-forest-700 text-cream" : toneFor(name),
        s.box,
        className,
      )}
    >
      {anon ? (
        <Heart className={s.icon} strokeWidth={1.75} />
      ) : (
        getInitials(name)
      )}
    </span>
  );
}
