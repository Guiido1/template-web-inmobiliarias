# Template — Web para inmobiliarias de alta gama

Template reutilizable (Next.js + Tailwind CSS) para producir sitios a medida
para inmobiliarias premium en CABA/GBA zona norte. Pensado para clonarse
una vez por cliente y personalizarse editando un único archivo de config.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4
- Blog en MDX (`src/content/blog`)
- Deploy recomendado: **Netlify** (plan gratuito permite uso comercial,
  a diferencia del Hobby de Vercel — ver `netlify.toml`)
- SEO: sitemap y robots.txt automáticos (`src/app/sitemap.ts`,
  `src/app/robots.ts`) + datos estructurados schema.org
  (`src/components/StructuredData.tsx`)
- Analítica opcional para reporte al cliente: Google Analytics 4
  (`src/components/Analytics.tsx`, se activa cargando un ID en `brand.ts`)

## Cómo usar este template para un cliente nuevo

1. **Clonar un repo nuevo a partir de este template** (no hacer fork — cada
   cliente tiene su propio repo aislado):
   ```bash
   git clone <url-de-este-repo> nombre-cliente
   cd nombre-cliente
   rm -rf .git && git init
   ```
2. **Editar la marca**: abrir `src/config/brand.ts` y completar nombre,
   slogan, colores, WhatsApp, email, dirección. No hace falta tocar ningún
   componente.
3. **Cargar propiedades**: reemplazar los datos de ejemplo en
   `src/data/properties.ts` (a futuro: panel `/admin` vía CMS headless
   Git-based, ver sección "Pendiente" más abajo).
4. **Cargar contenido de blog**: agregar archivos `.mdx` con frontmatter
   (`title`, `fecha`, `resumen`) en `src/content/blog/`.
5. **Reemplazar imágenes**: subir fotos reales a `public/properties/` y
   actualizar las rutas en `properties.ts`.
6. **Deploy**: conectar el repo a Netlify. Configurar la variable de
   entorno `NEXT_PUBLIC_SITE_URL` con el dominio real del cliente (la usan
   el sitemap, robots.txt y los datos estructurados). El dominio lo
   registra el cliente a su nombre, apuntando el DNS al proyecto de
   Netlify.
7. **Pasar el checklist de QA** (`QA_CHECKLIST.md`) antes de avisarle al
   cliente que el sitio está listo.

## Desarrollo local

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Estructura

```
src/
  config/brand.ts        # única fuente de verdad de marca por cliente
  components/            # Header, Footer, Hero, PropertySearch, ContactForm
  data/properties.ts      # catálogo de propiedades (reemplazar por cliente)
  content/blog/*.mdx       # posts del blog
  app/
    page.tsx              # home
    propiedades/           # listado filtrable
    blog/                  # listado + post individual
    contacto/              # formulario -> WhatsApp
    landing-ads/            # landing de alta conversión para campañas pagas
```

## Documentos relacionados

- `QA_CHECKLIST.md` — checklist a correr antes de entregar cualquier sitio.
- `UPGRADING.md` — cómo propagar mejoras de este template a los repos de
  clientes con mantenimiento.
- `REPORTING_TEMPLATE.md` — plantilla del reporte mensual de resultados
  para clientes con mensualidad.

## Qué es del template y qué es por cliente

Regla general: **todo se construye una sola vez acá, en el template.** Nunca
se reescribe código a medida para un cliente puntual. Lo único que varía de
un cliente a otro es configuración y contenido, nunca lógica:

| Siempre igual (código del template)                                   | Varía por cliente (config/contenido)                          |
| ----------------------------------------------------------------------- | --------------------------------------------------------------- |
| Mecanismo del CMS (`/admin`, Decap + Netlify Identity + Git Gateway)     | El *schema* de colecciones (qué campos tiene cada propiedad/post), definido una vez al clonar |
| Componente del chatbot (ambos modos, básico e inteligente)              | El flag `chatbotTier` en `src/config/plan.ts` + el catálogo que se le pasa como contexto |
| Auth de `/admin`, anti-spam del formulario (honeypot + rate limiting), config de Dependabot | Los *valores* de env vars (API keys, `NEXT_PUBLIC_SITE_URL`, `GA_MEASUREMENT_ID`) por sitio en Netlify |
| Cada funcionalidad distintiva como componente reusable (comparador, favoritos, simulador de crédito, alertas, video/tour, inglés, testimonios, página de detalle, WhatsApp flotante, Open Graph) | Cuáles están prendidas, vía `src/config/plan.ts` → `features` (base vs. exclusivas de mensualidad) |
| Branding (colores, textos, contacto)                                    | Los valores en `src/config/brand.ts`                             |

En la práctica: para dar de alta un cliente nuevo nunca hace falta tocar un
componente, solo completar `brand.ts` y `plan.ts`, y cargar contenido
(catálogo, blog, reseñas).

## Pendiente de implementación

Ya decidido cómo funciona cada uno (ver tabla de arriba y `plan.ts`); falta
construir el código:

- **CMS headless Git-based** (Decap CMS + Netlify Identity + Git Gateway) en
  `/admin`, para que el cliente cargue propiedades y posts sin tocar código.
- **Chatbot** con los dos modos (básico guiado por botones / inteligente con
  Claude Haiku), leyendo `plan.chatbotTier`.
- **Auth de `/admin`** real (Netlify Identity) + protección anti-spam del
  formulario de contacto (honeypot + rate limiting) + Dependabot habilitado.
- **Funcionalidades distintivas** listadas en `plan.ts` → `features`:
  comparador de propiedades, favoritos, simulador de crédito hipotecario,
  testimonios de Google Maps, y las exclusivas de mensualidad (alertas,
  video/tour, versión en inglés).
  ✅ Ya implementadas: página de detalle por propiedad (`/propiedades/[id]`),
  Open Graph/Twitter Card por propiedad, y el botón flotante de WhatsApp.

## Convención de commits

Este repo usa [Conventional Commits](https://www.conventionalcommits.org/)
para mantener prolijo el historial (`feat:`, `fix:`, `chore:`, etc.),
tanto en el template como en cada repo de cliente.

## Licencia

MIT — ver [LICENSE](./LICENSE).
