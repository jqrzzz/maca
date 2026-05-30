"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { config } from "@/lib/config";

/**
 * Newsletter capture with NO backend:
 *  - If a provider form-action URL is configured, POST to it.
 *  - Otherwise fall back to opening a mailto: subscribe request.
 */
export function NewsletterForm({ className }: { className?: string }) {
  const action = config.contact.newsletterAction;
  const [email, setEmail] = useState("");

  const sharedInput =
    "h-12 w-full rounded-[14px] border border-line bg-cream px-4 text-ink placeholder:text-stone/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400";

  if (action) {
    return (
      <form
        action={action}
        method="post"
        target="_blank"
        className={cn("flex flex-col gap-3 sm:flex-row", className)}
      >
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          name="email"
          required
          placeholder="you@email.com"
          className={sharedInput}
        />
        <button
          type="submit"
          className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-[14px] bg-clay-600 px-6 font-medium text-cream shadow-soft transition-colors hover:bg-clay-700"
        >
          Subscribe
          <ArrowRight className="h-4 w-4" aria-hidden />
        </button>
      </form>
    );
  }

  // Fallback: compose a subscribe email.
  const mailto = `mailto:${config.contact.email}?subject=${encodeURIComponent(
    "Subscribe to MACA field notes",
  )}&body=${encodeURIComponent(
    "Please add me to your updates. My email: " + (email || "(type your email here)"),
  )}`;

  return (
    <div className={cn("flex flex-col gap-3 sm:flex-row", className)}>
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        className={sharedInput}
      />
      <a
        href={mailto}
        className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-[14px] bg-clay-600 px-6 font-medium text-cream shadow-soft transition-colors hover:bg-clay-700"
      >
        Subscribe
        <ArrowRight className="h-4 w-4" aria-hidden />
      </a>
    </div>
  );
}
