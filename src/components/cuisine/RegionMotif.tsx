/**
 * Regional cuisine motifs — restrained engraved bronze roundels.
 *
 * Code-native SVG medallions in the same engraved-artifact family as the
 * region emblems used elsewhere in DZ Odyssey. Decorative only: every card
 * carries its own visible region name, so these are hidden from assistive
 * technology.
 */

import type { CuisineRegionId } from "@/data/cuisine";

type Props = {
  regionId: CuisineRegionId | string;
  className?: string;
};

const GLYPHS: Record<string, React.ReactElement> = {
  // Olive branch
  kabylie: (
    <>
      <path d="M14 30 C20 24, 26 18, 32 14" />
      <path d="M20 25 c-3 -3 -3 -6 0 -8 c3 2 3 5 0 8 Z" />
      <path d="M25 20 c3 -3 6 -3 8 0 c-2 3 -5 3 -8 0 Z" />
      <circle cx="17" cy="28" r="1.8" />
    </>
  ),
  // Wheat ear
  aures: (
    <>
      <path d="M23 33 V16" />
      <path d="M23 20 c-4 -1 -6 -4 -6 -6 c4 0 6 2 6 6 Z" />
      <path d="M23 20 c4 -1 6 -4 6 -6 c-4 0 -6 2 -6 6 Z" />
      <path d="M23 26 c-4 -1 -6 -4 -6 -6 c4 0 6 2 6 6 Z" />
      <path d="M23 26 c4 -1 6 -4 6 -6 c-4 0 -6 2 -6 6 Z" />
    </>
  ),
  // Sea arches over a horizon
  algiers: (
    <>
      <path d="M12 20 a5 5 0 0 1 10 0" />
      <path d="M24 20 a5 5 0 0 1 10 0" />
      <path d="M11 26 h24" />
      <path d="M13 31 q5 -3 10 0 q5 3 10 0" />
    </>
  ),
  // Bridge
  constantine: (
    <>
      <path d="M10 18 h26" />
      <path d="M14 18 v14" />
      <path d="M32 18 v14" />
      <path d="M14 32 q9 -12 18 0" />
      <path d="M18 18 v5 M23 18 v8 M28 18 v5" />
    </>
  ),
  // Chilli and a small flame of spice
  western: (
    <>
      <path d="M20 15 q4 -3 7 1" />
      <path d="M25 17 c5 4 4 12 -2 15 c-6 -1 -8 -7 -5 -11" />
      <path d="M31 24 q3 3 0 7" />
    </>
  ),
  // Steppe pottery jar
  central: (
    <>
      <path d="M19 14 h8" />
      <path d="M20 14 c-5 5 -6 12 -1 17 h8 c5 -5 4 -12 -1 -17" />
      <path d="M17 22 h12" />
      <path d="M15 20 q-3 3 0 6" />
    </>
  ),
  // Palm and dune
  sahara: (
    <>
      <path d="M23 32 V19" />
      <path d="M23 19 q-7 -4 -9 1" />
      <path d="M23 19 q7 -4 9 1" />
      <path d="M23 18 q-3 -6 -8 -6" />
      <path d="M23 18 q3 -6 8 -6" />
      <path d="M11 33 q6 -5 12 0 q6 5 12 0" />
    </>
  ),
};

export function RegionMotif({ regionId, className = "" }: Props) {
  const glyph = GLYPHS[regionId] ?? GLYPHS.kabylie;
  return (
    <svg
      viewBox="0 0 46 46"
      className={className}
      aria-hidden="true"
      focusable="false"
      role="presentation"
    >
      <circle
        cx="23"
        cy="23"
        r="21"
        fill="color-mix(in oklab, var(--secondary) 10%, transparent)"
        stroke="color-mix(in oklab, var(--secondary) 55%, var(--border))"
        strokeWidth="1"
      />
      <circle
        cx="23"
        cy="23"
        r="18"
        fill="none"
        stroke="color-mix(in oklab, var(--secondary) 30%, transparent)"
        strokeWidth="0.6"
        strokeDasharray="1.5 2.5"
      />
      <g
        fill="none"
        stroke="color-mix(in oklab, var(--secondary) 85%, var(--foreground))"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {glyph}
      </g>
    </svg>
  );
}

export default RegionMotif;
