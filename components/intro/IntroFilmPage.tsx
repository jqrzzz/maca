"use client";

import { useRouter } from "next/navigation";
import { FilmOverlay } from "@/components/intro/FilmOverlay";

/**
 * Standalone /intro film (shareable URL). Same player as the in-page overlay;
 * closing returns to the homepage rather than leaving you stuck.
 */
export function IntroFilmPage() {
  const router = useRouter();
  return <FilmOverlay onClose={() => router.push("/")} />;
}
