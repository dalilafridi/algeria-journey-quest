import { useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { dismissContinueCard, getJourneyPlace, isContinueDismissed, journeyContinuityEvent, type JourneyPlace } from "@/lib/continuity";
import { t, useLang } from "@/lib/i18n";

const COPY = {
  title: { fr: "Reprendre votre voyage", en: "Continue your journey", ar: "تابع رحلتك" },
  close: { fr: "Masquer", en: "Dismiss", ar: "إخفاء" },
} as const;

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

  if (!place || dismissed || place.href.split("#")[0] === pathname) return null;

  return (
    <aside data-continue-card className="continue-card px-4 pt-3 sm:pt-4 animate-fade-in" aria-label={COPY.title[lang]}>
      <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card/95 p-3 sm:p-4 shadow-sm">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 text-xl" aria-hidden>✨</span>
          <a href={place.href} className="min-w-0 flex-1 group">
            <div className="text-xs font-bold uppercase tracking-wider text-primary">{COPY.title[lang]}</div>
            <div className="mt-1 text-sm sm:text-base font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
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
            className="rounded-full px-2 py-1 text-xs font-semibold text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            aria-label={COPY.close[lang]}
          >
            ×
          </button>
        </div>
      </div>
    </aside>
  );
}