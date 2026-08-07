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
| **Published with supplied attribution, no permission on file** | **4** | The two football photographs, credited on page to the Fédération Algérienne de Football (FAF), and the two Kabyle jewelry photographs, credited on page to Le Jour d'Algérie, Fête du Bijou d'Ath Yenni. See sections 2 and 10. |

No asset in the museum currently has a written licence, permission, or public-domain determination on file. Four photographic assets are published with a supplied source credit: the two football photographs (source and required attribution: Fédération Algérienne de Football (FAF)) and the two Kabyle jewelry photographs (source: Le Jour d'Algérie; context: Fête du Bijou d'Ath Yenni). In every case the credit is displayed beneath the image, and permission is recorded separately as not documented.


---

## 2. Football photographs published with supplied FAF attribution

Updated 2026-08-06. Both photographs are now published on public routes, as
bundled local assets, with a visible credit. Source/attribution and permission
are recorded as separate fields: a visible credit is not a licence.

### P-1 · `src/assets/fln-team-1958.webp`

| Field | Value |
| --- | --- |
| Storage | Local, bundled by Vite from `src/assets`. CDN pointer `fln-team-1958.jpg.asset.json` retained but unreferenced. |
| Public route | `/football` |
| Placement | Hall of Algerian Football hero, FLN Team museum frame |
| Supplied source and attribution | Fédération Algérienne de Football (FAF) |
| Public credit shown on page | Source: Algerian Football Federation (FAF) |
| Photographer | Unknown. Not separately documented. |
| Date, location, event | Not documented. Only the exhibit's existing "1958–1962" team date range is displayed; no photograph date is claimed. |
| Licence or permission | None on file. No written licence, permission, or public-domain determination has been supplied. |
| Rights holder | Not determined. No rights holder is inferred beyond the supplied attribution. |
| Current status | **FAF attribution supplied by the project owner.** |
| If permission arrives | Update status to "Used with permission from Fédération Algérienne de Football (FAF)" and record the permission date and the location of the documentation. |

### P-2 · `src/assets/lesvertes-faf-2026.jpg`

| Field | Value |
| --- | --- |
| Storage | Local, bundled by Vite from `src/assets`. CDN pointer `lesvertes-hero.jpg.asset.json` retained but unreferenced. |
| Public route | `/football/lesvertes` |
| Placement | Les Vertes hero |
| Supplied source and attribution | Fédération Algérienne de Football (FAF) |
| Public credit shown on page | Source: Algerian Football Federation (FAF) |
| Photographer | Unknown. Not separately documented. |
| Date, location, event, competition | Not documented and not claimed on the page. |
| Licence or permission | None on file. No written licence, permission, or public-domain determination has been supplied. |
| Rights holder | Not determined. No rights holder is inferred beyond the supplied attribution. |
| Current status | **FAF attribution supplied by the project owner.** |
| If permission arrives | Update status to "Used with permission from Fédération Algérienne de Football (FAF)" and record the permission date and the location of the documentation. |

Neither photograph is classified as project-owned, generated for DZ Odyssey,
public domain, licensed, or used with permission. The museum makes no claim of
partnership, sponsorship, endorsement, or affiliation with the FAF.

### Dormant illustrations

`src/assets/fln-team-illustration.png` and `src/assets/lesvertes-illustration.png`
are the former interpretive heroes. They are retained in the repository, marked
`use: "dormant"` in `src/data/mediaRegistry.ts`, and referenced by no route.

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

The two football photographs are published from bundled local assets, not from a
remote CDN, and each displays the credit "Source: Algerian Football Federation (FAF)" directly beneath the image. Their source is recorded; their permission
status is recorded separately as not documented (see section 2).

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

## Kabylie jewelry exhibit

Updated 2026-08-07. Source documentation has been supplied by the project owner:
both photographs come from Le Jour d'Algérie coverage of the Fête du Bijou d'Ath Yenni.
Neither photograph was taken or owned by Dalila Fridi, and neither is classified as
project-owned.

| Field | `src/assets/bijou-artisanale.jpg` | `src/assets/bijoux.jpg` |
| --- | --- | --- |
| Placement | Kabylie region page, Kabyle Jewelry exhibit, main plate | Kabylie region page, "The Colors of Kabylie" detail plate |
| Source | Le Jour d'Algérie | Le Jour d'Algérie |
| Context | Fête du Bijou d'Ath Yenni | Fête du Bijou d'Ath Yenni |
| Photographer | Not identified in the available source | Not identified in the available source |
| Rights holder | Not confirmed | Not confirmed |
| Required attribution | Source: Le Jour d'Algérie, Fête du Bijou d'Ath Yenni | Source: Le Jour d'Algérie, Fête du Bijou d'Ath Yenni |
| Public credit shown on page | Yes, beneath the photograph, in EN, FR and AR | Yes, beneath the photograph, in EN, FR and AR |
| Licence or permission | Not documented | Not documented |
| Current rights status | Attribution provided; reuse permission not documented | Attribution provided; reuse permission not documented |

Neither photograph is classified as project-owned, public domain, licensed, or used
with permission. Attribution identifies the source; it does not establish permission
to republish. No publication date, photographer, depicted artisan, jewelry owner or
additional rights holder is claimed. The museum makes no claim of partnership,
sponsorship, endorsement or affiliation with Le Jour d'Algérie.

The previous generated interpretive illustration was removed from this exhibit
and deleted from the project. Text is an original museum adaptation based on the French
Wikipedia overview and the scholarly references it lists.

