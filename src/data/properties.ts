// Datos de ejemplo. En producción esto se reemplaza por lectura desde el
// CMS headless (colección Git-based, ver /admin) o una fuente de datos propia.

export type Property = {
  id: string;
  titulo: string;
  tipo: "Casa" | "Departamento" | "Country" | "Terreno";
  zona: string;
  precio: number; // USD
  ambientes: number;
  m2: number;
  imagen: string;
  destacada?: boolean;
  // Opcionales: si no están, la página de detalle muestra solo lo básico.
  descripcion?: string;
  imagenes?: string[]; // galería; si no está, se usa solo `imagen`
  caracteristicas?: string[];
};

export const properties: Property[] = [
  {
    id: "1",
    titulo: "Casa en Nordelta, laguna Los Lagos",
    tipo: "Casa",
    zona: "Nordelta",
    precio: 650000,
    ambientes: 5,
    m2: 320,
    imagen: "/properties/placeholder-1.svg",
    destacada: true,
    descripcion:
      "Casa de categoría sobre la laguna Los Lagos, con muelle propio y vista abierta al agua. Living comedor integrado con doble altura, cocina equipada y suite principal con vestidor.",
    caracteristicas: [
      "Muelle propio",
      "Pileta climatizada",
      "Quincho con parrilla",
      "Seguridad 24hs del country",
    ],
  },
  {
    id: "2",
    titulo: "Departamento premium en Puerto Madero",
    tipo: "Departamento",
    zona: "Puerto Madero",
    precio: 480000,
    ambientes: 3,
    m2: 140,
    imagen: "/properties/placeholder-2.svg",
    destacada: true,
    descripcion:
      "Departamento a estrenar con vista al río, en uno de los edificios más buscados de Puerto Madero. Amenities de categoría y cochera incluida.",
    caracteristicas: [
      "Vista al río",
      "Cochera incluida",
      "Gimnasio y spa en el edificio",
      "Seguridad las 24hs",
    ],
  },
  {
    id: "3",
    titulo: "Lote en country San Isidro Labrador",
    tipo: "Terreno",
    zona: "Pilar",
    precio: 220000,
    ambientes: 0,
    m2: 1200,
    imagen: "/properties/placeholder-3.svg",
    descripcion:
      "Lote en esquina, listo para construir, dentro de uno de los countries más consolidados de zona Pilar.",
    caracteristicas: ["Lote en esquina", "Apto para construir", "Country cerrado"],
  },
  {
    id: "4",
    titulo: "Casa a estrenar en Vicente López",
    tipo: "Casa",
    zona: "Vicente López",
    precio: 395000,
    ambientes: 4,
    m2: 260,
    imagen: "/properties/placeholder-1.svg",
    descripcion:
      "Casa a estrenar a metros de la costa, con diseño moderno y terminaciones de alta gama en toda su superficie.",
    caracteristicas: ["A estrenar", "Jardín propio", "Cochera para 2 autos"],
  },
];

export const zonas = Array.from(new Set(properties.map((p) => p.zona)));
export const tipos = Array.from(new Set(properties.map((p) => p.tipo)));
