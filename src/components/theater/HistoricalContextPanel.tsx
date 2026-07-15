/**
 * HistoricalContextPanel — dignified contextual pauses (pre-match,
 * post-match, legacy) rendered as museum plaques.
 */

import { useLang, type LocalizedString } from "@/lib/i18n";
import type { HistoricalContext, MatchTheater } from "@/data/matchTheater/types";
import { THEATER_SERIF as SERIF } from "./TheaterShell";

const T = {
  heading: { en: "Historical context", fr: "Contexte historique", ar: "السياق التاريخي" },
  labels: {
    "pre-match": { en: "Before the match", fr: "Avant le match", ar: "قبل المباراة" },
    "half-time": { en: "Half-time", fr: "Mi-temps", ar: "الاستراحة" },
    "post-match": { en: "After the match", fr: "Après le match", ar: "بعد المباراة" },
    legacy: { en: "Legacy", fr: "Héritage", ar: "الإرث" },
  } as Record<HistoricalContext["when"], LocalizedString>,
} as const;

function tt(v: LocalizedString | undefined, lang: "en" | "fr" | "ar"): string {
  if (!v) return "";
  return typeof v === "string" ? v : (v[lang] ?? v.en);
}

export function HistoricalContextPanel({ match }: { match: MatchTheater }) {
  const lang = useLang();
  if (match.context.length === 0) return null;
  return (
    <section className="mx-auto mt-8 w-full max-w-4xl px-4 sm:px-6" style={SERIF}>
      <div className="mb-3 text-[10px] uppercase tracking-[0.28em] text-[#c9a24a]">
        {T.heading[lang]}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {match.context.map((c) => (
          <article
            key={c.id}
            className="rounded-2xl border border-white/15 bg-black/40 p-4 text-white"
          >
            <div className="text-[10px] uppercase tracking-widest text-white/55">
              {tt(T.labels[c.when], lang)}
            </div>
            <h4 className="mt-1 text-base font-semibold">{tt(c.title, lang)}</h4>
            <p className="mt-2 text-sm leading-relaxed text-white/85">{tt(c.body, lang)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
