// Config de plan por cliente — qué funcionalidades están activas.
//
// Regla del template: el código de cada funcionalidad se construye UNA SOLA
// VEZ acá en el template y nunca se reescribe por cliente. Lo único que
// cambia de un cliente a otro es el VALOR de estos flags (y el contenido:
// catálogo, branding, env vars — ver src/config/brand.ts).
// Ver README.md → "Qué es del template y qué es por cliente" para el detalle.
//
// Cada flag de acá está conectado a código real: apagarlo saca la
// funcionalidad del sitio. Las features todavía no construidas (alertas,
// video/tour, inglés) se listan en README.md → "Pendiente de
// implementación" y se agregan acá recién cuando exista su componente.

export const plan = {
  // Sin mensualidad: "basico" (botones predefinidos, sin IA, costo $0).
  // Con mensualidad: "inteligente" (Claude Haiku 5.5, catálogo completo
  // como contexto). /api/chat solo responde si está en "inteligente".
  chatbotTier: "basico" as "basico" | "inteligente",

  features: {
    comparadorPropiedades: true,
    favoritos: true,
    simuladorCreditoHipotecario: true,
    testimoniosGoogleMaps: true,
    whatsappFlotante: true,
  },
};

export type Plan = typeof plan;
