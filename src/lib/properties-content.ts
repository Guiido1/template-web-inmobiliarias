import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { normalizarPropiedad, ordenarPropiedades, type Property } from "./properties";

// Carga real del catálogo (usa fs — SOLO se importa desde server
// components/route handlers, nunca desde un componente "use client").
// Fuente de verdad: un archivo .md (solo frontmatter, sin cuerpo) por
// propiedad en src/content/properties/. Esta carpeta es la que administra
// el CMS headless (ver /admin) — cargar o sacar una propiedad es crear o
// borrar un archivo acá, nunca tocar componentes ni este archivo.

const CONTENT_DIR = path.join(process.cwd(), "src/content/properties");

export function getAllProperties(): Property[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const propiedades = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((archivo) => {
      const id = archivo.replace(/\.md$/, "");
      const fuente = fs.readFileSync(path.join(CONTENT_DIR, archivo), "utf8");
      return normalizarPropiedad(id, matter(fuente).data);
    });

  return ordenarPropiedades(propiedades);
}

export function getPropertyById(id: string): Property | undefined {
  return getAllProperties().find((p) => p.id === id);
}
