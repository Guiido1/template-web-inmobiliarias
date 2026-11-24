import Image from "next/image";
import Link from "next/link";
import { FavoriteButton } from "@/components/FavoriteButton";
import { plan } from "@/config/plan";
import {
  estaDisponible,
  formatearPrecio,
  resumenSuperficie,
  type Property,
} from "@/lib/properties";

/**
 * Tarjeta de propiedad, compartida por la home (destacadas) y el listado.
 * El link cubre solo foto + datos: el corazón de favoritos y las
 * `acciones` (ej. "Comparar") quedan FUERA del <a>, porque un botón o un
 * checkbox dentro de un link es HTML inválido y en mobile dispara la
 * navegación al tocarlos.
 */
export function PropertyCard({
  property: p,
  acciones,
}: {
  property: Property;
  acciones?: React.ReactNode;
}) {
  const disponible = estaDisponible(p);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <Link href={`/propiedades/${p.id}`} className="block flex-1">
        <div className="relative h-44 w-full overflow-hidden">
          <Image
            src={p.imagen}
            alt={p.titulo}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className={`object-cover transition-transform group-hover:scale-105 ${
              disponible ? "" : "grayscale"
            }`}
          />
          <EtiquetaEstado property={p} className="absolute left-3 top-3" />
        </div>
        <div className="p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            {p.zona} · {p.tipo}
          </p>
          <h3 className="mt-1 font-medium text-slate-900">{p.titulo}</h3>
          <p className="mt-2 text-sm text-slate-500">{resumenSuperficie(p)}</p>
          <p className="mt-3 text-lg font-semibold text-slate-900">
            {formatearPrecio(p)}
          </p>
        </div>
      </Link>

      {plan.features.favoritos && (
        <FavoriteButton id={p.id} className="absolute right-3 top-3" />
      )}
      {acciones && <div className="px-5 pb-5">{acciones}</div>}
    </article>
  );
}

/** "Alquiler" / "Reservada" / "Vendida": nada para una venta disponible. */
export function EtiquetaEstado({
  property: p,
  className = "",
}: {
  property: Property;
  className?: string;
}) {
  const etiquetas = [
    p.operacion === "Alquiler" && { texto: "Alquiler", clase: "bg-white/90 text-slate-700" },
    p.estado !== "Disponible" && {
      texto: p.estado,
      clase: estaDisponible(p) ? "bg-amber-500 text-white" : "bg-slate-900 text-white",
    },
  ].filter((e): e is { texto: string; clase: string } => Boolean(e));

  if (etiquetas.length === 0) return null;

  return (
    <div className={`flex gap-2 ${className}`}>
      {etiquetas.map((e) => (
        <span
          key={e.texto}
          className={`rounded-full px-3 py-1 text-xs font-medium shadow-sm ${e.clase}`}
        >
          {e.texto}
        </span>
      ))}
    </div>
  );
}
