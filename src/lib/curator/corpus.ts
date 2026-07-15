/**
 * Museum corpus — the entire set of grounded facts the "Ask the Curator"
 * assistant is allowed to cite. Built lazily from the site's own trilingual
 * data files (figures, eras, regions, culture topics, cuisine, historical
 * events) and served to the model as English source cards with stable
 * citation ids and route hrefs.
 *
 * The model is forbidden to invent anything outside this corpus.
 */

import type { LocalizedString } from "@/lib/i18n";
import { eras } from "@/data/eras";
import { eraExtras } from "@/data/eraExtras";
import { figures, FIGURE_CATEGORIES } from "@/data/figures";
import { figureExtras } from "@/data/figureExtras";
import { mapRegions } from "@/data/mapRegions";
import { regionExtras } from "@/data/regionExtras";
import { CULTURE_TOPICS } from "@/data/cultureTopics";
import { cuisineRegions, cuisineSweets } from "@/data/cuisine";

export type CuratorSource = {
  /** Stable, human-readable id used as the citation token, e.g. `figure:jugurtha`. */
  id: string;
  /** High-level bucket for the model's citation phrasing. */
  kind: "figure" | "era" | "region" | "culture" | "cuisine" | "event";
  /** Display name of the exhibit (as it should appear in citations). */
  title: string;
  /** Route href back into the museum, when one exists. */
  href?: string;
  /** English source text — condensed but faithful to the exhibit copy. */
  body: string;
};

// ---------- helpers ----------

const en = (v: LocalizedString | undefined): string => {
  if (!v) return "";
  // LocalizedString is { en, fr, ar } in this project.
  const anyV = v as { en?: string } & Record<string, string>;
  return (anyV.en ?? "").trim();
};

const joinLines = (parts: (string | number | undefined | null | false)[]): string =>
  parts.filter((p): p is string => typeof p === "string" && p.trim().length > 0).join("\n");

const bullets = (items: string[]): string =>
  items
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => `- ${s}`)
    .join("\n");

// ---------- builders ----------

function buildEraSources(): CuratorSource[] {
  return eras.map((era) => {
    const extras = eraExtras[era.id];
    const facts = (era.facts ?? []).map(en).filter(Boolean);
    const notablePeople = (era.figures ?? []).map(
      (f) => `${en(f.name)} — ${en(f.note)}`,
    );
    const places = (era.places ?? []).map(
      (p) => `${en(p.name)} — ${en(p.note)}`,
    );
    const notes = (extras?.museumNotes ?? []).map(
      (n) => `${en(n.title)}: ${en(n.body)}`,
    );
    const body = joinLines([
      `Date range: ${era.dateRange}`,
      `Overview: ${en(era.summary)}`,
      extras?.whyItMatters && `Why it matters: ${en(extras.whyItMatters)}`,
      extras?.cinematicLine && `Cinematic line: "${en(extras.cinematicLine)}"`,
      notablePeople.length && `Notable people:\n${bullets(notablePeople)}`,
      places.length && `Key places:\n${bullets(places)}`,
      facts.length && `Key facts:\n${bullets(facts)}`,
      notes.length && `Curator notes:\n${bullets(notes)}`,
      extras?.memoryCard?.quote &&
        `Memory card: "${en(extras.memoryCard.quote)}"${
          extras.memoryCard.attribution ? ` — ${en(extras.memoryCard.attribution)}` : ""
        }`,
    ]);
    return {
      id: `era:${era.id}`,
      kind: "era",
      title: en(era.title),
      href: `/era/${era.id}`,
      body,
    };
  });
}

function buildFigureSources(): CuratorSource[] {
  const catLabel = new Map(FIGURE_CATEGORIES.map((c) => [c.id, en(c.label)]));
  return figures.map((f) => {
    const extras = figureExtras[f.id];
    const category = catLabel.get(f.category) ?? f.category;
    const story = en(f.story);
    const importance = en(f.importance);
    const fact = en(f.fact);
    const storyMode = (f.extended?.storyMode ?? []).map(en).filter(Boolean);
    const whatHappened = (f.extended?.whatHappened ?? []).map(en).filter(Boolean);
    const aftermath = (f.extended?.aftermath ?? []).map(en).filter(Boolean);
    const keyLesson = f.extended?.keyLesson ? en(f.extended.keyLesson) : "";
    const works = (extras?.keyPlacesAndWorks ?? []).map(
      (w) => `${en(w.label)}${w.note ? ` — ${en(w.note)}` : ""}`,
    );
    const body = joinLines([
      `Role: ${category}`,
      `Era: ${en(f.era)}`,
      `Region: ${en(f.regionLabel)}`,
      story && `Story: ${story}`,
      importance && `Significance: ${importance}`,
      fact && `Notable fact: ${fact}`,
      keyLesson && `Key lesson: ${keyLesson}`,
      whatHappened.length && `What happened:\n${bullets(whatHappened)}`,
      aftermath.length && `Aftermath:\n${bullets(aftermath)}`,
      storyMode.length && `Story mode:\n${bullets(storyMode)}`,
      extras?.didYouKnow && `Did you know: ${en(extras.didYouKnow)}`,
      works.length && `Key works & places:\n${bullets(works)}`,
    ]);
    return {
      id: `figure:${f.id}`,
      kind: "figure",
      title: en(f.displayName) || f.name,
      href: `/figures/${f.id}`,
      body,
    };
  });
}

function buildRegionSources(): CuratorSource[] {
  return mapRegions.map((r) => {
    const extras = regionExtras[r.id];
    const facts = (r.facts ?? []).map(en).filter(Boolean);
    const pillars = (extras?.culturePillars ?? []).map(
      (p) => `${en(p.label)}: ${en(p.body)}`,
    );
    const notes = (extras?.museumNotes ?? []).map(
      (n) => `${en(n.title)}: ${en(n.body)}`,
    );
    const body = joinLines([
      `Focus: ${en(r.focus)}`,
      `Overview: ${en(r.summary)}`,
      extras?.geography && `Geography: ${en(extras.geography)}`,
      extras?.historicalSignificance &&
        `Historical significance: ${en(extras.historicalSignificance)}`,
      extras?.culturalImportance &&
        `Cultural importance: ${en(extras.culturalImportance)}`,
      facts.length && `Key facts:\n${bullets(facts)}`,
      pillars.length && `Cultural pillars:\n${bullets(pillars)}`,
      notes.length && `Curator notes:\n${bullets(notes)}`,
    ]);
    return {
      id: `region:${r.id}`,
      kind: "region",
      title: en(r.name),
      href: `/region/${r.id}`,
      body,
    };
  });
}

function buildCultureSources(): CuratorSource[] {
  return CULTURE_TOPICS.map((c) => {
    const traditions = (c.traditions ?? []).map(
      (t) => `${en(t.title)}: ${en(t.body)}`,
    );
    const facts = (c.facts ?? []).map(en).filter(Boolean);
    const body = joinLines([
      `Tagline: ${en(c.tagline)}`,
      `Overview: ${en(c.intro)}`,
      c.significance && `Significance: ${en(c.significance)}`,
      c.historicalContext && `Historical context: ${en(c.historicalContext)}`,
      c.influence && `Influence: ${en(c.influence)}`,
      c.curatorNote && `Curator note: ${en(c.curatorNote)}`,
      traditions.length && `Living traditions:\n${bullets(traditions)}`,
      facts.length && `Key facts:\n${bullets(facts)}`,
    ]);
    return {
      id: `culture:${c.id}`,
      kind: "culture",
      title: en(c.title),
      href: `/culture/${c.id}`,
      body,
    };
  });
}

function buildCuisineSources(): CuratorSource[] {
  const regions: CuratorSource[] = cuisineRegions.map((r) => {
    const dishes = (r.dishes ?? []).map((d) => {
      const parts = [
        `${en(d.name)}: ${en(d.description)}`,
        d.whenEaten && `Eaten: ${en(d.whenEaten)}`,
        d.note && `Note: ${en(d.note)}`,
      ].filter(Boolean) as string[];
      return parts.join(" — ");
    });
    return {
      id: `cuisine:${r.id}`,
      kind: "cuisine",
      title: `${en(r.name)} cuisine`,
      href: `/cuisine`,
      body: joinLines([
        `Tagline: ${en(r.tagline)}`,
        dishes.length && `Dishes:\n${bullets(dishes)}`,
      ]),
    };
  });
  const sweets: CuratorSource = {
    id: "cuisine:sweets",
    kind: "cuisine",
    title: "Algerian sweets & pastries",
    href: "/cuisine",
    body: joinLines([
      "Traditional sweets across Algerian regions.",
      bullets(
        (cuisineSweets ?? []).map(
          (s) => `${en(s.name)}: ${en(s.description)}`,
        ),
      ),
    ]),
  };
  return [...regions, sweets];
}

/**
 * Historical events aren't a standalone table — they live inside eras. We
 * surface the strongest fact-per-era as a compact "event" source card so the
 * assistant can cite dated events (Soummam Congress, Black Spring, etc.)
 * without pulling the entire era into every answer.
 */
function buildEventSources(): CuratorSource[] {
  const out: CuratorSource[] = [];
  eras.forEach((era) => {
    (era.facts ?? []).forEach((f, i) => {
      const text = en(f);
      if (!text || text.length < 30) return;
      out.push({
        id: `event:${era.id}-${i}`,
        kind: "event",
        title: `Event during ${en(era.title)} (${era.dateRange})`,
        href: `/era/${era.id}`,
        body: text,
      });
    });
  });
  return out;
}

// ---------- entrypoint ----------

let cache: CuratorSource[] | null = null;

export function getCuratorCorpus(): CuratorSource[] {
  if (cache) return cache;
  cache = [
    ...buildEraSources(),
    ...buildFigureSources(),
    ...buildRegionSources(),
    ...buildCultureSources(),
    ...buildCuisineSources(),
    ...buildEventSources(),
  ].filter((s) => s.body.trim().length > 0);
  return cache;
}

/**
 * Render the whole corpus as a single grounded-sources block for the system
 * prompt. Each entry is preceded by a stable `[id]` tag so the model can cite
 * it verbatim.
 */
export function renderCorpusForPrompt(): string {
  const items = getCuratorCorpus();
  return items
    .map(
      (s) =>
        `## [${s.id}] ${s.title} (${s.kind}${s.href ? `, ${s.href}` : ""})\n${s.body}`,
    )
    .join("\n\n");
}
