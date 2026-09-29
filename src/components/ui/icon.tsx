import type { SVGProps } from "react";

/**
 * Set de iconos SVG propio, en una sola rejilla de 24x24 y con el mismo grosor
 * de trazo, para que no se mezclen tamaños ni estilos. Nunca emojis.
 *
 * Los iconos son decorativos: el significado siempre está en el texto que los
 * acompaña, por eso llevan `aria-hidden`.
 */

export type IconName =
  | "prosthesis"
  | "eye"
  | "cataract"
  | "pterygium"
  | "chalazion"
  | "glaucoma"
  | "orbit"
  | "tools"
  | "pause"
  | "play"
  | "search"
  | "whatsapp"
  | "phone"
  | "mail"
  | "mapPin"
  | "check"
  | "arrowRight"
  | "chevronDown"
  | "menu"
  | "close"
  | "academicCap"
  | "shield"
  | "clock";

const strokePaths: Partial<Record<IconName, React.ReactNode>> = {
  eye: (
    <>
      <path d="M2.1 12.3a.9.9 0 0 1 0-.6 10.7 10.7 0 0 1 19.8 0 .9.9 0 0 1 0 .6 10.7 10.7 0 0 1-19.8 0Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  prosthesis: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="1.2" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2" />
    </>
  ),
  cataract: (
    <>
      <path d="M2.1 12.3a.9.9 0 0 1 0-.6 10.7 10.7 0 0 1 19.8 0 .9.9 0 0 1 0 .6 10.7 10.7 0 0 1-19.8 0Z" />
      <path d="M9.4 10.4a3 3 0 0 0 4.2 4.2" />
      <path d="M14.9 12.8A3 3 0 0 0 12 9" />
    </>
  ),
  pterygium: (
    <>
      <path d="M2.1 12.3a.9.9 0 0 1 0-.6 10.7 10.7 0 0 1 19.8 0 .9.9 0 0 1 0 .6 10.7 10.7 0 0 1-19.8 0Z" />
      <circle cx="12" cy="12" r="3" />
      <path d="M2.6 9.6 9 12l-6.4 2.4" />
    </>
  ),
  chalazion: (
    <>
      <path d="M2.5 14.5a11 11 0 0 1 19 0" />
      <path d="M2.5 14.5h19" />
      <circle cx="9.5" cy="10.4" r="2.1" />
    </>
  ),
  glaucoma: (
    <>
      <path d="M2.1 12.3a.9.9 0 0 1 0-.6 10.7 10.7 0 0 1 19.8 0 .9.9 0 0 1 0 .6 10.7 10.7 0 0 1-19.8 0Z" />
      <circle cx="12" cy="12" r="3.2" />
      {/* Flechas hacia el centro: la presion intraocular que hay que bajar. */}
      <path d="M12 5.6v1.6M12 16.8v1.6M6.6 12H5M19 12h-1.6" />
    </>
  ),
  orbit: (
    <>
      {/* Cavidad orbitaria: contorno oseo y el lecho interior. */}
      <path d="M12 3.2c4.6 0 7.8 3 7.8 7.2 0 4.7-3.4 10.4-7.8 10.4S4.2 15.1 4.2 10.4C4.2 6.2 7.4 3.2 12 3.2Z" />
      <ellipse cx="12" cy="10" rx="4.3" ry="3.4" />
    </>
  ),
  tools: (
    <>
      {/* Conformador y anillo: las piezas que sostienen la cirugia. */}
      <ellipse cx="9" cy="9.2" rx="5.4" ry="4.2" />
      <path d="M14.2 14.4a4.6 4.6 0 1 0 5.6 5.6 4.6 4.6 0 0 0-5.6-5.6Z" />
      <path d="M16.1 17.2h1.8" />
    </>
  ),
  search: (
    <>
      <circle cx="10.8" cy="10.8" r="6.8" />
      <path d="m15.8 15.8 4.7 4.7" />
    </>
  ),
  pause: <path d="M9.5 4.5v15M14.5 4.5v15" />,
  play: <path d="M7.5 4.8v14.4l12-7.2-12-7.2Z" />,
  phone: (
    <path d="M13.8 10.2a11 11 0 0 0 4.4 4.4l1.4-1.4a1.3 1.3 0 0 1 1.4-.3 12 12 0 0 0 2.2.5 1.3 1.3 0 0 1 1.1 1.3v2.3a1.3 1.3 0 0 1-1.4 1.3A17.5 17.5 0 0 1 5.7 4.5 1.3 1.3 0 0 1 7 3.1h2.3a1.3 1.3 0 0 1 1.3 1.1 12 12 0 0 0 .5 2.2 1.3 1.3 0 0 1-.3 1.4Z" />
  ),
  mail: (
    <>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
      <path d="m3 6.5 9 6 9-6" />
    </>
  ),
  mapPin: (
    <>
      <path d="M20 10.5c0 5.4-8 12-8 12s-8-6.6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10.5" r="3" />
    </>
  ),
  check: <path d="m4.5 12.8 4.8 4.7L19.5 6.5" />,
  arrowRight: <path d="M4 12h15m-6-6.5L19.5 12 13 18.5" />,
  chevronDown: <path d="m5.5 9 6.5 6.5L18.5 9" />,
  menu: <path d="M3.5 6.5h17M3.5 12h17M3.5 17.5h17" />,
  close: <path d="m5.5 5.5 13 13m0-13-13 13" />,
  academicCap: (
    <>
      <path d="M12 3 2.5 8 12 13l9.5-5L12 3Z" />
      <path d="M6.5 10.3V16c0 1.5 2.5 3 5.5 3s5.5-1.5 5.5-3v-5.7" />
      <path d="M21.5 8v5.5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 2.5 4.5 5.5v6c0 4.6 3.2 8.6 7.5 10 4.3-1.4 7.5-5.4 7.5-10v-6L12 2.5Z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.3l3.4 2" />
    </>
  ),
};

/** WhatsApp se dibuja con relleno, no con trazo: es el logo oficial. */
const WHATSAPP_PATH =
  "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z";

type IconProps = SVGProps<SVGSVGElement> & { name: IconName };

export function Icon({ name, className = "h-6 w-6", ...rest }: IconProps) {
  if (name === "whatsapp") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        aria-hidden="true"
        focusable="false"
        {...rest}
      >
        <path d={WHATSAPP_PATH} />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {strokePaths[name]}
    </svg>
  );
}
