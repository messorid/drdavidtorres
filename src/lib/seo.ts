import type { Metadata } from "next";
import { site } from "./site";

/** Cortes duros. Se truncan por palabra, no a ojo. */
export const TITLE_MAX = 60;
export const DESCRIPTION_MAX = 155;

export function truncate(input: string, max: number): string {
  if (input.length <= max) return input;
  const cut = input.lastIndexOf(" ", max);
  return input.slice(0, cut === -1 ? max : cut).trimEnd();
}

/** Canonical siempre absoluta. Una relativa mal resuelta en un preview de
 *  Vercel puede canonicalizar producción hacia el preview. */
export function canonical(path: string): string {
  return `${site.url}${path === "/" ? "" : path}`;
}

type BuildArgs = {
  title: string;
  description: string;
  path: string;
  /** Solo para páginas que no deben indexarse. */
  noIndex?: boolean;
  /** Ruta de la tarjeta para compartir. Por defecto, la general. */
  image?: string;
};

export function buildMetadata({
  title,
  description,
  path,
  noIndex = false,
  image = "/opengraph-image",
}: BuildArgs): Metadata {
  const t = truncate(title, TITLE_MAX);
  const d = truncate(description, DESCRIPTION_MAX);
  const url = canonical(path);

  // La imagen se declara SIEMPRE aquí. Los objetos `openGraph` de cada
  // segmento se fusionan de forma superficial: en cuanto una página define el
  // suyo, borra entero el heredado, imagen incluida. Así estaban 16 de las 17
  // páginas, compartiéndose en WhatsApp sin miniatura.
  const images = [{ url: image, width: 1200, height: 630, alt: t }];

  return {
    // Absoluto: el titulo ya viene completo con su marca. Sin esto, el
    // template del layout la agregaria una segunda vez y romperia el corte de 60.
    title: { absolute: t },
    description: d,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: true } : undefined,
    openGraph: {
      title: t,
      description: d,
      url,
      siteName: site.name,
      locale: "es_VE",
      type: "website",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: t,
      description: d,
      images,
    },
  };
}
