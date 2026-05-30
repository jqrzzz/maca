import { Container } from "@/components/ui/Container";
import { Button, type ButtonProps } from "@/components/ui/Button";

type Action = {
  label: string;
  href: string;
  variant?: ButtonProps["variant"];
  external?: boolean;
};

/**
 * High-impact call-to-action band (forest by default). Used to close pages.
 */
export function CTASection({
  title,
  body,
  actions,
  tone = "forest",
}: {
  title: string;
  body?: string;
  actions: Action[];
  tone?: "forest" | "sand";
}) {
  const dark = tone === "forest";
  return (
    <section className={dark ? "grain relative bg-forest-600" : "bg-sand"}>
      {dark && <span aria-hidden className="grain-overlay" />}
      <Container className="relative py-20 text-center md:py-24">
        <h2 className={dark ? "text-h2 text-cream" : "text-h2"}>{title}</h2>
        {body && (
          <p
            className={
              "text-lede mx-auto mt-4 max-w-2xl " +
              (dark ? "text-cream/85" : "text-stone")
            }
          >
            {body}
          </p>
        )}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {actions.map((action, i) => (
            <Button
              key={action.href}
              href={action.href}
              external={action.external}
              size="lg"
              variant={
                action.variant ??
                (dark
                  ? i === 0
                    ? "onDark"
                    : "onDarkOutline"
                  : i === 0
                    ? "primary"
                    : "outline")
              }
            >
              {action.label}
            </Button>
          ))}
        </div>
      </Container>
    </section>
  );
}
