// Utilidades de favoritos sin login — persistidos en localStorage del
// navegador (nada de backend/login). Client-safe (no usa fs). Todo acceso a
// localStorage está envuelto en try/catch porque puede fallar (modo privado,
// storage deshabilitado, SSR, etc.) y nunca debe romper la página.

const STORAGE_KEY = "favoritos-propiedades";

// Evento custom para que distintos componentes montados a la vez (ej. el
// corazón de una ficha y el panel flotante de favoritos) se enteren de un
// cambio hecho por otro, sin necesidad de una librería de estado global.
const EVENTO_CAMBIO = "favoritos-propiedades:cambio";

export function getFavoriteIds(): string[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function setFavoriteIds(ids: string[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    window.dispatchEvent(new Event(EVENTO_CAMBIO));
  } catch {
    // Si falla el guardado (ej. storage lleno o deshabilitado), no hacemos
    // nada más: el resto del sitio sigue funcionando normal.
  }
}

export function isFavorite(id: string): boolean {
  return getFavoriteIds().includes(id);
}

export function toggleFavorite(id: string): void {
  const actuales = getFavoriteIds();
  const siguiente = actuales.includes(id)
    ? actuales.filter((x) => x !== id)
    : [...actuales, id];
  setFavoriteIds(siguiente);
}

export function subscribeFavorites(callback: () => void): () => void {
  try {
    window.addEventListener(EVENTO_CAMBIO, callback);
    // Por si el cambio se hizo en otra pestaña/ventana.
    window.addEventListener("storage", callback);
    return () => {
      window.removeEventListener(EVENTO_CAMBIO, callback);
      window.removeEventListener("storage", callback);
    };
  } catch {
    return () => {};
  }
}

// Snapshot estable (misma referencia hasta el próximo cambio real) para
// usar con useSyncExternalStore, que es la forma recomendada de leer un
// store externo (localStorage) en un componente sin caer en "setState
// síncrono dentro de un efecto".
let snapshotCache: string[] = [];
let snapshotCacheIds = "";

export function getFavoriteIdsSnapshot(): string[] {
  const actuales = getFavoriteIds();
  const key = actuales.join(",");
  if (key !== snapshotCacheIds) {
    snapshotCacheIds = key;
    snapshotCache = actuales;
  }
  return snapshotCache;
}

export function getFavoriteIdsServerSnapshot(): string[] {
  return [];
}
