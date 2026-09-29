/**
 * Estado de carga de la sección de servicios.
 *
 * Cuándo se ve: las nueve fichas están pregeneradas, así que con una conexión
 * decente la navegación es instantánea y este esqueleto no llega a pintarse.
 * Aparece donde importa — un teléfono con mala señal, o un enlace cuyo
 * prefetch no llegó a completarse — mientras se descarga la ruta nueva.
 *
 * POR QUÉ ESTÁ AQUÍ Y NO EN LA RAÍZ. Un `loading.tsx` abre una frontera de
 * Suspense, y con ella la respuesta empieza a transmitirse: las cabeceras
 * salen antes de saber si el render va a fallar, así que el estado ya no se
 * puede cambiar. Medido en este proyecto, con el archivo en la raíz:
 *
 *     sin loading.tsx   error → HTTP 500 + noindex
 *     con loading.tsx   error → HTTP 200 y sin noindex
 *
 * Es decir, una caída se anunciaría como página correcta: la monitorización
 * la vería sana y Google podría indexar la pantalla de error. Acotado a esta
 * carpeta, el 500 de la aplicación y los 404 se conservan.
 *
 * Se dibuja la silueta de lo que viene (una etiqueta, un título, dos líneas
 * y una banda de imagen) en lugar de un disco girando: así el salto al
 * contenido real no mueve la página de sitio.
 *
 * El pulso va bajo `motion-safe`. Un parpadeo continuo es justo lo que la
 * WCAG pide poder desactivar, y aquí no aporta información: la información
 * la da la silueta.
 */
export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Cargando la página"
      className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24"
    >
      <div className="motion-safe:animate-pulse">
        <div className="h-3 w-28 rounded-full bg-surface-alt" />
        <div className="mt-6 h-9 w-full max-w-2xl rounded-base bg-surface-alt" />
        <div className="mt-4 h-5 w-full max-w-xl rounded-full bg-surface" />
        <div className="mt-3 h-5 w-3/4 max-w-lg rounded-full bg-surface" />
        <div className="mt-10 aspect-[16/9] w-full rounded-base bg-surface-alt sm:aspect-[21/9]" />
      </div>
      <span className="sr-only">Cargando…</span>
    </div>
  );
}
