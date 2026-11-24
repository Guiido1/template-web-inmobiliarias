import type { Metadata } from "next";
import "./globals.css";
import { brand } from "@/config/brand";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Analytics } from "@/components/Analytics";
import { OrganizationStructuredData } from "@/components/StructuredData";
import { WhatsappFloating } from "@/components/WhatsappFloating";
import { ChatbotWidget } from "@/components/chatbot/ChatbotWidget";
import { getAllProperties } from "@/lib/properties-content";

export const metadata: Metadata = {
  title: brand.seo.tituloDefault,
  description: brand.seo.descripcionDefault,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className="h-full antialiased"
      style={
        {
          "--brand-primario": brand.colorPrimario,
          "--brand-acento": brand.colorAcento,
        } as React.CSSProperties
      }
    >
      <body className="min-h-full flex flex-col">
        <OrganizationStructuredData />
        <Analytics />
        <Header />
        {children}
        <Footer />
        <WhatsappFloating />
        <ChatbotWidget properties={getAllProperties()} />
      </body>
    </html>
  );
}
