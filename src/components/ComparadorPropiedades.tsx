"use client";

import { useState } from "react";
import Link from "next/link";
import { Property } from "@/lib/properties";

const formatoUSD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

/**
 * Barra flotante + modal de comparación lado a lado, para
 * features.comparadorPropiedades (ver src/config/plan.ts). Se monta desde
 * PropertySearch cuando habilitarComparador=true (solo en /propiedades).
 */
export function ComparadorPropiedades({
  properties,
  seleccionadas,
  onQuitar,
  onLimpiar,
  max,
}: {
  properties: Property[];
  seleccionadas: string[];
  onQuitar: (id: string) => void;
  onLimpiar: () => void;
  max: number;
}) {
  const [modalAbierto, setModalAbierto] = useState(false);

  const elegidas = seleccionadas
    .map((id) => properties.find((p) => p.id === id))
    .filter((p): p is Property => Boolean(p));

  if (elegidas.length === 0) return null;

  // Unión de todas las características de las propiedades elegidas, para
  // poder mostrar una fila por característica con un check por propiedad.
  const caracteristicas = Array.from(
    new Set(elegidas.flatMap((p) => p.caracteristicas ?? []))
  );

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-6 py-4 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4">
          <p className="text-sm font-medium text-slate-600">
            {elegidas.length}/{max} seleccionadas para comparar
          </p>

          <div className="flex flex-1 flex-wrap gap-2">
            {elegidas.map((p) => (
              <span
                key={p.id}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600"
              >
                {p.titulo}
                <button
                  type="button"
                  onClick={() => onQuitar(p.id)}
                  aria-label={`Quitar ${p.titulo} de la comparación`}
                  className="text-slate-400 hover:text-slate-700"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>

          <button
            type="button"
            onClick={onLimpiar}
            className="text-sm text-slate-400 hover:text-slate-700"
          >
            Limpiar
          </button>

          <button
            type="button"
            disabled={elegidas.length < 2}
            onClick={() => setModalAbierto(true)}
            className="rounded-lg bg-[color:var(--brand-primario)] px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            Comparar ({elegidas.length})
          </button>
        </div>
      </div>

      {modalAbierto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-8"
          onClick={() => setModalAbierto(false)}
        >
          <div
            className="max-h-full w-full max-w-5xl overflow-auto rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">
                Comparación de propiedades
              </h2>
              <button
                type="button"
                onClick={() => setModalAbierto(false)}
                aria-label="Cerrar comparación"
                className="text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[480px] table-fixed border-collapse text-sm">
                <thead>
                  <tr>
                    <th className="w-32 text-left text-slate-400"> </th>
                    {elegidas.map((p) => (
                      <th
                        key={p.id}
                        className="border-b border-slate-200 px-3 py-2 text-left font-medium text-slate-900"
                      >
                        {p.titulo}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <FilaComparacion
                    etiqueta="Precio"
                    valores={elegidas.map((p) => formatoUSD.format(p.precio))}
                  />
                  <FilaComparacion
                    etiqueta="Tipo"
                    valores={elegidas.map((p) => p.tipo)}
                  />
                  <FilaComparacion
                    etiqueta="Zona"
                    valores={elegidas.map((p) => p.zona)}
                  />
                  <FilaComparacion
                    etiqueta="Ambientes"
                    valores={elegidas.map((p) =>
                      p.ambientes > 0 ? String(p.ambientes) : "—"
                    )}
                  />
                  <FilaComparacion
                    etiqueta="Metros cuadrados"
                    valores={elegidas.map((p) => `${p.m2} m²`)}
                  />

                  {caracteristicas.map((c) => (
                    <FilaComparacion
                      key={c}
                      etiqueta={c}
                      valores={elegidas.map((p) =>
                        p.caracteristicas?.includes(c) ? "✓" : "—"
                      )}
                    />
                  ))}

                  <tr>
                    <td className="py-3 text-slate-400"> </td>
                    {elegidas.map((p) => (
                      <td key={p.id} className="px-3 py-3">
                        <Link
                          href={`/propiedades/${p.id}`}
                          className="text-sm font-medium text-[color:var(--brand-acento)] hover:underline"
                        >
                          Ver ficha completa →
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function FilaComparacion({
  etiqueta,
  valores,
}: {
  etiqueta: string;
  valores: string[];
}) {
  return (
    <tr>
      <td className="border-b border-slate-100 py-2 pr-3 align-top text-xs font-medium uppercase tracking-wide text-slate-400">
        {etiqueta}
      </td>
      {valores.map((v, i) => (
        <td
          key={i}
          className="border-b border-slate-100 px-3 py-2 align-top text-slate-700"
        >
          {v}
        </td>
      ))}
    </tr>
  );
}
