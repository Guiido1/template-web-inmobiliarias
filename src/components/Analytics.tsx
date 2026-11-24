import Script from "next/script";
import { brand } from "@/config/brand";

/**
 * Google Analytics 4 (gratis). Se activa solo si se cargó un
 * gaMeasurementId en brand.ts (se usa sobre todo en clientes con mensualidad) — sin ID, no se
 * inyecta ningún script. Es la base de los datos para el reporte mensual
 * (visitas, origen de tráfico) que se le manda al cliente junto con el
 * cobro de mantenimiento.
 */
export function Analytics() {
  const { gaMeasurementId } = brand.analytics;
  if (!gaMeasurementId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaMeasurementId}');
        `}
      </Script>
    </>
  );
}
