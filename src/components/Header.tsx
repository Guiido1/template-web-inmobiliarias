import Link from "next/link";
import { brand } from "@/config/brand";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          {brand.nombre}
        </Link>
        <nav className="hidden gap-8 text-sm font-medium text-slate-600 sm:flex">
          <Link href="/propiedades" className="hover:text-slate-900">
            Propiedades
          </Link>
          <Link href="/blog" className="hover:text-slate-900">
            Blog
          </Link>
          <Link href="/contacto" className="hover:text-slate-900">
            Contacto
          </Link>
        </nav>
        <Link
          href="/contacto"
          className="rounded-full bg-[color:var(--brand-primario)] px-4 py-2 text-sm font-medium text-white"
        >
          Consultar
        </Link>
      </div>
    </header>
  );
}
