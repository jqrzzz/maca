import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Branded social-share card (1200×630), generated at build time and served as
 * og:image / twitter:image for every route. Kept dependency-free (next/og's
 * built-in font, inline SVG mark) so it renders reliably and the logo shows up
 * across WhatsApp, iMessage, Slack, X, LinkedIn, Facebook, etc.
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
          background: "linear-gradient(135deg, #1F3D2B 0%, #0E2014 100%)",
          padding: 84,
          color: "#FFFDF8",
        }}
      >
        {/* Mark + wordmark */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <svg
            width="88"
            height="88"
            viewBox="0 0 40 40"
            style={{ marginRight: 26 }}
          >
            <polygon points="20,6 6,34 34,34" fill="#E78B2E" />
            <polygon points="20,6 6,34 20,24.67" fill="#F2A85A" />
            <polygon points="6,34 34,34 20,24.67" fill="#C46A1C" />
          </svg>
          <span style={{ fontSize: 48, fontWeight: 700, letterSpacing: 2 }}>
            {site.shortName}
          </span>
        </div>

        {/* Headline + place */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 62,
              fontWeight: 600,
              lineHeight: 1.12,
              maxWidth: 960,
            }}
          >
            {site.tagline}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: 30,
              fontSize: 26,
              color: "#E6A24A",
              letterSpacing: 1,
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
