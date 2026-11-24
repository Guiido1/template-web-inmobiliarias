"use client";

import { useState } from "react";
import Link from "next/link";

/** Menú hamburguesa para pantallas chicas (en desktop se oculta: sm:hidden). */
export function MenuMobile({ links }: { links: { href: string; label: string }[] }) {
  const [abierto, setAbierto] = useState(false);

  return (
    <div className="sm:hidden">
      <button
        type="button"
        onClick={() => setAbierto((v) => !v)}
        aria-expanded={abierto}
        aria-controls="menu-mobile"
        aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
        className="flex h-10 w-10 items-center justify-center rounded-full text-slate-700 hover:bg-slate-100"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          className="h-6 w-6"
          aria-hidden="true"
        >
          {abierto ? (
            <path d="M6 6l12 12M18 6L6 18" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" />
          )}
        </svg>
      </button>

      {abierto && (
        <nav
          id="menu-mobile"
          aria-label="Principal"
          className="absolute inset-x-0 top-full border-b border-black/5 bg-white px-6 py-4 shadow-lg"
        >
          <ul className="flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setAbierto(false)}
                  className="block rounded-lg px-3 py-3 text-base font-medium text-slate-700 hover:bg-slate-50"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
