import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,

  /**
   * Redirects 301. Hoy vacio: no hay sitio anterior que migrar.
   *
   * Si en el futuro se consolidan slugs o se migra desde otra web, la tabla va
   * aqui con `permanent: true`, mapeando URL por URL. Nunca todo a la home:
   * Google lo trata como soft 404 y se pierde la autoridad acumulada.
   */
  async redirects() {
    return [];
  },
};

export default nextConfig;
