import Link from "next/link";
import { Icon } from "./icon";
import { whatsappUrl, site } from "@/lib/site";

/**
 * CTA principal del sitio: WhatsApp. Es el mismo botón en todas partes, con el
 * mensaje precargado que corresponda a la página.
 *
 * Altura mínima de 44px en todas las variantes — objetivo táctil accesible.
 */

type Size = "md" | "lg";
type Variant = "solid" | "outline" | "onDark";

// `relative` no es decorativo: el aviso «(se abre en una ventana nueva)» va
// con `sr-only`, que en Tailwind es `position:absolute`. Sin un ancestro
// posicionado, ese span se coloca respecto al documento y, cuando el botón
// vive dentro de un carrusel horizontal, ESCAPA del recorte del contenedor y
// empuja la página: medido, 377 px de desplazamiento lateral en móvil.
// Con `relative` el span queda anclado al propio botón y se recorta con él.
const base =
  "relative inline-flex min-h-[44px] cursor-pointer items-center justify-center gap-2.5 rounded-base font-heading font-semibold transition-colors duration-200";

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-base",
  lg: "px-7 py-3.5 text-lg",
};

const variants: Record<Variant, string> = {
  solid: "bg-cta text-white hover:bg-cta-dark",
  outline:
    "border-2 border-cta bg-white text-cta hover:bg-cta hover:text-white",
  // Sobre el teal de la marca. El verde del CTA tiene casi la misma
  // luminancia que ese fondo (~0.16 ambos), asi que el boton solido se
  // difumina contra el; en blanco se despega y conserva 5.0:1 en el texto.
  onDark: "bg-white text-cta hover:bg-surface",
};

export function WhatsAppButton({
  message,
  size = "md",
  variant = "solid",
  label = "Escribir por WhatsApp",
  className = "",
}: {
  message?: string;
  size?: Size;
  variant?: Variant;
  label?: string;
  className?: string;
}) {
  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      data-analytics="whatsapp-click"
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      <Icon name="whatsapp" className="h-5 w-5 shrink-0" />
      <span>{label}</span>
      <span className="sr-only">(se abre en una ventana nueva)</span>
    </a>
  );
}

/** CTA secundario. Nunca compite visualmente con el de WhatsApp. */
export function PhoneLink({ className = "" }: { className?: string }) {
  return (
    <a
      href={`tel:${site.phone}`}
      data-analytics="phone-click"
      className={`inline-flex min-h-[44px] cursor-pointer items-center gap-2 font-semibold text-primary transition-colors duration-200 hover:text-primary-dark ${className}`}
    >
      <Icon name="phone" className="h-5 w-5 shrink-0" />
      <span>{site.phoneDisplay}</span>
    </a>
  );
}

export function InternalCta({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-[44px] cursor-pointer items-center gap-2 font-heading font-semibold text-primary transition-colors duration-200 hover:text-primary-dark ${className}`}
    >
      {children}
      <Icon name="arrowRight" className="h-5 w-5 shrink-0" />
    </Link>
  );
}
