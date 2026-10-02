import { OG_CONTENT_TYPE, OG_SIZE, tarjetaOG } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "El Dr. David Torres en su consultorio";

export default function Image() {
  return tarjetaOG({
    etiqueta: "El especialista",
    titulo: "Dr. David Alejandro Torres Rivas",
    subtitulo: "Médico Cirujano y Oftalmólogo (UCLA). Ocularista certificado.",
    foto: "sobre-el-doctor.jpg",
  });
}
