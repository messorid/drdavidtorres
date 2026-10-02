import { OG_CONTENT_TYPE, OG_SIZE, tarjetaOG } from "@/lib/og";
import { site, areaServedLabel } from "@/lib/site";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = `${site.name} — ${areaServedLabel}`;

/** Tarjeta por defecto: la usan la home y toda página sin tarjeta propia. */
export default function OpenGraphImage() {
  return tarjetaOG({
    etiqueta: "Centro oftalmológico",
    titulo: "Prótesis oculares y cirugía ocular",
    subtitulo: "Iris pintado a mano. 12 años de experiencia.",
    foto: "inicio.jpg",
  });
}
