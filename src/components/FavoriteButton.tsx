"use client";

import { useSyncExternalStore } from "react";
import {
  getFavoriteIdsServerSnapshot,
  getFavoriteIdsSnapshot,
  subscribeFavorites,
  toggleFavorite,
} from "@/lib/favorites";

/**
 * Botón de corazón para marcar/desmarcar una propiedad como favorita
 * (ver src/config/plan.ts → features.favoritos). Sin login: todo vive en
 * localStorage del navegador (src/lib/favorites.ts).
 */
export function FavoriteButton({
  id,
  className = "",
}: {
  id: string;
  className?: string;
}) {
  // useSyncExternalStore: en el servidor (sin localStorage) devuelve
  // siempre [], y en el cliente se actualiza solo al cambiar el storage
  // (desde este botón o desde otra pestaña).
  const ids = useSyncExternalStore(
    subscribeFavorites,
    getFavoriteIdsSnapshot,
    getFavoriteIdsServerSnapshot
  );
  const marcada = ids.includes(id);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(id);
      }}
      aria-label={marcada ? "Quitar de favoritos" : "Guardar en favoritos"}
      aria-pressed={marcada}
      className={`flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-lg shadow backdrop-blur transition-transform hover:scale-110 ${className}`}
    >
      <span aria-hidden="true" className={marcada ? "text-red-500" : "text-slate-400"}>
        {marcada ? "♥" : "♡"}
      </span>
    </button>
  );
}
