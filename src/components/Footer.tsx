import Link from "next/link";
import { brand } from "@/config/brand";

export function Footer() {
  const { instagram, facebook } = brand.redes;

  return (
    <footer className="mt-auto border-t border-black/5 bg-slate-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 text-sm text-slate-500 sm:grid-cols-3">
        <div>
          <p className="font-display text-base font-semibold text-slate-900">
            {brand.nombre}
          </p>
          <p className="mt-1">{brand.zona}</p>
          {/* Dato legal obligatorio en la publicidad inmobiliaria (ver
              brand.matricula): no sacar ni ocultar. */}
          <p className="mt-3 text-xs">
            Corredor responsable: {brand.matricula.corredor} ·{" "}
            {brand.matricula.numero}
          </p>
        </div>

        <address className="flex flex-col gap-1 not-italic">
          <span>{brand.contacto.direccion}</span>
          <a href={`tel:${brand.contacto.telefono.replace(/\s/g, "")}`} className="hover:text-slate-900">
            {brand.contacto.telefono}
          </a>
          <a href={`mailto:${brand.contacto.email}`} className="hover:text-slate-900">
            {brand.contacto.email}
          </a>
        </address>

        <div className="flex flex-col gap-1 sm:items-end">
          {instagram && (
            <a href={instagram} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900">
              Instagram
            </a>
          )}
          {facebook && (
            <a href={facebook} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900">
              Facebook
            </a>
          )}
          <Link href="/privacidad" className="hover:text-slate-900">
            Política de privacidad
          </Link>
        </div>
      </div>
      <p className="border-t border-black/5 py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} {brand.nombre}. Todos los derechos reservados.
      </p>
    </footer>
  );
}
