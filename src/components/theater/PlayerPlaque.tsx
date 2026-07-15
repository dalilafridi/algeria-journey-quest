/**
 * PlayerPlaque — museum plaque for a single player in the lineup.
 *
 * Rendered on demand (when a visitor opens the plaque), so plaques never
 * add to the initial theater render cost.
 */

import { useLang, type LocalizedString } from "@/lib/i18n";
import type { LineupPlayer } from "@/data/matchTheater/types";
import { THEATER_SERIF as SERIF } from "./TheaterShell";

const T = {
  captain: { en: "Captain", fr: "Capitaine", ar: "قائد الفريق" },
  clubAtTime: { en: "Club at the time", fr: "Club à l'époque", ar: "النادي في تلك الفترة" },
  role: { en: "Role in the match", fr: "Rôle dans le match", ar: "الدور في المباراة" },
  career: { en: "Career", fr: "Carrière", ar: "المسيرة" },
} as const;

const ROLE_LABEL: Record<string, LocalizedString> = {
  goalkeeper: { en: "Goalkeeper", fr: "Gardien", ar: "حارس مرمى" },
  defender: { en: "Defender", fr: "Défenseur", ar: "مدافع" },
  midfielder: { en: "Midfielder", fr: "Milieu de terrain", ar: "لاعب وسط" },
  forward: { en: "Forward", fr: "Attaquant", ar: "مهاجم" },
};

function tt(v: LocalizedString | undefined, lang: "en" | "fr" | "ar"): string {
  if (!v) return "";
  return typeof v === "string" ? v : (v[lang] ?? v.en);
}

export function PlayerPlaque({
  player,
  onSelect,
  compact,
}: {
  player: LineupPlayer;
  onSelect?: (p: LineupPlayer) => void;
  compact?: boolean;
}) {
  const lang = useLang();
  const positionLabel = tt(player.position, lang) || tt(ROLE_LABEL[player.role], lang);
  const content = (
    <div
      className="w-full rounded-xl border border-white/15 bg-black/40 p-3 text-left transition group-hover:border-[#c9a24a]/50 group-hover:bg-black/60"
      style={SERIF}
    >
      <div className="flex items-baseline justify-between gap-2">
        <div className="text-sm font-semibold text-white">
          {player.number != null && (
            <span className="me-2 inline-block min-w-[1.6rem] rounded bg-white/10 px-1 text-center font-mono text-xs">
              {player.number}
            </span>
          )}
          {player.name}
          {player.isCaptain && (
            <span className="ms-2 rounded bg-[#c9a24a]/25 px-1.5 py-0.5 text-[10px] uppercase tracking-widest text-[#c9a24a]">
              {T.captain[lang]}
            </span>
          )}
        </div>
      </div>
      <div className="mt-1 text-xs text-white/70">{positionLabel}</div>
      {!compact && player.clubAtTime && (
        <div className="mt-1 text-[11px] text-white/50">
          {T.clubAtTime[lang]}: {player.clubAtTime}
          {player.clubCountry ? ` (${player.clubCountry})` : ""}
        </div>
      )}
    </div>
  );

  if (onSelect) {
    return (
      <button
        type="button"
        onClick={() => onSelect(player)}
        className="group block w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c9a24a]"
        aria-label={`${player.name} — ${positionLabel}`}
      >
        {content}
      </button>
    );
  }
  return content;
}

export function PlayerPlaqueDetail({ player }: { player: LineupPlayer }) {
  const lang = useLang();
  const positionLabel = tt(player.position, lang) || tt(ROLE_LABEL[player.role], lang);
  return (
    <div
      className="rounded-2xl border border-[#c9a24a]/40 bg-gradient-to-b from-black/70 to-[#0a2318]/70 p-5 text-white"
      style={SERIF}
    >
      <div className="text-[10px] uppercase tracking-[0.28em] text-[#c9a24a]">
        {positionLabel}
      </div>
      <h3 className="mt-1 text-xl font-semibold">{player.name}</h3>
      {player.isCaptain && (
        <div className="mt-1 text-[11px] uppercase tracking-widest text-[#c9a24a]">
          {T.captain[lang]}
        </div>
      )}
      {player.clubAtTime && (
        <p className="mt-3 text-sm text-white/80">
          <span className="text-white/50">{T.clubAtTime[lang]}: </span>
          {player.clubAtTime}
          {player.clubCountry ? ` (${player.clubCountry})` : ""}
        </p>
      )}
      {player.matchRole && (
        <p className="mt-3 text-sm text-white/85">
          <span className="text-white/50">{T.role[lang]}: </span>
          {tt(player.matchRole, lang)}
        </p>
      )}
      {player.career && (
        <p className="mt-3 text-sm italic text-white/75">
          <span className="not-italic text-white/50">{T.career[lang]}: </span>
          {tt(player.career, lang)}
        </p>
      )}
    </div>
  );
}
