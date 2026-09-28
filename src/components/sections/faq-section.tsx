import { Icon } from "@/components/ui/icon";
import { Section } from "@/components/ui/section";
import { faqs } from "@/lib/faqs";

/**
 * Acordeón con <details>/<summary> nativo: accesible por teclado y funcional
 * sin JavaScript, sin librería de por medio.
 */
export function FaqSection() {
  return (
    <Section
      id="preguntas"
      index="06"
      label="Dudas"
      title="Preguntas frecuentes"
      intro="Las de precio y tiempo van primero porque son las que frenan la consulta."
    >
      <div className="border-t border-line">
        {faqs.map((faq, i) => (
          <details key={faq.question} className="group border-b border-line">
            <summary className="flex cursor-pointer list-none items-start gap-5 py-5 transition-colors duration-200 hover:text-primary-dark [&::-webkit-details-marker]:hidden">
              <span
                aria-hidden="true"
                className="mt-0.5 font-heading text-sm font-semibold text-primary tabular-nums"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 font-heading font-semibold text-ink">
                {faq.question}
              </span>
              <Icon
                name="chevronDown"
                className="mt-0.5 h-5 w-5 shrink-0 text-primary transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
              />
            </summary>
            <p className="measure pb-6 pl-10 text-muted">{faq.answer}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
