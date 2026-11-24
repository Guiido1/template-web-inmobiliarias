"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Property } from "@/lib/properties";
import {
  getFavoriteIdsServerSnapshot,
  getFavoriteIdsSnapshot,
  subscribeFavorites,
  toggleFavorite,
} from "@/lib/favorites";
import { whatsappLink } from "@/lib/whatsapp";
import { siteUrl } from "@/lib/site";

const formatoUSD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

/**
 * Botón flotante global "Favoritos" con panel de la lista guardada y botón
 * para compartirla por WhatsApp (ver src/config/plan.ts →
 * features.favoritos). Se monta una sola vez en el layout raíz con el
 * catálogo completo, para poder mostrar título/precio de cada favorita sin
 * volver a leer contenido desde el cliente.
 */
export function FavoritesFloating({ properties }: { properties: Property[] }) {
  const ids = useSyncExternalStore(
    subscribeFavorites,
    getFavoriteIdsSnapshot,
    getFavoriteIdsServerSnapshot
  );
  const [abierto, setAbierto] = useState(false);

  if (ids.length === 0 && !abierto) return null;

  const favoritas = ids
    .map((id) => properties.find((p) => p.id === id))
    .filter((p): p is Property => Boolean(p));

  const mensajeWhatsapp =
    favoritas.length > 0
      ? `Hola, estas son las propiedades que me interesan:\n\n${favoritas
          .map(
            (p) =>
              `• ${p.titulo} — ${formatoUSD.format(p.precio)} (${siteUrl}/propiedades/${p.id})`
          )
          .join("\n")}\n\n¿Podemos coordinar una consulta?`
      : "";

  return (
    <>
      <button
        type="button"
        onClick={() => setAbierto((v) => !v)}
        aria-label="Ver mis favoritos"
        className="fixed bottom-5 left-5 z-50 flex h-14 items-center gap-2 rounded-full bg-white px-4 text-sm font-medium text-slate-700 shadow-lg ring-1 ring-slate-200 transition-transform hover:scale-105"
      >
        <span aria-hidden="true" className="text-red-500">
          ♥
        </span>
        Favoritos {favoritas.length > 0 && `(${favoritas.length})`}
      </button>

      {abierto && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-start bg-black/30 p-5 sm:items-center"
          onClick={() => setAbierto(false)}
        >
          <div
            className="max-h-[70vh] w-full max-w-sm overflow-auto rounded-2xl bg-white p-5 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-semibold text-slate-900">
                Mis favoritos
              </h2>
              <button
                type="button"
                onClick={() => setAbierto(false)}
                aria-label="Cerrar favoritos"
                className="text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            {favoritas.length === 0 ? (
              <p className="text-sm text-slate-500">
                Todavía no guardaste ninguna propiedad. Tocá el ♡ en una
                ficha para agregarla acá.
              </p>
            ) : (
              <>
                <ul className="flex flex-col gap-3">
                  {favoritas.map((p) => (
                    <li
                      key={p.id}
                      className="flex items-center justify-between gap-3 rounded-lg border border-slate-100 p-3"
                    >
                      <Link
                        href={`/propiedades/${p.id}`}
                        className="min-w-0 flex-1"
                        onClick={() => setAbierto(false)}
                      >
                        <p className="truncate text-sm font-medium text-slate-900">
                          {p.titulo}
                        </p>
                        <p className="text-xs text-slate-500">
                          {formatoUSD.format(p.precio)}
                        </p>
                      </Link>
                      <button
                        type="button"
                        onClick={() => toggleFavorite(p.id)}
                        aria-label={`Quitar ${p.titulo} de favoritos`}
                        className="text-slate-400 hover:text-red-500"
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>

                <a
                  href={whatsappLink(mensajeWhatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center justify-center rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:opacity-90"
                >
                  Compartir por WhatsApp
                </a>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
