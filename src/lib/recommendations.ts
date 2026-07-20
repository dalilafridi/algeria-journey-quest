import { eras, type Era } from "@/data/eras";
import { figures, type Figure } from "@/data/figures";
import { mapRegions, type MapRegion } from "@/data/mapRegions";
import { CULTURE_TOPICS, type CultureTopic } from "@/data/cultureTopics";
import { getPassport } from "@/lib/passport";
import type { LocalizedString } from "@/lib/i18n";

export type RecKind = "era" | "figure" | "region" | "culture";

export type Recommendation = {
  kind: RecKind;
  id: string;
  title: LocalizedString;
  subtitle: LocalizedString;
  emoji: string;
  to: string;
  reason: LocalizedString;
  score: number;
};

const reason = (en: string, fr: string, ar: string): LocalizedString => ({ en, fr, ar });

function eraToRec(e: Era, r: LocalizedString, score: number): Recommendation {
  return {
    kind: "era",
    id: e.id,
    title: e.title,
    subtitle: { en: e.dateRange, fr: e.dateRange, ar: e.dateRange },
    emoji: e.emoji,
    to: `/era/${e.id}`,
    reason: r,
    score,
  };
}

function figureToRec(f: Figure, r: LocalizedString, score: number): Recommendation {
  return {
    kind: "figure",
    id: f.id,
    title: f.displayName,
    subtitle: f.era,
    emoji: f.emoji,
    to: `/figures/${f.id}`,
    reason: r,
    score,
  };
}

function regionToRec(reg: MapRegion, r: LocalizedString, score: number): Recommendation {
  return {
    kind: "region",
    id: reg.id,
    title: reg.name,
    subtitle: reg.focus,
    emoji: reg.emoji,
    to: `/region/${reg.id}`,
    reason: r,
    score,
  };
}

function cultureToRec(c: CultureTopic, r: LocalizedString, score: number): Recommendation {
  return {
    kind: "culture",
    id: c.id,
    title: c.title,
    subtitle: c.tagline,
    emoji: c.emblem,
    to: `/culture/${c.id}`,
    reason: r,
    score,
  };
}

const R = {
  sameEra: reason("Same historical era", "Même ère historique", "من الحقبة نفسها"),
  sameRegion: reason("Same region", "Même région", "المنطقة نفسها"),
  relatedFigure: reason("Related figure", "Figure liée", "شخصية ذات صلة"),
  relatedRegion: reason("Related region", "Région liée", "منطقة ذات صلة"),
  relatedEra: reason("Related era", "Ère liée", "حقبة ذات صلة"),
  relatedCulture: reason("Related cultural exhibit", "Exposition culturelle liée", "معرض ثقافي ذو صلة"),
  sameCategory: reason("Similar theme", "Thème similaire", "موضوع مشابه"),
  alsoViewed: reason("Because you viewed a similar exhibit", "Car vous avez vu une exposition similaire", "لأنك زرت معرضًا مشابهًا"),
};

/**
 * Build 3 recommended exhibits for the current view.
 * Sourced from data relations, then personalized via passport visit history.
 */
export function getRecommendations(kind: RecKind, id: string, limit = 3, opts: { usePassport?: boolean } = {}): Recommendation[] {
  const usePassport = opts.usePassport !== false;
  const passport = usePassport ? getPassport() : { visits: { era: [], figure: [], region: [], culture: [] } } as ReturnType<typeof getPassport>;

  const visited = new Set<string>(
    [
      ...passport.visits.era.map((x) => `era:${x}`),
      ...passport.visits.figure.map((x) => `figure:${x}`),
      ...passport.visits.region.map((x) => `region:${x}`),
      ...passport.visits.culture.map((x) => `culture:${x}`),
    ],
  );

  // Determine user's favorite figure category (most-visited)
  const catCount: Record<string, number> = {};
  const regCount: Record<string, number> = {};
  for (const fid of passport.visits.figure) {
    const f = figures.find((x) => x.id === fid);
    if (!f) continue;
    catCount[f.category] = (catCount[f.category] ?? 0) + 1;
    regCount[f.region] = (regCount[f.region] ?? 0) + 1;
  }
  const topCategory = Object.entries(catCount).sort((a, b) => b[1] - a[1])[0]?.[0];
  const topRegion = Object.entries(regCount).sort((a, b) => b[1] - a[1])[0]?.[0];

  const pool: Recommendation[] = [];

  if (kind === "figure") {
    const source = figures.find((f) => f.id === id);
    if (!source) return [];
    for (const other of figures) {
      if (other.id === source.id) continue;
      let s = 0;
      let why = R.sameCategory;
      if (source.relatedEraId && other.relatedEraId === source.relatedEraId) {
        s += 5; why = R.sameEra;
      }
      if (other.region === source.region) {
        s += 3; if (s === 3) why = R.sameRegion;
      }
      if (other.category === source.category) {
        s += 2; if (s === 2) why = R.sameCategory;
      }
      if (s > 0) pool.push(figureToRec(other, why, s));
    }
    if (source.relatedEraId) {
      const era = eras.find((e) => e.id === source.relatedEraId);
      if (era) pool.push(eraToRec(era, R.sameEra, 6));
    }
    const reg = mapRegions.find((r) => r.id === source.region);
    if (reg) pool.push(regionToRec(reg, R.sameRegion, 5));
    for (const c of CULTURE_TOPICS) {
      if (c.figureIds.includes(source.id)) pool.push(cultureToRec(c, R.relatedCulture, 4));
    }
  }

  if (kind === "era") {
    const source = eras.find((e) => e.id === id);
    if (!source) return [];
    for (const f of figures) {
      if (f.relatedEraId === source.id) pool.push(figureToRec(f, R.sameEra, 5));
    }
    for (const reg of mapRegions) {
      if (reg.eraId === source.id) pool.push(regionToRec(reg, R.relatedEra, 5));
    }
    for (const c of CULTURE_TOPICS) {
      if (c.eraIds.includes(source.id)) pool.push(cultureToRec(c, R.relatedEra, 4));
    }
    // adjacent eras
    const idx = eras.findIndex((e) => e.id === source.id);
    if (idx > 0) pool.push(eraToRec(eras[idx - 1], R.relatedEra, 3));
    if (idx >= 0 && idx < eras.length - 1) pool.push(eraToRec(eras[idx + 1], R.relatedEra, 3));
  }

  if (kind === "region") {
    const source = mapRegions.find((r) => r.id === id);
    if (!source) return [];
    for (const fid of source.figureIds) {
      const f = figures.find((x) => x.id === fid);
      if (f) pool.push(figureToRec(f, R.relatedFigure, 5));
    }
    if (source.eraId) {
      const era = eras.find((e) => e.id === source.eraId);
      if (era) pool.push(eraToRec(era, R.relatedEra, 5));
    }
    for (const c of CULTURE_TOPICS) {
      if (c.regionIds.includes(source.id)) pool.push(cultureToRec(c, R.relatedCulture, 4));
    }
    for (const reg of mapRegions) {
      if (reg.id === source.id) continue;
      pool.push(regionToRec(reg, R.relatedRegion, 1));
    }
  }

  if (kind === "culture") {
    const source = CULTURE_TOPICS.find((c) => c.id === id);
    if (!source) return [];
    for (const rid of source.regionIds) {
      const reg = mapRegions.find((x) => x.id === rid);
      if (reg) pool.push(regionToRec(reg, R.relatedRegion, 4));
    }
    for (const eid of source.eraIds) {
      const era = eras.find((x) => x.id === eid);
      if (era) pool.push(eraToRec(era, R.relatedEra, 4));
    }
    for (const fid of source.figureIds) {
      const f = figures.find((x) => x.id === fid);
      if (f) pool.push(figureToRec(f, R.relatedFigure, 5));
    }
    for (const c of CULTURE_TOPICS) {
      if (c.id === source.id) continue;
      const overlap =
        c.regionIds.filter((r) => source.regionIds.includes(r)).length +
        c.eraIds.filter((e) => source.eraIds.includes(e)).length;
      if (overlap > 0) pool.push(cultureToRec(c, R.relatedCulture, 2 + overlap));
    }
  }

  // Personalization: prefer unvisited; boost matching category/region
  const dedup = new Map<string, Recommendation>();
  for (const r of pool) {
    const key = `${r.kind}:${r.id}`;
    if (key === `${kind}:${id}`) continue;
    let bonus = 0;
    if (visited.has(key)) bonus -= 3;
    if (r.kind === "figure") {
      const fig = figures.find((f) => f.id === r.id);
      if (fig && topCategory && fig.category === topCategory) bonus += 1;
      if (fig && topRegion && fig.region === topRegion) bonus += 1;
    }
    if (r.kind === "region" && topRegion && r.id === topRegion) bonus += 1;
    const scored = { ...r, score: r.score + bonus };
    const prev = dedup.get(key);
    if (!prev || scored.score > prev.score) dedup.set(key, scored);
  }

  return Array.from(dedup.values())
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
