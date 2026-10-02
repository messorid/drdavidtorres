import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { site } from "@/lib/site";
import { services } from "@/lib/services";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    // pb-24 en movil reserva el alto de la barra fija de contacto, que de
    // otro modo tapa el aviso legal del final.
    <footer className="border-t border-line bg-surface pb-24 md:pb-0">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 text-center sm:px-6 md:grid-cols-3 md:text-left lg:py-16">
        <div>
          <p className="font-heading text-lg font-semibold text-ink">
            {site.name}
          </p>
          <p className="mt-1 text-sm text-muted">{site.role}</p>

          <ul className="mt-5 flex flex-col items-center space-y-1 text-sm md:items-start md:space-y-3">
            <li>
              <a
                href={`tel:${site.phone}`}
                data-analytics="phone-click"
                className="inline-flex min-h-[44px] cursor-pointer items-center gap-2.5 font-medium text-primary transition-colors duration-200 hover:text-primary-dark"
              >
                <Icon name="phone" className="h-5 w-5 shrink-0" />
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex min-h-[44px] cursor-pointer items-center gap-2.5 font-medium break-all text-primary transition-colors duration-200 hover:text-primary-dark"
              >
                <Icon name="mail" className="h-5 w-5 shrink-0" />
                {site.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-heading text-sm font-semibold tracking-wide text-ink uppercase">
            <Link
              href="/servicios"
              className="inline-flex min-h-[44px] cursor-pointer items-center transition-colors duration-200 hover:text-primary-dark"
            >
              Servicios
            </Link>
          </h2>
          <ul className="mt-4 flex flex-col items-center md:items-start">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/servicios/${s.slug}`}
                  className="inline-flex min-h-[44px] cursor-pointer items-center text-sm text-muted transition-colors duration-200 hover:text-primary-dark"
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-heading text-sm font-semibold tracking-wide text-ink uppercase">
            Atención
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            {site.sedes.map((sede) => (
              <li
                key={sede.id}
                className="flex flex-col items-center gap-1 md:flex-row md:items-start md:gap-2.5"
              >
                <Icon
                  name="mapPin"
                  className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                />
                <span>
                  <span className="block font-medium text-ink">
                    {sede.ciudad} — {sede.horario}
                  </span>
                  {sede.lugar}
                  {sede.direccion ? `, ${sede.direccion}` : ""}
                </span>
              </li>
            ))}
          </ul>

          <ul className="mt-6 flex flex-col items-center md:items-start">
            <li>
              <Link
                href="/productos"
                className="inline-flex min-h-[44px] cursor-pointer items-center text-sm text-muted underline underline-offset-4 transition-colors duration-200 hover:text-primary-dark"
              >
                Productos para colegas
              </Link>
            </li>
            <li>
              <Link
                href="/privacidad"
                className="inline-flex min-h-[44px] cursor-pointer items-center text-sm text-muted underline underline-offset-4 transition-colors duration-200 hover:text-primary-dark"
              >
                Política de privacidad
              </Link>
            </li>
            <li>
              <Link
                href="/cookies"
                className="inline-flex min-h-[44px] cursor-pointer items-center text-sm text-muted underline underline-offset-4 transition-colors duration-200 hover:text-primary-dark"
              >
                Política de cookies
              </Link>
            </li>
            <li>
              <Link
                href="/accesibilidad"
                className="inline-flex min-h-[44px] cursor-pointer items-center text-sm text-muted underline underline-offset-4 transition-colors duration-200 hover:text-primary-dark"
              >
                Accesibilidad
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
          <p className="measure mx-auto text-center text-xs leading-relaxed text-muted md:mx-0 md:text-left">
            La información publicada en este sitio tiene fines orientativos y no
            sustituye la consulta médica presencial, el diagnóstico ni el
            tratamiento indicado por un profesional. Ante una pérdida de visión
            súbita, dolor ocular intenso o traumatismo del ojo, acude a
            emergencia sin esperar una cita.
          </p>
          <p className="mt-4 text-center text-xs text-muted md:text-left">
            © {year} {site.name}. Todos los derechos reservados.
            {/* PENDIENTE CLIENTE: número de colegiatura / MPPS. */}
          </p>
        </div>
      </div>
    </footer>
  );
}
