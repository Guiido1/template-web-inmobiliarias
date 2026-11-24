// Config de marca por cliente.
// Para personalizar una copia de este template para un cliente nuevo,
// edita SOLO este archivo (y el logo en /public). No hace falta tocar componentes.

export const brand = {
  nombre: "Inmobiliaria Modelo",
  slogan: "Propiedades premium en zona norte",
  zona: "CABA y GBA zona norte",

  // Colores de marca (se inyectan como CSS variables en layout.tsx)
  colorPrimario: "#0f172a", // slate-900 por defecto, reemplazar por color del cliente
  colorAcento: "#b08968", // dorado/bronce, look "alta gama"

  // Foto de fondo del hero de la home (ruta dentro de /public, ej.
  // "/hero.jpg"). Vacío = fondo liso con el color primario.
  heroImagen: "",

  contacto: {
    whatsapp: "5491100000000", // formato internacional sin "+" ni espacios
    email: "contacto@inmobiliariamodelo.com",
    telefono: "+54 9 11 0000-0000",
    direccion: "Av. Libertador 0000, Buenos Aires",
  },

  // Corredor inmobiliario matriculado responsable. En CABA (Ley 2340) la
  // publicidad inmobiliaria tiene que mostrar nombre y matrícula del
  // corredor; en provincia de Buenos Aires aplica la Ley 10.973 (colegios
  // departamentales). Se muestra siempre en el footer. OBLIGATORIO
  // completarlo antes de entregar (ver QA_CHECKLIST.md).
  matricula: {
    corredor: "Nombre y Apellido del corredor",
    numero: "CUCICBA Mat. N° 0000",
  },

  // URL de agenda externa (Calendly, Cal.com, etc). Dejar vacío si no aplica:
  calendarioUrl: "",

  // Simulador de crédito hipotecario (features.simuladorCreditoHipotecario
  // en plan.ts). Los créditos hipotecarios en Argentina son en pesos
  // ajustados por UVA, aunque la propiedad se publique en dólares: el
  // simulador convierte con el tipo de cambio de referencia y lo aclara.
  simuladorCredito: {
    // Tasa anual (sobre UVA) que se muestra pre-cargada; el visitante la
    // puede editar. Valor orientativo del cliente, no una oferta real.
    tasaAnualPorcentaje: 5,
    // Pesos por dólar de referencia para pasar el precio en USD a pesos.
    // 0 = no se muestra la conversión a pesos (solo la cuota en USD).
    tipoCambioReferencia: 0,
  },

  // Vacío = no se muestra el link en el footer.
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
    // cantidadResenasRedondeada en src/lib/testimonios.ts), así que solo
    // hace falta actualizarla cuando cruza el próximo escalón de 100.
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
