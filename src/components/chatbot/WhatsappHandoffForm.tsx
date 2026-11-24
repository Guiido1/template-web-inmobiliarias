"use client";

import { useState } from "react";
import { brand } from "@/config/brand";
import { whatsappLink } from "@/lib/whatsapp";

/**
 * Formulario corto para pasar la conversación a WhatsApp con contexto ya
 * armado — evita que la persona del otro lado (o el cliente) tenga que
 * reconstruir a mano lo que ya se habló en el chat.
 */
export function WhatsappHandoffForm({
  titulo,
  resumenInicial,
  urgente = false,
  onDescartar,
}: {
  titulo: string;
  resumenInicial: string;
  urgente?: boolean;
  onDescartar?: () => void;
}) {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [resumen, setResumen] = useState(resumenInicial);

  function enviar() {
    const partes = [
      `Hola! Soy ${nombre.trim() || "un interesado"}, vengo del chat del sitio de ${brand.nombre}.`,
      resumen.trim() && `Te cuento qué estoy buscando: ${resumen.trim()}`,
      telefono.trim() && `Mi teléfono de contacto: ${telefono.trim()}`,
    ].filter(Boolean);

    window.open(whatsappLink(partes.join(" ")), "_blank");
  }

  return (
    <div
      className={`space-y-2 rounded-xl border p-3 ${
        urgente
          ? "border-green-600/40 bg-green-50"
          : "border-slate-200 bg-slate-50"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-medium text-slate-700">{titulo}</p>
        {onDescartar && (
          <button
            onClick={onDescartar}
            aria-label="Cerrar sugerencia"
            className="shrink-0 text-xs text-slate-400 hover:text-slate-600"
          >
            ✕
          </button>
        )}
      </div>

      <input
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Tu nombre"
        className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-sm"
      />
      <input
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
        placeholder="Teléfono (opcional)"
        className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-sm"
      />
      <textarea
        value={resumen}
        onChange={(e) => setResumen(e.target.value)}
        rows={2}
        placeholder="¿Qué estás buscando?"
        className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-sm"
      />

      <button
        onClick={enviar}
        className="w-full rounded-full bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
      >
        Continuar por WhatsApp
      </button>
    </div>
  );
}
