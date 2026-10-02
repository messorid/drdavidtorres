import Image from "next/image";
import { Section } from "@/components/ui/section";
import { Carrusel } from "@/components/ui/carrusel";
import { InternalCta, WhatsAppButton } from "@/components/ui/cta-button";
import { Icon } from "@/components/ui/icon";
import { productos } from "@/lib/productos";

/**
 * Catálogo de insumos que el consultorio vende por encargo.
 *
 * Va dirigido a otros cirujanos, no al paciente, y la sección lo dice en la
 * primera línea: alguien que entró buscando una consulta tiene que poder
 * saltársela sin confundirse.
 *
 * Cada pieza lleva su propio botón de WhatsApp con el mensaje ya redactado,
 * incluida la frase que pide medida y cantidad. Es el dato que el doctor
 * necesita para responder, y pedirlo en el propio mensaje ahorra la ida y
 * vuelta.
 *
 * Las tres fotos son apaisadas y casi 4:3 (1.33, 1.33 y 1.38), así que el
 * marco es 4:3 con `object-cover`: las dos primeras encajan exactas y la
 * tercera pierde un 4% de ancho por los lados, sin tocar la pieza. Si algún
 * día entra una foto vertical, volver a `object-contain` antes que dejar
 * que el recorte se coma el producto.
 */
export function Productos() {
  return (
    <Section
      id="productos"
      label="Para colegas"
      title="Insumos que se elaboran por encargo"
      intro="Esta parte es para cirujanos oftalmólogos. Las piezas se fabrican en el taller del consultorio, a la medida que indique quien las encarga."
    >
      {/* Foto de apertura: enseña de un vistazo el conjunto, que es lo que un
          colega quiere ver antes de leer ficha por ficha. */}
      <div className="relative mb-10 aspect-[16/9] w-full overflow-hidden rounded-base bg-white sm:aspect-[16/10]">
        <Image
          src="/img/productos/implantes-y-conformadores.jpg"
          alt="Tres implantes orbitarios porosos de tamaño creciente y, delante, tres conformadores transparentes, sobre fondo gris claro"
          fill
          sizes="(max-width: 1023px) 100vw, 1152px"
          className="object-cover"
        />
      </div>

      <ListaProductos />

      <p className="measure mt-8 text-sm text-muted">
        El precio se cotiza por encargo, según la medida y la cantidad.
      </p>

      <div className="mt-6 flex justify-center lg:justify-start">
        <InternalCta href="/productos">
          Ver el catálogo y cómo encargar
        </InternalCta>
      </div>
    </Section>
  );
}

/** Solo las fichas. La usan la landing y la página de insumos. */
export function ListaProductos() {
  return (
    <Carrusel
      label="Insumos quirúrgicos por encargo"
      listaClassName="flex snap-x snap-mandatory gap-4 md:gap-5"
    >
      {productos.map((p) => (
        <li
          key={p.slug}
          className="flex w-[82%] shrink-0 snap-start sm:w-[58%] md:w-[calc((100%-2.5rem)/3)]"
        >
          <article className="flex h-full flex-col overflow-hidden rounded-base border border-line bg-white">
            <div className="relative aspect-[4/3] w-full bg-surface">
              <Image
                src={p.image}
                alt={p.imageAlt}
                fill
                sizes="(max-width: 767px) 85vw, (max-width: 1023px) 58vw, 30vw"
                className="object-cover"
              />
            </div>

            <div className="flex flex-1 flex-col p-5">
              <h3 className="flex items-start gap-2.5 font-heading text-lg leading-snug font-semibold text-ink">
                <Icon
                  name="tools"
                  className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                />
                {p.nombre}
              </h3>

              <p className="mt-2 text-muted">{p.resumen}</p>

              <p className="mt-3 text-sm text-muted">
                <span className="text-ink">Cuándo se usa: </span>
                {p.uso}
              </p>

              {p.medidas ? (
                <p className="mt-3 font-heading text-sm font-semibold text-ink">
                  {p.medidas}
                </p>
              ) : null}

              <div className="mt-5 flex grow items-end">
                <WhatsAppButton
                  className="w-full"
                  message={p.whatsappMessage}
                  label="Encargar por WhatsApp"
                />
              </div>
            </div>
          </article>
        </li>
      ))}
    </Carrusel>
  );
}
