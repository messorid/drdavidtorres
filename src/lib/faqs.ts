export type Faq = { question: string; answer: string };

/**
 * Preguntas escritas como las hace la gente, no como las escribiría una
 * clínica. Las de precio y tiempo van primero porque son las que frenan la
 * consulta; esquivarlas cuesta pacientes.
 *
 * Estas respuestas alimentan el JSON-LD de FAQPage. Si se edita una, el
 * schema cambia solo — no hay una segunda copia que actualizar.
 */
export const faqs: Faq[] = [
  {
    question: "¿Cuánto cuesta una prótesis ocular?",
    answer:
      "El costo depende del tipo de pieza y del trabajo que exija cada caso: no cuesta lo mismo una prótesis ocular que una óculo-palpebral, ni una cavidad sin complicaciones que una que necesite rehabilitarse antes. Por eso el presupuesto se da después de la valoración, cuando ya se sabe qué corresponde hacer. En la primera consulta se explica el alcance y el costo antes de iniciar cualquier trabajo.",
  },
  {
    question: "¿Cuánto tarda la elaboración de una prótesis ocular?",
    answer:
      "El tiempo lo marcan la toma de impresión, el pintado del iris y las pruebas de ajuste, que son varias sesiones y no una sola visita. En la valoración se da una fecha estimada según el caso. Si la cavidad necesita rehabilitarse antes, ese tiempo se suma y se informa desde el principio.",
  },
  {
    question: "¿Qué significa que el iris sea hiperrealista?",
    answer:
      "Que no se pinta como un color plano. Un iris real tiene fibras, un collarete alrededor de la pupila, zonas más claras y más oscuras, y un anillo oscuro en el borde. Todo eso se pinta a mano comparando contra el ojo sano en la misma sesión, junto con el tono de la esclera y el dibujo de los vasos. Es lo que hace que la pieza pase desapercibida en el trato cotidiano.",
  },
  {
    question:
      "¿Cuál es la diferencia entre una prótesis ocular y una óculo-palpebral?",
    answer:
      "La prótesis ocular reemplaza solo el globo ocular, cuando la cavidad y los párpados se conservan. La óculo-palpebral se usa cuando la cirugía retiró también los párpados y el tejido de alrededor, como ocurre tras una exenteración orbitaria; esa pieza reconstruye el ojo y los párpados como un conjunto. Cuál corresponde se define examinando al paciente, no por teléfono ni por fotografía.",
  },
  {
    question: "¿Cómo se cuida y cada cuánto hay que cambiarla?",
    answer:
      "Requiere limpieza regular y pulido periódico en consulta, porque la superficie acumula depósitos que irritan la mucosa. La pieza se cambia cuando deja de ajustar: la cavidad modifica su volumen con los años y el ajuste se pierde de forma gradual. Los controles sirven justamente para detectarlo antes de que cause molestias.",
  },
  {
    question: "¿La cirugía de catarata requiere hospitalización?",
    answer:
      "No. Es un procedimiento ambulatorio con anestesia local: el paciente regresa a casa el mismo día. Lo que sí requiere es cumplir las gotas indicadas y asistir a los controles postoperatorios, porque ahí es donde se detecta a tiempo cualquier desviación de la recuperación normal.",
  },
  {
    question: "¿El glaucoma se cura con la cirugía?",
    answer:
      "No se cura, se controla. El glaucoma daña el nervio óptico y esa visión no se recupera, ni con gotas ni con cirugía. Lo que hace el tratamiento es bajar la presión intraocular para frenar el daño y proteger la visión que queda. Por eso los controles son de por vida, aunque el paciente se sienta bien.",
  },
  {
    question: "¿El pterigión vuelve a crecer después de operarlo?",
    answer:
      "Puede volver, y esa recidiva es el problema real de esta cirugía. Se reduce de forma sustancial cubriendo el área con un injerto de conjuntiva del propio paciente en lugar de dejar la esclera desnuda, y por eso esa es la técnica de elección. La protección solar posterior no es un consejo opcional: es parte del tratamiento.",
  },
  {
    question: "¿En qué sede y qué día me toca?",
    answer:
      "En Acarigua, Clínica Cemell, de lunes a jueves en la mañana. En Barquisimeto, Centro Comercial Canaima, local SmartLenses, los viernes de 9:00 a 12:00. Los jueves en la tarde en el Hospital Clínica Ospino, solo con cita previa, y los sábados en el Centro Betel de El Tocuyo. Conviene confirmar por WhatsApp antes de viajar.",
  },
  {
    question: "¿Atiende pacientes de otros estados?",
    answer:
      "Sí. Muchos pacientes de prótesis llegan desde fuera de Lara y Portuguesa, porque son pocos los profesionales que hacen este trabajo. Si vienes de lejos, escribe antes: se organiza la agenda para aprovechar el viaje y adelantar varias etapas del proceso en los mismos días.",
  },
  {
    question: "¿Elabora insumos por encargo para otros médicos?",
    answer:
      "Sí. Conformadores, protectores corneales, anillos de simbléfaro e implantes de PMMA de 12 a 20 mm se elaboran también por encargo de cirujanos oftalmólogos para sus propios pacientes. Al escribir conviene indicar el tipo de pieza, la medida y la fecha en que se necesita.",
  },
];
