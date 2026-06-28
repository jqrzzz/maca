"use client";

import { useEffect, useRef, useState } from "react";
import { X, Copy, Check, Download, Trash2, Languages } from "lucide-react";
import { en, localeLabel, type Locale, type StringKey } from "@/content/i18n";
import { useOverrides, setOverride, clearOverrides } from "./localeStore";

const keys = Object.keys(en) as StringKey[];

/**
 * An in-demo editor to capture translations live, ideally with the steward in
 * the room: pick a language, type the words they give, and the app updates
 * instantly. Captured words persist for the session and export into the
 * translation worksheet. Editing only makes sense for a non-English locale.
 */
export function TranslationHelper({
  open,
  onClose,
  locale,
}: {
  open: boolean;
  onClose: () => void;
  locale: Locale;
}) {
  const overrides = useOverrides();
  const [copied, setCopied] = useState(false);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) firstFieldRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const label = localeLabel(locale);
  const filled = keys.filter((k) => (overrides[locale]?.[k] ?? "").trim());

  const toText = () => {
    const lines = [
      `${label} translations (from a Curiosity Program walkthrough)`,
      "",
    ];
    filled.forEach((k) => {
      lines.push(en[k]);
      lines.push(`  ${label}: ${overrides[locale]![k]}`);
      lines.push("");
    });
    return lines.join("\n");
  };

  const copyAll = async () => {
    try {
      await navigator.clipboard.writeText(toText());
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  const download = () => {
    const blob = new Blob([toText()], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `curiosity-${locale}-translations.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-label={`Help translate to ${label}`}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-ink/30"
      />
      <div className="absolute top-0 right-0 flex h-full w-full max-w-md flex-col bg-cream shadow-lift">
        <div className="flex items-start justify-between gap-3 border-b border-line p-4">
          <div>
            <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-forest-700">
              <Languages className="h-5 w-5 text-clay-600" aria-hidden />
              Help us say it in {label}
            </h2>
            <p className="mt-0.5 text-xs text-stone">
              Type the words your steward gives. They appear in the app right
              away. {filled.length} of {keys.length} done.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-stone transition-colors hover:bg-sand hover:text-clay-700"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {keys.map((k, i) => (
            <label key={k} className="block">
              <span className="text-sm text-forest-700">{en[k]}</span>
              <input
                ref={i === 0 ? firstFieldRef : undefined}
                value={overrides[locale]?.[k] ?? ""}
                onChange={(e) => setOverride(locale, k, e.target.value)}
                placeholder={`In ${label}…`}
                className="mt-1 w-full rounded-[12px] border border-line bg-sand px-3 py-2 text-sm text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400"
              />
            </label>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2 border-t border-line p-4">
          <button
            type="button"
            onClick={copyAll}
            disabled={filled.length === 0}
            className="inline-flex h-9 items-center gap-1.5 rounded-[12px] border border-line px-3 text-sm font-medium text-forest-700 transition-colors hover:bg-sand disabled:opacity-40"
          >
            {copied ? (
              <Check className="h-4 w-4" aria-hidden />
            ) : (
              <Copy className="h-4 w-4" aria-hidden />
            )}
            {copied ? "Copied" : "Copy"}
          </button>
          <button
            type="button"
            onClick={download}
            disabled={filled.length === 0}
            className="inline-flex h-9 items-center gap-1.5 rounded-[12px] border border-line px-3 text-sm font-medium text-forest-700 transition-colors hover:bg-sand disabled:opacity-40"
          >
            <Download className="h-4 w-4" aria-hidden />
            Download
          </button>
          <button
            type="button"
            onClick={() => clearOverrides(locale)}
            disabled={filled.length === 0}
            className="ml-auto inline-flex h-9 items-center gap-1.5 rounded-[12px] px-3 text-sm font-medium text-stone transition-colors hover:bg-sand hover:text-clay-700 disabled:opacity-40"
          >
            <Trash2 className="h-4 w-4" aria-hidden />
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
