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

## Pendiente / a definir

- **CMS headless Git-based** (tipo Decap CMS, con Netlify Identity + Git
  Gateway) en `/admin` para que el cliente cargue propiedades y posts sin
  tocar código.
- **Chatbot** con dos niveles (básico guiado por botones / inteligente
  con Claude Haiku) — pendiente de implementación.
- **Auth de `/admin`** y gestión de secrets/env vars más allá de lo ya
  cubierto en `netlify.toml` (headers de seguridad base) — protección
  anti-spam del formulario de contacto, actualización de dependencias
  (Dependabot).
- Funcionalidades distintivas del plan base y del plan con mensualidad
  (comparador de propiedades, favoritos, simulador de crédito, alertas,
  video/tour, versión en inglés) — ver el plan del proyecto.

## Convención de commits

Este repo usa [Conventional Commits](https://www.conventionalcommits.org/)
para mantener prolijo el historial (`feat:`, `fix:`, `chore:`, etc.),
tanto en el template como en cada repo de cliente.

## Licencia

MIT — ver [LICENSE](./LICENSE).
