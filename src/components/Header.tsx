import Link from "next/link";
import { brand } from "@/config/brand";
import { MenuMobile } from "@/components/MenuMobile";

export const LINKS_NAVEGACION = [
  { href: "/propiedades", label: "Propiedades" },
  { href: "/blog", label: "Blog" },
  { href: "/contacto", label: "Contacto" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="font-display text-lg font-semibold tracking-tight">
          {brand.nombre}
        </Link>
        <nav
          aria-label="Principal"
          className="hidden gap-8 text-sm font-medium text-slate-600 sm:flex"
        >
          {LINKS_NAVEGACION.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-slate-900">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/contacto"
            className="rounded-full bg-[color:var(--brand-primario)] px-4 py-2 text-sm font-medium text-white"
          >
            Consultar
          </Link>
          <MenuMobile links={LINKS_NAVEGACION} />
        </div>
      </div>
    </header>
  );
}
