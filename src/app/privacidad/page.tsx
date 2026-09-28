import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Política de privacidad | Dr. David Torres",
  description:
    "Qué datos recoge este sitio, para qué se usan y cómo se maneja la información de salud de los pacientes.",
  path: "/privacidad",
});

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
      <h1 className="text-3xl font-bold text-ink sm:text-4xl">
        Política de privacidad
      </h1>
      <p className="mt-3 text-sm text-muted">
        Última actualización: septiembre de 2026
      </p>

      <div className="mt-10 space-y-10">
        <section>
          <h2 className="text-2xl font-bold text-ink">Qué recoge este sitio</h2>
          <p className="measure mt-4 text-muted">
            Este sitio no tiene formularios de contacto, no pide registro y no
            almacena datos de pacientes. No hay base de datos: todas las páginas
            son estáticas.
          </p>
          <p className="measure mt-4 text-muted">
            Si el sitio tiene la analítica activada, se recogen estadísticas
            agregadas de navegación mediante Google Analytics: páginas
            visitadas, tipo de dispositivo, país aproximado y desde dónde llegó
            la visita. Esa información no permite identificarte y se usa
            únicamente para saber qué contenido resulta útil.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-ink">
            Información de salud y comunicación por WhatsApp
          </h2>
          <p className="measure mt-4 text-muted">
            Cuando escribes por WhatsApp, la conversación viaja cifrada de
            extremo a extremo entre tu teléfono y el del consultorio. El
            contenido de esos mensajes no pasa por este sitio web ni queda
            registrado en él.
          </p>
          <p className="measure mt-4 text-muted">
            Lo que compartas sobre tu salud en esa conversación se trata bajo
            secreto profesional médico y se usa solo para atenderte. No se cede
            a terceros ni se emplea con fines publicitarios.
          </p>
          <p className="measure mt-4 text-muted">
            Ten en cuenta que WhatsApp es un servicio de un tercero y se rige
            además por sus propias condiciones y por las políticas de tu
            operador telefónico.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-ink">Cookies</h2>
          <p className="measure mt-4 text-muted">
            El sitio no usa cookies para publicidad ni para seguimiento entre
            sitios. Si la analítica está activa, Google Analytics puede
            almacenar identificadores de medición en tu navegador. Puedes
            bloquearlos desde la configuración de tu navegador sin que el sitio
            deje de funcionar.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-ink">Tus derechos</h2>
          <p className="measure mt-4 text-muted">
            Puedes solicitar información sobre los datos que conserva el
            consultorio a partir de tu atención médica, así como su corrección,
            escribiendo a{" "}
            <a
              href={`mailto:${site.email}`}
              className="cursor-pointer font-medium break-all text-primary underline underline-offset-4 transition-colors duration-200 hover:text-primary-dark"
            >
              {site.email}
            </a>
            . La historia clínica se conserva por el tiempo que exige la
            normativa sanitaria aplicable.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-ink">Contacto</h2>
          <p className="measure mt-4 text-muted">
            Para cualquier consulta sobre esta política, escribe a{" "}
            <a
              href={`mailto:${site.email}`}
              className="cursor-pointer font-medium break-all text-primary underline underline-offset-4 transition-colors duration-200 hover:text-primary-dark"
            >
              {site.email}
            </a>{" "}
            o llama al{" "}
            <a
              href={`tel:${site.phone}`}
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
