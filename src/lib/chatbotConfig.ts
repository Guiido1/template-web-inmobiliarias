// Constantes compartidas entre el endpoint (src/app/api/chat/route.ts) y la
// UI (src/components/chatbot/SmartChatbot.tsx), para que los topes y las
// etapas de derivación a WhatsApp nunca queden desincronizados entre
// server y cliente. Sin fs ni nada server-only acá: se puede importar
// tanto desde un componente de cliente como desde la API route.

export const MAX_MENSAJES_POR_CONVERSACION = 30; // ~15 idas y vueltas
export const MAX_CARACTERES_POR_MENSAJE = 1000;
export const MAX_TOKENS_RESPUESTA = 350;

// Umbrales (en cantidad total de mensajes, usuario+asistente) para
// empezar a sugerir continuar por WhatsApp — cada vez con más énfasis a
// medida que la conversación avanza, en vez de cortar de golpe al final.
export const UMBRAL_SUGERENCIA_WHATSAPP = 10; // ~5 idas y vueltas: sugerencia liviana, descartable
export const UMBRAL_PRIORITARIO_WHATSAPP = 20; // ~10 idas y vueltas: sugerencia fija, no descartable
