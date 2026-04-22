import { useState } from "react";
import { t, type Lang, type LocalizedString } from "@/lib/i18n";

export type ListenItem = {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  /** YouTube video id, e.g. "xxxxxxxxxxx". Preferred source. */
  youtubeId?: string;
  /** Optional direct audio URL fallback (mp3/ogg). */
  src?: string;
  /** Optional emoji/icon. Defaults to 🎧. */
  emoji?: string;
};

type Props = {
  item: ListenItem;
  lang: Lang;
};

const SECTION_LABEL: Record<Lang, string> = {
  en: "Listen & Feel",
  fr: "Écouter & Ressentir",
  ar: "استمع واشعر",
};

const PLAY_LABEL: Record<Lang, string> = { en: "Play", fr: "Écouter", ar: "تشغيل" };
const UNAVAILABLE_LABEL: Record<Lang, string> = {
  en: "Audio not available",
  fr: "Audio non disponible",
  ar: "الصوت غير متاح",
};

/**
 * Minimal, museum-like audio card.
 * Click the play button to reveal an embedded YouTube player (no autoplay
 * until user interaction; once revealed, it auto-plays inside the iframe).
 */
export function ListenCard({ item, lang }: Props) {
  const [revealed, setRevealed] = useState(false);

  const hasSource = Boolean(item.youtubeId || item.src);

  return (
    <section
      className="rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-4 sm:p-5"
      aria-label={SECTION_LABEL[lang]}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-base" aria-hidden>
          🎧
        </span>
        <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
          {SECTION_LABEL[lang]}
        </h3>
      </div>

      <div className="flex items-start gap-3 sm:gap-4">
        {!revealed && (
          <button
            type="button"
            onClick={() => hasSource && setRevealed(true)}
            disabled={!hasSource}
            aria-label={PLAY_LABEL[lang]}
            className={
              "shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition active:scale-95 " +
              (!hasSource
                ? "bg-muted text-muted-foreground cursor-not-allowed"
                : "bg-primary text-primary-foreground hover:opacity-90")
            }
            style={hasSource ? { boxShadow: "var(--shadow-soft)" } : undefined}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M8 5.5v13a1 1 0 0 0 1.55.83l10-6.5a1 1 0 0 0 0-1.66l-10-6.5A1 1 0 0 0 8 5.5z" />
            </svg>
          </button>
        )}

        <div className="min-w-0 flex-1">
          <div className="text-sm sm:text-base font-semibold text-foreground leading-snug">
            {item.emoji && (
              <span className="me-1.5" aria-hidden>
                {item.emoji}
              </span>
            )}
            {t(item.title, lang)}
          </div>
          <p className="mt-1 text-xs sm:text-[13px] text-muted-foreground leading-relaxed">
            {hasSource ? t(item.description, lang) : UNAVAILABLE_LABEL[lang]}
          </p>
        </div>
      </div>

      {revealed && item.youtubeId && (
        <div className="mt-4 space-y-2">
          <div className="rounded-xl overflow-hidden border border-border bg-black/5">
            <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>
              <iframe
                src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                title={t(item.title, lang)}
                loading="lazy"
                allow="accelerometer; autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
          <a
            href={`https://www.youtube.com/watch?v=${item.youtubeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-[11px] text-muted-foreground hover:text-foreground underline underline-offset-2"
          >
            {lang === "fr" ? "Ouvrir sur YouTube" : lang === "ar" ? "افتح على يوتيوب" : "Open on YouTube"}
          </a>
        </div>
      )}

      {revealed && !item.youtubeId && item.src && (
        <audio
          className="mt-3 w-full"
          src={item.src}
          controls
          autoPlay
          preload="metadata"
        />
      )}
    </section>
  );
}
