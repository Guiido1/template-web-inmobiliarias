import { PropertySearch } from "@/components/PropertySearch";
import { PropertyCatalogStructuredData } from "@/components/StructuredData";

export const metadata = { title: "Propiedades" };

export default function PropiedadesPage() {
  return (
    <main>
      <PropertyCatalogStructuredData />
      <div className="mx-auto max-w-6xl px-6 pt-16">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
          Propiedades
        </h1>
        <p className="mt-2 text-slate-500">
          Filtrá por zona, tipo y presupuesto.
        </p>
      </div>
      <PropertySearch />
    </main>
  );
}
