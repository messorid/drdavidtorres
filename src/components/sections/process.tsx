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

export function Process() {
  return (
    <Section
      index="04"
      label="Proceso"
      title="Cómo es el proceso desde que escribes"
    >
      <ol className="grid gap-px border-t border-line bg-line md:grid-cols-3">
        {steps.map((step, i) => (
          <li
            key={step.title}
            className="bg-white p-7 text-center md:p-8 md:text-left"
          >
            <span
              aria-hidden="true"
              className="inline-block font-heading text-sm font-semibold text-primary tabular-nums"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-5 font-heading text-lg leading-snug font-semibold text-ink">
              <span className="sr-only">Paso {i + 1}: </span>
              {step.title}
            </h3>
            <p className="mt-3 text-muted">{step.body}</p>
          </li>
        ))}
      </ol>

      <div className="relative mt-10 aspect-[16/7] w-full overflow-hidden rounded-base bg-surface-alt sm:aspect-[21/7]">
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
