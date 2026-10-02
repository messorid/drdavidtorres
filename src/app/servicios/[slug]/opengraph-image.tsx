import { OG_CONTENT_TYPE, OG_SIZE, tarjetaOG } from "@/lib/og";
import { getService, services } from "@/lib/services";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Servicio del Dr. David Torres, oftalmólogo y ocularista";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

/**
 * Una tarjeta por servicio, con su propia foto y su nombre: quien recibe el
 * enlace de «cirugía de catarata» por WhatsApp ve eso, no la portada genérica.
 */
export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = getService(slug)!;
  return tarjetaOG({
    etiqueta: s.area === "ocularista" ? "Ocularista" : "Oftalmología",
    titulo: s.name,
    subtitulo: s.cardLine,
    foto: `${s.slug}.jpg`,
  });
}
