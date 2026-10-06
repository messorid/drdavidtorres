import { site } from "./site";

/**
 * Reseñas de la ficha de Google del doctor, leídas de la API de Places.
 *
 * Dos fuentes, y ninguna inventa nada:
 *   - `resenasDestacadas`: reseñas reales elegidas por el cliente, copiadas
 *     LITERALMENTE de la ficha de Google (autor, estrellas, texto y mes).
 *     Si un paciente borra o cambia la suya en Google, hay que quitarla o
 *     corregirla aquí también.
 *   - La API de Places, si hay `GOOGLE_PLACES_API_KEY`: nota, total y hasta
 *     5 reseñas, siempre al día.
 *
 * Sin clave (o si Google falla) `obtenerResenas` devuelve `null` y la
 * sección usa `notaPublicada` y las destacadas. Nunca texto de ejemplo.
 *
 * Coste y frescura: la respuesta se guarda un día en la caché de Next, así
 * que la página hace una llamada diaria como mucho, unas 30 al mes, dentro
 * de lo que Google no cobra. Una reseña nueva tarda hasta 24 h en verse aquí.
 *
 * La sección enseña una selección (las destacadas, o de la API las de 4 y 5
 * estrellas) y lo dice: «algunas reseñas», con enlace a todas en Google.
 */

export type Resena = {
  autor: string;
  /** Perfil público del autor en Google Maps. */
  autorUrl: string | null;
  foto: string | null;
  estrellas: number;
  texto: string;
  /** «hace 2 meses» si viene de la API; en las destacadas, el mes en que
   *  se publicó («septiembre de 2026»), que no caduca. */
  cuando: string;
  /** La reseña en Google Maps, para leerla entera. */
  url: string | null;
};

export type DatosResenas = {
  nota: number | null;
  total: number | null;
  resenas: Resena[];
};

type RespuestaPlaces = {
  rating?: number;
  userRatingCount?: number;
  reviews?: {
    rating?: number;
    relativePublishTimeDescription?: string;
    text?: { text?: string };
    originalText?: { text?: string };
    googleMapsUri?: string;
    authorAttribution?: {
      displayName?: string;
      uri?: string;
      photoUri?: string;
    };
  }[];
};

/**
 * Nota pública de la ficha, leída en Google Maps el 5 de octubre de 2026.
 * Se usa mientras no haya clave de la API; con clave, manda la de Google.
 * Si la nota cambia en Maps, se cambia aquí. `total` queda en `null` hasta
 * confirmarlo: Google no muestra el número sin iniciar sesión.
 */
export const notaPublicada: { nota: number; total: number | null } = {
  nota: 5,
  total: null,
};

/**
 * Reseñas reales elegidas por el cliente, copiadas tal cual de Google.
 * Sin corregir ortografía ni recortar frases: es la palabra del paciente.
 */
export const resenasDestacadas: Resena[] = [];

export async function obtenerResenas(): Promise<DatosResenas | null> {
  const clave = process.env.GOOGLE_PLACES_API_KEY;
  if (!clave) return null;

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${site.fichaGoogle.placeId}?languageCode=es`,
      {
        headers: {
          "X-Goog-Api-Key": clave,
          "X-Goog-FieldMask": "rating,userRatingCount,reviews",
        },
        next: { revalidate: 86400 },
        signal: AbortSignal.timeout(8000),
      },
    );
    if (!res.ok) {
      console.error(`Reseñas de Google: respuesta ${res.status}`);
      return null;
    }
    const datos = (await res.json()) as RespuestaPlaces;

    const resenas: Resena[] = (datos.reviews ?? [])
      .map((r) => ({
        autor: r.authorAttribution?.displayName ?? "Usuario de Google",
        autorUrl: r.authorAttribution?.uri ?? null,
        foto: r.authorAttribution?.photoUri ?? null,
        estrellas: r.rating ?? 0,
        // El texto original, no la traducción automática: casi todas están
        // ya en español, y una traducida pondría en boca del paciente
        // palabras que no escribió.
        texto: (r.originalText?.text ?? r.text?.text ?? "").trim(),
        cuando: r.relativePublishTimeDescription ?? "",
        url: r.googleMapsUri ?? null,
      }))
      // Una reseña de solo estrellas no dice nada en una tarjeta; cuenta
      // igualmente en la nota media, que es de Google.
      .filter((r) => r.texto.length > 0);

    return {
      nota: datos.rating ?? null,
      total: datos.userRatingCount ?? null,
      resenas,
    };
  } catch (e) {
    console.error("Reseñas de Google: no se pudieron cargar", e);
    return null;
  }
}
