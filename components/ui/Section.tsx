import { cn } from "@/lib/cn";
import { Container } from "./Container";

type Tone = "cream" | "sand" | "forest";

type SectionProps = {
  tone?: Tone;
  /** Wrap children in a Container automatically. Set false for full-bleed. */
  contained?: boolean;
  containerSize?: "default" | "prose" | "wide";
  className?: string;
  innerClassName?: string;
  id?: string;
  "aria-labelledby"?: string;
  children: React.ReactNode;
};

const tones: Record<Tone, string> = {
  cream: "bg-cream text-ink",
  sand: "bg-sand text-ink",
  forest: "bg-forest-600 text-cream [&_h1]:text-cream [&_h2]:text-cream [&_h3]:text-cream",
};

/** Vertical-rhythm section band with a tone background. */
export function Section({
  tone = "cream",
  contained = true,
  containerSize = "default",
  className,
  innerClassName,
  children,
  ...rest
}: SectionProps) {
  return (
    <section
      className={cn("py-20 md:py-28 lg:py-32", tones[tone], className)}
      {...rest}
    >
      {contained ? (
        <Container size={containerSize} className={innerClassName}>
          {children}
        </Container>
      ) : (
        children
      )}
    </section>
  );
}
