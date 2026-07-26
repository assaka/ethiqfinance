import type { NextConfig } from "next";

/**
 * The site is exported as static HTML so it can be hosted anywhere,
 * including GitHub Pages. When building for a project page
 * (https://<user>.github.io/<repo>) assets live under /<repo>, so the
 * CI workflow sets NEXT_PUBLIC_BASE_PATH accordingly.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
};

export default nextConfig;
