import { WhatsAppButton } from "@/components/ui/cta-button";
import { Icon } from "@/components/ui/icon";
import { site } from "@/lib/site";

/** CTA final: una sola acción, sin distracciones alrededor. */
export function FinalCta({
  title = "Escribe y cuenta tu caso",
  body = "Se responde por WhatsApp con la orientación inicial y se coordina la consulta en la sede que te quede mejor.",
  message,
}: {
  title?: string;
  body?: string;
  message?: string;
}) {
  return (
    <section className="bg-navy">
      <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 lg:py-28 lg:text-left">
        <div>
          <p
            aria-hidden="true"
            className="font-heading text-xs font-semibold tracking-[0.22em] text-white/70 uppercase"
          >
            Contacto
          </p>
        </div>

        <div className="mt-5">
          <h2 className="mx-auto max-w-2xl text-2xl leading-tight font-bold text-balance text-white sm:text-[1.75rem] lg:mx-0">
            {title}
          </h2>
          <p className="measure mx-auto mt-4 text-lg text-white/90 lg:mx-0">
            {body}
          </p>

          <div className="mt-9 flex justify-center lg:justify-start">
            <WhatsAppButton size="lg" variant="onDark" message={message} />
          </div>

          <div className="mt-9 flex flex-col items-center gap-x-10 gap-y-3 border-t border-white/20 pt-6 text-white/90 sm:flex-row sm:justify-center lg:items-start lg:justify-start">
            <a
              href={`tel:${site.phone}`}
              data-analytics="phone-click"
              className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 font-semibold underline underline-offset-4 transition-colors duration-200 hover:text-white"
            >
              <Icon name="phone" className="h-5 w-5 shrink-0" />
              {site.phoneDisplay}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 font-semibold break-all underline underline-offset-4 transition-colors duration-200 hover:text-white"
            >
              <Icon name="mail" className="h-5 w-5 shrink-0" />
              {site.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
