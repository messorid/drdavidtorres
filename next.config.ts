import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,

  /**
   * Redirects 301.
   *
   * `www` manda al dominio desnudo, que es el canonical de todo el sitio.
   * Sin esto, las dos variantes servirian el mismo contenido y Google las
   * trataria como duplicados; con el 301, toda la autoridad va a una sola.
   * Se hace aqui, en codigo, y no en el panel de Vercel: queda versionado,
   * se ve en el repositorio y no depende de un ajuste que nadie recuerde.
   *
   * Si en el futuro se consolidan slugs o se migra desde otra web, la tabla
   * crece aqui mismo con `permanent: true`, mapeando URL por URL. Nunca todo
   * a la home: Google lo trata como soft 404 y se pierde la autoridad.
   */
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.drdavidtorres.com" }],
        destination: "https://drdavidtorres.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
