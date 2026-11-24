import Link from "next/link";
import { brand } from "@/config/brand";

// 404 global. Vive fuera del grupo (sitio), así que no tiene header:
// muestra la marca y los dos caminos más útiles para no perder la visita.
export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <Link href="/" className="font-display text-lg font-semibold text-slate-900">
        {brand.nombre}
      </Link>
      <h1 className="mt-10 text-3xl font-semibold tracking-tight text-slate-900">
        No encontramos esta página
      </h1>
      <p className="mt-3 max-w-md text-slate-500">
        Puede que la propiedad ya no esté publicada o que el link haya cambiado.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href="/propiedades"
          className="rounded-full bg-[color:var(--brand-primario)] px-6 py-3 text-sm font-medium text-white"
        >
          Ver propiedades
        </Link>
        <Link
          href="/contacto"
          className="rounded-full border border-slate-300 px-6 py-3 text-sm font-medium text-slate-700"
        >
          Contactanos
        </Link>
      </div>
    </main>
  );
}
