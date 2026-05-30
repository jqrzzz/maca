"use client";

import { useState } from "react";
import { config } from "@/lib/config";
import { cn } from "@/lib/cn";

/**
 * Contact form with NO backend:
 *  - If a Formspree endpoint is configured, POST directly to it.
 *  - Otherwise, compose a mailto: with the message body.
 */
export function ContactForm({ className }: { className?: string }) {
  const endpoint = config.contact.formspree;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const field =
    "w-full rounded-[14px] border border-line bg-cream px-4 py-3 text-ink placeholder:text-stone/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400";
  const labelCls = "mb-1.5 block text-sm font-medium text-forest-700";

  const Fields = (
    <>
      <div>
        <label htmlFor="cf-name" className={labelCls}>
          Name
        </label>
        <input
          id="cf-name"
          name="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={field}
          placeholder="Your name"
        />
      </div>
      <div>
        <label htmlFor="cf-email" className={labelCls}>
          Email
        </label>
        <input
          id="cf-email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={field}
          placeholder="you@email.com"
        />
      </div>
      <div>
        <label htmlFor="cf-message" className={labelCls}>
          Message
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={cn(field, "resize-y")}
          placeholder="How would you like to help, or what would you like to know?"
        />
      </div>
    </>
  );

  const submitCls =
    "inline-flex h-12 items-center justify-center rounded-[14px] bg-clay-600 px-7 font-medium text-cream shadow-soft transition-colors hover:bg-clay-700";

  if (endpoint) {
    return (
      <form
        action={endpoint}
        method="POST"
        className={cn("flex flex-col gap-5", className)}
      >
        {Fields}
        <button type="submit" className={cn(submitCls, "self-start")}>
          Send message
        </button>
      </form>
    );
  }

  // mailto fallback
  const mailto = `mailto:${config.contact.email}?subject=${encodeURIComponent(
    `Message from ${name || "the MACA site"}`,
  )}&body=${encodeURIComponent(`${message}\n\n— ${name} (${email})`)}`;

  return (
    <div className={cn("flex flex-col gap-5", className)}>
      {Fields}
      <a href={mailto} className={cn(submitCls, "self-start")}>
        Send message
      </a>
      <p className="text-sm text-stone">
        This opens your email app. You can also reach us directly at{" "}
        <a
          href={`mailto:${config.contact.email}`}
          className="text-clay-700 underline underline-offset-4"
        >
          {config.contact.email}
        </a>
        .
      </p>
    </div>
  );
}
