import Link from "next/link";
import { Lock } from "lucide-react";
import { config } from "@/lib/config";

/**
 * Floating entry point to the internal-system preview (/preview). It's a demo,
 * not real auth, so the team can get a feel for the future console. Hidden when
 * NEXT_PUBLIC_INTERNAL_PREVIEW=false.
 */
export function TeamLoginButton() {
  if (!config.internalPreview) return null;
  return (
    <Link
      href="/preview"
      aria-label="Team login (preview)"
      className="fixed right-4 bottom-4 z-40 inline-flex items-center gap-2 rounded-full border border-line bg-cream/95 px-4 py-2.5 text-sm font-medium text-forest-700 shadow-lift backdrop-blur transition-colors hover:bg-sand"
    >
      <Lock className="h-4 w-4 text-clay-600" aria-hidden />
      Team login
      <span className="ml-0.5 rounded-full bg-clay-50 px-2 py-0.5 text-[0.625rem] font-semibold tracking-wide text-clay-700 uppercase">
        Preview
      </span>
    </Link>
  );
}
