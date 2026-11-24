import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsappFloating } from "@/components/WhatsappFloating";
import { FavoritesFloating } from "@/components/FavoritesFloating";
import { ChatbotWidget } from "@/components/chatbot/ChatbotWidget";
import { getAllProperties } from "@/lib/properties-content";
import { plan } from "@/config/plan";

// Layout del sitio público (home, propiedades, blog, contacto, legales).
// Las páginas fuera de este grupo (ej. /landing-ads) no lo heredan.
export default function SitioLayout({ children }: { children: React.ReactNode }) {
  const properties = getAllProperties();

  return (
    <>
      <Header />
      <div className="flex flex-1 flex-col">{children}</div>
      <Footer />
      <WhatsappFloating />
      {plan.features.favoritos && <FavoritesFloating properties={properties} />}
      <ChatbotWidget properties={properties} />
    </>
  );
}
