# Imágenes de cabecera — instaladas

Las seis ilustraciones generadas ya están en su sitio. Los prompts que las
originaron quedan en `HEROES-Y-PROMPTS.md.bak`, por si hay que rehacer alguna
manteniendo el estilo.

| Dónde | Archivo | Qué muestra |
|---|---|---|
| Home, fondo del hero | `img/hero-home.jpg` | Macro de iris azul, con el efecto borroso→nítido |
| `/servicios`, apertura | `img/servicios-banner.jpg` | Iris abstracto entre anillos concéntricos |
| Cirugía de glaucoma | `img/servicio-cirugia-glaucoma.jpg` | Ojo en corte, nervio óptico y drenaje |
| Cirugía de pterigión | `img/servicio-pterigion.jpg` | Ojo de frente con la cuña de tejido |
| Chalazión | `img/servicio-chalazion.jpg` | Párpado de perfil con el nódulo |
| `/contacto`, apertura | `img/contacto.jpg` | Red de puntos y rutas entre sedes |

## Dos cosas que hubo que ajustar al instalarlas

**El velo del hero estaba calibrado para el iris dibujado**, que era mucho más
brillante que esta fotografía. Con la imagen nueva tapaba justo el efecto que
debía verse. Se abrió de 0,93 a 0,80 en el centro y de 0,52 a 0,34 en los
bordes; el efecto borroso→nítido se aprecia y el texto sigue en AA.

**El rol del doctor cayó a 4,46:1** en tablet al abrir el velo, por debajo del
mínimo de 4,5. Subió de `#a9c4d6` a `#c7dced`, la misma tinta del nombre: la
jerarquía la da el tamaño, no el color.

## El efecto borroso→nítido sigue vivo

Funciona igual sobre la fotografía que sobre el dibujo: dos capas de la misma
imagen con máscaras complementarias, una desenfocada y otra no. El desenfoque
bajó de 26px a 14px porque sobre una foto un blur alto se come el borde de la
máscara.

Se anula con `prefers-reduced-motion`.

## Si se cambia alguna

1. Mismo nombre de archivo en `public/img/`.
2. Borrar `.next/cache/images`.
3. **Volver a medir el contraste del texto encima**: se mide sobre los píxeles
   reales, y una imagen más clara de lo previsto tumba la legibilidad. Es
   exactamente lo que pasó con estas.
