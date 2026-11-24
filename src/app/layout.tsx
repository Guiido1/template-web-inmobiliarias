import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { brand } from "@/config/brand";
import { Analytics } from "@/components/Analytics";
import { OrganizationStructuredData } from "@/components/StructuredData";
import { siteUrl } from "@/lib/site";

// Fuentes autoalojadas por next/font (se descargan en el build, no hay
// request a Google desde el navegador del visitante). Para cambiar la
// tipografía de un cliente, cambiar estos dos imports.
const fuenteTexto = Inter({
  subsets: ["latin"],
  variable: "--font-texto",
  display: "swap",
});
const fuenteTitulos = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-titulos",
  display: "swap",
});

export const metadata: Metadata = {
  // Base para resolver todas las URLs relativas de Open Graph/Twitter
  // (incluida la imagen por defecto de src/app/opengraph-image.tsx).
  metadataBase: new URL(siteUrl),
  title: {
    default: brand.seo.tituloDefault,
    template: `%s | ${brand.nombre}`,
  },
  description: brand.seo.descripcionDefault,
  openGraph: {
    siteName: brand.nombre,
    locale: "es_AR",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

// Layout raíz mínimo (html/body, fuentes, analítica). El header, footer y
// botones flotantes viven en src/app/(sitio)/layout.tsx, para que
// páginas como /landing-ads puedan quedar sin navegación.
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`h-full antialiased ${fuenteTexto.variable} ${fuenteTitulos.variable}`}
      style={
        {
          "--brand-primario": brand.colorPrimario,
          "--brand-acento": brand.colorAcento,
        } as React.CSSProperties
      }
    >
      <body className="flex min-h-full flex-col">
        <OrganizationStructuredData />
        <Analytics />
        {children}
      </body>
    </html>
  );
}
