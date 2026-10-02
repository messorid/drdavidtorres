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

  /* Dominio del sitio. De aquí salen canonical, sitemap, robots, JSON-LD y
     Open Graph, así que tiene que coincidir con la URL donde vive de verdad:
     un canonical apuntando a otro dominio es la forma más rápida de no
     indexarse.

     Se lee de `NEXT_PUBLIC_SITE_URL` para poder desplegar antes de tener el
     dominio definitivo — en Vercel se configura con la URL del despliegue y
     el día que haya dominio propio se cambia esa variable y nada más.

     `NEXT_PUBLIC_` y no una variable de servidor a propósito: este módulo lo
     importan también componentes de cliente, y una variable sin ese prefijo
     llegaría como `undefined` al navegador y provocaría una discrepancia de
     hidratación. */
  url: (
    process.env.NEXT_PUBLIC_SITE_URL || "https://drdavidtorres.com"
  ).replace(/\/+$/, ""),

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

type Sede = (typeof site.sedes)[number];

/**
 * Enlace a Google Maps para llegar a una sede.
 *
 * Se arma como **búsqueda** con los datos que el cliente confirmó, no con
 * coordenadas: no se han verificado sobre el mapa y un pin unos metros
 * desplazado manda al paciente a la puerta equivocada. Si Maps reconoce el
 * sitio, abre su ficha con la ruta; si no, muestra la búsqueda en la ciudad
 * correcta, que sigue siendo cierto.
 */
export function mapsUrl(sede: Sede): string {
  const consulta = [sede.lugar, sede.direccion, sede.ciudad, sede.estado, site.country]
    .filter(Boolean)
    .join(", ");
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(consulta)}`;
}
