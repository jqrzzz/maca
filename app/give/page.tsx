import type { Metadata } from "next";
import Link from "next/link";
import { Package, Send, Landmark, ShieldCheck, ExternalLink } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { FAQ } from "@/components/FAQ";
import {
  DonateLinkCard,
  DonateCryptoCard,
  DonateContactCard,
} from "@/components/DonateOptionCard";
import { buildMetadata } from "@/lib/metadata";
import { config, methodVisible } from "@/lib/config";
import { qrSvg as makeQrSvg } from "@/lib/qr";
import {
  monetaryCopy,
  cryptoIntro,
  cryptoProcessorIntro,
  inKind,
  westernUnionIntro,
  bankTransferIntro,
} from "@/content/donations";
import { giveFaqs } from "@/content/faqs";

export const metadata: Metadata = buildMetadata({
  title: "Ways to Give",
  description:
    "Give to PRASM by card, PayPal, Patreon, or crypto. Or donate supplies in kind. Every gift, in any form, restores care and dignity.",
  path: "/give",
});

export default async function GivePage() {
  const visibleLinks = monetaryCopy.filter((m) =>
    methodVisible(config.links[m.key].enabled),
  );
  const visibleCrypto = await Promise.all(
    config.crypto
      .filter((c) => methodVisible(c.enabled))
      .map(async (c) => ({
        ...c,
        qrSvg:
          c.enabled && c.address ? await makeQrSvg(c.address) : undefined,
      })),
  );

  return (
    <>
      <PageHero
        eyebrow="Ways to give"
        title="Every gift, in any form, is dignity returned"
        lede="Choose whatever works best for you. Card, PayPal, Patreon, crypto, or supplies in kind: it all reaches the community directly."
      />

      {/* Monetary methods */}
      <Section tone="cream">
        <SectionHeading
          eyebrow="Give money"
          title="Pick a method"
          lede="One-time or recurring, whatever suits you."
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
      {(visibleCrypto.length > 0 ||
        methodVisible(config.cryptoProcessor.enabled)) && (
        <Section tone="sand">
          <SectionHeading
            eyebrow="Give crypto"
            title="Donate with cryptocurrency"
            lede={cryptoIntro}
          />

          {/* Recommended: hosted processor (auto-convert + receipt) */}
          {methodVisible(config.cryptoProcessor.enabled) && (
            <div className="mt-10 flex flex-col items-start gap-5 rounded-[20px] border border-line bg-cream p-6 shadow-soft sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-clay-50 text-clay-600">
                  <ShieldCheck
                    className="h-6 w-6"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                </span>
                <div>
                  <h3 className="text-h3">Easiest: hosted crypto checkout</h3>
                  <p className="mt-1 text-stone">{cryptoProcessorIntro}</p>
                </div>
              </div>
              {config.cryptoProcessor.enabled ? (
                <Button
                  href={config.cryptoProcessor.url}
                  external
                  variant="primary"
                  className="shrink-0"
                >
                  Give via {config.cryptoProcessor.name}
                  <ExternalLink className="h-4 w-4" aria-hidden />
                </Button>
              ) : (
                <p className="shrink-0 text-sm text-stone italic">
                  Add a processor URL to enable.
                </p>
              )}
            </div>
          )}

          {visibleCrypto.length > 0 && (
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {visibleCrypto.map((c, i) => (
                <Reveal key={c.symbol} delay={i * 70}>
                  <DonateCryptoCard
                    symbol={c.symbol}
                    label={c.label}
                    network={c.network}
                    address={c.address}
                    qrSvg={c.qrSvg}
                    enabled={c.enabled}
                  />
                </Reveal>
              ))}
            </div>
          )}
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

      {/* Bank transfer & Western Union — contact-first, only when configured */}
      {(config.bankTransfer.enabled || config.westernUnion.enabled) && (
        <Section tone="sand">
          <SectionHeading
            eyebrow="Send money directly"
            title="Bank transfer and Western Union"
            lede="For larger or international gifts. Contact us first and we'll share current details securely."
          />
          <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-2">
            {config.bankTransfer.enabled && (
              <DonateContactCard
                icon={Landmark}
                title="Bank transfer / wire"
                blurb={bankTransferIntro}
              />
            )}
            {config.westernUnion.enabled && (
              <DonateContactCard
                icon={Send}
                title="Western Union"
                blurb={westernUnionIntro}
                details={[
                  { label: "Recipient", value: config.westernUnion.name },
                  { label: "Location", value: config.westernUnion.location },
                ]}
              />
            )}
          </div>
        </Section>
      )}

      {/* How funds are used → transparency */}
      <Section tone="cream">
        <div className="mx-auto max-w-2xl rounded-[20px] bg-sand p-8 text-center">
          <h2 className="text-h3">Where does it go?</h2>
          <p className="mt-3 text-stone">
            Support reaches the community directly: medical care, food,
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
