import { Section } from "@/components/ui/section";
import { Carrusel } from "@/components/ui/carrusel";
import {
  obtenerResenas,
  notaPublicada,
  resenasDestacadas,
  type Resena,
} from "@/lib/resenas";
import { urlEscribirResena, urlVerResenas } from "@/lib/site";

/**
 * Opiniones de pacientes, de la ficha de Google del doctor.
 *
 * Tres trabajos en la misma sección:
 *   1. La nota de Google, grande y a la vista: es lo primero que busca quien
 *      compara médicos.
 *   2. Algunas reseñas reales (ver `lib/resenas.ts` para de dónde salen).
 *   3. Pedir la reseña a quien ya fue atendido. El botón abre en Google el
 *      cuadro de reseña, donde el paciente entra con su propia cuenta:
 *      Google solo cuenta las que se publican en Google.
 *
 * Buena parte de los pacientes son mayores y no han dejado nunca una reseña,
 * así que, mientras no haya reseñas que mostrar, la sección explica los tres
 * pasos en vez de dar por hecho que se sabe.
 *
 * Atribución: se dice que el contenido viene de Google Maps y, cuando la
 * reseña llega por la API, el nombre enlaza al perfil del autor.
 */

const formatoNota = new Intl.NumberFormat("es-VE", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

/** Un texto más largo que esto se corta en la tarjeta y se ofrece entero en
 *  Google. Ocho líneas en móvil, aproximadamente. */
const LARGO_MAXIMO = 320;

export async function Resenas() {
  const api = await obtenerResenas();
  const nota = api?.nota ?? notaPublicada.nota;
  const total = api?.total ?? notaPublicada.total;
  // Las elegidas por el cliente mandan; si no hay, las mejores de la API.
  const resenas = resenasDestacadas.length
    ? resenasDestacadas
    : (api?.resenas ?? [])
        .filter((r) => r.estrellas >= 4)
        .sort((a, b) => b.estrellas - a.estrellas);
  const hayResenas = resenas.length > 0;

  return (
    <Section
      id="opiniones"
      label="Opiniones"
      title="Lo que opinan los pacientes"
      intro={
        hayResenas
          ? "Reseñas publicadas por pacientes en la ficha de Google del consultorio."
          : "¿Te atendió el Dr. Torres? Tu reseña en Google ayuda a otras personas que buscan oftalmólogo o una prótesis ocular a decidir con confianza."
      }
    >
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
        <TarjetaNota nota={nota} total={total} />

        <div className="min-w-0 lg:col-span-8">
          {hayResenas ? (
            <Carrusel
              label="Reseñas de pacientes en Google"
              listaClassName="flex snap-x snap-mandatory gap-4 md:gap-5"
              cabecera={
                <p className="font-heading text-sm font-semibold text-ink">
                  Reseñas destacadas
                </p>
              }
            >
              {resenas.map((r, i) => (
                <li
                  key={`${r.autor}-${i}`}
                  className="flex w-[85%] shrink-0 snap-start sm:w-[58%] md:w-[calc((100%-1.25rem)/2)]"
                >
                  <TarjetaResena resena={r} />
                </li>
              ))}
            </Carrusel>
          ) : (
            <Pasos />
          )}
        </div>
      </div>

      {hayResenas ? (
        <p className="mt-6 text-sm text-muted">
          Algunas reseñas de pacientes, tal como aparecen en Google Maps.{" "}
          <a
            href={urlVerResenas}
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex min-h-[44px] cursor-pointer items-center font-medium text-primary underline underline-offset-4 transition-colors duration-200 hover:text-primary-dark"
          >
            Leer todas
            <span className="sr-only"> en Google (se abre en una ventana nueva)</span>
          </a>
        </p>
      ) : null}
    </Section>
  );
}

/** La nota, en grande y sobre marino: el dato que se busca primero. */
function TarjetaNota({ nota, total }: { nota: number; total: number | null }) {
  const boton =
    "relative inline-flex min-h-[48px] cursor-pointer items-center justify-center gap-2.5 rounded-base px-5 py-2.5 font-heading text-base font-semibold transition-colors duration-200";
  return (
    <div className="flex flex-col items-center rounded-base bg-navy p-7 text-center text-white sm:p-8 lg:col-span-4 lg:items-start lg:text-left">
      <p className="flex items-center gap-2.5 font-heading text-sm font-semibold tracking-wide">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
          <GoogleG className="h-5 w-5" />
        </span>
        Valoración en Google
      </p>

      <p className="mt-6 flex items-end gap-3">
        <span className="font-heading text-7xl leading-[0.85] font-bold tabular-nums">
          {formatoNota.format(nota)}
        </span>
        <span className="text-lg text-[#c7dced]">de 5</span>
      </p>

      <Estrellas
        valor={nota}
        className="h-7 w-7"
        vacia="text-white/25"
        claseGrupo="mt-4"
      />

      <p className="mt-3 text-sm text-[#c7dced]">
        {total
          ? total === 1
            ? "1 reseña en la ficha del consultorio"
            : `${total} reseñas en la ficha del consultorio`
          : "En la ficha de Google del consultorio"}
      </p>

      <div className="mt-8 flex w-full flex-col gap-3">
        <a
          href={urlEscribirResena}
          target="_blank"
          rel="noopener noreferrer"
          className={`${boton} bg-white text-navy hover:bg-surface`}
        >
          <EstrellaSvg className="h-5 w-5 shrink-0 text-estrella" />
          Escribir una reseña
          <span className="sr-only"> en Google (se abre en una ventana nueva)</span>
        </a>
        <a
          href={urlVerResenas}
          target="_blank"
          rel="noopener noreferrer"
          className={`${boton} border-2 border-white/40 text-white hover:border-white hover:bg-white/10`}
        >
          Ver todas en Google
          <span className="sr-only"> (se abre en una ventana nueva)</span>
        </a>
      </div>
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
    <div className="flex h-full flex-col justify-center rounded-base border border-line bg-surface p-7 sm:p-8">
      <Comillas className="h-10 w-10 text-primary-light" />
      <h3 className="mt-4 font-heading text-xl font-semibold text-ink">
        Deja tu reseña en un minuto
      </h3>
      <ol className="mt-6 space-y-4">
        {pasos.map((paso, i) => (
          <li key={paso} className="flex items-start gap-3 text-ink">
            <span
              aria-hidden="true"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary font-heading text-sm font-semibold text-white"
            >
              {i + 1}
            </span>
            <span className="pt-1">{paso}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function TarjetaResena({ resena: r }: { resena: Resena }) {
  const largo = r.texto.length > LARGO_MAXIMO;
  const texto = largo
    ? `${r.texto.slice(0, LARGO_MAXIMO).replace(/\s+\S*$/, "")}…`
    : r.texto;

  return (
    <figure className="flex h-full w-full flex-col rounded-base border border-line bg-white p-6 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <Estrellas valor={r.estrellas} className="h-5 w-5" />
        <Comillas className="h-8 w-8 shrink-0 text-primary-light/50" />
      </div>

      <blockquote className="mt-4 flex-1">
        <p className="text-lg leading-relaxed whitespace-pre-line text-ink">
          {texto}
        </p>
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

      <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
        {r.foto ? (
          // <img> y no next/image: la foto la sirve Google desde su dominio,
          // pesa un par de KB y no gana nada pasando por el optimizador.
          // Sin `referrer`, que es como Google la deja cargar fuera de Maps.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={r.foto}
            alt=""
            width={44}
            height={44}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="h-11 w-11 shrink-0 rounded-full bg-surface-alt"
          />
        ) : (
          <span
            aria-hidden="true"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary font-heading text-lg font-semibold text-white"
          >
            {r.autor.charAt(0).toUpperCase()}
          </span>
        )}
        <span className="min-w-0 flex-1">
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
          {/* La «G» de al lado ya dice de dónde viene. */}
          <span className="block text-sm text-muted">
            {r.cuando || "Reseña en Google"}
          </span>
        </span>
        <GoogleG className="h-5 w-5 shrink-0" />
      </figcaption>
    </figure>
  );
}

/** Estrellas de una valoración. La cifra va en el nombre accesible: las
 *  figuras solo la repiten para la vista. */
function Estrellas({
  valor,
  className,
  vacia = "text-line",
  claseGrupo = "",
}: {
  valor: number;
  className: string;
  /** Color de las estrellas sin rellenar, según el fondo. */
  vacia?: string;
  claseGrupo?: string;
}) {
  const llenas = Math.round(valor);
  return (
    <span
      role="img"
      aria-label={`${formatoNota.format(valor)} de 5 estrellas`}
      className={`flex gap-0.5 ${claseGrupo}`}
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <EstrellaSvg
          key={i}
          className={`${className} ${i < llenas ? "text-estrella" : vacia}`}
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

function Comillas({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M13 8C7.5 9.6 4 14 4 19.5 4 23 6.2 25 9 25c2.6 0 4.5-2 4.5-4.5S11.7 16 9.3 16c-.4 0-.8 0-1.1.1.6-2.6 2.6-4.8 5.6-5.9L13 8Zm15 0c-5.5 1.6-9 6-9 11.5 0 3.5 2.2 5.5 5 5.5 2.6 0 4.5-2 4.5-4.5S26.7 16 24.3 16c-.4 0-.8 0-1.1.1.6-2.6 2.6-4.8 5.6-5.9L28 8Z" />
    </svg>
  );
}

/** La «G» de Google, en sus colores: identifica de un vistazo de dónde es
 *  la nota y las reseñas. Decorativa; el texto ya dice «Google». */
function GoogleG({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false" className={className}>
      <path
        fill="#FFC107"
        d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.6-.4-3.9Z"
      />
      <path
        fill="#FF3D00"
        d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7Z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44Z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.6-.4-3.9Z"
      />
    </svg>
  );
}
