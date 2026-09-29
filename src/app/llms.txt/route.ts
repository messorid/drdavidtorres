import { site, areaServedLabel } from "@/lib/site";
import { services } from "@/lib/services";
import { canonical } from "@/lib/seo";

export const dynamic = "force-static";

/**
 * Índice en Markdown de las páginas principales.
 *
 * Honestidad sobre qué es esto: Google confirmó que Search no usa llms.txt,
 * ni para ranking ni para AI Overviews. No es un entregable de SEO. Se publica
 * porque lo consumen agentes de navegación y herramientas de desarrollo, y
 * cuesta diez minutos.
 */
export function GET() {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.doctor}, Médico Cirujano y Oftalmólogo egresado de la UCLA, con ${site.anosProtesis} años como ocularista. Prótesis oculares personalizadas con iris hiperrealistas, prótesis óculo-palpebrales para pacientes oncológicos, insumos quirúrgicos oculares, y cirugía de catarata, glaucoma, pterigión y chalazión. Atiende en ${areaServedLabel}, Venezuela.`,
    "",
    "## Servicios",
    "",
    ...services.map(
      (s) => `- [${s.name}](${canonical(`/servicios/${s.slug}`)}): ${s.cardLine}`,
    ),
    "",
    "## Páginas",
    "",
    `- [Inicio](${canonical("/")}): resumen de servicios, proceso de atención y preguntas frecuentes.`,
    `- [Servicios](${canonical("/servicios")}): índice completo de los nueve servicios.`,
    `- [Sobre el doctor](${canonical("/sobre-el-doctor")}): formación y enfoque de trabajo.`,
    `- [Contacto](${canonical("/contacto")}): cómo agendar consulta y sedes de atención.`,
    `- [Accesibilidad](${canonical("/accesibilidad")}): compromiso y medidas implementadas.`,
    `- [Privacidad](${canonical("/privacidad")}): tratamiento de datos e información de salud.`,
    `- [Cookies](${canonical("/cookies")}): qué guarda el navegador y cómo evitarlo.`,
    "",
    "## Sedes",
    "",
    ...site.sedes.map(
      (s) =>
        `- ${s.ciudad}, ${s.estado} — ${s.lugar}${s.direccion ? `, ${s.direccion}` : ""}. ${s.horario}.`,
    ),
    "",
    "## Contacto",
    "",
    `- WhatsApp y teléfono: ${site.phoneDisplay}`,
    `- Correo: ${site.email}`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
