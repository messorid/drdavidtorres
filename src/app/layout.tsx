import type { Metadata, Viewport } from "next";
import { Rubik } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { MobileCtaBar } from "@/components/layout/mobile-cta-bar";
import { BotonArriba } from "@/components/layout/boton-arriba";
import { ScrollAlInicio } from "@/components/layout/scroll-al-inicio";
import { JsonLd } from "@/components/json-ld";
import { site } from "@/lib/site";
import { centroSchema, medicoSchema, websiteSchema } from "@/lib/schema";

// Rubik es la tipografía del manual de marca del cliente. Se usa para
// titulares y cuerpo; los pesos hacen la jerarquía.
const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  // Cada pagina emite su titulo absoluto via buildMetadata; aqui solo el
  // respaldo por si alguna ruta futura no define el suyo.
  title: "Oftalmólogo y Ocularista en Barquisimeto | Dr. Torres",
  description:
    "Centro Oftalmológico y Prótesis Oculares Dr. David Torres. Prótesis oculares personalizadas, cirugía de catarata, glaucoma y pterigión.",
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: site.url },
  formatDetection: { telephone: true, address: false, email: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#05283c",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="es-VE" className={rubik.variable}>
      <body>
        <ScrollAlInicio />

        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-base focus:bg-primary focus:px-5 focus:py-3 focus:font-semibold focus:text-white"
        >
          Saltar al contenido
        </a>

        <SiteHeader />

        <main id="contenido">{children}</main>

        <SiteFooter />
        <MobileCtaBar />
        <BotonArriba />

        <JsonLd data={[centroSchema(), medicoSchema(), websiteSchema()]} />
        {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
      </body>
    </html>
  );
}
