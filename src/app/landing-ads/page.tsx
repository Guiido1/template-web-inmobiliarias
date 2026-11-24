import { ContactForm } from "@/components/ContactForm";
import { brand } from "@/config/brand";

export const metadata = { title: `${brand.nombre} — Consultá sin cargo` };

// Landing de alta conversión para campañas de Meta/Google Ads.
// A propósito no incluye el Header/nav global (se renderiza fuera de layout
// principal si se quiere 100% sin distracciones; por ahora reutiliza el layout
// pero el foco del contenido es un único CTA).
export default function LandingAdsPage() {
  return (
    <main className="bg-[color:var(--brand-primario)] text-white">
      <div className="mx-auto grid max-w-5xl gap-12 px-6 py-24 lg:grid-cols-2 lg:items-center">
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
          <h2 className="mb-4 text-lg font-semibold">
            Consultá sin cargo
          </h2>
          <ContactForm />
        </div>
      </div>
    </main>
  );
}
