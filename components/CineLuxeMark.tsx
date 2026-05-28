// CineLuxe acoustic wave mark — 7 rounded bars in a bell-curve silhouette.
// All bars bottom-align at the same baseline. Colours dim toward the edges.

interface Props {
  className?: string;
}

export default function CineLuxeMark({ className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 56 50"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* outer bars — dim gold */}
      <rect x="0"  y="36" width="4" height="14" rx="2" fill="#9a7c28" />
      <rect x="52" y="36" width="4" height="14" rx="2" fill="#9a7c28" />

      {/* mid bars — mid gold */}
      <rect x="8"  y="28" width="4" height="22" rx="2" fill="#b08c38" />
      <rect x="44" y="28" width="4" height="22" rx="2" fill="#b08c38" />

      {/* inner bars — full gold */}
      <rect x="16" y="16" width="4" height="34" rx="2" fill="#c9a227" />
      <rect x="40" y="16" width="4" height="34" rx="2" fill="#c9a227" />

      {/* centre bar — full gold, tallest */}
      <rect x="26" y="6"  width="4" height="44" rx="2" fill="#c9a227" />
    </svg>
  );
}
