// Tipo y helpers "client-safe" (sin fs): puede importarse tanto desde
// componentes de servidor como de cliente. La carga real del contenido
// (que sí usa fs) vive en src/lib/properties-content.ts — nunca mezclar
// ambas cosas en el mismo archivo o se rompe el bundle del navegador.

export type Property = {
  id: string; // = nombre del archivo sin extensión (slug)
  titulo: string;
  tipo: "Casa" | "Departamento" | "Country" | "Terreno";
  zona: string;
  precio: number; // USD
  ambientes: number;
  m2: number;
  imagen: string;
  destacada?: boolean;
  descripcion?: string;
  imagenes?: string[]; // galería; si no está, se usa solo `imagen`
  caracteristicas?: string[];
};

export function getZonas(propiedades: Property[]): string[] {
  return Array.from(new Set(propiedades.map((p) => p.zona)));
}

export function getTipos(propiedades: Property[]): string[] {
  return Array.from(new Set(propiedades.map((p) => p.tipo)));
}
