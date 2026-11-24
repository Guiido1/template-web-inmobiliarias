import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Testimonio } from "./testimonios";

// Carga real de los testimonios (usa fs — SOLO se importa desde server
// components, nunca desde un componente "use client"). Fuente de verdad:
// un archivo .md (solo frontmatter, sin cuerpo) por reseña en
// src/content/testimonios/ — administrado desde /admin (colección
// "testimonios" en public/admin/config.yml), mismo patrón que propiedades.

const CONTENT_DIR = path.join(process.cwd(), "src/content/testimonios");

export function getAllTestimonios(): Testimonio[] {
  const archivos = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md"));

  return archivos.map((archivo) => {
    const id = archivo.replace(/\.md$/, "");
    const fuente = fs.readFileSync(path.join(CONTENT_DIR, archivo), "utf8");
    const { data } = matter(fuente);
    return { id, ...data } as Testimonio;
  });
}
