import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { ServicesGrid } from "@/components/sections/services-grid";
import { DoctorPreview } from "@/components/sections/doctor-preview";
import { Casos } from "@/components/sections/casos";
import { Process } from "@/components/sections/process";
import { Productos } from "@/components/sections/productos";
import { Areas } from "@/components/sections/areas";
import { FaqSection } from "@/components/sections/faq-section";
import { FinalCta } from "@/components/sections/final-cta";
import { JsonLd } from "@/components/json-ld";
import { buildMetadata } from "@/lib/seo";
import { faqSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  // El título compite en el SERP; el H1 del hero es distinto a propósito.
  // La consulta "protesis oculares" la trabaja /servicios/protesis-oculares.
  // La home es el hub: marca + oftalmologia general + ambas ciudades.
  title: "Oftalmólogo y Ocularista en Barquisimeto | Dr. Torres",
  description:
    "Oftalmólogo y ocularista en Acarigua y Barquisimeto. Prótesis oculares con iris pintado a mano, cirugía de catarata, glaucoma y pterigión.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ServicesGrid />
      <Casos />
      <DoctorPreview />
      <Process />
      <Productos />
      <Areas />
      <FaqSection />
      <FinalCta />
      <JsonLd data={faqSchema()} />
    </>
  );
}
