import Image from "next/image";
import { Carrusel } from "@/components/ui/carrusel";
import { Ampliable } from "@/components/ui/visor";

export type Caso = {
  id: string;
  titulo: string;
  antes: { src: string; alt: string; pie: string };
  despues: { src: string; alt: string; pie: string };
};

/**
 * Antes y después de un caso real.
 *
 * Las dos fotos van al mismo tamaño y una al lado de la otra: si el "después"
 * se muestra más grande o mejor encuadrado, la comparación deja de ser honesta.
 *
 * Los pies describen únicamente lo que se ve. No se añaden diagnósticos,
 * edades ni plazos que no consten: un pie inventado en una foto clínica es
 * una afirmación médica falsa.
 */
export function BeforeAfter({ caso }: { caso: Caso }) {
  return (
    <figure className="rounded-base border border-line bg-white p-4 sm:p-5">
      <figcaption className="mb-4 font-heading font-semibold text-ink">
        {caso.titulo}
      </figcaption>

      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {[caso.antes, caso.despues].map((foto, i) => (
          <div key={foto.src}>
            <Ampliable
              src={foto.src}
              alt={foto.alt}
              pie={`${caso.titulo}. ${foto.pie}`}
              etiqueta={i === 0 ? "Antes" : "Después"}
              className="relative aspect-[4/5] w-full overflow-hidden rounded-base bg-surface-alt"
            >
              <Image
                src={foto.src}
                alt=""
                fill
                sizes="(max-width: 767px) 42vw, (max-width: 1023px) 30vw, 22vw"
                className="object-cover transition-transform duration-300 group-hover/amp:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover/amp:scale-100"
              />
              <span
                className={`absolute top-2 left-2 rounded px-2 py-1 font-heading text-xs font-semibold tracking-wide uppercase ${
                  i === 0 ? "bg-navy/85 text-white" : "bg-primary text-white"
                }`}
              >
                {i === 0 ? "Antes" : "Después"}
              </span>
            </Ampliable>
            <p className="mt-2 text-sm text-muted">{foto.pie}</p>
          </div>
        ))}
      </div>
    </figure>
  );
}

export function CasosGrid({ casos, label }: { casos: Caso[]; label: string }) {
  // Con tres pares (o seis), tres columnas: en dos, el tercero quedaba solo junto a
  // una celda vacía y la sección parecía sin terminar. Tres columnas casan
  // además con la fila de «otros resultados» que va justo debajo.
  const columnas = casos.length >= 3 ? "lg:grid-cols-3" : "lg:grid-cols-2";
  // Si la última fila queda con una sola tarjeta, va centrada: alineada a la
  // izquierda parece que faltan las otras dos.
  const huerfana = casos.length >= 3 && casos.length % 3 === 1;
  return (
    <Carrusel
      label={label}
      listaClassName={`flex snap-x snap-mandatory gap-4 lg:grid lg:snap-none ${columnas} lg:gap-6`}
    >
      {casos.map((caso, i) => (
        <li
          key={caso.id}
          className={`w-[88%] shrink-0 snap-start lg:w-auto ${
            huerfana && i === casos.length - 1 ? "lg:col-start-2" : ""
          }`}
        >
          <BeforeAfter caso={caso} />
        </li>
      ))}
    </Carrusel>
  );
}
