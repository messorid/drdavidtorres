"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/icon";

/**
 * Botón flotante para volver al principio.
 *
 * Aparece cuando ya se ha bajado de verdad — pasada vez y media la altura de
 * la pantalla — para no estorbar en el primer golpe de vista.
 *
 * En móvil se sitúa por encima de la barra fija de contacto: esa barra es el
 * camino a WhatsApp y a la llamada, y un botón encima de ella cambiaría un
 * atajo cómodo por un toque fallado.
 *
 * Al pulsarlo no basta con mover la página: hay que mover también el foco.
 * Si solo se desplaza, quien navega con teclado sigue tabulando desde donde
 * estaba —abajo del todo— y la página se le vuelve a ir hacia allí en el
 * siguiente tabulador. Se lleva el foco al logotipo de la cabecera, que es
 * el primer elemento enfocable del documento.
 *
 * Va en blanco opaco, no translúcido: flota sobre el texto del final de la
 * página, y con transparencia las letras de debajo lo convertían en una
 * mancha en vez de en un botón.
 *
 * El desplazamiento se hace con `scrollTo(0, 0)` a propósito, sin pedir
 * `behavior: "smooth"`: así hereda el `scroll-behavior` del CSS, que la regla
 * de `prefers-reduced-motion` ya pone en `auto`. Pedirlo aquí ignoraría esa
 * preferencia.
 */

const UMBRAL = 1.5; // alturas de pantalla

export function BotonArriba() {
  const [visible, setVisible] = useState(false);
  const pendiente = useRef(false);

  useEffect(() => {
    const evaluar = () => {
      pendiente.current = false;
      setVisible(window.scrollY > window.innerHeight * UMBRAL);
    };
    const alDesplazar = () => {
      if (pendiente.current) return;
      pendiente.current = true;
      requestAnimationFrame(evaluar);
    };

    evaluar();
    window.addEventListener("scroll", alDesplazar, { passive: true });
    window.addEventListener("resize", alDesplazar, { passive: true });
    return () => {
      window.removeEventListener("scroll", alDesplazar);
      window.removeEventListener("resize", alDesplazar);
    };
  }, []);

  const subir = () => {
    window.scrollTo(0, 0);
    // `preventScroll` para que enfocar no provoque un salto que compita con
    // el desplazamiento que acabamos de lanzar.
    const primero = document.querySelector<HTMLElement>("header a");
    primero?.focus({ preventScroll: true });
  };

  return (
    <button
      type="button"
      onClick={subir}
      // Fuera de pantalla queda inerte: ni se tabula ni lo anuncia un lector.
      // `inert` lo hace en una palabra y sin mentirle a la accesibilidad,
      // que es lo que pasaría con `aria-hidden` sobre un botón enfocable.
      inert={!visible}
      className={`fixed right-4 bottom-[calc(5.5rem+env(safe-area-inset-bottom,0px))] z-30 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-line bg-white text-primary shadow-[0_2px_10px_rgba(5,40,60,0.18)] transition-all duration-200 hover:border-primary hover:text-primary-dark md:right-6 md:bottom-6 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <Icon name="arrowUp" className="h-5 w-5" />
      <span className="sr-only">Volver al principio de la página</span>
    </button>
  );
}
