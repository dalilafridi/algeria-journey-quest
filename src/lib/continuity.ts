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

export function saveJourneyPlace(place: Omit<JourneyPlace, "updatedAt">) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY, JSON.stringify({ ...place, updatedAt: Date.now() }));
    window.dispatchEvent(new Event(EVT));
  } catch {
    /* noop */
  }
}

export function getJourneyPlace(): JourneyPlace | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as JourneyPlace;
  } catch {
    return null;
  }
}

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