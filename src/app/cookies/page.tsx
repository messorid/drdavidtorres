import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Política de cookies | Dr. David Torres",
  description:
    "Qué cookies instala este sitio, para qué sirven y cómo bloquearlas o borrarlas desde tu navegador.",
  path: "/cookies",
});

/**
 * Esta página describe lo que ocurre **en este despliegue**, no una plantilla.
 *
 * `NEXT_PUBLIC_GA_ID` se resuelve al compilar: si no está configurada, el
 * componente de analítica ni se renderiza y el sitio no instala una sola
 * cookie. Decirlo es más útil —y más honesto— que el «podríamos usar
 * cookies» de costumbre. Si mañana se activa la analítica, basta con volver
 * a compilar para que esta página cambie sola.
 *
 * PENDIENTE DE DECISIÓN DEL CLIENTE: hoy no hay banner de consentimiento. Con
 * el público real del consultorio (Portuguesa y Lara) no hace falta, pero si
 * el sitio empieza a recibir visitas de la Unión Europea, el RGPD exige pedir
 * permiso ANTES de cargar Google Analytics, no solo informar aquí.
 */

const gaActiva = Boolean(process.env.NEXT_PUBLIC_GA_ID);

const cookiesAnaliticas = [
  {
    nombre: "_ga",
    quien: "Google Analytics",
    para: "Distinguir un navegador de otro para no contar dos veces la misma visita.",
    dura: "2 años",
  },
  {
    nombre: "_ga_*",
    quien: "Google Analytics",
    para: "Mantener el estado de la sesión de medición mientras navegas por el sitio.",
    dura: "2 años",
  },
];

export default function CookiesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
      <h1 className="text-3xl font-bold text-ink sm:text-4xl">
        Política de cookies
      </h1>
      <p className="mt-3 text-sm text-muted">
        Última actualización: septiembre de 2026
      </p>

      <div className="mt-10 space-y-10">
        <section>
          <h2 className="text-2xl font-bold text-ink">
            Qué instala este sitio
          </h2>

          {gaActiva ? (
            <>
              <p className="measure mt-4 text-muted">
                Este sitio no instala cookies propias. La única que se guarda en
                tu navegador es la de Google Analytics, que sirve para saber qué
                páginas resultan útiles. No identifica quién eres ni qué
                consultas médicas tienes.
              </p>

              {/* Tabla con cabeceras de fila y columna: en una tabla de datos
                  es lo que permite a un lector de pantalla anunciar «duración,
                  _ga, 2 años» en vez de leer celdas sueltas. */}
              <div
                role="region"
                aria-label="Cookies que instala este sitio"
                tabIndex={0}
                className="mt-6 -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0"
              >
                <table className="w-full min-w-[34rem] border-collapse text-left">
                  <caption className="sr-only">
                    Cookies que instala este sitio, con su finalidad y duración
                  </caption>
                  <thead>
                    <tr className="border-b border-line">
                      {["Cookie", "Quién la pone", "Para qué", "Duración"].map(
                        (th) => (
                          <th
                            key={th}
                            scope="col"
                            className="py-3 pr-4 font-heading text-xs font-semibold tracking-[0.12em] text-muted uppercase"
                          >
                            {th}
                          </th>
                        ),
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {cookiesAnaliticas.map((c) => (
                      <tr key={c.nombre} className="border-b border-line">
                        <th
                          scope="row"
                          className="py-4 pr-4 align-top font-mono text-sm font-semibold text-ink"
                        >
                          {c.nombre}
                        </th>
                        <td className="py-4 pr-4 align-top text-sm text-muted">
                          {c.quien}
                        </td>
                        <td className="py-4 pr-4 align-top text-sm text-muted">
                          {c.para}
                        </td>
                        <td className="py-4 align-top text-sm whitespace-nowrap text-muted">
                          {c.dura}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <>
              <p className="measure mt-4 text-muted">
                <strong className="font-semibold text-ink">
                  Ahora mismo este sitio no instala ninguna cookie.
                </strong>{" "}
                Ni propia ni de terceros. No hay analítica activada, no hay
                formularios, no hay registro y no hay sesión que recordar: todas
                las páginas son archivos estáticos que tu navegador descarga y
                muestra.
              </p>
              <p className="measure mt-4 text-muted">
                Si en el futuro se activa la analítica de visitas, se usaría
                Google Analytics, que sí guarda dos identificadores en el
                navegador durante dos años. En ese momento esta página pasará a
                detallarlos uno a uno, con su nombre y su duración.
              </p>
            </>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-bold text-ink">Lo que no se hace</h2>
          <ul className="mt-5 space-y-3">
            {[
              "No hay cookies de publicidad ni de remarketing. Nadie te va a perseguir con anuncios por haber visitado esta página.",
              "No se hace seguimiento entre sitios ni se construye un perfil tuyo.",
              "No se venden ni se ceden datos a terceros.",
              "No se guarda nada de lo que consultes aquí junto a tu identidad: el sitio no sabe quién eres.",
            ].map((linea) => (
              <li key={linea} className="measure flex gap-3 text-muted">
                <span aria-hidden="true" className="text-primary">
                  ·
                </span>
                <span>{linea}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-ink">
            La tipografía y las imágenes
          </h2>
          <p className="measure mt-4 text-muted">
            La tipografía de marca se descarga una sola vez al compilar el sitio
            y se sirve desde este mismo dominio. Al navegar no se hace ninguna
            petición a servidores de Google por las fuentes, así que tampoco hay
            cookies por esa vía. Las fotografías y los iconos también se sirven
            desde aquí.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-ink">
            Cuando sales hacia WhatsApp
          </h2>
          <p className="measure mt-4 text-muted">
            Los botones de WhatsApp te llevan a un dominio de Meta, que se rige
            por sus propias políticas y puede instalar sus cookies una vez
            estás allí. Eso ocurre fuera de este sitio y escapa a lo que aquí se
            controla. El contenido de la conversación no pasa por esta web: se
            explica en la{" "}
            <Link
              href="/privacidad"
              className="cursor-pointer font-medium text-primary underline underline-offset-4 transition-colors duration-200 hover:text-primary-dark"
            >
              política de privacidad
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-ink">
            Cómo bloquearlas o borrarlas
          </h2>
          <p className="measure mt-4 text-muted">
            Todos los navegadores permiten ver, borrar y bloquear cookies desde
            sus ajustes de privacidad. Este sitio{" "}
            <strong className="font-semibold text-ink">
              funciona igual con las cookies bloqueadas
            </strong>
            : no hay ninguna función que dependa de ellas.
          </p>
          <p className="measure mt-4 text-muted">
            Si quieres quedar fuera de la medición de Google Analytics en todos
            los sitios a la vez, Google publica un complemento de inhabilitación
            para el navegador en{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer font-medium break-all text-primary underline underline-offset-4 transition-colors duration-200 hover:text-primary-dark"
            >
              tools.google.com/dlpage/gaoptout
              <span className="sr-only"> (se abre en una ventana nueva)</span>
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-ink">Dudas</h2>
          <p className="measure mt-4 text-muted">
            Si algo de esto no queda claro, escribe a{" "}
            <a
              href={`mailto:${site.email}`}
              className="cursor-pointer font-medium break-all text-primary underline underline-offset-4 transition-colors duration-200 hover:text-primary-dark"
            >
              {site.email}
            </a>{" "}
            o llama al{" "}
            <a
              href={`tel:${site.phone}`}
              data-analytics="phone-click"
              className="cursor-pointer font-medium text-primary underline underline-offset-4 transition-colors duration-200 hover:text-primary-dark"
            >
              {site.phoneDisplay}
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
