import { Icon } from "@/components/ui/icon";
import { WhatsAppButton } from "@/components/ui/cta-button";
import { Section } from "@/components/ui/section";
import { mapsUrl, site } from "@/lib/site";

/**
 * Sedes y horarios reales, confirmados por el cliente. No se redondean ni se
 * amplían: un horario que no se cumple se paga en reseñas de una estrella de
 * gente que viajó y no encontró consulta.
 */
export function Areas() {
  return (
    <Section
      label="Sedes"
      title="Dónde y cuándo atiende el Dr. Torres"
      intro="Cuatro sedes entre Portuguesa y Lara, cada una con su día. Conviene confirmar por WhatsApp antes de viajar."
      tone="paper"
    >
      <ul className="border-t border-line">
        {site.sedes.map((sede) => (
          <li
            key={sede.id}
            className="grid grid-cols-1 gap-x-8 gap-y-4 border-b border-line py-7 md:grid-cols-12"
          >
            <div className="md:col-span-4">
              <h3 className="flex items-start gap-3 font-heading text-xl font-semibold text-ink">
                <Icon
                  name="mapPin"
                  className="mt-1 h-5 w-5 shrink-0 text-primary"
                />
                <span>
                  {sede.ciudad}
                  <span className="mt-0.5 block text-sm font-normal text-muted">
                    Estado {sede.estado}
                  </span>
                </span>
              </h3>
            </div>

            <div className="md:col-span-5">
              <p className="font-medium text-ink">{sede.lugar}</p>
              {sede.direccion ? (
                <p className="mt-1 text-muted">{sede.direccion}</p>
              ) : null}
              {sede.nota ? (
                <p className="mt-1 text-sm text-muted">{sede.nota}</p>
              ) : null}

            </div>

            <p className="flex items-start gap-2 text-sm font-medium text-ink md:col-span-3 md:justify-end md:text-right">
              <Icon
                name="clock"
                className="mt-0.5 h-4 w-4 shrink-0 text-primary"
              />
              {sede.horario}
            </p>

            {/* Último en el DOM a propósito. En móvil, el horario es el dato
                que decide el viaje y tiene que leerse antes que el botón; en
                escritorio el botón se coloca bajo la dirección, en la
                segunda fila de la rejilla, que es donde ya estaba.

                Abre en pestaña nueva porque saca al visitante a Maps, y a
                menudo a la app del teléfono: si sustituyera la página, al
                volver perdería dónde estaba leyendo. */}
            <div className="md:col-span-5 md:col-start-5 md:-mt-1">
              <a
                href={mapsUrl(sede)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-base border border-line bg-white px-4 py-2 font-heading text-sm font-semibold text-primary transition-colors duration-200 hover:border-primary hover:text-primary-dark"
              >
                <Icon name="mapPin" className="h-4 w-4 shrink-0" />
                Cómo llegar
                <span className="sr-only">
                  a {sede.lugar}, {sede.ciudad}. Google Maps, se abre en una
                  pestaña nueva
                </span>
              </a>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-9 flex justify-center lg:justify-start">
        <WhatsAppButton
          size="lg"
          message="Hola Dr. Torres, quisiera saber en qué sede y qué día puedo ser atendido."
          label="Confirmar sede y disponibilidad"
        />
      </div>
    </Section>
  );
}
