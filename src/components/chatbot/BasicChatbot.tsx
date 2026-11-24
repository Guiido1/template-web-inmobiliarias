"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { brand } from "@/config/brand";
import {
  Property,
  estaDisponible,
  formatearPrecio,
  getTipos,
  getZonas,
} from "@/lib/properties";
import { whatsappLink } from "@/lib/whatsapp";

const RANGOS = [
  { label: "Hasta USD 300.000", max: 300_000 },
  { label: "Hasta USD 500.000", max: 500_000 },
  { label: "Sin límite", max: Infinity },
];

type Paso = "tipo" | "zona" | "precio" | "resultados";

/**
 * Bot guiado por botones, sin IA — costo $0. Usa el mismo catálogo que ya
 * está cargado en la página (prop), no hace ninguna llamada de red.
 */
export function BasicChatbot({ properties: todas }: { properties: Property[] }) {
  // Solo lo que se puede ofrecer: nada vendido ni alquilado.
  const properties = useMemo(() => todas.filter(estaDisponible), [todas]);
  const [paso, setPaso] = useState<Paso>("tipo");
  const [tipo, setTipo] = useState<string | null>(null);
  const [zona, setZona] = useState<string | null>(null);
  const [precioMax, setPrecioMax] = useState<number | null>(null);

  const tipos = useMemo(() => getTipos(properties), [properties]);
  const zonas = useMemo(() => getZonas(properties), [properties]);

  const resultados = useMemo(() => {
    if (paso !== "resultados") return [];
    return properties
      .filter((p) => (tipo ? p.tipo === tipo : true))
      .filter((p) => (zona ? p.zona === zona : true))
      // Los rangos son de compra en USD: con un tope elegido, solo ventas en USD.
      .filter((p) =>
        precioMax != null
          ? p.operacion === "Venta" && p.moneda === "USD" && p.precio <= precioMax
          : true
      )
      .slice(0, 3);
  }, [properties, paso, tipo, zona, precioMax]);

  function reiniciar() {
    setTipo(null);
    setZona(null);
    setPrecioMax(null);
    setPaso("tipo");
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 space-y-4 overflow-y-auto p-4 text-sm">
        <p className="rounded-2xl bg-slate-100 px-4 py-2 text-slate-700">
          ¡Hola! Te ayudo a encontrar una propiedad. ¿Qué tipo buscás?
        </p>

        {paso === "tipo" && (
          <div className="flex flex-wrap gap-2">
            {tipos.map((t) => (
              <button
                key={t}
                onClick={() => {
                  setTipo(t);
                  setPaso("zona");
                }}
                className="rounded-full border border-slate-200 px-3 py-1.5 text-slate-700 hover:border-[var(--brand-primario)]"
              >
                {t}
              </button>
            ))}
            <button
              onClick={() => {
                setTipo(null);
                setPaso("zona");
              }}
              className="rounded-full border border-slate-200 px-3 py-1.5 text-slate-500 hover:border-[var(--brand-primario)]"
            >
              Cualquiera
            </button>
          </div>
        )}

        {paso !== "tipo" && (
          <p className="rounded-2xl bg-[var(--brand-primario)]/10 px-4 py-2 text-right text-slate-700">
            {tipo ?? "Cualquier tipo"}
          </p>
        )}

        {paso === "zona" && (
          <>
            <p className="rounded-2xl bg-slate-100 px-4 py-2 text-slate-700">
              ¿En qué zona?
            </p>
            <div className="flex flex-wrap gap-2">
              {zonas.map((z) => (
                <button
                  key={z}
                  onClick={() => {
                    setZona(z);
                    setPaso("precio");
                  }}
                  className="rounded-full border border-slate-200 px-3 py-1.5 text-slate-700 hover:border-[var(--brand-primario)]"
                >
                  {z}
                </button>
              ))}
              <button
                onClick={() => {
                  setZona(null);
                  setPaso("precio");
                }}
                className="rounded-full border border-slate-200 px-3 py-1.5 text-slate-500 hover:border-[var(--brand-primario)]"
              >
                Cualquier zona
              </button>
            </div>
          </>
        )}

        {(paso === "precio" || paso === "resultados") && (
          <p className="rounded-2xl bg-[var(--brand-primario)]/10 px-4 py-2 text-right text-slate-700">
            {zona ?? "Cualquier zona"}
          </p>
        )}

        {paso === "precio" && (
          <>
            <p className="rounded-2xl bg-slate-100 px-4 py-2 text-slate-700">
              ¿Qué presupuesto manejás?
            </p>
            <div className="flex flex-wrap gap-2">
              {RANGOS.map((r) => (
                <button
                  key={r.label}
                  onClick={() => {
                    setPrecioMax(r.max === Infinity ? null : r.max);
                    setPaso("resultados");
                  }}
                  className="rounded-full border border-slate-200 px-3 py-1.5 text-slate-700 hover:border-[var(--brand-primario)]"
                >
                  {r.label}
                </button>
              ))}
            </div>
          </>
        )}

        {paso === "resultados" && (
          <>
            <p className="rounded-2xl bg-slate-100 px-4 py-2 text-slate-700">
              {resultados.length > 0
                ? `Encontré ${resultados.length} propiedad${resultados.length > 1 ? "es" : ""} que podrían interesarte:`
                : "No encontré propiedades con esos filtros exactos. Probá ampliando la búsqueda, o escribinos directo:"}
            </p>
            <div className="space-y-2">
              {resultados.map((p) => (
                <Link
                  key={p.id}
                  href={`/propiedades/${p.id}`}
                  className="block rounded-xl border border-slate-200 p-3 hover:border-[var(--brand-primario)]"
                >
                  <p className="font-medium text-slate-900">{p.titulo}</p>
                  <p className="text-xs text-slate-500">
                    {p.zona} · {p.operacion} · {formatearPrecio(p)}
                  </p>
                </Link>
              ))}
            </div>
            <a
              href={whatsappLink(`Hola ${brand.nombre}, quiero más información.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-full bg-green-600 px-4 py-2 text-center font-medium text-white"
            >
              Hablar por WhatsApp
            </a>
            <button
              onClick={reiniciar}
              className="block w-full text-center text-xs text-slate-400 underline"
            >
              Buscar de nuevo
            </button>
          </>
        )}
      </div>
    </div>
  );
}
