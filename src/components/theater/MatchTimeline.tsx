/**
 * MatchTimeline — interactive minute-by-minute scrubber.
 *
 * A11y:
 *   - The scrubber is a <input type="range"> so screen readers announce
 *     minute changes and keyboard users get ← → out of the box.
 *   - Event chips are focusable buttons that jump the scrubber to a minute.
 *   - An aria-live region announces the most recent event as the minute
 *     advances so blind users experience the timeline events as they occur.
 *
 * Persistence: minute changes bubble up via onMinuteChange; the parent
 * route persists them (see src/lib/matchTheaterState.ts).
 */

import { useEffect, useMemo, useRef, useState } from "react";

import { useLang, type LocalizedString } from "@/lib/i18n";
import type { MatchEvent, MatchEventKind, MatchTheater } from "@/data/matchTheater/types";
import { THEATER_SERIF as SERIF } from "./TheaterShell";

const T = {
  play: { en: "Play", fr: "Lecture", ar: "تشغيل" },
  pause: { en: "Pause", fr: "Pause", ar: "إيقاف مؤقّت" },
  back: { en: "Back one minute", fr: "Reculer d'une minute", ar: "الرجوع دقيقة" },
  forward: { en: "Forward one minute", fr: "Avancer d'une minute", ar: "التقدّم دقيقة" },
  minute: { en: "Minute", fr: "Minute", ar: "الدقيقة" },
  keyMoments: { en: "Key moments", fr: "Moments clés", ar: "لحظات فارقة" },
  scrubber: { en: "Match minute scrubber", fr: "Curseur des minutes du match", ar: "شريط دقائق المباراة" },
} as const;

const KIND_LABEL: Record<MatchEventKind, LocalizedString> = {
  kickoff: { en: "Kick-off", fr: "Coup d'envoi", ar: "بداية المباراة" },
  goal: { en: "Goal", fr: "But", ar: "هدف" },
  chance: { en: "Chance", fr: "Occasion", ar: "فرصة" },
  save: { en: "Save", fr: "Arrêt", ar: "تصدّي" },
  "yellow-card": { en: "Yellow card", fr: "Carton jaune", ar: "بطاقة صفراء" },
  "red-card": { en: "Red card", fr: "Carton rouge", ar: "بطاقة حمراء" },
  substitution: { en: "Substitution", fr: "Remplacement", ar: "تبديل" },
  tactical: { en: "Tactical", fr: "Tactique", ar: "خطط" },
  halftime: { en: "Half-time", fr: "Mi-temps", ar: "الاستراحة" },
  fulltime: { en: "Full-time", fr: "Fin du match", ar: "نهاية المباراة" },
};

const KIND_GLYPH: Record<MatchEventKind, string> = {
  kickoff: "○",
  goal: "●",
  chance: "◦",
  save: "◇",
  "yellow-card": "▮",
  "red-card": "▮",
  substitution: "⇄",
  tactical: "◈",
  halftime: "½",
  fulltime: "‖",
};

function tt(v: LocalizedString | undefined, lang: "en" | "fr" | "ar"): string {
  if (!v) return "";
  return typeof v === "string" ? v : (v[lang] ?? v.en);
}

const MAX_MINUTE = 90;

export function MatchTimeline({
  match,
  minute,
  onMinuteChange,
  onEventSelect,
}: {
  match: MatchTheater;
  minute: number;
  onMinuteChange: (m: number) => void;
  onEventSelect: (e: MatchEvent) => void;
}) {
  const lang = useLang();
  const [playing, setPlaying] = useState(false);
  const timerRef = useRef<number | null>(null);
  const [lastAnnounced, setLastAnnounced] = useState<string>("");

  useEffect(() => {
    if (!playing) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const stepMs = reduce ? 400 : 260;
    timerRef.current = window.setInterval(() => {
      onMinuteChange(Math.min(MAX_MINUTE, minuteRef.current + 1));
    }, stepMs);
    return () => {
      if (timerRef.current != null) window.clearInterval(timerRef.current);
    };
  }, [playing, onMinuteChange]);

  // Keep the interval callback reading the latest minute without resetting.
  const minuteRef = useRef(minute);
  useEffect(() => {
    minuteRef.current = minute;
  }, [minute]);

  // Auto-stop at full-time.
  useEffect(() => {
    if (minute >= MAX_MINUTE && playing) setPlaying(false);
  }, [minute, playing]);

  // aria-live announcement for the most recent event at or before `minute`.
  const currentEvent = useMemo(
    () => [...match.events].reverse().find((e) => e.minute <= minute),
    [match.events, minute],
  );
  useEffect(() => {
    if (!currentEvent) return;
    const label = `${currentEvent.minute}' — ${tt(currentEvent.label, lang)}`;
    if (label !== lastAnnounced) setLastAnnounced(label);
  }, [currentEvent, lang, lastAnnounced]);

  const eventChips = useMemo(
    () =>
      match.events.filter(
        (e) => e.kind === "goal" || e.kind === "substitution" || e.kind === "halftime" || e.kind === "fulltime",
      ),
    [match.events],
  );

  const homeAccent = match.teams.home.colors.primary;
  const awayAccent = match.teams.away.colors.primary;

  return (
    <section
      aria-label={tt(T.scrubber, lang)}
      className="mx-auto w-full max-w-4xl px-4 sm:px-6"
    >
      <div className="rounded-2xl border border-white/15 bg-black/40 p-4 backdrop-blur sm:p-5">
        {/* Scrubber */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onMinuteChange(Math.max(0, minute - 1))}
            aria-label={T.back[lang]}
            className="rounded-full border border-white/25 bg-white/5 px-2.5 py-1 text-sm text-white/85 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c9a24a]"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? T.pause[lang] : T.play[lang]}
            className="rounded-full bg-[#c9a24a] px-4 py-1.5 text-sm font-semibold text-black hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c9a24a]"
            style={SERIF}
          >
            {playing ? "❚❚" : "▶"}
          </button>
          <button
            type="button"
            onClick={() => onMinuteChange(Math.min(MAX_MINUTE, minute + 1))}
            aria-label={T.forward[lang]}
            className="rounded-full border border-white/25 bg-white/5 px-2.5 py-1 text-sm text-white/85 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c9a24a]"
          >
            ›
          </button>
          <div className="ms-auto font-mono text-lg text-white" style={SERIF}>
            {minute}&apos;
          </div>
        </div>

        <div className="relative mt-4">
          {/* Event dot markers */}
          <div className="pointer-events-none absolute left-0 right-0 top-1/2 h-4 -translate-y-1/2">
            {match.events.map((e) => {
              const pct = (Math.min(MAX_MINUTE, e.minute) / MAX_MINUTE) * 100;
              const color =
                e.side === "home" ? homeAccent : e.side === "away" ? awayAccent : "#c9a24a";
              return (
                <span
                  key={e.id}
                  aria-hidden
                  className="absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{ left: `${pct}%`, background: color, opacity: 0.9 }}
                />
              );
            })}
          </div>
          <input
            type="range"
            min={0}
            max={MAX_MINUTE}
            step={1}
            value={minute}
            onChange={(e) => onMinuteChange(parseInt(e.target.value, 10))}
            aria-label={T.scrubber[lang]}
            aria-valuemin={0}
            aria-valuemax={MAX_MINUTE}
            aria-valuenow={minute}
            className="w-full accent-[#c9a24a]"
          />
        </div>

        {/* Key moments */}
        <div className="mt-4">
          <div className="mb-2 text-[10px] uppercase tracking-[0.28em] text-white/55" style={SERIF}>
            {T.keyMoments[lang]}
          </div>
          <div className="flex flex-wrap gap-2">
            {eventChips.map((e) => (
              <button
                key={e.id}
                type="button"
                onClick={() => {
                  onMinuteChange(e.minute);
                  onEventSelect(e);
                }}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-2.5 py-1 text-xs text-white/85 transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c9a24a]"
                style={SERIF}
                aria-label={`${e.minute}' — ${tt(KIND_LABEL[e.kind], lang)} — ${tt(e.label, lang)}`}
              >
                <span aria-hidden className="text-[#c9a24a]">{KIND_GLYPH[e.kind]}</span>
                <span className="font-mono opacity-70">{e.minute}&apos;</span>
                <span className="truncate max-w-[10rem]">{tt(e.label, lang)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* aria-live announcer */}
        <div aria-live="polite" className="sr-only">
          {lastAnnounced}
        </div>
      </div>
    </section>
  );
}

export { KIND_LABEL, KIND_GLYPH };
