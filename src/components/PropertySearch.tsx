"use client";

import { useMemo, useState } from "react";
import { Property, getZonas, getTipos, rangoSlider, formatearMonto } from "@/lib/properties";
import { ComparadorPropiedades } from "@/components/ComparadorPropiedades";
import { PropertyCard } from "@/components/PropertyCard";

const PASO_PRECIO = 10000;

const MAX_COMPARACION = 3;

// Recibe las propiedades ya cargadas por el server component que la use
// (home o /propiedades), porque leer el contenido (fs) no puede pasar en
// un componente de cliente como este.
export function PropertySearch({
  properties,
  habilitarComparador = false,
}: {
  properties: Property[];
  // Solo se muestra desde /propiedades (ver src/config/plan.ts →
  // features.comparadorPropiedades); en la home no tiene sentido.
  habilitarComparador?: boolean;
}) {
  const zonas = useMemo(() => getZonas(properties), [properties]);
  const tipos = useMemo(() => getTipos(properties), [properties]);
  // Slider solo sobre propiedades en USD (no tiene sentido mezclar monedas).
  const rango = useMemo(
    () =>
      rangoSlider(
        properties.filter((p) => p.moneda === "USD").map((p) => p.precio),
        PASO_PRECIO
      ),
    [properties]
  );

  const [zona, setZona] = useState<string>("Todas");
  const [tipo, setTipo] = useState<string>("Todos");
  const [precioMax, setPrecioMax] = useState<number>(rango.max);
  const [seleccionadas, setSeleccionadas] = useState<string[]>([]);

  function alternarSeleccion(id: string) {
    setSeleccionadas((actual) => {
      if (actual.includes(id)) {
        return actual.filter((x) => x !== id);
      }
      if (actual.length >= MAX_COMPARACION) {
        return actual;
      }
      return [...actual, id];
    });
  }

  const filtradas = useMemo(() => {
    return properties.filter((p: Property) => {
      if (zona !== "Todas" && p.zona !== zona) return false;
      if (tipo !== "Todos" && p.tipo !== tipo) return false;
      if (p.moneda === "USD" && p.precio > precioMax) return false;
      return true;
    });
  }, [properties, zona, tipo, precioMax]);

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-8 flex flex-wrap gap-4">
        <select
          aria-label="Zona"
          value={zona}
          onChange={(e) => setZona(e.target.value)}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
        >
          <option>Todas</option>
          {zonas.map((z) => (
            <option key={z}>{z}</option>
          ))}
        </select>

        <select
          aria-label="Tipo de propiedad"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
        >
          <option>Todos</option>
          {tipos.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>

        {rango.max > 0 && (
        <label className="flex items-center gap-2 text-sm text-slate-600">
          Hasta {formatearMonto(precioMax, "USD")}
          <input
            type="range"
            min={rango.min}
            max={rango.max}
            step={PASO_PRECIO}
            value={precioMax}
            onChange={(e) => setPrecioMax(Number(e.target.value))}
          />
        </label>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtradas.map((p) => {
          const estaSeleccionada = seleccionadas.includes(p.id);
          return (
            <PropertyCard
              key={p.id}
              property={p}
              acciones={
                habilitarComparador && (
                  <label className="flex items-center gap-2 text-sm text-slate-600">
                    <input
                      type="checkbox"
                      checked={estaSeleccionada}
                      disabled={!estaSeleccionada && seleccionadas.length >= MAX_COMPARACION}
                      onChange={() => alternarSeleccion(p.id)}
                      className="h-4 w-4 rounded border-slate-300"
                    />
                    Comparar
                  </label>
                )
              }
            />
          );
        })}

        {filtradas.length === 0 && (
          <p className="col-span-full text-sm text-slate-500">
            No hay propiedades que coincidan con estos filtros.
          </p>
        )}
      </div>

      {habilitarComparador && (
        <ComparadorPropiedades
          properties={properties}
          seleccionadas={seleccionadas}
          onQuitar={(id) =>
            setSeleccionadas((actual) => actual.filter((x) => x !== id))
          }
          onLimpiar={() => setSeleccionadas([])}
          max={MAX_COMPARACION}
        />
      )}
    </section>
  );
}
