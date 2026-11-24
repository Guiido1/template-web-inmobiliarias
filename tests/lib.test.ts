// Tests de la lógica pura del template (sin Next ni React). Corren con el
// runner nativo de Node: `npm test`. Importan con extensión .ts porque
// Node ejecuta TypeScript directo (por eso tests/ está excluido del
// tsconfig de Next).
import { test } from "node:test";
import assert from "node:assert/strict";
import { calcularCuotaFrancesa } from "../src/lib/mortgage.ts";
import { cantidadResenasRedondeada } from "../src/lib/testimonios.ts";
import {
  estaDisponible,
  formatearPrecio,
  normalizarPropiedad,
  ordenarPropiedades,
  rangoSlider,
} from "../src/lib/properties.ts";

test("cuota francesa: caso conocido", () => {
  // 100.000 a 12% anual en 1 año = 8.884,88 por mes
  const cuota = calcularCuotaFrancesa({ montoAFinanciar: 100_000, tasaAnualPorcentaje: 12, plazoAnios: 1 });
  assert.ok(Math.abs(cuota - 8884.88) < 0.01);
});

test("cuota francesa: tasa 0 y montos inválidos", () => {
  assert.equal(calcularCuotaFrancesa({ montoAFinanciar: 120_000, tasaAnualPorcentaje: 0, plazoAnios: 10 }), 1000);
  assert.equal(calcularCuotaFrancesa({ montoAFinanciar: 0, tasaAnualPorcentaje: 5, plazoAnios: 10 }), 0);
});

test("reseñas se redondean hacia abajo de a 100", () => {
  assert.equal(cantidadResenasRedondeada(537), 500);
  assert.equal(cantidadResenasRedondeada(99), 0);
  assert.equal(cantidadResenasRedondeada(600), 600);
});

test("el slider de precio siempre llega a la propiedad más cara", () => {
  const { min, max } = rangoSlider([395_000, 655_000], 10_000);
  assert.equal(min, 390_000);
  assert.ok(max >= 655_000);
  assert.equal((max - min) % 10_000, 0);
  assert.deepEqual(rangoSlider([], 10_000), { min: 0, max: 0 });
});

test("propiedades viejas sin campos nuevos: venta en USD disponible", () => {
  const p = normalizarPropiedad("casa", { titulo: "Casa", tipo: "Casa", zona: "Tigre", precio: 100, ambientes: 3, m2: 90 });
  assert.equal(p.operacion, "Venta");
  assert.equal(p.moneda, "USD");
  assert.equal(p.estado, "Disponible");
  assert.ok(estaDisponible(p));
});

test("formato de precio por moneda y operación", () => {
  const venta = formatearPrecio({ precio: 650_000, moneda: "USD", operacion: "Venta" });
  assert.match(venta, /US\$/);
  assert.match(venta, /650\.000/);
  const alquiler = formatearPrecio({ precio: 1_800_000, moneda: "ARS", operacion: "Alquiler" });
  assert.match(alquiler, /1\.800\.000/);
  assert.ok(alquiler.endsWith("/mes"));
});

test("orden: disponibles primero, vendidas al final", () => {
  const base = { tipo: "Casa", zona: "X", ambientes: 1, m2: 1 };
  const lista = ordenarPropiedades([
    normalizarPropiedad("vendida", { ...base, precio: 900, estado: "Vendida" }),
    normalizarPropiedad("barata", { ...base, precio: 100 }),
    normalizarPropiedad("cara", { ...base, precio: 500 }),
  ]);
  assert.deepEqual(lista.map((p) => p.id), ["cara", "barata", "vendida"]);
});
