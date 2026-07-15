/**
 * TacticalView — optional side-by-side formation panels. Falls back to the
 * "data not available" copy when the match record lacks structured tactics.
 */

import { useLang, type LocalizedString } from "@/lib/i18n";
import type { MatchTheater } from "@/data/matchTheater/types";
import { PitchDiagram, layoutFormation } from "./PitchDiagram";
import { THEATER_SERIF as SERIF } from "./TheaterShell";

const T = {
  approach: { en: "Approach", fr: "Approche", ar: "المقاربة" },
  changes: { en: "Key changes", fr: "Ajustements clés", ar: "التغييرات المفتاحيّة" },
  noData: {
    en: "Detailed tactical data is not available for this match.",
    fr: "Les données tactiques détaillées ne sont pas disponibles pour ce match.",
    ar: "لا تتوفّر بيانات تكتيكيّة مفصّلة لهذه المباراة.",
  },
  formation: { en: "Starting formation", fr: "Composition de départ", ar: "التشكيلة الأساسيّة" },
} as const;

function tt(v: LocalizedString | undefined, lang: "en" | "fr" | "ar"): string {
  if (!v) return "";
  return typeof v === "string" ? v : (v[lang] ?? v.en);
}

export function TacticalView({ match }: { match: MatchTheater }) {
  const lang = useLang();

  const sides: ("home" | "away")[] = ["home", "away"];

  return (
    <section className="mx-auto mt-8 w-full max-w-5xl px-4 sm:px-6" style={SERIF}>
      <div className="grid gap-5 md:grid-cols-2">
        {sides.map((side) => {
          const team = match.teams[side];
          const lineup = match.lineups[side];
          const tactic = match.tactics.find((t) => t.side === side);
          const players = layoutFormation(lineup.starting, side);
          return (
            <div
              key={side}
              className="rounded-2xl border border-white/15 bg-black/40 p-4 text-white"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.28em] text-[#c9a24a]">
                    {tt(team.country, lang)}
                    {team.formation ? ` · ${team.formation}` : ""}
                  </div>
                  <h3 className="mt-1 text-lg font-semibold">{tt(team.name, lang)}</h3>
                </div>
                {team.coach && (
                  <div className="text-right text-[11px] text-white/60">
                    {tt(team.coach, lang)}
                  </div>
                )}
              </div>
              <div className="mt-3 overflow-hidden rounded-lg border border-white/10">
                <PitchDiagram
                  team={team}
                  players={players}
                  ariaDescription={`${tt(T.formation, lang)} — ${tt(team.name, lang)} — ${team.formation ?? ""}`}
                />
              </div>
              {tactic?.approach ? (
                <div className="mt-3">
                  <div className="text-[10px] uppercase tracking-widest text-white/55">
                    {T.approach[lang]}
                  </div>
                  <p className="mt-1 text-sm text-white/85">{tt(tactic.approach, lang)}</p>
                </div>
              ) : (
                <p className="mt-3 text-sm italic text-white/60">{T.noData[lang]}</p>
              )}
              {tactic?.keyChanges && tactic.keyChanges.length > 0 && (
                <div className="mt-3">
                  <div className="text-[10px] uppercase tracking-widest text-white/55">
                    {T.changes[lang]}
                  </div>
                  <ul className="mt-1 space-y-1 text-sm text-white/85">
                    {tactic.keyChanges.map((c, i) => (
                      <li key={i}>· {tt(c, lang)}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
