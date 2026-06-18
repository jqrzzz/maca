import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/**
 * Web App Manifest — makes PRASM installable as a standalone app with branded
 * icons and (on Android) a branded splash from background_color + the icon.
 * Next auto-links this at /manifest.webmanifest.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: site.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#16301f",
    theme_color: "#16301f",
    categories: ["education", "health", "medical"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
