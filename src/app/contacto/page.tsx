import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import { Icon } from "@/components/ui/icon";
import { WhatsAppButton } from "@/components/ui/cta-button";
import { JsonLd } from "@/components/json-ld";
import { buildMetadata } from "@/lib/seo";
import { mapsUrl, site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Contacto y citas | Dr. David Torres, Oftalmólogo",
  description:
    "Agenda tu consulta oftalmológica en Barquisimeto o Acarigua por WhatsApp, teléfono o correo con el Dr. David Torres.",
  path: "/contacto",
});

export default function ContactPage() {
  return (
    <>
      <div className="border-b border-line bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-14 text-center sm:px-6 lg:py-20 lg:text-left">
          <div>
            <nav aria-label="Ruta de navegación">
              <ol className="flex flex-wrap items-center justify-center gap-2 text-sm text-muted lg:justify-start">
                <li>
                  <Link
                    href="/"
                    className="inline-flex min-h-[44px] cursor-pointer items-center underline underline-offset-4 transition-colors duration-200 hover:text-primary-dark"
                  >
                    Inicio
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="font-medium text-ink">Contacto</li>
              </ol>
            </nav>

            <p className="mt-6 font-heading text-xs font-semibold tracking-[0.22em] text-muted uppercase">
              Contacto
            </p>
          </div>

          <div className="mt-5">
            <h1 className="text-3xl leading-tight font-bold tracking-[-0.01em] text-ink sm:text-4xl">
              Agenda tu consulta
            </h1>
            <p className="measure mt-4 text-lg text-muted">
              La vía más rápida es WhatsApp. Cuenta tu caso en pocas líneas y se
              te confirma la sede, el día y qué llevar a la consulta.
            </p>

            <div className="mt-8">
              <WhatsAppButton size="lg" />
            </div>
          </div>
        </div>
      </div>

      <div className="relative aspect-[16/7] w-full bg-surface-alt sm:aspect-[21/7]">
        <Image
          src="/img/contacto.jpg"
          alt="Ilustración de la Tierra de noche con rutas de luz entre ciudades"
          fill
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="mx-auto max-w-6xl px-4 pt-16 pb-20 sm:px-6 lg:pt-20 lg:pb-28">
        <div className="">
          <section>
            <h2 className="text-2xl font-bold text-ink">Datos de contacto</h2>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href={`tel:${site.phone}`}
                  data-analytics="phone-click"
                  className="flex min-h-[64px] cursor-pointer items-center gap-4 rounded-base border border-line bg-white px-5 py-4 transition-colors duration-200 hover:border-primary hover:bg-surface"
                >
                  <Icon
                    name="phone"
                    className="h-6 w-6 shrink-0 text-primary"
                  />
                  <span>
                    <span className="block text-sm text-muted">Teléfono</span>
                    <span className="block font-heading font-semibold text-ink">
                      {site.phoneDisplay}
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex min-h-[64px] cursor-pointer items-center gap-4 rounded-base border border-line bg-white px-5 py-4 transition-colors duration-200 hover:border-primary hover:bg-surface"
                >
                  <Icon name="mail" className="h-6 w-6 shrink-0 text-primary" />
                  <span className="min-w-0">
                    <span className="block text-sm text-muted">Correo</span>
                    <span className="block font-heading font-semibold break-all text-ink">
                      {site.email}
                    </span>
                  </span>
                </a>
              </li>
            </ul>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold text-ink">Sedes de atención</h2>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2">
              {site.sedes.map((sede) => (
                <li
                  key={sede.id}
                  className="rounded-base border border-line bg-surface p-5"
                >
                  <h3 className="font-heading text-lg font-semibold text-ink">
                    {sede.ciudad}
                  </h3>
                  <p className="mt-1 text-sm text-muted">
                    Estado {sede.estado}
                  </p>
                  <p className="mt-3 font-medium text-ink">{sede.lugar}</p>
                  {sede.direccion ? (
                    <p className="mt-1 text-sm text-muted">{sede.direccion}</p>
                  ) : null}
                  <p className="mt-3 flex items-start gap-2 text-sm font-medium text-ink">
                    <Icon
                      name="clock"
                      className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                    />
                    {sede.horario}
                  </p>
                  {sede.nota ? (
                    <p className="mt-2 text-sm text-muted">{sede.nota}</p>
                  ) : null}
                  <a
                    href={mapsUrl(sede)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-base border border-line bg-white px-4 py-2 font-heading text-sm font-semibold text-primary transition-colors duration-200 hover:border-primary hover:text-primary-dark"
                  >
                    <Icon name="mapPin" className="h-4 w-4 shrink-0" />
                    Cómo llegar
                    <span className="sr-only">
                      a {sede.lugar}, {sede.ciudad}. Google Maps, se abre en
                      una pestaña nueva
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12 rounded-base border-2 border-primary bg-surface p-6">
            <h2 className="font-heading text-xl font-semibold text-ink">
              Si se trata de una urgencia
            </h2>
            <p className="measure mt-3 text-muted">
              Ante una pérdida de visión súbita, dolor ocular intenso con ojo
              rojo, un golpe en el ojo o la aparición repentina de destellos y
              puntos negros, acude directamente a una emergencia oftalmológica.
              No esperes la respuesta de un mensaje: en esos cuadros las horas
              cuentan.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold text-ink">
              Por qué no hay formulario en esta página
            </h2>
            <p className="measure mt-4 text-muted">
              Un formulario web envía lo que escribes por correo sin cifrado de
              extremo a extremo, y en una consulta médica eso significa mandar
              información de salud por un canal que no la protege. WhatsApp
              cifra la conversación de extremo a extremo, así que tus datos van
              por ahí y no por un buzón intermedio.
            </p>
          </section>
        </div>
      </div>

      <JsonLd
        data={breadcrumbSchema([
          { name: "Inicio", path: "/" },
          { name: "Contacto", path: "/contacto" },
        ])}
      />
    </>
  );
}
