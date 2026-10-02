import { OG_CONTENT_TYPE, OG_SIZE, tarjetaOG } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Implantes orbitarios y conformadores elaborados por encargo";

export default function Image() {
  return tarjetaOG({
    etiqueta: "Para colegas",
    titulo: "Insumos quirúrgicos oculares por encargo",
    subtitulo: "Implantes de PMMA de 12 a 20 mm, conformadores y anillos.",
    foto: "productos.jpg",
  });
}
