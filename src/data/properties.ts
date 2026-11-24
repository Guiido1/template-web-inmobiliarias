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
  },
];

export const zonas = Array.from(new Set(properties.map((p) => p.zona)));
export const tipos = Array.from(new Set(properties.map((p) => p.tipo)));
