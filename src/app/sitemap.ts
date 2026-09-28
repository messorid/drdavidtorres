import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { services } from "@/lib/services";

/** Generado desde el contenido tipado, nunca a mano. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPaths: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/servicios", priority: 0.9 },
    { path: "/sobre-el-doctor", priority: 0.7 },
    { path: "/contacto", priority: 0.8 },
    { path: "/privacidad", priority: 0.2 },
    { path: "/accesibilidad", priority: 0.2 },
  ];

  return [
    ...staticPaths.map((entry) => ({
      url: `${site.url}${entry.path === "/" ? "" : entry.path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: entry.priority,
    })),
    ...services.map((service) => ({
      url: `${site.url}/servicios/${service.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
