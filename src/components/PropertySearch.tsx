"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Property, properties, tipos, zonas } from "@/data/properties";

const formatoUSD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function PropertySearch() {
  const [zona, setZona] = useState<string>("Todas");
  const [tipo, setTipo] = useState<string>("Todos");
  const [precioMax, setPrecioMax] = useState<number>(
    Math.max(...properties.map((p) => p.precio))
  );

  const filtradas = useMemo(() => {
    return properties.filter((p: Property) => {
      if (zona !== "Todas" && p.zona !== zona) return false;
      if (tipo !== "Todos" && p.tipo !== tipo) return false;
      if (p.precio > precioMax) return false;
      return true;
    });
  }, [zona, tipo, precioMax]);

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-8 flex flex-wrap gap-4">
        <select
          value={zona}
          onChange={(e) => setZona(e.target.value)}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
        >
          <option>Todas</option>
          {zonas.map((z) => (
            <option key={z}>{z}</option>
          ))}
        </select>

        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
        >
          <option>Todos</option>
          {tipos.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>

        <label className="flex items-center gap-2 text-sm text-slate-600">
          Hasta {formatoUSD.format(precioMax)}
          <input
            type="range"
            min={Math.min(...properties.map((p) => p.precio))}
            max={Math.max(...properties.map((p) => p.precio))}
            step={10000}
            value={precioMax}
            onChange={(e) => setPrecioMax(Number(e.target.value))}
          />
        </label>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtradas.map((p) => (
          <Link
            key={p.id}
            href={`/propiedades/${p.id}`}
            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white"
          >
            <article>
              <div className="relative h-44 w-full">
                <Image
                  src={p.imagen}
                  alt={p.titulo}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  {p.zona} · {p.tipo}
                </p>
                <h3 className="mt-1 font-medium text-slate-900">{p.titulo}</h3>
                <p className="mt-2 text-sm text-slate-500">
                  {p.ambientes > 0 ? `${p.ambientes} amb. · ` : ""}
                  {p.m2} m²
                </p>
                <p className="mt-3 text-lg font-semibold text-slate-900">
                  {formatoUSD.format(p.precio)}
                </p>
              </div>
            </article>
          </Link>
        ))}

        {filtradas.length === 0 && (
          <p className="col-span-full text-sm text-slate-500">
            No hay propiedades que coincidan con estos filtros.
          </p>
        )}
      </div>
    </section>
  );
}
