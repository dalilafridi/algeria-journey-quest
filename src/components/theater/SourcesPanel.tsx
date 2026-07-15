/**
 * Sources & Research panel — visible list of every reliable source backing
 * the historical claims in the experience. Renders as small museum-style
 * plaques with optional URLs.
 */

import { useLang, type Lang, type LocalizedString } from "@/lib/i18n";
import type { MatchTheater } from "@/data/matchTheater/types";
import { THEATER_SERIF as SERIF } from "./TheaterShell";

const T = {
  heading: { en: "Sources & Research", fr: "Sources & Recherche", ar: "المصادر والأبحاث" },
  intro: {
    en: "Every historical claim in this experience is traceable to reliable sources listed below. Illustrations and diagrams are labelled as stylised recreations, not archival material.",
    fr: "Chaque affirmation historique de cette expérience est traçable jusqu'aux sources fiables ci-dessous. Les illustrations et diagrammes sont indiqués comme recréations stylisées, et non comme matériel d'archive.",
    ar: "كلّ ادّعاء تاريخي في هذه التجربة يمكن تتبّعه إلى المصادر الموثوقة أدناه. الرسوم التوضيحيّة والمخطّطات موسومة كإعادة تصوير أسلوبيّة وليست موادّ أرشيفيّة.",
  },
} as const;

function tt(v: LocalizedString | undefined, lang: Lang): string {
  if (!v) return "";
  return typeof v === "string" ? v : (v[lang] ?? v.en);
}

export function SourcesPanel({ match }: { match: MatchTheater }) {
  const lang = useLang();
  if (match.sources.length === 0) return null;
  return (
    <section className="mx-auto mt-10 w-full max-w-4xl px-4 sm:px-6" style={SERIF}>
      <div className="rounded-2xl border border-white/15 bg-black/40 p-5 text-white">
        <div className="text-[10px] uppercase tracking-[0.28em] text-[#c9a24a]">
          {T.heading[lang]}
        </div>
        <p className="mt-2 text-xs text-white/60">{T.intro[lang]}</p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {match.sources.map((s) => (
            <li
              key={s.id}
              className="rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-white/85"
            >
              <div>{tt(s.label, lang)}</div>
              {s.publisher && (
                <div className="mt-0.5 text-[11px] text-white/50">{tt(s.publisher, lang)}</div>
              )}
              {s.url && (
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-block text-[11px] text-[#c9a24a] underline"
                >
                  {s.url}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
