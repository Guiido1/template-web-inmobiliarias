import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProperties, getPropertyById } from "@/lib/properties-content";
import { whatsappLink } from "@/lib/whatsapp";
import { PropertyStructuredData } from "@/components/StructuredData";
import { siteUrl } from "@/lib/site";
import { FavoriteButton } from "@/components/FavoriteButton";
import { SimuladorCredito } from "@/components/SimuladorCredito";
import { plan } from "@/config/plan";
import { EtiquetaEstado } from "@/components/PropertyCard";
import {
  estaDisponible,
  formatearMonto,
  formatearPrecio,
  resumenSuperficie,
} from "@/lib/properties";

// Solo las fichas que existen: cualquier otro id es 404 directo.
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProperties().map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const property = getPropertyById(id);

  if (!property) {
    return {};
  }

  const titulo = `${property.titulo} — ${formatearPrecio(property)}`;
  const descripcion =
    property.descripcion ??
    `${property.tipo} en ${property.zona}, ${property.m2} m².`;
  const imagen = property.imagenes?.[0] ?? property.imagen;
  const url = `${siteUrl}/propiedades/${property.id}`;

  return {
    title: titulo,
    description: descripcion,
    alternates: { canonical: url },
    openGraph: {
      title: titulo,
      description: descripcion,
      url,
      type: "website",
      images: [{ url: `${siteUrl}${imagen}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: titulo,
      description: descripcion,
      images: [`${siteUrl}${imagen}`],
    },
  };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = getPropertyById(id);

  if (!property) {
    notFound();
  }

  const imagenes = property.imagenes ?? [property.imagen];
  const mensajeWhatsapp = `Hola, me interesa la propiedad "${property.titulo}" (${formatearPrecio(property)}). ¿Podemos coordinar una visita?`;

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <PropertyStructuredData property={property} />

      <Link
        href="/propiedades"
        className="text-sm text-slate-500 hover:text-slate-900"
      >
        ← Volver a propiedades
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div
          className={`grid gap-3 ${imagenes.length > 1 ? "sm:grid-cols-2" : ""}`}
        >
          {imagenes.map((src, index) => (
            <div
              key={src + index}
              className="relative h-64 w-full overflow-hidden rounded-2xl"
            >
              <Image
                src={src}
                alt={`${property.titulo} — foto ${index + 1}`}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                priority={index === 0}
              />
              {index === 0 && plan.features.favoritos && (
                <FavoriteButton
                  id={property.id}
                  className="absolute right-3 top-3"
                />
              )}
            </div>
          ))}
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            {property.zona} · {property.tipo}
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">
            {property.titulo}
          </h1>
          <EtiquetaEstado property={property} className="mt-3" />
          <p className="mt-3 text-sm text-slate-500">
            {resumenSuperficie(property)}
            {property.m2Cubiertos ? ` (${property.m2Cubiertos} m² cubiertos)` : ""}
            {property.cocheras ? ` · ${property.cocheras} coch.` : ""}
          </p>
          <p className="mt-4 text-3xl font-semibold text-slate-900">
            {formatearPrecio(property)}
          </p>
          {property.expensas ? (
            <p className="mt-1 text-sm text-slate-500">
              Expensas: {formatearMonto(property.expensas, "ARS")}/mes
            </p>
          ) : null}

          {property.descripcion && (
            <p className="mt-6 text-slate-600">{property.descripcion}</p>
          )}

          {property.caracteristicas && property.caracteristicas.length > 0 && (
            <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {property.caracteristicas.map((c) => (
                <li
                  key={c}
                  className="flex items-center gap-2 text-sm text-slate-600"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-acento)]" />
                  {c}
                </li>
              ))}
            </ul>
          )}

          <a
            href={whatsappLink(mensajeWhatsapp)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center justify-center rounded-lg bg-[var(--brand-primario)] px-6 py-3 text-sm font-medium text-white hover:opacity-90"
          >
            Consultar por WhatsApp
          </a>
        </div>
      </div>

      {property.ubicacion && (
        <section className="mt-10">
          <h2 className="text-lg font-semibold text-slate-900">Ubicación</h2>
          <p className="mt-1 text-sm text-slate-500">{property.ubicacion}</p>
          {/* Embed público de Google Maps: sin API key ni costo. */}
          <iframe
            title={`Mapa de ${property.ubicacion}`}
            src={`https://www.google.com/maps?q=${encodeURIComponent(property.ubicacion)}&output=embed`}
            className="mt-4 h-72 w-full rounded-2xl border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </section>
      )}

      {plan.features.simuladorCreditoHipotecario &&
        property.operacion === "Venta" &&
        property.moneda === "USD" &&
        estaDisponible(property) && (
          <SimuladorCredito precioPropiedad={property.precio} />
        )}
    </main>
  );
}
