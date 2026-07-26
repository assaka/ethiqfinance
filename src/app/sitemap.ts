import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

const routes = [
  { path: "", priority: 1 },
  { path: "/products/vehicle-finance", priority: 0.9 },
  { path: "/products/asset-investments", priority: 0.9 },
  { path: "/about", priority: 0.7 },
  { path: "/faq", priority: 0.7 },
  { path: "/contact", priority: 0.6 },
  { path: "/legal/privacy", priority: 0.3 },
  { path: "/legal/terms", priority: 0.3 },
];

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // Static export has no request-time clock we want to depend on, so the
  // build date is fixed at generation time.
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${siteConfig.url}${route.path}/`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: route.priority,
  }));
}
