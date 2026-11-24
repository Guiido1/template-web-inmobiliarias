import { NextRequest, NextResponse } from "next/server";
import { brand } from "@/config/brand";
import { plan } from "@/config/plan";
import { estaDisponible } from "@/lib/properties";
import { getAllProperties } from "@/lib/properties-content";
import { checkRateLimit } from "@/lib/rateLimiter";
import {
  MAX_MENSAJES_POR_CONVERSACION,
  MAX_CARACTERES_POR_MENSAJE,
  MAX_TOKENS_RESPUESTA,
} from "@/lib/chatbotConfig";

export const runtime = "nodejs";

// Topes de costo/abuso que de verdad limitan el gasto máximo posible por
// conversación — compartidos con la UI vía chatbotConfig.ts.
const RATE_LIMIT = { limit: 15, windowMs: 60_000 }; // 15 requests/min por IP (best-effort, ver rateLimiter.ts)

type ChatMessage = { role: "user" | "assistant"; content: string };

function construirSystemPrompt(): string {
  const catalogo = getAllProperties()
    .filter(estaDisponible)
    .map((p) => ({
    titulo: p.titulo,
    url: `/propiedades/${p.id}`,
    tipo: p.tipo,
    operacion: p.operacion,
    estado: p.estado,
    zona: p.zona,
    precio: p.precio,
    moneda: p.moneda,
    precio_es_mensual: p.operacion === "Alquiler",
    expensas_ars: p.expensas,
    ambientes: p.ambientes,
    dormitorios: p.dormitorios,
    banos: p.banos,
    cocheras: p.cocheras,
    m2: p.m2,
    descripcion: p.descripcion,
    caracteristicas: p.caracteristicas,
  }));

  return `Sos el asistente virtual de ${brand.nombre}, una inmobiliaria en ${brand.zona}.

Catálogo real y completo de propiedades disponibles (JSON):
${JSON.stringify(catalogo)}

Reglas estrictas:
- Respondé SOLO con información de este catálogo. Nunca inventes propiedades, precios, direcciones ni características que no estén acá.
- Si no hay nada que coincida con lo que pide la persona, decilo con honestidad y ofrecé las opciones más parecidas del catálogo.
- Sé breve y concreto (2-4 oraciones), en español rioplatense, tono profesional pero cercano.
- Cuando la persona muestre interés real en una propiedad puntual (quiere visitarla, preguntarle precio final, coordinar algo), invitala a continuar por WhatsApp (${brand.contacto.whatsapp ? "el botón de WhatsApp del sitio" : "el formulario de contacto"}), no intentes cerrar la operación vos mismo.
- No dés asesoramiento legal, impositivo ni financiero específico (hipotecas, escrituras, impuestos) más allá de derivar a que lo consulten con un profesional.`;
}

export async function POST(req: NextRequest) {
  // El endpoint solo existe para clientes con chatbot inteligente: en un
  // sitio "basico" responde 404 aunque la API key esté cargada por error
  // (la key es compartida entre clientes y el costo lo paga el estudio).
  if (plan.chatbotTier !== "inteligente") {
    return NextResponse.json({ error: "No disponible." }, { status: 404 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "El chatbot inteligente no está configurado en este sitio." },
      { status: 503 }
    );
  }

  // Rate limit best-effort por IP (ver rateLimiter.ts: no es una garantía
  // dura en serverless, es una capa más, no la única).
  const ip =
    req.headers.get("x-nf-client-connection-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "desconocida";
  if (!checkRateLimit(ip, RATE_LIMIT)) {
    return NextResponse.json(
      { error: "Demasiadas consultas en poco tiempo. Probá de nuevo en un minuto." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Body inválido." }, { status: 400 });
  }

  const messages = (body as { messages?: unknown }).messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: "Faltan mensajes." }, { status: 400 });
  }

  // Tope duro de longitud de conversación: acota el costo máximo posible
  // por sesión, independientemente de cualquier otro control.
  if (messages.length > MAX_MENSAJES_POR_CONVERSACION) {
    return NextResponse.json(
      {
        error:
          "Esta conversación ya es bastante larga — te recomendamos seguir por WhatsApp para coordinar directo.",
      },
      { status: 400 }
    );
  }

  const mensajesValidos: ChatMessage[] = [];
  for (const m of messages) {
    const candidato = m as Partial<ChatMessage>;
    const rolValido = candidato.role === "user" || candidato.role === "assistant";
    const contenidoValido = typeof candidato.content === "string";

    if (typeof m !== "object" || m === null || !rolValido || !contenidoValido) {
      return NextResponse.json({ error: "Mensaje inválido." }, { status: 400 });
    }

    mensajesValidos.push({
      role: candidato.role as "user" | "assistant",
      content: (candidato.content as string).slice(0, MAX_CARACTERES_POR_MENSAJE),
    });
  }

  try {
    const respuesta = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-5-5",
        max_tokens: MAX_TOKENS_RESPUESTA,
        system: construirSystemPrompt(),
        messages: mensajesValidos,
      }),
    });

    if (!respuesta.ok) {
      return NextResponse.json(
        { error: "El chatbot no está disponible en este momento." },
        { status: 502 }
      );
    }

    const data = await respuesta.json();
    const texto = data?.content?.[0]?.text;

    if (typeof texto !== "string") {
      return NextResponse.json(
        { error: "El chatbot no está disponible en este momento." },
        { status: 502 }
      );
    }

    return NextResponse.json({ reply: texto });
  } catch {
    return NextResponse.json(
      { error: "El chatbot no está disponible en este momento." },
      { status: 502 }
    );
  }
}
