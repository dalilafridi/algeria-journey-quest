import { useEffect, useState } from "react";
import {
  getJourneyPlace,
  journeyContinuityEvent,
  type JourneyPlace,
} from "@/lib/continuity";
import { t, useLang } from "@/lib/i18n";

const COPY = {
  eyebrow: { fr: "Reprendre votre visite", en: "Continue your visit", ar: "تابع زيارتك" },
  resume: { fr: "Reprendre", en: "Resume", ar: "متابعة" },
} as const;

/**
 * Subtle inline continuation card for the homepage.
 * Sits within the page flow below the hero — never above the navigation.
 */
export function ContinueJourneyInline() {
  const lang = useLang();
  const [place, setPlace] = useState<JourneyPlace | null>(null);

  useEffect(() => {
    const update = () => setPlace(getJourneyPlace());
    update();
    window.addEventListener(journeyContinuityEvent, update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener(journeyContinuityEvent, update);
      window.removeEventListener("storage", update);
    };
  }, []);

  if (!place) return null;

  return (
    <section className="mx-auto max-w-3xl px-4 pt-8 sm:pt-10">
      <a
        href={place.href}
        className="group flex items-center gap-4 rounded-2xl border border-border/70 bg-card/70 px-4 py-3 sm:px-5 sm:py-4 transition-colors hover:border-primary/40 hover:bg-card"
      >
        <span
          aria-hidden
          className="text-sm font-bold tracking-[0.22em] uppercase text-muted-foreground/80"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          ⵣ
        </span>
        <div className="min-w-0 flex-1">
          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            {COPY.eyebrow[lang]}
          </div>
          <div
            className="mt-0.5 truncate text-sm sm:text-base font-semibold text-foreground group-hover:text-primary transition-colors"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            {t(place.label, lang)}
          </div>
        </div>
        <span className="shrink-0 text-xs font-semibold text-primary opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 transition">
          {COPY.resume[lang]} →
        </span>
      </a>
    </section>
  );
}
