import { brand } from "@/config/brand";
import { Property } from "@/lib/properties";
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
 * Se usa en /propiedades. Cada item linkea a su página de detalle propia
 * (ver PropertyStructuredData más abajo, que se usa en esa página).
 */
export function PropertyCatalogStructuredData({
  properties,
}: {
  properties: Property[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: properties.map((p, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "RealEstateListing",
        name: p.titulo,
        url: `${siteUrl}/propiedades/${p.id}`,
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

/** RealEstateListing completo de una sola propiedad — se usa en su página de detalle. */
export function PropertyStructuredData({ property }: { property: Property }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.titulo,
    description: property.descripcion ?? brand.seo.descripcionDefault,
    url: `${siteUrl}/propiedades/${property.id}`,
    image: (property.imagenes ?? [property.imagen]).map((i) => `${siteUrl}${i}`),
    address: {
      "@type": "PostalAddress",
      addressLocality: property.zona,
    },
    floorSize: {
      "@type": "QuantitativeValue",
      value: property.m2,
      unitCode: "MTK",
    },
    numberOfRooms: property.ambientes || undefined,
    offers: {
      "@type": "Offer",
      price: property.precio,
      priceCurrency: "USD",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
