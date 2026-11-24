"use client";

import { useState } from "react";
import { plan } from "@/config/plan";
import { Property } from "@/lib/properties";
import { BasicChatbot } from "./BasicChatbot";
import { SmartChatbot } from "./SmartChatbot";

/**
 * Switch entre ambos modos según plan.chatbotTier (src/config/plan.ts).
 * Un solo componente para los dos niveles — nunca se mantienen por
 * separado, ver README.md → "Qué es del template y qué es por cliente".
 *
 * Se posiciona arriba del botón flotante de WhatsApp (bottom-5) para que
 * no se superpongan.
 */
export function ChatbotWidget({ properties }: { properties: Property[] }) {
  const [abierto, setAbierto] = useState(false);

  return (
    <>
      {abierto && (
        <div className="fixed bottom-24 right-5 z-40 flex h-[28rem] w-80 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl sm:w-96">
          <div className="flex items-center justify-between bg-[var(--brand-primario)] px-4 py-3 text-white">
            <span className="text-sm font-medium">Asistente virtual</span>
            <button
              onClick={() => setAbierto(false)}
              aria-label="Cerrar chat"
              className="text-white/80 hover:text-white"
            >
              ✕
            </button>
          </div>
          {plan.chatbotTier === "inteligente" ? (
            <SmartChatbot />
          ) : (
            <BasicChatbot properties={properties} />
          )}
        </div>
      )}

      <button
        onClick={() => setAbierto((v) => !v)}
        aria-label={abierto ? "Cerrar chat" : "Abrir chat"}
        className="fixed bottom-24 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--brand-primario)] text-white shadow-lg transition-transform hover:scale-105"
        style={{ display: abierto ? "none" : "flex" }}
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
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10Z" />
        </svg>
      </button>
    </>
  );
}
