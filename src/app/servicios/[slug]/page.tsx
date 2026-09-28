import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Icon } from "@/components/ui/icon";
import { WhatsAppButton, InternalCta } from "@/components/ui/cta-button";
import { FinalCta } from "@/components/sections/final-cta";
import { ServiceCard } from "@/components/ui/service-card";
import { Gallery } from "@/components/ui/gallery";
import { CasosGrid } from "@/components/ui/before-after";
import { JsonLd } from "@/components/json-ld";
import { buildMetadata } from "@/lib/seo";
import { services, getService } from "@/lib/services";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { galeriaPorServicio } from "@/lib/galerias";
import { casosAntesDespues, procesoConPaciente } from "@/lib/casos";

/** Cualquier slug fuera de la lista devuelve 404 en vez de una página vacía. */
export const dynamicParams = false;

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/servicios/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return buildMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/servicios/${service.slug}`,
  });
}

export default async function ServicePage({
  params,
}: PageProps<"/servicios/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const otros = services.filter((s) => s.slug !== service.slug);
  const galeria = galeriaPorServicio[service.slug];
  // Cada página de prótesis muestra el caso que le corresponde.
  const caso = casosAntesDespues.find((c) =>
    service.slug === "protesis-oculares"
      ? c.id === "protesis-ocular"
      : service.slug === "protesis-oculo-palpebrales"
        ? c.id === "oculo-palpebral"
        : false,
  );
  const conPaciente =
    service.slug === "protesis-oculo-palpebrales" ||
    service.slug === "rehabilitacion-cavidad-orbitaria";

  return (
    <>
      <article>
        <header className="border-b border-line bg-surface">
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
                  <li className="font-medium text-ink">{service.name}</li>
                </ol>
              </nav>

              <p className="mt-6 flex items-center gap-3 font-heading text-xs font-semibold tracking-[0.22em] text-muted uppercase">
                <Icon
                  name={service.icon}
                  className="h-6 w-6 shrink-0 text-primary"
                />
                Servicio
              </p>
            </div>

            <div className="mt-5">
              <h1 className="text-3xl leading-tight font-bold tracking-[-0.01em] text-ink sm:text-4xl">
                {service.h1}
              </h1>

              <p className="measure mt-5 text-lg text-muted">{service.lead}</p>

              <div className="mt-8">
                <WhatsAppButton
                  size="lg"
                  message={service.whatsappMessage}
                  label="Consultar por WhatsApp"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Imagen dentro de la rejilla y en 16:9, no una banda a sangre
            apaisada. El material del cliente son fotos verticales de móvil
            (ratio 0.46): en una franja 21:8 solo cabía el 17% del alto y los
            rostros salían cortados. En 16:9, y sin ocupar todo el ancho, el
            sujeto entra entero. */}
        <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6">
          <div className="">
            {/* `contain`, no `cover`: estas fotos son de objetos y el
                recorte les cortaba la pieza. Sobre el marino de marca, que
                es el mismo fondo de las ilustraciones, las bandas que deja
                el encaje no se notan. */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-base bg-navy sm:aspect-video">
              <Image
                src={service.imageHero}
                alt={service.imageAlt}
                fill
                priority
                sizes="(max-width: 1023px) 100vw, 900px"
                className="object-contain"
              />
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-4 pt-14 pb-20 sm:px-6 lg:pt-16 lg:pb-28">
          <div className="">
            <section className="rounded-base border border-line bg-surface p-6 sm:p-8">
              <h2 className="font-heading text-xl font-semibold text-ink">
                Qué incluye la atención
              </h2>
              <ul className="mt-5 space-y-3">
                {service.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                      <Icon name="check" className="h-4 w-4" />
                    </span>
                    <span className="text-muted">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-muted">
                <span className="font-semibold text-ink">Para quién: </span>
                {service.forWhom}
              </p>
            </section>

            {service.sections.map((block) => (
              <section key={block.heading} className="mt-12">
                <h2 className="text-2xl font-bold text-ink">{block.heading}</h2>
                {block.body.map((paragraph) => (
                  <p key={paragraph} className="measure mt-4 text-muted">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}

            {caso ? (
              <section className="mt-14">
                <h2 className="text-2xl font-bold text-ink">
                  Un caso real, antes y después
                </h2>
                <p className="measure mt-4 text-muted">
                  Publicado con el consentimiento del paciente. Cada caso es
                  distinto: el punto de partida y la cirugía previa cambian lo
                  que se puede lograr.
                </p>
                <div className="mt-8">
                  <CasosGrid
                    casos={[caso]}
                    label="Caso real, antes y después"
                  />
                </div>
              </section>
            ) : null}

            {conPaciente ? (
              <section className="mt-14">
                <h2 className="text-2xl font-bold text-ink">
                  El proceso en consulta
                </h2>
                <div className="mt-8">
                  <Gallery
                    fotos={procesoConPaciente}
                    label="El proceso con el paciente en consulta"
                    columnas={3}
                  />
                </div>
              </section>
            ) : null}

            {galeria ? (
              <section className="mt-14">
                <h2 className="text-2xl font-bold text-ink">
                  {galeria.titulo}
                </h2>
                <div className="mt-8">
                  <Gallery
                    fotos={galeria.fotos}
                    label={galeria.titulo}
                    columnas={galeria.fotos.length <= 3 ? 3 : 4}
                    numerada={galeria.numerada}
                  />
                </div>
              </section>
            ) : null}

            <section className="mt-14 border-t border-line pt-10">
              <h2 className="font-heading text-xl font-semibold text-ink">
                Otros servicios
              </h2>
              <ul className="mt-6 grid gap-5 sm:grid-cols-2">
                {otros.slice(0, 4).map((other) => (
                  <li key={other.slug} className="flex">
                    <ServiceCard service={other} />
                  </li>
                ))}
              </ul>
              <InternalCta href="/servicios" className="mt-8">
                Ver los {services.length} servicios
              </InternalCta>
            </section>
          </div>
        </div>
      </article>

      <FinalCta
        title="¿Tu caso encaja con esto?"
        body="Escribe contando lo que te pasa. Se te orienta sobre si corresponde este procedimiento y qué implica en tu caso."
        message={service.whatsappMessage}
      />

      <JsonLd
        data={[
          serviceSchema(service),
          breadcrumbSchema([
            { name: "Inicio", path: "/" },
            { name: service.name, path: `/servicios/${service.slug}` },
          ]),
        ]}
      />
    </>
  );
}
