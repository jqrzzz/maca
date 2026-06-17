import QRCode from "qrcode";

/**
 * Render a crypto address (or any string) as an inline SVG QR code.
 *
 * This runs in server components at build time, so the QR is always derived
 * from the configured wallet address and can never drift out of sync with it
 * (a real risk with hand-made QR image files, and irreversible for crypto).
 *
 * Returns SVG markup intended for dangerouslySetInnerHTML. The input is our
 * own configured address, not user input, so there is no injection surface.
 */
export async function qrSvg(data: string): Promise<string> {
  const svg = await QRCode.toString(data, {
    type: "svg",
    margin: 1,
    errorCorrectionLevel: "M",
    // Near-black on white for maximum scanner reliability.
    color: { dark: "#0b1f14", light: "#ffffff" },
  });
  // qrcode emits a viewBox only; make the SVG fill its container box.
  return svg.replace(
    "<svg ",
    '<svg width="100%" height="100%" preserveAspectRatio="xMidYMid meet" ',
  );
}
