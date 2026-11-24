import { ImageResponse } from "next/og";
import { brand } from "@/config/brand";

// Imagen por defecto al compartir cualquier página del sitio (WhatsApp,
// redes). Se genera en el build con los colores y textos de brand.ts. Las
// fichas de propiedad la reemplazan con su propia foto (generateMetadata).
export const alt = brand.seo.tituloDefault;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: brand.colorPrimario,
          color: "#ffffff",
        }}
      >
        <div style={{ fontSize: 28, color: brand.colorAcento, display: "flex" }}>
          {brand.zona}
        </div>
        <div style={{ fontSize: 72, fontWeight: 700, marginTop: 24, display: "flex" }}>
          {brand.nombre}
        </div>
        <div style={{ fontSize: 36, marginTop: 24, opacity: 0.85, display: "flex" }}>
          {brand.slogan}
        </div>
      </div>
    ),
    size
  );
}
