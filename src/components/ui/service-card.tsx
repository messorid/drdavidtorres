import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/ui/icon";
import type { DatosTarjeta } from "@/lib/services";

/**
 * Tarjeta de servicio con imagen. La imagen es decorativa respecto al enlace
 * (el nombre del servicio ya da el texto accesible), pero lleva `alt` propio
 * porque describe algo distinto del título.
 *
 * `sizes` refleja el ancho real que ocupa la tarjeta en cada punto de corte:
 * sin eso, Next serviría a un teléfono la misma imagen que a un escritorio.
 *
 * El «Ver detalle» va con `mt-auto`: las tarjetas de una misma fila se
 * estiran a la misma altura, pero el texto de cada una mide distinto, y sin
 * esto el enlace quedaba a alturas diferentes y las cortas dejaban un hueco
 * muerto debajo. Anclado al pie, los tres enlaces forman una línea.
 */
export function ServiceCard({ service }: { service: DatosTarjeta }) {
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

        <span className="mt-auto inline-flex items-center gap-1.5 self-start pt-5 font-heading text-sm font-semibold text-primary transition-colors duration-200 group-hover:text-primary-dark">
          Ver detalle
          <Icon name="arrowRight" className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
