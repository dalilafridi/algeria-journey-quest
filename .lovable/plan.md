## Goal

Turn `/figures` from a bio list into a **connected cultural archive**: cinematic intro lines, "Why they matter today," theme pills, related-figures network, culture/region links, and a graceful audio-archive placeholder — without redesigning anything.

## Scope (no destructive changes)

- Keep all 104 figures, current visual identity, premium tones, and routing.
- All new fields are **optional**, so figures without curated meta degrade gracefully.
- Strictly additive UI sections; no removed sections.

---

## 1. Extend the `Figure` type — `src/data/figures.ts`

Add optional fields to `Figure` (and a small companion type):

```text
cinematicLine?: LocalizedString          // one poetic sentence
modernRelevance?: LocalizedString        // "Why they matter today"
themes?: FigureTheme[]                   // 2–4 tags
relatedFigureIds?: string[]              // 2–4 ids (curated network)
cultureLinks?: FigureCultureLink[]       // {kind, href, label}
audioArchive?: {                         // optional placeholder
  status: "planned" | "coming-soon";
  hint?: LocalizedString;                // e.g. "Future song archive"
}
```

`FigureTheme` is a string-literal union covering: `identity`, `resistance`, `exile`, `oral-memory`, `women-heritage`, `literature`, `music`, `language`, `amazigh`, `independence`, `education`, `diaspora`, `cinema`, `faith`, `philosophy`.

`FigureCultureLink.kind` ∈ `region | era | cuisine | cinema | words | ideas | moment | figure`, each resolving to an existing route via TanStack `Link`.

A label map (`FIGURE_THEMES`) provides FR/EN/AR labels + emoji per theme — single source of truth used by cards and detail page.

## 2. Curated marquee data — same file, append-only

Hand-author the new fields for ~30 highest-impact figures across eras (full list below). Leave the rest untouched; the UI hides empty sections automatically.

Marquee set (initial pass):
- Antiquity: Massinissa, Jugurtha, Juba II, Augustine
- Medieval/Islamic: Tariq ibn Ziyad, Ibn Khaldun, Ibn Tumart
- Resistance: Dihya, Emir Abdelkader, Lalla Fatma N'Soumer, El Mokrani, Bou Baghla
- War of Independence: Ben M'Hidi, Abane Ramdane, Krim Belkacem, Amirouche, Hassiba Ben Bouali, Djamila Bouhired, Zighoud Youcef
- Thought & letters: Ben Badis, Malek Bennabi, Frantz Fanon, Moufdi Zakaria, Kateb Yacine, Mouloud Feraoun, Mouloud Mammeri, Mohammed Dib, Assia Djebar
- Music & memory: Taos Amrouche, Jean Amrouche, Fadhma Aït Mansour, El Anka, Idir, Matoub, Aït Menguellet, Warda, Khaled, Rachid Taha
- Cinema: Lakhdar-Hamina, Merzak Allouache, Rachid Bouchareb, Yamina Bachir-Chouikh

For each: cinematicLine, modernRelevance, 2–4 themes, 2–4 relatedFigureIds, 1–3 cultureLinks. Audio placeholder only on music/oral-memory figures (Taos, Idir, Matoub, Aït Menguellet, El Anka, Warda, Khaled, Rachid Taha, Fadhma).

Related-figure choices are curated, not auto-generated, so they reflect real ideological/regional/family ties (Amrouche family thread, Ulema circle, FLN strategists, raï/Oran lineage, Kabyle song lineage, Casbah resistance, etc.).

## 3. Detail page — `src/routes/figures.$figureId.tsx`

Insert new sections **inside the existing card**, preserving order/spacing:

1. **Cinematic line** — italic serif-style line under the H1, before the era/region pills. Hidden if absent.
2. **Theme pills** — soft pill row next to era/region badges. Uses `FIGURE_THEMES` labels + emoji. Wraps cleanly on mobile.
3. **"Why they matter today"** — new `<Section>` placed right after "Why they matter" (so the historical → present arc reads naturally). Warm-accent left border to distinguish from the historical importance.
4. **Connected Voices** — replaces the current generic "exploreFigures" tail block when `relatedFigureIds` exist; falls back to the existing 8-figure cloud otherwise. Renders 2–4 curated chips with emoji + display name + a one-line "why related" subtitle derived from shared theme/region (computed at render).
5. **Cultural threads** — chip row linking to other app routes (cuisine, cinema, words, ideas, region, era, moments) using typed `<Link to=...>` from TanStack. Hidden if no `cultureLinks`.
6. **Listen to their voice** — subdued bordered card with a muted "Future audio archive" badge + optional `hint`. Only renders when `audioArchive` set. No player, no logic.

All new sections respect existing fade-in (`animate-float-up`) and mobile padding. No layout/columns changed.

## 4. Index cards — `src/routes/figures.index.tsx`

Tiny enhancements, no layout change:
- If `cinematicLine` set, show it as italic muted-foreground line under the era (line-clamp-2).
- If `themes` set, show up to 3 theme pills under the existing region/era badges (small variant from `FIGURE_THEMES`).

Existing region link, era link, and "Related figures" block remain.

## 5. Region pages — `src/routes/map.tsx`

Already lists key figures per region. No change needed beyond ensuring the new figure detail page is reachable (it is). Optional micro-polish: pass `themes` through if visible — defer unless trivial.

## 6. Mobile

- Pill rows already wrap (`flex-wrap`); verify on 360–402px.
- Cinematic line clamps to 3 lines on detail, 2 on index card.
- Connected Voices chips wrap; subtitle truncated.

## 7. Verification

- `bunx tsc --noEmit` — must stay clean.
- Spot-check `/figures`, `/figures/assia-djebar`, `/figures/rachid-taha`, `/figures/abane-ramdane`, and a non-curated figure (e.g. `/figures/syphax`) to confirm graceful degradation.

---

## Out of scope

- No new routes, no new top-level nav.
- No actual audio playback.
- No automated relation graph — curation only.
- No copy changes to existing `story` / `importance` / `fact` fields.

## Files touched

- `src/data/figures.ts` (type extension + curated meta)
- `src/routes/figures.$figureId.tsx` (6 new optional sections)
- `src/routes/figures.index.tsx` (cinematic line + theme pills on cards)
- Possibly `src/lib/i18n.ts` only if a couple of new `tu(...)` strings are added; otherwise inlined trilingual literals matching existing pattern.
