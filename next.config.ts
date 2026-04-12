import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cloudflare Pages compatibility:
  // - No "standalone" output (Edge runtime only)
  // - No sharp (native module not supported)
  reactStrictMode: true,
  images: {
    unoptimized: true, // Required: sharp is unavailable on Cloudflare Workers
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
};

export default nextConfig;
