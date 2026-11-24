// Rate limiter simple en memoria, por IP. Pensado como freno básico contra
// abuso del endpoint de IA (/api/chat), no como garantía dura: en Netlify
// Functions cada instancia tiene su propia memoria (se reinicia en cold
// starts, no se comparte entre regiones/instancias concurrentes), así que
// esto frena el caso común (alguien clickeando rápido o un script simple)
// pero no a un atacante decidido con múltiples IPs. El tope real de costo
// lo dan el límite de mensajes por conversación y max_tokens en el propio
// endpoint (ver src/app/api/chat/route.ts) — eso sí es determinístico.

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

/** true = permitido, false = se pasó del límite para esta ventana de tiempo. */
export function checkRateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number }
): boolean {
  const ahora = Date.now();

  // Limpieza de ventanas vencidas para que el Map no crezca sin límite
  // en instancias que quedan vivas mucho tiempo.
  if (buckets.size > 5000) {
    for (const [k, b] of buckets) if (ahora > b.resetAt) buckets.delete(k);
  }

  const bucket = buckets.get(key);

  if (!bucket || ahora > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: ahora + windowMs });
    return true;
  }

  if (bucket.count >= limit) {
    return false;
  }

  bucket.count += 1;
  return true;
}
