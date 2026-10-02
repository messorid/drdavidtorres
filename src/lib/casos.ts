import type { Caso } from "@/components/ui/before-after";
import type { Foto } from "@/components/ui/gallery";

/**
 * Casos de pacientes reales del consultorio.
 *
 * El cliente confirmó tener los consentimientos informados firmados, incluido
 * el del representante legal en los casos de menores. Si alguno se revoca,
 * basta quitar su entrada de aquí: no hay ninguna ruta que dependa de estos
 * datos y el sitio sigue compilando.
 *
 * Los pies describen SOLO lo que se ve en la fotografía. No se añaden
 * diagnósticos, causas, edades ni plazos de tratamiento: inventar ese dato
 * en una foto clínica sería una afirmación médica falsa, y además ninguno de
 * esos datos consta en el material entregado.
 */

export const casosAntesDespues: Caso[] = [
  {
    id: "protesis-ocular",
    titulo: "Prótesis ocular personalizada",
    antes: {
      src: "/img/casos/caso1-antes.jpg",
      alt: "Rostro de un paciente con la cavidad ocular hundida y el párpado caído",
      pie: "Cavidad sin prótesis, con el párpado sin soporte.",
    },
    despues: {
      src: "/img/casos/caso1-despues.jpg",
      alt: "El mismo paciente con la prótesis ocular colocada y la mirada simétrica",
      pie: "Con la prótesis colocada.",
    },
  },
  {
    id: "protesis-ocular-adulto",
    titulo: "Prótesis ocular personalizada",
    antes: {
      src: "/img/casos/caso3-antes.jpg",
      alt: "Rostro de un paciente adulto con la cavidad ocular izquierda abierta y sin prótesis",
      pie: "Cavidad sin prótesis.",
    },
    despues: {
      src: "/img/casos/caso3-despues.jpg",
      alt: "El mismo paciente con la prótesis ocular colocada y los dos ojos simétricos",
      pie: "Con la prótesis colocada.",
    },
  },
  {
    id: "oculo-palpebral",
    titulo: "Prótesis óculo-palpebral",
    antes: {
      src: "/img/casos/caso2-antes.jpg",
      alt: "Rostro de una paciente con la cavidad orbitaria expuesta tras la cirugía",
      pie: "Cavidad tras la cirugía, sin párpados.",
    },
    despues: {
      src: "/img/casos/caso2-despues.jpg",
      alt: "La misma paciente con la prótesis óculo-palpebral colocada",
      pie: "Con la prótesis de ojo y párpados colocada.",
    },
  },
];

/**
 * Resultados en los que solo hay foto con la prótesis ya puesta.
 *
 * Aquí estaba `resultado-4.jpg` con el pie «Prótesis ocular personalizada»,
 * pero esa fotografía muestra la cavidad ABIERTA Y SIN PRÓTESIS: era el
 * «antes», no un resultado. Al llegar su «después» se emparejaron y pasaron
 * a `casosAntesDespues`. Una foto de una cavidad sin tratar presentada como
 * trabajo terminado es justo la afirmación falsa que esta sección no puede
 * permitirse.
 */
export const resultados: Foto[] = [
  {
    src: "/img/casos/resultado-1.jpg",
    alt: "Paciente joven con su prótesis ocular colocada",
    pie: "Prótesis ocular personalizada.",
  },
  {
    src: "/img/casos/resultado-3.jpg",
    alt: "Paciente adolescente con su prótesis ocular colocada",
    pie: "Prótesis ocular personalizada.",
  },
  {
    src: "/img/casos/resultado-2.jpg",
    alt: "Paciente con su prótesis óculo-palpebral colocada",
    pie: "Prótesis óculo-palpebral.",
  },
];

/** El proceso, con el paciente presente en consulta. */
export const procesoConPaciente: Foto[] = [
  {
    src: "/img/casos/proceso-impresion-facial.jpg",
    alt: "Paciente con el material de impresión facial aplicado sobre la órbita",
    pie: "La impresión se toma sobre el rostro del propio paciente.",
  },
  {
    src: "/img/casos/proceso-prueba.jpg",
    alt: "Prótesis óculo-palpebral sostenida junto al rostro del paciente para comprobar el color",
    pie: "La pieza se compara contra la piel antes de terminarla.",
  },
  {
    src: "/img/casos/proceso-ajuste.jpg",
    alt: "Ajuste de la prótesis ocular en consulta, con el paciente sentado",
    pie: "Ajuste final en consulta.",
  },
];

/** Pacientes junto al doctor, ya con su prótesis. */
export const conElDoctor: Foto[] = [
  {
    src: "/img/casos/con-doctor-1.jpg",
    alt: "El Dr. Torres junto a un paciente en el consultorio",
  },
  {
    src: "/img/casos/con-doctor-2.jpg",
    alt: "El Dr. Torres junto a un paciente en la sede de Barquisimeto",
  },
  {
    src: "/img/casos/con-doctor-3.jpg",
    alt: "El Dr. Torres sosteniendo dos prótesis óculo-palpebrales terminadas",
  },
];
