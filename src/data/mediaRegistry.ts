/**
 * Machine-readable media classification registry.
 *
 * Single source of truth for "what kind of visual is this?". Every media file
 * shipped with the museum is listed here exactly once, keyed by its path inside
 * `src/assets` (or `public`). Content editors and rights audits read this map;
 * no second competing metadata system exists. The optional `mediaType` field on
 * `FeaturedExhibit` re-uses the same `MediaType` union defined below.
 *
 * This registry is data, not UI. It intentionally does not cause a badge to be
 * rendered on every decorative image. Visitor-facing disclosure stays where it
 * matters: exhibit heroes, reconstructions, and the public Credits page.
 */

/** The only vocabulary used to classify museum media. */
export type MediaType =
  /** Ornamental artwork with no documentary claim (backgrounds, textures). */
  | "decorative-artwork"
  /** Original artwork evoking a place, period, team or scene. */
  | "interpretive-illustration"
  /** Original drawing reconstructing a structure or system. Not a survey. */
  | "interpretive-reconstruction"
  /** First-party DZ Odyssey brand mark, emblem or identity asset. */
  | "brand-mark"
  /** A real photograph or archival document with documented provenance. */
  | "documentary-media";

/** Publication state of a media file with respect to public routes. */
export type MediaUse =
  /** Referenced by at least one public visitor route. */
  | "public"
  /** Present in the repository, referenced by no public route. */
  | "dormant"
  /** Retained internally, deliberately blocked from public use. */
  | "blocked";

export interface MediaRecord {
  /** Path relative to the repository root. */
  path: string;
  mediaType: MediaType;
  use: MediaUse;
  /** Short internal note. Never rendered to visitors. */
  note?: string;
}

export const MEDIA_REGISTRY: MediaRecord[] = [
  /* ---------------- Exhibit and highlight imagery ---------------- */
  { path: "src/assets/exhibit-timgad.jpg", mediaType: "interpretive-illustration", use: "public" },
  { path: "src/assets/exhibit-tassili.jpg", mediaType: "interpretive-illustration", use: "public" },
  { path: "src/assets/exhibit-casbah.jpg", mediaType: "interpretive-illustration", use: "public" },
  { path: "src/assets/exhibit-djemila.jpg", mediaType: "interpretive-illustration", use: "public" },
  { path: "src/assets/exhibit-tipasa.jpg", mediaType: "interpretive-illustration", use: "public" },
  { path: "src/assets/exhibit-kabylie.jpg", mediaType: "interpretive-illustration", use: "public" },
  { path: "src/assets/mzab-hero.jpg", mediaType: "interpretive-illustration", use: "public" },
  { path: "src/assets/football-hero-vitrine.jpg", mediaType: "interpretive-illustration", use: "public" },
  { path: "src/assets/cuisine-hero.jpg", mediaType: "interpretive-illustration", use: "public" },
  { path: "src/assets/algeria-map.png", mediaType: "interpretive-illustration", use: "public" },

  /* ---------------- Football hall ---------------- */
  {
    path: "src/assets/fln-team-illustration.png",
    mediaType: "interpretive-illustration",
    use: "public",
    note: "Replacement hero for the Hall of Algerian Football. Original museum-poster drawing, no crest or federation mark.",
  },
  {
    path: "src/assets/lesvertes-illustration.png",
    mediaType: "interpretive-illustration",
    use: "public",
    note: "Replacement hero for the Les Vertes exhibit. Non-identifying stylized figures, no kit branding.",
  },
  {
    path: "src/assets/fln-team-1958.jpg.asset.json",
    mediaType: "documentary-media",
    use: "blocked",
    note: "Retained internally, blocked from public use pending documented rights.",
  },
  {
    path: "src/assets/lesvertes-hero.jpg.asset.json",
    mediaType: "documentary-media",
    use: "blocked",
    note: "Retained internally, blocked from public use pending documented rights.",
  },

  /* ---------------- Era imagery ---------------- */
  { path: "src/assets/era-numidia.png", mediaType: "interpretive-illustration", use: "public" },
  { path: "src/assets/era-roman.png", mediaType: "interpretive-illustration", use: "public" },
  { path: "src/assets/era-islamic.png", mediaType: "interpretive-illustration", use: "public" },
  { path: "src/assets/era-ottoman.jpg", mediaType: "interpretive-illustration", use: "public" },
  { path: "src/assets/era-french.png", mediaType: "interpretive-illustration", use: "public" },
  { path: "src/assets/era-independence.png", mediaType: "interpretive-illustration", use: "public" },
  { path: "src/assets/era-earlynorthafrica.jpg", mediaType: "interpretive-illustration", use: "public" },
  { path: "src/assets/era-numidia.jpg", mediaType: "interpretive-illustration", use: "public" },

  /* ---------------- M'Zab exhibit ---------------- */
  { path: "src/assets/mzab-water.jpg", mediaType: "interpretive-illustration", use: "public" },
  { path: "src/assets/mzab-market.jpg", mediaType: "interpretive-illustration", use: "public" },
  {
    path: "src/assets/mzab-ksar-plan.jpg",
    mediaType: "interpretive-reconstruction",
    use: "public",
    note: "Interpretive reconstruction created for DZ Odyssey. Not a surveyed architectural drawing.",
  },
  {
    path: "src/assets/mzab-house-diagram.jpg",
    mediaType: "interpretive-reconstruction",
    use: "public",
    note: "Interpretive reconstruction created for DZ Odyssey. Not a surveyed architectural drawing.",
  },

  /* ---------------- Emblems ---------------- */
  { path: "src/assets/emblems/region-kabylie.png", mediaType: "brand-mark", use: "public" },
  { path: "src/assets/emblems/region-aures.png", mediaType: "brand-mark", use: "public" },
  { path: "src/assets/emblems/region-algiers.png", mediaType: "brand-mark", use: "public" },
  { path: "src/assets/emblems/region-constantine.png", mediaType: "brand-mark", use: "public" },
  { path: "src/assets/emblems/region-sahara.png", mediaType: "brand-mark", use: "public" },
  { path: "src/assets/emblems/region-oran-west.png", mediaType: "brand-mark", use: "public" },
  { path: "src/assets/emblems/pillar-journey.png", mediaType: "brand-mark", use: "public" },
  { path: "src/assets/emblems/pillar-regions.png", mediaType: "brand-mark", use: "public" },
  { path: "src/assets/emblems/pillar-culture.png", mediaType: "brand-mark", use: "public" },

  /* ---------------- Brand and chrome ---------------- */
  { path: "src/assets/brand-icon.png", mediaType: "brand-mark", use: "public" },
  { path: "src/assets/brand-cover.png", mediaType: "brand-mark", use: "public" },
  { path: "src/assets/loading-wheel.png", mediaType: "brand-mark", use: "public" },
  { path: "public/favicon.svg", mediaType: "brand-mark", use: "public" },
  { path: "src/assets/hero-bg.png", mediaType: "decorative-artwork", use: "public" },

  /* ---------------- Dormant, excluded from public routes ---------------- */
  { path: "src/assets/era-french.jpg", mediaType: "interpretive-illustration", use: "dormant" },
  { path: "src/assets/era-independence.jpg", mediaType: "interpretive-illustration", use: "dormant" },
  { path: "src/assets/era-islamic.jpg", mediaType: "interpretive-illustration", use: "dormant" },
  { path: "src/assets/era-roman.jpg", mediaType: "interpretive-illustration", use: "dormant" },
  { path: "src/assets/algeria-outline.png", mediaType: "decorative-artwork", use: "dormant" },
  { path: "src/assets/brand-mark.png", mediaType: "brand-mark", use: "dormant" },
  { path: "src/assets/brand-overview.png", mediaType: "brand-mark", use: "dormant" },
  { path: "src/assets/splash.png", mediaType: "decorative-artwork", use: "dormant" },
];

/** Look a media file up by repository path. */
export function mediaRecord(path: string): MediaRecord | undefined {
  return MEDIA_REGISTRY.find((r) => r.path === path);
}

/** Every file that must never be referenced by a public route. */
export function blockedMedia(): MediaRecord[] {
  return MEDIA_REGISTRY.filter((r) => r.use === "blocked");
}
