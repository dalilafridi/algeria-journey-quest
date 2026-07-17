/**
 * Studio taxonomies — the ONLY IDs a figure draft relationship may reference.
 *
 * All IDs come from the typed museum inventory (eras, mapRegions, figures,
 * FigureCategory). Free-text IDs are rejected server-side by the database
 * (relationship RPC validates), and client-side by these Zod refinements
 * for immediate feedback.
 *
 * Studio-only import — never enters the public visitor bundle.
 */
import { eras } from "@/data/eras";
import { figures } from "@/data/figures";
import { mapRegions } from "@/data/mapRegions";
import type { LocalizedString } from "@/lib/i18n";

export type RelationKind = "era" | "region" | "theme" | "related_figure";

export interface TaxonomyOption {
  id: string;
  label: string;
}

const en = (v: LocalizedString | string | undefined): string =>
  !v ? "" : typeof v === "string" ? v : (v.en ?? "");

// FigureCategory enum from src/data/figures.ts — the museum's thematic taxonomy.
export const THEME_IDS = [
  "ancient", "roman", "early-islamic", "ottoman",
  "early-resistance", "colonial-resistance", "war-of-independence",
  "post-independence", "intellectuals-culture", "cultural-identity",
  "cinema-film",
] as const;
export type ThemeId = (typeof THEME_IDS)[number];

const THEME_LABELS: Record<ThemeId, string> = {
  ancient: "Ancient (pre-Roman)",
  roman: "Roman period",
  "early-islamic": "Early Islamic",
  ottoman: "Ottoman regency",
  "early-resistance": "Early resistance",
  "colonial-resistance": "Colonial-era resistance",
  "war-of-independence": "War of Independence",
  "post-independence": "Post-independence",
  "intellectuals-culture": "Intellectuals & culture",
  "cultural-identity": "Cultural identity",
  "cinema-film": "Cinema & film",
};

export function eraOptions(): TaxonomyOption[] {
  return eras.map((e) => ({ id: e.id, label: en(e.title) || e.id }));
}
export function regionOptions(): TaxonomyOption[] {
  return mapRegions.map((r) => ({ id: r.id, label: en(r.name) || r.id }));
}
export function themeOptions(): TaxonomyOption[] {
  return THEME_IDS.map((id) => ({ id, label: THEME_LABELS[id] }));
}
export function figureOptions(): TaxonomyOption[] {
  return figures
    .map((f) => ({ id: f.id, label: en(f.displayName) || f.name }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

export const ERA_IDS = new Set(eras.map((e) => e.id));
export const REGION_IDS = new Set(mapRegions.map((r) => r.id));
export const FIGURE_IDS = new Set(figures.map((f) => f.id));
export const THEME_ID_SET = new Set<string>(THEME_IDS);

export function isValidTaxonomyId(kind: RelationKind, id: string): boolean {
  switch (kind) {
    case "era": return ERA_IDS.has(id);
    case "region": return REGION_IDS.has(id);
    case "theme": return THEME_ID_SET.has(id);
    case "related_figure": return FIGURE_IDS.has(id);
  }
}

export function labelFor(kind: RelationKind, id: string): string | null {
  switch (kind) {
    case "era": return eras.find((e) => e.id === id) ? en(eras.find((e) => e.id === id)!.title) || id : null;
    case "region": return mapRegions.find((r) => r.id === id) ? en(mapRegions.find((r) => r.id === id)!.name) || id : null;
    case "theme": return THEME_ID_SET.has(id) ? THEME_LABELS[id as ThemeId] : null;
    case "related_figure": {
      const f = figures.find((x) => x.id === id);
      return f ? (en(f.displayName) || f.name) : null;
    }
  }
}

export const RELATION_KIND_LABEL: Record<RelationKind, string> = {
  era: "Era",
  region: "Region",
  theme: "Theme",
  related_figure: "Related figure",
};
