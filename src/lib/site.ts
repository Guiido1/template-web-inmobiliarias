// URL pública del sitio. Se define una vez por cliente vía variable de
// entorno (Netlify: Site settings -> Environment variables -> SITE_URL),
// para que sitemap.ts, robots.ts y los datos estructurados usen siempre
// la URL real del dominio del cliente, sin hardcodearla en el código.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://ejemplo-reemplazar-en-produccion.com";
