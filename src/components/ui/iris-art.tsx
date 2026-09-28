/**
 * Iris dibujado en SVG. Se usa como marca gráfica mientras no haya fotografía
 * real del doctor ni del trabajo protésico.
 *
 * Es marca gráfica, no sustituto de fotografía: el hero lo usa como fondo
 * porque una foto no admite el efecto de borroso a nítido.
 *
 * `gradientId` existe porque el hero pinta dos copias (una nítida y una
 * desenfocada) en el mismo documento: si ambas declararan `id="iris"`, el
 * navegador resolvería las dos referencias al primer gradiente.
 */
export function IrisArt({
  gradientId,
  className = "h-full w-full",
  title = "Ilustración de un iris humano",
}: {
  gradientId: string;
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 240 240"
      className={className}
      role="img"
      aria-label={title}
    >
      <defs>
        {/* Un iris real se aclara hacia la pupila y se oscurece en el anillo
            límbico del borde. Invertido, se lee como un logo, no como un ojo. */}
        <radialGradient id={gradientId} cx="50%" cy="50%" r="50%">
          <stop offset="18%" stopColor="#5b9bf0" />
          <stop offset="52%" stopColor="#1363de" />
          <stop offset="86%" stopColor="#0a3a63" />
          <stop offset="100%" stopColor="#05283c" />
        </radialGradient>
      </defs>

      <circle cx="120" cy="120" r="104" fill={`url(#${gradientId})`} />

      {/* Fibras del estroma, más densas cerca de la pupila. */}
      {Array.from({ length: 56 }).map((_, i) => {
        const angle = (i / 56) * Math.PI * 2;
        const inner = 44;
        const outer = i % 2 === 0 ? 98 : 82;
        return (
          <line
            key={i}
            x1={120 + Math.cos(angle) * inner}
            y1={120 + Math.sin(angle) * inner}
            x2={120 + Math.cos(angle) * outer}
            y2={120 + Math.sin(angle) * outer}
            stroke="#dbe9fb"
            strokeOpacity={i % 2 === 0 ? 0.22 : 0.1}
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        );
      })}

      {/* Collarete: el reborde que rodea la pupila. */}
      <circle
        cx="120"
        cy="120"
        r="46"
        fill="none"
        stroke="#dbe9fb"
        strokeOpacity="0.22"
        strokeWidth="2"
      />

      <circle cx="120" cy="120" r="42" fill="#04202f" />

      {/* Reflejo especular: uno solo, como el de una foto con luz frontal. */}
      <circle cx="104" cy="104" r="11" fill="#ffffff" fillOpacity="0.5" />
      <circle cx="133" cy="135" r="4" fill="#ffffff" fillOpacity="0.16" />
    </svg>
  );
}
