import Image from "next/image";
import { ExternalLink, Heart, CreditCard, Wallet } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { CopyButton } from "@/components/CopyButton";
import { cn } from "@/lib/cn";

const linkIcons = {
  patreon: Heart,
  stripe: CreditCard,
  paypal: Wallet,
} as const;

/**
 * A link-based donation method (Patreon / Stripe / PayPal).
 * When not configured, renders a labeled placeholder (dev only — callers
 * gate visibility via config.methodVisible).
 */
export function DonateLinkCard({
  methodKey,
  title,
  blurb,
  cta,
  url,
  enabled,
}: {
  methodKey: "patreon" | "stripe" | "paypal";
  title: string;
  blurb: string;
  cta: string;
  url: string;
  enabled: boolean;
}) {
  const Icon = linkIcons[methodKey];
  return (
    <div className="flex h-full flex-col rounded-[20px] border border-line bg-cream p-6 shadow-soft">
      <div className="flex items-center justify-between">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-[14px] bg-clay-50 text-clay-600">
          <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
        </span>
        {!enabled && <Badge tone="neutral">Not yet configured</Badge>}
      </div>
      <h3 className="mt-5 text-h3">{title}</h3>
      <p className="mt-2 flex-1 text-stone">{blurb}</p>
      {enabled ? (
        <Button
          href={url}
          external
          variant="primary"
          className="mt-6 self-start"
        >
          {cta}
          <ExternalLink className="h-4 w-4" aria-hidden />
        </Button>
      ) : (
        <p className="mt-6 text-sm text-stone italic">
          Add this link in the site configuration to enable.
        </p>
      )}
    </div>
  );
}

/**
 * A crypto donation card with address, copy button, network label, and a
 * static QR image (rendered when the file exists).
 */
export function DonateCryptoCard({
  symbol,
  label,
  network,
  address,
  qr,
  enabled,
}: {
  symbol: string;
  label: string;
  network?: string;
  address: string;
  qr: string;
  enabled: boolean;
}) {
  return (
    <div className="flex h-full flex-col rounded-[20px] border border-line bg-cream p-6 shadow-soft">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h3 className="text-h3">
            {label}{" "}
            <span className="font-sans text-base font-medium text-stone">
              {symbol}
            </span>
          </h3>
          {network && (
            <Badge tone="gold" className="mt-1">
              {network} network
            </Badge>
          )}
        </div>
        {!enabled && <Badge tone="neutral">Not configured</Badge>}
      </div>

      {enabled ? (
        <>
          {/* Static QR if provided */}
          <div className="mt-5 flex items-center gap-4">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-[14px] border border-line bg-sand">
              {/* Falls back gracefully if the QR image isn't present yet. */}
              <Image
                src={qr}
                alt={`${label} wallet QR code`}
                fill
                className="object-contain p-1.5"
                sizes="96px"
              />
            </div>
            <p className="text-sm text-stone">
              Scan, or copy the address. Always verify it before sending.
              Transfers are irreversible.
            </p>
          </div>
          <div className="mt-4 flex items-center justify-between gap-2 rounded-[14px] bg-sand px-3 py-2.5">
            <code className="truncate font-mono text-sm text-forest-700">
              {address}
            </code>
            <CopyButton value={address} className="shrink-0" />
          </div>
        </>
      ) : (
        <p className={cn("mt-5 text-sm text-stone italic")}>
          Add a {symbol} address in the site configuration to enable.
        </p>
      )}
    </div>
  );
}
