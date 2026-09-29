import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { WhatsAppButton } from "@/components/ui/cta-button";
import { navServices } from "@/lib/services";

/**
 * 404.
 *
 * No lleva `metadata`: en esta versión solo `global-not-found.js` admite ese
 * export, y esta página se renderiza dentro del layout raíz, así que hereda
 * su `<title>`. El `noindex` tampoco hace falta a mano — Next inyecta
 * `<meta name="robots" content="noindex">` en toda respuesta 404.
 *
 * Es una página de rescate, no un cartel: quien llega aquí venía buscando
 * algo, y lo más probable es que fuera un servicio. Por eso se le ofrecen
 * los caminos reales en vez de un único «volver al inicio».
 */
export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:py-24">
      <p className="font-heading text-xs font-semibold tracking-[0.22em] text-primary uppercase">
        Error 404
      </p>
      <h1 className="mt-4 text-3xl font-bold text-balance text-ink sm:text-4xl">
        Esta página no existe
      </h1>
      <p className="measure mx-auto mt-4 text-lg text-muted">
        Puede que el enlace esté mal escrito o que la página haya cambiado de
        dirección. Desde aquí puedes seguir a lo que probablemente buscabas.
      </p>

      <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <WhatsAppButton size="lg" label="Escribir por WhatsApp" />
        <Link
          href="/"
          className="inline-flex min-h-[44px] cursor-pointer items-center rounded-base border-2 border-primary px-6 py-2.5 font-heading font-semibold text-primary transition-colors duration-200 hover:bg-surface"
        >
          Volver al inicio
        </Link>
      </div>

      <div className="mt-14 border-t border-line pt-10 text-left">
        <h2 className="text-center font-heading text-xs font-semibold tracking-[0.22em] text-muted uppercase">
          Lo que más se busca
        </h2>
        <ul className="mx-auto mt-6 grid max-w-xl gap-px bg-line sm:grid-cols-2">
          {[
            { href: "/servicios", texto: "Todos los servicios" },
            ...navServices.map((s) => ({
              href: `/servicios/${s.slug}`,
              texto: s.name,
            })),
            { href: "/sobre-el-doctor", texto: "Sobre el doctor" },
            { href: "/contacto", texto: "Sedes y contacto" },
          ].map((enlace) => (
            <li key={enlace.href} className="bg-white">
              <Link
                href={enlace.href}
                className="flex min-h-[52px] cursor-pointer items-center justify-between gap-3 px-4 font-medium text-ink transition-colors duration-200 hover:bg-surface hover:text-primary-dark"
              >
                {enlace.texto}
                <Icon
                  name="arrowRight"
                  className="h-5 w-5 shrink-0 text-primary"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
