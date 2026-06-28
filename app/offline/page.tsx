import type { Metadata } from "next";
import Link from "next/link";
import { WifiOff } from "lucide-react";

export const metadata: Metadata = {
  title: "Offline",
  robots: { index: false, follow: false },
};

export default function OfflinePage() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-6 py-16 text-center">
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-[16px] bg-clay-50 text-clay-600">
        <WifiOff className="h-7 w-7" strokeWidth={1.75} aria-hidden />
      </span>
      <h1 className="mt-6 font-display text-3xl font-semibold text-forest-700">
        You are offline
      </h1>
      <p className="mt-3 leading-relaxed text-stone">
        This page is not available without a connection. Anything you captured in
        the field is saved on your device and will sync once you are back online.
      </p>
      <Link
        href="/"
        className="mt-7 inline-flex h-12 items-center justify-center rounded-[14px] bg-clay-600 px-6 font-medium text-cream shadow-soft transition-colors hover:bg-clay-700"
      >
        Try the home page
      </Link>
    </section>
  );
}
