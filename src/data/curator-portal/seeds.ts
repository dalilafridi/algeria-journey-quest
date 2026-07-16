/**
 * Curator Portal — seed roadmap items derived from the project audit and
 * the Master Blueprint. Phase 1 is read-only; the portal displays these as
 * a governance backlog. They will move into a database in a later phase.
 */

import type { RoadmapItem } from "@/lib/curator-portal/models";

export const ROADMAP_SEED: RoadmapItem[] = [
  {
    id: "auth-phase-2",
    title: "Role-based authentication for the Curator Portal",
    description:
      "Introduce Lovable Cloud auth with a curator role stored in user_roles and gate every /curator route via a server-side beforeLoad.",
    area: "Portal · Security",
    priority: "critical",
    status: "approved",
    effort: "m",
    dependencies: [],
    owner: "Platform",
    targetRelease: "Portal Phase 2",
    acceptance: [
      "Public production build serves /curator/* only to signed-in curators.",
      "user_roles + has_role() migration merged.",
      "Server-side gate replaces the dev-only client gate.",
    ],
  },
  {
    id: "sources-model",
    title: "Structured source metadata across all exhibits",
    description:
      "Author a shared Source record per exhibit (primary/academic/museum/archive) and back-reference from ContentRecord.",
    area: "Governance · Sources",
    priority: "high",
    status: "proposed",
    effort: "l",
    dependencies: ["auth-phase-2"],
    acceptance: ["Every era, region and figure carries at least two verified sources."],
  },
  {
    id: "media-library",
    title: "First-party media library with rights & alt-text",
    description:
      "Create a MediaAsset store recording rights holder, license, attribution, alt-text (en/fr/ar), and authenticity tag.",
    area: "Governance · Media",
    priority: "high",
    status: "proposed",
    effort: "l",
    dependencies: ["auth-phase-2"],
  },
  {
    id: "club-museums-expand",
    title: "Populate remaining Club Museums",
    description:
      "Move MCA, ESS, USMA, CRB, MCO and PAC from placeholder to complete using the JSK template.",
    area: "Content · Football",
    priority: "medium",
    status: "researching",
    effort: "xl",
    dependencies: ["sources-model"],
  },
  {
    id: "match-theater-more",
    title: "Additional Match Theater experiences",
    description:
      "Egypt 1989, Italia 90, Slimani vs Korea 2014, USSR-era matches. Reuse the existing TheaterShell + data model.",
    area: "Content · Football",
    priority: "medium",
    status: "proposed",
    effort: "l",
  },
  {
    id: "mobile-audit",
    title: "Mobile parity audit across every museum route",
    description:
      "Walk every public route on 360×640, 390×844 and iPad; log any layout, tap-target or motion issues.",
    area: "Quality · Mobile",
    priority: "high",
    status: "proposed",
    effort: "m",
  },
  {
    id: "a11y-audit",
    title: "Accessibility audit with axe + manual keyboard pass",
    description:
      "Run automated and manual audits; catalogue findings as ReviewTasks; ship remediations by wing.",
    area: "Quality · Accessibility",
    priority: "high",
    status: "proposed",
    effort: "m",
  },
  {
    id: "curator-corpus-freshness",
    title: "Regenerate Ask-the-Curator corpus on every content change",
    description:
      "Add a build-time check that verifies getCuratorCorpus() covers all ContentRecord ids.",
    area: "AI · Grounding",
    priority: "medium",
    status: "proposed",
    effort: "s",
  },
  {
    id: "portal-database",
    title: "Move portal entities to Lovable Cloud tables",
    description:
      "Introduce content_records, sources, media_assets, roadmap_items, decisions, releases, quality_reviews and coverage_metrics tables.",
    area: "Portal · Data",
    priority: "high",
    status: "proposed",
    effort: "xl",
    dependencies: ["auth-phase-2"],
  },
];

export const IDEA_LAB_SEED: RoadmapItem[] = [
  {
    id: "idea-native-mobile",
    title: "Native mobile app (iOS / Android)",
    description: "Wrap the museum in a native shell with offline caching and push notifications.",
    area: "Platform",
    priority: "medium",
    status: "proposed",
    effort: "xl",
    isIdea: true,
    dependencies: [],
  },
  {
    id: "idea-offline",
    title: "Offline museum mode",
    description: "Cache eras, figures, regions, cuisine and journeys for offline exploration.",
    area: "Platform · PWA",
    priority: "medium",
    status: "proposed",
    effort: "l",
    isIdea: true,
    dependencies: [],
  },
  {
    id: "idea-gps-walks",
    title: "GPS heritage walks in Algerian cities",
    description: "Location-aware audio walks for Algiers, Tlemcen, Constantine, Ghardaïa, Timgad.",
    area: "Experience",
    priority: "low",
    status: "proposed",
    effort: "xl",
    isIdea: true,
    dependencies: [],
  },
  {
    id: "idea-ar",
    title: "Augmented-reality artefact viewer",
    description: "Point a phone at a QR label in a partner museum and unlock the digital exhibit.",
    area: "Experience · AR",
    priority: "low",
    status: "proposed",
    effort: "xl",
    isIdea: true,
    dependencies: [],
  },
  {
    id: "idea-vr-rooms",
    title: "Virtual museum rooms",
    description: "3D navigable rooms per era with narrated ambience.",
    area: "Experience · 3D",
    priority: "low",
    status: "proposed",
    effort: "xl",
    isIdea: true,
    dependencies: [],
  },
  {
    id: "idea-school-mode",
    title: "School mode",
    description: "Curated learning paths and printable worksheets for teachers.",
    area: "Education",
    priority: "medium",
    status: "proposed",
    effort: "l",
    isIdea: true,
    dependencies: [],
  },
  {
    id: "idea-family-mode",
    title: "Family mode",
    description: "Simplified language, playful visuals, parent-child journeys.",
    area: "Education",
    priority: "low",
    status: "proposed",
    effort: "m",
    isIdea: true,
    dependencies: [],
  },
  {
    id: "idea-architecture-wing",
    title: "Architecture wing",
    description: "Kasbahs, ksour, mosques, colonial architecture, contemporary.",
    area: "Content",
    priority: "medium",
    status: "proposed",
    effort: "l",
    isIdea: true,
    dependencies: [],
  },
  {
    id: "idea-literature-wing",
    title: "Literature wing",
    description: "From Apuleius to Assia Djebar and beyond.",
    area: "Content",
    priority: "medium",
    status: "proposed",
    effort: "l",
    isIdea: true,
    dependencies: [],
  },
  {
    id: "idea-music-timeline",
    title: "Music timeline",
    description: "Chaabi, Andalusi, Raï, Kabyle song, contemporary Algerian music.",
    area: "Content",
    priority: "medium",
    status: "proposed",
    effort: "m",
    isIdea: true,
    dependencies: [],
  },
  {
    id: "idea-archaeology-wing",
    title: "Archaeology wing",
    description: "Timgad, Djémila, Tipasa, Cirta, rock art of Tassili.",
    area: "Content",
    priority: "medium",
    status: "proposed",
    effort: "l",
    isIdea: true,
    dependencies: [],
  },
  {
    id: "idea-other-sports",
    title: "Other sports museums",
    description: "Reuse the Hall of Football architecture for athletics, boxing, handball, judo, chess.",
    area: "Content",
    priority: "low",
    status: "proposed",
    effort: "xl",
    isIdea: true,
    dependencies: [],
  },
  {
    id: "idea-knowledge-graph",
    title: "Interactive knowledge graph",
    description: "Explore the museum as a graph of figures, eras, regions and events.",
    area: "Experience · Discovery",
    priority: "low",
    status: "proposed",
    effort: "xl",
    isIdea: true,
    dependencies: [],
  },
];

// -------------------------------------------------------------------- //

import type { DecisionRecord, ReleaseRecord } from "@/lib/curator-portal/models";

export const DECISIONS_SEED: DecisionRecord[] = [
  {
    id: "ADR-001",
    date: "2025-01",
    title: "Digital museum experience, not encyclopedia",
    status: "accepted",
    context:
      "DZ Odyssey exists to make Algerian history feel emotionally alive, not to compete with Wikipedia.",
    decision:
      "Every exhibit is authored as narrative wall-text with a curator voice; no bulk fact dumps.",
    alternatives: [
      "Encyclopedia-style long entries",
      "External data feed of pre-existing articles",
    ],
    consequences: [
      "Content authoring is slower and more curated.",
      "Every page requires editorial review.",
    ],
    related: ["src/data/eras.ts", "src/data/figures.ts"],
  },
  {
    id: "ADR-002",
    date: "2025-02",
    title: "Content authored as typed TypeScript",
    status: "accepted",
    context: "Phase 1 needed rich trilingual content without a backend.",
    decision:
      "Source-of-truth for content lives in src/data/*.ts as typed constants until Phase 2 introduces a database.",
    alternatives: ["Headless CMS from day one", "Markdown files with front-matter"],
    consequences: [
      "Type-safety at the compiler level.",
      "Non-technical editors cannot yet author directly.",
    ],
    related: ["src/data/"],
  },
  {
    id: "ADR-003",
    date: "2025-02",
    title: "English, French and Arabic as core languages",
    status: "accepted",
    context: "The museum addresses Algerian audiences at home and in the diaspora.",
    decision: "Every LocalizedString ships { en, fr, ar }; RTL is respected for Arabic.",
    alternatives: ["English + French only", "Add Tamazight later"],
    consequences: [
      "Every content record has three quality gates.",
      "Tamazight is a candidate for a future addition.",
    ],
    related: ["src/lib/i18n.ts"],
  },
  {
    id: "ADR-004",
    date: "2025-05",
    title: "Ask the Curator is grounded only in museum content",
    status: "accepted",
    context: "The AI must never fabricate Algerian history.",
    decision:
      "The Curator uses a grounded corpus built from museum data files; every answer must cite a corpus id.",
    alternatives: ["Free LLM chat", "External web-search retrieval"],
    consequences: [
      "The Curator will refuse questions outside the corpus.",
      "Corpus freshness now blocks content quality.",
    ],
    related: ["src/lib/curator/corpus.ts", "src/routes/api/curator.ts"],
  },
  {
    id: "ADR-005",
    date: "2026-06",
    title: "Club Museums live under Football",
    status: "accepted",
    context:
      "Clubs were originally exposed at the top level, competing with Football and diluting navigation.",
    decision:
      "Clubs is a submenu under Football on desktop and an accordion on mobile.",
    alternatives: ["Keep Clubs top-level", "Nest Football under Sports"],
    consequences: ["Cleaner IX.", "Deep links to /clubs/* still work."],
    related: ["src/components/Header.tsx"],
  },
  {
    id: "ADR-006",
    date: "2026-06",
    title: "Match Theater built as reusable architecture",
    status: "accepted",
    context: "Historic matches deserve a first-class immersive format.",
    decision:
      "TheaterShell + typed MatchTheater data is a reusable engine; new matches are pure data additions.",
    alternatives: ["Bespoke pages per match"],
    consequences: [
      "Consistent experience across matches.",
      "Adding a match is a data file, not a UI project.",
    ],
    related: ["src/components/theater/", "src/data/matchTheater/"],
  },
  {
    id: "ADR-007",
    date: "2026-07",
    title: "MCP is not required for the mobile-app roadmap",
    status: "accepted",
    context:
      "The mobile roadmap is authored inside the repository, not through the Model Context Protocol.",
    decision: "Portal Phase 1 ships without MCP; roadmap and blueprint live in the repo.",
    alternatives: ["Introduce MCP tools immediately"],
    consequences: [
      "Portal remains self-contained.",
      "MCP can be introduced later without redesigning Phase 1.",
    ],
    related: [".lovable/plan.md", "PROJECT_AUDIT.md"],
  },
];

export const RELEASES_SEED: ReleaseRecord[] = [
  {
    version: "portal-0.1.0",
    date: "unreleased",
    title: "Curator Portal — Phase 1 foundation",
    added: [
      "Internal /curator route group with executive dashboard, content inventory, coverage, sources, media, quality, roadmap, releases, decisions, technical health, blueprint and settings pages.",
      "Portal-scoped design tokens beneath [data-portal=\"curator\"].",
      "TypeScript models for future portal entities (ContentRecord, SourceRecord, MediaAsset, RoadmapItem, DecisionRecord, ReleaseRecord, QualityReview, CoverageMetric, Contributor, ReviewTask).",
    ],
    changed: [],
    fixed: [],
    content: [],
    accessibility: [
      "Skip link, keyboard-navigable sidebar and mobile drawer, aria-current, focus rings, reduced-motion friendly.",
    ],
    technical: [
      "Dev-only gate — /curator returns 404 on production builds until Phase-2 auth is introduced.",
    ],
    knownLimitations: [
      "No editing yet; every quick action is disabled.",
      "Source and media counts fall back to 0 where the current data files do not track them.",
      "Accessibility and mobile-readiness scores are estimated baselines, not measured.",
    ],
  },
  {
    version: "clubs-1.0.0",
    date: "2026-06",
    title: "Club Museums — JS Kabylie flagship + reusable architecture",
    added: ["/clubs and /clubs/$clubId", "JSK Museum content", "Six coming-soon placeholders"],
    changed: ["Football hero adds Club Museums CTA"],
    fixed: [],
    content: ["JSK full history, trophies, legends, culture"],
    accessibility: [],
    technical: [],
    knownLimitations: [],
  },
  {
    version: "theater-1.0.0",
    date: "2026-06",
    title: "Match Theater — Gijón 1982",
    added: [
      "/theater/$matchId route with immersive TheaterShell",
      "Reusable data-driven architecture",
    ],
    changed: [],
    fixed: [],
    content: ["Algeria 2–1 West Germany, 1982"],
    accessibility: ["Reduced-motion path"],
    technical: [],
    knownLimitations: [],
  },
  {
    version: "football-1.0.0",
    date: "2026-05",
    title: "Hall of Algerian Football",
    added: [
      "/football museum wing",
      "Legends, stadiums, matches, culture, trophies",
    ],
    changed: [],
    fixed: [],
    content: [],
    accessibility: [],
    technical: [],
    knownLimitations: [],
  },
  {
    version: "curator-1.0.0",
    date: "2026-04",
    title: "Ask the Curator",
    added: [
      "Grounded assistant with corpus built from museum data",
      "Streaming responses",
    ],
    changed: [],
    fixed: [],
    content: [],
    accessibility: [],
    technical: [],
    knownLimitations: [],
  },
  {
    version: "audio-1.0.0",
    date: "2026-03",
    title: "Audio Guide",
    added: ["Per-exhibit narration", "Mini-player"],
    changed: [],
    fixed: [],
    content: [],
    accessibility: ["Screen-reader friendly controls"],
    technical: [],
    knownLimitations: [],
  },
];

export interface BlueprintSection {
  id: string;
  title: string;
  summary: string;
  bullets: string[];
}

export const BLUEPRINT_SEED: BlueprintSection[] = [
  {
    id: "vision",
    title: "Vision",
    summary:
      "DZ Odyssey is a cinematic, cultural, Algerian digital museum — never a game, never a quiz app in disguise.",
    bullets: [
      "Emotional exploration over encyclopedic listing.",
      "Trilingual by default (EN · FR · AR).",
      "Museum-grade craft in typography, motion and voice.",
    ],
  },
  {
    id: "principles",
    title: "Museum principles",
    summary: "Six principles guide every exhibit.",
    bullets: [
      "Wall-text voice — a curator, not a database.",
      "Bronze medallions instead of flat UI icons.",
      "Restrained gamification — no coins, no streaks.",
      "Sources over speculation.",
      "Respect for Algerian regions, languages and communities.",
      "Accessibility as a first-class concern.",
    ],
  },
  {
    id: "product-map",
    title: "Product map",
    summary: "The public museum today.",
    bullets: [
      "Eras · Figures · Regions · Culture · Cuisine · Cinema",
      "Hall of Football · Match Theater · Club Museums",
      "Journeys · Passport · Curator · Audio guide",
    ],
  },
  {
    id: "content-standards",
    title: "Content standards",
    summary: "How exhibits are written.",
    bullets: [
      "Every LocalizedString ships EN + FR + AR.",
      "Every claim ties back to a source.",
      "Curator voice — cinematic, calm, cultural.",
    ],
  },
  {
    id: "design-system",
    title: "Design system",
    summary: "Warm parchment palette; charcoal ink, sand, terracotta, olive, soft gold.",
    bullets: [
      "ⵣ appears tastefully, never oversized.",
      "Portal uses deep emerald / midnight green / ivory / antique gold.",
      "Semantic tokens only — no hardcoded colors in components.",
    ],
  },
  {
    id: "ai-governance",
    title: "AI governance",
    summary: "The Curator only answers from the grounded corpus.",
    bullets: [
      "No fabrication of Algerian history.",
      "Corpus mirrors the site content — freshness is a release concern.",
      "TTS goes through the Lovable AI Gateway.",
    ],
  },
  {
    id: "technical-standards",
    title: "Technical standards",
    summary: "TanStack Start · React 19 · Vite 7 · Cloudflare Workers.",
    bullets: [
      "File-based routing; no src/pages.",
      "Server code lives in .server.ts or *.functions.ts.",
      "No native-only Node packages on the Worker.",
    ],
  },
  {
    id: "mobile-roadmap",
    title: "Mobile roadmap",
    summary: "Every wing must feel great on 360×640 before it ships.",
    bullets: [
      "Native shell candidate deferred to Idea Lab.",
      "PWA offline candidate under evaluation.",
      "Reduced-motion honored across immersive experiences.",
    ],
  },
  {
    id: "living-backlog",
    title: "Living backlog",
    summary: "Portal Roadmap page is the source of truth for approved work.",
    bullets: [
      "Idea Lab keeps visionary items separate.",
      "Each idea has a clear path to approval.",
    ],
  },
  {
    id: "decision-log",
    title: "Decision log",
    summary: "Architectural and product decisions recorded as ADRs.",
    bullets: [
      "Seven decisions recorded as of Portal Phase 1.",
      "New decisions get an ADR before code lands.",
    ],
  },
  {
    id: "missing-items",
    title: "Missing items",
    summary: "Known gaps to fill.",
    bullets: [
      "Structured sources on figures / regions / eras.",
      "MediaAsset store with rights and alt-text.",
      "Automated test suite.",
      "Additional Club Museums beyond JSK.",
    ],
  },
];
