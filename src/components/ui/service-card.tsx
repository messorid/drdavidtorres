import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/ui/icon";
import type { Service } from "@/lib/services";

/**
 * Tarjeta de servicio con imagen. La imagen es decorativa respecto al enlace
 * (el nombre del servicio ya da el texto accesible), pero lleva `alt` propio
 * porque describe algo distinto del título.
 *
 * `sizes` refleja el ancho real que ocupa la tarjeta en cada punto de corte:
 * sin eso, Next serviría a un teléfono la misma imagen que a un escritorio.
 */
export function ServiceCard({
  service,
  priority = false,
}: {
  service: Service;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/servicios/${service.slug}`}
      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-base border border-line bg-white transition-colors duration-200 hover:border-primary"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-alt">
        <Image
          src={service.image}
          alt={service.imageAlt}
          fill
          priority={priority}
          sizes="(max-width: 767px) 85vw, (max-width: 1023px) 45vw, 30vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="flex items-start gap-2.5 font-heading text-lg leading-snug font-semibold text-ink">
          <Icon
            name={service.icon}
            className="mt-0.5 h-5 w-5 shrink-0 text-primary"
          />
          {service.name}
        </h3>

        <p className="mt-2 text-muted">{service.cardLine}</p>

        <p className="mt-3 text-sm text-muted">
          <span className="text-ink">Para quién: </span>
          {service.forWhom}
        </p>

        <span className="mt-4 inline-flex items-center gap-1.5 self-start pt-1 font-heading text-sm font-semibold text-primary transition-colors duration-200 group-hover:text-primary-dark">
          Ver detalle
          <Icon name="arrowRight" className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}

/**
 * Carrusel en móvil, rejilla desde `md`.
 *
 * El carrusel es scroll nativo con `scroll-snap`: funciona con el dedo, con
 * rueda y con teclado sin una línea de JavaScript. El contenedor lleva
 * `role="region"` y `tabIndex` porque una zona desplazable debe poder
 * alcanzarse y recorrerse con el teclado.
 */
export function ServiceCarousel({
  services,
  label,
}: {
  services: Service[];
  label: string;
}) {
  return (
    <div
      role="region"
      aria-label={label}
      tabIndex={0}
      className="-mx-4 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6 md:mx-0 md:overflow-visible md:px-0 md:pb-0"
    >
      <ul className="flex snap-x snap-mandatory gap-4 md:grid md:snap-none md:grid-cols-2 md:gap-5 lg:grid-cols-3">
        {services.map((service, i) => (
          <li
            key={service.slug}
            className="flex w-[82%] shrink-0 snap-start sm:w-[58%] md:w-auto"
          >
            <ServiceCard service={service} priority={i === 0} />
          </li>
        ))}
      </ul>
    </div>
  );
}
