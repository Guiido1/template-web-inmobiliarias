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

  redes: {
    instagram: "",
    facebook: "",
  },

  seo: {
    tituloDefault: "Inmobiliaria Modelo — Propiedades premium en zona norte",
    descripcionDefault:
      "Encontrá tu próxima propiedad premium en CABA y GBA zona norte. Casas, departamentos y countries seleccionados.",
  },
};

export type Brand = typeof brand;
