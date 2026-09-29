"use client";

import Link from "next/link";
import { useEffect } from "react";
import { WhatsAppButton } from "@/components/ui/cta-button";
import { site } from "@/lib/site";

/**
 * Frontera de error de la aplicación. Tiene que ser componente de cliente.
 *
 * `retry` — no `reset` — es la prop de esta versión de Next: vuelve a pedir y
 * a renderizar el contenido de la frontera. `reset` sigue existiendo pero
 * solo limpia el estado sin volver a pedir nada, que casi nunca es lo que se
 * quiere.
 *
 * No se muestra `error.message`: en producción los errores de servidor llegan
 * con un mensaje genérico justo para no filtrar detalles, y enseñarle a un
 * paciente un volcado técnico no le resuelve nada. Sí se muestra el `digest`,
 * que es el hash con el que se localiza el error en los registros del
 * servidor: si alguien avisa del fallo, ese código lo identifica.
 *
 * Lo importante: aunque la página se rompa, el teléfono y el WhatsApp siguen
 * a la vista. Es una consulta médica; que el sitio falle no puede significar
 * que el paciente se quede sin forma de contactar.
 */
export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6 lg:py-24">
      <p className="font-heading text-xs font-semibold tracking-[0.22em] text-primary uppercase">
        Algo falló
      </p>
      <h1 className="mt-4 text-3xl font-bold text-balance text-ink sm:text-4xl">
        No pudimos cargar esta página
      </h1>
      <p className="measure mx-auto mt-4 text-lg text-muted">
        Fue un problema nuestro, no tuyo. Puedes intentarlo otra vez; si sigue
        sin cargar, escribe por WhatsApp y te atendemos igual.
      </p>

      <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <button
          type="button"
          onClick={() => retry()}
          className="inline-flex min-h-[48px] cursor-pointer items-center rounded-base border-2 border-primary px-6 py-2.5 font-heading font-semibold text-primary transition-colors duration-200 hover:bg-surface"
        >
          Intentar de nuevo
        </button>
        <WhatsAppButton size="lg" label="Escribir por WhatsApp" />
      </div>

      <p className="mt-8 text-muted">
        O llama al{" "}
        <a
          href={`tel:${site.phone}`}
          data-analytics="phone-click"
          className="cursor-pointer font-semibold text-primary underline underline-offset-4 transition-colors duration-200 hover:text-primary-dark"
        >
          {site.phoneDisplay}
        </a>
        .
      </p>

      <p className="mt-10 border-t border-line pt-6 text-sm text-muted">
        <Link
          href="/"
          className="cursor-pointer underline underline-offset-4 transition-colors duration-200 hover:text-primary-dark"
        >
          Volver al inicio
        </Link>
        {error.digest ? (
          <>
            {" · "}
            <span className="tabular-nums">Código del fallo: {error.digest}</span>
          </>
        ) : null}
      </p>
    </div>
  );
}
