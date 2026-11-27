import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

const icon = `data:image/png;base64,${fs
  .readFileSync(path.join(process.cwd(), "public/images/app-icon.png"))
  .toString("base64")}`;

// Share cards in the site's world: a gym whiteboard with a faint grid, an
// aluminium frame, the title in black and a red marker underline.
export function ogImage({ eyebrow, title }: { eyebrow: string; title: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: 18,
          background: "linear-gradient(180deg, #dfe3e6 0%, #b9bfc4 30%, #cfd4d8 60%, #aeb4b9 100%)",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "56px 64px",
            borderRadius: 10,
            backgroundColor: "#f3f4f1",
            backgroundImage:
              "linear-gradient(#e2e5e1 2px, transparent 2px), linear-gradient(90deg, #e2e5e1 2px, transparent 2px)",
            backgroundSize: "48px 48px",
            color: "#17181b",
            fontFamily: "sans-serif",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={icon} width={64} height={64} style={{ borderRadius: 16 }} alt="" />
            <span style={{ fontSize: 34, fontWeight: 800 }}>GymLedger</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 28, color: "#2453c2", marginBottom: 14 }}>{eyebrow}</span>
            <span style={{ fontSize: title.length > 60 ? 58 : 70, fontWeight: 800, lineHeight: 1.04, letterSpacing: -2 }}>{title}</span>
            <div style={{ display: "flex", marginTop: 22, width: 260, height: 10, borderRadius: 6, background: "#d94040" }} />
          </div>
          <span style={{ fontSize: 24, color: "#4a4e54" }}>Workout tracker for iPhone · getgymledger.com</span>
        </div>
      </div>
    ),
    OG_SIZE
  );
}
