import { Section } from "@/components/ui/section";
import { CasosGrid } from "@/components/ui/before-after";
import { Visor } from "@/components/ui/visor";
import { casosAntesDespues } from "@/lib/casos";

/**
 * Casos reales del consultorio, con el consentimiento informado de cada
 * paciente. Es la sección que más pesa en la decisión de alguien que está
 * valorando una prótesis: ver el resultado en una cara, no en una pieza
 * sobre la mesa.
 *
 * No se llama "testimonios" porque no lo son: no hay una sola palabra escrita
 * por los pacientes. Son fotografías de resultados, y se presentan como tal.
 */
export function Casos() {
  return (
    <Section
      id="casos"
      label="Casos"
      title="Resultados en pacientes reales"
      intro="Fotografías de casos atendidos en el consultorio, publicadas con el consentimiento de cada paciente."
      tone="paper"
    >
      <Visor>
        <CasosGrid
          casos={casosAntesDespues}
          label="Casos con fotografía de antes y después"
        />
      </Visor>

      <p className="measure mt-8 text-sm text-muted">
        Cada caso es distinto. Estas imágenes muestran trabajos concretos y no
        garantizan un resultado igual: el punto de partida, el estado de la
        cavidad y la cirugía previa cambian de una persona a otra.
      </p>
    </Section>
  );
}
