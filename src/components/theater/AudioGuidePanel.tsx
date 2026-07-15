/**
 * AudioGuidePanel — museum narration for the Match Theater experience.
 *
 * Reuses the app-wide AudioGuideProvider (which drives the mini player,
 * MediaSession lock-screen controls, and TTS via the existing server
 * function). Narration text is authored per-language in the match data
 * and NEVER invented from crowd/commentary sources. The active narration
 * segment is highlighted; a transcript is always available.
 */

import { useMemo, useState } from "react";

import { useAudioGuide, type AudioGuide } from "@/lib/audioGuide";
import { useLang, type Lang, type LocalizedString } from "@/lib/i18n";
import type { MatchTheater, NarrationSegment } from "@/data/matchTheater/types";
import { THEATER_SERIF as SERIF } from "./TheaterShell";

const T = {
  heading: { en: "Audio guide", fr: "Guide audio", ar: "الدليل الصوتي" },
  play: { en: "Play narration", fr: "Écouter la narration", ar: "استمع للسرد" },
  pause: { en: "Pause", fr: "Pause", ar: "إيقاف" },
  resume: { en: "Resume", fr: "Reprendre", ar: "استكمال" },
  restart: { en: "Restart", fr: "Recommencer", ar: "إعادة" },
  transcript: { en: "Transcript", fr: "Transcription", ar: "النصّ المكتوب" },
  captions: { en: "Captions", fr: "Sous-titres", ar: "التعليقات" },
  speed: { en: "Speed", fr: "Vitesse", ar: "السرعة" },
  optional: {
    en: "Optional. Audio never plays automatically.",
    fr: "Facultatif. L'audio ne démarre jamais automatiquement.",
    ar: "اختياري. لا يبدأ الصوت تلقائيّاً أبداً.",
  },
  disclaimer: {
    en: "Narration is generated from verified exhibit content. No invented quotes, crowd reactions or commentary.",
    fr: "La narration est générée à partir du contenu vérifié de l'exposition. Aucune citation, réaction du public ou commentaire n'est inventé.",
    ar: "السرد مُنتَج انطلاقاً من محتوى المعرض الموثّق. لا اقتباسات ولا تفاعلات جمهور ولا تعليقات مختلقة.",
  },
} as const;

function tt(v: LocalizedString | undefined, lang: Lang): string {
  if (!v) return "";
  return typeof v === "string" ? v : (v[lang] ?? v.en);
}

export function AudioGuidePanel({
  match,
  autoOpen,
}: {
  match: MatchTheater;
  autoOpen?: boolean;
}) {
  const lang = useLang();
  const [showTranscript, setShowTranscript] = useState(true);
  const [showCaptions, setShowCaptions] = useState(true);

  const guide = useAudioGuide();

  const audioGuide: AudioGuide = useMemo(
    () => ({
      id: `theater:${match.id}:${lang}`,
      title: tt(match.cinematicTitle, lang),
      subtitle: tt(match.cinematicSubtitle, lang),
      href: `/theater/${match.id}`,
      segments: match.narration.map((n) => ({
        id: n.id,
        text: `${tt(n.title, lang)}. ${tt(n.body, lang)}`,
      })),
    }),
    [match, lang],
  );

  const active = guide.isActive(audioGuide.id);
  const status = active ? guide.status : "idle";
  const activeSegment = active
    ? match.narration.find((n) => n.id === guide.activeSegmentId)
    : undefined;

  const start = () => void guide.play(audioGuide);
  const resume = () => void guide.resume();
  const pause = () => guide.pause();
  const restart = () => void guide.replay();

  return (
    <section
      className="mx-auto mt-8 w-full max-w-4xl px-4 sm:px-6"
      style={SERIF}
      id="match-theater-audio"
    >
      <div className="rounded-2xl border border-white/15 bg-black/40 p-4 text-white">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <div className="text-[10px] uppercase tracking-[0.28em] text-[#c9a24a]">
              {T.heading[lang]}
            </div>
            <p className="mt-1 text-xs text-white/60">{T.optional[lang]}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {status === "idle" || status === "ended" ? (
              <PillButton onClick={start} primary autoFocus={autoOpen}>
                ▶ {T.play[lang]}
              </PillButton>
            ) : status === "playing" ? (
              <PillButton onClick={pause}>❚❚ {T.pause[lang]}</PillButton>
            ) : (
              <PillButton onClick={resume} primary>▶ {T.resume[lang]}</PillButton>
            )}
            <PillButton onClick={restart}>↺ {T.restart[lang]}</PillButton>
            <SpeedControl current={guide.speed} onChange={guide.setSpeed} label={T.speed[lang]} />
            <label className="flex items-center gap-1.5 text-[11px] text-white/70">
              <input
                type="checkbox"
                checked={showCaptions}
                onChange={(e) => setShowCaptions(e.target.checked)}
              />
              {T.captions[lang]}
            </label>
            <label className="flex items-center gap-1.5 text-[11px] text-white/70">
              <input
                type="checkbox"
                checked={showTranscript}
                onChange={(e) => setShowTranscript(e.target.checked)}
              />
              {T.transcript[lang]}
            </label>
          </div>
        </div>

        {/* Live caption */}
        {showCaptions && active && activeSegment && (
          <div
            aria-live="polite"
            className="mt-3 rounded-lg border border-[#c9a24a]/30 bg-black/60 p-3 text-sm text-white/90"
          >
            <span className="me-2 text-[10px] uppercase tracking-widest text-[#c9a24a]">
              {tt(activeSegment.title, lang)}
            </span>
            {tt(activeSegment.body, lang)}
          </div>
        )}

        {/* Transcript / segments list */}
        {showTranscript && (
          <ol className="mt-4 space-y-2">
            {match.narration.map((seg) => (
              <SegmentRow
                key={seg.id}
                seg={seg}
                lang={lang}
                active={active && guide.activeSegmentId === seg.id}
              />
            ))}
          </ol>
        )}

        <p className="mt-3 text-[10px] italic text-white/40">{T.disclaimer[lang]}</p>
      </div>
    </section>
  );
}

function SegmentRow({
  seg,
  lang,
  active,
}: {
  seg: NarrationSegment;
  lang: Lang;
  active: boolean;
}) {
  return (
    <li
      className={`rounded-lg border p-3 transition ${
        active
          ? "border-[#c9a24a] bg-[#c9a24a]/10 text-white"
          : "border-white/10 bg-black/30 text-white/80"
      }`}
    >
      <div className="flex items-baseline justify-between gap-3">
        <div className="text-[11px] uppercase tracking-widest text-[#c9a24a]">
          {tt(seg.title, lang)}
        </div>
        {seg.minute != null && (
          <span className="font-mono text-[11px] text-white/50">{seg.minute}&apos;</span>
        )}
      </div>
      <p className="mt-1 text-sm leading-relaxed">{tt(seg.body, lang)}</p>
    </li>
  );
}

function PillButton({
  onClick,
  primary,
  autoFocus,
  children,
}: {
  onClick: () => void;
  primary?: boolean;
  autoFocus?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      autoFocus={autoFocus}
      className={
        "rounded-full px-3 py-1.5 text-xs font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c9a24a] " +
        (primary
          ? "bg-[#c9a24a] text-black hover:brightness-110"
          : "border border-white/25 bg-white/5 text-white/85 hover:bg-white/10")
      }
    >
      {children}
    </button>
  );
}

function SpeedControl({
  current,
  onChange,
  label,
}: {
  current: 0.75 | 1 | 1.25;
  onChange: (s: 0.75 | 1 | 1.25) => void;
  label: string;
}) {
  const speeds: (0.75 | 1 | 1.25)[] = [0.75, 1, 1.25];
  return (
    <div className="flex items-center gap-1 text-[11px] text-white/70" role="group" aria-label={label}>
      <span className="opacity-70">{label}:</span>
      {speeds.map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onChange(s)}
          className={`rounded px-1.5 py-0.5 ${
            current === s
              ? "bg-[#c9a24a] text-black"
              : "border border-white/20 bg-white/5 hover:bg-white/10"
          }`}
        >
          {s}×
        </button>
      ))}
    </div>
  );
}
