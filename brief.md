# Brief — Dr. David Alejandro Torres Rivas

## Cliente

| Campo | Valor |
|---|---|
| Nombre | Centro Oftalmológico y Prótesis Oculares Dr. David Torres |
| Profesional | Dr. David Alejandro Torres Rivas — Cirujano, oftalmólogo y ocularista |
| Vertical | Salud — oftalmología |
| Mercado | Venezuela — Acarigua y Ospino (Portuguesa), Barquisimeto y El Tocuyo (Lara) |
| Tipo | Profesional individual con consulta en dos ciudades |
| Idioma | Español |

**Jurisdicción:** Venezuela. No aplican ADA, HIPAA, TCPA, CCPA ni las reglas de
la FTC; esas son de EE.UU. Lo que sí se mantiene es el estándar de
accesibilidad WCAG 2.2 AA, porque en un sitio de oftalmología una parte real
de los visitantes tiene baja visión.

## Servicios

**Como ocularista** (el diferenciador; muy poca competencia en el SERP):

1. Prótesis oculares personalizadas con iris hiperrealistas
2. Prótesis óculo-palpebrales para pacientes oncológicos
3. Evaluación y rehabilitación de cavidad orbitaria
4. Insumos quirúrgicos: conformadores, protectores corneales, anillos de
   simbléfaro e implantes de PMMA de 12 a 20 mm

**Como oftalmólogo:**

5. Consulta oftalmológica
6. Cirugía de catarata
7. Cirugía de glaucoma
8. Cirugía de pterigión
9. Tratamiento de chalazión

Cada uno tiene su propia URL porque son intenciones de búsqueda distintas.

## Formación

- Médico Cirujano — Universidad Centroccidental Lisandro Alvarado (UCLA)
- Postgrado en Oftalmología — Universidad Centroccidental Lisandro Alvarado (UCLA)

## Contacto

| Campo | Valor |
|---|---|
| Teléfono / WhatsApp | `+584248099305` (E.164) — se muestra `0424-8099305` |
| Correo | Drdavidalejandro@gmail.com |

## Decisiones tomadas

**CTA principal: WhatsApp.** Uno solo, repetido en toda la página. Es el canal
dominante en Venezuela y el de menor fricción en móvil. Cada página precarga
un mensaje distinto según su servicio.

**Sin formulario de contacto.** Decisión deliberada, no un pendiente. Un
formulario web manda lo que escribe el paciente por correo sin cifrado de
extremo a extremo: en una consulta médica eso es información de salud viajando
por un canal que no la protege. WhatsApp cifra la conversación de punta a
punta. La página de contacto explica esto al visitante.

**Sin sección de testimonios.** No hay reseñas verificables. Escribirlas sería
inventar prueba social, así que la sección se omite entera. Cuando existan
reseñas reales de Google, se agregan citadas literalmente.

**Sin dirección ni horarios publicados.** No están confirmados. No se publica
`address`, ni `geo`, ni `openingHoursSpecification` en el schema hasta
tenerlos verificados: una dirección aproximada es dato falso y motivo de
supresión del perfil en Google.

**Sin landings de ciudad, por ahora.** Barquisimeto y Acarigua figuran como
sección real en la home. Dos páginas de ciudad sin dirección, sin horarios y
sin casos propios serían contenido clonado — doorway pages — y Google las
suprime, arrastrando al sitio entero. Se crean cuando haya material que las
diferencie de verdad.

**Identidad tomada del manual de marca del cliente.** Colores #05283C
(marino), #1363DE (azul) y blanco; tipografía Rubik; isotipo extraído del
archivo original y publicado en dos variantes, marino para fondos claros y
blanco para oscuros. No se inventó ningún color ni se sustituyó la tipografía.

El azul de marca es el **acento único** del sistema: enlaces, iconos y
numeración. Los fondos grandes —hero y CTA final— van en marino. Cuando el
CTA final estuvo en azul brillante competía con el hero y se cambió.

**Hero a pantalla completa, oscuro, con el ojo de borroso a nítido.** El
fondo pinta el iris dos veces con máscaras complementarias: desenfocado a un
lado, nítido al otro. Es la metáfora del trabajo del doctor, no decoración, y
por eso la imagen lleva su propia leyenda en pantalla.

Tres reglas que lo sostienen y no se tocan al editarlo:

1. El desenfoque vive en el fondo, **nunca en el texto ni bajo él**. Parte de
   quien abre este sitio tiene baja visión.
2. El contraste del texto del hero se **mide sobre los píxeles renderizados**
   (fondo + ojo + desenfoque + velo), no sobre el token de color. Todos los
   bloques quedan en AA; el más ajustado, la leyenda, a 5.0:1.
3. La animación de enfoque solo corre bajo `motion-safe:`. Con
   `prefers-reduced-motion` el ojo aparece ya enfocado, sin estado intermedio.

La composición en dos columnas existe solo desde `lg`. Por debajo, el texto
ocupa el ancho completo y el ojo baja a la esquina inferior derecha, que es la
única zona sin texto denso.

**Rejilla editorial (Swiss Modernism) en el resto del sitio.** El número de
sección y su etiqueta van en una línea sobre el título, no en una columna
lateral: como columna ocupaban una cuarta parte del ancho casi vacía y
empujaban el contenido 285 px a la derecha, un hueco que se notaba en todas
las secciones. Fondos de papel neutro y **un solo acento**, el teal —
que es justo lo que pide este estilo: si todo lleva color de marca, el color
deja de señalar nada.

Reglas de la rejilla, para que no se deshaga al añadir secciones:

- Todos los encabezados arrancan en el **mismo borde izquierdo** del
  contenedor, en la home y en las internas. Verificado midiendo: x=168 en las
  cinco rutas. Un bloque con caja propia (el recuadro de "Qué incluye") se
  desplaza por su padding, y eso es correcto.
- Los números de sección son **decorativos**: van en `aria-hidden` para que un
  lector de pantalla no anuncie "cero uno" antes de cada encabezado. La
  jerarquía real la da el H2.
- Las reglas divisorias se dibujan como **borde de cada columna**, nunca con
  `gap-px` sobre un contenedor de color: ese truco deja que el fondo asome
  también por el padding lateral y pinta bandas grises en los extremos.
- Listas con reglas en lugar de cuadrículas de tarjetas. El nombre del
  servicio es lo que la persona buscó, y así carga con el peso visual.

**Fotografía real del cliente, clasificada en `fotos-cliente/`.** Entregó 66
fotos y 7 vídeos (848 MB) en una sola carpeta dentro de `public/`. Se
ordenaron por tipo de trabajo y se sacaron del despliegue; `public/` bajó de
848 MB a 1,6 MB. Once imágenes del sitio son ya fotografía propia: la prótesis
terminada, el pintado a mano del iris, la toma de impresión, los moldes
óculo-palpebrales, el quirófano y el retrato del doctor.

La lista de fotos que faltan está en `FOTOS-QUE-FALTAN.md`. Cada hueco
lleva en el sitio un recuadro visible que dice qué falta, para que no se
publique por descuido.

**Casos de pacientes publicados con consentimiento.** El cliente confirmó
tener los consentimientos informados firmados, incluido el del representante
legal en los casos de menores. Hay dos casos con antes y después, cuatro
resultados y tres del proceso en consulta, en `src/lib/casos.ts`.

Los pies de foto describen **solo lo que se ve**: nada de diagnósticos,
causas, edades ni plazos. Ninguno de esos datos consta en el material
entregado, e inventarlos en una imagen clínica sería una afirmación médica
falsa. La sección tampoco se llama "testimonios", porque no hay una sola
palabra escrita por los pacientes: son fotografías de resultados.

Si un paciente revoca su consentimiento, se quita su entrada de `casos.ts` y
el sitio sigue compilando.

Glaucoma, pterigión y chalazión conservan la ilustración: no hay foto de esos
procedimientos y es preferible a ilustrarlos con la imagen de otro.

**Imágenes provisionales generadas, no de banco.** Las nueve imágenes de
servicio y las cuatro de la landing se generaron con la paleta de marca y un
motivo distinto por servicio (la niebla de la catarata, la cuña del pterigión,
los anillos de los insumos). Llevan la etiqueta `IMAGEN PROVISIONAL` a
propósito: son marcadores para que se reemplacen, no decoración definitiva.
Nunca fotografía de banco en la web de un médico — el marcador del retrato
dice directamente `FALTA FOTOGRAFÍA DEL DOCTOR`.

Se sirven con `next/image`, que las entrega en WebP y al tamaño que pide cada
punto de corte: 41 KB para las once imágenes de la home en móvil.

**El salto al inicio al cambiar de página está forzado a mano**
(`ScrollAlInicio`). El router dejaba al visitante a media página — entre 18 y
277 px según la ruta, de forma reproducible — porque al ir desde el pie de la
home (unos 7.000 px) a una página de servicio (unos 3.800 px) el navegador
recorta la posición de scroll al nuevo alto. El componente respeta las anclas
y la posición que restaura el botón atrás.

**Móvil: centrado en los bloques de presentación, alineado a la izquierda en
el texto de lectura.** Se centran el hero, la franja de credenciales, los
encabezados de sección con su número, el proceso, el CTA final, el pie y las
cabeceras de las páginas internas. NO se centran los párrafos largos, las
listas de sedes, las preguntas ni las tarjetas de servicio: centrar varias
líneas seguidas obliga al ojo a buscar dónde empieza cada una, y este es el
sitio de un oftalmólogo, con visitantes de baja visión. Desde `lg` todo
vuelve a la rejilla editorial alineada a la izquierda.

**El hero móvil es deliberadamente escueto:** eyebrow, título, una línea y el
botón. El párrafo largo, el teléfono y la nota de respuesta se quitaron de
ahí — el teléfono ya está en la barra fija inferior y el detalle completo
vive en la sección 01. Con ese texto encima, el ojo del fondo quedaba
enterrado bajo el velo y el hero era una pared de letras.

**Las cabeceras de servicio usan `object-contain` sobre el marino de marca.**
Las fotos son de objetos —una prótesis, un molde— y el recorte de `cover` les
cortaba la pieza. Con `contain` se ven enteras, y las bandas que deja el
encaje no se notan porque el fondo es el mismo marino que ya tienen las
ilustraciones.

**Multi-página, no one-page.** Cinco servicios que compiten por consultas
distintas en el buscador: "prótesis ocular", "cirugía de catarata",
"pterigión" y "chalazión" no son la misma intención de búsqueda y no pueden
vivir en la misma URL.

## Arquitectura de URLs

| URL | Intención | Título (≤60) |
|---|---|---|
| `/` | Marca + oftalmólogo general | Oftalmólogo en Barquisimeto y Acarigua \| Dr. David Torres |
| `/servicios` | Hub / navegacional | Servicios de Oftalmología y Prótesis \| Dr. Torres |
| `/servicios/protesis-oculares` | Transaccional, alta intención | Prótesis Oculares en Barquisimeto \| Dr. David Torres |
| `/servicios/cirugia-catarata` | Transaccional | Cirugía de Catarata en Barquisimeto \| Dr. David Torres |
| `/servicios/pterigion` | Transaccional | Cirugía de Pterigión en Barquisimeto \| Dr. David Torres |
| `/servicios/chalazion` | Informacional → transaccional | Tratamiento de Chalazión en Barquisimeto \| Dr. Torres |
| `/servicios/consulta-oftalmologica` | Transaccional | Consulta Oftalmológica en Barquisimeto \| Dr. Torres |
| `/sobre-el-doctor` | Marca / confianza | Dr. David Torres, Oftalmólogo en Barquisimeto |
| `/contacto` | Navegacional | Contacto y citas \| Dr. David Torres, Oftalmólogo |

La home **no** compite por "prótesis oculares": esa consulta la trabaja su
propia página. Dos URLs apuntando a la misma intención es canibalización.

## Schema

`Physician` como entidad raíz, enlazado desde cada `MedicalProcedure` con
`performer`. Más `FAQPage` en la home, `BreadcrumbList` en las internas y
`WebSite` global. Todo generado desde `src/lib/site.ts` y el contenido tipado:
no hay una segunda copia que pueda desincronizarse.

## Pendientes del cliente

Cada uno está marcado en el código con `PENDIENTE CLIENTE` y centralizado para
que el cambio sea de un archivo, no de una cacería.

| Pendiente | Dónde se cambia | Qué desbloquea |
|---|---|---|
| Dominio definitivo | `src/lib/site.ts` → `url` | Canonical, sitemap, robots, Open Graph |
| Colegiatura / MPPS | `src/lib/site.ts` → `license` | Pie de página |
| Perfiles sociales | `src/lib/site.ts` → `social` | `sameAs` del schema |
| **Fotografía del doctor** | `/sobre-el-doctor` | Confianza. La carpeta entregada solo traía logo y manual de marca. |
| Fotos de trabajos | Nueva sección de galería | Prueba visual del trabajo protésico |
| ID de Google Analytics | `.env.local` → `NEXT_PUBLIC_GA_ID` | Medición de clics a WhatsApp |

## Lo que no se hará

- Prometer posiciones en Google. Se promete trabajo implementado y medición,
  no el resultado de un tercero.
- Reseñas escritas por la agencia o por el cliente.
- Fotos de banco haciendo pasar por reales el consultorio o el doctor.
- Páginas de ciudad clonadas para cubrir más municipios.
