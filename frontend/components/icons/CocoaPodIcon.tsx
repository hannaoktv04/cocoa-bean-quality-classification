// Line-art SVG buah kakao. Dipakai di hero card dan dekorasi section lain.
// Tetap konsisten: stroke tipis, tanpa fill, gold accent.

interface CocoaPodIconProps {
  className?: string;
  strokeWidth?: number;
}

export function CocoaPodIcon({ className, strokeWidth = 1.4 }: CocoaPodIconProps) {
  return (
    <svg
      viewBox="0 0 200 240"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* Batang kecil di atas */}
      <path d="M100 14 C 100 28 100 36 100 46" />
      {/* Daun kecil */}
      <path d="M100 46 C 86 42 78 30 80 22 C 90 24 100 34 100 46 Z" />
      <path d="M100 46 C 114 42 122 30 120 22 C 110 24 100 34 100 46 Z" />

      {/* Buah kakao (pod) — bentuk lonjong dengan ridge */}
      <path d="M100 52
               C 60 56 38 92 42 140
               C 46 188 76 218 100 222
               C 124 218 154 188 158 140
               C 162 92 140 56 100 52 Z" />

      {/* Ridge/urat buah */}
      <path d="M100 52 C 100 120 100 180 100 222" />
      <path d="M70 80 C 76 130 80 180 88 218" />
      <path d="M130 80 C 124 130 120 180 112 218" />
      <path d="M52 118 C 80 124 120 124 148 118" />
      <path d="M50 150 C 80 158 120 158 150 150" />

      {/* Highlight kecil */}
      <path
        d="M70 96 C 72 110 74 122 76 130"
        opacity="0.6"
      />
    </svg>
  );
}

/** Biji kakao individual (oval dengan alur tengah) */
export function CocoaBeanIcon({ className, strokeWidth = 1.2 }: CocoaPodIconProps) {
  return (
    <svg
      viewBox="0 0 80 60"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <ellipse cx="40" cy="30" rx="32" ry="20" />
      <path d="M14 30 C 24 24 56 24 66 30" />
      <path d="M14 30 C 24 36 56 36 66 30" />
    </svg>
  );
}

/** Pola urat daun — untuk background dekoratif */
export function LeafVeinPattern({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={0.8}
      strokeLinecap="round"
      aria-hidden
    >
      <g opacity="0.5">
        {Array.from({ length: 7 }).map((_, i) => (
          <g key={i} transform={`translate(${i * 60 - 60}, ${i * 40 - 40})`}>
            <path d="M0 0 Q 100 -40 200 0" />
            <path d="M0 0 Q 100 40 200 0" />
            <path d="M0 0 L 200 0" />
            {Array.from({ length: 6 }).map((__, j) => (
              <path
                key={j}
                d={`M${30 + j * 28} 0 L ${20 + j * 28} -16`}
                opacity={0.5}
              />
            ))}
          </g>
        ))}
      </g>
    </svg>
  );
}
