import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useLang, type Lang, type LocalizedString } from "@/lib/i18n";
import type { LineupPlayer, MatchEvent, MatchTheater } from "@/data/matchTheater/types";
import { getMatchTheater } from "@/data/matchTheater";
import { useTheaterState } from "@/lib/matchTheaterState";

import { TheaterShell, THEATER_SERIF as SERIF } from "@/components/theater/TheaterShell";
import { TheaterIntro } from "@/components/theater/TheaterIntro";
import { TheaterActions } from "@/components/theater/TheaterActions";
import { MatchTimeline } from "@/components/theater/MatchTimeline";
import { GoalSequence } from "@/components/theater/GoalSequence";
import { HistoricalContextPanel } from "@/components/theater/HistoricalContextPanel";
import { TacticalView } from "@/components/theater/TacticalView";
import { ArchivalGallery } from "@/components/theater/ArchivalGallery";
import { AudioGuidePanel } from "@/components/theater/AudioGuidePanel";
import { FinalWhistle } from "@/components/theater/FinalWhistle";
import { MatchQuiz } from "@/components/theater/MatchQuiz";
import { SourcesPanel } from "@/components/theater/SourcesPanel";
import { PlayerPlaque, PlayerPlaqueDetail } from "@/components/theater/PlayerPlaque";

export const Route = createFileRoute("/theater/$matchId")({
  head: ({ loaderData }) => {
    const match = loaderData as MatchTheater | undefined;
    const title = match
      ? `${tt(match.cinematicTitle, "en")} — Match Theater`
      : "Match Theater — Unavailable";
    const desc = match
      ? `${tt(match.cinematicSubtitle, "en")} · Match Theater at DZ Odyssey.`
      : "This Match Theater experience is not available.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        ...(match ? [] : [{ name: "robots", content: "noindex" }]),
      ],
    };
  },
  loader: ({ params }) => {
    const m = getMatchTheater(params.matchId);
    if (!m) throw notFound();
    return m;
  },
  errorComponent: TheaterErrorBoundary,
  notFoundComponent: TheaterNotFound,
  component: TheaterRoute,
});

function tt(v: LocalizedString | undefined, lang: Lang): string {
  if (!v) return "";
  return typeof v === "string" ? v : (v[lang] ?? v.en);
}

function TheaterRoute() {
  const match = Route.useLoaderData();
  const lang = useLang();
  const { state, update } = useTheaterState(match.id);
  const [phase, setPhase] = useState<"intro" | "experience">("intro");
  const [minute, setMinuteState] = useState<number>(state.minute || 0);
  const [selectedEvent, setSelectedEvent] = useState<MatchEvent | null>(null);
  const [openPlayer, setOpenPlayer] = useState<LineupPlayer | null>(null);
  const [autoOpenAudio, setAutoOpenAudio] = useState(false);
  const [showTactical, setShowTactical] = useState(false);
  const experienceRef = useRef<HTMLDivElement | null>(null);

  // Restore intro-seen visitors straight into the experience.
  useEffect(() => {
    if (state.introSeen) setPhase("experience");
  }, [state.introSeen]);

  // Sync minute to persistence, throttled by React state coalescing.
  const setMinute = useCallback(
    (m: number) => {
      const clamped = Math.max(0, Math.min(90, m));
      setMinuteState(clamped);
      update({ minute: clamped });
    },
    [update],
  );

  // When minute advances past a goal event, surface its sequence card.
  useEffect(() => {
    const goal = [...match.events]
      .filter((e) => e.kind === "goal")
      .reverse()
      .find((e) => e.minute <= minute);
    if (goal && (!selectedEvent || selectedEvent.id !== goal.id)) {
      setSelectedEvent(goal);
    }
  }, [minute, match.events, selectedEvent]);

  const enterExperience = useCallback(
    (opts?: { openAudio?: boolean; skipToEnd?: boolean }) => {
      update({ introSeen: true });
      setPhase("experience");
      if (opts?.openAudio) setAutoOpenAudio(true);
      if (opts?.skipToEnd) setMinute(90);
      // Scroll into view once mounted.
      requestAnimationFrame(() => {
        experienceRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    },
    [setMinute, update],
  );

  const findPlayer = useCallback(
    (id: string) => {
      const all = [
        ...match.lineups.home.starting,
        ...match.lineups.home.substitutes,
        ...match.lineups.away.starting,
        ...match.lineups.away.substitutes,
      ];
      return all.find((p) => p.id === id) ?? null;
    },
    [match.lineups],
  );

  const heading = useMemo(
    () => ({
      lineups: {
        en: "Lineups",
        fr: "Compositions",
        ar: "التشكيلات",
      } as LocalizedString,
      subs: { en: "Substitutes", fr: "Remplaçants", ar: "الاحتياط" } as LocalizedString,
      viewTactical: {
        en: "Show tactical view",
        fr: "Afficher la vue tactique",
        ar: "إظهار العرض التكتيكي",
      } as LocalizedString,
      hideTactical: {
        en: "Hide tactical view",
        fr: "Masquer la vue tactique",
        ar: "إخفاء العرض التكتيكي",
      } as LocalizedString,
    }),
    [],
  );

  return (
    <TheaterShell>
      {phase === "intro" ? (
        <TheaterIntro
          match={match}
          onBegin={() => enterExperience()}
          onExplore={() => enterExperience()}
          onListen={() => enterExperience({ openAudio: true })}
          onSkip={() => enterExperience({ skipToEnd: true })}
        />
      ) : null}

      <div ref={experienceRef}>
        {phase === "experience" && (
          <>
            <TheaterActions match={match} />

            {/* Timeline */}
            <div className="mt-6">
              <MatchTimeline
                match={match}
                minute={minute}
                onMinuteChange={setMinute}
                onEventSelect={setSelectedEvent}
              />
            </div>

            {/* Signature goal sequence card */}
            {selectedEvent && selectedEvent.kind === "goal" && (
              <GoalSequence
                match={match}
                event={selectedEvent}
                onSelectPlayer={(pid) => {
                  const p = findPlayer(pid);
                  if (p) setOpenPlayer(p);
                }}
              />
            )}

            {/* Historical context */}
            <HistoricalContextPanel match={match} />

            {/* Lineups */}
            <section
              className="mx-auto mt-8 w-full max-w-5xl px-4 sm:px-6"
              style={SERIF}
              aria-labelledby="theater-lineups"
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <div
                  id="theater-lineups"
                  className="text-[10px] uppercase tracking-[0.28em] text-[#c9a24a]"
                >
                  {tt(heading.lineups, lang)}
                </div>
                <button
                  type="button"
                  onClick={() => setShowTactical((s) => !s)}
                  className="rounded-full border border-white/25 bg-white/5 px-3 py-1 text-[11px] text-white/85 hover:bg-white/10"
                >
                  {tt(showTactical ? heading.hideTactical : heading.viewTactical, lang)}
                </button>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                {(["home", "away"] as const).map((side) => {
                  const team = match.teams[side];
                  const lineup = match.lineups[side];
                  return (
                    <div key={side} className="rounded-2xl border border-white/15 bg-black/40 p-4">
                      <div className="mb-3 flex items-baseline justify-between gap-2">
                        <div className="text-lg font-semibold text-white">
                          {tt(team.name, lang)}
                        </div>
                        {team.formation && (
                          <span className="rounded-full border border-white/20 bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-widest text-white/60">
                            {team.formation}
                          </span>
                        )}
                      </div>
                      <div className="grid gap-2">
                        {lineup.starting.map((p) => (
                          <PlayerPlaque key={p.id} player={p} onSelect={setOpenPlayer} />
                        ))}
                      </div>
                      {lineup.substitutes.length > 0 && (
                        <>
                          <div className="mt-4 text-[10px] uppercase tracking-widest text-white/50">
                            {tt(heading.subs, lang)}
                          </div>
                          <div className="mt-2 grid gap-2">
                            {lineup.substitutes.map((p) => (
                              <PlayerPlaque
                                key={p.id}
                                player={p}
                                onSelect={setOpenPlayer}
                                compact
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {showTactical && <TacticalView match={match} />}

            <ArchivalGallery match={match} />

            <AudioGuidePanel match={match} autoOpen={autoOpenAudio} />

            {/* Full time / final whistle */}
            {minute >= 90 && (
              <>
                <FinalWhistle match={match} />
                <MatchQuiz match={match} />
              </>
            )}

            <SourcesPanel match={match} />
          </>
        )}
      </div>

      {openPlayer && (
        <PlayerModal player={openPlayer} onClose={() => setOpenPlayer(null)} />
      )}
    </TheaterShell>
  );
}

function PlayerModal({ player, onClose }: { player: LineupPlayer; onClose: () => void }) {
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [onClose]);
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={player.name}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-3 backdrop-blur sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <PlayerPlaqueDetail player={player} />
        <button
          type="button"
          onClick={onClose}
          className="mt-3 w-full rounded-full border border-white/25 bg-white/5 px-4 py-2 text-sm text-white/85 hover:bg-white/10"
        >
          Close
        </button>
      </div>
    </div>
  );
}

function TheaterNotFound() {
  const lang = useLang();
  const msg = {
    en: "This Match Theater experience is not available yet.",
    fr: "Cette expérience Théâtre du match n'est pas encore disponible.",
    ar: "تجربة مسرح المباراة هذه غير متاحة بعد.",
  } as const;
  return (
    <TheaterShell>
      <div className="mx-auto max-w-lg px-4 py-24 text-center text-white" style={SERIF}>
        <p className="text-lg">{msg[lang]}</p>
        <Link
          to="/football"
          className="mt-6 inline-block rounded-full border border-white/25 bg-white/5 px-4 py-2 text-sm text-white/90 hover:bg-white/10"
        >
          ← Football
        </Link>
      </div>
    </TheaterShell>
  );
}

function TheaterErrorBoundary({ reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  return (
    <TheaterShell>
      <div className="mx-auto max-w-lg px-4 py-24 text-center text-white" style={SERIF}>
        <p className="text-lg">Something interrupted the theater.</p>
        <button
          type="button"
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="mt-6 inline-block rounded-full border border-white/25 bg-white/5 px-4 py-2 text-sm text-white/90 hover:bg-white/10"
        >
          Retry
        </button>
      </div>
    </TheaterShell>
  );
}
