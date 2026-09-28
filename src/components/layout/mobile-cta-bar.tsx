import { Icon } from "@/components/ui/icon";
import { site, whatsappUrl } from "@/lib/site";

/**
 * Barra fija de contacto en móvil. El layout reserva el espacio inferior
 * equivalente para que no tape el final del contenido.
 */
export function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 backdrop-blur md:hidden">
      <div className="flex items-stretch gap-2 px-3 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))]">
        <a
          href={`tel:${site.phone}`}
          data-analytics="phone-click"
          className="inline-flex min-h-[48px] flex-1 cursor-pointer items-center justify-center gap-2 rounded-base border-2 border-primary font-heading font-semibold text-primary transition-colors duration-200 hover:bg-surface"
        >
          <Icon name="phone" className="h-5 w-5 shrink-0" />
          Llamar
        </a>
        <a
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          data-analytics="whatsapp-click"
          className="inline-flex min-h-[48px] flex-[1.4] cursor-pointer items-center justify-center gap-2 rounded-base bg-cta font-heading font-semibold text-white transition-colors duration-200 hover:bg-cta-dark"
        >
          <Icon name="whatsapp" className="h-5 w-5 shrink-0" />
          WhatsApp
          <span className="sr-only">(se abre en una ventana nueva)</span>
        </a>
      </div>
    </div>
  );
}
