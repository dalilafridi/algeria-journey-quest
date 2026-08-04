import { useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  dismissContinueCard,
  getJourneyPlace,
  isBannerHiddenPath,
  isContinueDismissed,
  isSamePlace,
  journeyContinuityEvent,
  SECTION_LABELS,
  type JourneyPlace,
} from "@/lib/continuity";
import { t, useLang } from "@/lib/i18n";

const COPY = {
  title: {
    fr: "Reprendre là où vous vous êtes arrêté",
    en: "Continue where you left off",
    ar: "تابع من حيث توقفت",
  },
  close: { fr: "Masquer", en: "Dismiss", ar: "إخفاء" },
} as const;

/**
 * Shared continuity banner. Centralized visibility rules:
 * hidden on the homepage, the 404 screen, the institutional pages, when the
 * saved place is the current page, when nothing valid is stored, and once
 * dismissed for the session. Sits in normal page flow above the route body,
 * so it never covers a heading, the skip link, or the mobile dock.
 */
export function ContinueJourneyCard() {
  const lang = useLang();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [place, setPlace] = useState<JourneyPlace | null>(null);
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    const update = () => {
      setDismissed(isContinueDismissed());
      setPlace(getJourneyPlace());
    };
    update();
    window.addEventListener(journeyContinuityEvent, update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener(journeyContinuityEvent, update);
      window.removeEventListener("storage", update);
    };
  }, []);

  if (!place || dismissed) return null;
  if (isBannerHiddenPath(pathname)) return null;
  if (isSamePlace(place.href, pathname)) return null;

  const category = t(SECTION_LABELS[place.section] ?? SECTION_LABELS.story, lang);

  return (
    <aside
      data-continue-card
      className="continue-card px-4 pt-3 sm:pt-4 animate-fade-in"
      aria-label={t(COPY.title, lang)}
    >
      <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card/95 p-3 sm:p-4 shadow-sm">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 text-xl" aria-hidden>
            ✨
          </span>
          <a href={place.href} className="min-w-0 flex-1 group text-start">
            <div className="text-xs font-bold uppercase tracking-wider text-primary">
              {t(COPY.title, lang)}
            </div>
            <div className="mt-1 text-sm sm:text-base font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
              <span className="text-muted-foreground">{category}</span>
              <span aria-hidden className="mx-1.5 text-muted-foreground/60">
                ·
              </span>
              {t(place.label, lang)}
            </div>
            {place.description && (
              <p className="mt-1 max-w-prose text-xs sm:text-sm leading-relaxed text-muted-foreground">
                {t(place.description, lang)}
              </p>
            )}
          </a>
          <button
            type="button"
            onClick={() => {
              dismissContinueCard();
              setDismissed(true);
            }}
            className="rounded-full px-2 py-1 text-xs font-semibold text-muted-foreground hover:bg-muted hover:text-foreground transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            aria-label={t(COPY.close, lang)}
          >
            <span aria-hidden>×</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
