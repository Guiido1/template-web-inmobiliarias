"use client";

import { FormEvent, useState } from "react";
import { brand } from "@/config/brand";
import { whatsappLink } from "@/lib/whatsapp";

export function ContactForm() {
  const [nombre, setNombre] = useState("");
  const [consulta, setConsulta] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const mensaje = `Hola, soy ${nombre || "un interesado"}. ${
      consulta || "Quisiera más información sobre sus propiedades."
    }`;
    window.open(whatsappLink(mensaje), "_blank");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Nombre
        </label>
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Consulta
        </label>
        <textarea
          value={consulta}
          onChange={(e) => setConsulta(e.target.value)}
          rows={4}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          placeholder={`Me interesa una propiedad en ${brand.zona}...`}
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-full bg-[color:var(--brand-primario)] px-6 py-3 text-sm font-medium text-white"
      >
        Enviar por WhatsApp
      </button>
      {brand.calendarioUrl && (
        <a
          href={brand.calendarioUrl}
          target="_blank"
          rel="noreferrer"
          className="block text-center text-sm font-medium text-slate-500 underline"
        >
          O agendar una videollamada
        </a>
      )}
    </form>
  );
}
