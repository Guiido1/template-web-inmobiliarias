import { Hero } from "@/components/Hero";
import { PropertySearch } from "@/components/PropertySearch";
import { properties } from "@/data/properties";

export default function HomePage() {
  const destacadas = properties.filter((p) => p.destacada);

  return (
    <main>
      <Hero />
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Propiedades destacadas
        </h2>
        <p className="mt-2 text-slate-500">
          {destacadas.length} propiedades seleccionadas esta semana.
        </p>
      </section>
      <PropertySearch />
    </main>
  );
}
