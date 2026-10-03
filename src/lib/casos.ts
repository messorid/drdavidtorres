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
    id: "protesis-ocular-joven",
    titulo: "Prótesis ocular personalizada",
    antes: {
      src: "/img/casos/resultado-3-antes.jpg",
      alt: "Paciente joven con el párpado derecho caído, antes de la prótesis",
      pie: "Antes de la prótesis.",
    },
    despues: {
      src: "/img/casos/resultado-3-despues.jpg",
      alt: "La misma paciente con la prótesis ocular colocada y los dos ojos abiertos",
      pie: "Con la prótesis colocada.",
    },
  },
  {
    id: "protesis-ocular-nina",
    titulo: "Prótesis ocular personalizada",
    antes: {
      src: "/img/casos/resultado-5-antes.jpg",
      alt: "Paciente joven antes de la prótesis, con el párpado izquierdo caído",
      pie: "Antes de la prótesis.",
    },
    despues: {
      src: "/img/casos/resultado-5-despues.jpg",
      alt: "La misma paciente con su prótesis ocular colocada y gafas",
      pie: "Con la prótesis colocada.",
    },
  },
  {
    id: "protesis-ocular-adulto-joven",
    titulo: "Prótesis ocular personalizada",
    antes: {
      src: "/img/casos/resultado-7-antes.jpg",
      alt: "Paciente adulto joven con el ojo derecho blanquecino y opaco",
      pie: "Ojo con la córnea opaca, sin prótesis.",
    },
    despues: {
      src: "/img/casos/resultado-7-despues.jpg",
      alt: "El mismo paciente con la prótesis colocada y los dos ojos de aspecto igual",
      pie: "Con la prótesis colocada.",
    },
  },
  {
    id: "oculo-palpebral",
    titulo: "Prótesis óculo-palpebral",
    // Las fotos de este caso son del proceso, no del punto de partida: el
    // «antes» muestra la toma de impresión y el «después» la prueba en
    // consulta. Los pies dicen eso y nada más.
    antes: {
      src: "/img/casos/caso2-impresion.jpg",
      alt: "Paciente con los ojos cerrados y material de impresión naranja aplicado alrededor de la órbita derecha",
      pie: "Toma de impresión alrededor de la órbita.",
    },
    despues: {
      src: "/img/casos/caso2-prueba.jpg",
      alt: "La misma paciente con la prótesis óculo-palpebral colocada, mientras se ajusta en consulta",
      pie: "Prueba de la prótesis de ojo y párpados en consulta.",
    },
  },
  {
    id: "oculo-palpebral-adulto",
    titulo: "Prótesis óculo-palpebral",
    // El «después» es la prueba de la pieza sobre la órbita, todavía sin
    // terminar: el pie lo dice así en lugar de presentarla como resultado.
    antes: {
      src: "/img/casos/resultado-6-antes.jpg",
      alt: "Paciente mayor con la órbita izquierda cerrada y sin ojo",
      pie: "Órbita sin prótesis.",
    },
    despues: {
      src: "/img/casos/resultado-6-despues.jpg",
      alt: "El mismo paciente con la pieza de prueba de la prótesis óculo-palpebral sobre la órbita",
      pie: "Prueba de la prótesis sobre la órbita.",
    },
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
