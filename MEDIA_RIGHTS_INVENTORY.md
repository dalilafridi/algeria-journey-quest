# DZ Odyssey, Internal Image & Media Rights Inventory

**Status:** internal working document. Not published, not linked from any public page.
**Scope:** every image and media asset referenced by public visitor routes.
**Rule applied throughout:** absence of a copyright notice is never treated as evidence of a licence. Anything without documented provenance is recorded as *Unknown, requires review*.

---

## 1. Totals

| Measure | Count |
| --- | --- |
| Media asset files in the repository (`src/assets`, `public`) | 47 |
| Of which non-media (`robots.txt`) | 1 |
| **Total media assets** | **46** |
| Referenced by at least one public route | 39 |
| Present but unreferenced (dormant) | 7 |
| Remotely hosted (Lovable CDN pointer, `.asset.json`) | 2 |
| Hotlinked from third-party domains | 0 |

### Classification summary

| Classification | Count | Notes |
| --- | --- | --- |
| Generated specifically for DZ Odyssey, declared as illustrative in data | 9 | `illustrative: true` in `featuredExhibits.ts` / `museumHighlights.ts` |
| Generated specifically for DZ Odyssey, produced in-project, **not yet declared** | 33 | Origin traceable to in-project generation; no machine-readable generated flag |
| Project-owned (brand marks, first-party design work) | 2 | Favicon, brand icon set (owner confirmation still recommended) |
| Public domain | 0 | No asset carries public-domain evidence |
| Licensed | 0 | No licence document is held for any asset |
| Used with permission | 0 | No permission record is held for any asset |
| **Retained internally, blocked from public use** | **2** | Both photographic. Removed from every public route on 2026-08-04. |

No asset in the museum currently has a written licence, permission, or public-domain determination on file. The two photographic assets were the only ones whose subject matter made that gap a launch risk. Both have now been withdrawn from public display and replaced with original interpretive illustrations, so **no publicly used asset has unknown rights status**.

---

## 2. Blocked assets (retained internally, removed from public use)

### U-1 · `src/assets/fln-team-1958.jpg.asset.json`

| Field | Value |
| --- | --- |
| Storage | Remote, Lovable CDN pointer (`/__l5e/assets-v1/...`) |
| Public routes | **None.** Withdrawn from `/football`. |
| Replacement | `src/assets/fln-team-illustration.png`, an interpretive illustration created for DZ Odyssey, labelled as such in the vitrine caption. |
| Component | Formerly `MuseumVitrine` in `src/routes/football.index.tsx`. No component references the file. |
| Existing credit on page | Caption plaque: "FLN Team, 1958–1962" plus a descriptive line. **No photographer, no collection, no archive reference.** |
| Rights status | **Retained internally, blocked from public use pending documented rights.** |
| Risk class | Archival photograph of identifiable people, historical/press origin |
| Why flagged | A 1958 team photograph is almost certainly a third-party press or archival image. It is presented as the permanent hero artifact of the Hall of Algerian Football, at large size, with a museum frame that implies institutional provenance. |
| Needed before launch | Origin of the file, rights holder or collection, and either a licence, a permission, or a documented public-domain determination under the applicable jurisdiction. |

### U-2 · `src/assets/lesvertes-hero.jpg.asset.json`

| Field | Value |
| --- | --- |
| Storage | Remote, Lovable CDN pointer |
| Public routes | **None.** Withdrawn from `/football/lesvertes`, including the social preview image. |
| Replacement | `src/assets/lesvertes-illustration.png`, an interpretive illustration created for DZ Odyssey, labelled as such under the hero. |
| Component | Formerly the hero figure in `src/routes/football.lesvertes.tsx`. No component references the file. |
| Existing credit on page | Caption: "Les Vertes, a museum portrait of Algeria's women's national team." **No photographer, no agency, no date.** |
| Rights status | **Retained internally, blocked from public use pending documented rights.** |
| Risk class | Contemporary photograph of identifiable living athletes; likely sports-agency or federation origin |
| Why flagged | Contemporary sports photography is routinely agency-owned and rights-managed. It also depicts identifiable living people, which raises image-rights questions separate from copyright. Supplied to the project as an attachment with no accompanying source. |
| Needed before launch | Photographer or agency, date and event, licence terms, and confirmation that editorial museum use is covered. |

Both files are retained in the repository, unreferenced and unbundled, under the status "Retained internally, blocked from public use pending documented rights." They no longer block launch. They may return to public display only once a licence, permission, or documented public-domain determination is on file.

---

## 3. Generated imagery (in-project origin)

All of the following were produced for DZ Odyssey inside this project. None depicts a real photographed person or event, and none is presented as a documentary record.

### 3a. Declared illustrative (9)

`illustrative: true` is set on the exhibit records, and the UI surfaces that label.

| File | Routes | Record |
| --- | --- | --- |
| `exhibit-timgad.jpg` | `/`, `/map` | `featuredExhibits.ts`, `museumHighlights.ts` |
| `exhibit-tassili.jpg` | `/`, `/map` | `featuredExhibits.ts`, `museumHighlights.ts` |
| `exhibit-casbah.jpg` | `/`, `/map` | `featuredExhibits.ts`, `museumHighlights.ts` |
| `exhibit-djemila.jpg` | `/map` | `museumHighlights.ts` |
| `exhibit-tipasa.jpg` | `/map` | `museumHighlights.ts` |
| `exhibit-kabylie.jpg` | `/` | `featuredExhibits.ts` |
| `mzab-hero.jpg` | `/`, `/map`, `/mzab` | `featuredExhibits.ts`, `museumHighlights.ts`, `mzab.tsx` |
| `football-hero-vitrine.jpg` | `/`, `/football` | `featuredExhibits.ts`, `football.index.tsx` |
| `algeria-map.png` | `/map`, `/atlas`, moments immersive | `map.tsx`, `atlas.tsx`, `Immersive.tsx` |

### 3b. Produced in-project, no machine-readable generated flag (33)

These are not misrepresented anywhere, but the "is this generated" answer currently lives only in this document, not in the data layer.

| File | Public routes | Component / record |
| --- | --- | --- |
| `era-numidia.png`, `era-roman.png`, `era-islamic.png`, `era-ottoman.jpg`, `era-french.png`, `era-independence.png`, `era-earlynorthafrica.jpg` | `/timeline` | `timeline.tsx` |
| `era-numidia.jpg` | `/chronicle` | `chronicle.tsx` |
| `mzab-water.jpg`, `mzab-market.jpg`, `mzab-ksar-plan.jpg`, `mzab-house-diagram.jpg` | `/mzab` | `mzab.tsx` |
| `cuisine-hero.jpg` | `/cuisine` | `cuisine.tsx` |
| `hero-bg.png` | `/` | `index.tsx` |
| `emblems/region-kabylie.png`, `region-aures.png`, `region-algiers.png`, `region-constantine.png`, `region-sahara.png`, `region-oran-west.png` | `/`, `/map`, `/region/$regionId` | `RegionIcon.tsx` |
| `emblems/pillar-journey.png`, `pillar-regions.png`, `pillar-culture.png` | `/`, region pages | `PillarIcon.tsx` |
| `loading-wheel.png` | all routes (splash) | `SplashScreen.tsx` |
| `brand-icon.png` | all routes (header) | `Header.tsx` |
| `brand-cover.png` | social preview only | `src/lib/seo.ts` |
| `era-french.jpg`, `era-independence.jpg`, `era-islamic.jpg`, `era-roman.jpg`, `algeria-outline.png`, `brand-mark.png`, `brand-overview.png`, `splash.png` | **none, dormant** | unreferenced |

The two-line drawings `mzab-ksar-plan.jpg` and `mzab-house-diagram.jpg` are the most sensitive of this group: they read as scholarly architectural documents. They are interpretive reconstructions, not surveyed plans, and should carry that wording on the page.

---

## 4. Logos, crests, federation marks, flags, trademarks, event branding

Tracked separately because trademark exposure is independent of copyright.

| Item | Status |
| --- | --- |
| Club crests (JS Kabylie and any future club) | **No crest image is used.** `src/data/clubs/types.ts` uses `crestGlyph`, a text placeholder, explicitly commented as "never presented as archival crest". Club colours are stored as hex values only. |
| Federation marks (FAF, CAF, FIFA) | No mark files present. Institutions are referenced in prose and in the source registry only. |
| Event branding (World Cup, AFCON) | No competition logo files present. Competitions appear as text in `src/data/football.ts`. |
| National flag | No flag image file. Algerian colours appear as CSS accent bars only. |
| DZ Odyssey brand marks | `brand-icon.png`, `brand-mark.png`, `brand-cover.png`, `brand-overview.png`, `public/favicon.svg`. First-party. Owner should confirm the museum name and mark are free of third-party conflict before launch. |

**Result: zero third-party logo, crest, federation, or event-branding image files ship in the museum.** This was a deliberate architectural decision and should be preserved as additional club museums are added.

---

## 5. Hotlinking and remote hosting

- **Hotlinked third-party images: none.** A scan for `http(s)` image URLs in `src/` returns no results; every image is imported from `src/assets`.
- **Remotely hosted: 2**, both on Lovable's own CDN through `.asset.json` pointers (U-1, U-2). These are first-party hosting, not hotlinking, but the underlying rights question is unchanged.
- Fonts load from Google Fonts (`fonts.googleapis.com`, preconnect in `src/routes/__root.tsx`), which is a third-party network dependency but not a media rights issue.
- No audio or video files ship with the museum. The audio guide synthesises speech at request time and stores nothing.

---

## 6. Archival photographs and portraits requiring attribution

Only two photographic assets exist in the entire museum, U-1 and U-2, and both are unattributed. There are **no historical figure portraits**: figure pages render typographic and emblem treatments rather than photographs. `/football/lesvertes` already states in its player section that photograph credits are being sourced.

This is a favourable position. The rights surface is two files, not two hundred.

---

## 7. Items requiring the owner's documentation or decision

1. **U-1, FLN 1958 photograph.** Provide origin, rights holder and licence or permission, or approve replacement with a declared illustrative treatment.
2. **U-2, Les Vertes photograph.** Provide photographer or agency, licence terms and confirmation of editorial use, or approve replacement.
3. **Generated imagery disclosure.** Confirm the wording used publicly. This document proposes a single museum-wide statement rather than a per-image badge.
4. **Brand marks.** Confirm DZ Odyssey owns its name, wordmark and icon and that no clearance is outstanding.
5. **Dormant assets.** Eight unreferenced files remain in the repository. Confirm whether to keep or remove them; they were left untouched under this task's no-deletion constraint.
6. **Architectural drawings.** Confirm the M'Zab plan and house diagram may be described publicly as interpretive reconstructions.

---

## 8. Public disclosure boundary

The public `/credits` page publishes **only** what is verifiable without external documentation:

- that illustrative and reconstructed imagery was created for the museum,
- that no third-party club crest, federation mark or competition logo is used,
- how a rights holder can contact the museum.

It does not publish filenames, internal classifications, uncertainty, review notes, or anything about U-1 and U-2. It makes no public-domain, licence, or ownership claim about any asset for which no evidence is held.


---

## 9. Machine-readable media classification (added 2026-08-04)

Every media file is now classified once in `src/data/mediaRegistry.ts`, the single
source of truth. There is no second metadata system: the optional `mediaType`
field on `FeaturedExhibit` re-uses the same `MediaType` union exported by the
registry, and the existing `illustrative` flag remains the visitor-facing
display cue.

`MediaType` vocabulary:

| Value | Meaning |
| --- | --- |
| `decorative-artwork` | Ornamental artwork with no documentary claim |
| `interpretive-illustration` | Original artwork evoking a place, period, team or scene |
| `interpretive-reconstruction` | Original drawing reconstructing a structure or system, not a survey |
| `brand-mark` | First-party DZ Odyssey mark, emblem or identity asset |
| `documentary-media` | Real photograph or archival document with documented provenance |

`MediaUse` records publication state: `public`, `dormant`, or `blocked`.

- The 33 previously undeclared in-project assets now carry an explicit
  `mediaType`, alongside the 9 already declared illustrative.
- `mzab-ksar-plan.jpg` and `mzab-house-diagram.jpg` are classified
  `interpretive-reconstruction`. The public wording on `/mzab`, next to the
  drawings and in their collection plates, reads: "Interpretive reconstruction
  created for DZ Odyssey. Not a surveyed architectural drawing." It is
  translated into French and Arabic.
- The seven dormant files are retained, classified, and marked `use: "dormant"`.
  None is referenced by a public route.
- Registry entries are data only. No repetitive badge is rendered on decorative
  imagery; disclosure appears on exhibit heroes, the reconstructions, and the
  public Credits page.

### Public-route rights status

A repository-wide search for `fln-team-1958` and `lesvertes-hero` returns matches
only inside the two retained `.asset.json` pointer files and inside this internal
document. No route, component, metadata block, social image, or preload references
them, and neither file appears in the production build output.

**Zero publicly used assets have unknown rights status.**

## Flags (added for the About popup)

| Asset | Classification | Rights basis |
| --- | --- | --- |
| `src/assets/flags/algeria.svg` | `brand-mark`, `public` | Factual representation of the national flag of Algeria, drawn as a clean local SVG specifically for DZ Odyssey. Not hotlinked, no third-party or CDN source. |
| `src/assets/flags/amazigh-flag.png.asset.json` | `brand-mark`, `public` | Factual reproduction of the Amazigh flag, supplied by the project owner and stored as a local PNG asset. Not hotlinked, no third-party or CDN source. |

Both are simple factual reproductions of established public designs, used at
small size beneath the About popup title as cultural identification.

## Third-party club crests

| Asset | Classification | Rights basis |
| --- | --- | --- |
| `src/assets/jsk-crest.png.asset.json` | `club-crest-third-party`, `public` | Official JS Kabylie club crest, supplied by the project owner for editorial identification of the club in its museum wing. Not generated imagery and not a DZ Odyssey owned brand mark. Stored locally as an optimized PNG with transparency, never hotlinked. |

Trademark and usage clearance for the JS Kabylie crest may still require
confirmation with the club. The crest is used solely to identify the subject of
the exhibit. DZ Odyssey is not affiliated with, sponsored by, or endorsed by
JS Kabylie.
