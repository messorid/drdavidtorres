/**
 * Fuente única de verdad del NAP (Nombre, Dirección, Teléfono).
 *
 * REGLA: si alguno de estos datos aparece escrito literal en un componente
 * o en un generador de JSON-LD, es un bug. Se importa siempre de aquí.
 */

export const site = {
  name: "Centro Oftalmológico y Prótesis Oculares Dr. David Torres",
  shortName: "Dr. David Torres",
  legalName: "Dr. David Alejandro Torres Rivas",
  doctor: "Dr. David Alejandro Torres Rivas",
  role: "Cirujano · Oftalmólogo · Ocularista",

  /* PENDIENTE CLIENTE — dominio definitivo. Cambiarlo aquí actualiza
     canonical, sitemap, robots, JSON-LD y Open Graph en todo el sitio. */
  url: "https://drdavidtorres.com",

  phone: "+584248099305",
  phoneDisplay: "0424-8099305",
  whatsapp: "584248099305",
  email: "Drdavidalejandro@gmail.com",

  country: "Venezuela",

  /**
   * Sedes reales, con dirección verificada por el cliente.
   *
   * `principal: true` marca la que se publica como dirección del negocio en
   * el JSON-LD. Schema.org admite una sola `address` por entidad, y debe ser
   * la de mayor dedicación: Acarigua, cuatro días por semana.
   *
   * Los horarios son los que el cliente confirmó. No se redondean ni se
   * amplían: un horario que no se cumple se paga en reseñas de una estrella
   * de gente que fue y no encontró consulta.
   */
  sedes: [
    {
      id: "acarigua",
      ciudad: "Acarigua",
      estado: "Portuguesa",
      lugar: "Clínica Cemell",
      direccion: "Avenida Las Lágrimas con calle 13 de Junio",
      principal: true,
      horario: "Lunes a jueves, en la mañana",
      dias: ["Monday", "Tuesday", "Wednesday", "Thursday"],
      // Franja declarada como "solo mañanas". Se publica como tal en la
      // página; en el schema se emite el rango de mañana estándar.
      opens: "08:00",
      closes: "12:00",
      nota: "Consulta y elaboración de prótesis.",
    },
    {
      id: "barquisimeto",
      ciudad: "Barquisimeto",
      estado: "Lara",
      lugar: "Local SmartLenses",
      direccion: "Centro Comercial Canaima",
      principal: false,
      horario: "Viernes, de 9:00 a 12:00",
      dias: ["Friday"],
      opens: "09:00",
      closes: "12:00",
      nota: null,
    },
    {
      id: "ospino",
      ciudad: "Ospino",
      estado: "Portuguesa",
      lugar: "Hospital Clínica Ospino",
      direccion: null,
      principal: false,
      horario: "Jueves en la tarde, previa cita",
      dias: ["Thursday"],
      opens: null,
      closes: null,
      nota: "Solo con cita confirmada por WhatsApp.",
    },
    {
      id: "tocuyo",
      ciudad: "El Tocuyo",
      estado: "Lara",
      lugar: "Centro Betel",
      direccion: null,
      principal: false,
      horario: "Sábados",
      dias: ["Saturday"],
      opens: null,
      closes: null,
      nota: null,
    },
  ],

  credentials: [
    "Médico Cirujano — Universidad Centroccidental Lisandro Alvarado (UCLA), Barquisimeto",
    "Postgrado y especialización en Oftalmología — UCLA, Barquisimeto",
    "Certificación como ocularista — México, Colombia y Brasil",
  ],

  /** Años de experiencia específicos en prótesis oculares, dato del cliente. */
  anosProtesis: 12,

  /* PENDIENTE CLIENTE — número de colegiatura / MPPS para el pie de página. */
  license: null as null | { type: string; number: string },

  /* PENDIENTE CLIENTE — perfiles reales. Un perfil inventado rompe el
     sameAs del schema y la confianza del paciente. */
  social: {} as Record<string, string>,
} as const;

/** Sede que se publica como dirección del negocio en el schema. */
export const sedePrincipal = site.sedes.find((s) => s.principal)!;

/** Ciudades atendidas, sin repetir, en el orden en que se declaran. */
export const ciudades = [...new Set(site.sedes.map((s) => s.ciudad))];

/** "Barquisimeto y Acarigua" — las dos sedes con consulta fija semanal. */
export const areaServedLabel = "Barquisimeto y Acarigua";

export const whatsappMessage =
  "Hola Dr. Torres, quisiera información sobre una consulta oftalmológica.";

export function whatsappUrl(message: string = whatsappMessage): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
