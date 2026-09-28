import Link from "next/link";
import { WhatsAppButton } from "@/components/ui/cta-button";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6 lg:py-28">
      <p className="font-heading text-sm font-semibold tracking-wide text-primary uppercase">
        Error 404
      </p>
      <h1 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
        Esta página no existe
      </h1>
      <p className="mt-4 text-lg text-muted">
        Es posible que el enlace esté mal escrito o que la página haya cambiado
        de dirección.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Link
          href="/"
          className="inline-flex min-h-[44px] cursor-pointer items-center rounded-base border-2 border-primary px-6 py-2.5 font-heading font-semibold text-primary transition-colors duration-200 hover:bg-surface"
        >
          Volver al inicio
        </Link>
        <WhatsAppButton />
      </div>
    </div>
  );
}
