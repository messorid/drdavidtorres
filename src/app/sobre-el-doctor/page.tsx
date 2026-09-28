import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import { Icon } from "@/components/ui/icon";
import { FinalCta } from "@/components/sections/final-cta";
import { JsonLd } from "@/components/json-ld";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { services } from "@/lib/services";
import { formacion, hospitales, docencia, historia } from "@/lib/trayectoria";
import { breadcrumbSchema } from "@/lib/schema";
import { Gallery } from "@/components/ui/gallery";
import { congresos, clinica } from "@/lib/galerias";

export const metadata: Metadata = buildMetadata({
  title: "Dr. David Torres, Oftalmólogo y Ocularista",
  description:
    "Médico Cirujano y Oftalmólogo egresado de la UCLA, con 12 años elaborando prótesis oculares y certificación como ocularista en México, Colombia y Brasil.",
  path: "/sobre-el-doctor",
});

export default function AboutPage() {
  return (
    <>
      <article>
        <header className="border-b border-line bg-surface">
          <div className="mx-auto max-w-6xl px-4 py-14 text-center sm:px-6 lg:py-20 lg:text-left">
            <div>
              <nav aria-label="Ruta de navegación">
                <ol className="flex flex-wrap items-center justify-center gap-2 text-sm text-muted lg:justify-start">
                  <li>
                    <Link
                      href="/"
                      className="inline-flex min-h-[44px] cursor-pointer items-center underline underline-offset-4 transition-colors duration-200 hover:text-primary-dark"
                    >
                      Inicio
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li className="font-medium text-ink">Sobre el doctor</li>
                </ol>
              </nav>

              <p className="mt-6 font-heading text-xs font-semibold tracking-[0.22em] text-muted uppercase">
                El especialista
              </p>
            </div>

            <div className="mt-5">
              <h1 className="text-3xl leading-tight font-bold tracking-[-0.01em] text-ink sm:text-4xl">
                {site.doctor}
              </h1>
              <p className="mt-3 text-lg text-muted">{site.role}</p>

              <div className="relative mx-auto mt-8 aspect-[4/5] w-full max-w-sm overflow-hidden rounded-base bg-surface-alt lg:mx-0">
                <Image
                  src="/img/doctor.jpg"
                  alt="El Dr. David Torres en su consultorio, con el logo del centro al fondo"
                  fill
                  priority
                  sizes="(max-width: 1023px) 85vw, 384px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:pb-28">
          <div className="">
            <section>
              <h2 className="text-2xl font-bold text-ink">
                De la óptica familiar al quirófano
              </h2>
              {historia.map((p) => (
                <p key={p} className="measure mt-4 text-muted">
                  {p}
                </p>
              ))}
            </section>

            <section className="mt-14">
              <h2 className="text-2xl font-bold text-ink">
                Consulta, quirófano y aula
              </h2>
              <div className="mt-8">
                <Gallery
                  fotos={clinica}
                  label="El Dr. Torres en consulta, en quirófano y dando clase"
                  columnas={3}
                />
              </div>
            </section>

            <section className="mt-14">
              <h2 className="text-2xl font-bold text-ink">Formación</h2>
              <ul className="mt-6 border-t border-line">
                {formacion.map((f) => (
                  <li
                    key={f.titulo}
                    className="grid grid-cols-1 gap-x-8 gap-y-1 border-b border-line py-5 md:grid-cols-12"
                  >
                    <p className="font-heading font-semibold text-ink md:col-span-5">
                      {f.titulo}
                    </p>
                    <p className="text-muted md:col-span-5">{f.institucion}</p>
                    <p className="text-sm text-muted md:col-span-2 md:text-right">
                      {f.lugar}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-14">
              <h2 className="text-2xl font-bold text-ink">
                Experiencia hospitalaria
              </h2>
              <ul className="mt-6 border-t border-line">
                {hospitales.map((h) => (
                  <li
                    key={h.nombre}
                    className="grid grid-cols-1 gap-x-8 gap-y-1 border-b border-line py-5 md:grid-cols-12"
                  >
                    <p className="font-heading font-semibold text-ink md:col-span-7">
                      {h.nombre}
                    </p>
                    <p className="text-muted md:col-span-3">{h.lugar}</p>
                    <p className="text-sm font-medium text-primary md:col-span-2 md:text-right">
                      {"cargo" in h ? h.cargo : ""}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-14">
              <h2 className="text-2xl font-bold text-ink">Docencia</h2>
              <p className="measure mt-4 text-muted">
                Profesor universitario en tres casas de estudio del país.
              </p>
              <ul className="mt-6 space-y-3">
                {docencia.map((d) => (
                  <li key={d} className="flex items-start gap-3">
                    <Icon
                      name="academicCap"
                      className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                    />
                    <span className="text-muted">{d}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-14">
              <h2 className="text-2xl font-bold text-ink">
                Formación continua entre ocularistas
              </h2>
              <p className="measure mt-4 text-muted">
                La ocularística es un oficio de pocos, y buena parte de lo que
                se aprende se intercambia entre colegas. El Dr. Torres participa
                en el Congreso Internacional de Ocularistas, donde se comparten
                técnicas de pigmentación, materiales y manejo de cavidades
                complejas.
              </p>
              <div className="mt-8">
                <Gallery
                  fotos={congresos}
                  label="III Congreso Internacional de Ocularistas"
                  columnas={4}
                />
              </div>
            </section>

            <section className="mt-14">
              <h2 className="text-2xl font-bold text-ink">
                Por qué importa quién indica un tratamiento
              </h2>
              <p className="measure mt-4 text-muted">
                Diagnosticar una enfermedad ocular y prescribir medicamentos es
                un acto médico, y la ley venezolana reserva esa facultad a
                quienes tienen título de médico. La razón es práctica: detrás de
                un mismo ojo rojo puede haber una conjuntivitis que cede sola o
                un glaucoma agudo que, mal tratado, cuesta la visión en horas.
                Distinguir uno de otro es lo que se aprende en los años de
                formación y en la guardia hospitalaria.
              </p>
              <p className="measure mt-4 text-muted">
                Esto no le quita valor a los demás oficios de la salud visual.
                El Dr. Torres viene precisamente de una familia de optometristas
                — su padre y sus hermanas — y aprendió en ese taller la
                precisión que hoy aplica a cada prótesis. Cada profesión tiene
                su ámbito, y el trabajo sale bien cuando cada quien actúa dentro
                del suyo.
              </p>
              <p className="measure mt-4 text-muted">
                Por eso cada paciente se aborda con el tiempo que el caso
                requiere: explicando el diagnóstico, el alcance del tratamiento
                y sus límites antes de empezar.
              </p>
            </section>

            <section className="mt-14">
              <h2 className="text-2xl font-bold text-ink">
                Áreas de atención clínica
              </h2>
              <ul className="mt-6 border-t border-line">
                {services.map((service) => (
                  <li key={service.slug} className="border-b border-line">
                    <Link
                      href={`/servicios/${service.slug}`}
                      className="group flex min-h-[64px] cursor-pointer items-center gap-4 py-4 transition-colors duration-200 hover:bg-surface md:px-3"
                    >
                      <Icon
                        name={service.icon}
                        className="h-6 w-6 shrink-0 text-primary"
                      />
                      <span className="flex-1 font-medium text-ink">
                        {service.name}
                      </span>
                      <Icon
                        name="arrowRight"
                        className="h-5 w-5 shrink-0 text-primary transition-colors duration-200 group-hover:text-primary-dark"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </article>

      <FinalCta
        title="Agenda tu consulta"
        body="Escribe por WhatsApp contando tu caso y se coordina la cita en la sede que te quede mejor."
      />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Inicio", path: "/" },
          { name: "Sobre el doctor", path: "/sobre-el-doctor" },
        ])}
      />
    </>
  );
}
