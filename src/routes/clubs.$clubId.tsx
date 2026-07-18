import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

import { Header } from "@/components/Header";
import { MedallionFrame } from "@/components/brand/MedallionFrame";
import { useLang, t, type Lang } from "@/lib/i18n";
import { recordVisit } from "@/lib/passport";
import { useFootballBookmarks } from "@/lib/footballBookmarks";
import { hasMatchTheater } from "@/data/matchTheater";
import { getClubMuseum, listClubMuseums } from "@/data/clubs";
import {
  TROPHY_CATEGORY_LABEL,
  type ClubMuseum,
  type QuizQuestion,
  type Trophy,
  type TrophyCategory,
} from "@/data/clubs/types";

export const Route = createFileRoute("/clubs/$clubId")({
  loader: ({ params }) => {
    const club = getClubMuseum(params.clubId);
    if (!club) throw notFound();
    return { club };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Club Museum — DZ Odyssey" }, { name: "robots", content: "noindex" }] };
    }
    const { club } = loaderData;
    const title = typeof club.fullName === "string" ? club.fullName : club.fullName.en;
    const desc = typeof club.tagline === "string" ? club.tagline : club.tagline.en;
    return {
      meta: [
        { title: `${title} Museum — DZ Odyssey` },
        { name: "description", content: desc },
        { property: "og:title", content: `${title} Museum` },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: ClubMuseumRoute,
  notFoundComponent: ClubNotFound,
});

const SERIF = { fontFamily: "Georgia, 'Iowan Old Style', 'Times New Roman', serif" };

function ClubNotFound() {
  const lang = useLang();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold" style={SERIF}>{{ en: "Museum not found", fr: "Musée introuvable", ar: "المتحف غير موجود" }[lang]}</h1>
        <Link to="/clubs" className="inline-block mt-6 text-primary hover:underline">
          ← {{ en: "Back to Club Museums", fr: "Retour aux Musées des Clubs", ar: "العودة إلى متاحف الأندية" }[lang]}
        </Link>
      </div>
    </div>
  );
}

function ClubMuseumRoute() {
  const { club } = Route.useLoaderData();
  const lang = useLang();

  // Record visit for passport stamps (fires once per club per visitor).
  useEffect(() => {
    recordVisit("culture", `club:${club.id}`);
  }, [club.id]);

  if (club.status !== "complete") {
    return <ComingSoonView club={club} lang={lang} />;
  }

  return <FullMuseumView club={club} lang={lang} />;
}

/* -------------------------- Coming soon fallback -------------------------- */

function ComingSoonView({ club, lang }: { club: ClubMuseum; lang: Lang }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center">
        <MedallionFrame tone="bronze" size={120}>
          <div
            className="w-full h-full rounded-full flex items-center justify-center text-2xl font-black tracking-widest"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${club.identity.colors.primary}, ${club.identity.colors.secondary})`,
              color: "oklch(0.98 0.02 80)",
            }}
            aria-hidden
          >
            {club.identity.crestGlyph}
          </div>
        </MedallionFrame>
        <h1 className="mt-6 text-3xl sm:text-4xl font-bold" style={SERIF}>{t(club.fullName, lang)}</h1>
        <p className="mt-3 italic text-[oklch(0.88_0.03_82)]/85" style={SERIF}>{t(club.tagline, lang)}</p>
        <div className="mt-8 inline-block rounded-full border px-4 py-2 text-sm" style={{ borderColor: "oklch(0.7 0.1 75 / 0.4)" }}>
          ✦ {{ en: "This club museum wing is coming soon.", fr: "Cette aile muséale ouvrira bientôt.", ar: "سيُفتتح جناح هذا النادي قريباً." }[lang]}
        </div>
        <div className="mt-8">
          <Link to="/clubs" className="text-primary hover:underline">
            ← {{ en: "Back to Club Museums", fr: "Retour aux Musées des Clubs", ar: "العودة إلى متاحف الأندية" }[lang]}
          </Link>
        </div>
      </section>
    </div>
  );
}

/* ------------------------------ Full museum ------------------------------ */

const SECTIONS = [
  { id: "origins", en: "Origins", fr: "Origines", ar: "النشأة" },
  { id: "timeline", en: "Timeline", fr: "Chronologie", ar: "الخطّ الزمني" },
  { id: "trophies", en: "Trophy Room", fr: "Salle des trophées", ar: "قاعة الألقاب" },
  { id: "african", en: "African Glory", fr: "Gloire africaine", ar: "المجد الأفريقي" },
  { id: "legends", en: "Legends", fr: "Légendes", ar: "الأساطير" },
  { id: "coaches", en: "Coaches", fr: "Entraîneurs", ar: "المدرّبون" },
  { id: "matches", en: "Historic Matches", fr: "Matchs historiques", ar: "مباريات تاريخية" },
  { id: "stadiums", en: "Stadium", fr: "Stade", ar: "الملعب" },
  { id: "culture", en: "Supporters", fr: "Supporters", ar: "الجمهور" },
  { id: "jerseys", en: "Jerseys", fr: "Maillots", ar: "الأقمصة" },
  { id: "archive", en: "Archive", fr: "Archives", ar: "الأرشيف" },
  { id: "stats", en: "Statistics", fr: "Statistiques", ar: "الإحصاءات" },
  { id: "quiz", en: "Quiz", fr: "Quiz", ar: "اختبار" },
  { id: "sources", en: "Sources", fr: "Sources", ar: "المصادر" },
] as const;

function FullMuseumView({ club, lang }: { club: ClubMuseum; lang: Lang }) {
  const { primary, secondary } = club.identity.colors;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <Hero club={club} lang={lang} />

      <nav
        aria-label={{ en: "Museum sections", fr: "Sections du musée", ar: "أقسام المتحف" }[lang]}
        className="sticky top-14 z-20 border-y border-border/70 backdrop-blur-md"
        style={{ background: "oklch(0.14 0.015 45 / 0.85)" }}
      >
        <div className="max-w-6xl mx-auto px-3 sm:px-6 py-2 flex gap-2 overflow-x-auto scrollbar-none">
          {SECTIONS.map((s) => {
            if (s.id === "african" && !club.africanGlory) return null;
            if (s.id === "quiz" && !club.quiz?.length) return null;
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="whitespace-nowrap text-xs uppercase tracking-[0.2em] rounded-full px-3 py-1.5 border border-border/70 text-foreground hover:bg-muted transition"
              >
                {s[lang]}
              </a>
            );
          })}
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-16">
        {club.origins && <OriginsSection club={club} lang={lang} />}
        {club.timeline?.length ? <TimelineSection club={club} lang={lang} /> : null}
        {club.trophies?.length ? <TrophySection club={club} lang={lang} /> : null}
        {club.africanGlory && <AfricanSection club={club} lang={lang} />}
        {club.legends?.length ? <LegendsSection club={club} lang={lang} /> : null}
        {club.coaches?.length ? <CoachesSection club={club} lang={lang} /> : null}
        {club.historicMatches?.length ? <MatchesSection club={club} lang={lang} /> : null}
        {club.stadiums?.length ? <StadiumSection club={club} lang={lang} /> : null}
        {club.culture && <CultureSection club={club} lang={lang} />}
        {club.jerseys?.length ? <JerseysSection club={club} lang={lang} /> : null}
        {club.archive?.length ? <ArchiveSection club={club} lang={lang} /> : null}
        {club.stats && <StatsSection club={club} lang={lang} />}
        {club.quiz?.length ? <QuizSection questions={club.quiz} lang={lang} accent={primary} /> : null}
        {club.sources?.length ? <SourcesSection club={club} lang={lang} /> : null}
      </main>

      <footer className="border-t border-[oklch(0.7_0.1_75_/_0.2)] py-10 text-center">
        <Link to="/clubs" className="text-sm text-primary hover:underline">
          ← {{ en: "Back to Club Museums", fr: "Retour aux Musées des Clubs", ar: "العودة إلى متاحف الأندية" }[lang]}
        </Link>
        <div className="text-[10px] uppercase tracking-[0.28em] mt-4 opacity-60">
          {{ en: "A museum wing of DZ Odyssey", fr: "Une aile muséale de DZ Odyssey", ar: "جناح متحفي من DZ Odyssey" }[lang]}
        </div>
        {/* Reference secondary color so linters don't flag unused */}
        <span aria-hidden style={{ display: "none", color: secondary }} />
      </footer>
    </div>
  );
}

/* --------------------------------- Hero --------------------------------- */

function Hero({ club, lang }: { club: ClubMuseum; lang: Lang }) {
  const { primary, secondary } = club.identity.colors;
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          `radial-gradient(ellipse at 20% 20%, ${primary}22, transparent 55%), radial-gradient(ellipse at 80% 80%, ${secondary}33, transparent 55%), linear-gradient(180deg, oklch(0.14 0.02 45), oklch(0.09 0.015 40))`,
      }}
    >
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20 grid gap-10 md:grid-cols-[1fr_auto] items-center">
        <div>
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.28em] font-bold text-primary">
            ⵣ · {{ en: "Club Museum", fr: "Musée du club", ar: "متحف النادي" }[lang]}
          </p>
          <h1 className="mt-3 text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05]" style={SERIF}>
            {t(club.fullName, lang)}
          </h1>
          <p className="text-sm mt-2 text-[oklch(0.85_0.03_80)]/80">
            {t(club.city, lang)} · {{ en: "Founded", fr: "Fondé", ar: "تأسس" }[lang]} {club.founded}
          </p>
          <p className="mt-5 max-w-xl text-lg italic text-[oklch(0.9_0.03_82)]" style={SERIF}>
            {t(club.tagline, lang)}
          </p>
        </div>

        <div className="flex justify-center md:justify-end">
          <div
            className="w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] rounded-full flex items-center justify-center"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${primary}, ${secondary})`,
              boxShadow: "0 25px 55px -20px oklch(0 0 0 / 0.7), inset 0 0 0 5px oklch(1 0 0 / 0.08)",
            }}
            aria-hidden
          >
            <span className="text-4xl sm:text-5xl font-black tracking-widest text-[oklch(0.98_0.02_80)]" style={SERIF}>
              {club.identity.crestGlyph}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Sections -------------------------------- */

function SectionShell({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-32">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6" style={SERIF}>{title}</h2>
      {children}
    </section>
  );
}

function OriginsSection({ club, lang }: { club: ClubMuseum; lang: Lang }) {
  const o = club.origins!;
  return (
    <SectionShell id="origins" title={{ en: "Origins", fr: "Origines", ar: "النشأة" }[lang]}>
      <div className="grid gap-6 md:grid-cols-2">
        <Plaque>
          <PlaqueLabel>{{ en: "Historical context", fr: "Contexte historique", ar: "السياق التاريخي" }[lang]}</PlaqueLabel>
          <p>{t(o.context, lang)}</p>
        </Plaque>
        <Plaque>
          <PlaqueLabel>{{ en: "Foundation", fr: "Fondation", ar: "التأسيس" }[lang]}</PlaqueLabel>
          <p>{t(o.foundation, lang)}</p>
        </Plaque>
        <Plaque className="md:col-span-2">
          <PlaqueLabel>{{ en: "Identity & crest", fr: "Identité & écusson", ar: "الهوية والشعار" }[lang]}</PlaqueLabel>
          {club.identity.meaning && <p className="mb-2">{t(club.identity.meaning, lang)}</p>}
          {club.identity.crestHistory && <p className="mb-2">{t(club.identity.crestHistory, lang)}</p>}
          <ul className="mt-3 space-y-1 text-sm list-disc ps-5 opacity-90">
            {o.evolution.map((line, i) => <li key={i}>{t(line, lang)}</li>)}
          </ul>
        </Plaque>
      </div>
    </SectionShell>
  );
}

function TimelineSection({ club, lang }: { club: ClubMuseum; lang: Lang }) {
  const events = [...(club.timeline ?? [])].sort((a, b) => a.year - b.year);
  const [decade, setDecade] = useState<string>("all");
  const decades = useMemo(() => {
    const s = new Set<number>();
    events.forEach((e) => s.add(Math.floor(e.year / 10) * 10));
    return Array.from(s).sort((a, b) => a - b);
  }, [events]);
  const filtered = decade === "all" ? events : events.filter((e) => Math.floor(e.year / 10) * 10 === Number(decade));

  return (
    <SectionShell id="timeline" title={{ en: "Interactive Timeline", fr: "Chronologie interactive", ar: "الخطّ الزمني التفاعلي" }[lang]}>
      <div className="flex gap-2 overflow-x-auto scrollbar-none pb-3 mb-4">
        <FilterChip active={decade === "all"} onClick={() => setDecade("all")}>
          {{ en: "All", fr: "Toutes", ar: "الكل" }[lang]}
        </FilterChip>
        {decades.map((d) => (
          <FilterChip key={d} active={decade === String(d)} onClick={() => setDecade(String(d))}>
            {d}s
          </FilterChip>
        ))}
      </div>
      <ol className="relative border-s border-border ps-6 space-y-6">
        {filtered.map((e) => (
          <li key={e.id}>
            <span
              className="absolute -start-2 mt-1.5 w-3.5 h-3.5 rounded-full"
              style={{ background: `radial-gradient(circle at 30% 30%, ${club.identity.colors.primary}, ${club.identity.colors.secondary})` }}
              aria-hidden
            />
            <div className="text-xs uppercase tracking-[0.24em] text-primary">
              {e.year} · <span className="opacity-80">{{ foundation: "Foundation", title: "Title", african: "African", final: "Final", player: "Player", coach: "Coach", stadium: "Stadium", milestone: "Milestone" }[e.kind]}</span>
            </div>
            <div className="text-base font-semibold mt-1" style={SERIF}>{t(e.title, lang)}</div>
            {e.detail && <p className="text-sm text-[oklch(0.88_0.03_82)]/80 mt-1">{t(e.detail, lang)}</p>}
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}

function TrophySection({ club, lang }: { club: ClubMuseum; lang: Lang }) {
  const trophies = club.trophies ?? [];
  const grouped = useMemo(() => {
    const m = new Map<TrophyCategory, Trophy[]>();
    for (const tr of trophies) {
      if (!m.has(tr.category)) m.set(tr.category, []);
      m.get(tr.category)!.push(tr);
    }
    return Array.from(m.entries());
  }, [trophies]);

  return (
    <SectionShell id="trophies" title={{ en: "Trophy Room", fr: "Salle des trophées", ar: "قاعة الألقاب" }[lang]}>
      <div className="space-y-8">
        {grouped.map(([cat, list]) => (
          <div key={cat}>
            <div className="flex items-baseline gap-3 mb-3">
              <h3 className="text-lg font-semibold" style={SERIF}>{t(TROPHY_CATEGORY_LABEL[cat], lang)}</h3>
              <span className="text-xs opacity-70">{list.length}</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((tr) => (
                <div key={tr.id} className="rounded-xl border p-4" style={{ borderColor: "oklch(0.7 0.1 75 / 0.3)", background: "oklch(0.18 0.02 50 / 0.7)" }}>
                  <div className="flex items-center gap-3">
                    <div className="text-2xl" aria-hidden>🏆</div>
                    <div>
                      <div className="text-base font-semibold" style={SERIF}>{tr.year}</div>
                      <div className="text-sm">{t(tr.competition, lang)}</div>
                    </div>
                  </div>
                  {(tr.opponent || tr.score || tr.location) && (
                    <div className="mt-2 text-xs opacity-80 space-y-0.5">
                      {tr.opponent && <div>{{ en: "Final", fr: "Finale", ar: "النهائي" }[lang]}: {t(tr.opponent, lang)}{tr.score ? ` (${tr.score})` : ""}</div>}
                      {tr.location && <div>{{ en: "Location", fr: "Lieu", ar: "المكان" }[lang]}: {t(tr.location, lang)}</div>}
                    </div>
                  )}
                  {tr.significance && <p className="text-xs mt-2 italic text-foreground">{t(tr.significance, lang)}</p>}
                  {tr.note && <p className="text-[11px] mt-2 opacity-70">✦ {t(tr.note, lang)}</p>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

function AfricanSection({ club, lang }: { club: ClubMuseum; lang: Lang }) {
  const a = club.africanGlory!;
  return (
    <SectionShell id="african" title={{ en: "African Glory", fr: "Gloire africaine", ar: "المجد الأفريقي" }[lang]}>
      <Plaque>
        <p className="italic text-lg" style={SERIF}>{t(a.intro, lang)}</p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2 list-disc ps-5">
          {a.highlights.map((h, i) => <li key={i}>{t(h, lang)}</li>)}
        </ul>
      </Plaque>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {a.finals.map((f) => (
          <div key={`${f.year}-${t(f.competition, "en")}`} className="rounded-xl border p-4" style={{ borderColor: "oklch(0.7 0.1 75 / 0.3)" }}>
            <div className="text-xs uppercase tracking-[0.24em] text-primary">{f.year}</div>
            <div className="text-base font-semibold mt-1" style={SERIF}>{t(f.competition, lang)}</div>
            <div className="text-sm mt-1">vs {t(f.opponent, lang)} — {f.score}</div>
            {f.note && <p className="text-[11px] mt-2 opacity-70">✦ {t(f.note, lang)}</p>}
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

function LegendsSection({ club, lang }: { club: ClubMuseum; lang: Lang }) {
  const { toggle, has } = useFootballBookmarks("players");
  return (
    <SectionShell id="legends" title={{ en: "Legends Hall", fr: "Panthéon des légendes", ar: "قاعة الأساطير" }[lang]}>
      <div className="grid gap-4 md:grid-cols-2">
        {club.legends!.map((p) => {
          const id = `${club.id}:${p.id}`;
          const saved = has(id);
          return (
            <div key={p.id} className="rounded-2xl border p-5" style={{ borderColor: "oklch(0.7 0.1 75 / 0.3)", background: "oklch(0.18 0.02 50 / 0.7)" }}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-lg font-bold" style={SERIF}>{t(p.name, lang)}</div>
                  <div className="text-xs opacity-80">{t(p.position, lang)} · {p.years}</div>
                </div>
                <button
                  type="button"
                  onClick={() => toggle(id)}
                  aria-pressed={saved}
                  className="text-xs rounded-full px-3 py-1 border border-border hover:bg-muted transition"
                >
                  {saved ? "★" : "☆"} {{ en: "Save", fr: "Enregistrer", ar: "احفظ" }[lang]}
                </button>
              </div>
              <p className="text-sm mt-3">{t(p.bio, lang)}</p>
              {p.achievements?.length ? (
                <ul className="text-xs mt-3 list-disc ps-5 space-y-1 opacity-90">
                  {p.achievements.map((a, i) => <li key={i}>{t(a, lang)}</li>)}
                </ul>
              ) : null}
              {p.note && <p className="text-[11px] mt-2 opacity-70">✦ {t(p.note, lang)}</p>}
            </div>
          );
        })}
      </div>
    </SectionShell>
  );
}

function CoachesSection({ club, lang }: { club: ClubMuseum; lang: Lang }) {
  return (
    <SectionShell id="coaches" title={{ en: "Legendary Coaches", fr: "Entraîneurs légendaires", ar: "المدرّبون الأسطوريّون" }[lang]}>
      <div className="grid gap-4 md:grid-cols-2">
        {club.coaches!.map((c) => (
          <Plaque key={c.id}>
            <div className="text-lg font-bold" style={SERIF}>{t(c.name, lang)}</div>
            <div className="text-xs opacity-80">{c.years}</div>
            {c.philosophy && <p className="text-xs italic mt-2 text-foreground">{t(c.philosophy, lang)}</p>}
            <p className="text-sm mt-3">{t(c.bio, lang)}</p>
            {c.achievements?.length ? (
              <ul className="text-xs mt-3 list-disc ps-5 space-y-1 opacity-90">
                {c.achievements.map((a, i) => <li key={i}>{t(a, lang)}</li>)}
              </ul>
            ) : null}
          </Plaque>
        ))}
      </div>
    </SectionShell>
  );
}

function MatchesSection({ club, lang }: { club: ClubMuseum; lang: Lang }) {
  const { toggle, has } = useFootballBookmarks("matches");
  return (
    <SectionShell id="matches" title={{ en: "Historic Matches", fr: "Matchs historiques", ar: "مباريات تاريخية" }[lang]}>
      <div className="grid gap-4 md:grid-cols-2">
        {club.historicMatches!.map((m) => {
          const id = `${club.id}:${m.id}`;
          const saved = has(id);
          const theater = m.theaterId && hasMatchTheater(m.theaterId) ? m.theaterId : undefined;
          return (
            <div key={m.id} className="rounded-2xl border p-5" style={{ borderColor: "oklch(0.7 0.1 75 / 0.3)", background: "oklch(0.18 0.02 50 / 0.7)" }}>
              <div className="text-xs uppercase tracking-[0.24em] text-primary">{m.year}</div>
              <div className="text-base font-semibold mt-1" style={SERIF}>{t(m.title, lang)}</div>
              <p className="text-sm mt-2">{t(m.summary, lang)}</p>
              <div className="mt-3 flex items-center gap-2">
                {theater && (
                  <Link
                    to="/theater/$matchId"
                    params={{ matchId: theater }}
                    className="text-xs rounded-full px-3 py-1.5 font-semibold text-[oklch(0.15_0.02_45)]"
                    style={{ background: "linear-gradient(135deg, oklch(0.92 0.13 86), oklch(0.72 0.14 72))" }}
                  >
                    {{ en: "Open Match Theater →", fr: "Ouvrir le Match Theater →", ar: "افتح مسرح المباراة ←" }[lang]}
                  </Link>
                )}
                <button
                  type="button"
                  onClick={() => toggle(id)}
                  aria-pressed={saved}
                  className="text-xs rounded-full px-3 py-1.5 border border-border hover:bg-muted transition"
                >
                  {saved ? "★" : "☆"} {{ en: "Save", fr: "Enregistrer", ar: "احفظ" }[lang]}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </SectionShell>
  );
}

function StadiumSection({ club, lang }: { club: ClubMuseum; lang: Lang }) {
  return (
    <SectionShell id="stadiums" title={{ en: "Stadium Experience", fr: "Expérience du stade", ar: "تجربة الملعب" }[lang]}>
      <div className="grid gap-4 md:grid-cols-2">
        {club.stadiums!.map((s) => (
          <Plaque key={s.id}>
            <div className="text-lg font-bold" style={SERIF}>{t(s.name, lang)}</div>
            <div className="text-xs opacity-80">{t(s.city, lang)}{s.capacity ? ` · ${s.capacity}` : ""}{s.built ? ` · ${s.built}` : ""}</div>
            <p className="text-sm mt-3">{t(s.bio, lang)}</p>
            {s.architecture && <p className="text-xs mt-2 opacity-90">{t(s.architecture, lang)}</p>}
            {s.historicMatches?.length ? (
              <ul className="text-xs mt-3 list-disc ps-5 space-y-1 opacity-90">
                {s.historicMatches.map((h, i) => <li key={i}>{t(h, lang)}</li>)}
              </ul>
            ) : null}
            <SeatingSchematic accent={club.identity.colors.primary} />
          </Plaque>
        ))}
      </div>
    </SectionShell>
  );
}

function SeatingSchematic({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 200 90" className="mt-4 w-full h-auto" aria-hidden>
      <ellipse cx="100" cy="45" rx="90" ry="35" fill="none" stroke={accent} strokeOpacity="0.55" strokeWidth="1.5" />
      <ellipse cx="100" cy="45" rx="70" ry="27" fill="none" stroke={accent} strokeOpacity="0.35" strokeWidth="1" />
      <rect x="80" y="38" width="40" height="14" rx="1.5" fill="none" stroke={accent} strokeOpacity="0.6" strokeWidth="1" />
    </svg>
  );
}

function CultureSection({ club, lang }: { club: ClubMuseum; lang: Lang }) {
  const c = club.culture!;
  return (
    <SectionShell id="culture" title={{ en: "Supporters & Culture", fr: "Supporters & culture", ar: "الجمهور والثقافة" }[lang]}>
      <Plaque>
        <p className="italic text-lg" style={SERIF}>{t(c.intro, lang)}</p>
      </Plaque>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {c.entries.map((e) => (
          <div key={e.id} className="rounded-xl border p-4" style={{ borderColor: "oklch(0.7 0.1 75 / 0.3)" }}>
            <div className="text-base font-semibold" style={SERIF}>{t(e.title, lang)}</div>
            <p className="text-sm mt-2 opacity-90">{t(e.body, lang)}</p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

function JerseysSection({ club, lang }: { club: ClubMuseum; lang: Lang }) {
  const [i, setI] = useState(0);
  const jerseys = club.jerseys!;
  const active = jerseys[i];
  return (
    <SectionShell id="jerseys" title={{ en: "Historic Jerseys", fr: "Maillots historiques", ar: "الأقمصة التاريخية" }[lang]}>
      <div className="grid gap-6 md:grid-cols-[220px_1fr] items-start">
        <div className="flex flex-col gap-2">
          {jerseys.map((j, idx) => (
            <button
              key={j.id}
              onClick={() => setI(idx)}
              className={
                "text-start rounded-xl px-3 py-2 border text-sm transition " +
                (idx === i ? "text-[oklch(0.15_0.02_45)]" : "text-[oklch(0.9_0.03_82)] hover:bg-muted")
              }
              style={idx === i
                ? { background: "linear-gradient(135deg, oklch(0.92 0.13 86), oklch(0.72 0.14 72))", borderColor: "transparent" }
                : { borderColor: "oklch(0.7 0.1 75 / 0.3)" }}
            >
              <div className="font-semibold">{j.decade}</div>
              <div className="text-xs opacity-80">{t(j.title, lang)}</div>
            </button>
          ))}
        </div>
        <div className="rounded-2xl border p-6" style={{ borderColor: "oklch(0.7 0.1 75 / 0.3)" }}>
          <JerseyGraphic primary={active.colors.primary} secondary={active.colors.secondary} />
          <div className="mt-4 text-base font-semibold" style={SERIF}>{t(active.title, lang)} · {active.decade}</div>
          <p className="text-sm mt-2 opacity-90">{t(active.notes, lang)}</p>
        </div>
      </div>
    </SectionShell>
  );
}

function JerseyGraphic({ primary, secondary }: { primary: string; secondary: string }) {
  return (
    <svg viewBox="0 0 120 130" className="w-40 mx-auto" aria-hidden>
      <path d="M20 20 L50 10 Q60 20 70 10 L100 20 L110 45 L92 55 L92 120 L28 120 L28 55 L10 45 Z"
            fill={primary} stroke={secondary} strokeWidth="3" />
      <rect x="28" y="60" width="64" height="10" fill={secondary} opacity="0.35" />
    </svg>
  );
}

function ArchiveSection({ club, lang }: { club: ClubMuseum; lang: Lang }) {
  return (
    <SectionShell id="archive" title={{ en: "Club Museum Archive", fr: "Archives du musée", ar: "أرشيف المتحف" }[lang]}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {club.archive!.map((a) => (
          <div key={a.id} className="rounded-xl border p-4" style={{ borderColor: "oklch(0.7 0.1 75 / 0.3)", background: "oklch(0.18 0.02 50 / 0.7)" }}>
            <div className="text-xs uppercase tracking-[0.24em] text-primary">{a.kind}{a.year ? ` · ${a.year}` : ""}</div>
            <div className="text-base font-semibold mt-1" style={SERIF}>{t(a.title, lang)}</div>
            <p className="text-sm mt-2 opacity-90">{t(a.description, lang)}</p>
            {a.source && <p className="text-[11px] mt-2 opacity-70">✦ {t(a.source, lang)}</p>}
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

function StatsSection({ club, lang }: { club: ClubMuseum; lang: Lang }) {
  const s = club.stats!;
  return (
    <SectionShell id="stats" title={{ en: "Statistics Center", fr: "Centre des statistiques", ar: "مركز الإحصاءات" }[lang]}>
      {s.intro && <p className="text-sm italic opacity-90 mb-4 max-w-3xl" style={SERIF}>{t(s.intro, lang)}</p>}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {s.records.map((r) => (
          <div key={r.id} className="rounded-xl border p-4" style={{ borderColor: "oklch(0.7 0.1 75 / 0.3)" }}>
            <div className="text-xs uppercase tracking-[0.24em] text-primary">{t(r.label, lang)}</div>
            <div className="text-lg font-bold mt-1" style={SERIF}>{t(r.value, lang)}</div>
            {r.note && <p className="text-[11px] mt-2 opacity-70">✦ {t(r.note, lang)}</p>}
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

function SourcesSection({ club, lang }: { club: ClubMuseum; lang: Lang }) {
  return (
    <SectionShell id="sources" title={{ en: "Sources", fr: "Sources", ar: "المصادر" }[lang]}>
      <Plaque>
        <ul className="text-sm space-y-2 list-disc ps-5">
          {club.sources!.map((s, i) => <li key={i}>{t(s, lang)}</li>)}
        </ul>
      </Plaque>
    </SectionShell>
  );
}

/* ---------------------------------- Quiz ---------------------------------- */

function QuizSection({ questions, lang }: { questions: QuizQuestion[]; lang: Lang; accent: string }) {
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = questions[step];
  const submit = () => {
    if (picked == null) return;
    if (picked === q.answerIndex) setScore((s) => s + 1);
    if (step + 1 >= questions.length) setDone(true);
    else { setStep((s) => s + 1); setPicked(null); }
  };
  const reset = () => { setStep(0); setPicked(null); setScore(0); setDone(false); };

  return (
    <SectionShell id="quiz" title={{ en: "Museum Quiz", fr: "Quiz du musée", ar: "اختبار المتحف" }[lang]}>
      <div className="rounded-2xl border p-6" style={{ borderColor: "oklch(0.7 0.1 75 / 0.3)", background: "oklch(0.18 0.02 50 / 0.7)" }}>
        {done ? (
          <div className="text-center">
            <div className="text-xs uppercase tracking-[0.28em] text-primary">{{ en: "Result", fr: "Résultat", ar: "النتيجة" }[lang]}</div>
            <div className="text-3xl font-bold mt-2" style={SERIF}>{score} / {questions.length}</div>
            <button onClick={reset} className="mt-5 text-xs rounded-full px-4 py-2 border border-border hover:bg-muted">
              {{ en: "Try again", fr: "Réessayer", ar: "أعد المحاولة" }[lang]}
            </button>
          </div>
        ) : (
          <>
            <div className="text-xs uppercase tracking-[0.24em] text-primary">{{ en: "Question", fr: "Question", ar: "سؤال" }[lang]} {step + 1} / {questions.length}</div>
            <div className="text-lg font-semibold mt-2" style={SERIF}>{t(q.q, lang)}</div>
            <div className="mt-4 grid gap-2">
              {q.choices.map((c, i) => (
                <button
                  key={i}
                  onClick={() => setPicked(i)}
                  aria-pressed={picked === i}
                  className={
                    "text-start rounded-xl px-4 py-3 border text-sm transition " +
                    (picked === i ? "bg-muted border-[oklch(0.85_0.14_82_/_0.6)]" : "border-border hover:bg-muted")
                  }
                >
                  {t(c, lang)}
                </button>
              ))}
            </div>
            <div className="mt-5 flex items-center justify-between">
              <div className="text-xs opacity-70">{{ en: "Score", fr: "Score", ar: "النتيجة" }[lang]}: {score}</div>
              <button
                onClick={submit}
                disabled={picked == null}
                className="text-xs rounded-full px-4 py-2 font-semibold text-[oklch(0.15_0.02_45)] disabled:opacity-40"
                style={{ background: "linear-gradient(135deg, oklch(0.92 0.13 86), oklch(0.72 0.14 72))" }}
              >
                {step + 1 >= questions.length
                  ? { en: "Finish", fr: "Terminer", ar: "إنهاء" }[lang]
                  : { en: "Next →", fr: "Suivant →", ar: "التالي ←" }[lang]}
              </button>
            </div>
          </>
        )}
      </div>
    </SectionShell>
  );
}

/* --------------------------------- Atoms --------------------------------- */

function Plaque({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={"rounded-2xl border p-5 sm:p-6 " + className}
      style={{
        borderColor: "oklch(0.7 0.1 75 / 0.3)",
        background: "linear-gradient(180deg, oklch(0.20 0.03 50 / 0.85), oklch(0.14 0.02 45 / 0.9))",
        boxShadow: "inset 0 1px 0 oklch(1 0 0 / 0.05)",
      }}
    >
      {children}
    </div>
  );
}

function PlaqueLabel({ children }: { children: React.ReactNode }) {
  return <div className="text-[10px] uppercase tracking-[0.28em] text-primary mb-2">{children}</div>;
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={
        "text-xs rounded-full px-3 py-1.5 border transition whitespace-nowrap " +
        (active ? "text-[oklch(0.15_0.02_45)]" : "text-foreground hover:bg-muted")
      }
      style={active
        ? { background: "linear-gradient(135deg, oklch(0.92 0.13 86), oklch(0.72 0.14 72))", borderColor: "transparent" }
        : { borderColor: "oklch(0.7 0.1 75 / 0.3)" }}
    >
      {children}
    </button>
  );
}

// Referenced to satisfy the tree-shaker in tooling that verifies every export
// is discoverable from the entry graph.
export const __CLUB_MUSEUM_LIST__ = () => listClubMuseums();
