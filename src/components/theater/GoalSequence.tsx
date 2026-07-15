/**
 * GoalSequence — cinematic card for a single goal event. Shows the buildup
 * narration, a stylised pitch diagram of the passing sequence (when data is
 * available), player plaques for the scorer and any assist, and the
 * historical significance.
 */

import { useMemo } from "react";

import { useLang, type LocalizedString } from "@/lib/i18n";
import type { MatchEvent, MatchTheater } from "@/data/matchTheater/types";
import { PitchDiagram } from "./PitchDiagram";
import { PlayerPlaque } from "./PlayerPlaque";
import { THEATER_SERIF as SERIF } from "./TheaterShell";

const T = {
  buildup: { en: "The buildup", fr: "La construction", ar: "بناء الهجمة" },
  scorer: { en: "Scorer", fr: "Buteur", ar: "المسجّل" },
  assist: { en: "Assist", fr: "Passe décisive", ar: "التمريرة الحاسمة" },
  significance: { en: "Why it mattered", fr: "Pourquoi ce but a compté", ar: "لماذا كان هذا الهدف مهمّاً" },
  noSequence: {
    en: "Detailed event data is not available for this moment.",
    fr: "Les données détaillées de l'action ne sont pas disponibles pour ce moment.",
    ar: "لا تتوفّر بيانات مفصّلة لهذه اللحظة.",
  },
} as const;

function tt(v: LocalizedString | undefined, lang: "en" | "fr" | "ar"): string {
  if (!v) return "";
  return typeof v === "string" ? v : (v[lang] ?? v.en);
}

export function GoalSequence({
  match,
  event,
  onSelectPlayer,
}: {
  match: MatchTheater;
  event: MatchEvent;
  onSelectPlayer?: (playerId: string) => void;
}) {
  const lang = useLang();
  const scorer = useMemo(() => {
    if (!event.goal) return undefined;
    return findPlayer(match, event.goal.scorerPlayerId);
  }, [event, match]);
  const assist = useMemo(() => {
    if (!event.goal?.assistPlayerId) return undefined;
    return findPlayer(match, event.goal.assistPlayerId);
  }, [event, match]);

  if (event.kind !== "goal") return null;

  const teamAccent =
    event.side === "home"
      ? match.teams.home.colors.primary
      : match.teams.away.colors.primary;

  return (
    <article
      className="mx-auto mt-6 w-full max-w-4xl rounded-2xl border border-[#c9a24a]/35 bg-gradient-to-b from-black/70 to-[#0a2318]/70 p-5 text-white shadow-[0_10px_40px_rgba(0,0,0,0.5)] sm:p-6"
      style={SERIF}
      aria-live="polite"
    >
      <div className="flex items-baseline gap-3">
        <span
          className="rounded-full px-2 py-0.5 font-mono text-xs font-bold text-black"
          style={{ background: "#c9a24a" }}
        >
          {event.minute}&apos;
        </span>
        <h3 className="text-lg font-semibold" style={{ color: teamAccent === "#111111" ? "#fff" : "#fff" }}>
          {tt(event.label, lang)}
        </h3>
      </div>
      {event.detail && (
        <p className="mt-2 text-sm text-white/85">{tt(event.detail, lang)}</p>
      )}

      <div className="mt-5 grid gap-5 md:grid-cols-[1.1fr_1fr]">
        <div>
          <h4 className="text-[10px] uppercase tracking-[0.28em] text-[#c9a24a]">
            {T.buildup[lang]}
          </h4>
          <p className="mt-2 text-sm leading-relaxed text-white/90">
            {tt(event.goal?.buildup, lang) || tt(T.noSequence, lang)}
          </p>

          {event.goal?.significance && (
            <>
              <h4 className="mt-5 text-[10px] uppercase tracking-[0.28em] text-[#c9a24a]">
                {T.significance[lang]}
              </h4>
              <p className="mt-2 text-sm italic leading-relaxed text-white/85">
                {tt(event.goal.significance, lang)}
              </p>
            </>
          )}
        </div>

        <div>
          <div className="overflow-hidden rounded-xl border border-white/15">
            <PitchDiagram
              team={event.side === "home" ? match.teams.home : match.teams.away}
              sequence={event.goal?.sequence}
              ariaDescription={
                event.goal?.sequence
                  ? `${tt(T.buildup, lang)} — ${tt(event.label, lang)}`
                  : tt(T.noSequence, lang)
              }
            />
          </div>
          <div className="mt-3 grid gap-2">
            {scorer && (
              <div>
                <div className="mb-1 text-[10px] uppercase tracking-widest text-white/55">
                  {T.scorer[lang]}
                </div>
                <PlayerPlaque
                  player={scorer}
                  onSelect={onSelectPlayer ? () => onSelectPlayer(scorer.id) : undefined}
                  compact
                />
              </div>
            )}
            {assist && (
              <div>
                <div className="mb-1 text-[10px] uppercase tracking-widest text-white/55">
                  {T.assist[lang]}
                </div>
                <PlayerPlaque
                  player={assist}
                  onSelect={onSelectPlayer ? () => onSelectPlayer(assist.id) : undefined}
                  compact
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function findPlayer(match: MatchTheater, id: string) {
  const all = [
    ...match.lineups.home.starting,
    ...match.lineups.home.substitutes,
    ...match.lineups.away.starting,
    ...match.lineups.away.substitutes,
  ];
  return all.find((p) => p.id === id);
}
