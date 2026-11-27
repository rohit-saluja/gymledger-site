import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed, Kalam } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { APP_STORE_ID, SITE_URL } from "@/lib/site";
import "./globals.css";

// Printed voice: Barlow, drawn from the lettering on road signs and plates.
const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-barlow",
  display: "swap",
});
const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-barlow-condensed",
  display: "swap",
});
// Marker voice: Kalam, a felt-tip hand that stays legible small.
const kalam = Kalam({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-kalam",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "GymLedger",
  title: {
    default: "GymLedger: Workout Tracker, Recovery & Protein for iPhone",
    template: "%s · GymLedger",
  },
  description:
    "GymLedger is a workout tracker for iPhone. Log sets in a tap, see which muscles have recovered, and hit your protein target. Free trial on the App Store.",
  icons: {
    icon: "/images/favicon.png",
    apple: "/images/app-icon.png",
  },
  itunes: { appId: APP_STORE_ID },
  verification: {
    google: "Gb9KsdB3JPk7AwdhvzW7-jA_0uSBAqqa8bRRZfQuheo",
    other: { "msvalidate.01": "313ADEA26EE0F1B6AAE3FEEE956A2960" },
  },
  robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  openGraph: {
    title: "GymLedger: Workout Tracker, Recovery & Protein for iPhone",
    description:
      "Log sets in a tap, see which muscles have recovered, and hit your protein target. One iPhone app for the whole training loop.",
    type: "website",
    url: SITE_URL,
    siteName: "GymLedger",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "light",
  themeColor: "#c3c8cc",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${barlow.variable} ${barlowCondensed.variable} ${kalam.variable}`}>
      <body className="min-h-screen">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-paper focus:px-3 focus:py-2 focus:text-sm focus:text-ink"
        >
          Skip to content
        </a>
        <div className="board-frame">
          <div className="board-surface flex flex-col">
            <SiteHeader />
            <main id="main" className="flex-1">
              {children}
            </main>
            <SiteFooter />
          </div>
        </div>
      </body>
    </html>
  );
}
