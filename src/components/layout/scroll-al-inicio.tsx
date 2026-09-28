"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Lleva la página al inicio al cambiar de ruta.
 *
 * Hace falta porque el salto automático del router queda a medio camino
 * cuando la página de destino es mucho más corta que la de origen: al navegar
 * desde el pie de la home (unos 7.000 px) a una página de servicio (unos
 * 3.800 px), el navegador recorta la posición de scroll al nuevo alto y el
 * visitante aterriza en mitad del contenido. Se midió entre 18 y 277 px según
 * la ruta, de forma reproducible.
 *
 * Dos comportamientos que se respetan a propósito:
 *   - Si la URL trae un ancla (#servicios), manda el ancla.
 *   - Si la navegación viene del botón atrás o adelante, se deja la posición
 *     que restaura el navegador, que es lo que el visitante espera.
 */
export function ScrollAlInicio() {
  const pathname = usePathname();
  const primeraCarga = useRef(true);
  const desdeHistorial = useRef(false);

  useEffect(() => {
    const marcar = () => {
      desdeHistorial.current = true;
    };
    window.addEventListener("popstate", marcar);
    return () => window.removeEventListener("popstate", marcar);
  }, []);

  useEffect(() => {
    if (primeraCarga.current) {
      primeraCarga.current = false;
      return;
    }
    if (desdeHistorial.current) {
      desdeHistorial.current = false;
      return;
    }
    if (window.location.hash) return;

    // "instant" para que no compita con el scroll suave de las anclas.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
