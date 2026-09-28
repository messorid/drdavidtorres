import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description:
      "Protesis oculares personalizadas, protesis oculo-palpebrales y cirugia ocular en Barquisimeto y Acarigua.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#05283c",
    lang: "es-VE",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
