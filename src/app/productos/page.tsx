import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import { Icon } from "@/components/ui/icon";
import { WhatsAppButton, InternalCta } from "@/components/ui/cta-button";
import { ListaProductos } from "@/components/sections/productos";
import { FinalCta } from "@/components/sections/final-cta";
import { JsonLd } from "@/components/json-ld";
import { buildMetadata, canonical } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { productos } from "@/lib/productos";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Insumos Quirúrgicos Oculares por Encargo | Dr. Torres",
  description:
    "Implantes orbitarios de PMMA de 12 a 20 mm, conformadores corneales y anillos de simbléfaro, elaborados a medida para cirujanos oftalmólogos.",
  path: "/productos",
});

/**
 * Página propia del catálogo.
 *
 * El destinatario es un cirujano, no un paciente, y eso cambia la página
 * entera: no hay tranquilizar, no hay explicar qué es una prótesis, y el
 * botón no dice «consultar» sino «encargar». Lo que un colega necesita es
 * saber qué piezas hay, en qué medidas y cómo pedirlas.
 *
 * No se emite schema `Product`: sin precio ni disponibilidad, un `Product`
 * vacío no genera resultado enriquecido y además invita a Google a tratar
 * esto como una tienda, que no lo es. Se emite `ItemList`, que es lo que
 * realmente hay: una lista de piezas.
 */
export default function ProductosPage() {
  return (
    <>
      <header className="border-b border-line bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-14 text-center sm:px-6 lg:py-20 lg:text-left">
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
              <li className="font-medium text-ink">Productos</li>
            </ol>
          </nav>

          <p className="mt-6 flex items-center justify-center gap-3 font-heading text-xs font-semibold tracking-[0.22em] text-primary uppercase lg:justify-start">
            <Icon name="tools" className="h-6 w-6 shrink-0" />
            Para colegas
          </p>

          <div className="mt-5">
            <h1 className="text-3xl leading-tight font-bold tracking-[-0.01em] text-ink sm:text-4xl">
              Insumos quirúrgicos oculares por encargo
            </h1>
            <p className="measure mt-5 text-lg text-muted">
              Piezas elaboradas en el taller del consultorio para otros
              cirujanos oftalmólogos, a la medida que indique quien las
              encarga. Si llegaste buscando atención como paciente, lo tuyo
              está en{" "}
              <Link
                href="/servicios"
                className="cursor-pointer font-medium text-primary underline underline-offset-4 transition-colors duration-200 hover:text-primary-dark"
              >
                servicios
              </Link>
              .
            </p>
            <div className="mt-8">
              <WhatsAppButton
                size="lg"
                message="Hola Dr. Torres, le escribo como colega para encargar insumos quirúrgicos. Necesito:"
                label="Escribir como colega"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-base bg-white sm:aspect-[1100/564]">
          <Image
            src="/img/productos/implantes-y-conformadores.jpg"
            alt="Tres implantes orbitarios porosos y tres conformadores transparentes, de distintos tamaños, sobre la mesa de trabajo"
            fill
            priority
            sizes="(max-width: 1199px) 100vw, 1152px"
            className="object-cover"
          />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pt-14 pb-20 sm:px-6 lg:pt-16 lg:pb-28">
        <section>
          <h2 className="text-2xl leading-tight font-bold text-ink sm:text-[1.75rem]">
            Las piezas
          </h2>
          <div className="mt-8">
            <ListaProductos />
          </div>
        </section>

        <section className="mt-14 rounded-base border border-line bg-surface p-6 sm:p-8">
          <h2 className="font-heading text-xl font-semibold text-ink">
            Cómo encargar
          </h2>
          <p className="measure mt-3 text-muted">
            El pedido se gestiona por WhatsApp. Para poder responder con un
            plazo y un precio en el primer mensaje, conviene indicar:
          </p>
          <ul className="mt-5 space-y-3">
            {[
              "Qué pieza y en qué medida. Si es un implante orbitario, el diámetro en milímetros.",
              "Cuántas unidades.",
              "Para cuándo se necesitan.",
              "A qué ciudad hay que hacerlas llegar.",
            ].map((linea) => (
              <li key={linea} className="flex items-start gap-3 text-muted">
                <Icon
                  name="check"
                  className="mt-1 h-4 w-4 shrink-0 text-primary"
                />
                <span>{linea}</span>
              </li>
            ))}
          </ul>
          <p className="measure mt-5 text-sm text-muted">
            El precio se cotiza por encargo, según la medida y la cantidad.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
            <WhatsAppButton
              message="Hola Dr. Torres, le escribo como colega para encargar insumos quirúrgicos. Necesito:"
              label="Encargar por WhatsApp"
            />
            <a
              href={`mailto:${site.email}`}
              className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 font-heading font-semibold break-all text-primary transition-colors duration-200 hover:text-primary-dark"
            >
              <Icon name="mail" className="h-5 w-5 shrink-0" />
              {site.email}
            </a>
          </div>
        </section>

        <section className="mt-14 border-t border-line pt-10">
          <h2 className="font-heading text-xl font-semibold text-ink">
            Quién las fabrica
          </h2>
          <p className="measure mt-4 text-muted">
            Las piezas salen del mismo taller donde se elaboran las prótesis
            oculares del consultorio, con {site.anosProtesis} años de oficio
            detrás. Quien las hace es el propio médico que opera y adapta, no
            un proveedor externo.
          </p>
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
            <InternalCta href="/servicios/insumos-quirurgicos-oculares">
              Ver el detalle del servicio
            </InternalCta>
            <InternalCta href="/sobre-el-doctor">Sobre el doctor</InternalCta>
          </div>
        </section>
      </div>

      <FinalCta
        title="¿Necesitas una medida que no está en la lista?"
        body="Se fabrican a medida. Escribe indicando la pieza y el diámetro, y se te confirma si es viable y en cuánto tiempo."
        message="Hola Dr. Torres, le escribo como colega. Necesito una pieza a medida:"
      />

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Inicio", path: "/" },
            { name: "Productos", path: "/productos" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Insumos quirúrgicos oculares elaborados por encargo",
            itemListElement: productos.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: p.nombre,
              description: p.resumen,
              url: `${canonical("/productos")}#${p.slug}`,
            })),
          },
        ]}
      />
    </>
  );
}
