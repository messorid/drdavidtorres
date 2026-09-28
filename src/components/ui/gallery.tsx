import Image from "next/image";

export type Foto = { src: string; alt: string; pie?: string };

/**
 * Galería de fotos del trabajo real.
 *
 * Mismo patrón que el carrusel de servicios: scroll nativo con `scroll-snap`
 * en móvil y rejilla desde `md`, sin librería. El contenedor lleva
 * `role="region"` y `tabIndex` porque una zona desplazable debe poder
 * recorrerse con el teclado.
 *
 * `numerada` añade el índice sobre cada foto: se usa donde las imágenes
 * cuentan un proceso en orden, no una colección suelta.
 */
export function Gallery({
  fotos,
  label,
  columnas = 4,
  numerada = false,
}: {
  fotos: Foto[];
  label: string;
  columnas?: 2 | 3 | 4;
  numerada?: boolean;
}) {
  const cols =
    columnas === 2
      ? "md:grid-cols-2"
      : columnas === 3
        ? "md:grid-cols-3"
        : "md:grid-cols-2 lg:grid-cols-4";

  return (
    <div
      role="region"
      aria-label={label}
      tabIndex={0}
      className="-mx-4 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6 md:mx-0 md:overflow-visible md:px-0 md:pb-0"
    >
      <ul
        className={`flex snap-x snap-mandatory gap-4 md:grid md:snap-none ${cols}`}
      >
        {fotos.map((foto, i) => (
          <li
            key={foto.src}
            className="w-[78%] shrink-0 snap-start sm:w-[46%] md:w-auto"
          >
            <figure className="h-full">
              <div className="relative aspect-[3/2] w-full overflow-hidden rounded-base bg-surface-alt">
                <Image
                  src={foto.src}
                  alt={foto.alt}
                  fill
                  sizes="(max-width: 767px) 78vw, (max-width: 1023px) 45vw, 25vw"
                  className="object-cover"
                />
                {numerada ? (
                  <span
                    aria-hidden="true"
                    className="absolute top-2 left-2 rounded bg-navy/85 px-2 py-1 font-heading text-xs font-semibold text-white tabular-nums"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                ) : null}
              </div>
              {foto.pie ? (
                <figcaption className="mt-2 text-sm text-muted">
                  {foto.pie}
                </figcaption>
              ) : null}
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );
}
