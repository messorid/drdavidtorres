import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Accesibilidad | Dr. David Torres",
  description:
    "Cómo está construido este sitio para que pueda usarlo cualquier persona, incluidas las que tienen baja visión.",
  path: "/accesibilidad",
});

export default function AccessibilityPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
      <h1 className="text-3xl font-bold text-ink sm:text-4xl">Accesibilidad</h1>
      <p className="measure mt-4 text-lg text-muted">
        Este es el sitio de una consulta oftalmológica: buena parte de quienes
        lo visitan tiene alguna dificultad para ver. Que se pueda usar con baja
        visión, con lector de pantalla o solo con el teclado no es un extra.
      </p>

      <div className="mt-10 space-y-10">
        <section>
          <h2 className="text-2xl font-bold text-ink">Qué está implementado</h2>
          <ul className="mt-5 space-y-3">
            {[
              "Contraste de color conforme a WCAG 2.2 nivel AA en todo el texto.",
              "Texto base de 16 píxeles en móvil, que escala si aumentas el tamaño de letra del navegador hasta el 200 % sin que se pierda contenido.",
              "Navegación completa con teclado y foco visible de 3 píxeles en cada elemento interactivo.",
              "Enlace para saltar directamente al contenido al inicio de cada página.",
              "Estructura de encabezados jerárquica, con un solo H1 por página.",
              "Enlaces con texto propio que se entiende fuera de contexto.",
              "Botones y enlaces con área táctil mínima de 44 por 44 píxeles.",
              "Las animaciones se desactivan si tu sistema tiene activada la reducción de movimiento.",
              "Ninguna información se transmite únicamente mediante color.",
            ].map((item) => (
              <li key={item} className="measure text-muted">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-ink">
            Si encuentras una barrera
          </h2>
          <p className="measure mt-4 text-muted">
            Si alguna parte del sitio te resulta imposible de usar, escríbelo a{" "}
            <a
              href={`mailto:${site.email}`}
              className="cursor-pointer font-medium break-all text-primary underline underline-offset-4 transition-colors duration-200 hover:text-primary-dark"
            >
              {site.email}
            </a>{" "}
            indicando qué página y qué ocurrió. Se corrige y, mientras tanto, se
            te da la información que necesitabas por teléfono o por WhatsApp.
          </p>
        </section>
      </div>
    </div>
  );
}
