import { brand } from "@/config/brand";
import { getAllTestimonios } from "@/lib/testimonios-content";
import { cantidadResenasRedondeada } from "@/lib/testimonios";

const formatoCalificacion = new Intl.NumberFormat("es-AR", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

/**
 * Testimonios de Google Maps, diseño de costo cero: NO llama a la API de
 * Google Places. La calificación general es un valor de configuración
 * (brand.googleReviews) y las reseñas puntuales son contenido editable
 * desde /admin (src/content/testimonios/*.md). Sin foto de perfil, por
 * decisión de protección de datos personales.
 * Ver src/config/plan.ts → features.testimoniosGoogleMaps.
 */
export function GoogleReviews() {
  const testimonios = getAllTestimonios();
  if (testimonios.length === 0) return null;

  const { calificacion, totalResenas, perfilUrl } = brand.googleReviews;

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-8 flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-3">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Lo que dicen nuestros clientes
        </h2>
        <a
          href={perfilUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-slate-500 hover:text-slate-900"
        >
          {formatoCalificacion.format(calificacion)} ★ / +
          {cantidadResenasRedondeada(totalResenas)} reseñas en Google
        </a>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonios.map((t) => (
          <article
            key={t.id}
            className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5"
          >
            <p aria-hidden="true" className="text-amber-500">
              {"★".repeat(t.calificacion)}
              {"☆".repeat(5 - t.calificacion)}
            </p>
            <span className="sr-only">{t.calificacion} de 5 estrellas</span>
            <p className="mt-3 flex-1 text-sm text-slate-600">
              &ldquo;{t.texto}&rdquo;
            </p>
            <p className="mt-4 text-sm font-medium text-slate-900">
              {t.nombre}
            </p>
            <a
              href={t.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 text-xs font-medium text-[color:var(--brand-acento)] hover:underline"
            >
              Ver en Google Maps →
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
