import { Section } from "@/components/ui/section";
import { Carrusel } from "@/components/ui/carrusel";
import { obtenerResenas, type Resena } from "@/lib/resenas";
import { urlEscribirResena, urlVerResenas } from "@/lib/site";

/**
 * Opiniones de pacientes, de la ficha de Google del doctor.
 *
 * Dos trabajos distintos en la misma sección:
 *   1. Enseñar lo que ya han escrito otros pacientes, cuando la API de
 *      Google está configurada (ver `lib/resenas.ts`).
 *   2. Pedir la reseña a quien ya fue atendido. Este funciona siempre: el
 *      botón abre en Google el cuadro de reseña, donde el paciente entra con
 *      su propia cuenta. Escribir la reseña aquí no es posible ni deseable:
 *      Google solo cuenta las que se publican en Google.
 *
 * Buena parte de los pacientes son mayores y no han dejado nunca una reseña,
 * así que, sin reseñas que mostrar, la sección explica los tres pasos en vez
 * de dar por hecho que se sabe.
 *
 * Atribución: la API de Places exige mostrar que el contenido viene de
 * Google Maps y enlazar al perfil de cada autor. Las dos cosas están.
 */

const formatoNota = new Intl.NumberFormat("es-VE", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

/** Un texto más largo que esto se corta en la tarjeta y se ofrece entero en
 *  Google. Ocho líneas en móvil, aproximadamente. */
const LARGO_MAXIMO = 320;

export async function Resenas() {
  const datos = await obtenerResenas();
  const hayResenas = Boolean(datos && datos.resenas.length > 0);

  return (
    <Section
      id="opiniones"
      label="Opiniones"
      title={
        hayResenas
          ? "Lo que dicen los pacientes en Google"
          : "¿Te atendió el Dr. Torres? Cuéntalo en Google"
      }
      intro={
        hayResenas
          ? "Reseñas publicadas por pacientes en la ficha de Google del consultorio, tal como las escribieron."
          : "Tu opinión ayuda a otras personas que están buscando oftalmólogo o una prótesis ocular a decidir con más confianza."
      }
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        {datos?.nota ? (
          <div className="flex items-center justify-center gap-4 md:justify-start">
            <p className="font-heading text-5xl leading-none font-bold text-ink tabular-nums">
              {formatoNota.format(datos.nota)}
            </p>
            <div>
              <Estrellas valor={datos.nota} className="h-5 w-5" />
              {datos.total ? (
                <p className="mt-1.5 text-sm text-muted">
                  {datos.total === 1
                    ? "1 reseña en Google"
                    : `${datos.total} reseñas en Google`}
                </p>
              ) : null}
            </div>
          </div>
        ) : (
          <Pasos />
        )}

        <Botones />
      </div>

      {hayResenas && datos ? (
        <div className="mt-10">
          <Carrusel
            label="Reseñas de pacientes en Google"
            listaClassName="flex snap-x snap-mandatory gap-4 md:gap-5"
          >
            {datos.resenas.map((r, i) => (
              <li
                key={`${r.autor}-${i}`}
                className="flex w-[85%] shrink-0 snap-start sm:w-[58%] md:w-[calc((100%-2.5rem)/3)]"
              >
                <TarjetaResena resena={r} />
              </li>
            ))}
          </Carrusel>
          <p className="mt-6 text-sm text-muted">
            Fuente: Google Maps. Se muestran las reseñas más relevantes según
            Google, sin seleccionar ni editar.
          </p>
        </div>
      ) : null}
    </Section>
  );
}

function Botones() {
  const base =
    "relative inline-flex min-h-[44px] cursor-pointer items-center justify-center gap-2.5 rounded-base px-5 py-2.5 font-heading text-base font-semibold transition-colors duration-200";
  return (
    <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center md:shrink-0">
      <a
        href={urlEscribirResena}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} border-2 border-primary bg-primary text-white hover:border-primary-dark hover:bg-primary-dark`}
      >
        <EstrellaSvg className="h-5 w-5 shrink-0" />
        Escribir una reseña
        <span className="sr-only"> en Google (se abre en una ventana nueva)</span>
      </a>
      <a
        href={urlVerResenas}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} border-2 border-primary bg-white text-primary hover:bg-primary hover:text-white`}
      >
        Ver todas en Google
        <span className="sr-only"> (se abre en una ventana nueva)</span>
      </a>
    </div>
  );
}

function Pasos() {
  const pasos = [
    "Pulsa «Escribir una reseña».",
    "Entra con tu cuenta de Google (si usas Gmail, ya la tienes).",
    "Elige las estrellas, cuenta tu experiencia y publica.",
  ];
  return (
    <ol className="mx-auto max-w-md space-y-3 md:mx-0">
      {pasos.map((paso, i) => (
        <li key={paso} className="flex items-start gap-3 text-left text-ink">
          <span
            aria-hidden="true"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary font-heading text-sm font-semibold text-white"
          >
            {i + 1}
          </span>
          <span className="pt-0.5">{paso}</span>
        </li>
      ))}
    </ol>
  );
}

function TarjetaResena({ resena: r }: { resena: Resena }) {
  const largo = r.texto.length > LARGO_MAXIMO;
  const texto = largo
    ? `${r.texto.slice(0, LARGO_MAXIMO).replace(/\s+\S*$/, "")}…`
    : r.texto;

  return (
    <figure className="flex h-full w-full flex-col rounded-base border border-line bg-white p-6">
      <Estrellas valor={r.estrellas} className="h-4.5 w-4.5" />

      <blockquote className="mt-4 flex-1">
        <p className="whitespace-pre-line text-ink">{texto}</p>
        {largo && r.url ? (
          <a
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative mt-2 inline-flex min-h-[44px] cursor-pointer items-center text-sm font-medium text-primary underline underline-offset-4 transition-colors duration-200 hover:text-primary-dark"
          >
            Leer completa en Google
            <span className="sr-only"> (se abre en una ventana nueva)</span>
          </a>
        ) : null}
      </blockquote>

      <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
        {r.foto ? (
          // <img> y no next/image: la foto la sirve Google desde su dominio,
          // pesa un par de KB y no gana nada pasando por el optimizador.
          // Sin `referrer`, que es como Google la deja cargar fuera de Maps.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={r.foto}
            alt=""
            width={40}
            height={40}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="h-10 w-10 shrink-0 rounded-full bg-surface-alt"
          />
        ) : (
          <span
            aria-hidden="true"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-alt font-heading font-semibold text-ink"
          >
            {r.autor.charAt(0).toUpperCase()}
          </span>
        )}
        <span className="min-w-0">
          {r.autorUrl ? (
            <a
              href={r.autorUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              // Zona táctil de 44 px sin mover el diseño: el relleno se compensa
              // con margen negativo.
              className="relative -my-2.5 block truncate py-2.5 font-heading font-semibold text-ink transition-colors duration-200 hover:text-primary-dark"
            >
              {r.autor}
              <span className="sr-only">, perfil en Google Maps (se abre en una ventana nueva)</span>
            </a>
          ) : (
            <span className="block truncate font-heading font-semibold text-ink">
              {r.autor}
            </span>
          )}
          <span className="block text-sm text-muted">
            {r.cuando ? `${r.cuando} · ` : ""}Google
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

/** Estrellas de una valoración. La cifra va en el nombre accesible: las
 *  figuras solo la repiten para la vista. */
function Estrellas({ valor, className }: { valor: number; className: string }) {
  const llenas = Math.round(valor);
  return (
    <span
      role="img"
      aria-label={`${formatoNota.format(valor)} de 5 estrellas`}
      className="flex gap-0.5"
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <EstrellaSvg
          key={i}
          className={`${className} ${i < llenas ? "text-estrella" : "text-line"}`}
        />
      ))}
    </span>
  );
}

function EstrellaSvg({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M12 2.8l2.83 5.73 6.33.92-4.58 4.46 1.08 6.3L12 17.25l-5.66 2.98 1.08-6.3-4.58-4.46 6.33-.92L12 2.8Z" />
    </svg>
  );
}
