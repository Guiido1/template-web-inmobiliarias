import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /landing-ads NO va acá a propósito: tiene <meta robots noindex>, y
      // si se bloquea el rastreo Google no llega a leer ese noindex.
      disallow: "/admin",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
