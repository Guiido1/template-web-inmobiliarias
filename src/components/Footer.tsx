import { brand } from "@/config/brand";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-black/5 bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-slate-500">
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {brand.nombre}. Todos los derechos reservados.
          </p>
          <div className="flex gap-4">
            <span>{brand.contacto.telefono}</span>
            <span>{brand.contacto.email}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
