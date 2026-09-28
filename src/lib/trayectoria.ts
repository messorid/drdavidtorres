/**
 * Trayectoria del doctor, tal como la contó el cliente. Todo lo de aquí es
 * verificable: instituciones, cargos y formación. No se añaden logros ni
 * cifras que él no haya declarado.
 */

export const formacion = [
  {
    titulo: "Médico Cirujano",
    institucion: "Universidad Centroccidental Lisandro Alvarado (UCLA)",
    lugar: "Barquisimeto",
  },
  {
    titulo: "Postgrado y especialización en Oftalmología",
    institucion: "Universidad Centroccidental Lisandro Alvarado (UCLA)",
    lugar: "Barquisimeto",
  },
  {
    titulo: "Certificación como ocularista",
    institucion: "Formación y certificación internacional",
    lugar: "México, Colombia y Brasil",
  },
];

export const hospitales = [
  { nombre: "Hospital Central Antonio María Pineda", lugar: "Barquisimeto" },
  { nombre: "Hospital de El Tocuyo", lugar: "Lara" },
  { nombre: "Hospital de Agua Blanca", lugar: "Portuguesa" },
  { nombre: "Hospital de Sarare", lugar: "Lara", cargo: "Director" },
  { nombre: "Hospital Casal Ramos", lugar: "Acarigua" },
];

export const docencia = [
  "Universidad Centroccidental Lisandro Alvarado (UCLA)",
  "Universidad Nacional Experimental Rómulo Gallegos (UNERG)",
  "Universidad Nacional Experimental Francisco de Miranda",
];

/** Los párrafos de la historia personal, en primera persona del doctor. */
export const historia = [
  "Empecé a los diez años, trabajando con mi padre, el optometrista Dr. Neptali Torres, en la elaboración de lentes convencionales de montura. Era el trabajo de la familia: mis hermanas estudiaron optometría.",
  "Yo quería hacer algo distinto, y eso me llevó a estudiar medicina. Con los años terminé volviendo al mismo oficio por otro camino: el de las manos y la precisión, pero desde la cirugía y la oftalmología.",
  "Esa combinación es la que define hoy la consulta. La formación médica permite diagnosticar y operar; el oficio aprendido en el taller de mi padre es el que permite que una prótesis quede indistinguible del ojo sano.",
];
