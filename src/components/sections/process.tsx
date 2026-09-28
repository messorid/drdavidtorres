import Image from "next/image";
import { Section } from "@/components/ui/section";

/**
 * Tres pasos, en presente, con el paciente como sujeto del primero.
 * Esta sección baja la fricción de contactar más que ninguna otra.
 */
const steps = [
  {
    title: "Escribes por WhatsApp",
    body: "Cuentas tu caso en pocas líneas. Se te indica qué sede y qué día corresponden, para que no viajes sin cita.",
  },
  {
    title: "Te evaluamos en consulta",
    body: "Se examina el ojo o la cavidad, se define el diagnóstico y se explica el plan con su alcance y su costo antes de iniciar nada.",
  },
  {
    title: "Haces el tratamiento y el control",
    body: "Cirugía o elaboración de la prótesis según el caso, con las consultas de seguimiento que hagan falta.",
  },
];

/**
 * Línea de tiempo: baja en vertical en móvil y se tumba desde `md`.
 *
 * El riel se dibuja por tramos, uno por paso salvo el último, en lugar de con
 * una línea única que atraviese la sección: así cada tramo empieza y termina
 * donde está su punto, sin depender de calcular el centro de las columnas.
 *
 * Todo el dibujo va en `aria-hidden`. Quien usa lector de pantalla ya recibe
 * el orden por la `<ol>` y por el "Paso N" que abre cada título.
 *
 * Aquí el número se queda: en una línea de tiempo no decora, dice por dónde
 * vas y cuánto falta.
 */
export function Process() {
  return (
    <Section label="Proceso" title="Cómo es el proceso desde que escribes">
      <ol className="md:flex md:gap-8">
        {steps.map((step, i) => {
          const ultimo = i === steps.length - 1;

          return (
            <li
              key={step.title}
              className={`flex gap-5 md:flex-1 md:flex-col md:gap-0 ${
                ultimo ? "" : "pb-9 md:pb-0"
              }`}
            >
              <div
                aria-hidden="true"
                className="relative flex w-6 shrink-0 justify-center md:w-full md:justify-start"
              >
                {/* Tramo hasta el paso siguiente: hacia abajo en móvil,
                    hacia la derecha en escritorio, cruzando el hueco de la
                    rejilla (`-2rem`, el mismo valor que `gap-8`). */}
                {ultimo ? null : (
                  <>
                    <span className="absolute top-7 bottom-[-2.25rem] left-3 w-px bg-line md:hidden" />
                    <span className="absolute top-[11px] right-[-2rem] left-8 hidden h-px bg-line md:block" />
                  </>
                )}

                <span className="relative z-10 mt-0.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-primary bg-white font-heading text-xs font-semibold text-primary tabular-nums md:mt-0">
                  {i + 1}
                </span>
              </div>

              <div className="flex-1 md:mt-6">
                <h3 className="font-heading text-lg leading-snug font-semibold text-ink">
                  <span className="sr-only">Paso {i + 1}: </span>
                  {step.title}
                </h3>
                <p className="mt-2 text-muted">{step.body}</p>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="relative mt-12 aspect-[16/7] w-full overflow-hidden rounded-base bg-surface-alt sm:aspect-[21/7]">
        <Image
          src="/img/consulta.jpg"
          alt="Prótesis ocular terminada, presentada en su estuche"
          fill
          sizes="(max-width: 1023px) 100vw, 860px"
          className="object-cover"
        />
      </div>
    </Section>
  );
}
