import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Sajten har ingen backend och deployas som statiska filer (Cloudflare Pages).
  output: "export",
  // Cloudflare Pages serverar kataloger; trailingSlash ger /blogg/index.html.
  trailingSlash: true,
  images: {
    // Ingen Image Optimization-server finns i ett statiskt bygge.
    unoptimized: true,
  },
};

export default nextConfig;
