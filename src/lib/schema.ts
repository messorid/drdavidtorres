import { site, sedePrincipal } from "./site";
import { services, type Service } from "./services";
import { faqs } from "./faqs";
import { canonical } from "./seo";

/**
 * Todo el JSON-LD se genera desde `site.ts` y desde el contenido tipado que
 * ya renderiza la página. Si el schema afirma algo que el visitante no puede
 * ver en pantalla, es marcado engañoso.
 *
 * Ausencias deliberadas:
 *   - `geo`: no hay coordenadas verificadas. El centroide de la ciudad para
 *     "ayudar" es un dato falso.
 *   - `aggregateRating`: no hay reseñas verificables.
 */

const CENTRO_ID = `${site.url}/#centro`;
const MEDICO_ID = `${site.url}/#medico`;

/** Solo las sedes con día y hora fijos entran en el horario del schema. */
const horarioSemanal = site.sedes
  .filter((s) => s.opens && s.closes)
  .map((s) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: s.dias.map((d) => `https://schema.org/${d}`),
    opens: s.opens,
    closes: s.closes,
  }));

/** La entidad del negocio: una clínica con dos sedes de consulta fija. */
export function centroSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": CENTRO_ID,
    name: site.name,
    alternateName: site.shortName,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    medicalSpecialty: "Ophthalmologic",
    currenciesAccepted: "VES",
    // Schema.org admite una sola `address` por entidad: va la sede con más
    // días de consulta. Las demás se publican en la página y como `areaServed`.
    address: {
      "@type": "PostalAddress",
      streetAddress: `${sedePrincipal.lugar}, ${sedePrincipal.direccion}`,
      addressLocality: sedePrincipal.ciudad,
      addressRegion: sedePrincipal.estado,
      addressCountry: "VE",
    },
    openingHoursSpecification: horarioSemanal,
    areaServed: site.sedes.map((s) => ({
      "@type": "City",
      name: s.ciudad,
      containedInPlace: { "@type": "AdministrativeArea", name: s.estado },
    })),
    availableService: services.map((s) => ({
      "@type": "MedicalProcedure",
      name: s.name,
      url: canonical(`/servicios/${s.slug}`),
    })),
    employee: { "@id": MEDICO_ID },
    ...(Object.keys(site.social).length
      ? { sameAs: Object.values(site.social) }
      : {}),
  };
}

/** El profesional, enlazado desde la clínica. */
export function medicoSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": MEDICO_ID,
    name: site.doctor,
    alternateName: site.shortName,
    url: canonical("/sobre-el-doctor"),
    telephone: site.phone,
    email: site.email,
    medicalSpecialty: "Ophthalmologic",
    jobTitle: site.role,
    worksFor: { "@id": CENTRO_ID },
    knowsLanguage: "es",
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Universidad Centroccidental Lisandro Alvarado",
      alternateName: "UCLA",
    },
    hasCredential: site.credentials.map((c) => ({
      "@type": "EducationalOccupationalCredential",
      name: c,
    })),
  };
}

export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: service.name,
    description: service.metaDescription,
    url: canonical(`/servicios/${service.slug}`),
    performer: { "@id": MEDICO_ID },
    ...(service.area === "oftalmologia"
      ? { procedureType: "https://schema.org/SurgicalProcedure" }
      : {}),
  };
}

export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: canonical(item.path),
    })),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    inLanguage: "es",
    publisher: { "@id": CENTRO_ID },
  };
}
