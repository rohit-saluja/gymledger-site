import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  outputFileTracingRoot: path.join(__dirname),
  // Build fully static HTML into `out/` for Cloudflare Workers static assets.
  output: "export",
  // Static hosting has no image optimizer, so the images in `public/` are
  // pre-sized WebP files (screenshots at 640px wide, the icon at 128px).
  images: {
    unoptimized: true,
  },
  experimental: {
    inlineCss: true,
  },
};

export default nextConfig;
