export type Area = "oftalmologia" | "ocularista";

export type Service = {
  slug: string;
  /** Nombre corto, para tarjetas y navegación. */
  name: string;
  /** Las dos áreas del consultorio, tal como las distingue el doctor. */
  area: Area;
  /** <title> de la página. Distinto del H1, siempre. */
  metaTitle: string;
  /** ≤155 caracteres. Escrita para el clic. */
  metaDescription: string;
  /** H1 de la página de servicio. Nunca igual al metaTitle. */
  h1: string;
  /** Una línea para la lista de la home: qué es. */
  cardLine: string;
  /** A quién sirve. */
  forWhom: string;
  /** Párrafo de entrada de la página de servicio. */
  lead: string;
  /** Qué incluye la atención. Viñetas cortas y verificables. */
  includes: string[];
  /** Bloques de contenido. Cada `heading` se renderiza como H2. */
  sections: { heading: string; body: string[] }[];
  /** Icono: clave en components/ui/icon.tsx */
  icon:
    | "prosthesis"
    | "eye"
    | "cataract"
    | "pterygium"
    | "chalazion"
    | "glaucoma"
    | "orbit"
    | "tools";
  /** Mensaje precargado del WhatsApp desde esta página. */
  whatsappMessage: string;
  /** Imagen de la tarjeta, en 16:10. */
  image: string;
  /** Imagen de la cabecera de la página, en 21:8.
   *
   *  Es un archivo aparte a propósito: la tarjeta y la cabecera tienen
   *  proporciones muy distintas (1.6 frente a 2.63), y servir el mismo
   *  archivo a las dos hacía que la cabecera recortara el 39% del alto —
   *  en la foto del consultorio, eso cortaba la cara del doctor. */
  imageHero: string;
  /** Variante vertical/cuadrada de la cabecera, para móvil.
   *
   *  Opcional. Cuando existe, la cabecera deja de encajar la imagen sobre
   *  marino y pasa a llenar el marco en los dos tamaños: hay un archivo
   *  pensado para cada proporción, así que no hacen falta bandas. */
  imageHeroMobile?: string;
  /** Texto alternativo de esa imagen. Describe la imagen, no repite el
   *  título del servicio. */
  imageAlt: string;
  /** Términos por los que la gente busca esto, aunque no aparezcan escritos
   *  en la página. Solo alimentan el buscador: nunca se muestran.
   *
   *  Únicamente sinónimos reales. No se mapea «orzuelo» a chalazión: un
   *  orzuelo es una infección aguda y un chalazión un granuloma crónico, y
   *  llevar a alguien de uno a otro es un error clínico, no una comodidad
   *  de búsqueda. */
  keywords?: string[];
  /** Etiqueta corta para la barra de navegación. */
  navLabel: string;
  /** Aparece en la navegación principal. */
  inNav: boolean;
};

export const areaLabels: Record<Area, { title: string; intro: string }> = {
  oftalmologia: {
    title: "Como oftalmólogo",
    intro:
      "Diagnóstico y tratamiento de enfermedades oculares, y la cirugía que cada caso requiera.",
  },
  ocularista: {
    title: "Como ocularista",
    intro:
      "Rehabilitación de la cavidad orbitaria y elaboración de prótesis e insumos hechos a medida para cada paciente.",
  },
};

export const services: Service[] = [
  /* --------------------------- Oftalmología --------------------------- */
  {
    slug: "consulta-oftalmologica",
    name: "Consulta oftalmológica",
    area: "oftalmologia",
    metaTitle: "Consulta Oftalmológica en Barquisimeto | Dr. Torres",
    metaDescription:
      "Diagnóstico y tratamiento de enfermedades oculares. Consulta oftalmológica completa en Barquisimeto y Acarigua con el Dr. David Torres.",
    h1: "Diagnóstico y tratamiento de enfermedades oculares",
    cardLine:
      "Evaluación completa de la visión y de la salud del ojo, con diagnóstico y plan.",
    forWhom:
      "Cualquier persona con síntomas oculares o que necesite un control periódico.",
    lead:
      "La mayoría de las enfermedades que más visión cuestan no duelen y no dan síntomas hasta que el daño ya está hecho. El glaucoma y la retinopatía diabética son los dos ejemplos claros: se detectan en consulta, no por cómo se siente el paciente.",
    includes: [
      "Agudeza visual y refracción",
      "Evaluación del segmento anterior con lámpara de hendidura",
      "Medición de la presión intraocular",
      "Fondo de ojo",
      "Diagnóstico, plan de tratamiento y controles",
    ],
    sections: [
      {
        heading: "Motivos para consultar sin postergar",
        body: [
          "Pérdida de visión súbita en uno o ambos ojos, destellos de luz, una lluvia de puntos negros que aparece de golpe, una sombra que avanza sobre el campo visual, dolor ocular intenso con ojo rojo, o visión doble de aparición reciente.",
          "Cualquiera de estos síntomas requiere evaluación el mismo día. No son casos para esperar a ver si mejoran.",
        ],
      },
      {
        heading: "Quién necesita control aunque vea bien",
        body: [
          "Las personas con diabetes, porque la retinopatía diabética avanza en silencio y el control periódico es lo que permite tratarla a tiempo.",
          "Las personas con antecedentes familiares de glaucoma, por el mismo motivo: el glaucoma no duele y la visión que se pierde no se recupera.",
          "Los adultos a partir de los 40 años, cuando empiezan a aparecer tanto la presbicia como las primeras alteraciones detectables del nervio óptico y la retina.",
        ],
      },
    ],
    icon: "eye",
    whatsappMessage:
      "Hola Dr. Torres, quisiera agendar una consulta oftalmológica.",
    image: "/img/servicio-consulta-oftalmologica.jpg",
    imageHero: "/img/servicio-consulta-oftalmologica-hero.jpg",
    imageHeroMobile: "/img/servicio-consulta-oftalmologica-movil.jpg",
    imageAlt:
      "Exploración del ojo con la lámpara de hendidura: el haz de luz ilumina el iris de la paciente",
    keywords: ["examen de la vista", "revisión", "control", "ojo rojo", "visión borrosa", "agudeza visual"],
    navLabel: "Consulta",
    inNav: false,
  },
  {
    slug: "cirugia-catarata",
    name: "Cirugía de catarata",
    area: "oftalmologia",
    metaTitle: "Cirugía de Catarata en Barquisimeto | Dr. David Torres",
    metaDescription:
      "Evaluación y cirugía de catarata con reemplazo del cristalino por lente intraocular. Consulta con oftalmólogo en Barquisimeto y Acarigua.",
    h1: "Cirugía de catarata",
    cardLine:
      "Reemplazo del cristalino opaco por un lente intraocular transparente.",
    forWhom:
      "Pacientes con visión borrosa progresiva, deslumbramiento o colores apagados.",
    lead:
      "La catarata es la pérdida de transparencia del cristalino. No se quita con gotas ni con lentes nuevos: el único tratamiento que devuelve la visión es reemplazar el cristalino por un lente intraocular.",
    includes: [
      "Evaluación de la agudeza visual y del fondo de ojo",
      "Biometría para calcular el lente intraocular que corresponde",
      "Explicación de las opciones de lente y sus diferencias reales",
      "Cirugía y controles postoperatorios",
    ],
    sections: [
      {
        heading: "Cómo saber si la catarata ya necesita cirugía",
        body: [
          "El momento no lo define la catarata, lo define la vida del paciente. Cuando la visión borrosa ya estorba para conducir de noche, leer, reconocer caras o trabajar, la cirugía está indicada.",
          "Las señales típicas son visión borrosa que no mejora cambiando los lentes, deslumbramiento con las luces de frente, colores que se ven apagados o amarillentos, y necesidad de más luz para leer.",
          "Esperar a que la catarata esté muy avanzada no tiene ventajas y sí complica la cirugía: un cristalino más duro requiere más energía para removerse.",
        ],
      },
      {
        heading: "Qué se hace en la cirugía",
        body: [
          "Se retira el cristalino opaco a través de una incisión pequeña y se coloca en su lugar un lente intraocular transparente, calculado previamente con biometría para cada ojo.",
          "Es un procedimiento ambulatorio con anestesia local. El paciente regresa a casa el mismo día y se le indican gotas y controles en los días siguientes.",
          "La elección del lente se conversa antes de la cirugía. Hay opciones que corrigen solo la visión de lejos y otras que buscan reducir la dependencia de los anteojos; cada una tiene ventajas y limitaciones que conviene entender antes de decidir, no después.",
        ],
      },
    ],
    icon: "cataract",
    whatsappMessage:
      "Hola Dr. Torres, quisiera información sobre la cirugía de catarata.",
    image: "/img/servicio-cirugia-catarata.jpg",
    imageHero: "/img/servicio-cirugia-catarata-hero.jpg",
    imageAlt:
      "El Dr. Torres operando a través del microscopio quirúrgico",
    keywords: ["cataratas", "lente intraocular", "facoemulsificación", "cristalino"],
    navLabel: "Catarata",
    inNav: false,
  },
  {
    slug: "cirugia-glaucoma",
    name: "Cirugía de glaucoma",
    area: "oftalmologia",
    metaTitle: "Cirugía de Glaucoma en Barquisimeto | Dr. David Torres",
    metaDescription:
      "Tratamiento y cirugía de glaucoma para bajar la presión intraocular y frenar el daño del nervio óptico. Consulta en Barquisimeto y Acarigua.",
    h1: "Cirugía de glaucoma",
    cardLine:
      "Baja la presión intraocular cuando las gotas ya no alcanzan a controlarla.",
    forWhom:
      "Pacientes con glaucoma que progresa pese al tratamiento médico.",
    lead:
      "El glaucoma daña el nervio óptico de forma lenta y sin dolor. La visión que se pierde no vuelve, así que todo el tratamiento apunta a una sola cosa: frenar el daño antes de que avance.",
    includes: [
      "Medición de la presión intraocular y evaluación del nervio óptico",
      "Estudio del campo visual para medir el daño existente",
      "Ajuste del tratamiento médico cuando aún es suficiente",
      "Cirugía cuando la presión no se controla con gotas",
      "Controles de por vida, porque el glaucoma no se cura",
    ],
    sections: [
      {
        heading: "Por qué el glaucoma se detecta tarde",
        body: [
          "No duele y no da visión borrosa al principio. El daño empieza por la visión periférica, y el cerebro completa lo que falta, así que la persona no nota nada hasta que el campo visual ya está muy reducido.",
          "Por eso el control periódico es el único método real de detección, sobre todo con antecedentes familiares, después de los 40 años, o en personas con diabetes o miopía alta.",
        ],
      },
      {
        heading: "Cuándo se pasa de las gotas a la cirugía",
        body: [
          "El tratamiento empieza casi siempre con gotas que bajan la presión intraocular. Funcionan, pero exigen cumplimiento diario y de por vida.",
          "Se plantea cirugía cuando la presión no baja lo suficiente con el tratamiento máximo, cuando el campo visual sigue deteriorándose pese a una presión aparentemente aceptable, o cuando el paciente no tolera las gotas.",
          "La cirugía crea una vía alternativa para que el humor acuoso salga del ojo y la presión descienda. No devuelve la visión perdida: la protege de lo que queda por perder, que es exactamente el objetivo.",
        ],
      },
    ],
    icon: "glaucoma",
    whatsappMessage:
      "Hola Dr. Torres, quisiera información sobre el glaucoma.",
    image: "/img/servicio-cirugia-glaucoma.jpg",
    imageHero: "/img/servicio-cirugia-glaucoma-hero.jpg",
    imageAlt:
      "Ilustración anatómica de un ojo en corte, con el cristalino y el nervio óptico",
    keywords: ["presión ocular", "presión del ojo", "tensión ocular", "nervio óptico"],
    navLabel: "Glaucoma",
    inNav: false,
  },
  {
    slug: "pterigion",
    name: "Cirugía de pterigión",
    area: "oftalmologia",
    metaTitle: "Cirugía de Pterigión en Barquisimeto | Dr. David Torres",
    metaDescription:
      "Cirugía de pterigión con injerto conjuntival para reducir la recidiva. Evaluación y tratamiento en Barquisimeto y Acarigua.",
    h1: "Cirugía de pterigión",
    cardLine:
      "Extirpación del tejido con injerto conjuntival para reducir la recidiva.",
    forWhom:
      "Pacientes con carnosidad que crece hacia la córnea, ardor o enrojecimiento persistente.",
    lead:
      "El pterigión es un crecimiento de tejido desde la conjuntiva hacia la córnea, asociado a la exposición prolongada al sol, al viento y al polvo. Cuando avanza sobre el eje visual, afecta la visión.",
    includes: [
      "Evaluación del grado de avance sobre la córnea",
      "Medición del astigmatismo que el pterigión esté induciendo",
      "Cirugía con injerto conjuntival",
      "Controles postoperatorios y pauta de protección solar",
    ],
    sections: [
      {
        heading: "Cuándo operar un pterigión",
        body: [
          "No todo pterigión necesita cirugía. Cuando es pequeño y no molesta, se controla y se maneja con lubricación y protección solar.",
          "La cirugía se indica cuando el tejido avanza hacia el centro de la córnea, cuando induce astigmatismo que deteriora la visión, cuando causa irritación persistente que no cede con lubricantes, o cuando limita el movimiento del ojo.",
        ],
      },
      {
        heading: "Por qué el injerto conjuntival importa",
        body: [
          "La recidiva es el problema real de esta cirugía: el pterigión puede volver a crecer, y cuando vuelve suele hacerlo de forma más agresiva que la primera vez.",
          "Extirpar el tejido y dejar la esclera desnuda es la técnica con mayor tasa de recidiva. Cubrir el área con un injerto de conjuntiva del mismo paciente la reduce de forma sustancial, y por eso es la técnica de elección.",
          "Después de la cirugía, la protección solar deja de ser un consejo y pasa a ser parte del tratamiento. La exposición sin protección es lo que trajo el pterigión la primera vez.",
        ],
      },
    ],
    icon: "pterygium",
    whatsappMessage:
      "Hola Dr. Torres, quisiera información sobre la cirugía de pterigión.",
    image: "/img/servicio-pterigion.jpg",
    imageHero: "/img/servicio-pterigion-hero.jpg",
    imageAlt:
      "Ilustración anatómica de un ojo con un pterigión avanzando hacia la córnea",
    keywords: ["carnosidad", "pterigio"],
    navLabel: "Pterigión",
    inNav: false,
  },
  {
    slug: "chalazion",
    name: "Tratamiento de chalazión",
    area: "oftalmologia",
    metaTitle: "Tratamiento de Chalazión en Barquisimeto | Dr. Torres",
    metaDescription:
      "Tratamiento y drenaje de chalazión en el párpado. Evaluación con oftalmólogo en Barquisimeto y Acarigua.",
    h1: "Tratamiento de chalazión",
    cardLine: "Manejo médico y drenaje del nódulo del párpado.",
    forWhom:
      "Pacientes con un bulto firme en el párpado que no cede por sí solo.",
    lead:
      "El chalazión es un nódulo que se forma cuando una glándula de Meibomio del párpado se obstruye. No es una infección, aunque suele confundirse con el orzuelo, que sí lo es y duele.",
    includes: [
      "Diagnóstico diferencial con orzuelo y otras lesiones del párpado",
      "Tratamiento médico inicial y pauta de calor local",
      "Drenaje en consulta cuando el manejo médico no resuelve",
      "Manejo de la blefaritis de fondo para evitar recurrencias",
    ],
    sections: [
      {
        heading: "Cuándo alcanza con tratamiento médico",
        body: [
          "Muchos chalaziones resuelven con calor local aplicado de forma constante durante varias semanas, masaje del párpado e higiene palpebral. La clave es la constancia: unos días de compresas no bastan.",
          "Si después de ese período el nódulo sigue igual, si es grande y deforma el párpado, o si presiona la córnea y altera la visión, corresponde drenarlo.",
        ],
      },
      {
        heading: "Por qué vuelve a aparecer",
        body: [
          "El chalazión que se repite casi siempre tiene detrás una disfunción de las glándulas de Meibomio o una blefaritis crónica. Drenar el nódulo resuelve el episodio, pero no la causa.",
          "Por eso el tratamiento incluye el manejo del borde palpebral. Sin eso, el paciente vuelve a consulta con otro chalazión unos meses después.",
        ],
      },
      {
        heading: "Cuándo consultar sin esperar",
        body: [
          "Un nódulo que recurre siempre en el mismo sitio, que sangra, que hace perder las pestañas de esa zona o que deforma el borde del párpado necesita evaluación, porque esas características no son propias de un chalazión común.",
        ],
      },
    ],
    icon: "chalazion",
    whatsappMessage:
      "Hola Dr. Torres, quisiera información sobre el tratamiento de un chalazión.",
    image: "/img/servicio-chalazion.jpg",
    imageHero: "/img/servicio-chalazion-hero.jpg",
    imageAlt:
      "Ilustración anatómica de un párpado de perfil con un chalazión en el borde",
    keywords: ["bulto en el párpado", "quiste en el párpado", "chalazio"],
    navLabel: "Chalazión",
    inNav: false,
  },

  /* ---------------------------- Ocularista ---------------------------- */
  {
    slug: "protesis-oculares",
    name: "Prótesis oculares personalizadas",
    area: "ocularista",
    metaTitle: "Prótesis Oculares en Barquisimeto | Dr. David Torres",
    metaDescription:
      "Prótesis oculares personalizadas con iris hiperrealistas, hechas a medida. 12 años de experiencia. Consulta en Barquisimeto y Acarigua.",
    h1: "Prótesis oculares personalizadas con iris hiperrealistas",
    cardLine:
      "Pieza hecha a medida, con el iris pintado a mano para igualar el ojo sano.",
    forWhom:
      "Pacientes con pérdida del globo ocular por cirugía, trauma o enfermedad.",
    lead:
      "Una prótesis bien hecha no se nota. Se diseña sobre la anatomía de cada paciente y se pinta tomando como referencia el ojo sano, para que el iris, el color de la esclera y el dibujo de los vasos coincidan.",
    includes: [
      "Valoración de la cavidad y del tejido que la rodea",
      "Toma de impresión personalizada, no molde prefabricado",
      "Iris pintado a mano comparando contra el ojo sano",
      "Pruebas de ajuste y correcciones antes de la entrega",
      "Instrucciones de colocación, retiro y limpieza",
      "Controles de seguimiento y pulido periódico",
    ],
    sections: [
      {
        heading: "Qué significa que el iris sea hiperrealista",
        body: [
          "El iris no es un color plano. Tiene fibras, un collarete alrededor de la pupila, zonas más claras y más oscuras, y un anillo límbico en el borde. Una pieza que resuelve el iris con un solo tono se reconoce de inmediato.",
          "El pintado se hace a mano y se compara contra el ojo sano en la misma sesión, con el paciente presente. Se ajustan también el tono de la esclera y el dibujo de los vasos, que es lo que termina de integrar la pieza en la mirada.",
        ],
      },
      {
        heading: "Cómo es el proceso, paso a paso",
        body: [
          "Primero se evalúa la cavidad: su profundidad, el estado de la mucosa, la posición de los párpados y si hay secreción o irritación que deba tratarse antes de continuar.",
          "Luego se toma la impresión de la cavidad, para que la pieza se apoye sin puntos de presión. Un molde prefabricado que no calza es la causa más frecuente de irritación crónica y de que el paciente termine no usando la prótesis.",
          "Antes de entregar se hacen pruebas de ajuste y se corrige lo que haga falta. Al final se enseña la colocación, el retiro y la limpieza, porque de eso depende la vida útil de la pieza.",
        ],
      },
      {
        heading: "Cuidados y seguimiento",
        body: [
          "La prótesis necesita limpieza regular y pulido periódico en consulta. Con el tiempo la superficie acumula depósitos que irritan la mucosa, y un pulido devuelve el acabado sin necesidad de una pieza nueva.",
          "La cavidad también cambia: el volumen del tejido se modifica en los años posteriores a la cirugía, y en algún momento la pieza deja de ajustar. Los controles sirven para detectarlo antes de que cause molestias.",
        ],
      },
    ],
    icon: "prosthesis",
    whatsappMessage:
      "Hola Dr. Torres, quisiera información sobre una prótesis ocular.",
    image: "/img/servicio-protesis-oculares.jpg",
    imageHero: "/img/servicio-protesis-oculares-hero.jpg",
    imageAlt:
      "Prótesis ocular terminada, con el iris pintado a mano y los vasos de la esclera",
    keywords: ["ojo artificial", "ojo postizo", "ojo de vidrio", "prótesis de ojo", "iris pintado"],
    navLabel: "Prótesis oculares",
    inNav: true,
  },
  {
    slug: "protesis-oculo-palpebrales",
    name: "Prótesis óculo-palpebrales",
    area: "ocularista",
    metaTitle: "Prótesis Óculo-Palpebrales | Dr. David Torres",
    metaDescription:
      "Prótesis que reconstruyen ojo y párpados para pacientes oncológicos tras exenteración orbitaria. Elaboración a medida en Barquisimeto y Acarigua.",
    h1: "Prótesis óculo-palpebrales para pacientes oncológicos",
    cardLine:
      "Reconstruyen el ojo y los párpados como un conjunto, cuando la cirugía retiró ambos.",
    forWhom:
      "Pacientes oncológicos tras exenteración orbitaria y grandes resecciones.",
    lead:
      "Cuando la cirugía tuvo que retirar el ojo junto con los párpados y el tejido de alrededor, una prótesis ocular común no basta: no hay cavidad ni párpados donde apoyarla. La pieza óculo-palpebral reconstruye el conjunto.",
    includes: [
      "Evaluación del lecho quirúrgico y de la piel circundante",
      "Impresión facial de la zona a reconstruir",
      "Modelado de párpados, pestañas y tono de piel del paciente",
      "Definición del sistema de sujeción según el caso",
      "Pruebas de ajuste y ajustes de color con luz natural",
      "Controles y mantenimiento de la pieza",
    ],
    sections: [
      {
        heading: "Cuándo se indica en lugar de una prótesis ocular",
        body: [
          "La prótesis ocular reemplaza solo el globo ocular, y necesita que la cavidad y los párpados se conserven. Se apoya en la cavidad y acompaña parcialmente el movimiento del ojo sano.",
          "La óculo-palpebral se indica cuando esa cavidad ya no existe, como ocurre tras una exenteración orbitaria. Entonces la pieza reproduce el ojo, los párpados y la piel de alrededor en un solo cuerpo.",
          "Cuál corresponde se define examinando al paciente. No es una decisión que pueda tomarse por teléfono ni a partir de una fotografía.",
        ],
      },
      {
        heading: "Cómo se sostiene la pieza",
        body: [
          "Según el caso, con adhesivo médico para piel, integrada a la montura de unos anteojos, o mediante anclajes. La elección depende del tamaño del defecto, del estado de la piel y de la vida diaria del paciente.",
          "Los anteojos cumplen además una función práctica: disimulan el borde de la pieza y hacen la transición mucho menos visible.",
        ],
      },
      {
        heading: "El ritmo de estos casos",
        body: [
          "Una parte importante de estos pacientes llega después de un tratamiento oncológico largo. La prótesis es la última etapa de una reconstrucción que empezó mucho antes, y eso cambia el ritmo de la consulta: se explica cada paso y no se apuran decisiones.",
        ],
      },
    ],
    icon: "orbit",
    whatsappMessage:
      "Hola Dr. Torres, quisiera información sobre una prótesis óculo-palpebral.",
    image: "/img/servicio-protesis-oculo-palpebrales.jpg",
    imageHero: "/img/servicio-protesis-oculo-palpebrales-hero.jpg",
    imageAlt:
      "Prótesis óculo-palpebral sostenida en la palma de la mano del doctor",
    keywords: ["prótesis facial", "epítesis", "párpados", "oncológico"],
    navLabel: "Óculo-palpebrales",
    inNav: false,
  },
  {
    slug: "rehabilitacion-cavidad-orbitaria",
    name: "Evaluación y rehabilitación de cavidad orbitaria",
    area: "ocularista",
    metaTitle: "Rehabilitación de Cavidad Orbitaria | Dr. Torres",
    metaDescription:
      "Evaluación y rehabilitación de la cavidad orbitaria antes de colocar una prótesis ocular. Atención en Barquisimeto y Acarigua.",
    h1: "Evaluación y rehabilitación de la cavidad orbitaria",
    cardLine:
      "Prepara la cavidad para que la prótesis ajuste y deje de irritar.",
    forWhom:
      "Pacientes con cavidad retraída, secreción persistente o prótesis que ya no asienta.",
    lead:
      "La prótesis descansa sobre la cavidad. Si la cavidad está retraída, inflamada o con los fondos de saco perdidos, ninguna pieza va a quedar cómoda por bien hecha que esté. Por eso se evalúa y se trata antes.",
    includes: [
      "Examen de los fondos de saco y de la mucosa",
      "Valoración de la posición y el tono de los párpados",
      "Manejo de la secreción y de la inflamación crónica",
      "Uso de conformadores para recuperar volumen",
      "Plan escalonado hasta poder tomar la impresión definitiva",
    ],
    sections: [
      {
        heading: "Señales de que la cavidad necesita atención",
        body: [
          "Secreción constante, enrojecimiento de la mucosa que no cede, una prótesis que se sale sola o que hay que estar acomodando, el párpado inferior caído, o la sensación de que la pieza cambió de posición con los meses.",
          "También cuando la cavidad se ve hundida: es un déficit de volumen, y aumentar el grosor de la prótesis para compensarlo solo traslada el problema al párpado.",
        ],
      },
      {
        heading: "Por qué no se salta este paso",
        body: [
          "Tomar una impresión sobre una cavidad inflamada da una pieza que calza en un estado que no es el definitivo. Cuando la inflamación cede, la prótesis deja de ajustar y hay que rehacerla.",
          "Rehabilitar primero cuesta tiempo, pero es lo que hace que la prótesis dure y que el paciente la use todo el día sin pensar en ella.",
        ],
      },
    ],
    icon: "orbit",
    whatsappMessage:
      "Hola Dr. Torres, quisiera una evaluación de mi cavidad orbitaria.",
    image: "/img/servicio-rehabilitacion-cavidad-orbitaria.jpg",
    imageHero: "/img/servicio-rehabilitacion-cavidad-orbitaria-hero.jpg",
    imageAlt:
      "Impresión de la cavidad recién tomada, sostenida con guantes",
    keywords: ["cavidad", "evisceración", "enucleación", "conformador"],
    navLabel: "Cavidad orbitaria",
    inNav: false,
  },
  {
    slug: "insumos-quirurgicos-oculares",
    name: "Insumos quirúrgicos oculares",
    area: "ocularista",
    metaTitle: "Insumos Quirúrgicos Oculares | Dr. David Torres",
    metaDescription:
      "Elaboración de conformadores, protectores corneales, anillos de simbléfaro e implantes de PMMA de 12 a 20 mm para cirugía oftálmica.",
    h1: "Elaboración de insumos quirúrgicos oculares",
    cardLine:
      "Conformadores, protectores corneales, anillos de simbléfaro e implantes de PMMA.",
    forWhom: "Cirujanos oftalmólogos y pacientes en el postoperatorio.",
    lead:
      "Parte del trabajo del ocularista no se ve en el espejo: son las piezas que sostienen un resultado quirúrgico mientras el tejido cicatriza. Se elaboran a medida y por encargo.",
    includes: [
      "Conformadores para mantener el volumen y los fondos de saco",
      "Protectores corneales para el postoperatorio",
      "Anillos de simbléfaro para evitar adherencias durante la cicatrización",
      "Implantes de PMMA de 12, 14, 16, 18 y 20 mm",
    ],
    sections: [
      {
        heading: "Para qué sirve cada pieza",
        body: [
          "El conformador mantiene la forma de la cavidad y la profundidad de los fondos de saco mientras cicatriza, en el período entre la cirugía y la prótesis definitiva. Sin él, la cavidad se retrae y luego no hay dónde apoyar la pieza.",
          "El protector corneal resguarda la córnea durante el postoperatorio en casos donde el párpado no puede cumplir esa función.",
          "El anillo de simbléfaro se coloca para impedir que la conjuntiva del párpado y la del globo se adhieran entre sí mientras cicatrizan, que es lo que limita el movimiento del ojo cuando ocurre.",
          "Los implantes de PMMA reponen el volumen perdido en la órbita tras la extracción del globo ocular. El diámetro se elige según el caso, entre 12 y 20 mm.",
        ],
      },
      {
        heading: "Encargos para otros profesionales",
        body: [
          "Estas piezas se elaboran también por encargo de cirujanos oftalmólogos que las necesitan para sus propios pacientes. Escribe indicando el tipo de pieza, la medida y la fecha en que la necesitas.",
        ],
      },
    ],
    icon: "tools",
    whatsappMessage:
      "Hola Dr. Torres, quisiera consultar por insumos quirúrgicos oculares.",
    image: "/img/servicio-insumos-quirurgicos-oculares.jpg",
    imageHero: "/img/servicio-insumos-quirurgicos-oculares-hero.jpg",
    imageAlt:
      "Tres implantes orbitarios porosos y tres conformadores transparentes, de distintos tamaños, sobre fondo gris claro",
    keywords: ["conformador", "anillo de simbléfaro", "protector corneal", "PMMA", "implante orbitario", "colegas"],
    navLabel: "Insumos quirúrgicos",
    inNav: false,
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

/** Los que aparecen en la barra de navegación. */
export const navServices = services.filter((s) => s.inNav);

export function servicesByArea(area: Area): Service[] {
  return services.filter((s) => s.area === area);
}

/** Lo único que necesita una tarjeta. `ServiceCard` acepta esto y también
 *  un `Service` completo. */
export type DatosTarjeta = Pick<
  Service,
  "slug" | "name" | "cardLine" | "forWhom" | "icon" | "image" | "imageAlt"
>;

/** Quita acentos y pasa a minúsculas: aquí se busca «protesis» tanto como
 *  «prótesis», y en un teclado de móvil lo primero es lo habitual. */
export function normaliza(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
}

export type ServicioTarjeta = DatosTarjeta & {
  area: Area;
  /** Texto ya normalizado contra el que busca el explorador. */
  buscable: string;
};

/**
 * Proyección que se manda al cliente. El explorador es un componente de
 * cliente, así que todo lo que reciba viaja en el payload: pasarle los
 * `Service` enteros arrastraría `sections`, `lead` y `metaDescription` de
 * los nueve servicios sin que nadie los use. El índice de búsqueda se
 * calcula aquí, en el servidor, una sola vez.
 */
export const serviciosTarjeta: ServicioTarjeta[] = services.map((s) => ({
  slug: s.slug,
  name: s.name,
  area: s.area,
  cardLine: s.cardLine,
  forWhom: s.forWhom,
  icon: s.icon,
  image: s.image,
  imageAlt: s.imageAlt,
  buscable: normaliza(
    [
      s.name,
      s.cardLine,
      s.forWhom,
      areaLabels[s.area].title,
      ...s.includes,
      ...(s.keywords ?? []),
    ].join(" · "),
  ),
}));
