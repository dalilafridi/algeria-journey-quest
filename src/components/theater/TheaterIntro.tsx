/**
 * TheaterIntro — the cinematic entry for a Match Theater experience.
 *
 * Fades in the match date and venue, introduces both teams with their
 * stylised (never archival) crest medallions and captains, and reveals
 * the cinematic title card. Never autoplays sound — the audio guide is a
 * button the visitor must press.
 */

import { useEffect, useState } from "react";

import { MedallionFrame } from "@/components/brand/MedallionFrame";
import { useLang, type LocalizedString } from "@/lib/i18n";
import type { MatchTheater } from "@/data/matchTheater/types";
import { THEATER_SERIF as SERIF } from "./TheaterShell";

const T = {
  begin: { en: "Begin experience", fr: "Commencer l'expérience", ar: "ابدأ التجربة" },
  explore: { en: "Explore match", fr: "Explorer le match", ar: "استكشف المباراة" },
  audio: { en: "Listen to audio guide", fr: "Écouter le guide audio", ar: "استمع للدليل الصوتي" },
  skip: { en: "Skip introduction", fr: "Passer l'introduction", ar: "تخطّ المقدّمة" },
  captain: { en: "Captain", fr: "Capitaine", ar: "القائد" },
  coach: { en: "Head coach", fr: "Entraîneur", ar: "المدرّب" },
  stylised: {
    en: "Stylised recreation — not an archival crest.",
    fr: "Recréation stylisée — pas un écusson d'archive.",
    ar: "إعادة تصوير أسلوبية — ليست شعاراً أرشيفياً.",
  },
  versus: { en: "vs.", fr: "contre", ar: "ضدّ" },
} as const;

function tt(v: LocalizedString | undefined, lang: "en" | "fr" | "ar"): string {
  if (!v) return "";
  return typeof v === "string" ? v : (v[lang] ?? v.en);
}

export function TheaterIntro({
  match,
  onBegin,
  onExplore,
  onListen,
  onSkip,
}: {
  match: MatchTheater;
  onBegin: () => void;
  onExplore: () => void;
  onListen: () => void;
  onSkip: () => void;
}) {
  const lang = useLang();
  const [stage, setStage] = useState(0); // 0: date, 1: teams, 2: title

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setStage(2);
      return;
    }
    const t1 = window.setTimeout(() => setStage(1), 1500);
    const t2 = window.setTimeout(() => setStage(2), 3200);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  const home = match.teams.home;
  const away = match.teams.away;
  const homeCaptain = match.lineups.home.starting.find((p) => p.isCaptain);
  const awayCaptain = match.lineups.away.starting.find((p) => p.isCaptain);

  return (
    <section
      className="mx-auto flex min-h-[80dvh] max-w-4xl flex-col items-center justify-center gap-8 px-4 py-8 text-center sm:px-6"
      aria-label={tt(match.cinematicTitle, lang)}
    >
      {/* Stage 0 — Date + venue */}
      <div
        className={`transition-opacity duration-1000 ${stage >= 0 ? "opacity-100" : "opacity-0"}`}
        style={SERIF}
      >
        <div className="text-[11px] uppercase tracking-[0.4em] text-white/60">
          {tt(match.competition, lang)}
        </div>
        <div className="mt-3 text-2xl font-light text-white sm:text-3xl">
          {tt(match.displayDate, lang)}
        </div>
        <div className="mt-1 text-sm text-white/70">
          {tt(match.venue, lang)} · {tt(match.city, lang)}, {tt(match.country, lang)}
        </div>
      </div>

      {/* Stage 1 — Teams */}
      <div
        className={`grid w-full grid-cols-[1fr_auto_1fr] items-center gap-4 transition-all duration-1000 sm:gap-8 ${
          stage >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
        }`}
      >
        <TeamCrest team={home} captain={homeCaptain?.name} lang={lang} align="end" />
        <div className="text-lg font-light text-white/70 sm:text-xl" style={SERIF}>
          {T.versus[lang]}
        </div>
        <TeamCrest team={away} captain={awayCaptain?.name} lang={lang} align="start" />
      </div>

      {/* Stage 2 — Cinematic title + actions */}
      <div
        className={`w-full transition-all duration-1000 ${
          stage >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
        }`}
      >
        <div className="text-[11px] uppercase tracking-[0.4em] text-[#c9a24a]" style={SERIF}>
          {tt(match.cinematicSubtitle, lang)}
        </div>
        <h1
          className="mt-3 text-balance text-3xl font-semibold text-white sm:text-5xl"
          style={SERIF}
        >
          {tt(match.cinematicTitle, lang)}
        </h1>

        <p className="mx-auto mt-3 max-w-xl text-xs text-white/40" style={SERIF}>
          {T.stylised[lang]}
        </p>

        <div className="mx-auto mt-8 flex max-w-lg flex-wrap items-center justify-center gap-2">
          <PrimaryButton onClick={onBegin}>{T.begin[lang]}</PrimaryButton>
          <SecondaryButton onClick={onExplore}>{T.explore[lang]}</SecondaryButton>
          <SecondaryButton onClick={onListen}>{T.audio[lang]}</SecondaryButton>
          <SecondaryButton onClick={onSkip}>{T.skip[lang]}</SecondaryButton>
        </div>

        {(homeCaptain || awayCaptain) && (
          <div
            className="mx-auto mt-6 grid max-w-lg grid-cols-2 gap-4 text-[11px] uppercase tracking-widest text-white/55"
            style={SERIF}
          >
            <div>
              <div>{T.coach[lang]}</div>
              <div className="mt-1 text-white/85">{tt(home.coach, lang)}</div>
            </div>
            <div>
              <div>{T.coach[lang]}</div>
              <div className="mt-1 text-white/85">{tt(away.coach, lang)}</div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function TeamCrest({
  team,
  captain,
  lang,
  align,
}: {
  team: MatchTheater["teams"]["home"];
  captain?: string;
  lang: "en" | "fr" | "ar";
  align: "start" | "end";
}) {
  return (
    <div className={`flex flex-col items-center gap-3 ${align === "end" ? "sm:items-end" : "sm:items-start"}`}>
      <MedallionFrame size={92} tone="gold" glow>
        <span className="text-5xl" aria-hidden style={{ color: "#3b2210" }}>
          {team.crestGlyph}
        </span>
      </MedallionFrame>
      <div className="text-center sm:text-inherit" style={SERIF}>
        <div className="text-lg font-semibold text-white">{tt(team.name, lang)}</div>
        <div className="text-xs uppercase tracking-widest text-white/55">
          {tt(team.country, lang)}
          {team.formation ? ` · ${team.formation}` : ""}
        </div>
        {captain && (
          <div className="mt-1 text-[11px] uppercase tracking-widest text-[#c9a24a]">
            © {captain}
          </div>
        )}
      </div>
    </div>
  );
}

function PrimaryButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full bg-[#c9a24a] px-5 py-2.5 text-sm font-semibold text-black shadow-[0_4px_20px_rgba(201,162,74,0.35)] transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c9a24a]"
      style={SERIF}
    >
      {children}
    </button>
  );
}

function SecondaryButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border border-white/25 bg-white/5 px-4 py-2 text-sm text-white/90 backdrop-blur transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c9a24a]"
      style={SERIF}
    >
      {children}
    </button>
  );
}
