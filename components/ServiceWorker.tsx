"use client";

import { useEffect } from "react";

/**
 * Registers the service worker (production only) so the app is installable and
 * works offline. Dev is skipped to avoid stale-cache surprises while building.
 */
export function ServiceWorker() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;
    const register = () =>
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    window.addEventListener("load", register);
    return () => window.removeEventListener("load", register);
  }, []);
  return null;
}
