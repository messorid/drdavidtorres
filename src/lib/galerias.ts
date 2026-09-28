import type { Foto } from "@/components/ui/gallery";

/**
 * Fotografías del trabajo real, agrupadas por dónde se muestran.
 *
 * Todo lo de aquí son fotos propias del consultorio. No hay imágenes de
 * pacientes: las que entregó el cliente muestran rostros identificables junto
 * a su condición médica, y varias son de menores; publicarlas exige
 * consentimiento informado firmado. Están apartadas en
 * `fotos-cliente/09-PACIENTES-requiere-consentimiento`.
 */

/** El proceso completo de una prótesis, en el orden real del taller. */
export const procesoProtesis: Foto[] = [
  {
    src: "/img/galeria/proceso-1-impresion.jpg",
    alt: "Impresión de la cavidad recién retirada, sostenida con guantes",
    pie: "Se toma la impresión de la cavidad del propio paciente.",
  },
  {
    src: "/img/galeria/proceso-2-molde.jpg",
    alt: "Prótesis en su molde de yeso, aún sin terminar",
    pie: "Sobre esa impresión se hace el molde en yeso.",
  },
  {
    src: "/img/galeria/proceso-3-pintado.jpg",
    alt: "Pincel fino pintando el iris de una prótesis ocular",
    pie: "El iris se pinta a mano, con pincel, capa sobre capa.",
  },
  {
    src: "/img/galeria/proceso-4-pintado-detalle.jpg",
    alt: "Detalle del iris pintado, con las fibras y el collarete marcados",
    pie: "Se trabajan las fibras, el collarete y el anillo del borde.",
  },
  {
    src: "/img/galeria/proceso-5-pulido.jpg",
    alt: "Pulido de la prótesis con una fresa de torno",
    pie: "El pulido deja la superficie lisa para que no irrite la mucosa.",
  },
  {
    src: "/img/galeria/proceso-6-terminada.jpg",
    alt: "Prótesis ocular acabada, sostenida con guantes",
    pie: "La pieza acabada, con la esclera y sus vasos.",
  },
  {
    src: "/img/galeria/proceso-7-comparativa.jpg",
    alt: "Prótesis terminada junto a una fotografía del ojo sano del paciente",
    pie: "El color se ajusta comparando contra el ojo sano.",
  },
  {
    src: "/img/galeria/proceso-8-estuche.jpg",
    alt: "Prótesis ocular presentada en el estuche del consultorio",
    pie: "Se entrega en su estuche, con las instrucciones de cuidado.",
  },
];

export const oculoPalpebrales: Foto[] = [
  {
    src: "/img/galeria/op-1-moldes.jpg",
    alt: "Moldes de yeso y la pieza de resina de una prótesis óculo-palpebral",
    pie: "Molde, prueba y pieza final de una óculo-palpebral.",
  },
  {
    src: "/img/galeria/op-2-molde-cavidad.jpg",
    alt: "Molde de la cavidad y el lecho quirúrgico del paciente",
    pie: "El molde reproduce el lecho quirúrgico completo.",
  },
  {
    src: "/img/galeria/op-3-pieza.jpg",
    alt: "Prótesis óculo-palpebral terminada, con párpados y pestañas",
    pie: "La pieza reconstruye el ojo y los párpados como un conjunto.",
  },
  {
    src: "/img/galeria/op-4-en-elaboracion.jpg",
    alt: "Prótesis óculo-palpebral montada sobre su molde durante la elaboración",
    pie: "Montaje sobre el molde durante la elaboración.",
  },
];

export const cavidadOrbitaria: Foto[] = [
  {
    src: "/img/galeria/cavidad-1-impresion.jpg",
    alt: "Material de impresión preparado para tomar la cavidad",
    pie: "La impresión se toma con material elástico, sin molestias.",
  },
  {
    src: "/img/galeria/cavidad-2-material.jpg",
    alt: "Impresión de la cavidad ya retirada, con su forma completa",
    pie: "La forma obtenida es la que guía toda la pieza.",
  },
];

export const insumos: Foto[] = [
  {
    src: "/img/galeria/op-1-moldes.jpg",
    alt: "Moldes de yeso y piezas de resina elaboradas en el taller",
    pie: "Piezas elaboradas a medida sobre molde propio.",
  },
  {
    src: "/img/galeria/proceso-2-molde.jpg",
    alt: "Conformador montado en su molde de yeso",
    pie: "Conformadores para mantener la cavidad tras la cirugía.",
  },
  {
    src: "/img/galeria/vitrina-1.jpg",
    alt: "Prótesis oculares expuestas con iluminación",
    pie: "Piezas terminadas de distintos casos.",
  },
];

export const clinica: Foto[] = [
  {
    src: "/img/galeria/clinica-2-microscopio.jpg",
    alt: "El Dr. Torres operando a través del microscopio quirúrgico",
    pie: "Cirugía con microscopio.",
  },
  {
    src: "/img/galeria/clinica-1-consultorio.jpg",
    alt: "El Dr. Torres en su consultorio, junto al equipo de exploración",
    pie: "Consulta y exploración.",
  },
  {
    src: "/img/galeria/clinica-3-docencia.jpg",
    alt: "El Dr. Torres enseñando a un grupo de estudiantes de medicina",
    pie: "Docencia universitaria.",
  },
];

/** III Congreso Internacional de Ocularistas. */
export const congresos: Foto[] = [
  {
    src: "/img/galeria/congreso-1.jpg",
    alt: "El Dr. Torres en el III Congreso Internacional de Ocularistas",
  },
  {
    src: "/img/galeria/congreso-2.jpg",
    alt: "Grupo de ocularistas en el congreso internacional",
  },
  {
    src: "/img/galeria/congreso-3.jpg",
    alt: "Participantes del III Congreso Internacional de Ocularistas",
  },
  {
    src: "/img/galeria/congreso-4.jpg",
    alt: "El Dr. Torres con colegas ocularistas en el congreso",
  },
];

/** Galería por slug de servicio, para la página de detalle. */
export const galeriaPorServicio: Record<
  string,
  { fotos: Foto[]; titulo: string; numerada?: boolean }
> = {
  "protesis-oculares": {
    fotos: procesoProtesis,
    titulo: "Cómo se hace una prótesis, paso a paso",
    numerada: true,
  },
  "protesis-oculo-palpebrales": {
    fotos: oculoPalpebrales,
    titulo: "Piezas y moldes de casos reales",
  },
  "rehabilitacion-cavidad-orbitaria": {
    fotos: cavidadOrbitaria,
    titulo: "La toma de impresión",
  },
  "insumos-quirurgicos-oculares": {
    fotos: insumos,
    titulo: "Piezas elaboradas en el taller",
  },
  "consulta-oftalmologica": {
    fotos: clinica,
    titulo: "El consultorio",
  },
  "cirugia-catarata": {
    fotos: clinica,
    titulo: "El consultorio",
  },
};
