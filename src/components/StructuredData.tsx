import { brand } from "@/config/brand";
import { properties } from "@/data/properties";
import { siteUrl } from "@/lib/site";

// Datos estructurados (schema.org) vía JSON-LD. No cambian cómo se ve el
// sitio, pero le dicen a Google explícitamente qué es cada cosa (una
// inmobiliaria, un listado de propiedades con precio y ubicación), lo que
// mejora cómo aparece en resultados de búsqueda (rich snippets).

/** Organization — una sola vez en el layout raíz. */
export function OrganizationStructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: brand.nombre,
    description: brand.seo.descripcionDefault,
    url: siteUrl,
    telephone: brand.contacto.telefono,
    email: brand.contacto.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: brand.contacto.direccion,
    },
    areaServed: brand.zona,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * ItemList de RealEstateListing — una por propiedad del catálogo actual.
 * Se usa en /propiedades. Si en el futuro se suman páginas de detalle por
 * propiedad (con su propia URL), este bloque pasa a vivir en esa página
 * individual en vez de en el listado.
 */
export function PropertyCatalogStructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: properties.map((p, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "RealEstateListing",
        name: p.titulo,
        url: `${siteUrl}/propiedades`,
        image: `${siteUrl}${p.imagen}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: p.zona,
        },
        floorSize: {
          "@type": "QuantitativeValue",
          value: p.m2,
          unitCode: "MTK",
        },
        numberOfRooms: p.ambientes || undefined,
        offers: {
          "@type": "Offer",
          price: p.precio,
          priceCurrency: "USD",
        },
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
