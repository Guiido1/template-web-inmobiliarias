import { Hero } from "@/components/Hero";
import { PropertySearch } from "@/components/PropertySearch";
import { IdentityInviteRedirect } from "@/components/IdentityInviteRedirect";
import { GoogleReviews } from "@/components/GoogleReviews";
import { getAllProperties } from "@/lib/properties-content";
import { plan } from "@/config/plan";

export default function HomePage() {
  const properties = getAllProperties();
  const destacadas = properties.filter((p) => p.destacada);

  return (
    <main>
      <IdentityInviteRedirect />
      <Hero />
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Propiedades destacadas
        </h2>
        <p className="mt-2 text-slate-500">
          {destacadas.length} propiedades seleccionadas esta semana.
        </p>
      </section>
      <PropertySearch properties={properties} />
      {plan.features.testimoniosGoogleMaps && <GoogleReviews />}
    </main>
  );
}
