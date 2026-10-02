import Image from "next/image";
import { Icon } from "@/components/ui/icon";
import { InternalCta } from "@/components/ui/cta-button";
import { Section, SpecimenBlock } from "@/components/ui/section";
import { Gallery } from "@/components/ui/gallery";
import { procesoProtesis } from "@/lib/galerias";
import { site } from "@/lib/site";

/**
 * Diferenciadores. Cada punto es verificable o falsable — nada de
 * "compromiso con la excelencia". Si el cliente aporta cifras reales
 * (casos resueltos, años ejerciendo), se agregan aquí.
 */
const points = [
  "Doce años elaborando prótesis oculares, con certificación como ocularista en México, Colombia y Brasil.",
  "El iris se pinta a mano comparando contra el ojo sano en la misma sesión, con sus fibras, su collarete y su anillo límbico.",
  "Piezas hechas sobre una impresión de la cavidad del propio paciente, no moldes prefabricados ajustados a la fuerza.",
  "El mismo médico evalúa, opera y hace el seguimiento: no cambias de interlocutor a mitad del tratamiento.",
  "Experiencia específica con pacientes oncológicos, donde la prótesis debe reconstruir también los párpados y el tejido de alrededor.",
];

export function DoctorPreview() {
  return (
    <Section
      label="El especialista"
      title="Quién te atiende"
      intro="Médico Cirujano y Oftalmólogo egresado de la UCLA, profesor universitario y ex director del Hospital de Sarare. Su trabajo une dos oficios que rara vez van juntos: la cirugía ocular y la elaboración artesanal de prótesis."
    >
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-10">
        <div>
          {/* Fotografía real del doctor en su consultorio. */}
          <div className="relative mx-auto mb-8 aspect-[4/5] w-full max-w-xs overflow-hidden rounded-base bg-surface-alt lg:mx-0">
            <Image
              src="/img/doctor.jpg"
              alt="El Dr. David Torres en su consultorio, con el logo del centro al fondo"
              fill
              sizes="(max-width: 767px) 85vw, 320px"
              className="object-cover"
            />
          </div>

          <SpecimenBlock
            statement="Empecé a los diez años en la óptica de mi padre. Hoy esa precisión es la que hace que una prótesis no se note."
            footLeft="Dr. David Torres"
            footRight="12 años elaborando prótesis"
          />

          <ul className="mt-8 space-y-3">
            {site.credentials.map((credential) => (
              <li key={credential} className="flex items-start gap-3">
                <Icon
                  name="academicCap"
                  className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                />
                <span className="text-sm text-muted">{credential}</span>
              </li>
            ))}
          </ul>

          <InternalCta href="/sobre-el-doctor" className="mt-7">
            Conocer su formación y enfoque
          </InternalCta>
        </div>

        <div>
          <h3 className="text-center font-heading text-xs font-semibold tracking-[0.22em] text-muted uppercase lg:text-left">
            Qué hace diferente este trabajo
          </h3>
          <ul className="mt-6 border-t border-line">
            {points.map((point) => (
              <li
                key={point}
                className="flex gap-4 border-b border-line py-5 text-muted"
              >
                <Icon
                  name="check"
                  className="mt-1 h-4 w-4 shrink-0 text-primary"
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          {/* El cliente insistió en este punto. Se redacta en positivo: explica
              por qué importa el criterio médico sin señalar a otros gremios,
              que además sería incoherente — su padre y sus hermanas son
              optometristas — y lo expondría por competencia desleal. */}
          <div className="mt-8 border-primary text-center lg:border-l-2 lg:pl-5 lg:text-left">
            <h4 className="font-heading font-semibold text-ink">
              Por qué importa quién indica un tratamiento
            </h4>
            <p className="measure mt-2 text-muted">
              Diagnosticar una enfermedad ocular y prescribir medicamentos es un
              acto médico, y la ley venezolana reserva esa facultad a los
              médicos titulados. La razón es práctica: detrás de un mismo ojo
              rojo puede haber una conjuntivitis que cede sola o un glaucoma
              agudo que, mal tratado, cuesta la visión en horas.
            </p>
            <InternalCta href="/sobre-el-doctor" className="mt-4">
              Leer el criterio completo
            </InternalCta>
          </div>
        </div>
      </div>

      <div className="mt-14">
        <h3 className="text-center font-heading text-xs font-semibold tracking-[0.22em] text-primary uppercase lg:text-left">
          El trabajo, paso a paso
        </h3>
        <div className="mt-6">
          <Gallery
            fotos={procesoProtesis.slice(0, 4)}
            label="Elaboración de una prótesis ocular, paso a paso"
            columnas={4}
            numerada
          />
        </div>
      </div>
    </Section>
  );
}
