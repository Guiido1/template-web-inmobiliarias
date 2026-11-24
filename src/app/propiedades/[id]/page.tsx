import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { properties } from "@/data/properties";
import { whatsappLink } from "@/lib/whatsapp";
import { PropertyStructuredData } from "@/components/StructuredData";

const formatoUSD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function generateStaticParams() {
  return properties.map((p) => ({ id: p.id }));
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = properties.find((p) => p.id === id);

  if (!property) {
    notFound();
  }

  const imagenes = property.imagenes ?? [property.imagen];
  const mensajeWhatsapp = `Hola, me interesa la propiedad "${property.titulo}" (${formatoUSD.format(
    property.precio
  )}). ¿Podemos coordinar una visita?`;

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
          <p className="mt-3 text-sm text-slate-500">
            {property.ambientes > 0 ? `${property.ambientes} amb. · ` : ""}
            {property.m2} m²
          </p>
          <p className="mt-4 text-3xl font-semibold text-slate-900">
            {formatoUSD.format(property.precio)}
          </p>

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
    </main>
  );
}
