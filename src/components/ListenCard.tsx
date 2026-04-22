import { useEffect, useRef, useState } from "react";
import { t, type Lang, type LocalizedString } from "@/lib/i18n";

export type ListenItem = {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  /** Direct audio URL (mp3/ogg). Keep it short and culturally meaningful. */
  src: string;
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
const PAUSE_LABEL: Record<Lang, string> = { en: "Pause", fr: "Pause", ar: "إيقاف" };
const ERROR_LABEL: Record<Lang, string> = {
  en: "Audio unavailable right now.",
  fr: "Audio indisponible pour le moment.",
  ar: "الصوت غير متاح حاليًا.",
};

/**
 * Minimal, museum-like audio card.
 * One play/pause control, no playlist, no autoplay.
 * Designed to be reused later for cultural songs and spoken quotes.
 */
export function ListenCard({ item, lang }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0..1
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => {
      if (a.duration > 0) setProgress(a.currentTime / a.duration);
    };
    const onEnd = () => {
      setPlaying(false);
      setProgress(0);
    };
    const onErr = () => {
      setErrored(true);
      setPlaying(false);
    };
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("ended", onEnd);
    a.addEventListener("error", onErr);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("ended", onEnd);
      a.removeEventListener("error", onErr);
    };
  }, []);

  // Pause on unmount
  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a || errored) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      a.play()
        .then(() => setPlaying(true))
        .catch(() => setErrored(true));
    }
  };

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
        <button
          type="button"
          onClick={toggle}
          disabled={errored}
          aria-label={playing ? PAUSE_LABEL[lang] : PLAY_LABEL[lang]}
          aria-pressed={playing}
          className={
            "shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition active:scale-95 " +
            (errored
              ? "bg-muted text-muted-foreground cursor-not-allowed"
              : "bg-primary text-primary-foreground hover:opacity-90")
          }
          style={!errored ? { boxShadow: "var(--shadow-soft)" } : undefined}
        >
          {playing ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M8 5.5v13a1 1 0 0 0 1.55.83l10-6.5a1 1 0 0 0 0-1.66l-10-6.5A1 1 0 0 0 8 5.5z" />
            </svg>
          )}
        </button>

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
            {errored ? ERROR_LABEL[lang] : t(item.description, lang)}
          </p>

          {/* Subtle progress bar */}
          {!errored && (
            <div className="mt-2.5 h-1 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full transition-all duration-200"
                style={{
                  width: `${Math.max(0, Math.min(100, progress * 100))}%`,
                  background: "var(--gradient-warm, currentColor)",
                }}
              />
            </div>
          )}
        </div>
      </div>

      <audio ref={audioRef} src={item.src} preload="none" />
    </section>
  );
}
