"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/icon";

/**
 * Carrusel horizontal con botones.
 *
 * El desplazamiento es scroll nativo con `scroll-snap`: sigue funcionando con
 * el dedo, con la rueda y con el teclado. Lo que añade este componente es el
 * par de botones y la ocultación de la barra del navegador, que en Windows se
 * dibuja como una franja gris con flechas ajena al diseño.
 *
 * Ocultar la barra tiene un coste: deja de avisar de que hay más contenido a
 * la derecha. Por eso los botones no son decorativos — son su sustituto — y
 * aparecen **solo cuando el contenido desborda de verdad**, medido en el
 * navegador. Así valen igual en móvil que en la franja de anchos donde la
 * rejilla todavía no cabe, sin depender de un punto de corte adivinado.
 *
 * El contenedor desplazable lleva `role="region"` y `tabIndex` porque una zona
 * con scroll debe poder alcanzarse y recorrerse con el teclado; la lista va
 * dentro para no pisar la semántica de `<ul>`.
 */
export function Carrusel({
  label,
  listaClassName,
  children,
}: {
  label: string;
  /** Clases de la `<ul>`: define el ancho de cada ítem y la rejilla final. */
  listaClassName: string;
  children: React.ReactNode;
}) {
  const pista = useRef<HTMLDivElement>(null);
  const [desbordado, setDesbordado] = useState(false);
  const [enInicio, setEnInicio] = useState(true);
  const [enFin, setEnFin] = useState(false);

  const medir = useCallback(() => {
    const el = pista.current;
    if (!el) return;
    const sobra = el.scrollWidth - el.clientWidth;
    setDesbordado(sobra > 4);
    setEnInicio(el.scrollLeft <= 2);
    setEnFin(el.scrollLeft >= sobra - 2);
  }, []);

  useEffect(() => {
    const el = pista.current;
    if (!el) return;
    medir();
    el.addEventListener("scroll", medir, { passive: true });

    // El ancho cambia al rotar el teléfono y al pasar a rejilla; las imágenes
    // además reajustan la altura al cargar.
    const ro = new ResizeObserver(medir);
    ro.observe(el);
    if (el.firstElementChild) ro.observe(el.firstElementChild);

    return () => {
      el.removeEventListener("scroll", medir);
      ro.disconnect();
    };
  }, [medir]);

  const mover = (direccion: 1 | -1) => {
    const el = pista.current;
    if (!el) return;
    const lista = el.firstElementChild as HTMLElement | null;
    const primero = lista?.firstElementChild as HTMLElement | null;
    const hueco = lista
      ? parseFloat(getComputedStyle(lista).columnGap || "0") || 0
      : 0;
    // Un ítem por pulsación. El `scroll-snap` termina de cuadrar la parada,
    // así que no hace falta calcular la posición exacta de cada tarjeta.
    const paso = primero
      ? primero.getBoundingClientRect().width + hueco
      : el.clientWidth * 0.85;
    const suave = !window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;
    el.scrollBy({
      left: direccion * paso,
      behavior: suave ? "smooth" : "auto",
    });
  };

  return (
    <div>
      {/* Los botones se reservan su fila sólo cuando hacen falta: si el
          contenido cabe entero, no hay nada que desplazar. */}
      {desbordado ? (
        <div className="mb-4 flex justify-center gap-2 lg:justify-end">
          <BotonPista
            sentido="anterior"
            onClick={() => mover(-1)}
            disabled={enInicio}
          />
          <BotonPista
            sentido="siguiente"
            onClick={() => mover(1)}
            disabled={enFin}
          />
        </div>
      ) : null}

      <div
        ref={pista}
        role="region"
        aria-label={label}
        tabIndex={0}
        /* El relleno de 6 px compensa el anillo de foco (3 px de trazo + 3 de
           separación): un contenedor con scroll recorta lo que sobresale, y
           sin esto la tarjeta enfocada aparecería con el anillo cortado. El
           margen negativo lo devuelve a su sitio. */
        className="sin-barra -mx-4 -my-1.5 scroll-pl-4 overflow-x-auto px-4 py-1.5 sm:-mx-6 sm:scroll-pl-6 sm:px-6 md:-mx-1.5 md:scroll-pl-1.5 md:px-1.5"
      >
        <ul className={listaClassName}>{children}</ul>
      </div>
    </div>
  );
}

function BotonPista({
  sentido,
  onClick,
  disabled,
}: {
  sentido: "anterior" | "siguiente";
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={sentido === "anterior" ? "Ver anteriores" : "Ver siguientes"}
      className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-line bg-white text-ink transition-colors duration-200 hover:border-primary hover:text-primary disabled:cursor-default disabled:border-line disabled:bg-surface disabled:text-muted/45 disabled:hover:border-line"
    >
      <Icon
        name="arrowRight"
        className={`h-5 w-5 ${sentido === "anterior" ? "rotate-180" : ""}`}
      />
    </button>
  );
}
