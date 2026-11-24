// Config de plan por cliente — qué funcionalidades están activas.
//
// Regla del template: el código de cada funcionalidad se construye UNA SOLA
// VEZ acá en el template y nunca se reescribe por cliente. Lo único que
// cambia de un cliente a otro es el VALOR de estos flags (y el contenido:
// catálogo, branding, env vars — ver src/config/brand.ts).
// Ver README.md → "Qué es del template y qué es por cliente" para el detalle.

export const plan = {
  // Sin mensualidad: "basico" (botones predefinidos, sin IA, costo $0).
  // Con mensualidad: "inteligente" (Claude Haiku 5.5, catálogo completo como contexto).
  chatbotTier: "basico" as "basico" | "inteligente",

  // true = este cliente paga mensualidad (habilita mantenimiento propagado
  // vía UPGRADING.md + las features exclusivas de abajo).
  mensualidad: false,

  features: {
    // Plan base — siempre activas, sin costo de infraestructura adicional.
    comparadorPropiedades: true,
    favoritos: true,
    simuladorCreditoHipotecario: true,
    testimoniosGoogleMaps: true,
    paginaDetallePropiedad: true,
    whatsappFlotante: true,
    openGraphPropiedades: true,

    // Exclusivas de mensualidad (gancho comercial) — dejar en false hasta
    // que el cliente pague mensualidad, incluso si mensualidad=true arriba
    // (permite prender/apagar una por una si hiciera falta en algún caso puntual).
    alertasPersonalizadas: false,
    videoTour: false,
    versionIngles: false,
  },
};

export type Plan = typeof plan;
