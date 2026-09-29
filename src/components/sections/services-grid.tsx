import { InternalCta } from "@/components/ui/cta-button";
import { Section } from "@/components/ui/section";
import { ExploradorServicios } from "@/components/ui/explorador-servicios";
import { serviciosTarjeta } from "@/lib/services";

/**
 * Los nueve servicios en un solo carrusel, con buscador y filtro por área.
 *
 * Antes iban en dos bloques separados, uno por oficio. El filtro hace ese
 * mismo trabajo sin partir la sección en dos, y la descripción de cada área
 * sigue apareciendo —la trae el propio filtro al seleccionarla—, así que no
 * se pierde la explicación de qué distingue al oftalmólogo del ocularista.
 */
export function ServicesGrid() {
  return (
    <Section
      id="servicios"
      label="Servicios"
      title="Qué se atiende en consulta"
      intro="Dos oficios en un mismo consultorio: el del oftalmólogo, que diagnostica y opera, y el del ocularista, que reconstruye lo que la enfermedad o la cirugía se llevaron."
    >
      <ExploradorServicios
        servicios={serviciosTarjeta}
        etiquetaCarrusel="Servicios del consultorio"
      />

      <div className="mt-12 flex justify-center lg:justify-start">
        <InternalCta href="/servicios">
          Ver todos los servicios en detalle
        </InternalCta>
      </div>
    </Section>
  );
}
