import { WhatsAppButton } from "@/components/ui/cta-button";
import { Icon } from "@/components/ui/icon";
import Image from "next/image";
import { site, areaServedLabel } from "@/lib/site";

/**
 * Hero a pantalla completa.
 *
 * La idea visual es la que hace este oftalmólogo: de borroso a nítido. El ojo
 * se pinta dos veces con máscaras complementarias — desenfocado a un lado,
 * nítido al otro — y la transición entre ambas es el degradado de la máscara.
 *
 * En móvil el hero es deliberadamente escueto: eyebrow, título, una línea y
 * el botón. Todo lo demás (el detalle de los servicios, la nota de respuesta)
 * vive más abajo. Con el texto largo el ojo quedaba enterrado bajo el velo y
 * el hero era una pared de letras.
 *
 * El desenfoque vive SIEMPRE en el fondo, nunca en el texto ni bajo él: este
 * es el sitio de una consulta oftalmológica y parte de quien lo abre tiene
 * baja visión. El contraste se mide sobre los píxeles renderizados.
 */

/* Las máscaras complementarias viven en globals.css (.hero-capa-*) porque
   solo deben aplicarse desde `lg`; en móvil la imagen se ve entera. */

function EyeBackdrop() {
  // Móvil: el ojo se centra detrás del texto y se deja ver, porque ahora hay
  // poco texto encima. Desde `lg` vuelve la composición en dos columnas.
  const position = "absolute inset-0";

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      {/* Mitad nítida. Al cargar pasa de desenfocada a enfocada: la misma
          metáfora, contada en el tiempo. Se anula con reduced-motion. */}
      <div
        className={`${position} hero-capa-nitida motion-safe:animate-[enfocar_1100ms_cubic-bezier(0.22,1,0.36,1)_both]`}
      >
        <Image
          src="/img/hero-protesis.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[78%_center] lg:object-[68%_center]"
        />
      </div>

      {/* Mitad desenfocada. Solo desde `lg`: en móvil no se pinta siquiera. */}
      <div
        className={`${position} hero-capa-borrosa hidden blur-[24px] lg:block`}
      >
        <Image
          src="/img/hero-protesis.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[78%_center] lg:object-[68%_center]"
        />
      </div>

      {/* Velo de contraste, calibrado para ESTA imagen: la fotografía es
          mucho más oscura que el iris dibujado que había antes, así que
          admite un velo bastante más abierto sin perder legibilidad.
          En móvil es radial: oscurece el centro, donde cae
          el texto, y afloja en los bordes para que el ojo respire. Desde `lg`
          pasa a horizontal, sobre la columna de texto. */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(4,32,47,0.78)_0%,rgba(4,32,47,0.66)_48%,rgba(4,32,47,0.40)_100%)] lg:bg-[linear-gradient(to_right,rgba(4,32,47,0.95)_0%,rgba(4,32,47,0.88)_34%,rgba(4,32,47,0.45)_54%,rgba(4,32,47,0.10)_74%,transparent_90%)]" />
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#04202f]">
      <EyeBackdrop />

      <div className="relative mx-auto flex min-h-[74svh] max-w-6xl flex-col justify-center px-4 py-14 text-center sm:px-6 lg:min-h-[86svh] lg:py-24 lg:text-left">
        <div className="mx-auto max-w-2xl lg:mx-0">
          {/* En blanco, no en azul: al abrir el velo para que se vea el ojo,
              el azul claro caía a 4.08:1 sobre las fibras del iris. El icono
              sí puede seguir en azul — como gráfico, su umbral es 3:1. */}
          <p className="flex items-center justify-center gap-2.5 font-heading text-xs font-semibold tracking-[0.3em] text-white uppercase sm:text-sm lg:justify-start">
            <Icon name="mapPin" className="h-4 w-4 shrink-0 text-[#5b9bf0]" />
            {areaServedLabel}
          </p>

          {/* Un solo H1. Las dos escalas son tipografía, no jerarquía: el
              texto completo sigue siendo la frase que lee un buscador. */}
          <h1 className="mt-6 text-white">
            <span className="block text-[clamp(1.95rem,5.8vw,4rem)] leading-[1.06] font-bold tracking-[-0.02em] text-balance">
              Centro Oftalmológico y Prótesis Oculares
            </span>
            {/* En blanco: al abrir el velo para que se vea la prótesis, este
                tono caía a 4.20:1 en móvil. El rol sí aguanta en #c7dced. */}
            <span className="mt-4 block text-[clamp(1rem,2.4vw,1.5rem)] leading-snug font-medium text-white">
              {site.doctor}
              {/* Al abrir el velo, este tono caia a 4.46:1 sobre las fibras
                  del iris en tablet. La jerarquia la da el tamano, no el
                  color, asi que sube a la misma tinta que el nombre. */}
              <span className="mt-1 block text-[0.85em] text-[#c7dced]">
                Cirujano · Oftalmólogo · Ocularista
              </span>
            </span>
          </h1>

          {/* Una sola línea. El detalle completo está en la sección 01. */}
          <p className="mx-auto mt-6 max-w-lg text-lg text-balance text-[#dbe8f1] lg:mx-0 lg:text-pretty">
            Prótesis con iris hiperrealistas y cirugía ocular.{" "}
            {site.anosProtesis} años de experiencia.
          </p>

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <WhatsAppButton
              size="lg"
              variant="onDark"
              label="Escribir por WhatsApp"
            />
            {/* El teléfono ya está en la barra fija de móvil; aquí sobra. */}
            <a
              href={`tel:${site.phone}`}
              data-analytics="phone-click"
              className="hidden min-h-[44px] cursor-pointer items-center gap-2 font-heading font-semibold text-white underline underline-offset-4 transition-colors duration-200 hover:text-[#5b9bf0] sm:inline-flex"
            >
              <Icon name="phone" className="h-5 w-5 shrink-0" />
              {site.phoneDisplay}
            </a>
          </div>
        </div>

        {/* La imagen no es decoración muda: se nombra lo que cuenta.
            Conserva su fondo TAMBIÉN en escritorio: con la foto de la
            prótesis cae sobre los dedos, y sin fondo medía 1.07:1. */}
        <p className="mx-auto mt-10 flex w-fit items-center gap-3 rounded-base bg-[#04202f]/85 px-3 py-2 text-xs tracking-wide text-white lg:absolute lg:right-6 lg:bottom-10 lg:mx-0 lg:mt-0 lg:max-w-[16rem] lg:text-right">
          <span
            aria-hidden="true"
            className="hidden h-px w-8 shrink-0 bg-[#5b9bf0]/50 lg:block"
          />
          De la visión borrosa a la visión nítida.
        </p>
      </div>
    </section>
  );
}
