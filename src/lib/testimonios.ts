// Tipo y helpers "client-safe" (sin fs) para testimonios de Google Maps.
// La carga real del contenido vive en testimonios-content.ts (server-only,
// usa fs) — mismo patrón que src/lib/properties.ts / properties-content.ts.

export type Testimonio = {
  id: string; // = nombre del archivo sin extensión (slug)
  nombre: string; // nombre del autor tal como aparece públicamente en Google
  calificacion: number; // 1 a 5
  texto: string;
  link: string; // "Ver en Google Maps →" a la ficha real de la reseña
};

/** Redondea una cantidad de reseñas hacia abajo al escalón de a 100 (ver
 * brand.googleReviews.totalResenas): "+500" en vez de "+537", para no
 * tener que tocar el valor mostrado con cada reseña nueva. */
export function cantidadResenasRedondeada(totalResenas: number): number {
  return Math.floor(totalResenas / 100) * 100;
}
