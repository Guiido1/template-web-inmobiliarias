"use client";

import Link from "next/link";

// Error inesperado dentro del sitio: se muestra con header y footer, y
// permite reintentar sin recargar toda la página.
export default function ErrorPagina({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="mx-auto flex max-w-xl flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
        Algo salió mal
      </h1>
      <p className="mt-3 text-slate-500">
        Tuvimos un problema al cargar esta página. Probá de nuevo en un momento.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-[color:var(--brand-primario)] px-6 py-3 text-sm font-medium text-white"
        >
          Reintentar
        </button>
        <Link
          href="/"
          className="rounded-full border border-slate-300 px-6 py-3 text-sm font-medium text-slate-700"
        >
          Ir al inicio
        </Link>
      </div>
    </main>
  );
}
