/**
 * Rejilla editorial del sitio (Swiss Modernism): 12 columnas, composición
 * asimétrica y un aire generoso y constante.
 *
 * A la izquierda, una columna estrecha con el número de sección y una etiqueta
 * corta. A la derecha, el contenido. Por debajo de `lg` todo se apila, que es
 * lo que hace legible este patrón en móvil.
 *
 * El número es **decorativo**: va en `aria-hidden` para que un lector de
 * pantalla no anuncie "cero uno" antes de cada encabezado. El orden y la
 * jerarquía reales los da el H2.
 */
export function Section({
  index,
  label,
  title,
  intro,
  children,
  id,
  tone = "white",
  className = "",
}: {
  /** "01", "02"… Decorativo. */
  index: string;
  /** Etiqueta corta bajo el número. */
  label: string;
  title: string;
  intro?: string;
  children?: React.ReactNode;
  id?: string;
  tone?: "white" | "paper";
  className?: string;
}) {
  const bg = tone === "paper" ? "bg-surface" : "bg-white";

  return (
    <section id={id} className={`border-t border-line ${bg} ${className}`}>
      {/* El número y la etiqueta van en una línea sobre el título, no en una
          columna lateral. Como columna ocupaban una cuarta parte del ancho
          casi vacía y empujaban el contenido 285 px a la derecha; el hueco se
          notaba en todas las secciones del sitio. */}
      <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 lg:py-24 lg:text-left">
        <div className="flex items-baseline justify-center gap-4 lg:justify-start">
          <span
            aria-hidden="true"
            className="font-heading text-sm font-semibold text-primary tabular-nums"
          >
            {index}
          </span>
          <p className="font-heading text-xs font-semibold tracking-[0.22em] text-muted uppercase">
            {label}
          </p>
        </div>

        <h2 className="mx-auto mt-5 max-w-3xl text-2xl leading-tight font-bold tracking-[-0.01em] text-balance text-ink sm:text-[1.75rem] lg:mx-0">
          {title}
        </h2>

        {intro ? (
          <p className="measure mx-auto mt-4 text-lg text-muted lg:mx-0">
            {intro}
          </p>
        ) : null}

        {/* El contenido recupera la alineación a la izquierda: son listas
            y párrafos de lectura, y centrarlos obliga al ojo a buscar el
            inicio de cada línea. */}
        {children ? <div className="mt-10 text-left">{children}</div> : null}
      </div>
    </section>
  );
}

/**
 * Bloque tipo "espécimen": una afirmación grande sobre papel, con sus
 * metadatos en las esquinas inferiores. Es el equivalente a las fichas de
 * fuente de la referencia, usado aquí para lo que distingue la consulta.
 */
export function SpecimenBlock({
  statement,
  footLeft,
  footRight,
}: {
  statement: string;
  footLeft: string;
  footRight: string;
}) {
  return (
    <figure className="flex min-h-[220px] flex-col justify-between rounded-base bg-surface-alt p-6 sm:min-h-[280px] sm:p-8">
      <blockquote className="flex flex-1 items-center justify-center py-6">
        <p className="max-w-xl text-center text-xl leading-snug font-medium text-ink text-balance sm:text-2xl">
          {statement}
        </p>
      </blockquote>
      <figcaption className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-t border-ink/15 pt-4 text-xs tracking-wide text-muted uppercase">
        <span>{footLeft}</span>
        <span className="text-right">{footRight}</span>
      </figcaption>
    </figure>
  );
}
