import Link from "next/link";
import { brand } from "@/config/brand";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[color:var(--brand-primario)] text-white">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <p className="mb-3 text-sm font-medium tracking-wide text-[color:var(--brand-acento)]">
          {brand.zona}
        </p>
        <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
          {brand.slogan}
        </h1>
        <p className="mt-6 max-w-xl text-slate-200">
          Propiedades seleccionadas, atención directa y asesoramiento personalizado
          para quienes buscan algo más que un portal inmobiliario.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/propiedades"
            className="rounded-full bg-white px-6 py-3 text-sm font-medium text-slate-900"
          >
            Ver propiedades
          </Link>
          <Link
            href="/contacto"
            className="rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white"
          >
            Hablar con un asesor
          </Link>
        </div>
      </div>
    </section>
  );
}
