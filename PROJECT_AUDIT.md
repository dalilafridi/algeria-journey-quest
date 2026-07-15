# DZ Odyssey — Complete Project Audit & Technical Summary

> Definitive handover document. Written for a senior engineer taking over the project cold, with no access to prior chat history. Date of audit: **July 15, 2026**.

---

## Executive Summary

**DZ Odyssey** (deployed as `algeria-journey-quest.lovable.app` / `dzodyssey.numeradataworks.com`, internal package name `tanstack_start_ts`) is a fully client-side, richly content-driven **interactive museum of Algerian history and culture**. It is not a CMS-backed app: all content is authored as typed TypeScript data files, and all user state is kept in `localStorage`. The single server-side surface is an AI "Ask the Curator" streaming endpoint that grounds a chat model in the site's own corpus.

The product is positioned as a "walk through the museum" rather than an encyclopedia. Every major surface — eras, figures, regions, culture, cuisine, football wing, match theater, club museums — is styled as a **parchment-and-bronze museum room**, with cinematic transitions, an audio-guide, a passport with stamps, a gamified XP/level system, and full **trilingual support (English / French / Arabic with RTL)**.

Architecturally the app is a **TanStack Start v1 + React 19 + Vite 7 + Tailwind v4** project deployed to Cloudflare Workers. Routing is file-based under `src/routes/`, UI is built on shadcn/Radix, animations on `tw-animate-css`, AI chat via the **Lovable AI Gateway** using the Vercel AI SDK. There is currently **no database, no auth, no backend persistence** — Lovable Cloud is not enabled. State that would normally live in a DB (progress, bookmarks, passport, language, theater state) is stored per-browser in `localStorage`.

The application is content-rich: **7 historical eras** with ~113 figures, ~6 regions, ~7 culture topics, ~18 cuisine entries, 52 "on this day" events, ~62 football data records, a full Match Theater (Gijón 1982) and a flagship JS Kabylie Club Museum, plus 6 placeholder clubs. Total source footprint is ~37k lines of hand-authored TS/TSX.

**What works today:** every listed route renders, i18n works across EN/FR/AR with RTL, the Curator AI answers grounded questions with streaming, quizzes and XP/level accounting work, passport stamps compute correctly, Match Theater and JSK museum are complete flagship experiences, and the navigation was recently restructured so Clubs lives under a Football dropdown/accordion.

**What is missing / next:** no accounts (state is device-local), no admin/CMS, no analytics, no automated tests, most Club Museums are "coming soon" placeholders, some content areas (Athletics, Handball, Boxing) are only hinted at, and there is meaningful technical debt in duplicated card patterns and long single-file routes.

---

## 1. Project Vision

### 1.1 Original purpose
A trilingual, mobile-first learning experience that teaches **Algerian history** through short lessons and quizzes — essentially an "Algeria through time" course wrapped in a warm, cultural aesthetic.

### 1.2 Current vision
An immersive **digital museum** of Algeria: history, culture, cuisine, regions, figures, sport, and iconic moments — presented as curated exhibits rather than articles. The tone is "FIFA Museum × Louvre × cultural passport". Museum metaphors (halls, wings, plaques, medallions, an audio guide, a stamped passport) are load-bearing UX, not decoration.

### 1.3 Long-term roadmap (implicit from code & memory)
1. Additional Club Museums (MCA, ESS, USMA, CRB, MCO, PAC — all currently placeholders).
2. Additional Match Theater experiences beyond Gijón 1982 (data model is already generic).
3. Additional sport wings (Athletics, Handball, Boxing) reusing the club museum architecture.
4. Optional Lovable Cloud enablement for accounts, cross-device sync, and shareable postcards / passports.
5. Content expansion — more figures, more "On This Day" entries, more culture and cuisine.

### 1.4 Target audience
- Algerian diaspora and younger Algerians rediscovering national heritage.
- Students and teachers looking for a curated, credible narrative.
- Curious international visitors — the trilingual (EN/FR/AR) UX is designed for all three.

### 1.5 Core user experience
Land on the home page → a splash + signature intro plays once → welcome journey suggests a starting point → user browses eras, regions, figures, culture, cuisine, football, or Match Theater → visiting things stamps the passport and earns XP → the museum dock, audio guide, and "Ask the Curator" assistant follow the user across every page.

### 1.6 Design philosophy (from `mem://index.md`)
- Museum-style tone: calm, cinematic, cultural, Algerian.
- Warm parchment palette: charcoal ink, sand, terracotta, olive, soft gold.
- Amazigh ⵣ used tastefully, never oversized.
- Symbolic elements rendered as engraved bronze medallions (coin family), never flat/line UI icons.
- Gamification exists but stays subtle: XP bars, badges, continue-journey. **Forbidden**: coins, streaks, noisy rewards, "kid game" feel.
- Never rebuild identity, routes, or existing pages — improve, don't rebuild.

### 1.7 Feature status summary
| Status | Feature |
|---|---|
| ✅ Complete | Eras, Figures, Regions, Culture, Cuisine, Timeline, Atlas, Passport, XP/Levels, Quizzes, Search, Audio Guide, Ask the Curator, Match Theater (Gijón 1982), JSK Club Museum, i18n EN/FR/AR + RTL |
| 🟡 In progress | Football wing (main content live, club roster mostly placeholders), Discovery/recommendations, Guided journeys |
| 🔲 Planned | Additional Match Theater matches, other Club Museums (6 placeholders), other sport wings, accounts / cloud sync, admin tooling |

---

## 2. Architecture

### 2.1 Stack
| Layer | Technology |
|---|---|
| Framework | **TanStack Start v1** (React 19, file-based routing, SSR-capable) |
| Bundler | **Vite 7** + `@cloudflare/vite-plugin` |
| Runtime | **Cloudflare Workers** (nodejs_compat) |
| Styling | **Tailwind CSS v4** via `@tailwindcss/vite`, `@import "tailwindcss"` in `src/styles.css`, `tw-animate-css` |
| UI primitives | **shadcn/ui** on top of Radix (~30 primitives installed) |
| Data fetching | `@tanstack/react-query` (installed; used sparingly) |
| Forms | `react-hook-form` + `zod` |
| AI | **Vercel AI SDK v7** (`ai`, `@ai-sdk/react`, `@ai-sdk/openai-compatible`) against the **Lovable AI Gateway** (`https://ai.gateway.lovable.dev/v1`) |
| Icons | `lucide-react` |
| Toasts | `sonner` |
| Charts | `recharts` |
| Carousel | `embla-carousel-react` |
| Language | TypeScript strict |

### 2.2 Folder structure
```
src/
├─ routes/                # file-based routes (see §3)
│  └─ api/curator.ts      # only server route (AI streaming)
├─ components/            # feature-scoped presentational components
│  ├─ atlas/ audio/ brand/ curator/ figures/ journeys/
│  ├─ moments/ museum/ story/ theater/ ui/  (shadcn)
├─ data/                  # ALL content, typed and trilingual
│  ├─ clubs/  matchTheater/
├─ lib/                   # cross-cutting logic & localStorage stores
│  ├─ curator/corpus.ts   # AI grounding corpus builder
│  └─ tts.functions.ts    # createServerFn TTS proxy
├─ hooks/                 # (use-mobile)
├─ styles.css             # Tailwind v4 theme + tokens
├─ router.tsx             # router bootstrap
└─ routeTree.gen.ts       # auto-generated
```

### 2.3 Routing
- File-based via `@tanstack/router-plugin`. Dot-separated filenames map to nested URL segments; dynamic segments are `$param`.
- Root: `src/routes/__root.tsx` provides the shell, head metadata, providers (`AudioGuideProvider`), splash, dock, HUD, Sonner toaster, and search overlay.
- 33 route files. See §3 for the full page inventory.
- Only server route: `src/routes/api/curator.ts` (POST, streaming chat).

### 2.4 State management
There is **no global client store** (no Redux/Zustand). Instead:
- **`localStorage` modules** in `src/lib/` own their key + read/write helpers + a `window` event ("progress-updated", "passport-updated", "lang-updated", "dz-theater-state-updated"). Components subscribe with `useEffect`.
- **React Query** is available but the project mostly uses hand-rolled `useState`/`useEffect` because there is no remote data.
- **Route loaders**: none of the routes use `loader` for data; content is imported statically.

Storage keys (all versioned `-v1`):
| Key | Owner |
|---|---|
| `algeria-history-progress-v1` | `lib/progress.ts` (XP, quiz completions, badges) |
| `algeria-history-lang-v1` | `lib/i18n.ts` |
| `algeria-passport-v1` | `lib/passport.ts` |
| `dz-theater-<id>-state-v1` | `lib/matchTheaterState.ts` |
| various `-v1` keys | `journeys.ts`, `footballBookmarks.ts`, `continuity.ts`, `explainMode.ts`, `figureDiscovery.ts`, `wordsProgress.ts`, `showcase.ts`, `immersion.ts` |

### 2.5 Data flow
```
Typed content (src/data/*.ts)  ─┐
                                 ├─▶  Route components ─▶  UI (i18n via useLang / tt())
User interactions ─▶ lib/*.ts ──┘             │
     writes localStorage + dispatches event   │
                                              ▼
                                    Ask the Curator ─▶ POST /api/curator ─▶
                                    (system prompt = renderCorpusForPrompt(SOURCES))
                                    ─▶ Lovable AI Gateway (streamText)
```

### 2.6 Database / Auth / Storage / External services
- **Database:** none. Lovable Cloud/Supabase is **not enabled**.
- **Auth:** none. There are no accounts. `LOVABLE_BROWSER_AUTH_STATUS` context is `no_supabase`.
- **File storage:** none in-app; images referenced via absolute HTTPS URLs (og:image lives on Lovable R2).
- **APIs:** only `POST /api/curator` (internal).
- **AI integrations:** Lovable AI Gateway for chat completions (`google/gemini-2.5-flash` via `@ai-sdk/openai-compatible`) and TTS (`openai/gpt-4o-mini-tts`).
- **Analytics / logging / error tracking / email / payments:** none.

### 2.7 High-level diagram
```
┌────────────────────────────────────────────────────────────────────┐
│                     Browser (React 19 SPA/SSR)                     │
│  ┌───────────┐  ┌──────────────┐  ┌───────────────────────────┐    │
│  │ Routes    │  │ Components   │  │ lib/* (localStorage +     │    │
│  │ (file-    │─▶│ (museum,     │─▶│ event bus, i18n, quiz,    │    │
│  │ based)    │  │ theater, ..) │  │ passport, progress...)    │    │
│  └─────┬─────┘  └──────┬───────┘  └─────────────┬─────────────┘    │
│        │               │                        │                  │
│        │           data/* (typed trilingual content)               │
│        │                                                           │
│        └────► POST /api/curator ──► ai.gateway.lovable.dev         │
│                                     (google/gemini-2.5-flash)      │
└────────────────────────────────────────────────────────────────────┘
                    Served by Cloudflare Workers (Vite/TanStack Start)
```

---

## 3. Pages

Every route lives under `src/routes/`. All pages consume trilingual content via `useLang()` + `tt()` helpers. All pages render inside `__root.tsx`, which supplies the header/dock/audio guide/curator/passport tracker.

| Route | File | Purpose | Key components | Data |
|---|---|---|---|---|
| `/` | `index.tsx` | Landing / welcome. Splash + signature intro, "On This Day", "Did you know", continue-journey, curator recommendations. | `WelcomeJourney`, `OnThisDayCard`, `DidYouKnowCard`, `ContinueJourneyCard`, `CuratorRecommendations`, `EraPreview` | `onThisDay`, `didYouKnow`, `eras` |
| `/timeline` | `timeline.tsx` | Chronological ribbon of all 7 eras. | Era cards, MotionReveal | `eras` |
| `/era/$eraId` | `era.$eraId.tsx` | Full era exhibit: summary, figures, places, facts, quiz CTA. | `Exhibit`, `MedallionFrame`, `LessonCard` | `eras`, `eraExtras` |
| `/quiz/$eraId` | `quiz.$eraId.tsx` | Era quiz runner (MCQ / T-F / Who-Am-I / Order / Image). Records XP + badge. | quiz UI | `eras`, `lib/quiz`, `lib/progress` |
| `/atlas` | `atlas.tsx` | Historical atlas with period overlays. | `HistoricalOverlay`, `HistoricalPeriodPanel` | `atlasPeriods`, `mapRegions` |
| `/map` | `map.tsx` | Interactive region map. | `RegionIcon` | `mapRegions` |
| `/region/$regionId` | `region.$regionId.tsx` | Region exhibit + linked figures. | `Exhibit`, `MedallionFrame` | `mapRegions`, `regionExtras` |
| `/figures` | `figures.index.tsx` | Hall of Legends browser (filter by category/region/era). | `FigureExhibitCard`, `CollectionEmblem` | `figures`, `figureMeta`, `figureCollections` |
| `/figures/$figureId` | `figures.$figureId.tsx` | Individual figure exhibit + connections. | `FigureExhibitCard`, `ConnectionMap`, `SharePlaque` | `figures`, `figureExtras` |
| `/figures/collection/$collectionId` | `figures.collection.$collectionId.tsx` | Curated collection view. | `CollectionEmblem`, `GuidedTour` | `figureCollections`, `figureTour` |
| `/figures/quiz` | `figures.quiz.tsx` | Figures quiz. | quiz UI | `figureQuiz` |
| `/culture` | `culture.tsx` | Culture hall (music, dress, poetry, etc.). | museum cards | `cultureTopics` |
| `/culture/$topicId` | `culture.$topicId.tsx` | Culture topic exhibit. | `Exhibit` | `cultureTopics` |
| `/cuisine` | `cuisine.tsx` | Cuisine wing (regional + sweets). | museum cards | `cuisine` |
| `/cinema` | `cinema.tsx` | Cinema exhibit. | museum cards | `cinema`, `cinematic` |
| `/lessons` | `lessons.tsx` | Short lessons index. | `LessonCard` | `lessons` |
| `/words` | `words.tsx` | Vocabulary / phrases + words quiz. | quiz UI | `words`, `wordsQuiz`, `wordsProgress` |
| `/moments` | `moments.tsx` | Immersive "moments" storytelling. | `Immersive`, `StoryFlow` | `storyScenes`, `immersion` |
| `/journeys/$journeyId` | `journeys.$journeyId.tsx` | Guided multi-stop tour. | `JourneyPlayer`, `JourneyNext` | `journeys.ts` |
| `/showcase` | `showcase.tsx` | Featured items rotation. | museum cards | `showcase` |
| `/chronicle` | `chronicle.tsx` | Long-form chronicle view. | museum cards | `eras`, `onThisDay` |
| `/compare` | `compare.tsx` | Side-by-side figures/eras comparison. | comparison UI | `figures`, `eras` |
| `/ideas` | `ideas.tsx` | Ideas / concepts room. | `Exhibit` | `ideas` |
| `/stargazing` | `stargazing.tsx` | Ambient astronomy vignette. | ambience | `ambience` |
| `/football` | `football.tsx` | Football wing — national team, World Cups, AFCON, FLN Team, Match Theater, legends, stadiums, club museums CTA. Uses hash anchors. | museum cards, `useFootballBookmarks` | `football` |
| `/clubs` | `clubs.tsx` | Club Museums landing (JSK + 6 placeholders). | `MedallionFrame` | `clubs/index` |
| `/clubs/$clubId` | `clubs.$clubId.tsx` | Full club museum: origins, timeline, trophies, legends, matches, stadiums, jerseys, quiz. | museum cards, `MatchTheater` links | `clubs/jskabylie` |
| `/theater/$matchId` | `theater.$matchId.tsx` | Cinematic match theater experience. | `TheaterShell`, `TheaterIntro`, `MatchTimeline`, `GoalSequence`, `TacticalView`, `HistoricalContextPanel`, `ArchivalGallery`, `MatchQuiz`, `FinalWhistle`, `SourcesPanel`, `AudioGuidePanel` | `matchTheater/gijon-1982` |
| `/passport` | `passport.tsx` | Visitor passport: stamps grid, visits, XP, level, download-ready card. | `PassportTracker`, medallions | `lib/passport` |
| `/profile` | `profile.tsx` | Visitor identity (name/id), progress dashboard. | progress widgets | `lib/progress`, `lib/passport` |

**Global navigation flow:** every route is reachable from the `Header` (top nav + Football dropdown containing Club Museums) and the persistent `MuseumDock`. Search overlay (`⌘K`) offers global fuzzy search across all content via `lib/search.ts`.

---

## 4. Features

Legend: ✅ Complete · 🟡 In Progress · 🔲 Planned

| Area | Feature | Status | Notes |
|---|---|---|---|
| Museum | Era exhibits (×7) | ✅ | Full trilingual content, quizzes |
| Museum | Figures gallery (~113) | ✅ | Categories, regions, collections, extras |
| Museum | Regions (×6) | ✅ | `mapRegions.ts` + `regionExtras.ts` |
| Museum | Culture topics (×7) | ✅ | `cultureTopics.ts` |
| Museum | Cuisine (18 entries) | ✅ | Regional + sweets |
| Museum | Cinema | ✅ | `cinema.ts`, `cinematic.ts` |
| Museum | Football wing | ✅ | `/football` with hash-anchored sections |
| Museum | Match Theater | 🟡 | Gijón 1982 complete; framework reusable for future matches |
| Museum | Club Museums | 🟡 | JSK complete, 6 placeholders |
| Timeline | Chronological ribbon | ✅ | `/timeline` |
| Timeline | On This Day (52 entries) | ✅ | Home card |
| Atlas | Historical periods overlay | ✅ | `/atlas` |
| Atlas | Regional map | ✅ | `/map` |
| Guided Tours | Journeys / Signature journeys | ✅ | `journeys.ts`, `SignatureJourneys.tsx` |
| Guided Tours | Figure guided tour | ✅ | `figureTour.ts` |
| Hall of Legends | Figures index + collections | ✅ | `figures.index`, `figures.collection.$collectionId` |
| Quizzes | Era quizzes | ✅ | MCQ/TF/WhoAmI/Order/Image |
| Quizzes | Figures quiz | ✅ | `/figures/quiz` |
| Quizzes | Words quiz | ✅ | `/words` |
| Quizzes | Match quiz | ✅ | Inside Match Theater |
| Daily | On This Day | ✅ | Home |
| Daily | Did You Know | ✅ | Home |
| Discovery engine | Recommendations | 🟡 | `lib/recommendations.ts`, `lib/discoveries.ts` |
| Discovery engine | Continue journey | ✅ | `ContinueJourneyCard`, `continuity.ts` |
| Search | Global fuzzy search (⌘K) | ✅ | `SearchOverlay`, `lib/search.ts` |
| Profiles | Visitor identity (name/code) | ✅ | Stored in passport, `/profile` |
| Achievements | Stamps (era, region, culture, theater, club) | ✅ | `lib/passport.ts::computeStamps` |
| Achievements | Badges (era quiz perfect) | ✅ | `lib/progress.ts` |
| XP / Levels | 10-tier level system with thresholds | ✅ | `getLevelInfo` |
| Streaks | — | 🔲 | Intentionally excluded (see gamification memory) |
| Collections | Figure collections + emblem | ✅ | `figureCollections.ts` |
| Favorites / Bookmarks | Football bookmarks | ✅ | `useFootballBookmarks` |
| Languages | EN / FR / AR + RTL | ✅ | `lib/i18n.ts`, `LangSync` |
| Theme | Museum "parchment" palette (light) | ✅ | Dark tokens exist in CSS but not surfaced |
| Accessibility | Skip link, RTL, ARIA-live in theater, reduced-motion respected | ✅ | `A11y.tsx`, `MotionReveal` |
| Audio | Audio guide, TTS via server fn | ✅ | `audioGuide.tsx`, `tts.functions.ts` |
| AI | Ask the Curator (grounded RAG-ish) | ✅ | `/api/curator` |
| Admin features | — | 🔲 | None; content is code-authored |
| Share | Postcard / plaque share affordances | 🟡 | `SharePlaque.tsx`, `MemoryMoment.tsx` — UI only |

---

## 5. Database

**There is no database.** Lovable Cloud/Supabase is not enabled. There are no tables, RLS policies, storage buckets, triggers, functions, views, or migrations.

All "persistent" state is per-browser `localStorage` (see §2.4). If/when accounts are introduced, the natural minimal schema would be:

| Table (proposed) | Purpose |
|---|---|
| `profiles(id uuid pk, name text, code text, created_at)` | Visitor identity |
| `visits(user_id, kind, ref_id, visited_at)` | Museum visits (currently `passport.visits`) |
| `stamps(user_id, stamp_id, earned_at)` | Passport stamps |
| `quiz_results(user_id, era_id, score, total, taken_at)` | Quiz history |
| `xp_events(user_id, delta, reason, at)` | XP audit trail |
| `bookmarks(user_id, kind, ref_id)` | Football + generic bookmarks |
| `theater_state(user_id, match_id, minute, completed, quiz_best)` | Match Theater resume |
| `user_roles(user_id, role app_role)` + `has_role()` | Admin/curator roles (per platform guidance) |

None of this is built.

---

## 6. AI Features

### 6.1 Ask the Curator
- **Location:** `src/routes/api/curator.ts` (POST, streaming). Client: `src/components/curator/AskCurator.tsx`, mounted globally in `__root.tsx`.
- **How it works:**
  1. Client sends `messages` (UIMessage[]) to `/api/curator`.
  2. Server builds a *corpus* from the site's own data files via `src/lib/curator/corpus.ts::renderCorpusForPrompt`. Sources cover figures, eras, regions, culture topics, cuisine, and events, each with a stable citation id (e.g., `figure:jugurtha`) and route href.
  3. That corpus is injected into a strict `SYSTEM_PROMPT` demanding citation from provided SOURCES only and forbidding meta-references to prompts/training data.
  4. The chat is streamed via `streamText` from the Vercel AI SDK, using `createOpenAICompatible({ baseURL: "https://ai.gateway.lovable.dev/v1", headers: { "X-Lovable-AIG-SDK": "vercel-ai-sdk" } })`.
- **Model:** `google/gemini-2.5-flash` (Lovable AI Gateway).
- **Prompt strategy:** static, high-restraint system prompt + full grounded corpus every request (no retrieval/RAG index; the corpus is small enough to inline).
- **Limitations:** entire corpus inlined per request (higher tokens), no per-user memory, English-source cards even though the UI is trilingual (the model translates in the visitor's language on the fly).
- **Fallbacks:** non-200 responses surface a Sonner toast; streaming is optional (client tolerates non-stream).
- **Future improvements:** move to embeddings + top-k retrieval, cache the rendered corpus, add multilingual source cards, add tool-calls for "open exhibit".

### 6.2 Text-to-Speech (Audio Guide)
- **Location:** `src/lib/tts.functions.ts` (a `createServerFn({ method: "POST" })`). Client integration via `lib/audioGuide.tsx` + `components/audio/*`.
- **Model:** `openai/gpt-4o-mini-tts` on `https://ai.gateway.lovable.dev/v1/audio/speech`.
- **How it works:** short narration strings are POSTed; the returned audio is played in the persistent mini-player mounted in `__root.tsx`.
- **Limitations:** no caching, no offline; voices/pace configurable in the audio guide panel (Match Theater).
- **Future:** cache generated clips by (text, lang, voice) hash.

### 6.3 There is no other AI usage
No image generation at runtime, no chat memory, no embeddings, no moderation calls.

---

## 7. UI System

### 7.1 Palette (from `src/styles.css`)
Semantic OKLCH tokens, museum "parchment" theme:
- `--background` warm paper (`oklch(0.972 0.02 84)`)
- `--foreground` charcoal ink
- `--primary` terracotta
- `--secondary` olive green
- `--accent` soft gold
- `--muted`, `--border`, `--card`, `--popover`, `--destructive`, `--success` + chart 1–5 and sidebar-*.
- Custom gradients: `--gradient-warm`, `--gradient-hero`, `--gradient-parchment`.
- Custom shadows: `--shadow-soft`, `--shadow-glow`.
- Dark tokens are present but the app effectively runs light-only.

### 7.2 Typography
- Default sans stack (Tailwind default) for body/UI.
- Serif museum voice for Match Theater (`THEATER_SERIF` constant in `TheaterShell`).
- Arabic webfonts loaded conditionally via `LangSync` when lang switches to AR.

### 7.3 Spacing / radius
- Radius scale derived from `--radius: 1.1rem` (`sm..4xl`).
- Rounded-2xl/3xl used heavily to convey "polished plaque".

### 7.4 Icons
- `lucide-react` for functional UI icons.
- Symbolic identity (regions/pillars/eras) uses hand-designed **bronze medallion artifacts** (`components/brand/`: `MedallionFrame`, `MedallionDivider`, `MedallionLoader`, `AchievementMedallion`, `EraBadge`, `PillarIcon`, `AmazighSymbol`).

### 7.5 Animations
- `tw-animate-css` utilities + local `animate-float-up`.
- `MotionReveal` scroll-triggered reveals.
- Cinematic transitions in Match Theater (`GoalSequence`, `FinalWhistle`).

### 7.6 Reusable components
- **shadcn**: `src/components/ui/*` (accordion, dialog, dropdown, tabs, tooltip, sheet, drawer via vaul, toast via sonner, etc.).
- **Museum primitives**: `MedallionFrame`, `Exhibit`, `MuseumCatalog`, `MuseumDock`, `SplashScreen`, `SignatureIntro`, `LoadingScreen`.
- **Cross-cutting**: `Header`, `BackToTop`, `SearchOverlay`, `WelcomeJourney`, `ContinueJourneyCard`, `JourneyHud`, `PassportTracker`, `A11y (SkipLink, LangSync)`.

### 7.7 Responsive behavior
- Mobile-first everywhere. `hooks/use-mobile.tsx` gates a few affordances. Header collapses to a sheet with a Football accordion sub-menu; Football dropdown on desktop.

### 7.8 Dark mode
- Tokens present, no toggle wired. Effectively single-theme.

### 7.9 Accessibility
- Skip link to main content.
- `LangSync` sets `<html dir>` and `lang` attribute.
- Match Theater uses `aria-live` for minute changes; audio guide has captions & speed control; never autoplays.
- Reduced-motion respected via `MotionReveal`.
- Semantic headings and landmark elements throughout routes.

---

## 8. Performance

### 8.1 What is in place
- Vite 7 code-splits routes automatically via TanStack Router plugin.
- Content is static TS — no network fetches for content pages.
- `React.lazy` used sparingly (`<ClientOnly>` pattern not needed since there are no browser-only libs like Leaflet).
- Route-level `MotionReveal` avoids animating offscreen.
- Passive listeners on the storage event bus.

### 8.2 What is not
- No image pipeline / no `next/image` equivalent; images are referenced by URL.
- No prefetching hints beyond TanStack Router defaults.
- Some routes are very large single files (`moments.tsx` 1432 LOC, `football.tsx` 1150 LOC, `clubs.$clubId.tsx` 747 LOC, `quiz.$eraId.tsx` 758 LOC), which hurts hydration size for those routes.
- The Curator system prompt inlines the entire corpus each request (token overhead).

### 8.3 Bottlenecks to watch
- Bundle size of the biggest routes; consider splitting sections into lazy children.
- Full-corpus AI prompt as content grows.

---

## 9. Security

- **Auth:** none.
- **Authorization:** none. All routes are public.
- **Secrets / env vars:** only the Lovable AI Gateway is hit; the gateway is called from the server route so no key is shipped to the browser. `process.env.*` is read inside the handler.
- **DB security / RLS:** N/A (no DB).
- **Input validation:** `zod` is available; the curator route currently trusts `messages` shape after minimal duck-typing. If accounts are added, all server-fn inputs should be zod-validated.
- **Sanitization:** curator output rendered via `react-markdown`; ensure `rehype-sanitize` is added before enabling unrestricted markdown (currently disabled by default in react-markdown).
- **Public API:** `/api/curator` is unauthenticated by design. If abused, rate-limit at the edge.

Security memory currently reflects: no DB, no accounts — so scanners should not flag DB/RLS findings.

---

## 10. Content

Trilingual (EN/FR/AR) throughout. All authored as TS with `L(en, fr, ar)` helpers.

| Content set | File(s) | Approx count |
|---|---|---|
| Historical eras | `data/eras.ts` (+ `eraExtras.ts`) | **7** eras, each with figures/places/facts/quiz |
| Historical figures | `data/figures.ts` (+ `figureExtras.ts`, `figureMeta.ts`, `figureQuiz.ts`) | **~113** figures across 11 categories |
| Regions | `data/mapRegions.ts` (+ `regionExtras.ts`) | **6** regions |
| Culture topics | `data/cultureTopics.ts` | **7** topics |
| Cuisine | `data/cuisine.ts` | **18** entries (regional + sweets) |
| Cinema | `data/cinema.ts`, `cinematic.ts` | Curated set |
| Football | `data/football.ts` | **~62** records (matches, players, tournaments) |
| Club Museums | `data/clubs/jskabylie.ts` + placeholders | **1** complete + **6** placeholders |
| Match Theater | `data/matchTheater/gijon-1982.ts` | **1** full match |
| On This Day | `data/onThisDay.ts` | **52** events |
| Did You Know | `data/didYouKnow.ts` | **23** facts |
| Lessons | `data/lessons.ts` | **8** short lessons |
| Words / Vocabulary | `data/words.ts` (+ `wordsQuiz.ts`) | Vocabulary set + quiz |
| Story scenes | `data/storyScenes.ts` | Immersive moments |
| Atlas periods | `data/atlasPeriods.ts` | Historical map periods |
| Ideas | `data/ideas.ts` | Concept exhibits |
| Curator corpus | `lib/curator/corpus.ts` | Derived from above |

Media: no bundled binaries; all images come from remote HTTPS URLs referenced in the data files or the OG image on Lovable R2.

---

## 11. Development History (chronological)

Reconstructed from the codebase and the summarized chat history. Exact dates are not tracked in-repo; the list is ordered by dependency.

1. **Bootstrap** — TanStack Start template scaffolded (React 19, Vite 7, Tailwind v4, shadcn). Router shell, `__root.tsx`, home page created.
2. **i18n foundation** — `lib/i18n.ts` with `Localized<T>`, `LangSync`, and RTL wiring. Trilingual becomes a hard invariant thereafter.
3. **Eras + Quizzes** — `data/eras.ts` with quiz question types; `/era/$eraId`, `/quiz/$eraId`, `lib/progress.ts`, XP + badges.
4. **Figures gallery** — `data/figures.ts`, `figureMeta`, categories, `/figures`, individual pages, collections, guided tour.
5. **Regions + Atlas** — `mapRegions.ts`, `regionExtras.ts`, `/map`, `/region/$regionId`, `/atlas` with period overlays.
6. **Culture, Cuisine, Cinema, Lessons, Words, Ideas** — supporting museum wings and quizzes.
7. **Passport & Stamps** — `lib/passport.ts` computes stamps from visits and quiz progress; `/passport`, `PassportTracker` mounted globally.
8. **Museum polish** — brand system (Medallion family), splash + signature intro, MotionReveal, MuseumDock, JourneyHud, BackToTop.
9. **Audio guide + TTS** — `AudioGuideProvider`, mini-player, `tts.functions.ts` server function against Lovable AI Gateway.
10. **Ask the Curator** — `lib/curator/corpus.ts`, `/api/curator` streaming route, `AskCurator` overlay wired into root.
11. **On This Day / Did You Know** — daily home cards.
12. **Hall of Algerian Football** — `data/football.ts`, `/football`, `useFootballBookmarks`, header entry.
13. **Match Theater** — reusable `matchTheater` data model, `/theater/$matchId`, `theater/*` components, `matchTheaterState.ts`, "Witness to Gijón" stamp, XP.
14. **Club Museums** — `data/clubs/*`, `/clubs`, `/clubs/$clubId`, JSK as flagship + 6 placeholders, "JS Kabylie Museum Completed" stamp.
15. **Navigation restructure (latest)** — "Clubs" removed as top-level; now lives under a Football dropdown (desktop) / accordion (mobile). Football stays active on `/football`, `/clubs`, `/theater/*`.

---

## 12. Current State

- **Complete:** all listed routes render, EN/FR/AR + RTL works, quiz/XP/passport/stamps compute, Match Theater flagship experience, JSK Club Museum flagship, Ask the Curator streams grounded answers, TTS audio guide plays.
- **Partially complete:**
  - Club Museums — only JSK; MCA/ESS/USMA/CRB/MCO/PAC are placeholders.
  - Match Theater — only Gijón 1982; model is reusable for more matches.
  - Discovery engine — recommendations exist but are simple.
  - Share affordances — UI exists (`SharePlaque`, `MemoryMoment`) but no server-generated OG cards.
- **Experimental:** `stargazing.tsx`, `moments.tsx` immersive scenes, `chronicle.tsx` long-form layout.
- **Missing:** accounts, cross-device sync, admin/CMS, analytics, automated tests, image pipeline, dark mode toggle.

---

## 13. Technical Debt

| Item | Impact | Suggested fix |
|---|---|---|
| Very large route files (`moments.tsx` 1432, `football.tsx` 1150, `quiz.$eraId.tsx` 758, `clubs.$clubId.tsx` 747, `atlas.tsx` 747, `culture.tsx` 749) | Slow hydration, hard to maintain | Split each into per-section components under `src/components/<area>/` |
| Duplicated museum-card patterns (Exhibit-like cards reimplemented per route) | Style drift, more code | Extract a canonical `MuseumCard` and migrate |
| Curator corpus fully inlined per request | Token cost as content grows | Precompute a static, cached corpus string; consider top-k retrieval |
| `UNLOCK_ALL_FOR_DEV` flag in `progress.ts` | Risk of shipping unlocked | Move to env flag or delete before release |
| No zod validation on `POST /api/curator` body | Minor DoS/parse risk | Add zod schema for `messages` |
| No tests | Regressions on refactor | Add vitest + a few smoke tests around `passport.computeStamps` and quiz XP math |
| Dark tokens exist but no toggle | Confusing for future contributors | Either wire the toggle or delete `.dark` block |
| Historical accuracy notes are scattered in data comments | Hard to audit | Centralize `note` fields into a review checklist |
| `lib/showcase.ts` (33 LOC), `lib/immersion.ts` (45 LOC), `lib/explainMode.ts` (41 LOC), `lib/continuity.ts` (46 LOC) | Many small localStorage stores with copy-pasted patterns | Extract a `createLocalStore<T>(key, initial, evt)` factory |
| Absolute URL og:image on __root only | Fine, but child routes should not add root-image again | Already respected per instructions |

Known bugs: none currently reproducing in the console-log/network snapshots available to this session.

---

## 14. Future Roadmap (prioritized)

1. **Content expansion** — Ship 2–3 more Match Theaters (1990 AFCON final, 2014 WC vs Korea, 2019 AFCON final) and 2 more Club Museums (MCA + ESS). Reuses existing components; highest visible value, lowest architectural risk.
2. **Route file decomposition** — Break the 6 largest routes into per-section components; introduces no functional change but unblocks further growth.
3. **Cloud (optional but strategic)** — Enable Lovable Cloud, add sign-in, migrate `localStorage` stores to a per-user schema (see §5 proposed tables). Enables shareable passports & cross-device sync.
4. **Server-generated share postcards** — Once Cloud is on, generate OG images per stamp/exhibit so social shares look museum-quality.
5. **Curator RAG upgrade** — Move from full-corpus inline to embeddings + top-k; cache corpus string.
6. **Testing baseline** — Vitest + a11y smoke tests; Playwright script for the passport happy path.
7. **Analytics** — Understand which exhibits actually get visited to prioritize future content.
8. **Additional sport wings** — Athletics, Handball, Boxing on the club/museum architecture.

---

## 15. Developer Notes

### Conventions
- **Every user-facing string is trilingual** via `Localized<string>` or the legacy `LocalizedString` (which allows plain strings for old content). Always add `en/fr/ar`.
- **Use `useLang()` + `tt(value, lang)`** to render trilingual content; never hard-code English.
- **Use design tokens, never raw hex/`text-white`**. Semantic classes only (`bg-primary`, `text-foreground`, etc.).
- **Icons for identity** must be Medallion components (`MedallionFrame`, `EraBadge`, etc.), not lucide.
- **Never re-add** streaks, coins, or arcade-style rewards — this is a museum, not a game.
- **Never edit `src/routeTree.gen.ts`** — regenerated by the router plugin.
- **`createFileRoute("...")` path must match the file** exactly (see `tanstack-route-architecture`).
- **Route content that navigates dynamically** must use `<Link to params>`, never `<a href>`.

### Reusable utilities
| Module | Use it for |
|---|---|
| `lib/i18n.ts` | `getLang`, `useLang`, `tt`, `tu`, `LangSync` |
| `lib/progress.ts` | XP, quiz records, levels (`getLevelInfo`) |
| `lib/passport.ts` | `recordVisit`, `useVisit`, `computeStamps`, `getPassportSummary` |
| `lib/matchTheaterState.ts` | Theater persistence + reward hooks |
| `lib/quiz.ts` | Quiz shuffling, scoring |
| `lib/journeys.ts`, `lib/figureTour.ts` | Guided tour scaffolding |
| `lib/curator/corpus.ts` | AI grounding — extend when adding new content buckets |
| `lib/audioGuide.tsx` | Provider + `useAudioGuide()` for narration |
| `hooks/use-mobile.tsx` | Breakpoint boolean |

### Architectural decisions worth preserving
- **Content-as-code**: content lives in typed TS. Do not move to a headless CMS unless a real editorial team needs it — the type safety and PR review flow is a feature.
- **`localStorage` event bus**: every store dispatches a `window` event. Components subscribe to that event, not to a global store. Keep this shape when adding new stores.
- **Museum voice**: copy is curated, calm, cultural. Reject AI-generated marketing tone.
- **Server surface stays minimal**: only add server functions/routes when there is a real reason (secrets, streaming, external I/O).

### When adding a Club Museum
1. Create `src/data/clubs/<clubid>.ts` matching `ClubMuseum` from `types.ts`, `status: "complete"`.
2. Register in `src/data/clubs/index.ts` (replace the placeholder).
3. Optionally add a passport stamp in `lib/passport.ts::computeStamps` (theater/club section).
4. If Match Theater tie-in exists, add it under `src/data/matchTheater/`.

### When adding a Match Theater experience
1. Create `src/data/matchTheater/<matchid>.ts` matching `MatchTheater` from `types.ts`.
2. Register in `src/data/matchTheater/index.ts`.
3. Add a `theater:<matchid>` visit to the theater stamps in `lib/passport.ts` and give it a title.
4. Link into `/football` and/or the relevant club museum.

### When adding a new content bucket that the Curator should know about
1. Author the trilingual data file.
2. Extend `lib/curator/corpus.ts` with a new builder function and register it in `renderCorpusForPrompt`.
3. Verify the model can cite it by asking a grounded question.

### Gotchas
- `process.env.*` is only defined server-side; read inside `.handler()`.
- Server routes under `/api/public/*` bypass auth on published sites — verify caller inside the handler when you introduce them.
- Any statement at the module scope of a route file that references a route component (e.g., `Comp.displayName = ...`) will crash the route at load time — do not add them.
- Layout route components must return `<Outlet />`.

---

## Appendix A — File-count sanity check

- ~37,000 lines of TS/TSX authored (data + UI + libs).
- ~33 page routes, ~50 feature components (excluding shadcn primitives), ~20 shadcn primitives, ~25 lib modules.

## Appendix B — Environments

- **Preview:** `id-preview--4ec5c163-c082-44f1-a21c-176429962830.lovable.app`
- **Published:** `algeria-journey-quest.lovable.app`
- **Custom domain:** `dzodyssey.numeradataworks.com`
- **Runtime:** Cloudflare Workers with `nodejs_compat`.
- **AI endpoint:** `https://ai.gateway.lovable.dev/v1` (Lovable AI Gateway, Google Gemini 2.5 Flash + OpenAI TTS).
