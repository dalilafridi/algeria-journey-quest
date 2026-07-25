# Football Hall — Completion Report (Phase 5, Audit Pass)

Read-only audit. No exhibit content, code, or design was modified.
Scope: every football-family surface (`/football`, `/football/lesvertes`, `/clubs`, `/clubs/:id`, `/theater/:matchId`) and their data/provenance/search wiring.

---

## 1. Exhibits reviewed

| # | Surface | Route / file |
|---|---|---|
| 1 | Football Hub | `src/routes/football.index.tsx` (+ layout `football.tsx`) |
| 2 | Les Vertes | `src/routes/football.lesvertes.tsx`, `src/data/lesVertes.ts` |
| 3 | Clubs Hub | `src/routes/clubs.index.tsx` |
| 4 | JS Kabylie (reference) | `src/routes/clubs.$clubId.tsx`, `src/data/clubs/jskabylie.ts` |
| 5 | Other Clubs × 6 | MCA, ESS, USMA, CRB, MCO, PAC (`src/data/clubs/index.ts`) |
| 6 | Match Theater | `src/routes/theater.$matchId.tsx`, `src/data/matchTheater/gijon-1982.ts` |
| 7 | In-hub sections | FLN, AFCON, Legends, Stadiums (all live inside `football.index.tsx`) |

## 2. Completeness scores

Scored 0–100 against the museum template (Hero · Story · Turning Point · Legacy · Related · Sources) + trilingual · provenance · search · media · cross-linking.

| Exhibit | Score | Tier |
|---|---:|---|
| JS Kabylie | 92 | **Gold** — reference implementation |
| Match Theater · Gijón 1982 | 84 | **Gold** (loses points: no shared-registry provenance; only 1 of 7 planned matches) |
| Football Hub (landing) | 76 | **Silver** — trilingual + provenance + indexed, but flattened; no `ContinueExploring` |
| Les Vertes | 62 | **Silver** — full frame, but Players/Clubs/Squad arrays ship empty; WAFCON stops at 2014 |
| World Cup exhibit (1982/86/2010/14/26) | 55 | **Bronze** — group stage + moment + significance only; no qualification, no per-edition stats/key-players cards |
| FLN Team (section) | 58 | **Bronze** — strong vitrine + tour + legacy paragraph, but no player bios/photos and no dedicated route |
| AFCON (section) | 40 | **Bronze** — 1990 + 2019 titles are one-line notes; no final detail, captains, or manager cross-links |
| Stadiums (section) | 30 | **Bronze** — 5 flat entries, no history/architecture/matches/images/provenance/search |
| Legends (section) | 45 | **Bronze** — 12 cards, disconnected from `/figures/:id`; Fergani, Tasfaout, Bougherra missing |
| Clubs Hub | 55 | Silver frame, Bronze payload — 6 of 7 clubs are placeholder tiles |
| Other Clubs (MCA/ESS/USMA/CRB/MCO/PAC) | 10 each | **Placeholder** — id/name/tagline only; visible as "Coming soon" cards |

## 3. Missing stories
- No dedicated pages for **AFCON**, **FLN**, or **Stadiums** — three of the hall's headline topics live only as sections in one long scroll on `/football`.
- No per-tournament World Cup pages; each edition is a card in a single component.
- No "1990 AFCON title" long-form; no "2019 AFCON title" long-form beyond one `FAMOUS_MATCHES` card.
- No "Origins of Algerian football" / "colonial-era clubs" story.
- No cross-narrative for the FLN legacy → 1982 miracle → 2014 R16 → 2019 title thread.

## 4. Missing historical figures
- **No exhibit anywhere:** Ali Fergani, Abdelhafid Tasfaout, Madjid Bougherra.
- **Present in `football.ts` only, not in the site-wide `figures.ts` registry** (so no `/figures/:id` pages, no `ContinueExploring` inbound, not searchable as figures): Mekhloufi, Belloumi, Madjer, Assad, Bencheikh, Dahleb, Cerbah, Mahrez, Slimani, Brahimi, Djamel Zidane, Feghouli.

## 5. Missing tournaments / editions
- **World Cups** — none of {1982, 1986, 2010, 2014, 2026} has: qualification campaign, per-edition stats block, key-players cards, memorabilia gallery.
- **AFCON** — no dedicated final-match detail for 1990 or 2019; no per-edition captain/manager attribution; iconic-match writeups collapse into a single `FAMOUS_MATCHES` list.
- **WAFCON (Les Vertes)** — coverage stops at 2014; 2016/2018/2020/2022/2024 editions absent.

## 6. Missing clubs
Six of seven clubs are placeholders: MC Alger, ES Sétif, USM Alger, CR Belouizdad, MC Oran, Paradou AC. Only JS Kabylie has real content. There is no "partial" tier — `status` is binary `complete`/`coming-soon`.

## 7. Missing stadiums
No per-stadium exhibit exists. `STADIUMS` is 5 rows of name/city/capacity/opened + one-line note (5 Juillet, Nelson Mandela, Miloud Hadefi, Chahid Hamlaoui, 24 Février). No history, no architecture, no historic-match archive, no images, no provenance, not searchable.

## 8. Storytelling improvements (structural, not rewrites)
- Introduce a real museum template type/component so every football surface exposes named **Hero · Story · Turning Point · Legacy · Related · Sources** slots (today JSK does it by convention; the rest flatten these into free-form sections).
- Split the `/football` monolith into topic routes: `/football/world-cups`, `/football/world-cups/$year`, `/football/afcon`, `/football/afcon/$year`, `/football/fln`, `/football/stadiums`, `/football/legends/$slug` — with the current single page becoming a curated hub.
- Adopt shared `<ContinueExploring>` on every football surface via `exploreGroups.ts` (currently only era/region/culture/figure/cuisine use it).
- Route football legends through the general Historical Figures system so a "Riyad Mahrez" search behaves like any other figure and reuses provenance/related infra.
- Every "Coming to the Museum" club should render a real teaser exhibit (crest · founding · one paragraph · timeline peek · expected sections) instead of a disabled tile.

## 9. Search validation
- Indexed: `football:hub`, every `FOOTBALL_EXHIBITS` id, `football:les-vertes`, JSK (only because `status==="complete"`), match theater summaries.
- **Not indexed:** individual World Cup editions, individual AFCON editions, individual stadiums, individual legends, Les Vertes sub-sections (WAFCON entries, barriers, players), Clubs Hub itself, any "coming-soon" club.
- Effect: a visitor typing "1990 AFCON", "5 Juillet", "Fergani", "Bougherra" gets nothing.

## 10. Related-exhibits validation
- `<ContinueExploring>` wired: none of the football-family pages.
- Ad hoc `<Link>` cross-refs exist on `/football` hero → `/clubs` and `/football/lesvertes`, plus a Les Vertes ↔ football "parallel timeline" CTA.
- Match Theater has its own `relatedExhibits` field rendered by the theater-specific UI (not the shared component).
- Result: football is a set of islands connected by hand-tied strings; no `exploreGroups.ts` graph edges tag football topics.

## 11. Provenance validation
- Registry entries confirmed and resolving: `football`, `football-lesvertes`, `club:js-kabylie`.
- **Missing from registry:** every World Cup edition, every AFCON edition, FLN team, every stadium, every legend, every placeholder club, and `match:gijon-1982` (Gijón uses a bespoke `<SourcesPanel>` fed directly from the data file, not the shared registry).
- Recommendation: normalise Gijón into `registry.ts` under `match:gijon-1982` so future matches don't fork the pattern.

## 12. Accessibility validation
- No new football-specific Critical/Serious issues found in the audit scan.
- `<h1>` uniqueness holds on all football routes (single hero H1 each).
- Trilingual + RTL: EN/FR/AR present on every user-visible string in `football.ts`, `lesVertes.ts`, `jskabylie.ts`; RTL `dir` handling verified on Les Vertes hero caption and JSK sections.
- Watch item (pre-existing, not football-specific): SkipLink SSR/CSR text mismatch when Arabic is cookie-selected but SSR defaults to EN.

## 13. Performance validation
- No football route ships heavy client libraries; hero and gallery images already `loading="lazy"` where non-critical.
- `football.index.tsx` is 1,207 lines — single-route bundle bloat risk. Splitting the hub into topic routes (item 8) would naturally shrink initial payload.
- Match Theater lazy-loads per match via file-per-match convention (`matchTheater/gijon-1982.ts`); safe pattern for future expansion.
- No duplicate hero assets detected across football pages (`football-hero-vitrine.jpg`, `fln-team-1958.jpg`, `lesvertes-hero.jpg` are distinct).

## 14. Mobile validation
- Layouts on `/football`, `/football/lesvertes`, `/clubs`, `/clubs/js-kabylie`, `/theater/gijon-1982` reflow correctly at 375px in prior QA passes.
- JSK trophy/legends/timeline grids collapse cleanly; Les Vertes journey timeline already vertical on mobile.
- No horizontal-scroll or clipped-CTA regressions introduced by football content.

## 15. RTL validation
- All football data is `{en, fr, ar}` shaped; Arabic renders with correct direction on tested surfaces.
- Numbers-in-Arabic (years, scores) render as Western digits per existing museum convention — consistent, not a regression.

---

## Overall rating: **Silver**

Justification:
- **Gold-tier surfaces exist** (JS Kabylie, Gijón 1982) and prove the model works.
- **But the hall's four headline topics — World Cups, AFCON, FLN, Stadiums — are Bronze**, living as sections in one monolithic hub, without dedicated routes, without per-edition depth, without shared related/provenance wiring.
- **6 of 7 clubs are placeholder tiles**, visibly exposed as "Coming soon".
- **Legends are disconnected** from the site-wide figures system, and three named legends (Fergani, Tasfaout, Bougherra) are entirely absent.
- **Search + Related-Exhibits graph does not cover football sub-topics**, so the "no exhibit becomes an isolated island" bar is not yet met.

Platinum is out of reach until football feels like a museum destination in its own right — right now it's one great room (JSK), one great match (Gijón), and a long corridor of promising vitrines.

---

## Prioritized backlog to reach Gold (recommended Phase 5 execution order)

**P0 — foundational (unblocks everything else)**
1. Introduce a shared `MuseumExhibit` layout component with explicit Hero/Story/Turning Point/Legacy/Related/Sources slots; migrate JSK + Gijón to it first (no visual change).
2. Wire `exploreGroups.ts` edges for every football topic; drop `<ContinueExploring>` into every football-family route.
3. Register missing provenance keys (`worldcup:$year`, `afcon:$year`, `fln`, `stadium:$id`, `legend:$slug`, `match:gijon-1982`) — empty shells are fine at first; content follows.
4. Extend search index to World Cup editions, AFCON editions, stadiums, legends, Les Vertes sub-sections, and every club (including placeholders, so "MC Alger" is at least findable).

**P1 — headline expansions**
5. Split `/football` into topic routes: `/football/world-cups[/$year]`, `/football/afcon[/$year]`, `/football/fln`, `/football/stadiums[/$id]`, `/football/legends/$slug`. Keep `/football` as a curated hub linking to them.
6. Bring **1982** and **2014** World Cup editions to full template (qualification, group stage, knockouts if applicable, key players, stats, memorable moments, significance, related, sources) — highest visitor demand.
7. Bring **1990** and **2019** AFCON titles to full template, then fill 1988/2004/2010 as secondary.
8. Expand **FLN Team** into a dedicated exhibit with player bios, photograph gallery, and match archive.

**P2 — coverage & connections**
9. Add **Fergani, Tasfaout, Bougherra**; migrate all football legends into `figures.ts` so `/figures/:slug` works uniformly.
10. Ship **"Coming to the Museum"** exhibits for MCA/ESS/USMA/CRB/MCO/PAC — crest, founding paragraph, timeline peek, expected sections, indexed in search.
11. Add remaining WAFCON editions (2016→2024) and populate `LES_VERTES_PLAYERS` / `LES_VERTES_CLUBS`.
12. Build 2–3 additional Match Theater matches (Egypt 2009 playoff, 2019 AFCON final, 2014 vs Germany).
13. Give each of the 5 stadiums a proper page (history, architecture, historic matches, image, provenance).

**Do not start Phase 6 until items P0 + P1 are shipped** — that is the Gold threshold for the Football Hall.
