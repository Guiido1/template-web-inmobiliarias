import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { brand } from "@/config/brand";

export const metadata: Metadata = {
  title: { absolute: `${brand.nombre} — Consultá sin cargo` },
  // Página solo para tráfico pago: no tiene que competir en Google con la
  // home ni aparecer en el sitemap.
  robots: { index: false, follow: false },
};

// Landing de alta conversión para campañas de Meta/Google Ads. Vive fuera
// del grupo (sitio), así que NO hereda header, footer, chat ni botones
// flotantes: un único CTA, sin distracciones ni links de salida.
export default function LandingAdsPage() {
  return (
    <main className="flex flex-1 flex-col bg-[color:var(--brand-primario)] text-white">
      <div className="mx-auto w-full max-w-5xl px-6 pt-8">
        <p className="font-display text-lg font-semibold">{brand.nombre}</p>
      </div>
      <div className="mx-auto grid w-full max-w-5xl flex-1 gap-12 px-6 py-16 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="mb-3 text-sm font-medium text-[color:var(--brand-acento)]">
            {brand.zona}
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            {brand.slogan}
          </h1>
          <p className="mt-6 max-w-md text-slate-200">
            Asesoramiento personalizado para encontrar la propiedad que buscás,
            sin vueltas y sin intermediarios genéricos.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-8 text-slate-900">
          <h2 className="mb-4 text-lg font-semibold">Consultá sin cargo</h2>
          <ContactForm />
        </div>
      </div>
      <p className="px-6 pb-6 text-center text-xs text-white/60">
        {brand.matricula.corredor} · {brand.matricula.numero}
      </p>
    </main>
  );
}
