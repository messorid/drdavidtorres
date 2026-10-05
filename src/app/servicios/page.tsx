import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import { Icon } from "@/components/ui/icon";
import { WhatsAppButton } from "@/components/ui/cta-button";
import { ExploradorServicios } from "@/components/ui/explorador-servicios";
import { Gallery } from "@/components/ui/gallery";
import { FinalCta } from "@/components/sections/final-cta";
import { JsonLd } from "@/components/json-ld";
import { buildMetadata, canonical } from "@/lib/seo";
import { services, serviciosTarjeta } from "@/lib/services";
import { breadcrumbSchema } from "@/lib/schema";
import { procesoProtesis } from "@/lib/galerias";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Servicios de Oftalmología y Prótesis | Dr. Torres",
  description:
    "Prótesis oculares con iris hiperrealistas, prótesis óculo-palpebrales, insumos quirúrgicos y cirugía de catarata, glaucoma y pterigión.",
  path: "/servicios",
});

export default function ServiciosPage() {
  return (
    <>
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
                <li className="font-medium text-ink">Servicios</li>
              </ol>
            </nav>
            <p className="mt-6 font-heading text-xs font-semibold tracking-[0.22em] text-muted uppercase">
              {services.length} servicios
            </p>
          </div>

          <div className="mt-5">
            <h1 className="text-3xl leading-tight font-bold tracking-[-0.01em] text-ink sm:text-4xl">
              Oftalmología clínica, cirugía y prótesis oculares
            </h1>
            <p className="measure mt-5 text-lg text-muted">
              El consultorio cubre dos oficios distintos. Como oftalmólogo, el
              diagnóstico y la cirugía de las enfermedades del ojo. Como
              ocularista, la reconstrucción de lo que la enfermedad o la cirugía
              se llevaron, con {site.anosProtesis} años de experiencia en
              prótesis.
            </p>
            <div className="mt-8">
              <WhatsAppButton size="lg" label="Consultar mi caso" />
            </div>
          </div>
        </div>
      </header>

      {/* Imagen de apertura: ancho completo, para que la página no arranque
          con una pared de texto. */}
      <div className="relative aspect-[16/7] w-full bg-surface-alt sm:aspect-[21/7]">
        <Image
          src="/img/banner-iris.jpg"
          alt="Ilustración de una prótesis ocular sostenida entre los dedos"
          fill
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <h2 className="text-2xl leading-tight font-bold tracking-[-0.01em] text-ink sm:text-[1.75rem]">
            Los {services.length} servicios
          </h2>
          <p className="measure mt-4 text-lg text-muted">
            Filtra por oficio o escribe lo que te pasa. El buscador entiende
            también como lo dice la gente: «carnosidad» por pterigión, «ojo
            artificial» por prótesis ocular.
          </p>

          <div className="mt-10">
            <ExploradorServicios
              servicios={serviciosTarjeta}
              etiquetaCarrusel="Todos los servicios"
            />
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 lg:py-20 lg:text-left">
          <div>
            <p className="font-heading text-xs font-semibold tracking-[0.22em] text-primary uppercase">
              El taller
            </p>
          </div>
          <div className="mt-5">
            <h2 className="text-2xl leading-tight font-bold text-ink sm:text-[1.75rem]">
              De la impresión a la pieza terminada
            </h2>
            <p className="measure mx-auto mt-4 text-lg text-muted lg:mx-0">
              Cada prótesis pasa por el mismo recorrido: impresión de la
              cavidad, molde, pintado a mano del iris, pulido y pruebas de
              ajuste antes de la entrega.
            </p>
            <div className="mt-10 text-left">
              <Gallery
                fotos={procesoProtesis}
                label="Elaboración de una prótesis ocular, paso a paso"
                columnas={4}
                numerada
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <div>
            <p className="font-heading text-xs font-semibold tracking-[0.22em] text-primary uppercase">
              Para colegas
            </p>
          </div>
          <div className="mt-5">
            <h2 className="text-2xl leading-tight font-bold text-ink sm:text-[1.75rem]">
              Insumos por encargo para otros médicos
            </h2>
            <p className="measure mt-4 text-lg text-muted">
              Conformadores, protectores corneales, anillos de simbléfaro e
              implantes de PMMA de 12 a 20 mm se elaboran también por encargo de
              cirujanos oftalmólogos para sus propios pacientes. Al escribir
              conviene indicar el tipo de pieza, la medida y la fecha en que se
              necesita.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <WhatsAppButton
                message="Hola Dr. Torres, le escribo como colega para consultar por insumos quirúrgicos oculares."
                label="Escribir como colega"
              />
              <Link
                href="/servicios/insumos-quirurgicos-oculares"
                className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 font-heading font-semibold text-primary transition-colors duration-200 hover:text-primary-dark"
              >
                Ver el detalle de los insumos
                <Icon name="arrowRight" className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FinalCta
        title="¿No sabes cuál corresponde a tu caso?"
        body="Escribe contando lo que te pasa. Se te orienta sobre qué evaluación necesitas antes de agendar."
      />

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Inicio", path: "/" },
            { name: "Servicios", path: "/servicios" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Servicios del Centro Oftalmológico y Prótesis Oculares Dr. David Torres",
            itemListElement: services.map((s, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: s.name,
              url: canonical(`/servicios/${s.slug}`),
            })),
          },
        ]}
      />
    </>
  );
}
