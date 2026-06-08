/**
 * Env-backed runtime config. The site-wide Donate button always routes here
 * (the /give hub) rather than to any single processor, so one page controls
 * every method. Unconfigured methods are hidden in production but shown as
 * labeled placeholders in development so the slot is visible while building.
 */

export const PRIMARY_DONATE_HREF = "/give";

const isProd = process.env.NODE_ENV === "production";

function env(key: string): string {
  return (process.env[key] ?? "").trim();
}

export type LinkMethod = {
  key: "patreon" | "stripe" | "paypal";
  url: string;
  enabled: boolean;
};

export type CryptoMethod = {
  symbol: string;
  label: string;
  network?: string;
  address: string;
  /** Static QR image path (see public/images/crypto). */
  qr: string;
  enabled: boolean;
};

const patreon = env("NEXT_PUBLIC_PATREON_URL");
const stripe = env("NEXT_PUBLIC_STRIPE_PAYMENT_LINK");
const paypal = env("NEXT_PUBLIC_PAYPAL_ME");

const btc = env("NEXT_PUBLIC_CRYPTO_BTC_ADDRESS");
const eth = env("NEXT_PUBLIC_CRYPTO_ETH_ADDRESS");
const usdt = env("NEXT_PUBLIC_CRYPTO_USDT_ADDRESS");
const usdtNetwork = env("NEXT_PUBLIC_CRYPTO_USDT_NETWORK") || "TRC20";

const wuName = env("NEXT_PUBLIC_WU_RECIPIENT_NAME");
const wuLocation = env("NEXT_PUBLIC_WU_RECIPIENT_LOCATION");

export const config = {
  /** Show placeholder cards for unconfigured methods only outside production. */
  showPlaceholders: !isProd,

  links: {
    patreon: { key: "patreon", url: patreon, enabled: !!patreon },
    stripe: { key: "stripe", url: stripe, enabled: !!stripe },
    paypal: { key: "paypal", url: paypal, enabled: !!paypal },
  } satisfies Record<LinkMethod["key"], LinkMethod>,

  crypto: [
    {
      symbol: "BTC",
      label: "Bitcoin",
      address: btc,
      qr: "/images/crypto/btc.svg",
      enabled: !!btc,
    },
    {
      symbol: "ETH",
      label: "Ethereum",
      address: eth,
      qr: "/images/crypto/eth.svg",
      enabled: !!eth,
    },
    {
      symbol: "USDT",
      label: "Tether",
      network: usdtNetwork,
      address: usdt,
      qr: "/images/crypto/usdt.svg",
      enabled: !!usdt,
    },
  ] satisfies CryptoMethod[],

  westernUnion: {
    name: wuName,
    location: wuLocation,
    enabled: !!(wuName && wuLocation),
  },

  contact: {
    email: env("NEXT_PUBLIC_CONTACT_EMAIL") || "mahkha420@gmail.com",
    formspree: env("NEXT_PUBLIC_FORMSPREE_ENDPOINT"),
    newsletterAction: env("NEXT_PUBLIC_NEWSLETTER_ACTION"),
  },
} as const;

/** Should a method render at all? (Configured, or dev placeholders on.) */
export function methodVisible(enabled: boolean): boolean {
  return enabled || config.showPlaceholders;
}
