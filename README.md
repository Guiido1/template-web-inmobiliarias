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
- Chatbot de dos niveles (básico sin costo / inteligente con Claude Haiku),
  ver sección "Chatbot" más abajo.

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
3. **Cargar propiedades**: reemplazar los ejemplos en
   `src/content/properties/` (un archivo `.md` por propiedad) — a mano o,
   una vez desplegado, desde el panel `/admin`.
4. **Cargar contenido de blog**: agregar archivos `.mdx` con frontmatter
   (`title`, `fecha`, `resumen`) en `src/content/blog/`, también editable
   desde `/admin`.
5. **Reemplazar imágenes**: subir fotos reales a `public/properties/` (o
   subirlas directo desde el panel, que las guarda ahí).
6. **Deploy**: conectar el repo a Netlify. Configurar la variable de
   entorno `NEXT_PUBLIC_SITE_URL` con el dominio real del cliente (la usan
   el sitemap, robots.txt y los datos estructurados). El dominio lo
   registra el cliente a su nombre, apuntando el DNS al proyecto de
   Netlify.
7. **Asegurar el panel `/admin`**: correr el checklist completo de
   `SECURITY_ADMIN.md` (Identity invite-only + Git Gateway por rol) antes
   de invitar al cliente — nunca dejar esto para después.
8. **Pasar el checklist de QA** (`QA_CHECKLIST.md`) antes de avisarle al
   cliente que el sitio está listo.

## Desarrollo local

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

Tests de la lógica pura (cuota, formato de precios, orden del catálogo,
slider): `npm test` (Node 22+, sin dependencias extra). También corren en
la CI.

## Estructura

```
src/
  config/brand.ts            # única fuente de verdad de marca por cliente
  config/plan.ts              # flags de plan/features por cliente
  components/                 # Header, Footer, Hero, PropertySearch, ContactForm
  content/properties/*.md      # catálogo de propiedades (editable vía /admin)
  content/blog/*.mdx            # posts del blog (editable vía /admin)
  content/testimonios/*.md       # reseñas de Google Maps (editable vía /admin)
  lib/properties-content.ts      # carga el catálogo (solo server, usa fs)
  lib/properties.ts               # tipo Property + helpers (client-safe)
  lib/favorites.ts                 # favoritos sin login (localStorage)
  lib/mortgage.ts                   # cálculo del simulador de crédito
  app/
    layout.tsx                    # html/body, fuentes, metadata base, analítica
    opengraph-image.tsx            # imagen por defecto al compartir links
    not-found.tsx                  # 404 con la marca
    (sitio)/                       # todo lo que lleva header, footer y flotantes
      layout.tsx
      page.tsx                     # home (hero + destacadas + buscador + reseñas)
      propiedades/                 # listado filtrable
      propiedades/[id]/            # ficha de detalle (mapa, simulador, WhatsApp)
      blog/                        # listado + post individual
      contacto/                    # formulario -> WhatsApp
      privacidad/                  # política de privacidad (Ley 25.326)
    landing-ads/                   # landing para campañas pagas: sin menú, noindex
tests/                             # tests de lógica pura (`npm test`)
public/
  admin/                              # panel Decap CMS (ver SECURITY_ADMIN.md)
```

## Documentos relacionados

- `QA_CHECKLIST.md` — checklist a correr antes de entregar cualquier sitio.
- `SECURITY_ADMIN.md` — checklist obligatorio de seguridad del panel
  `/admin` (Identity invite-only + Git Gateway por rol), por cliente.
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

## Chatbot

Un solo componente (`src/components/chatbot/ChatbotWidget.tsx`) con dos
modos; cuál se activa lo decide `plan.chatbotTier` en `src/config/plan.ts`:

- **`"basico"`** (sin mensualidad, costo $0): `BasicChatbot.tsx`, guiado
  por botones (tipo → zona → presupuesto) sobre el catálogo ya cargado en
  la página. No hace ninguna llamada de red.
- **`"inteligente"`** (exclusivo de mensualidad): `SmartChatbot.tsx`, texto
  libre contra `/api/chat`, que llama a Claude Haiku con el catálogo
  completo como contexto. Requiere la variable de entorno
  `ANTHROPIC_API_KEY` en Netlify (ver `.env.example`) — sin ella, el
  endpoint responde un error controlado y el resto del sitio sigue
  funcionando normal.

Topes de costo/abuso ya incluidos (`src/lib/chatbotConfig.ts`, compartido
entre el endpoint y la UI para que no se desincronicen): máximo de 30
mensajes por conversación, `max_tokens` acotado por respuesta, y un rate
limit básico por IP (`src/lib/rateLimiter.ts` — best-effort, documentado
ahí mismo).

La derivación a WhatsApp es progresiva, no un corte estático al final de
la conversación: a partir de cierta cantidad de mensajes aparece una
sugerencia liviana y descartable para pasar a WhatsApp; más adelante se
vuelve una sugerencia fija (no descartable); y al llegar al tope, es
obligatoria. En los tres casos se muestra el mismo formulario corto
(`WhatsappHandoffForm.tsx`: nombre, teléfono opcional, resumen de lo que
busca — prellenado automáticamente con sus últimos mensajes) que arma el
mensaje de WhatsApp ya completo, para no hacerle perder tiempo a quien
responda del otro lado.

## Pendiente de implementación

Exclusivas de mensualidad ya decididas, sin código todavía (se agrega su
flag a `plan.ts` → `features` recién cuando exista el componente):

- Alertas personalizadas.
- Video/tour virtual en la ficha.
- Versión en inglés.

✅ Ya implementadas: página de detalle por propiedad (`/propiedades/[id]`),
Open Graph/Twitter Card por propiedad, el botón flotante de WhatsApp, el
panel `/admin` (CMS headless Git-based) para propiedades y blog, el
chatbot de dos niveles, el honeypot/rate limit/saneo del formulario de
contacto, Dependabot (`.github/dependabot.yml`), el comparador de
propiedades (selección de 2-3 fichas desde `/propiedades` y vista
comparativa), favoritos sin login (localStorage + compartir por
WhatsApp), el simulador de crédito hipotecario (sistema francés, tasa
editable desde `brand.ts`) y los testimonios de Google Maps (sin usar la
API de Google Places, colección editable desde `/admin`). Auth real de
`/admin`: el mecanismo (Netlify Identity + Git Gateway) ya está integrado
en el código — lo que queda por sitio es la configuración obligatoria del
dashboard de Netlify, ver `SECURITY_ADMIN.md` (incluye el aviso sobre el
retiro de Git Gateway y las alternativas para clientes nuevos).

También incluidos: menú mobile, propiedades en venta o alquiler (USD/ARS)
con estado (disponible/reservada/vendida/alquilada), dormitorios, baños,
cocheras, expensas y mapa; matrícula del corredor en el footer; página de
privacidad; 404 y página de error; imagen por defecto para compartir;
simulador en pesos UVA con tipo de cambio de referencia.

## Convención de commits

Este repo usa [Conventional Commits](https://www.conventionalcommits.org/)
para mantener prolijo el historial (`feat:`, `fix:`, `chore:`, etc.),
tanto en el template como en cada repo de cliente.

## Licencia

MIT — ver [LICENSE](./LICENSE).
