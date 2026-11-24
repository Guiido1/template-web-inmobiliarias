// Tipo y helpers "client-safe" (sin fs): puede importarse tanto desde
// componentes de servidor como de cliente. La carga real del contenido
// (que sí usa fs) vive en src/lib/properties-content.ts — nunca mezclar
// ambas cosas en el mismo archivo o se rompe el bundle del navegador.
// Sin imports a propósito: así lo pueden importar los tests de tests/.

export const TIPOS = ["Casa", "Departamento", "PH", "Country", "Terreno", "Local", "Oficina"] as const;
export const OPERACIONES = ["Venta", "Alquiler"] as const;
export const MONEDAS = ["USD", "ARS"] as const;
export const ESTADOS = ["Disponible", "Reservada", "Vendida", "Alquilada"] as const;

export type Property = {
  id: string; // = nombre del archivo sin extensión (slug)
  titulo: string;
  tipo: (typeof TIPOS)[number];
  operacion: (typeof OPERACIONES)[number];
  estado: (typeof ESTADOS)[number];
  zona: string;
  precio: number; // en `moneda`; si es alquiler, por mes
  moneda: (typeof MONEDAS)[number];
  expensas?: number; // ARS por mes
  ambientes: number;
  dormitorios?: number;
  banos?: number;
  cocheras?: number;
  m2: number; // superficie total
  m2Cubiertos?: number;
  imagen: string;
  destacada?: boolean;
  descripcion?: string;
  imagenes?: string[]; // galería; si no está, se usa solo `imagen`
  caracteristicas?: string[];
  // Texto para el mapa de la ficha (ej. "Nordelta, Tigre, Buenos Aires").
  // Conviene que sea aproximado (barrio), no la dirección exacta.
  ubicacion?: string;
};

/**
 * Completa los valores por defecto de los campos que se sumaron después
 * (operación, moneda, estado), para que los .md viejos o cargados a mano
 * sin esos campos sigan funcionando igual que antes: venta, en USD,
 * disponible.
 */
export function normalizarPropiedad(id: string, data: Record<string, unknown>): Property {
  const p = { id, ...data } as Partial<Property> & { id: string };
  return {
    ...p,
    titulo: p.titulo ?? id,
    tipo: p.tipo ?? "Casa",
    operacion: OPERACIONES.includes(p.operacion as never) ? p.operacion! : "Venta",
    moneda: MONEDAS.includes(p.moneda as never) ? p.moneda! : "USD",
    estado: ESTADOS.includes(p.estado as never) ? p.estado! : "Disponible",
    zona: p.zona ?? "",
    precio: Number(p.precio) || 0,
    ambientes: Number(p.ambientes) || 0,
    m2: Number(p.m2) || 0,
    imagen: p.imagen ?? "/properties/placeholder-1.svg",
  };
}

/** Disponible (o reservada, que todavía se muestra) vs. ya vendida/alquilada. */
export function estaDisponible(p: Property): boolean {
  return p.estado === "Disponible" || p.estado === "Reservada";
}

/** Orden del catálogo: disponibles primero, después destacadas, después por precio. */
export function ordenarPropiedades(propiedades: Property[]): Property[] {
  return [...propiedades].sort((a, b) => {
    const dispo = Number(estaDisponible(b)) - Number(estaDisponible(a));
    if (dispo !== 0) return dispo;
    const dest = Number(Boolean(b.destacada)) - Number(Boolean(a.destacada));
    if (dest !== 0) return dest;
    return b.precio - a.precio;
  });
}

const formatos = {
  USD: new Intl.NumberFormat("es-AR", { style: "currency", currency: "USD", maximumFractionDigits: 0 }),
  ARS: new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }),
};

/** "US$ 650.000", "$ 900.000/mes" — única función de formato de precio del sitio. */
export function formatearMonto(monto: number, moneda: Property["moneda"]): string {
  return formatos[moneda].format(monto);
}

export function formatearPrecio(p: Pick<Property, "precio" | "moneda" | "operacion">): string {
  const monto = formatearMonto(p.precio, p.moneda);
  return p.operacion === "Alquiler" ? `${monto}/mes` : monto;
}

/** "4 amb. · 3 dorm. · 2 baños · 260 m²" (omite lo que no está cargado). */
export function resumenSuperficie(p: Property): string {
  return [
    p.ambientes > 0 && `${p.ambientes} amb.`,
    p.dormitorios && `${p.dormitorios} dorm.`,
    p.banos && `${p.banos} ${p.banos === 1 ? "baño" : "baños"}`,
    p.m2 > 0 && `${p.m2} m²`,
  ]
    .filter(Boolean)
    .join(" · ");
}

export function getZonas(propiedades: Property[]): string[] {
  return Array.from(new Set(propiedades.map((p) => p.zona))).filter(Boolean);
}

export function getTipos(propiedades: Property[]): string[] {
  return Array.from(new Set(propiedades.map((p) => p.tipo)));
}

export function getOperaciones(propiedades: Property[]): string[] {
  return Array.from(new Set(propiedades.map((p) => p.operacion)));
}

/**
 * Tope del slider de precio: redondea el máximo HACIA ARRIBA al próximo
 * múltiplo del paso, para que la posición final del slider siempre
 * incluya a la propiedad más cara (con un paso de 10.000 y un máximo de
 * 655.000, el slider tiene que llegar a 660.000, no quedarse en 650.000).
 */
export function rangoSlider(precios: number[], paso: number): { min: number; max: number } {
  if (precios.length === 0) return { min: 0, max: 0 };
  const min = Math.floor(Math.min(...precios) / paso) * paso;
  const max = Math.ceil(Math.max(...precios) / paso) * paso;
  return { min, max: Math.max(max, min + paso) };
}
