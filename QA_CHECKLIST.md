# Checklist de QA antes de entregar un sitio

Correr esto antes de pasar cualquier sitio de cliente a producción (toma
~5-10 minutos, no hace falta tooling extra más allá de Chrome DevTools).

## Contenido y marca
- [ ] `src/config/brand.ts` completo con los datos reales del cliente
      (nombre, slogan, colores, WhatsApp, email, teléfono, dirección).
- [ ] `brand.matricula` con el nombre y la matrícula reales del corredor
      responsable (obligatorio en publicidad inmobiliaria; se ve en el
      footer y en la landing de Ads).
- [ ] `/privacidad` revisada con el cliente (nombre, email y dirección
      reales; agregar cualquier herramienta extra que use).
- [ ] `brand.simuladorCredito`: tasa UVA y tipo de cambio de referencia
      actualizados.
- [ ] `src/content/properties/*.md` con el catálogo real (no las
      propiedades de ejemplo del template) — cargadas vía `/admin` o a
      mano, no hace falta tocar componentes.
- [ ] Imágenes reales en `public/properties/` (no los placeholders SVG).
- [ ] `NEXT_PUBLIC_SITE_URL` configurada en las variables de entorno de
      Netlify con el dominio real del cliente (la usan `sitemap.ts`,
      `robots.ts` y los datos estructurados).
- [ ] Si el cliente tiene mensualidad: `gaMeasurementId` cargado en
      `brand.ts` (ver `REPORTING_TEMPLATE.md`).

## Responsive — mobile y desktop
- [ ] Home, listado de propiedades, blog, contacto y landing-ads revisados
      en viewport **mobile** (Chrome DevTools, modo responsive) — relevante
      sobre todo para el tráfico que llega de campañas de Ads.
- [ ] Los mismos revisados en **desktop** (1440px+) — para este nicho de
      ticket alto es esperable una buena porción de tráfico desde
      computadora (sesiones de investigación más largas, no solo un
      vistazo rápido desde el celular), así que no alcanza con validar
      solo mobile.
- [ ] El menú y el formulario de contacto son usables con el teclado
      virtual abierto en mobile (sin elementos tapados).

## Performance
- [ ] Lighthouse (Chrome DevTools > Lighthouse, modo "Navigation") en la
      home y en `/propiedades`, corrido tanto en modo **mobile** como
      **desktop**: apuntar a 90+ en Performance y SEO en ambos.
- [ ] Las imágenes de propiedades cargan a través de `next/image` (no hay
      ningún `<img>` suelto sin optimizar en componentes nuevos).

## Cross-browser
- [ ] Probado en Chrome y Safari (cubre la gran mayoría de dispositivos
      del público objetivo).

## Funcional
- [ ] El formulario de contacto abre WhatsApp con el mensaje pre-armado
      correctamente (número de `brand.contacto.whatsapp` real, no el de
      ejemplo).
- [ ] Los filtros de `/propiedades` (zona, tipo, precio) funcionan con el
      catálogo real cargado, y las propiedades vendidas/alquiladas se
      muestran con su etiqueta y al final.
- [ ] Menú hamburguesa en mobile abre y navega; los botones flotantes no
      quedan tapados con la barra del comparador abierta.
- [ ] `npm test` pasa.
- [ ] Los posts del blog renderizan bien (frontmatter completo: `title`,
      `fecha`, `resumen`).
- [ ] Chatbot: si el cliente tiene mensualidad, `plan.chatbotTier` está en
      `"inteligente"` y `ANTHROPIC_API_KEY` está cargada en Netlify (probar
      que responda); si no, está en `"basico"` y el flujo de botones llega
      a resultados reales del catálogo.

## SEO
- [ ] `/sitemap.xml` y `/robots.txt` responden correctamente en el deploy
      de preview, con las URLs del dominio real (no el placeholder).
- [ ] Título y descripción (`brand.seo`) específicos del cliente, no los
      de "Inmobiliaria Modelo".
- [ ] Compartir la home y una ficha por WhatsApp muestra la vista previa
      con imagen (`/opengraph-image` y foto de la propiedad).
- [ ] `/landing-ads` tiene `noindex` y no muestra el menú.

## Seguridad
- [ ] `npm audit` sin vulnerabilidades altas/críticas antes de entregar.
- [ ] Ninguna variable sensible (API keys, tokens) committeada — todo vía
      variables de entorno de Netlify.
- [ ] Dependabot activo en el repo del cliente (Settings → Code security →
      confirmar que "Dependabot version updates" esté habilitado; el
      archivo `.github/dependabot.yml` ya viene del template).
- [ ] Si el cliente usa el panel `/admin`: checklist completo de
      `SECURITY_ADMIN.md` corrido y tildado (Identity invite-only + Git
      Gateway por rol) **antes** de avisarle que ya puede entrar.
