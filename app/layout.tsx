import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { APP_STORE_ID, SITE_URL } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "optional",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "GymLedger",
  title: {
    default: "GymLedger: Workout Tracker & Gym Log App for iPhone",
    template: "%s · GymLedger",
  },
  description:
    "GymLedger is a fast, private workout tracker for iPhone. Build custom splits, log sets in a tap, and track progressive overload with charts for every lift.",
  icons: {
    icon: "/images/favicon.png",
    apple: "/images/app-icon.png",
  },
  itunes: { appId: APP_STORE_ID },
  robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  openGraph: {
    title: "GymLedger: Workout Tracker & Gym Log App for iPhone",
    description:
      "A fast, private workout tracker for iPhone. Build custom splits, log sets in a tap, and track progressive overload with charts for every lift.",
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
  colorScheme: "dark",
  themeColor: "#0a0a0a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${inter.variable}`}>
      <body className="min-h-screen bg-background font-sans text-foreground">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-surface focus:px-3 focus:py-2 focus:text-sm focus:text-foreground focus:ring-2 focus:ring-ring"
        >
          Skip to content
        </a>
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
