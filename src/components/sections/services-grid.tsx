import { InternalCta } from "@/components/ui/cta-button";
import { Section } from "@/components/ui/section";
import { ServiceCarousel } from "@/components/ui/service-card";
import { areaLabels, servicesByArea, type Area } from "@/lib/services";

/**
 * Los servicios se agrupan en las dos áreas que el propio doctor distingue:
 * lo que hace como oftalmólogo y lo que hace como ocularista. Son oficios
 * distintos y el paciente llega buscando uno de los dos, no una lista
 * mezclada.
 */
function AreaBloque({ area }: { area: Area }) {
  const { title, intro } = areaLabels[area];
  const items = servicesByArea(area);

  return (
    <div>
      {/* El encabezado del área acompaña al de la sección: centrado en
          móvil, a la izquierda desde `lg`. Las tarjetas se quedan alineadas
          a la izquierda, que es como se leen. */}
      <h3 className="text-center font-heading text-xs font-semibold tracking-[0.22em] text-primary uppercase lg:text-left">
        {title}
      </h3>
      <p className="measure mx-auto mt-3 text-center text-muted lg:mx-0 lg:text-left">
        {intro}
      </p>
      <div className="mt-6">
        <ServiceCarousel services={items} label={title} />
      </div>
    </div>
  );
}

export function ServicesGrid() {
  return (
    <Section
      id="servicios"
      index="01"
      label="Servicios"
      title="Qué se atiende en consulta"
      intro="Dos oficios en un mismo consultorio: el del oftalmólogo, que diagnostica y opera, y el del ocularista, que reconstruye lo que la enfermedad o la cirugía se llevaron."
    >
      <div className="space-y-14">
        <AreaBloque area="oftalmologia" />
        <AreaBloque area="ocularista" />
      </div>

      {/* El centrado va en un contenedor, no en el propio enlace: `InternalCta`
          ya trae `inline-flex` y una clase `flex` de fuera empata en
          especificidad, con lo que gana la del componente y `justify-center`
          no llega a aplicarse. */}
      <div className="mt-12 flex justify-center lg:justify-start">
        <InternalCta href="/servicios">
          Ver todos los servicios en detalle
        </InternalCta>
      </div>
    </Section>
  );
}
