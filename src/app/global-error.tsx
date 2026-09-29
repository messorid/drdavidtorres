"use client";

import { site } from "@/lib/site";

/**
 * Último recurso: se activa cuando falla el propio layout raíz, así que
 * sustituye al documento entero y tiene que traer sus `<html>` y `<body>`.
 *
 * Aquí **no llegan los estilos globales** ni la tipografía de marca: este
 * documento se renderiza al margen del layout. Por eso todo va en estilos
 * en línea y con la pila de fuentes del sistema. Cualquier clase de Tailwind
 * que se escriba en este archivo no pintaría nada.
 *
 * Tampoco admite `metadata`, porque las fronteras de error son componentes
 * de cliente. El título se pone con el `<title>` de React.
 *
 * Se mantiene deliberadamente mínimo: si hemos llegado hasta aquí, lo único
 * que tiene que funcionar es el teléfono.
 */
export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <html lang="es-VE">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          backgroundColor: "#05283c",
          color: "#ffffff",
          fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif",
          lineHeight: 1.6,
        }}
      >
        <title>No se pudo cargar el sitio | Dr. David Torres</title>

        <main style={{ maxWidth: "34rem", textAlign: "center" }}>
          <p
            style={{
              margin: 0,
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#5b9bf0",
            }}
          >
            Error
          </p>
          <h1
            style={{
              margin: "16px 0 0",
              fontSize: "1.75rem",
              lineHeight: 1.2,
              fontWeight: 700,
            }}
          >
            No se pudo cargar el sitio
          </h1>
          <p style={{ margin: "16px 0 0", color: "#c7dced" }}>
            Estamos con un problema técnico. El consultorio sigue atendiendo:
            puedes escribir o llamar directamente.
          </p>

          <div
            style={{
              margin: "32px 0 0",
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              justifyContent: "center",
            }}
          >
            <a
              href={`https://wa.me/${site.whatsapp}`}
              style={{
                display: "inline-flex",
                minHeight: "48px",
                alignItems: "center",
                padding: "0 24px",
                borderRadius: "0.25rem",
                backgroundColor: "#15803d",
                color: "#ffffff",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Escribir por WhatsApp
            </a>
            <a
              href={`tel:${site.phone}`}
              style={{
                display: "inline-flex",
                minHeight: "48px",
                alignItems: "center",
                padding: "0 24px",
                borderRadius: "0.25rem",
                border: "2px solid #5b9bf0",
                color: "#ffffff",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Llamar al {site.phoneDisplay}
            </a>
          </div>

          <p style={{ margin: "32px 0 0" }}>
            <button
              type="button"
              onClick={() => retry()}
              style={{
                minHeight: "44px",
                padding: "0 16px",
                background: "none",
                border: "none",
                color: "#c7dced",
                font: "inherit",
                textDecoration: "underline",
                textUnderlineOffset: "4px",
                cursor: "pointer",
              }}
            >
              Intentar de nuevo
            </button>
          </p>

          {error.digest ? (
            <p
              style={{
                margin: "24px 0 0",
                fontSize: "0.875rem",
                color: "#7fa3b8",
              }}
            >
              Código del fallo: {error.digest}
            </p>
          ) : null}
        </main>
      </body>
    </html>
  );
}
