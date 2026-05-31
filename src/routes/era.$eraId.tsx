import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";

import { eras } from "@/data/eras";
import { getEraExtras } from "@/data/eraExtras";
import { mapRegions } from "@/data/mapRegions";
import { getFigure } from "@/data/figures";
import { MedallionFrame } from "@/components/brand/MedallionFrame";
import {
  ExhibitShell,
  ExhibitGrid,
  ExhibitHero,
  ExhibitBack,
  ExhibitEyebrow,
  ExhibitPill,
  PanelCard,
  OverviewStops,
  ExploreStats,
  ActionPanel,
  ActionButton,
  CuratorTip,
  ContextRibbon,
} from "@/components/museum/Exhibit";
import { t, tu, useLang, type LocalizedString } from "@/lib/i18n";


export const Route = createFileRoute("/era/$eraId")({
  loader: ({ params }) => {
    const era = eras.find((e) => e.id === params.eraId);
    if (!era) throw notFound();
    return { era };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const titleEn = t(loaderData.era.title, "en");
    const summaryEn = t(loaderData.era.summary, "en");
    return {
      meta: [
        { title: `${titleEn} — Algeria Through Time` },
        { name: "description", content: summaryEn },
        { property: "og:title", content: titleEn },
        { property: "og:description", content: summaryEn },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-dvh flex items-center justify-center">
      <div className="text-center">
        <p className="text-xl font-bold">Era not found</p>
        <Link to="/timeline" className="text-primary underline">
          Back to timeline
        </Link>
      </div>
    </div>
  ),
  component: EraPage,
});

const COPY = {
  whyItMatters: { en: "Why this era matters", fr: "Pourquoi cette époque compte", ar: "لماذا تهمّ هذه الحقبة" },
  museumNotes: { en: "Museum notes", fr: "Notes du musée", ar: "ملاحظات المتحف" },
  keyFigures: { en: "Key figures", fr: "Personnages clés", ar: "شخصيات بارزة" },
  keyPlaces: { en: "Key places", fr: "Lieux clés", ar: "أماكن مهمة" },
  didYouKnow: { en: "Did you know?", fr: "Le saviez-vous ?", ar: "هل تعلم؟" },
  rotate: { en: "Another fact", fr: "Un autre fait", ar: "حقيقة أخرى" },
  memory: { en: "A memory to keep", fr: "Un souvenir à garder", ar: "ذكرى تبقى" },
  relatedRegions: { en: "Related regions", fr: "Régions liées", ar: "مناطق مرتبطة" },
  continueJourney: { en: "Continue the journey", fr: "Continuer le voyage", ar: "تابع الرحلة" },
  nextEra: { en: "Next era", fr: "Époque suivante", ar: "الحقبة التالية" },
  exploreFigure: { en: "Explore figure", fr: "Découvrir la figure", ar: "اكتشف الشخصية" },
  exploreRegion: { en: "Explore region", fr: "Découvrir la région", ar: "اكتشف المنطقة" },
  curator: { en: "Curator", fr: "Conservateur", ar: "أمين المتحف" },
} as const;

function EraPage() {
  const { era } = Route.useLoaderData();
  const lang = useLang();
  const extras = getEraExtras(era.id);

  const [factIdx, setFactIdx] = useState(0);
  useEffect(() => {
    setFactIdx(0);
  }, [era.id]);
  const cycleFact = () =>
    setFactIdx((i) => (era.facts.length ? (i + 1) % era.facts.length : 0));

  const relatedRegions = (extras?.relatedRegionIds ?? [])
    .map((rid) => mapRegions.find((r) => r.id === rid))
    .filter(Boolean) as typeof mapRegions;

  const nextEra = extras?.nextEraId
    ? eras.find((e) => e.id === extras.nextEraId)
    : undefined;

  const keyFigureCards = (extras?.keyFigureIds ?? [])
    .map((fid) => getFigure(fid))
    .filter(Boolean);

  const figureCount = keyFigureCards.length + (era.figures?.length ?? 0);
  const exploreLabel = lang === "fr" ? "Ce que vous explorerez" : lang === "ar" ? "ما ستكتشفه" : "You will explore";
  const overviewLabel = lang === "fr" ? "Aperçu de l'époque" : lang === "ar" ? "نظرة على الحقبة" : "Era overview";
  const tipLabel = lang === "fr" ? "Conseil du conservateur" : lang === "ar" ? "نصيحة أمين المتحف" : "Curator's tip";
  const tipBody =
    lang === "fr"
      ? "Prenez votre temps à chaque section. Cette époque se comprend mieux en explorant ses figures et ses lieux."
      : lang === "ar"
        ? "خذ وقتك مع كل قسم. تُفهم هذه الحقبة بشكل أفضل عبر استكشاف شخصياتها وأماكنها."
        : "Take your time with each section. This era reads best when you explore its figures and places, not rush.";
  const placesLabel = lang === "fr" ? "Lieux" : lang === "ar" ? "أماكن" : "Places";
  const factsLabel = lang === "fr" ? "Faits" : lang === "ar" ? "حقائق" : "Facts";

  const continueCard = nextEra ? (
    <Link
      to="/era/$eraId"
      params={{ eraId: nextEra.id }}
      className="group block rounded-2xl border border-border bg-card/85 hover:bg-card hover:-translate-y-0.5 transition-all p-4"
      style={{ boxShadow: "var(--shadow-soft)" }}
    >
      <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
        {COPY.continueJourney[lang]}
      </div>
      <div className="mt-1 text-base font-extrabold leading-tight">
        <span className="me-2" aria-hidden>
          {nextEra.emoji}
        </span>
        {t(nextEra.title, lang)}
      </div>
      <div className="text-xs text-muted-foreground mt-0.5">{nextEra.dateRange}</div>
    </Link>
  ) : (
    <Link
      to="/figures"
      className="group block rounded-2xl border border-border bg-card/85 hover:bg-card hover:-translate-y-0.5 transition-all p-4"
      style={{ boxShadow: "var(--shadow-soft)" }}
    >
      <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
        {lang === "fr" ? "Le parcours est terminé" : lang === "ar" ? "اكتملت الرحلة" : "You've reached the present"}
      </div>
      <div className="mt-1 text-base font-extrabold leading-tight">
        <span className="me-2" aria-hidden>
          ⵣ
        </span>
        {lang === "fr"
          ? "Rencontrez les figures qui ont façonné l'Algérie"
          : lang === "ar"
            ? "تعرّف على من صاغوا تاريخ الجزائر"
            : "Meet the people who shaped Algeria"}
      </div>
    </Link>
  );

  return (
    <ExhibitShell>
      <Header />
      <main className="safe-pb">
        {/* ===== Editorial hero ===== */}
        <div className="max-w-6xl mx-auto px-4 pt-6 sm:pt-8">
          <ExhibitHero
            back={<ExhibitBack to="/timeline">{tu("backToTimeline", lang)}</ExhibitBack>}
            eyebrow={<ExhibitEyebrow>{era.dateRange}</ExhibitEyebrow>}
            title={t(era.title, lang)}
            subtitle={extras?.cinematicLine ? `“${t(extras.cinematicLine, lang)}”` : undefined}
            intro={t(era.summary, lang)}
            medallion={
              <MedallionFrame size={148} tone="gold" glow animate="reveal" inset={0.2} className="w-28 h-28 sm:w-36 sm:h-36">
                <span aria-hidden className="text-5xl sm:text-6xl">
                  {era.emoji}
                </span>
              </MedallionFrame>
            }
          />
        </div>

        {/* ===== Two-column exhibition body ===== */}
        <ExhibitGrid
          main={
            <>
              {/* Why this era matters */}
              {extras?.whyItMatters && (
                <Section title={COPY.whyItMatters[lang]} accent>
                  <p className="text-base sm:text-lg text-foreground/85 leading-relaxed">
                    {t(extras.whyItMatters, lang)}
                  </p>
                </Section>
              )}

              {/* Museum notes */}
              {extras?.museumNotes?.length ? (
                <section className="animate-float-up">
                  <SectionLabel>{COPY.museumNotes[lang]}</SectionLabel>
                  <div className="mt-3 grid sm:grid-cols-2 gap-3">
                    {extras.museumNotes.map((n, i) => (
                      <article
                        key={i}
                        className="rounded-2xl border border-border/70 bg-card/95 p-4 sm:p-5"
                        style={{ boxShadow: "var(--shadow-soft)" }}
                      >
                        <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary/80">
                          {COPY.curator[lang]}
                        </div>
                        <h3 className="mt-1 font-bold text-base leading-snug text-foreground">
                          {t(n.title, lang)}
                        </h3>
                        <p className="mt-2 text-sm text-foreground/80 leading-relaxed">{t(n.body, lang)}</p>
                      </article>
                    ))}
                  </div>
                </section>
              ) : null}

              {/* Key figures (rich cards, linked) */}
              {keyFigureCards.length > 0 && (
                <section className="animate-float-up">
                  <SectionLabel>{COPY.keyFigures[lang]}</SectionLabel>
                  <div className="mt-3 grid sm:grid-cols-2 gap-3">
                    {keyFigureCards.map((f) => (
                      <Link
                        key={f!.id}
                        to="/figures/$figureId"
                        params={{ figureId: f!.id }}
                        className="group rounded-2xl border border-border/70 bg-card hover:border-primary/40 hover:-translate-y-0.5 transition-all p-4 sm:p-5 flex items-start gap-3"
                        style={{ boxShadow: "var(--shadow-soft)" }}
                      >
                        <div
                          aria-hidden
                          className="shrink-0 grid place-items-center h-12 w-12 rounded-full text-2xl bg-primary/10 group-hover:bg-primary/15 transition-colors"
                        >
                          {f!.emoji}
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold leading-tight group-hover:text-primary transition-colors">
                            {t(f!.displayName, lang)}
                          </div>
                          <div className="text-[11px] text-muted-foreground mt-0.5">{t(f!.era, lang)}</div>
                          <p className="mt-1.5 text-sm text-foreground/80 leading-snug line-clamp-2">
                            {t(f!.fact, lang)}
                          </p>
                          <div className="mt-2 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                            {COPY.exploreFigure[lang]} →
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {era.figures?.length > 0 && (
                    <ul className="mt-4 grid sm:grid-cols-2 gap-3">
                      {era.figures.map((f: { name: LocalizedString; note: LocalizedString }, i: number) => (
                        <li key={i} className="rounded-xl border border-border/60 bg-muted/40 px-3.5 py-3">
                          <div className="font-semibold text-sm">{t(f.name, lang)}</div>
                          <div className="text-xs text-muted-foreground leading-snug mt-0.5">{t(f.note, lang)}</div>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              )}

              {/* Key places */}
              {era.places?.length > 0 && (
                <section className="animate-float-up">
                  <SectionLabel>{COPY.keyPlaces[lang]}</SectionLabel>
                  <ul className="mt-3 grid sm:grid-cols-2 gap-3">
                    {era.places.map((p: { name: LocalizedString; note: LocalizedString }, i: number) => (
                      <li
                        key={i}
                        className="rounded-2xl border border-border/70 bg-card/95 px-4 py-3.5"
                        style={{ boxShadow: "var(--shadow-soft)" }}
                      >
                        <div className="flex items-start gap-2">
                          <span aria-hidden className="text-lg leading-none mt-0.5">
                            📍
                          </span>
                          <div>
                            <div className="font-bold text-sm leading-tight">{t(p.name, lang)}</div>
                            <div className="text-xs text-muted-foreground leading-snug mt-1">{t(p.note, lang)}</div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Did you know? (rotating) */}
              {era.facts?.length > 0 && (
                <section className="animate-float-up">
                  <div
                    className="rounded-2xl border p-5 sm:p-6 bg-mosaic-soft"
                    style={{
                      borderColor: "color-mix(in oklab, var(--accent) 45%, transparent)",
                      backgroundColor: "color-mix(in oklab, var(--accent) 14%, var(--card))",
                      boxShadow: "var(--shadow-soft)",
                    }}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xl" aria-hidden>
                          ✨
                        </span>
                        <h3 className="font-bold text-base sm:text-lg">{COPY.didYouKnow[lang]}</h3>
                      </div>
                      {era.facts.length > 1 && (
                        <button type="button" onClick={cycleFact} className="text-xs font-semibold text-primary hover:underline">
                          {COPY.rotate[lang]} ↻
                        </button>
                      )}
                    </div>
                    <p key={factIdx} className="mt-3 text-base sm:text-lg leading-relaxed text-foreground/90 animate-fade-in">
                      {t(era.facts[factIdx] ?? era.facts[0], lang)}
                    </p>
                    {era.facts.length > 1 && (
                      <div className="mt-3 flex gap-1.5">
                        {era.facts.map((_: LocalizedString, i: number) => (
                          <span
                            key={i}
                            className={"h-1 rounded-full transition-all " + (i === factIdx ? "w-6 bg-primary" : "w-3 bg-primary/25")}
                            aria-hidden
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* Memory card */}
              {extras?.memoryCard && (
                <section className="animate-float-up">
                  <figure
                    className="relative overflow-hidden rounded-3xl border border-primary/30 px-6 py-8 sm:py-10 text-center"
                    style={{
                      background:
                        "linear-gradient(135deg, color-mix(in oklab, var(--primary) 14%, var(--card)), color-mix(in oklab, var(--accent) 12%, var(--card)))",
                      boxShadow: "var(--shadow-glow, var(--shadow-soft))",
                    }}
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -top-6 -start-4 text-[7rem] leading-none font-serif text-primary/20 select-none"
                    >
                      “
                    </span>
                    <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-primary mb-2">
                      {COPY.memory[lang]}
                    </div>
                    <blockquote className="text-lg sm:text-2xl font-semibold italic text-foreground leading-snug max-w-2xl mx-auto">
                      {t(extras.memoryCard.quote, lang)}
                    </blockquote>
                    {extras.memoryCard.attribution && (
                      <figcaption className="mt-3 text-xs sm:text-sm text-muted-foreground">
                        — {t(extras.memoryCard.attribution, lang)}
                      </figcaption>
                    )}
                  </figure>
                </section>
              )}
            </>
          }
          aside={
            <>
              {/* Era overview + stats */}
              <PanelCard eyebrow={overviewLabel} icon="🏛️">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
                  <span aria-hidden>{era.emoji}</span>
                  <span style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>{t(era.title, lang)}</span>
                </div>
                <ExploreStats
                  stats={[
                    { value: figureCount, label: COPY.keyFigures[lang], icon: "👤" },
                    { value: era.places?.length ?? 0, label: placesLabel, icon: "📍" },
                    { value: relatedRegions.length, label: COPY.relatedRegions[lang], icon: "🗺️" },
                    { value: era.facts?.length ?? 0, label: factsLabel, icon: "✨" },
                  ]}
                />
              </PanelCard>

              {/* Related regions overview */}
              {relatedRegions.length > 0 && (
                <PanelCard eyebrow={COPY.relatedRegions[lang]} icon="📍">
                  <OverviewStops
                    stops={relatedRegions.map((r) => ({
                      title: (
                        <>
                          <span className="me-1.5" aria-hidden>
                            {r.emoji}
                          </span>
                          {t(r.name, lang)}
                        </>
                      ),
                      to: "/map",
                      hash: `region-${r.id}`,
                    }))}
                  />
                </PanelCard>
              )}

              {/* Quiz action panel */}
              <ActionPanel
                eyebrow={lang === "fr" ? "Prêt à tester ?" : lang === "ar" ? "جاهز للاختبار؟" : "Ready to test yourself?"}
                title={tu("takeQuiz", lang)}
                subtitle={
                  lang === "fr"
                    ? "Mettez vos connaissances à l'épreuve."
                    : lang === "ar"
                      ? "اختبر معلوماتك عن هذه الحقبة."
                      : "Put your knowledge of this era to the test."
                }
                seal={
                  <MedallionFrame size={60} tone="gold" glow inset={0.22}>
                    <span aria-hidden className="text-2xl">
                      {era.emoji}
                    </span>
                  </MedallionFrame>
                }
                cta={
                  <ActionButton to="/quiz/$eraId" params={{ eraId: era.id }}>
                    {tu("takeQuiz", lang)}
                  </ActionButton>
                }
              />

              {/* Continue the journey */}
              {continueCard}

              {/* Curator tip */}
              <CuratorTip title={tipLabel}>{tipBody}</CuratorTip>
            </>
          }
        />

        {/* ===== Bottom context ribbon ===== */}
        <ContextRibbon connects={["figures", "regions", "timeline", "culture", "atlas"]} lang={lang} />
      </main>
    </ExhibitShell>
  );
}


        {/* ===== Cinematic hero ===== */}
        <header
          className="relative mt-3 sm:mt-4 overflow-hidden rounded-3xl border border-border/70 px-5 sm:px-8 py-8 sm:py-10 animate-cinematic-in"
          style={{
            background: "var(--gradient-parchment, linear-gradient(180deg, hsl(var(--card)), hsl(var(--muted))))",
            boxShadow: "var(--shadow-soft)",
          }}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute -top-10 -end-6 text-[9rem] sm:text-[12rem] leading-none font-extrabold text-primary/[0.06] select-none"
          >
            ⵣ
          </span>
          <div className="relative">
            <div className="text-5xl sm:text-6xl">{era.emoji}</div>
            <div className="mt-3 text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] text-primary">
              {era.dateRange}
            </div>
            <h1 className="mt-2 text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.05] text-foreground">
              {t(era.title, lang)}
            </h1>
            {extras?.cinematicLine && (
              <p className="mt-4 text-base sm:text-lg italic text-foreground/80 leading-relaxed max-w-2xl">
                “{t(extras.cinematicLine, lang)}”
              </p>
            )}
            <p className="mt-4 text-sm sm:text-base text-foreground/75 leading-relaxed max-w-2xl">
              {t(era.summary, lang)}
            </p>
          </div>
        </header>

        {/* ===== Why this era matters ===== */}
        {extras?.whyItMatters && (
          <Section title={COPY.whyItMatters[lang]} accent>
            <p className="text-base sm:text-lg text-foreground/85 leading-relaxed">
              {t(extras.whyItMatters, lang)}
            </p>
          </Section>
        )}

        {/* ===== Museum notes ===== */}
        {extras?.museumNotes?.length ? (
          <section className="mt-8 animate-float-up">
            <SectionLabel>{COPY.museumNotes[lang]}</SectionLabel>
            <div className="mt-3 grid sm:grid-cols-2 gap-3">
              {extras.museumNotes.map((n, i) => (
                <article
                  key={i}
                  className="rounded-2xl border border-border/70 bg-card/95 p-4 sm:p-5"
                  style={{ boxShadow: "var(--shadow-soft)" }}
                >
                  <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary/80">
                    {COPY.curator[lang]}
                  </div>
                  <h3 className="mt-1 font-bold text-base leading-snug text-foreground">
                    {t(n.title, lang)}
                  </h3>
                  <p className="mt-2 text-sm text-foreground/80 leading-relaxed">
                    {t(n.body, lang)}
                  </p>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {/* ===== Key figures (rich cards, linked) ===== */}
        {keyFigureCards.length > 0 && (
          <section className="mt-8 animate-float-up">
            <SectionLabel>{COPY.keyFigures[lang]}</SectionLabel>
            <div className="mt-3 grid sm:grid-cols-2 gap-3">
              {keyFigureCards.map((f) => (
                <Link
                  key={f!.id}
                  to="/figures/$figureId"
                  params={{ figureId: f!.id }}
                  className="group rounded-2xl border border-border/70 bg-card hover:border-primary/40 hover:-translate-y-0.5 transition-all p-4 sm:p-5 flex items-start gap-3"
                  style={{ boxShadow: "var(--shadow-soft)" }}
                >
                  <div
                    aria-hidden
                    className="shrink-0 grid place-items-center h-12 w-12 rounded-full text-2xl bg-primary/10 group-hover:bg-primary/15 transition-colors"
                  >
                    {f!.emoji}
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold leading-tight group-hover:text-primary transition-colors">
                      {t(f!.displayName, lang)}
                    </div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">
                      {t(f!.era, lang)}
                    </div>
                    <p className="mt-1.5 text-sm text-foreground/80 leading-snug line-clamp-2">
                      {t(f!.fact, lang)}
                    </p>
                    <div className="mt-2 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      {COPY.exploreFigure[lang]} →
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Era's own short figures (from eras.ts) — kept for continuity */}
            {era.figures?.length > 0 && (
              <ul className="mt-4 grid sm:grid-cols-2 gap-3">
                {era.figures.map(
                  (f: { name: LocalizedString; note: LocalizedString }, i: number) => (
                    <li
                      key={i}
                      className="rounded-xl border border-border/60 bg-muted/40 px-3.5 py-3"
                    >
                      <div className="font-semibold text-sm">{t(f.name, lang)}</div>
                      <div className="text-xs text-muted-foreground leading-snug mt-0.5">
                        {t(f.note, lang)}
                      </div>
                    </li>
                  ),
                )}
              </ul>
            )}
          </section>
        )}

        {/* ===== Key places ===== */}
        {era.places?.length > 0 && (
          <section className="mt-8 animate-float-up">
            <SectionLabel>{COPY.keyPlaces[lang]}</SectionLabel>
            <ul className="mt-3 grid sm:grid-cols-2 gap-3">
              {era.places.map(
                (p: { name: LocalizedString; note: LocalizedString }, i: number) => (
                  <li
                    key={i}
                    className="rounded-2xl border border-border/70 bg-card/95 px-4 py-3.5"
                    style={{ boxShadow: "var(--shadow-soft)" }}
                  >
                    <div className="flex items-start gap-2">
                      <span aria-hidden className="text-lg leading-none mt-0.5">
                        📍
                      </span>
                      <div>
                        <div className="font-bold text-sm leading-tight">{t(p.name, lang)}</div>
                        <div className="text-xs text-muted-foreground leading-snug mt-1">
                          {t(p.note, lang)}
                        </div>
                      </div>
                    </div>
                  </li>
                ),
              )}
            </ul>
          </section>
        )}

        {/* ===== Did you know? (rotating) ===== */}
        {era.facts?.length > 0 && (
          <section className="mt-8 animate-float-up">
            <div
              className="rounded-2xl border p-5 sm:p-6 bg-mosaic-soft"
              style={{
                borderColor: "color-mix(in oklab, var(--accent) 45%, transparent)",
                backgroundColor: "color-mix(in oklab, var(--accent) 14%, var(--card))",
                boxShadow: "var(--shadow-soft)",
              }}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl" aria-hidden>
                    ✨
                  </span>
                  <h3 className="font-bold text-base sm:text-lg">{COPY.didYouKnow[lang]}</h3>
                </div>
                {era.facts.length > 1 && (
                  <button
                    type="button"
                    onClick={cycleFact}
                    className="text-xs font-semibold text-primary hover:underline"
                  >
                    {COPY.rotate[lang]} ↻
                  </button>
                )}
              </div>
              <p
                key={factIdx}
                className="mt-3 text-base sm:text-lg leading-relaxed text-foreground/90 animate-fade-in"
              >
                {t(era.facts[factIdx] ?? era.facts[0], lang)}
              </p>
              {era.facts.length > 1 && (
                <div className="mt-3 flex gap-1.5">
                  {era.facts.map((_: LocalizedString, i: number) => (
                    <span
                      key={i}
                      className={
                        "h-1 rounded-full transition-all " +
                        (i === factIdx ? "w-6 bg-primary" : "w-3 bg-primary/25")
                      }
                      aria-hidden
                    />
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* ===== Memory card ===== */}
        {extras?.memoryCard && (
          <section className="mt-8 animate-float-up">
            <figure
              className="relative overflow-hidden rounded-3xl border border-primary/30 px-6 py-8 sm:py-10 text-center"
              style={{
                background:
                  "linear-gradient(135deg, color-mix(in oklab, var(--primary) 14%, var(--card)), color-mix(in oklab, var(--accent) 12%, var(--card)))",
                boxShadow: "var(--shadow-glow, var(--shadow-soft))",
              }}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -top-6 -start-4 text-[7rem] leading-none font-serif text-primary/20 select-none"
              >
                “
              </span>
              <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-primary mb-2">
                {COPY.memory[lang]}
              </div>
              <blockquote className="text-lg sm:text-2xl font-semibold italic text-foreground leading-snug max-w-2xl mx-auto">
                {t(extras.memoryCard.quote, lang)}
              </blockquote>
              {extras.memoryCard.attribution && (
                <figcaption className="mt-3 text-xs sm:text-sm text-muted-foreground">
                  — {t(extras.memoryCard.attribution, lang)}
                </figcaption>
              )}
            </figure>
          </section>
        )}

        {/* ===== Related regions ===== */}
        {relatedRegions.length > 0 && (
          <section className="mt-8 animate-float-up">
            <SectionLabel>{COPY.relatedRegions[lang]}</SectionLabel>
            <div className="mt-3 flex flex-wrap gap-2">
              {relatedRegions.map((r) => (
                <Link
                  key={r.id}
                  to="/map"
                  hash={`region-${r.id}`}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card/90 hover:bg-card hover:border-primary/40 px-3.5 py-2 text-sm font-semibold transition"
                >
                  <span aria-hidden>{r.emoji}</span>
                  <span>{t(r.name, lang)}</span>
                  <span className="text-primary text-xs rtl:rotate-180">→</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ===== Quiz CTA ===== */}
        <Link
          to="/quiz/$eraId"
          params={{ eraId: era.id }}
          className="mt-10 block w-full text-center px-6 py-4 rounded-2xl text-base sm:text-lg font-bold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-95 min-h-[52px]"
          style={{ background: "var(--gradient-warm)", boxShadow: "var(--shadow-glow)" }}
        >
          {tu("takeQuiz", lang)}
        </Link>

        {/* ===== Continue the journey ===== */}
        {nextEra && (
          <section className="mt-8 animate-fade-in">
            <Link
              to="/era/$eraId"
              params={{ eraId: nextEra.id }}
              className="group block rounded-2xl border border-border bg-card/85 hover:bg-card hover:-translate-y-0.5 transition-all p-4 sm:p-5"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
                    {COPY.continueJourney[lang]}
                  </div>
                  <div className="mt-1 text-base sm:text-lg font-extrabold truncate">
                    <span className="me-2" aria-hidden>
                      {nextEra.emoji}
                    </span>
                    {t(nextEra.title, lang)}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">{nextEra.dateRange}</div>
                </div>
                <span
                  aria-hidden
                  className="shrink-0 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:translate-x-0.5 transition-transform rtl:group-hover:-translate-x-0.5"
                >
                  {COPY.nextEra[lang]}
                  <span className="rtl:rotate-180">→</span>
                </span>
              </div>
            </Link>
          </section>
        )}

        {/* ===== Journey complete — fallback so the last era isn't a dead end ===== */}
        {!nextEra && (
          <section className="mt-8 animate-fade-in">
            <Link
              to="/figures"
              className="group block rounded-2xl border border-border bg-card/85 hover:bg-card hover:-translate-y-0.5 transition-all p-4 sm:p-5"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
                    {lang === "fr"
                      ? "Le parcours est terminé"
                      : lang === "ar"
                        ? "اكتملت الرحلة"
                        : "You've reached the present"}
                  </div>
                  <div className="mt-1 text-base sm:text-lg font-extrabold truncate">
                    <span className="me-2" aria-hidden>ⵣ</span>
                    {lang === "fr"
                      ? "Rencontrez les figures qui ont façonné l'Algérie"
                      : lang === "ar"
                        ? "تعرّف على من صاغوا تاريخ الجزائر"
                        : "Meet the people who shaped Algeria"}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {lang === "fr" ? "Panthéon des légendes" : lang === "ar" ? "قاعة العظماء" : "Hall of Legends"}
                  </div>
                </div>
                <span
                  aria-hidden
                  className="shrink-0 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:translate-x-0.5 transition-transform rtl:group-hover:-translate-x-0.5"
                >
                  <span className="rtl:rotate-180">→</span>
                </span>
              </div>
            </Link>
          </section>
        )}
      </main>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px flex-1 bg-border" aria-hidden />
      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.24em] text-muted-foreground">
        {children}
      </span>
      <span className="h-px flex-1 bg-border" aria-hidden />
    </div>
  );
}

function Section({
  title,
  accent,
  children,
}: {
  title: string;
  accent?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      className="mt-8 rounded-2xl border p-5 sm:p-6 animate-float-up"
      style={{
        backgroundColor: accent
          ? "color-mix(in oklab, var(--primary) 8%, var(--card))"
          : "var(--card)",
        borderColor: accent
          ? "color-mix(in oklab, var(--primary) 35%, transparent)"
          : "var(--border)",
        boxShadow: "var(--shadow-soft)",
      }}
    >
      <div className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.22em] text-primary mb-2">
        {title}
      </div>
      {children}
    </section>
  );
}
