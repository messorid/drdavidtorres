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
};

export function buildMetadata({
  title,
  description,
  path,
  noIndex = false,
}: BuildArgs): Metadata {
  const t = truncate(title, TITLE_MAX);
  const d = truncate(description, DESCRIPTION_MAX);
  const url = canonical(path);

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
    },
    twitter: {
      card: "summary_large_image",
      title: t,
      description: d,
    },
  };
}
