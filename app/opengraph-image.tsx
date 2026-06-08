import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Branded social-share card, generated at build time.
 * Uses system fonts + simple boxes only (Satori is strict about flex/SVG),
 * so it has no external dependencies and renders reliably.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #1F3D2B 0%, #112417 100%)",
          padding: "80px",
          color: "#FFFDF8",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Mark + wordmark */}
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* Tetrahedron mark — a single bold facet (Satori-safe CSS triangle,
              no SVG); the full three-tone mark lives in the header + favicon. */}
          <div
            style={{
              display: "flex",
              width: 0,
              height: 0,
              borderLeft: "34px solid transparent",
              borderRight: "34px solid transparent",
              borderBottom: "60px solid #E78B2E",
              marginRight: 28,
            }}
          />
          <span style={{ fontSize: 44, fontWeight: 600, letterSpacing: -1 }}>
            {site.shortName}
          </span>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 64,
              fontWeight: 600,
              lineHeight: 1.1,
              maxWidth: 920,
            }}
          >
            {site.tagline}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              marginTop: 24,
              color: "#E6A24A",
              fontFamily: "Arial, sans-serif",
            }}
          >
            {site.location.region}, {site.location.country}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
