"use client";

import { useEffect, useId, useRef } from "react";

/**
 * Ojo que sigue la mirada.
 *
 * En escritorio sigue al cursor. En móvil no hay cursor, así que la mirada la
 * da el paso del hero por la pantalla: al aterrizar mira al frente y, según
 * bajas, baja contigo y apunta hacia el contenido.
 *
 * Tres detalles separan esto de un ojo de juguete, y ninguno es opcional:
 *
 *   1. El iris es MÁS PEQUEÑO que la abertura y se mueve poco (±26 de 320,
 *      un 8%). Un ojo real apenas se desplaza; pasarse es exactamente lo que
 *      lo convierte en caricatura.
 *   2. El reflejo especular NO viaja con el iris. El brillo pertenece a la
 *      luz de la sala, no al ojo: si lo sigue, el cerebro lee "pegatina que
 *      resbala". Se mueve a un cuarto de velocidad.
 *   3. El iris se comprime en el eje del movimiento. Eso es lo que vende una
 *      esfera que gira en lugar de un disco que se desliza.
 *
 * Nunca parpadea. Un ojo que parpadea deja de ser textura y pasa a ser una
 * criatura mirándote, y buena parte de quien abre este sitio ha perdido un
 * ojo.
 *
 * Rendimiento: un solo `requestAnimationFrame` que escribe `transform`
 * directamente sobre los nodos. Nada de estado de React — a 60 fps
 * re-renderizaría el hero entero sesenta veces por segundo. El bucle se
 * apaga cuando el hero sale de pantalla.
 *
 * Importante: este componente no puede vivir dentro de una capa con `blur()`.
 * Un elemento que se mueve dentro de una capa desenfocada obliga al navegador
 * a recalcular el gaussiano a pantalla completa en cada fotograma.
 */

const RECORRIDO_X = 26; // unidades del viewBox de 320 ≈ 8%
const RECORRIDO_Y = 9; // menos: la abertura es almendrada y deja poco alto
const SUAVIZADO = 0.085; // el retardo mínimo es lo que lo hace parecer vivo
const ABERTURA = "M 18 160 Q 160 28 302 160 Q 160 292 18 160 Z";

export function OjoInteractivo({ className = "" }: { className?: string }) {
  // `useId` trae dos puntos, que no valen dentro de `url(#…)`.
  const uid = useId().replace(/:/g, "");
  const raiz = useRef<SVGSVGElement>(null);
  const iris = useRef<SVGGElement>(null);
  const brillo = useRef<SVGGElement>(null);

  useEffect(() => {
    const el = raiz.current;
    const gIris = iris.current;
    const gBrillo = brillo.current;
    if (!el || !gIris || !gBrillo) return;

    // Nadie recibe movimiento que no pidió.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const conPuntero = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;

    const objetivo = { x: 0, y: 0 };
    const actual = { x: 0, y: 0 };
    let caja = el.getBoundingClientRect();
    let raf = 0;
    let corriendo = false;
    let animando = false;

    const remedir = () => {
      caja = el.getBoundingClientRect();
    };

    /** Recorte elíptico: el iris nunca se acerca al borde del párpado. */
    const apuntar = (nx: number, ny: number) => {
      const magnitud = Math.hypot(nx, ny);
      const k = magnitud > 1 ? 1 / magnitud : 1;
      objetivo.x = nx * k * RECORRIDO_X;
      objetivo.y = ny * k * RECORRIDO_Y;
      pedirCuadro();
    };

    const desdePuntero = (e: PointerEvent) => {
      const cx = caja.left + caja.width / 2;
      const cy = caja.top + caja.height / 2;
      // Se normaliza contra la distancia REAL que hay a cada lado, no contra
      // media pantalla: el ojo está al 14% del ancho, así que a su izquierda
      // caben 200 px y a su derecha 1240. Con una referencia única nunca
      // llegaba a mirar del todo hacia la izquierda.
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const alcanceX = Math.max(1, dx > 0 ? window.innerWidth - cx : cx);
      const alcanceY = Math.max(1, dy > 0 ? window.innerHeight - cy : cy);
      apuntar(dx / alcanceX, dy / alcanceY);
    };

    // Móvil: cuánto se ha desplazado el hero respecto al centro de la
    // pantalla. Centrado → al frente; el hero sube al bajar tú → mira abajo.
    const desdeScroll = () => {
      remedir();
      const centro = caja.top + caja.height / 2;
      const p = (centro - window.innerHeight / 2) / (window.innerHeight / 2);
      apuntar(0, -Math.max(-1, Math.min(1, p)));
    };

    const escribir = () => {
      // Escorzo: al desplazarse, el iris se ve comprimido en ese eje.
      const compresion =
        1 - Math.min(1, Math.abs(actual.x) / RECORRIDO_X) * 0.1;

      gIris.setAttribute(
        "transform",
        `translate(${actual.x.toFixed(2)} ${actual.y.toFixed(2)}) ` +
          `translate(160 160) scale(${compresion.toFixed(3)} 1) translate(-160 -160)`,
      );
      gBrillo.setAttribute(
        "transform",
        `translate(${(actual.x * 0.25).toFixed(2)} ${(actual.y * 0.25).toFixed(2)})`,
      );
    };

    const paso = () => {
      const dx = objetivo.x - actual.x;
      const dy = objetivo.y - actual.y;
      actual.x += dx * SUAVIZADO;
      actual.y += dy * SUAVIZADO;
      escribir();

      // Una vez alcanzado el objetivo se deja de pedir cuadros. Sin esto el
      // bucle seguiría escribiendo el mismo `transform` sesenta veces por
      // segundo con el ratón quieto, que es como está la mayor parte del
      // tiempo. Lo revive `apuntar`, en cuanto hay entrada nueva.
      // 0,1 unidades de un viewBox de 320 es menos de medio píxel a cualquier
      // tamaño al que se pinte esto: invisible. Con un umbral más fino la cola
      // del suavizado se arrastraba más de un segundo repintando de balde.
      if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
        actual.x = objetivo.x;
        actual.y = objetivo.y;
        escribir();
        animando = false;
        return;
      }
      raf = requestAnimationFrame(paso);
    };

    /** Pide un cuadro solo si no hay ya uno en vuelo. */
    const pedirCuadro = () => {
      if (animando || !corriendo) return;
      animando = true;
      raf = requestAnimationFrame(paso);
    };

    const arrancar = () => {
      if (corriendo) return;
      corriendo = true;
      remedir();
      if (conPuntero) {
        window.addEventListener("pointermove", desdePuntero, { passive: true });
        window.addEventListener("scroll", remedir, { passive: true });
      } else {
        window.addEventListener("scroll", desdeScroll, { passive: true });
        desdeScroll();
      }
      window.addEventListener("resize", remedir, { passive: true });
      pedirCuadro();
    };

    const parar = () => {
      if (!corriendo) return;
      corriendo = false;
      animando = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", desdePuntero);
      window.removeEventListener("scroll", remedir);
      window.removeEventListener("scroll", desdeScroll);
      window.removeEventListener("resize", remedir);
    };

    // Fuera de pantalla no hay nada que mirar: se apaga y deja de gastar.
    const io = new IntersectionObserver(
      ([entrada]) => (entrada.isIntersecting ? arrancar() : parar()),
      { threshold: 0 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      parar();
    };
  }, []);

  const fibras = Array.from({ length: 30 }).map((_, i) => {
    const angulo = (i / 30) * Math.PI * 2;
    const dentro = i % 2 === 0 ? 27 : 33;
    const fuera = i % 2 === 0 ? 55 : 46;
    return (
      <line
        key={i}
        x1={160 + Math.cos(angulo) * dentro}
        y1={160 + Math.sin(angulo) * dentro}
        x2={160 + Math.cos(angulo) * fuera}
        y2={160 + Math.sin(angulo) * fuera}
        stroke="#e4f0ff"
        strokeOpacity={i % 2 === 0 ? 0.3 : 0.14}
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    );
  });

  return (
    <svg
      ref={raiz}
      viewBox="0 0 320 320"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <clipPath id={`${uid}-abertura`}>
          <path d={ABERTURA} />
        </clipPath>
        {/* Más luminoso que el iris de marca: aquí cae sobre marino casi
            negro, y con los tonos originales no se distinguía del fondo. */}
        <radialGradient id={`${uid}-iris`} cx="50%" cy="50%" r="50%">
          <stop offset="14%" stopColor="#9cc8f9" />
          <stop offset="48%" stopColor="#4a8ce9" />
          <stop offset="82%" stopColor="#1a5ba0" />
          <stop offset="100%" stopColor="#0d3454" />
        </radialGradient>
      </defs>

      <g clipPath={`url(#${uid}-abertura)`}>
        {/* Esclera. */}
        <path d={ABERTURA} fill="#dbe9fb" fillOpacity="0.16" />

        <g ref={iris}>
          <circle
            cx="160"
            cy="160"
            r="58"
            fill={`url(#${uid}-iris)`}
            stroke="#0a2a45"
            strokeOpacity="0.55"
            strokeWidth="2.5"
          />
          {fibras}
          {/* Collarete: el reborde que rodea la pupila. */}
          <circle
            cx="160"
            cy="160"
            r="27"
            fill="none"
            stroke="#e4f0ff"
            strokeOpacity="0.26"
            strokeWidth="1.5"
          />
          <circle cx="160" cy="160" r="24" fill="#04202f" />
        </g>

        {/* El brillo va sobre el iris pero fuera de su grupo: es la luz de la
            sala, no una marca del ojo. */}
        <g ref={brillo}>
          <circle cx="141" cy="139" r="12" fill="#ffffff" fillOpacity="0.5" />
          <circle cx="178" cy="178" r="4.5" fill="#ffffff" fillOpacity="0.2" />
        </g>
      </g>

      {/* Contorno del párpado, encima de todo. */}
      <path
        d={ABERTURA}
        fill="none"
        stroke="#5b9bf0"
        strokeOpacity="0.5"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
