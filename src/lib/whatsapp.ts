import { brand } from "@/config/brand";

/** Genera un link de WhatsApp con mensaje pre-armado, para formularios y CTAs. */
export function whatsappLink(mensaje: string) {
  const texto = encodeURIComponent(mensaje);
  return `https://wa.me/${brand.contacto.whatsapp}?text=${texto}`;
}
