import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  /** Use on dark (forest) sections to flip text colors. */
  onDark?: boolean;
  className?: string;
  id?: string;
};

const titleSize: Record<NonNullable<SectionHeadingProps["as"]>, string> = {
  h1: "text-h1",
  h2: "text-h2",
  h3: "text-h3",
};

/** Eyebrow + headline + lede — the consistent opener for every section. */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  as = "h2",
  onDark = false,
  className,
  id,
}: SectionHeadingProps) {
  const Tag = as;
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-3 text-[0.8125rem] font-semibold tracking-[0.12em] uppercase",
            onDark ? "text-gold-400" : "text-clay-600",
          )}
        >
          {eyebrow}
        </p>
      )}
      <Tag className={cn(titleSize[as], onDark && "text-cream")}>{title}</Tag>
      {lede && (
        <p
          className={cn(
            "text-lede mt-5",
            onDark ? "text-cream/85" : "text-stone",
          )}
        >
          {lede}
        </p>
      )}
    </div>
  );
}
