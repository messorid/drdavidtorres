"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/icon";

/**
 * Franja de credenciales. Solo datos verificables: formación acreditada y
 * ámbito real de atención. Nada de "años de experiencia" ni cantidades de
 * pacientes mientras no estén confirmados por el cliente.
 *
 * En móvil pasa sola de una a otra. Tres cosas que un carrusel automático
 * tiene que respetar, y que aquí se cumplen:
 *
 *   - `prefers-reduced-motion`: no arranca. Queda como un carrusel normal
 *     que se desliza con el dedo.
 *   - Se detiene al interactuar (dedo, ratón o teclado) y no vuelve a
 *     arrancar solo: si alguien está leyendo, nada se le mueve debajo.
 *   - Botón de pausa visible. Es requisito de la WCAG 2.2.2 para cualquier
 *     contenido que se mueva solo más de cinco segundos.
 *
 * Se mueve con scroll nativo, no con `transform`, para no romper el gesto
 * de deslizar ni la navegación con teclado.
 */

const items: { label: string; value: string; detail: string }[] = [
  {
    label: "Formación",
    value: "Médico Cirujano · Oftalmólogo",
    detail: "Universidad Centroccidental Lisandro Alvarado, Barquisimeto",
  },
  {
    label: "Ocularista",
    value: "12 años elaborando prótesis",
    detail: "Certificación en México, Colombia y Brasil",
  },
  {
    label: "Atención",
    value: "Cuatro sedes",
    detail: "Acarigua, Barquisimeto, Ospino y El Tocuyo",
  },
];

const INTERVALO = 3200;

export function TrustBar() {
  const pista = useRef<HTMLDListElement>(null);
  const [activo, setActivo] = useState(0);
  const [corriendo, setCorriendo] = useState(true);

  const irA = useCallback((i: number) => {
    const el = pista.current;
    if (!el) return;
    const tarjeta = el.children[i] as HTMLElement | undefined;
    if (tarjeta) el.scrollTo({ left: tarjeta.offsetLeft, behavior: "smooth" });
  }, []);

  // Avance automático. Ni se monta si el sistema pide menos movimiento, si
  // estamos en escritorio (allí se ven las tres a la vez) o si ya se pausó.
  useEffect(() => {
    if (!corriendo) return;
    const sinMovimiento = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const enEscritorio = window.matchMedia("(min-width: 768px)").matches;
    if (sinMovimiento || enEscritorio) return;

    const id = setInterval(() => {
      setActivo((i) => {
        const siguiente = (i + 1) % items.length;
        irA(siguiente);
        return siguiente;
      });
    }, INTERVALO);
    return () => clearInterval(id);
  }, [corriendo, irA]);

  // Si se desliza a mano, el indicador sigue la posición real.
  useEffect(() => {
    const el = pista.current;
    if (!el) return;
    let t: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      clearTimeout(t);
      t = setTimeout(() => {
        const i = Math.round(el.scrollLeft / el.clientWidth);
        setActivo(Math.min(items.length - 1, Math.max(0, i)));
      }, 90);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      clearTimeout(t);
    };
  }, []);

  /** Cualquier interacción detiene el avance. */
  const detener = () => setCorriendo(false);

  return (
    <section aria-label="Formación y ámbito de atención" className="bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <dl
          ref={pista}
          onPointerDown={detener}
          onMouseEnter={detener}
          onFocusCapture={detener}
          className="sin-barra flex snap-x snap-mandatory overflow-x-auto md:grid md:snap-none md:grid-cols-3 md:overflow-visible"
        >
          {items.map((item) => (
            <div
              key={item.label}
              className="w-full shrink-0 snap-start py-8 text-center md:w-auto md:border-l md:border-line md:px-8 md:text-left md:first:border-l-0 md:first:pl-0 md:last:pr-0"
            >
              <dt className="font-heading text-xs font-semibold tracking-[0.22em] text-muted uppercase">
                {item.label}
              </dt>
              <dd>
                <span className="mt-3 block font-heading text-lg font-semibold text-ink">
                  {item.value}
                </span>
                <span className="mt-1 block text-sm text-muted">
                  {item.detail}
                </span>
              </dd>
            </div>
          ))}
        </dl>

        {/* Controles: solo en móvil, que es donde el carrusel existe. */}
        <div className="flex items-center justify-center gap-2 pb-6 md:hidden">
          {items.map((item, i) => (
            <button
              key={item.label}
              type="button"
              onClick={() => {
                detener();
                setActivo(i);
                irA(i);
              }}
              aria-label={`Ver ${item.label}`}
              aria-current={i === activo ? "true" : undefined}
              className="flex h-11 w-8 cursor-pointer items-center justify-center"
            >
              <span
                className={`block h-2 rounded-full transition-all duration-200 ${
                  i === activo ? "w-6 bg-primary" : "w-2 bg-line"
                }`}
              />
            </button>
          ))}

          <button
            type="button"
            onClick={() => setCorriendo((v) => !v)}
            aria-label={
              corriendo ? "Pausar el carrusel" : "Reanudar el carrusel"
            }
            className="ml-1 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-muted transition-colors duration-200 hover:bg-surface hover:text-ink"
          >
            <Icon name={corriendo ? "pause" : "play"} className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
