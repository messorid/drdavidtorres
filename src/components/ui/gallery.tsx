import Image from "next/image";
import { Carrusel } from "@/components/ui/carrusel";
import { Ampliable } from "@/components/ui/visor";

export type Foto = { src: string; alt: string; pie?: string };

/**
 * Galería de fotos del trabajo real.
 *
 * Mismo patrón que el carrusel de servicios: `Carrusel` pone el scroll con
 * `scroll-snap` y los botones; aquí sólo se decide el ancho de cada foto y
 * en cuántas columnas cae la rejilla desde `md`.
 *
 * `numerada` añade el índice sobre cada foto: se usa donde las imágenes
 * cuentan un proceso en orden, no una colección suelta.
 */
export function Gallery({
  fotos,
  label,
  columnas = 4,
  numerada = false,
  ampliable = false,
}: {
  fotos: Foto[];
  label: string;
  columnas?: 2 | 3 | 4;
  numerada?: boolean;
  /** Las fotos abren el visor. Requiere un `<Visor>` alrededor. */
  ampliable?: boolean;
}) {
  const cols =
    columnas === 2
      ? "md:grid-cols-2"
      : columnas === 3
        ? "md:grid-cols-3"
        : "md:grid-cols-2 lg:grid-cols-4";

  return (
    <Carrusel
      label={label}
      listaClassName={`flex snap-x snap-mandatory gap-4 md:grid md:snap-none ${cols}`}
    >
      {fotos.map((foto, i) => (
        <li
          key={foto.src}
          className="w-[78%] shrink-0 snap-start sm:w-[46%] md:w-auto"
        >
          <figure className="h-full">
            <Marco ampliable={ampliable} foto={foto}>
              <Image
                src={foto.src}
                alt={ampliable ? "" : foto.alt}
                fill
                sizes="(max-width: 767px) 78vw, (max-width: 1023px) 45vw, 25vw"
                className="object-cover transition-transform duration-300 group-hover/amp:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover/amp:scale-100"
              />
              {numerada ? (
                <span
                  aria-hidden="true"
                  className="absolute top-2 left-2 rounded bg-navy/85 px-2 py-1 font-heading text-xs font-semibold text-white tabular-nums"
                >
                  {i + 1}
                </span>
              ) : null}
            </Marco>
            {foto.pie ? (
              <figcaption className="mt-2 text-sm text-muted">
                {foto.pie}
              </figcaption>
            ) : null}
          </figure>
        </li>
      ))}
    </Carrusel>
  );
}

const marco =
  "relative aspect-[3/2] w-full overflow-hidden rounded-base bg-surface-alt";

/** El mismo marco, como botón que abre el visor o como caja sin más. */
function Marco({
  ampliable,
  foto,
  children,
}: {
  ampliable: boolean;
  foto: Foto;
  children: React.ReactNode;
}) {
  return ampliable ? (
    <Ampliable
      src={foto.src}
      alt={foto.alt}
      pie={foto.pie ?? ""}
      className={marco}
    >
      {children}
    </Ampliable>
  ) : (
    <div className={marco}>{children}</div>
  );
}
