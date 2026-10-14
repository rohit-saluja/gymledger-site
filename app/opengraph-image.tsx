import { OG_SIZE, ogImage } from "@/lib/og";

export const alt = "GymLedger — Workout tracker for lifters";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "Workout tracker for iPhone", title: "Log every lift. Own every gain." });
}
