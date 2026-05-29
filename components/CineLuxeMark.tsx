// CineLuxe mark — corner bracket with panel inset. Matches favicon exactly.
// No background rect — designed to sit on the dark navbar surface.

interface Props {
  className?: string;
}

export default function CineLuxeMark({ className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 56 56"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* Gold L — vertical arm */}
      <rect x="6" y="6" width="7" height="40" fill="#d4a017" />
      {/* Gold L — horizontal arm */}
      <rect x="6" y="6" width="40" height="7" fill="#d4a017" />
      {/* Panel face */}
      <rect x="15" y="15" width="29" height="29" fill="#b0ada6" />
    </svg>
  );
}
