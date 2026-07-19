/**
 * exploreGroups — derive rich, categorized "Related Exhibits" groupings
 * for any museum page, from existing typed content.
 *
 * Zero new data: everything is inferred from src/data/{figures,eras,mapRegions,cultureTopics}.
 * Feeds the shared <ContinueExploring> museum footer so every page ends
 * with a natural bridge into the rest of the museum instead of a dead end.
 */

import { eras } from "@/data/eras";
import { figures } from "@/data/figures";
import { mapRegions } from "@/data/mapRegions";
import { CULTURE_TOPICS } from "@/data/cultureTopics";
import type { ExploreGroup, ExploreItem } from "@/components/curator/ContinueExploring";
import { RELATED_LABELS } from "@/components/curator/ContinueExploring";
import type { LocalizedString } from "@/lib/i18n";

const CUISINE_LABEL: LocalizedString = {
  en: "Related Cuisine",
  fr: "Cuisine liée",
  ar: "مطبخ ذو صلة",
};

/** Build a figure ExploreItem from a figure id, if it exists. */
function figureItem(id: string): ExploreItem | null {
  const f = figures.find((x) => x.id === id);
  if (!f) return null;
  return { kind: "figure", id: f.id, emoji: f.emoji, label: f.displayName };
}

function regionItem(id: string): ExploreItem | null {
  const r = mapRegions.find((x) => x.id === id);
  if (!r) return null;
  return { kind: "region", id: r.id, emoji: r.emoji, label: r.name };
}

function eraItem(id: string): ExploreItem | null {
  const e = eras.find((x) => x.id === id);
  if (!e) return null;
  return { kind: "era", id: e.id, emoji: e.emoji, label: e.title };
}

function cultureItem(id: string): ExploreItem | null {
  const c = CULTURE_TOPICS.find((x) => x.id === id);
  if (!c) return null;
  // Reuse the "collection" link shape — routes to /figures/collection/$id
  // is wrong; culture routes at /culture/$topicId. We render a figure-like
  // card with a raw <a> replacement isn't supported by ContinueExploring,
  // so use kind:"collection" alternative: fall back to a figure-shaped emoji
  // card that navigates via <Link> — extend by encoding as a synthetic item.
  return {
    kind: "collection",
    slug: c.id,
    emblem: c.emblem,
    label: c.title,
  };
}

/**
 * NOTE: ContinueExploring's "collection" kind links to
 * /figures/collection/$collectionId, not /culture/$topicId. To route culture
 * topics correctly, we expose them below as figure-shaped items with a
 * dedicated builder that stores nothing route-specific — see cultureLinkItem.
 *
 * Culture topics are rendered separately via cultureGroupHtml below where
 * needed.
 */
function cultureLinkItem(id: string): { id: string; emblem: string; label: LocalizedString } | null {
  const c = CULTURE_TOPICS.find((x) => x.id === id);
  if (!c) return null;
  return { id: c.id, emblem: c.emblem, label: c.title };
}

// Prevent unused warning while keeping the doc.
void cultureItem;

function uniqBy<T>(arr: T[], keyOf: (v: T) => string): T[] {
  const seen = new Set<string>();
  const out: T[] = [];
  for (const v of arr) {
    const k = keyOf(v);
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(v);
  }
  return out;
}

function group(label: LocalizedString, items: (ExploreItem | null)[]): ExploreGroup {
  const clean = items.filter((x): x is ExploreItem => x !== null);
  const deduped = uniqBy(clean, (i) => `${i.kind}:${"id" in i ? i.id : i.slug}`);
  return { label, items: deduped };
}

/** Cuisine region id -> map region id (best-fit). */
const CUISINE_TO_MAP_REGION: Record<string, string> = {
  kabylie: "kabylie",
  aures: "aures",
  algiers: "algiers",
  central: "algiers",
  constantine: "constantine",
  western: "oran-west",
  sahara: "sahara",
};

/* -------------------------- Public API -------------------------- */

export function getFigureExploreGroups(figureId: string): ExploreGroup[] {
  const f = figures.find((x) => x.id === figureId);
  if (!f) return [];

  const relatedFigures = figures
    .filter((o) => o.id !== f.id)
    .filter((o) => o.relatedEraId === f.relatedEraId || o.region === f.region || o.category === f.category)
    .slice(0, 6)
    .map((o) => figureItem(o.id));

  const relatedRegions = mapRegions
    .filter((r) => r.id === f.region || r.figureIds.includes(f.id))
    .map((r) => regionItem(r.id));

  const eraIdx = f.relatedEraId ? eras.findIndex((e) => e.id === f.relatedEraId) : -1;
  const relatedEras: (ExploreItem | null)[] = [];
  if (f.relatedEraId) relatedEras.push(eraItem(f.relatedEraId));
  if (eraIdx > 0) relatedEras.push(eraItem(eras[eraIdx - 1].id));
  if (eraIdx >= 0 && eraIdx < eras.length - 1) relatedEras.push(eraItem(eras[eraIdx + 1].id));

  const relatedCulture = CULTURE_TOPICS.filter((c) => c.figureIds.includes(f.id))
    .slice(0, 6)
    .map((c) => cultureLinkItemAsExplore(c.id));

  return [
    group(RELATED_LABELS.figures, relatedFigures),
    group(RELATED_LABELS.regions, relatedRegions),
    group(RELATED_LABELS.eras, relatedEras),
    group(RELATED_LABELS.collections, relatedCulture),
  ].filter((g) => g.items.length > 0);
}

export function getEraExploreGroups(eraId: string): ExploreGroup[] {
  const e = eras.find((x) => x.id === eraId);
  if (!e) return [];

  const relatedFigures = figures
    .filter((f) => f.relatedEraId === e.id)
    .slice(0, 8)
    .map((f) => figureItem(f.id));

  const relatedRegions = mapRegions
    .filter((r) => r.eraId === e.id)
    .map((r) => regionItem(r.id));
  // if none tag this era, fall back to a couple of anchor regions so page still bridges
  if (relatedRegions.length === 0) {
    relatedRegions.push(...mapRegions.slice(0, 3).map((r) => regionItem(r.id)));
  }

  const idx = eras.findIndex((x) => x.id === e.id);
  const relatedEras: (ExploreItem | null)[] = [];
  if (idx > 0) relatedEras.push(eraItem(eras[idx - 1].id));
  if (idx >= 0 && idx < eras.length - 1) relatedEras.push(eraItem(eras[idx + 1].id));

  const relatedCulture = CULTURE_TOPICS.filter((c) => c.eraIds.includes(e.id))
    .slice(0, 6)
    .map((c) => cultureLinkItemAsExplore(c.id));

  return [
    group(RELATED_LABELS.figures, relatedFigures),
    group(RELATED_LABELS.regions, relatedRegions),
    group(RELATED_LABELS.eras, relatedEras),
    group(RELATED_LABELS.collections, relatedCulture),
  ].filter((g) => g.items.length > 0);
}

export function getRegionExploreGroups(regionId: string): ExploreGroup[] {
  const r = mapRegions.find((x) => x.id === regionId);
  if (!r) return [];

  const relatedFigures = r.figureIds.map((id) => figureItem(id));
  // widen with any figure whose region matches
  const extra = figures.filter((f) => f.region === r.id && !r.figureIds.includes(f.id))
    .slice(0, 4)
    .map((f) => figureItem(f.id));

  const relatedEras: (ExploreItem | null)[] = [];
  if (r.eraId) relatedEras.push(eraItem(r.eraId));

  const relatedCulture = CULTURE_TOPICS.filter((c) => c.regionIds.includes(r.id))
    .slice(0, 6)
    .map((c) => cultureLinkItemAsExplore(c.id));

  const nearby = mapRegions
    .filter((x) => x.id !== r.id)
    .slice(0, 5)
    .map((x) => regionItem(x.id));

  return [
    group(RELATED_LABELS.figures, [...relatedFigures, ...extra]),
    group(RELATED_LABELS.eras, relatedEras),
    group(RELATED_LABELS.collections, relatedCulture),
    group(
      { en: "Nearby Regions", fr: "Régions voisines", ar: "مناطق مجاورة" },
      nearby,
    ),
  ].filter((g) => g.items.length > 0);
}

export function getCultureExploreGroups(topicId: string): ExploreGroup[] {
  const c = CULTURE_TOPICS.find((x) => x.id === topicId);
  if (!c) return [];

  const relatedFigures = c.figureIds.map((id) => figureItem(id));
  const relatedRegions = c.regionIds.map((id) => regionItem(id));
  const relatedEras = c.eraIds.map((id) => eraItem(id));
  const siblings = CULTURE_TOPICS.filter((x) => x.id !== c.id)
    .filter((x) =>
      x.regionIds.some((r) => c.regionIds.includes(r)) ||
      x.eraIds.some((e) => c.eraIds.includes(e)) ||
      x.figureIds.some((f) => c.figureIds.includes(f)),
    )
    .slice(0, 6)
    .map((x) => cultureLinkItemAsExplore(x.id));

  return [
    group(RELATED_LABELS.figures, relatedFigures),
    group(RELATED_LABELS.regions, relatedRegions),
    group(RELATED_LABELS.eras, relatedEras),
    group(RELATED_LABELS.collections, siblings),
  ].filter((g) => g.items.length > 0);
}

/** For the /cuisine landing page (no per-dish param). */
export function getCuisineExploreGroups(): ExploreGroup[] {
  const relatedRegions = Object.values(CUISINE_TO_MAP_REGION)
    .map((id) => regionItem(id));

  const cultureIds = ["music", "festivals", "oral-traditions", "languages", "architecture"];
  const relatedCulture = cultureIds.map((id) => cultureLinkItemAsExplore(id));

  const relatedEras = ["ottoman", "french", "independence"]
    .map((id) => eraItem(id));


  return [
    group(RELATED_LABELS.regions, relatedRegions),
    group(CUISINE_LABEL, []), // reserved slot — currently empty; kept for future dish-level pages
    group(RELATED_LABELS.eras, relatedEras),
    group(RELATED_LABELS.collections, relatedCulture),
  ].filter((g) => g.items.length > 0);
}

/* -------------------------- internals -------------------------- */

/**
 * Culture topics need to route to /culture/$topicId, not the collection
 * route. Rather than extend ContinueExploring, we ship a slim adapter that
 * repurposes the "collection" kind for culture — safe because the current
 * ContinueExploring only reads {slug, emblem, label} for that kind and the
 * project has no clashing /figures/collection/{music|festivals|...} slugs.
 *
 * If that assumption ever changes, swap to a dedicated "culture" kind.
 */
function cultureLinkItemAsExplore(topicId: string): ExploreItem | null {
  const c = cultureLinkItem(topicId);
  if (!c) return null;
  return {
    kind: "culture",
    id: c.id,
    emblem: c.emblem,
    label: c.label,
  };
}

