import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { getAllProperties } from "@/lib/properties-content";
import { siteUrl } from "@/lib/site";

// Sitemap generado automáticamente en cada build a partir de las rutas
// fijas del sitio y del contenido real del blog — no hay que mantenerlo
// a mano ni avisarle a Google cada vez que se agrega un post o una
// propiedad nueva.
export default function sitemap(): MetadataRoute.Sitemap {
  const rutasFijas: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/propiedades`, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/blog`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${siteUrl}/contacto`, changeFrequency: "monthly", priority: 0.5 },
  ];

  const posts = getAllPosts().map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.fecha,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  const fichasDePropiedad = getAllProperties().map((p) => ({
    url: `${siteUrl}/propiedades/${p.id}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...rutasFijas, ...posts, ...fichasDePropiedad];
}
