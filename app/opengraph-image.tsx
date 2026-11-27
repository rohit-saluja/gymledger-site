import { OG_SIZE, ogImage } from "@/lib/og";

// Generated once at build time; the site is a static export (`output: "export"`).
export const dynamic = "force-static";

export const alt = "GymLedger, the workout tracker for iPhone";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "Workout tracker for iPhone", title: "The workout tracker that knows what to train today." });
}
