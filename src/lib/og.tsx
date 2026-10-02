import { ImageResponse } from "next/og";
import sharp from "sharp";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site, areaServedLabel } from "@/lib/site";

/**
 * Tarjeta que aparece al compartir un enlace en WhatsApp, Instagram (en
 * mensajes directos), Facebook, LinkedIn, X o iMessage.
 *
 * Todas las páginas usan este mismo molde para que el sitio se reconozca de
 * un vistazo en un chat: marino de marca a la izquierda con el isotipo, el
 * título y una franja con las ciudades y el teléfono; la foto de lo que se
 * comparte a la derecha.
 *
 * Tipografía: Rubik, la del manual de marca, cargada del disco en WOFF. Sin
 * pasarle la fuente, `next/og` dibuja con una sans genérica y la tarjeta deja
 * de parecer del doctor.
 *
 * Peso: WhatsApp deja de mostrar la miniatura cuando la imagen pasa de unos
 * 300 KB. `next/og` solo produce PNG, y con una foto dentro las tarjetas
 * salían de 330 a 830 KB. Se convierten a JPEG con `sharp` antes de servirse:
 * quedan en torno a 100 KB. Las rutas son estáticas, así que la conversión
 * ocurre una vez, al compilar.
 */
export const OG_CONTENT_TYPE = "image/jpeg";

export const OG_SIZE = { width: 1200, height: 630 };

// Rutas acotadas a carpetas fijas a propósito: con `join(process.cwd(), x)`
// libre, el empaquetador no sabe qué se lee y mete el proyecto ENTERO —
// incluido `public/`— en el código de servidor de cada tarjeta.
const fuente = (archivo: string) =>
  readFile(join(process.cwd(), "src/assets/fonts", archivo));
const recorte = (archivo: string) =>
  readFile(join(process.cwd(), "src/assets/og", archivo));
const base64 = (b: Buffer, tipo: string) =>
  `data:${tipo};base64,${b.toString("base64")}`;

export async function tarjetaOG({
  etiqueta,
  titulo,
  subtitulo,
  foto,
}: {
  /** Línea pequeña sobre el título: «Servicio», «Para colegas»… */
  etiqueta: string;
  titulo: string;
  subtitulo?: string;
  /** Recorte ya preparado en `src/assets/og/`, a 460×630. */
  foto: string;
}) {
  const [rubik500, rubik700, logo, imagen] = await Promise.all([
    fuente("rubik-latin-500.woff"),
    fuente("rubik-latin-700.woff"),
    readFile(join(process.cwd(), "public/marca/isotipo-blanco.png")).then(
      (b) => base64(b, "image/png"),
    ),
    recorte(foto).then((b) => base64(b, "image/jpeg")),
  ]);

  // El título largo baja de cuerpo para no partirse en cuatro líneas.
  const cuerpo = titulo.length > 46 ? 50 : titulo.length > 30 ? 58 : 66;

  const png = new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#05283c",
        fontFamily: "Rubik",
      }}
    >
      <div
        style={{
          width: 740,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 56px 48px 64px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} width={124} height={64} alt="" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 30, fontWeight: 700, color: "#ffffff" }}>
              {site.shortName}
            </div>
            <div style={{ fontSize: 20, fontWeight: 500, color: "#5b9bf0", marginTop: 2 }}>
              Cirujano · Oftalmólogo · Ocularista
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#5b9bf0",
            }}
          >
            {etiqueta}
          </div>
          <div
            style={{
              fontSize: cuerpo,
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.08,
              marginTop: 14,
              letterSpacing: -1,
            }}
          >
            {titulo}
          </div>
          {subtitulo ? (
            <div
              style={{
                fontSize: 25,
                fontWeight: 500,
                color: "#c7dced",
                marginTop: 18,
                lineHeight: 1.3,
              }}
            >
              {subtitulo}
            </div>
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255,255,255,0.18)",
            paddingTop: 22,
            fontSize: 23,
            fontWeight: 500,
            color: "#c7dced",
          }}
        >
          <div style={{ display: "flex" }}>{areaServedLabel}</div>
          <div style={{ display: "flex", color: "#ffffff", fontWeight: 700 }}>
            {site.phoneDisplay}
          </div>
        </div>
      </div>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imagen}
        width={460}
        height={630}
        alt=""
        style={{ objectFit: "cover" }}
      />
    </div>,
    {
      ...OG_SIZE,
      fonts: [
        { name: "Rubik", data: rubik500, weight: 500, style: "normal" },
        { name: "Rubik", data: rubik700, weight: 700, style: "normal" },
      ],
    },
  );

  const jpeg = await sharp(Buffer.from(await png.arrayBuffer()))
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();
  return new Response(new Uint8Array(jpeg), {
    headers: { "Content-Type": OG_CONTENT_TYPE },
  });
}
