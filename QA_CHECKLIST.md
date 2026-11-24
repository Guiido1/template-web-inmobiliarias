# Checklist de QA antes de entregar un sitio

Correr esto antes de pasar cualquier sitio de cliente a producción (toma
~5-10 minutos, no hace falta tooling extra más allá de Chrome DevTools).

## Contenido y marca
- [ ] `src/config/brand.ts` completo con los datos reales del cliente
      (nombre, slogan, colores, WhatsApp, email, teléfono, dirección).
- [ ] `src/data/properties.ts` con el catálogo real (no las propiedades de
      ejemplo del template).
- [ ] Imágenes reales en `public/properties/` (no los placeholders SVG).
- [ ] `NEXT_PUBLIC_SITE_URL` configurada en las variables de entorno de
      Netlify con el dominio real del cliente (la usan `sitemap.ts`,
      `robots.ts` y los datos estructurados).
- [ ] Si el cliente tiene mensualidad: `gaMeasurementId` cargado en
      `brand.ts` (ver `REPORTING_TEMPLATE.md`).

## Responsive / mobile
- [ ] Home, listado de propiedades, blog, contacto y landing-ads revisados
      en un viewport mobile (Chrome DevTools, modo responsive) — la mayoría
      del tráfico de campañas de Ads llega desde celular.
- [ ] El menú y el formulario de contacto son usables con el teclado
      virtual abierto (sin elementos tapados).

## Performance
- [ ] Lighthouse (Chrome DevTools > Lighthouse, modo "Navigation", mobile)
      en la home y en `/propiedades`: apuntar a 90+ en Performance y SEO.
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
      catálogo real cargado.
- [ ] Los posts del blog renderizan bien (frontmatter completo: `title`,
      `fecha`, `resumen`).

## SEO
- [ ] `/sitemap.xml` y `/robots.txt` responden correctamente en el deploy
      de preview, con las URLs del dominio real (no el placeholder).
- [ ] Título y descripción (`brand.seo`) específicos del cliente, no los
      de "Inmobiliaria Modelo".

## Seguridad
- [ ] `npm audit` sin vulnerabilidades altas/críticas antes de entregar.
- [ ] Ninguna variable sensible (API keys, tokens) committeada — todo vía
      variables de entorno de Netlify.
