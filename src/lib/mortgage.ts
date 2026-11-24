// Cálculo de cuota de crédito hipotecario — sistema francés (cuota fija,
// la composición interés/amortización varía mes a mes). 100% matemático en
// el navegador, sin API externa ni backend.

export function calcularCuotaFrancesa({
  montoAFinanciar,
  tasaAnualPorcentaje,
  plazoAnios,
}: {
  montoAFinanciar: number;
  tasaAnualPorcentaje: number;
  plazoAnios: number;
}): number {
  const cantidadCuotas = plazoAnios * 12;
  const tasaMensual = tasaAnualPorcentaje / 100 / 12;

  if (montoAFinanciar <= 0 || cantidadCuotas <= 0) return 0;

  // Tasa 0%: cuota = capital / cantidad de cuotas (sin interés).
  if (tasaMensual === 0) return montoAFinanciar / cantidadCuotas;

  const factor = Math.pow(1 + tasaMensual, cantidadCuotas);
  return (montoAFinanciar * (tasaMensual * factor)) / (factor - 1);
}
