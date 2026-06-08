import type { Metadata } from "next";
import Link from "next/link";
import { Package, Send } from "lucide-react";
import { PageHero } from "@/components/Hero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { FAQ } from "@/components/FAQ";
import {
  DonateLinkCard,
  DonateCryptoCard,
} from "@/components/DonateOptionCard";
import { buildMetadata } from "@/lib/metadata";
import { config, methodVisible } from "@/lib/config";
import {
  monetaryCopy,
  cryptoIntro,
  inKind,
  westernUnionIntro,
} from "@/content/donations";
import { giveFaqs } from "@/content/faqs";

export const metadata: Metadata = buildMetadata({
  title: "Ways to Give",
  description:
    "Give to PRASM by card, PayPal, Patreon, or crypto — or donate supplies in kind. Every gift, in any form, restores care and dignity.",
  path: "/give",
});

export default function GivePage() {
  const visibleLinks = monetaryCopy.filter((m) =>
    methodVisible(config.links[m.key].enabled),
  );
  const visibleCrypto = config.crypto.filter((c) => methodVisible(c.enabled));

  return (
    <>
      <PageHero
        eyebrow="Ways to give"
        title="Every gift, in any form, is dignity returned"
        lede="Choose whatever works best for you. Card, PayPal, Patreon, crypto, or supplies in kind — it all reaches the community directly."
      />

      {/* Monetary methods */}
      <Section tone="cream">
        <SectionHeading
          eyebrow="Give money"
          title="Pick a method"
          lede="One-time or recurring — whatever suits you."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {visibleLinks.map((m, i) => (
            <Reveal key={m.key} delay={i * 70}>
              <DonateLinkCard
                methodKey={m.key}
                title={m.title}
                blurb={m.blurb}
                cta={m.cta}
                url={config.links[m.key].url}
                enabled={config.links[m.key].enabled}
              />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Crypto */}
      {visibleCrypto.length > 0 && (
        <Section tone="sand">
          <SectionHeading
            eyebrow="Give crypto"
            title="Donate with cryptocurrency"
            lede={cryptoIntro}
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {visibleCrypto.map((c, i) => (
              <Reveal key={c.symbol} delay={i * 70}>
                <DonateCryptoCard
                  symbol={c.symbol}
                  label={c.label}
                  network={c.network}
                  address={c.address}
                  qr={c.qr}
                  enabled={c.enabled}
                />
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {/* In-kind */}
      <Section tone="cream">
        <div className="grid gap-10 lg:grid-cols-[2fr_3fr] lg:gap-16">
          <SectionHeading
            eyebrow="Give in kind"
            title="Donate supplies"
            lede={inKind.note}
          />
          <div>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {inKind.items.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 rounded-[14px] border border-line bg-cream px-4 py-3"
                >
                  <Package
                    className="h-5 w-5 shrink-0 text-clay-600"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                  <span className="text-forest-700">{item}</span>
                </li>
              ))}
            </ul>
            <Button href="/contact" variant="outline" className="mt-6">
              Coordinate a donation
            </Button>
          </div>
        </div>
      </Section>

      {/* Western Union — only when configured */}
      {config.westernUnion.enabled && (
        <Section tone="sand">
          <div className="mx-auto max-w-2xl rounded-[20px] border border-line bg-cream p-8 text-center">
            <Send
              className="mx-auto h-8 w-8 text-clay-600"
              strokeWidth={1.5}
              aria-hidden
            />
            <h2 className="text-h3 mt-4">Western Union</h2>
            <p className="mt-3 text-stone">{westernUnionIntro}</p>
            <dl className="mt-6 inline-block text-left text-sm">
              <div className="flex gap-2">
                <dt className="font-semibold text-forest-700">Recipient:</dt>
                <dd className="text-ink">{config.westernUnion.name}</dd>
              </div>
              <div className="mt-1 flex gap-2">
                <dt className="font-semibold text-forest-700">Location:</dt>
                <dd className="text-ink">{config.westernUnion.location}</dd>
              </div>
            </dl>
            <div className="mt-6">
              <Button href="/contact" variant="primary">
                Contact us first
              </Button>
            </div>
          </div>
        </Section>
      )}

      {/* How funds are used → transparency */}
      <Section tone="cream">
        <div className="mx-auto max-w-2xl rounded-[20px] bg-sand p-8 text-center">
          <h2 className="text-h3">Where does it go?</h2>
          <p className="mt-3 text-stone">
            Support reaches the community directly — medical care, food,
            education, and the infrastructure that keeps the village
            self-reliant.
          </p>
          <Link
            href="/transparency"
            className="mt-4 inline-block font-medium text-clay-700 underline decoration-clay-300 underline-offset-4 hover:decoration-clay-600"
          >
            See how we operate
          </Link>
        </div>
      </Section>

      {/* FAQ */}
      <Section tone="sand">
        <SectionHeading eyebrow="Good to know" title="Questions about giving" />
        <div className="mt-10 max-w-3xl">
          <FAQ items={giveFaqs} />
        </div>
      </Section>
    </>
  );
}
