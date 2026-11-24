// Config de marca por cliente.
// Para personalizar una copia de este template para un cliente nuevo,
// edita SOLO este archivo (y el logo en /public). No hace falta tocar componentes.

export const brand = {
  nombre: "Inmobiliaria Modelo",
  slogan: "Propiedades premium en zona norte",
  zona: "CABA y GBA zona norte",

  // Colores de marca (se usan en tailwind.config vía CSS variables, ver globals.css)
  colorPrimario: "#0f172a", // slate-900 por defecto, reemplazar por color del cliente
  colorAcento: "#b08968", // dorado/bronce, look "alta gama"

  contacto: {
    whatsapp: "5491100000000", // formato internacional sin "+" ni espacios
    email: "contacto@inmobiliariamodelo.com",
    telefono: "+54 9 11 0000-0000",
    direccion: "Av. Libertador 0000, Buenos Aires",
  },

  // URL de agenda externa (Calendly, Cal.com, etc). Dejar vacío si no aplica:
  calendarioUrl: "",

  // Simulador de crédito hipotecario (features.simuladorCreditoHipotecario
  // en plan.ts): tasa anual fija que se muestra pre-cargada en el
  // simulador, pero el visitante puede editarla. Es un valor orientativo
  // del cliente (ej. acuerdo con un banco), no una tasa real de mercado —
  // el simulador siempre aclara que es una estimación.
  simuladorCredito: {
    tasaAnualPorcentaje: 8,
  },

  redes: {
    instagram: "",
    facebook: "",
  },

  // Testimonios de Google Maps (features.testimoniosGoogleMaps en
  // plan.ts), diseño de costo cero: NO usa la API de Google Places, es
  // solo el valor único de calificación general que se muestra en el
  // sitio ("4,9 ★ / +500 reseñas en Google"). Las reseñas puntuales viven
  // en src/content/testimonios/*.md (editable desde /admin).
  googleReviews: {
    calificacion: 4.9,
    // Cantidad REAL de reseñas en Google a la fecha. En el sitio se
    // muestra redondeada hacia abajo al escalón de a 100 (ver
    // src/lib/testimonios.ts → cantidadReseñasRedondeada) para no tener
    // que editar este número cada vez que entra una reseña nueva — solo
    // hace falta actualizarlo cuando cruza el próximo escalón de 100
    // (ver cantidadResenasRedondeada en src/lib/testimonios.ts).
    totalResenas: 537,
    perfilUrl: "https://www.google.com/maps",
  },

  seo: {
    tituloDefault: "Inmobiliaria Modelo — Propiedades premium en zona norte",
    descripcionDefault:
      "Encontrá tu próxima propiedad premium en CABA y GBA zona norte. Casas, departamentos y countries seleccionados.",
  },

  // Analítica para el reporte mensual al cliente (ver REPORTING_TEMPLATE.md).
  // Dejar vacío = no se carga ningún script de analítica.
  analytics: {
    gaMeasurementId: "", // ej: "G-XXXXXXXXXX" (Google Analytics 4, gratis)
  },
};

export type Brand = typeof brand;
