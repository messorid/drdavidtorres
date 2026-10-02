"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/icon";
import { WhatsAppButton } from "@/components/ui/cta-button";
import { site } from "@/lib/site";
import { navServices } from "@/lib/services";

/** `label` va en la barra de escritorio, donde el espacio es escaso;
 *  `longLabel` en el menú móvil, que es una lista vertical y sí lo admite. */
const navLinks = [
  { href: "/servicios", label: "Servicios", longLabel: "Todos los servicios" },
  ...navServices.map((s) => ({
    href: `/servicios/${s.slug}`,
    label: s.navLabel,
    longLabel: s.name,
  })),
  // Va con etiqueta corta en la barra y con el apellido completo en el menú
  // móvil: «Productos» a secas no dice a quién va dirigido.
  {
    href: "/productos",
    label: "Productos",
    longLabel: "Productos para colegas",
  },
  {
    href: "/sobre-el-doctor",
    label: "Sobre el doctor",
    longLabel: "Sobre el doctor",
  },
  { href: "/contacto", label: "Contacto", longLabel: "Contacto" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="flex min-w-0 cursor-pointer items-center gap-3 py-1"
          aria-label={`${site.name} — ir al inicio`}
        >
          {/* Isotipo del manual de marca, variante marino para fondo claro.
              `priority` porque entra en el primer pintado de cada página. */}
          <Image
            src="/marca/isotipo-marino.png"
            alt=""
            width={494}
            height={256}
            priority
            className="h-10 w-auto shrink-0 sm:h-11"
          />
          <span className="leading-tight">
            <span className="block font-heading text-base font-semibold whitespace-nowrap text-ink">
              {site.shortName}
            </span>
            <span className="block text-xs text-muted">
              Oftalmólogo · Ocularista
            </span>
          </span>
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`inline-flex min-h-[44px] cursor-pointer items-center rounded-base px-3 text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                      active
                        ? "bg-surface text-primary-dark"
                        : "text-muted hover:bg-surface hover:text-primary-dark"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {/* Aquí había un botón de llamada para móvil. Sobra: por debajo de
              `md` la barra fija inferior ya ofrece "Llamar" de forma
              permanente, y dos accesos al mismo teléfono en la misma
              pantalla solo quitan aire a la cabecera. */}
          <span className="hidden sm:contents">
            <WhatsAppButton label="WhatsApp" />
          </span>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-movil"
            className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-line text-ink transition-colors duration-200 hover:bg-surface lg:hidden"
          >
            <Icon name={open ? "close" : "menu"} className="h-6 w-6" />
            <span className="sr-only">
              {open ? "Cerrar menú" : "Abrir menú"}
            </span>
          </button>
        </div>
      </div>

      <div
        id="menu-movil"
        hidden={!open}
        className="border-t border-line bg-white lg:hidden"
      >
        <nav
          aria-label="Principal móvil"
          className="mx-auto max-w-6xl px-4 py-3 sm:px-6"
        >
          <ul className="flex flex-col">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`flex min-h-[48px] cursor-pointer items-center rounded-base px-3 font-medium transition-colors duration-200 ${
                      active
                        ? "bg-surface text-primary-dark"
                        : "text-ink hover:bg-surface"
                    }`}
                  >
                    {link.longLabel}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-3 sm:hidden">
            <WhatsAppButton
              size="md"
              className="w-full"
              label="Escribir por WhatsApp"
            />
          </div>
        </nav>
      </div>
    </header>
  );
}
