import { cn } from "@/lib/cn";

type Tone = "clay" | "forest" | "gold" | "neutral";

const tones: Record<Tone, string> = {
  clay: "bg-clay-50 text-clay-700 ring-clay-100",
  forest: "bg-forest-500/10 text-forest-700 ring-forest-500/20",
  gold: "bg-gold-400/15 text-clay-700 ring-gold-400/30",
  neutral: "bg-sand text-stone ring-line",
};

/** Small pill label (value chips, "Planned" roadmap markers, tags). */
export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
