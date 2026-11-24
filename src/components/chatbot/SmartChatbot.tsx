"use client";

import { FormEvent, useRef, useState } from "react";
import { brand } from "@/config/brand";
import { whatsappLink } from "@/lib/whatsapp";

type Mensaje = { role: "user" | "assistant"; content: string };

const MAX_MENSAJES = 16; // debe coincidir con el tope del endpoint (ver api/chat/route.ts)

/**
 * Chatbot con Claude Haiku — texto libre, catálogo completo como contexto
 * (ver src/app/api/chat/route.ts). Exclusivo de clientes con mensualidad
 * (plan.chatbotTier === "inteligente").
 */
export function SmartChatbot() {
  const [mensajes, setMensajes] = useState<Mensaje[]>([
    {
      role: "assistant",
      content: `¡Hola! Soy el asistente de ${brand.nombre}. Contame qué estás buscando (zona, tipo de propiedad, presupuesto) y te ayudo.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const limiteAlcanzado = mensajes.length >= MAX_MENSAJES;

  async function enviar(e: FormEvent) {
    e.preventDefault();
    const texto = input.trim();
    if (!texto || cargando || limiteAlcanzado) return;

    const nuevosMensajes: Mensaje[] = [...mensajes, { role: "user", content: texto }];
    setMensajes(nuevosMensajes);
    setInput("");
    setError(null);
    setCargando(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: nuevosMensajes }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "No pudimos responder, probá de nuevo.");
        return;
      }

      setMensajes((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setError("No pudimos conectar con el chatbot. Probá de nuevo en un momento.");
    } finally {
      setCargando(false);
      requestAnimationFrame(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
      });
    }
  }

  return (
    <div className="flex h-full flex-col">
      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4 text-sm">
        {mensajes.map((m, i) => (
          <p
            key={i}
            className={
              m.role === "user"
                ? "ml-auto max-w-[85%] rounded-2xl bg-[var(--brand-primario)]/10 px-4 py-2 text-right text-slate-800"
                : "mr-auto max-w-[85%] rounded-2xl bg-slate-100 px-4 py-2 text-slate-700"
            }
          >
            {m.content}
          </p>
        ))}
        {cargando && (
          <p className="mr-auto max-w-[85%] rounded-2xl bg-slate-100 px-4 py-2 text-slate-400">
            Escribiendo…
          </p>
        )}
        {error && <p className="text-xs text-red-500">{error}</p>}
        {limiteAlcanzado && (
          <div className="space-y-2 rounded-xl border border-slate-200 p-3">
            <p className="text-slate-600">
              Llegamos al límite de esta conversación. Sigamos por WhatsApp para coordinar.
            </p>
            <a
              href={whatsappLink(`Hola ${brand.nombre}, vengo del chat del sitio.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-full bg-green-600 px-4 py-2 text-center font-medium text-white"
            >
              Hablar por WhatsApp
            </a>
          </div>
        )}
      </div>

      <form onSubmit={enviar} className="flex gap-2 border-t border-slate-200 p-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={cargando || limiteAlcanzado}
          placeholder="Escribí tu consulta…"
          className="flex-1 rounded-full border border-slate-200 px-4 py-2 text-sm disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={cargando || limiteAlcanzado || !input.trim()}
          className="rounded-full bg-[var(--brand-primario)] px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
