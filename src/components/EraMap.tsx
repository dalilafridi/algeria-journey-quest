import { t, type Lang, type LocalizedString } from "@/lib/i18n";

/**
 * Approximate normalized (x, y) coordinates within the Algeria outline viewBox (0..100).
 * Keys are matched against a place's English name (lowercased, trimmed).
 * Unknown places are auto-distributed along the northern coast so every era
 * still gets a usable map without extra assets.
 */
const PLACE_COORDS: Record<string, { x: number; y: number }> = {
  // Cities (north)
  algiers: { x: 50, y: 22 },
  "alger": { x: 50, y: 22 },
  oran: { x: 32, y: 26 },
  constantine: { x: 66, y: 24 },
  cirta: { x: 66, y: 24 },
  annaba: { x: 72, y: 22 },
  "hippo regius": { x: 72, y: 23 },
  hippo: { x: 72, y: 23 },
  tlemcen: { x: 26, y: 30 },
  bejaia: { x: 58, y: 23 },
  "béjaïa": { x: 58, y: 23 },
  setif: { x: 60, y: 27 },
  sétif: { x: 60, y: 27 },
  tipaza: { x: 47, y: 22 },
  cherchell: { x: 45, y: 23 },
  djemila: { x: 62, y: 26 },
  timgad: { x: 64, y: 30 },
  lambaesis: { x: 63, y: 31 },
  tahert: { x: 38, y: 32 },
  tiaret: { x: 38, y: 32 },
  qalaa: { x: 56, y: 30 },
  "qalaa of beni hammad": { x: 56, y: 30 },
  ghardaia: { x: 50, y: 50 },
  "ghardaïa": { x: 50, y: 50 },
  // South / Sahara
  tamanrasset: { x: 55, y: 86 },
  "in salah": { x: 50, y: 66 },
  tindouf: { x: 14, y: 60 },
  adrar: { x: 38, y: 64 },
  ouargla: { x: 58, y: 50 },
  biskra: { x: 60, y: 36 },
  batna: { x: 62, y: 30 },
};

function normalize(s: string) {
  return s.toLowerCase().trim();
}

function coordsFor(name: string, fallbackIndex: number, total: number) {
  const key = normalize(name);
  if (PLACE_COORDS[key]) return PLACE_COORDS[key];
  // Fallback: spread along the populated north (y ~ 22..32), x ~ 22..78
  const span = Math.max(total - 1, 1);
  const x = 22 + (fallbackIndex / span) * 56;
  const y = 22 + (fallbackIndex % 2 === 0 ? 0 : 8);
  return { x, y };
}

export type EraMapPlace = { name: LocalizedString; note?: LocalizedString };

export function EraMap({ places, lang }: { places: EraMapPlace[]; lang: Lang }) {
  return (
    <div className="relative w-full">
      <svg
        viewBox="0 0 100 100"
        className="w-full h-auto rounded-xl"
        style={{
          background:
            "linear-gradient(160deg, color-mix(in oklab, var(--secondary) 14%, var(--card)), var(--card))",
        }}
        role="img"
        aria-label="Map of key places"
      >
        <defs>
          <radialGradient id="era-map-pin" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.95 0.18 88)" />
            <stop offset="100%" stopColor="oklch(0.6 0.14 60)" />
          </radialGradient>
          <linearGradient id="era-map-land" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.86 0.05 80 / 0.85)" />
            <stop offset="60%" stopColor="oklch(0.78 0.07 75 / 0.7)" />
            <stop offset="100%" stopColor="oklch(0.65 0.08 70 / 0.55)" />
          </linearGradient>
        </defs>

        {/* Stylized Algeria outline (approximate) */}
        <path
          d="
            M 12 28
            L 22 18
            L 36 16
            L 52 17
            L 66 18
            L 80 19
            L 92 22
            L 90 30
            L 88 38
            L 84 50
            L 78 62
            L 72 74
            L 64 86
            L 56 94
            L 44 92
            L 30 80
            L 22 66
            L 16 52
            L 12 40
            Z
          "
          fill="url(#era-map-land)"
          stroke="oklch(0.45 0.06 65 / 0.6)"
          strokeWidth="0.6"
        />

        {/* Coast hint line */}
        <path
          d="M 12 28 L 22 18 L 36 16 L 52 17 L 66 18 L 80 19 L 92 22"
          fill="none"
          stroke="oklch(0.55 0.12 240 / 0.55)"
          strokeWidth="0.8"
        />

        {/* Sahara hatch */}
        <g opacity="0.18" stroke="oklch(0.45 0.08 70)" strokeWidth="0.3">
          {Array.from({ length: 8 }).map((_, i) => (
            <line key={i} x1={20 + i * 8} y1={55} x2={28 + i * 8} y2={85} />
          ))}
        </g>

        {/* Pins */}
        {places.map((p, i) => {
          const { x, y } = coordsFor(t(p.name, "en"), i, places.length);
          return (
            <g key={i}>
              <circle cx={x} cy={y} r="2.4" fill="url(#era-map-pin)" />
              <circle
                cx={x}
                cy={y}
                r="1"
                fill="oklch(0.18 0.03 55)"
                opacity="0.85"
              />
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <ul className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
        {places.map((p, i) => (
          <li key={i} className="flex items-center gap-2 min-w-0">
            <span
              className="inline-block w-2.5 h-2.5 rounded-full shrink-0"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, oklch(0.95 0.18 88), oklch(0.6 0.14 60))",
                boxShadow: "0 0 6px oklch(0.85 0.16 80 / 0.5)",
              }}
            />
            <span className="truncate font-medium text-foreground/85">
              {t(p.name, lang)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EraMap;
