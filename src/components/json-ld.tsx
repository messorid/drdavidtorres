/**
 * Inserta un bloque JSON-LD. Se escapa `<` para que un valor de contenido no
 * pueda cerrar la etiqueta script antes de tiempo.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
