"use client";

import { useEffect } from "react";
import { sendGAEvent } from "@next/third-parties/google";

/**
 * Envía a GA4 los clics que de verdad importan: los que acaban en contacto.
 *
 * Una visita no es una consulta. Lo que el doctor necesita saber es cuánta
 * gente pulsa WhatsApp, llama o pide cómo llegar, y desde qué página.
 *
 * Un único oyente delegado en el documento, en vez de un `onClick` por
 * botón: se clasifica por el destino del enlace, así que cualquier botón
 * nuevo que apunte a WhatsApp o a un teléfono queda medido sin tocar nada.
 *
 * En GA4 conviene marcar `whatsapp_click` y `phone_click` como eventos
 * clave (Administrar → Eventos), que es lo que los convierte en conversiones.
 */

function clasificar(href: string): string | null {
  if (href.includes("wa.me/")) return "whatsapp_click";
  if (href.startsWith("tel:")) return "phone_click";
  if (href.startsWith("mailto:")) return "email_click";
  if (href.includes("/local/writereview")) return "review_write_click";
  if (href.includes("/local/reviews")) return "reviews_view_click";
  if (href.includes("google.com/maps")) return "directions_click";
  if (href.includes("instagram.com/")) return "instagram_click";
  return null;
}

/** Texto del botón sin los avisos `sr-only` para lectores de pantalla:
 *  en los informes debe leerse «WhatsApp», no «WhatsApp(se abre en…)». */
function textoVisible(a: HTMLAnchorElement): string {
  const copia = a.cloneNode(true) as HTMLElement;
  copia.querySelectorAll(".sr-only").forEach((n) => n.remove());
  return (copia.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 80);
}

export function MedicionClics() {
  useEffect(() => {
    const alPulsar = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (!(a instanceof HTMLAnchorElement)) return;
      const evento = clasificar(a.getAttribute("href") ?? "");
      if (!evento) return;
      sendGAEvent("event", evento, {
        page_path: window.location.pathname,
        // Texto visible del botón: distingue «Encargar por WhatsApp» de una
        // ficha de producto del WhatsApp de la barra fija.
        link_text: textoVisible(a),
        link_location: a.closest("header")
          ? "cabecera"
          : a.closest("footer")
            ? "pie"
            : a.closest(".fixed")
              ? "barra_fija"
              : "contenido",
      });
    };
    document.addEventListener("click", alPulsar, { capture: true });
    return () =>
      document.removeEventListener("click", alPulsar, { capture: true });
  }, []);

  return null;
}
