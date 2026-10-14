import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

const icon = `data:image/png;base64,${fs
  .readFileSync(path.join(process.cwd(), "public/images/app-icon.png"))
  .toString("base64")}`;

export function ogImage({ eyebrow, title }: { eyebrow: string; title: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "radial-gradient(90% 90% at 0% 0%, rgba(217,64,64,0.28), #0a0a0a 60%)",
          backgroundColor: "#0a0a0a",
          color: "#f5f5f5",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={icon} width={72} height={72} style={{ borderRadius: 18 }} alt="" />
          <span style={{ fontSize: 36, fontWeight: 700 }}>GymLedger</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <span style={{ fontSize: 28, color: "#e05a5a", textTransform: "uppercase", letterSpacing: 4 }}>{eyebrow}</span>
          <span style={{ fontSize: title.length > 60 ? 60 : 72, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>
            {title}
          </span>
        </div>
        <span style={{ fontSize: 26, color: "#a1a1aa" }}>Workout tracker for iPhone · getgymledger.com</span>
      </div>
    ),
    OG_SIZE
  );
}
