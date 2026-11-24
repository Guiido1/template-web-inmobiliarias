import { brand } from "@/config/brand";
import { plan } from "@/config/plan";
import { whatsappLink } from "@/lib/whatsapp";

/**
 * Botón flotante de WhatsApp, visible en todas las páginas. Plan base
 * (ver src/config/plan.ts → features.whatsappFlotante).
 */
export function WhatsappFloating() {
  if (!plan.features.whatsappFlotante) return null;

  return (
    <a
      href={whatsappLink(`Hola ${brand.nombre}, quiero más información.`)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribinos por WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white shadow-lg transition-transform hover:scale-105"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-7 w-7"
        aria-hidden="true"
      >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
      </svg>
    </a>
  );
}
