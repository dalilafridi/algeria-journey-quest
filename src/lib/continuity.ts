import type { Localized } from "@/lib/i18n";

const KEY = "algeria-journey-last-place-v1";
const DISMISS_KEY = "algeria-journey-continue-dismissed-session-v1";
const EVT = "journey-continuity-updated";

export type JourneyPlace = {
  section: "story" | "regions" | "words" | "figures";
  label: Localized<string>;
  description?: Localized<string>;
  href: string;
  updatedAt: number;
};

/**
 * Navigation hubs and index pages. Opening one of these is browsing, not
 * meaningfully entering an exhibit, so they never become a saved place.
 */
const HUB_PATHS = new Set([
  "/",
  "/atlas",
  "/map",
  "/figures",
  "/culture",
  "/clubs",
  "/journeys",
  "/passport",
  "/profile",
  "/compare",
  "/lessons",
  "/ideas",
  "/showcase",
]);

/**
 * Institutional and utility pages where the banner is never appropriate,
 * plus the homepage (it renders its own inline variant) and any unmatched
 * URL, which is handled by the caller.
 */
const BANNER_HIDDEN_PATHS = new Set(["/", "/about", "/sources", "/privacy", "/terms"]);

/** Route prefixes that exist in the app. Anything else is stale. */
const KNOWN_EXHIBIT_PATHS = new Set([
  "/timeline",
  "/moments",
  "/words",
  "/cuisine",
  "/cinema",
  "/mzab",
  "/stargazing",
  "/chronicle",
  "/football",
  "/football/lesvertes",
]);
const KNOWN_EXHIBIT_PREFIXES = [
  "/era/",
  "/region/",
  "/culture/",
  "/figures/",
  "/clubs/",
  "/journeys/",
  "/theater/",
  "/quiz/",
];

function normalize(href: string): string {
  const path = href.split("#")[0].split("?")[0];
  if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
  return path;
}

/**
 * True when the href points at a real exhibit page that still exists.
 * Guards against hubs (browsing, not visiting) and against routes that were
 * removed or renamed after the visitor's last session.
 */
export function isExhibitHref(href: string): boolean {
  if (!href || !href.startsWith("/")) return false;
  const path = normalize(href);
  if (HUB_PATHS.has(path)) return false;
  if (KNOWN_EXHIBIT_PATHS.has(path)) return true;
  return KNOWN_EXHIBIT_PREFIXES.some((p) => path.startsWith(p) && path.length > p.length);
}

/** True when the continuity banner must stay hidden on this pathname. */
export function isBannerHiddenPath(pathname: string): boolean {
  return BANNER_HIDDEN_PATHS.has(normalize(pathname));
}

/** True when the saved place is the page the visitor is already reading. */
export function isSamePlace(href: string, pathname: string): boolean {
  return normalize(href) === normalize(pathname);
}

export function saveJourneyPlace(place: Omit<JourneyPlace, "updatedAt">) {
  if (typeof window === "undefined") return;
  // Hubs and index pages do not count as a visited exhibit.
  if (!isExhibitHref(place.href)) return;
  try {
    localStorage.setItem(KEY, JSON.stringify({ ...place, updatedAt: Date.now() }));
    window.dispatchEvent(new Event(EVT));
  } catch {
    /* noop */
  }
}

export function clearJourneyPlace() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* noop */
  }
}

export function getJourneyPlace(): JourneyPlace | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<JourneyPlace> | null;
    // Reject malformed, hub-level, or stale (removed / renamed) entries and
    // purge them so they cannot resurface later.
    if (
      !parsed ||
      typeof parsed.href !== "string" ||
      !parsed.label ||
      typeof parsed.label !== "object" ||
      !isExhibitHref(parsed.href)
    ) {
      clearJourneyPlace();
      return null;
    }
    return parsed as JourneyPlace;
  } catch {
    clearJourneyPlace();
    return null;
  }
}

/** Localized category label shown above the exhibit title. */
export const SECTION_LABELS = {
  story: { en: "Story", fr: "Récit", ar: "الحكاية" },
  regions: { en: "Regions", fr: "Régions", ar: "المناطق" },
  words: { en: "Words", fr: "Mots", ar: "كلمات" },
  figures: { en: "Figures", fr: "Figures", ar: "شخصيات" },
} as const satisfies Record<JourneyPlace["section"], Localized<string>>;

export function isContinueDismissed() {
  if (typeof window === "undefined") return true;
  return sessionStorage.getItem(DISMISS_KEY) === "1";
}

export function dismissContinueCard() {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(DISMISS_KEY, "1");
  window.dispatchEvent(new Event(EVT));
}

export const journeyContinuityEvent = EVT;
