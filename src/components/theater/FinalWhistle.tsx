/**
 * FinalWhistle — reveal at full-time. Shows the final score, a reflection,
 * awards the passport stamp, links to related exhibits and to the next
 * Match Theater when one is defined.
 */

import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

import { useLang, type Lang, type LocalizedString } from "@/lib/i18n";
import type { MatchTheater } from "@/data/matchTheater/types";
import { markTheaterCompleted } from "@/lib/matchTheaterState";
import { MedallionFrame } from "@/components/brand/MedallionFrame";
import { THEATER_SERIF as SERIF } from "./TheaterShell";

const T = {
  fullTime: { en: "Full time", fr: "Coup de sifflet final", ar: "صافرة النهاية" },
  finalScore: { en: "Final score", fr: "Score final", ar: "النتيجة النهائية" },
  reflection: { en: "Reflection", fr: "Réflexion", ar: "تأمّل" },
  stampUnlocked: {
    en: "Passport stamp unlocked",
    fr: "Tampon de passeport débloqué",
    ar: "تمّ فتح ختم جواز السفر",
  },
  related: { en: "Continue exploring", fr: "Continuer l'exploration", ar: "استمرّ في الاستكشاف" },
  nextMatch: { en: "Next Match Theater", fr: "Prochain Théâtre du match", ar: "المسرح التالي" },
} as const;

function tt(v: LocalizedString | undefined, lang: Lang): string {
  if (!v) return "";
  return typeof v === "string" ? v : (v[lang] ?? v.en);
}

export function FinalWhistle({ match }: { match: MatchTheater }) {
  const lang = useLang();
  const [xpGained, setXpGained] = useState<number | null>(null);

  useEffect(() => {
    const res = markTheaterCompleted(match.id, `theater:${match.id}`);
    if (!res.alreadyCompleted && res.xpGained > 0) setXpGained(res.xpGained);
  }, [match.id]);

  return (
    <section
      className="mx-auto mt-10 w-full max-w-4xl px-4 sm:px-6"
      style={SERIF}
      aria-labelledby="match-theater-fulltime"
    >
      <div className="relative overflow-hidden rounded-3xl border border-[#c9a24a]/45 bg-gradient-to-b from-black to-[#0a2318] p-6 text-white shadow-[0_20px_60px_rgba(0,0,0,0.6)] sm:p-8">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[70%] -translate-x-1/2 rounded-full bg-[#c9a24a]/15 blur-3xl"
        />

        <div className="relative text-center">
          <div className="text-[10px] uppercase tracking-[0.4em] text-[#c9a24a]">
            {T.fullTime[lang]}
          </div>
          <h2 id="match-theater-fulltime" className="mt-3 text-2xl font-semibold sm:text-3xl">
            {tt(match.cinematicTitle, lang)}
          </h2>

          <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
            <div>
              <div className="text-sm text-white/70">{tt(match.teams.home.name, lang)}</div>
              <div className="font-mono text-5xl font-bold sm:text-6xl">{match.finalScore.home}</div>
            </div>
            <div className="text-lg text-white/50">–</div>
            <div>
              <div className="text-sm text-white/70">{tt(match.teams.away.name, lang)}</div>
              <div className="font-mono text-5xl font-bold sm:text-6xl">{match.finalScore.away}</div>
            </div>
          </div>

          <p className="mx-auto mt-6 max-w-xl text-base italic text-white/90">
            {tt(match.finalReflection, lang)}
          </p>
        </div>

        {/* Stamp */}
        <div className="relative mt-8 flex flex-col items-center gap-3 rounded-2xl border border-[#c9a24a]/30 bg-black/40 p-5 text-center">
          <MedallionFrame size={80} tone="gold" glow animate="unlock">
            <span className="text-2xl font-bold" style={{ color: "#3b2210" }}>★</span>
          </MedallionFrame>
          <div className="text-[10px] uppercase tracking-[0.28em] text-[#c9a24a]">
            {T.stampUnlocked[lang]}
          </div>
          <div className="text-lg font-semibold">{tt(match.passportStamp.title, lang)}</div>
          <p className="text-xs text-white/60">{tt(match.passportStamp.hint, lang)}</p>
          {xpGained != null && xpGained > 0 && (
            <div className="text-xs text-emerald-300">+{xpGained} XP</div>
          )}
        </div>

        {/* Related exhibits + next match */}
        <div className="relative mt-8">
          <div className="text-[10px] uppercase tracking-[0.28em] text-[#c9a24a]">
            {T.related[lang]}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {match.relatedExhibits.map((r, i) => (
              <Link
                key={i}
                to={r.href}
                className="rounded-full border border-white/25 bg-white/5 px-3 py-1.5 text-xs text-white/90 transition hover:bg-white/10"
              >
                {tt(r.label, lang)}
              </Link>
            ))}
            {match.nextMatchId && (
              <Link
                to="/theater/$matchId"
                params={{ matchId: match.nextMatchId }}
                className="rounded-full bg-[#c9a24a] px-3 py-1.5 text-xs font-semibold text-black hover:brightness-110"
              >
                {T.nextMatch[lang]} →
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
