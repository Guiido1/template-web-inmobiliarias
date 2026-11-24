import { Hero } from "@/components/Hero";
import { PropertySearch } from "@/components/PropertySearch";
import { IdentityInviteRedirect } from "@/components/IdentityInviteRedirect";
import { GoogleReviews } from "@/components/GoogleReviews";
import { getAllProperties } from "@/lib/properties-content";
import { plan } from "@/config/plan";
import { PropertyCard } from "@/components/PropertyCard";
import { estaDisponible } from "@/lib/properties";

export default function HomePage() {
  const properties = getAllProperties();
  const destacadas = properties.filter((p) => p.destacada && estaDisponible(p));

  return (
    <main>
      <IdentityInviteRedirect />
      <Hero />
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Propiedades destacadas
        </h2>
        {destacadas.length > 0 && (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {destacadas.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        )}
      </section>
      <PropertySearch properties={properties} />
      {plan.features.testimoniosGoogleMaps && <GoogleReviews />}
    </main>
  );
}
