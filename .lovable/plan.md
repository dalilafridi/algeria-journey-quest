
## Match Theater — plan

A reusable cinematic "museum theater" for reliving historic Algerian matches. First experience: **Algeria 2–1 West Germany, 16 June 1982, El Molinón, Gijón**. Additional matches will later be added by dropping a new data file into `src/data/matchTheater/`.

### 1. Route

- **New route file** `src/routes/theater.$matchId.tsx`
  - Params: `matchId` (e.g. `gijon-1982`)
  - Loads match data from a registry; 404 via existing `notFoundComponent` pattern if unknown.
  - Preserves progress in `localStorage` (`dz-theater-<matchId>-state`) so leaving and returning restores the current minute, tactical/gallery pane, and completion flags.
  - Entry from the existing Football wing: the Gijón / Famous Matches cards on `/football` gain a "Enter Match Theater" button linking here (non-destructive addition).

### 2. Data model — reusable

New folder `src/data/matchTheater/`:

- `src/data/matchTheater/types.ts` — shared types:
  - `MatchTheater`: `{ id, competition, stage, date, venue, city, country, teams: { home, away }, lineups, events[], goals[], substitutions[], cards[], tactics, narration[], context[], gallery[], sources[], quiz[], relatedExhibits[], passportStamp, nextMatchId? }`
  - `TeamInfo`: crest emoji/svg glyph (labelled as stylised, not archival), name, coach, formation, colors.
  - `LineupPlayer`: `{ id, number, name, position, club, role, bio, linkExhibitId?, isCaptain? }`
  - `MatchEvent`: discriminated union `kickoff | goal | chance | save | card | substitution | tacticalNote | halftime | fulltime` with minute + short localized description.
  - `NarrationSegment`: `{ id, minute, title, body, kind: "intro" | "buildup" | "goal" | "context" | "finalWhistle" | "legacy" }`
  - `ArchivalItem`: `{ id, kind: "photo"|"program"|"ticket"|"newspaper"|"jersey"|"poster"|"video", caption, date, source, rights, reproduction: boolean, url? }`
  - `QuizQuestion`: `{ id, question, choices[], answerIndex, rationale }`
- `src/data/matchTheater/index.ts` — registry `MATCH_THEATERS: Record<string, MatchTheater>` + `listMatchTheaters()` helper. Prepared placeholders (no content) for future matches: `chile-1982`, `england-2010`, `south-korea-2014`, `germany-2014`, `senegal-afcon-2019-final`, `egypt-2009-playoff`.
- `src/data/matchTheater/gijon-1982.ts` — the first, fully-populated match, cross-checked with reliable references (FIFA, RSSSF, contemporary reports). Facts to encode:
  - Competition: 1982 FIFA World Cup, Group 2, matchday 1.
  - Venue: Estadio El Molinón, Gijón, Spain, 16 June 1982.
  - Coaches: **Mahieddine Khalef & Rachid Mekhloufi** (Algeria), **Jupp Derwall** (West Germany).
  - Full verified Algerian starting XI: **Mehdi Cerbah (GK); Chaâbane Merzekane, Mahmoud Guendouz, Nourredine Kourichi, Salah Larbes; Ali Fergani (c), Mustapha Dahleb, Djamel Zidane; Salah Assad, Rabah Madjer, Lakhdar Belloumi.** Substitutes: **Tedj Bensaoula, Karim Maroc.**
  - West Germany XI as listed in FIFA/RSSSF records: **Schumacher; Kaltz, K.-H. Förster, Stielike, Briegel; Dremmler, Breitner, Magath; Littbarski, Fischer, Rummenigge (c).** Substitutes on the day: **Hrubesch, Fischer variations per source**.
  - Goals: 54' Madjer (assist Belloumi); 67' Rummenigge; 68' Belloumi (assist Assad/Madjer per contemporary reports).
  - Any figure we cannot verify to a specific minute (yellow cards, exact save counts) will be marked "Detailed event data is not available for this moment." rather than invented.
  - Sources array with named references (FIFA match report, RSSSF, El País archive, L'Équipe archive, Algerian FAF archives). No copyrighted media URLs embedded.

### 3. Components — all under `src/components/theater/`

Reusable across all future matches:

- `TheaterShell.tsx` — dark stage (deep black + dark-green gradient), subtle grain, stadium-light vignette; wraps children; respects `prefers-reduced-motion`; exposes an "exit theater" back to the referrer.
- `TheaterIntro.tsx` — cinematic entry: fades museum chrome, reveals date/venue, team crests (stylised bronze medallions with clear "stylised crest" label), then the title card. Buttons: **Begin Experience**, **Explore Match**, **Listen to Audio Guide**, **Skip Introduction**. No autoplay audio.
- `MatchTimeline.tsx` — horizontal timeline (drag/swipe on touch, keyboard left/right, tab-focusable). Play/pause, back/forward, jump-to-key-moment chips. Shows kickoff, goals, subs, cards, chances, saves, HT, FT. Emits `onMinuteChange`. Persists to localStorage. `aria-valuenow/min/max` for screen readers.
- `EventCard.tsx` — expandable cinematic card for a `MatchEvent`, with narration hook.
- `GoalSequence.tsx` — dedicated sequence for a `goal` event: buildup text, simple pitch diagram (svg), player plaques, historical significance. Used for Madjer 54', Rummenigge 67', Belloumi 68'.
- `PitchDiagram.tsx` — simple SVG pitch, renders formation dots for a `TeamInfo.formation`, or a passing sequence given `{ from, to }[]` points. Text alternative via `<desc>`.
- `TacticalView.tsx` — optional toggle. Shows both starting formations side-by-side, coach notes, in-match changes. Shows the "Detailed event data is not available" copy when a match lacks data.
- `PlayerPlaque.tsx` — museum plaque for a `LineupPlayer` (full name, position, club at the time, role, career summary, link to Legends Hall exhibit).
- `HistoricalContextPanel.tsx` — contextual pauses (pre-match, post-match, legacy). Dignified factual copy.
- `ArchivalGallery.tsx` — grid of `ArchivalItem`s. Each tile shows caption, date, source, rights, reproduction badge. No copyrighted media embedded; tiles for missing media render an "Archive placeholder — awaiting sourced material" state and are hidden from lightbox until a real URL is added.
- `AudioGuidePanel.tsx` — reuses the existing `AudioGuideProvider` / TTS server function (`src/lib/tts.functions.ts`). Plays narration segments generated **only** from verified exhibit copy (no invented quotes). Controls: play/pause/replay/scrub/volume/speed/captions/transcript. Captions rendered from the same segment text. Language follows the app `useLang()`; EN/FR/AR supported.
- `FinalWhistle.tsx` — final-score reveal, dignified reflection copy, unlocks passport stamp `witness-gijon-1982`, links to related exhibits (Shame of Gijón, 1982 WC, Madjer, Belloumi, FLN Team) and to next Match Theater when defined.
- `MatchQuiz.tsx` — five-question optional quiz sourced from the match data; answers hidden until submit; awards XP via the existing `progress` lib and reveals a completion badge.
- `TheaterActions.tsx` — bookmark, add to My Collection, share a museum-style match card (reuses existing share-card canvas pattern from `OnThisDayCard.tsx`), replay goals, "next match" link.

### 4. Systems reused (no duplication)

- **Language & RTL**: `useLang()` and `LocalizedString` from `@/lib/i18n`.
- **Audio narration**: existing `AudioGuideProvider` in `src/lib/audioGuide.tsx` and the TTS server function.
- **Bookmarks**: extend `src/lib/footballBookmarks.ts` with a third bucket `matches-theater` (or reuse `matches`) — will reuse `matches` since matches already are the concept there.
- **Passport / stamps**: `recordVisit` + `computeStamps` in `src/lib/passport.ts` — add a new stamp id `witness-gijon-1982` inside `computeStamps` milestones list, awarded when the visitor reaches the FinalWhistle.
- **Progress / XP**: `src/lib/progress.ts` (existing quiz XP path).
- **Continuity**: `src/lib/continuity.ts` — record the last-visited theater so `ContinueJourneyCard` can resume it.
- **Medallions & typography**: `MedallionFrame`, existing `SERIF` styling used across the wing.
- **Not-found / error boundaries**: same pattern as other dynamic routes.

### 5. Football wing integration

- Non-destructive edits to `src/routes/football.tsx`:
  - The Gijón exhibit and each entry in Famous Matches gets a small "Enter Match Theater" pill linking to `/theater/<id>` when a theater exists for that match. Absent theater → the existing card stays exactly as it is.
- `src/components/Header.tsx`: no new top-level link (Match Theater is entered from the football wing) to avoid nav sprawl.

### 6. Translation strings

All static UI copy (buttons, section headings, quiz UI, final-whistle copy, tactical placeholder, source labels) will be authored inline as `LocalizedString` next to the components — matching the wing's existing pattern — in EN/FR/AR. No changes to the central i18n keys file are required.

### 7. Mobile & accessibility

- Mobile-first layout: single-column vertical narrative; timeline as a horizontally-scrollable swipeable strip with sticky play controls in a collapsible bottom sheet; large hit targets; no horizontal overflow.
- Progress restored from localStorage on return.
- Full keyboard support (Tab through timeline, ←/→ scrubs one minute, Space plays/pauses).
- `aria-live="polite"` region announces minute changes and events.
- Captions + transcript for narration.
- `prefers-reduced-motion` disables fades, grain, and auto-advance.
- High-contrast focus rings; no info conveyed by colour alone (icons + text for goals/subs/cards).
- Text alternatives on every SVG pitch diagram.

### 8. Performance

- Route is a discrete file → code-split automatically.
- Archival gallery and tactical animations lazy-loaded with `React.lazy` + `Suspense`.
- Player plaques rendered on-demand (open a plaque → mounts).
- Audio is fetched only when the visitor presses play.

### 9. Content integrity

- Visible **Sources & Research** section at the bottom of the theater, populated from `match.sources`.
- Every claim in narration is traceable to a source id.
- Stylised crests and any diagrams are labelled "Stylised recreation — not an archival crest".
- Archival tiles show source + rights + reproduction badge; unsourced tiles render as placeholders.
- No fake quotes, no fake commentary, no fake headlines, no fabricated statistics.

### 10. Files summary

**New**
- `src/routes/theater.$matchId.tsx`
- `src/data/matchTheater/types.ts`
- `src/data/matchTheater/index.ts`
- `src/data/matchTheater/gijon-1982.ts`
- `src/components/theater/TheaterShell.tsx`
- `src/components/theater/TheaterIntro.tsx`
- `src/components/theater/MatchTimeline.tsx`
- `src/components/theater/EventCard.tsx`
- `src/components/theater/GoalSequence.tsx`
- `src/components/theater/PitchDiagram.tsx`
- `src/components/theater/TacticalView.tsx`
- `src/components/theater/PlayerPlaque.tsx`
- `src/components/theater/HistoricalContextPanel.tsx`
- `src/components/theater/ArchivalGallery.tsx`
- `src/components/theater/AudioGuidePanel.tsx`
- `src/components/theater/FinalWhistle.tsx`
- `src/components/theater/MatchQuiz.tsx`
- `src/components/theater/TheaterActions.tsx`
- `src/lib/matchTheaterState.ts` (localStorage persistence + XP/stamp hooks)

**Edited (additive only)**
- `src/routes/football.tsx` — link the Gijón / Famous Matches cards into the theater.
- `src/lib/passport.ts` — add the `witness-gijon-1982` stamp definition.

Confirm and I'll implement.
