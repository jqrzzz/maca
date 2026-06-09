import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

/**
 * Interior page hero — compact, on cream, no background image.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  className,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  className?: string;
}) {
  return (
    <section className={cn("border-b border-line bg-sand", className)}>
      <Container className="py-16 md:py-24">
        <div className="max-w-3xl">
          {eyebrow && (
            <p className="mb-3 text-[0.8125rem] font-semibold tracking-[0.12em] text-clay-600 uppercase">
              {eyebrow}
            </p>
          )}
          <h1 className="text-h1">{title}</h1>
          {lede && <p className="text-lede mt-5 text-stone">{lede}</p>}
        </div>
      </Container>
    </section>
  );
}
