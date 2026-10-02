"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/icon";

/**
 * Visor de imágenes a pantalla completa para los casos reales.
 *
 * Envuelve una zona de la página; cualquier botón con `data-ampliar` dentro
 * abre la foto en grande, y las flechas recorren todas las de esa zona en el
 * orden en que aparecen. Así los pares de antes/después y los «otros
 * resultados» se ven seguidos sin que cada miniatura sepa nada del visor.
 *
 * Accesibilidad:
 *   - `<dialog>` nativo con `showModal()`: el foco queda atrapado dentro, el
 *     resto de la página se vuelve inerte y Esc cierra, todo sin código.
 *   - Al cerrar, el foco vuelve a la miniatura que lo abrió: quien navega
 *     con teclado sigue donde estaba.
 *   - Flechas del teclado, flechas en pantalla y deslizar el dedo en móvil.
 *     En móvil las flechas van abajo: a los lados tapaban el borde de la
 *     foto, que en estos casos es justo donde están los ojos.
 *   - Se cierra también tocando fuera de la foto, que es lo que se intenta
 *     primero en un teléfono.
 *
 * La foto se pide al optimizador de Next al tamaño del visor, no a tamaño
 * original: en un móvil con datos, 900 px de ancho sobran.
 */

type Item = { src: string; alt: string; pie: string; etiqueta: string };

export function Visor({ children }: { children: React.ReactNode }) {
  const zona = useRef<HTMLDivElement>(null);
  const dialogo = useRef<HTMLDialogElement>(null);
  const origen = useRef<HTMLElement | null>(null);
  const toque = useRef<number | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [i, setI] = useState(0);

  const cerrar = useCallback(() => dialogo.current?.close(), []);
  const mover = useCallback(
    (d: number) => setI((n) => (n + d + items.length) % items.length),
    [items.length],
  );

  // Apertura por delegación: una sola escucha para toda la zona.
  useEffect(() => {
    const el = zona.current;
    if (!el) return;
    const abrir = (e: MouseEvent) => {
      const boton = (e.target as Element).closest<HTMLElement>(
        "[data-ampliar]",
      );
      if (!boton || !el.contains(boton)) return;
      const botones = [...el.querySelectorAll<HTMLElement>("[data-ampliar]")];
      setItems(
        botones.map((b) => ({
          src: b.dataset.src ?? "",
          alt: b.dataset.alt ?? "",
          pie: b.dataset.pie ?? "",
          etiqueta: b.dataset.etiqueta ?? "",
        })),
      );
      setI(botones.indexOf(boton));
      origen.current = boton;
      dialogo.current?.showModal();
      // El documento no se desplaza por debajo mientras el visor está abierto.
      document.documentElement.style.overflow = "hidden";
    };
    el.addEventListener("click", abrir);
    return () => el.removeEventListener("click", abrir);
  }, []);

  useEffect(() => {
    const d = dialogo.current;
    if (!d) return;
    const alCerrar = () => {
      document.documentElement.style.overflow = "";
      origen.current?.focus();
    };
    const teclas = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") mover(1);
      if (e.key === "ArrowLeft") mover(-1);
    };
    d.addEventListener("close", alCerrar);
    d.addEventListener("keydown", teclas);
    return () => {
      d.removeEventListener("close", alCerrar);
      d.removeEventListener("keydown", teclas);
    };
  }, [mover]);

  const actual = items[i];
  const varias = items.length > 1;

  return (
    <div ref={zona}>
      {children}

      <dialog
        ref={dialogo}
        aria-label={actual ? `Foto ampliada: ${actual.alt}` : "Foto ampliada"}
        // Clic en el fondo (el propio <dialog>, fuera del contenido) cierra.
        onClick={(e) => {
          if (e.target === e.currentTarget) cerrar();
        }}
        onTouchStart={(e) => {
          toque.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (toque.current === null || !varias) return;
          const dx = e.changedTouches[0].clientX - toque.current;
          if (Math.abs(dx) > 50) mover(dx < 0 ? 1 : -1);
          toque.current = null;
        }}
        className="m-auto h-dvh max-h-none w-screen max-w-none bg-transparent p-0 backdrop:bg-navy/92 backdrop:backdrop-blur-sm"
      >
        {actual ? (
          <div
            className="flex h-full w-full flex-col items-center justify-center gap-4 px-4 py-16 sm:px-20"
            onClick={(e) => {
              if (e.target === e.currentTarget) cerrar();
            }}
          >
            <figure className="flex max-h-full w-full max-w-3xl flex-col items-center">
              <div className="relative aspect-[4/5] max-h-[72dvh] w-full max-w-[min(100%,58dvh)] overflow-hidden rounded-base bg-navy">
                <Image
                  key={actual.src}
                  src={actual.src}
                  alt={actual.alt}
                  fill
                  sizes="(max-width: 640px) 92vw, 600px"
                  className="object-contain"
                />
                {actual.etiqueta ? (
                  <span
                    className={`absolute top-3 left-3 rounded px-2.5 py-1 font-heading text-sm font-semibold tracking-wide uppercase text-white ${
                      actual.etiqueta === "Antes" ? "bg-navy/85" : "bg-primary"
                    }`}
                  >
                    {actual.etiqueta}
                  </span>
                ) : null}
              </div>
              <figcaption className="mt-4 text-center text-base text-white">
                {actual.pie}
                {varias ? (
                  <span className="mt-1 block text-sm text-[#c7dced] tabular-nums">
                    {i + 1} de {items.length}
                  </span>
                ) : null}
              </figcaption>
            </figure>
          </div>
        ) : null}

        <button
          type="button"
          onClick={cerrar}
          aria-label="Cerrar"
          className="absolute top-4 right-4 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-200 hover:bg-white/20"
        >
          <Icon name="close" className="h-6 w-6" />
        </button>

        {varias ? (
          <>
            <button
              type="button"
              onClick={() => mover(-1)}
              aria-label="Foto anterior"
              className="absolute bottom-5 left-4 flex h-12 w-12 sm:top-1/2 sm:bottom-auto sm:-translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-200 hover:bg-white/20 sm:left-6"
            >
              <Icon name="arrowRight" className="h-6 w-6 rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => mover(1)}
              aria-label="Foto siguiente"
              className="absolute right-4 bottom-5 flex h-12 w-12 sm:top-1/2 sm:bottom-auto sm:-translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-200 hover:bg-white/20 sm:right-6"
            >
              <Icon name="arrowRight" className="h-6 w-6" />
            </button>
          </>
        ) : null}
      </dialog>
    </div>
  );
}

/**
 * Miniatura que abre el visor. Es un `<button>` de verdad para que se pueda
 * abrir con el teclado, y lleva una lupa visible: sin ella, nadie adivina
 * que una foto dentro de una tarjeta se puede ampliar.
 */
export function Ampliable({
  src,
  alt,
  pie,
  etiqueta = "",
  className,
  children,
}: {
  src: string;
  alt: string;
  pie: string;
  etiqueta?: string;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      data-ampliar=""
      data-src={src}
      data-alt={alt}
      data-pie={pie}
      data-etiqueta={etiqueta}
      aria-label={`Ampliar foto: ${alt}`}
      className={`group/amp block cursor-zoom-in text-left ${className}`}
    >
      {children}
      <span
        aria-hidden="true"
        className="absolute right-2 bottom-2 flex h-9 w-9 items-center justify-center rounded-full bg-navy/75 text-white opacity-90 transition-opacity duration-200 group-hover/amp:opacity-100"
      >
        <Icon name="search" className="h-4.5 w-4.5" />
      </span>
    </button>
  );
}
