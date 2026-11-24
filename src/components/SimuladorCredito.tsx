"use client";

import { useMemo, useState } from "react";
import { brand } from "@/config/brand";
import { calcularCuotaFrancesa } from "@/lib/mortgage";
import { formatearMonto } from "@/lib/properties";

/**
 * Simulador simple de crédito hipotecario (sistema francés, cuota fija),
 * 100% en el navegador, sin API externa ni backend (ver src/config/plan.ts
 * → features.simuladorCreditoHipotecario). Tasa y tipo de cambio
 * pre-cargados desde brand.ts, los dos editables por el visitante.
 * Solo se muestra en ventas en USD disponibles.
 */
export function SimuladorCredito({ precioPropiedad }: { precioPropiedad: number }) {
  const [porcentajeFinanciado, setPorcentajeFinanciado] = useState(70);
  const [tasaAnual, setTasaAnual] = useState(brand.simuladorCredito.tasaAnualPorcentaje);
  const [tipoCambio, setTipoCambio] = useState(brand.simuladorCredito.tipoCambioReferencia);
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

  const enPesos = tipoCambio > 0;

  return (
    <section className="mt-10 rounded-2xl border border-slate-200 p-6">
      <h2 className="text-lg font-semibold text-slate-900">
        Simulador de crédito hipotecario
      </h2>
      <p className="mt-1 text-xs text-slate-500">
        Estimación orientativa, no sustituye la oferta de un banco. En
        Argentina los créditos hipotecarios son en pesos ajustados por UVA: la
        cuota inicial se calcula en pesos con el tipo de cambio de referencia
        y después se actualiza con la inflación.
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
          Tasa anual sobre UVA (%)
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

        <label className="flex flex-col gap-1 text-sm text-slate-600">
          Tipo de cambio (pesos por dólar)
          <input
            type="number"
            min={0}
            step={1}
            value={tipoCambio}
            onChange={(e) => setTipoCambio(Number(e.target.value))}
            className="rounded-lg border border-slate-200 px-3 py-2"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-slate-600">
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
          Monto a financiar: {formatearMonto(montoAFinanciar, "USD")}
          {enPesos && ` (${formatearMonto(montoAFinanciar * tipoCambio, "ARS")})`}
        </p>
        <p className="mt-1 text-2xl font-semibold text-slate-900">
          {enPesos
            ? formatearMonto(cuotaMensual * tipoCambio, "ARS")
            : formatearMonto(cuotaMensual, "USD")}{" "}
          <span className="text-sm font-normal text-slate-500">
            {enPesos ? "cuota inicial por mes" : "por mes (equivalente en USD)"}
          </span>
        </p>
      </div>
    </section>
  );
}
