import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site, areaServedLabel } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${areaServedLabel}`;

/**
 * Tarjeta al compartir. Usa el isotipo real del manual de marca, leído del
 * disco: `next/og` no resuelve rutas públicas por sí solo.
 */
export default async function OpenGraphImage() {
  const iso = await readFile(
    join(process.cwd(), "public/marca/isotipo-blanco.png"),
  );
  const isoSrc = `data:image/png;base64,${iso.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#05283c",
        padding: "68px 72px",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={isoSrc} width={247} height={128} alt="" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 40,
              fontWeight: 700,
              color: "#ffffff",
            }}
          >
            Dr. David Torres
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              color: "#5b9bf0",
              marginTop: 6,
            }}
          >
            Cirujano · Oftalmólogo · Ocularista
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            fontSize: 58,
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.12,
          }}
        >
          Centro Oftalmológico y Prótesis Oculares
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#c7dced",
            marginTop: 18,
          }}
        >
          Prótesis con iris hiperrealistas · Cirugía ocular
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "1px solid rgba(255,255,255,0.22)",
          paddingTop: 24,
          fontSize: 26,
          color: "#c7dced",
        }}
      >
        <div style={{ display: "flex" }}>{areaServedLabel}</div>
        <div style={{ display: "flex", color: "#ffffff", fontWeight: 600 }}>
          {site.phoneDisplay}
        </div>
      </div>
    </div>,
    size,
  );
}
