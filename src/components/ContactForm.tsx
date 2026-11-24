"use client";

import { FormEvent, useState } from "react";
import { brand } from "@/config/brand";
import { whatsappLink } from "@/lib/whatsapp";

// Topes de saneo antes de armar el mensaje de WhatsApp (ver estándares de
// seguridad del proyecto: "sanitización de inputs antes de usarlos en
// links de WhatsApp").
const MAX_NOMBRE = 80;
const MAX_CONSULTA = 600;

// Este formulario no tiene backend propio: solo abre WhatsApp en el
// dispositivo de quien lo llena, no manda nada a ningún servidor nuestro.
// Por eso un bot que lo complete automáticamente no logra nada por sí
// solo (no hay email ni base de datos del lado nuestro para saturar). Las
// dos protecciones de abajo son, igual, buena práctica y lo que ya
// documentan los estándares de seguridad del proyecto — si en el futuro
// este formulario pasa a tener un backend propio (ej. manda un email),
// agregar ahí el mismo patrón de rate limit por IP que usa el chatbot
// (ver src/lib/rateLimiter.ts) además de esto.
const CLAVE_ULTIMO_ENVIO = "contacto_ultimo_envio";
const VENTANA_ENTRE_ENVIOS_MS = 20_000;

export function ContactForm() {
  const [nombre, setNombre] = useState("");
  const [consulta, setConsulta] = useState("");
  // Honeypot: campo oculto para personas, visible/completable para bots
  // que llenan formularios de forma automática. Si llega completo, es spam.
  const [trampa, setTrampa] = useState("");
  const [avisoSpam, setAvisoSpam] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setAvisoSpam(false);

    // Honeypot activado: no abrimos WhatsApp, pero tampoco mostramos un
    // error que delate el mecanismo — simplemente no pasa nada.
    if (trampa.trim() !== "") return;

    // Rate limit básico por navegador (ver nota arriba: no sustituye un
    // control server-side si algún día este form manda datos a un backend
    // propio, pero frena el reenvío accidental o un script simple).
    const ultimoEnvio = Number(localStorage.getItem(CLAVE_ULTIMO_ENVIO) ?? 0);
    if (Date.now() - ultimoEnvio < VENTANA_ENTRE_ENVIOS_MS) {
      setAvisoSpam(true);
      return;
    }
    localStorage.setItem(CLAVE_ULTIMO_ENVIO, String(Date.now()));

    const nombreSaneado = nombre.trim().slice(0, MAX_NOMBRE);
    const consultaSaneada = consulta.trim().slice(0, MAX_CONSULTA);

    const mensaje = `Hola, soy ${nombreSaneado || "un interesado"}. ${
      consultaSaneada || "Quisiera más información sobre sus propiedades."
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
          maxLength={MAX_NOMBRE}
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
          maxLength={MAX_CONSULTA}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          placeholder={`Me interesa una propiedad en ${brand.zona}...`}
        />
      </div>

      {/* Honeypot: oculto visualmente y fuera del tab order, nunca
          type="hidden" (algunos bots lo ignoran por completo). */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden">
        <label htmlFor="sitio_web">No completar este campo</label>
        <input
          id="sitio_web"
          name="sitio_web"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={trampa}
          onChange={(e) => setTrampa(e.target.value)}
        />
      </div>

      {avisoSpam && (
        <p className="text-xs text-slate-500">
          Ya enviaste una consulta hace un momento — esperá unos segundos y
          probá de nuevo.
        </p>
      )}

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
