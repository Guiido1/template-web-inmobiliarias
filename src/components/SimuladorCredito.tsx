"use client";

import { useMemo, useState } from "react";
import { brand } from "@/config/brand";
import { calcularCuotaFrancesa } from "@/lib/mortgage";

const formatoUSD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

/**
 * Simulador simple de crédito hipotecario (sistema francés, cuota fija),
 * 100% en el navegador — sin API externa ni backend (ver src/config/plan.ts
 * → features.simuladorCreditoHipotecario). Tasa pre-cargada desde
 * brand.ts, editable por el visitante.
 */
export function SimuladorCredito({ precioPropiedad }: { precioPropiedad: number }) {
  const [porcentajeFinanciado, setPorcentajeFinanciado] = useState(70);
  const [tasaAnual, setTasaAnual] = useState(
    brand.simuladorCredito.tasaAnualPorcentaje
  );
  const [plazoAnios, setPlazoAnios] = useState(20);

  const montoAFinanciar = (precioPropiedad * porcentajeFinanciado) / 100;

  const cuotaMensual = useMemo(
    () =>
      calcularCuotaFrancesa({
        montoAFinanciar,
        tasaAnualPorcentaje: tasaAnual,
        plazoAnios,
      }),
    [montoAFinanciar, tasaAnual, plazoAnios]
  );

  return (
    <section className="mt-10 rounded-2xl border border-slate-200 p-6">
      <h2 className="text-lg font-semibold text-slate-900">
        Simulador de crédito hipotecario
      </h2>
      <p className="mt-1 text-xs text-slate-500">
        Estimación orientativa, no sustituye la oferta de un banco.
      </p>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm text-slate-600">
          % a financiar ({porcentajeFinanciado}%)
          <input
            type="range"
            min={10}
            max={100}
            step={5}
            value={porcentajeFinanciado}
            onChange={(e) => setPorcentajeFinanciado(Number(e.target.value))}
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-slate-600">
          Tasa anual (editable)
          <input
            type="number"
            min={0}
            max={100}
            step={0.1}
            value={tasaAnual}
            onChange={(e) => setTasaAnual(Number(e.target.value))}
            className="rounded-lg border border-slate-200 px-3 py-2"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-slate-600 sm:col-span-2">
          Plazo ({plazoAnios} años)
          <input
            type="range"
            min={5}
            max={30}
            step={1}
            value={plazoAnios}
            onChange={(e) => setPlazoAnios(Number(e.target.value))}
          />
        </label>
      </div>

      <div className="mt-6 rounded-xl bg-slate-50 p-5">
        <p className="text-xs uppercase tracking-wide text-slate-400">
          Monto a financiar: {formatoUSD.format(montoAFinanciar)}
        </p>
        <p className="mt-1 text-2xl font-semibold text-slate-900">
          {formatoUSD.format(cuotaMensual)}{" "}
          <span className="text-sm font-normal text-slate-500">por mes</span>
        </p>
      </div>
    </section>
  );
}
