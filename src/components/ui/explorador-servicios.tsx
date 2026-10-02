"use client";

import { useId, useMemo, useState } from "react";
import { Icon } from "@/components/ui/icon";
import { Carrusel } from "@/components/ui/carrusel";
import { ServiceCard } from "@/components/ui/service-card";
import {
  areaLabels,
  normaliza,
  type Area,
  type ServicioTarjeta,
} from "@/lib/services";

/**
 * Buscador y filtro por área sobre el carrusel de servicios.
 *
 * Todas las tarjetas se renderizan en el servidor y el filtrado ocurre en el
 * cliente: quien llegue sin JavaScript —o un rastreador— ve los nueve
 * servicios y sus nueve enlaces, que es lo que importa para que se indexen.
 * Lo que se pierde sin JS es el filtro, no el contenido.
 *
 * La búsqueda va contra un índice ya normalizado que se calcula en el
 * servidor, e incluye sinónimos que no están escritos en la página:
 * «carnosidad» lleva a pterigión y «ojo artificial» a prótesis oculares,
 * porque es como lo dice el paciente.
 */

type Filtro = "todas" | Area;

const FILTROS: { valor: Filtro; etiqueta: string }[] = [
  { valor: "todas", etiqueta: "Todos" },
  { valor: "oftalmologia", etiqueta: "Oftalmología" },
  { valor: "ocularista", etiqueta: "Ocularista" },
];

export function ExploradorServicios({
  servicios,
  etiquetaCarrusel = "Servicios del consultorio",
}: {
  servicios: ServicioTarjeta[];
  etiquetaCarrusel?: string;
}) {
  const idBusqueda = useId();
  const [consulta, setConsulta] = useState("");
  const [filtro, setFiltro] = useState<Filtro>("todas");

  const terminos = useMemo(
    () => normaliza(consulta).split(/\s+/).filter(Boolean),
    [consulta],
  );

  const visibles = useMemo(
    () =>
      servicios.filter((s) => {
        if (filtro !== "todas" && s.area !== filtro) return false;
        // Todas las palabras han de aparecer, en cualquier orden: quien
        // escribe "cirugia catarata" espera el mismo resultado que
        // "catarata cirugia".
        return terminos.every((t) => s.buscable.includes(t));
      }),
    [servicios, filtro, terminos],
  );

  const cuenta = (valor: Filtro) =>
    valor === "todas"
      ? servicios.length
      : servicios.filter((s) => s.area === valor).length;

  const limpiar = () => {
    setConsulta("");
    setFiltro("todas");
  };

  const hayFiltro = consulta.trim() !== "" || filtro !== "todas";

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* El campo lleva su etiqueta visible: un icono de lupa solo no dice
            qué se busca aquí, y en una web médica «buscar» a secas invita a
            escribir síntomas. */}
        <div className="mx-auto w-full max-w-md lg:mx-0">
          <label
            htmlFor={idBusqueda}
            className="block text-center font-heading text-xs font-semibold tracking-[0.22em] text-muted uppercase lg:text-left"
          >
            Buscar un servicio
          </label>
          <div className="relative mt-2">
            <Icon
              name="search"
              className="pointer-events-none absolute top-1/2 left-3.5 h-5 w-5 -translate-y-1/2 text-muted"
            />
            <input
              id={idBusqueda}
              type="search"
              value={consulta}
              onChange={(e) => setConsulta(e.target.value)}
              placeholder="catarata, carnosidad, ojo artificial…"
              autoComplete="off"
              className="min-h-[48px] w-full rounded-base border border-line bg-white pr-4 pl-11 text-ink placeholder:text-muted focus:border-primary focus:outline-none"
            />
          </div>
        </div>

        <div
          role="group"
          aria-label="Filtrar por área"
          className="flex flex-wrap justify-center gap-2 lg:justify-end"
        >
          {FILTROS.map((f) => {
            const activo = filtro === f.valor;
            return (
              <button
                key={f.valor}
                type="button"
                onClick={() => setFiltro(f.valor)}
                aria-pressed={activo}
                className={`inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-full border px-4 font-heading text-sm font-semibold transition-colors duration-200 ${
                  activo
                    ? "border-primary bg-primary text-white"
                    : "border-line bg-white text-muted hover:border-primary hover:text-primary-dark"
                }`}
              >
                {f.etiqueta}
                {/* A tinta plena: la cifra es texto normal y necesita 4.5:1.
                    Rebajada al 75% sobre el azul medía 3.75:1 y al 70% sobre
                    blanco 3.31:1. La jerarquía la da el chip, no el gris. */}
                <span className="tabular-nums opacity-100">
                  {cuenta(f.valor)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Al elegir un área se muestra su descripción. Es la misma frase que
          antes encabezaba cada bloque: el filtro no sustituye la explicación
          de qué distingue los dos oficios, la trae cuando hace falta. */}
      {filtro !== "todas" ? (
        <p className="measure mx-auto mt-5 text-center text-muted lg:mx-0 lg:text-left">
          {areaLabels[filtro].intro}
        </p>
      ) : null}

      {/* Región viva: quien usa lector de pantalla necesita enterarse de que
          la lista cambió al escribir, porque el cambio ocurre lejos del foco. */}
      {/* El recuento va en la misma fila que los botones del carrusel, no en
          una línea propia: eran dos filas sueltas con 50 px de aire entre
          medias. Sigue siendo región viva, se renderice donde se renderice. */}
      {visibles.length === 0 ? (
        <p aria-live="polite" className="mt-5 text-center text-sm text-muted lg:text-left">
          Ningún servicio coincide con esa búsqueda.
        </p>
      ) : null}

      {visibles.length > 0 ? (
        <div className="mt-6">
          <Carrusel
            cabecera={
              <p aria-live="polite" className="text-sm text-muted">
                {visibles.length} {visibles.length === 1 ? "servicio" : "servicios"}
                {hayFiltro ? ` de ${servicios.length}` : ""}
              </p>
            }
            // Al cambiar el conjunto se vuelve a montar: así el carrusel
            // recalcula si desborda —los ítems cambian de número sin que
            // cambie el tamaño de la pista, que es lo único que observa— y
            // además vuelve al principio, que es donde se espera empezar a
            // leer una lista nueva.
            key={visibles.map((s) => s.slug).join(",")}
            label={etiquetaCarrusel}
            listaClassName="flex snap-x snap-mandatory gap-4 md:gap-5"
          >
            {visibles.map((s, i) => (
              <li
                key={s.slug}
                className="flex w-[82%] shrink-0 snap-start sm:w-[58%] md:w-[calc((100%-2.5rem)/3)]"
              >
                <ServiceCard service={s} priority={i === 0} />
              </li>
            ))}
          </Carrusel>
        </div>
      ) : (
        <div className="mt-6 rounded-base border border-line bg-surface p-8 text-center">
          <p className="text-muted">
            Prueba con otra palabra, o escribe directamente por WhatsApp
            contando lo que te pasa.
          </p>
          <button
            type="button"
            onClick={limpiar}
            className="mt-4 inline-flex min-h-[44px] cursor-pointer items-center gap-2 font-heading font-semibold text-primary transition-colors duration-200 hover:text-primary-dark"
          >
            Ver los {servicios.length} servicios
            <Icon name="arrowRight" className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}
