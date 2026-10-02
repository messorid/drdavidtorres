/**
 * Piezas que el consultorio elabora y vende por encargo.
 *
 * El destinatario es otro cirujano oftalmólogo, no el paciente: son insumos
 * que se piden para el quirófano. La redacción lo asume y por eso usa el
 * vocabulario clínico sin traducirlo.
 *
 * SIN PRECIOS A PROPÓSITO. El cliente no entregó ninguna tarifa, y poner una
 * cifra inventada en una página dirigida a colegas es peor que no poner nada:
 * se cotiza por encargo, según medida y cantidad, y así se dice.
 *
 * NOMBRE DE LAS ESFERAS. El cliente los llama «implantes intraoculares de 12
 * a 20 mm». Un implante intraocular —una lente— mide unos 6 mm de óptica; una
 * esfera de 12 a 20 mm que se coloca tras una evisceración o una enucleación
 * es un implante ORBITARIO, y así aparecen en su propia fotografía. Se publica
 * con el nombre correcto porque esta página la leen cirujanos, y llamarlo
 * intraocular restaría credibilidad justo ante quien sabe la diferencia.
 */

export type Producto = {
  slug: string;
  nombre: string;
  /** Una línea: qué es. */
  resumen: string;
  /** Para qué se usa, en términos de quirófano. */
  uso: string;
  /** Medidas confirmadas por el cliente. Vacío si no las dio. */
  medidas?: string;
  image: string;
  imageAlt: string;
  whatsappMessage: string;
};

export const productos: Producto[] = [
  {
    slug: "implantes-orbitarios",
    nombre: "Implantes orbitarios de PMMA",
    resumen:
      "Esferas de polimetilmetacrilato para reponer el volumen de la cavidad.",
    uso: "Se colocan tras una evisceración o una enucleación, antes de adaptar la prótesis.",
    medidas: "De 12 a 20 mm de diámetro",
    image: "/img/productos/implante-orbitario.jpg",
    imageAlt:
      "Esfera de PMMA transparente sostenida entre los dedos, junto a la mesa de trabajo",
    whatsappMessage:
      "Hola Dr. Torres, le escribo como colega para encargar implantes orbitarios de PMMA. Necesito el siguiente diámetro y cantidad:",
  },
  {
    slug: "conformadores-corneales",
    nombre: "Conformadores corneales",
    resumen: "Cascarillas transparentes que mantienen la forma de los fondos de saco.",
    uso: "Se usan en el postoperatorio para conservar la cavidad mientras cicatriza.",
    image: "/img/productos/conformadores-corneales.jpg",
    imageAlt:
      "Tres conformadores corneales transparentes de distintos tamaños sobre un paño claro",
    whatsappMessage:
      "Hola Dr. Torres, le escribo como colega para encargar conformadores corneales. Necesito la siguiente medida y cantidad:",
  },
  {
    slug: "anillos-simblefaro",
    nombre: "Anillos de simbléfaro",
    resumen: "Anillos que separan los párpados del globo durante la cicatrización.",
    uso: "Indicados en simbléfaro y en pterigión de gran tamaño, para evitar que las superficies se adhieran.",
    image: "/img/productos/anillo-simblefaro.jpg",
    imageAlt:
      "Anillo de simbléfaro colocado en el ojo, separando los párpados de la superficie ocular",
    whatsappMessage:
      "Hola Dr. Torres, le escribo como colega para encargar anillos de simbléfaro. Necesito la siguiente medida y cantidad:",
  },
];
