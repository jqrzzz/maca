"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

/**
 * "Install app" affordance. Appears only when the browser reports the app is
 * installable (the beforeinstallprompt event), and hides once installed or
 * dismissed. Bottom-left, to clear the Team-login button on the right.
 */
export function InstallButton() {
  const [deferred, setDeferred] = useState<InstallPromptEvent | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as InstallPromptEvent);
    };
    const onInstalled = () => {
      setDeferred(null);
      setDone(true);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (!deferred || done) return null;

  return (
    <button
      type="button"
      onClick={async () => {
        await deferred.prompt();
        await deferred.userChoice.catch(() => undefined);
        setDeferred(null);
      }}
      className="fixed bottom-4 left-4 z-40 inline-flex items-center gap-2 rounded-full border border-line bg-cream/95 px-4 py-2.5 text-sm font-medium text-forest-700 shadow-lift backdrop-blur transition-colors hover:bg-sand"
    >
      <Download className="h-4 w-4 text-clay-600" aria-hidden />
      Install app
    </button>
  );
}
