import { site } from "./site";

/**
 * Reseñas de la ficha de Google del doctor, leídas de la API de Places.
 *
 * Solo se muestran reseñas que vienen de Google en ese momento. Nada se copia
 * a mano al código: una reseña pegada en el sitio no se puede verificar, se
 * queda vieja y, si el paciente la borra en Google, aquí seguiría publicada.
 *
 * Sin `GOOGLE_PLACES_API_KEY` (o si Google falla) devuelve `null`, y la
 * sección se queda en lo que siempre funciona: los botones para escribir y
 * para leer las reseñas en Google. Nunca se rellena con texto de ejemplo.
 *
 * Coste y frescura: la respuesta se guarda un día en la caché de Next, así
 * que la página hace una llamada diaria como mucho, unas 30 al mes, dentro
 * de lo que Google no cobra. Una reseña nueva tarda hasta 24 h en verse aquí.
 *
 * La API devuelve como máximo 5 reseñas, en el orden de relevancia de
 * Google. Se enseñan en ese orden y sin filtrar por estrellas: elegir solo
 * las buenas convertiría la sección en publicidad disfrazada de opinión.
 */

export type Resena = {
  autor: string;
  /** Perfil público del autor en Google Maps. */
  autorUrl: string | null;
  foto: string | null;
  estrellas: number;
  texto: string;
  /** «hace 2 meses», ya redactado por Google en español. */
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
