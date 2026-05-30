import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect } from "react";
import { Header } from "@/components/Header";
import { eras } from "@/data/eras";
import { getFigure, figures, FIGURE_CATEGORIES } from "@/data/figures";
import { figureExtras } from "@/data/figureExtras";
import { figureMeta, FIGURE_THEMES, cultureKindEmoji, type FigureCultureLinkKind } from "@/data/figureMeta";
import { mapRegions } from "@/data/mapRegions";
import { LEGEND_ERAS, eraOfCategory } from "@/lib/figureEras";
import { collectionOf } from "@/lib/figureCollections";
import { EraBadge } from "@/components/brand/EraBadge";
import { MedallionFrame } from "@/components/brand/MedallionFrame";
import { CollectionEmblem } from "@/components/figures/CollectionEmblem";
import { t, tu, useLang, type LocalizedString } from "@/lib/i18n";
import { StoryFlow, type StoryScene } from "@/components/story/StoryFlow";
import { ConnectionMap } from "@/components/figures/ConnectionMap";
import { SharePlaque } from "@/components/figures/SharePlaque";
import { saveJourneyPlace } from "@/lib/continuity";

const CULTURE_KIND_TO: Record<FigureCultureLinkKind, "/cuisine" | "/cinema" | "/words" | "/ideas" | "/moments" | "/timeline" | "/lessons"> = {
  cuisine: "/cuisine",
  cinema: "/cinema",
  words: "/words",
  ideas: "/ideas",
  moments: "/moments",
  timeline: "/timeline",
  lessons: "/lessons",
};

export const Route = createFileRoute("/figures/$figureId")({
  loader: ({ params }) => {
    const figure = getFigure(params.figureId);
    if (!figure) throw notFound();
    return { figure };
  },
  head: ({ loaderData }) =>
    loaderData
      ? {
          meta: [
            { title: `${t(loaderData.figure.displayName, "en")} — Hall of Legends` },
            { name: "description", content: t(loaderData.figure.fact, "en") },
          ],
        }
      : {},
  component: FigureDetail,
  notFoundComponent: () => (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Figure not found.</h1>
        <Link to="/figures" className="mt-4 inline-block text-primary underline">
          Back to the Hall of Legends
        </Link>
      </main>
    </div>
  ),
});

function FigureDetail() {
  const { figure: f } = Route.useLoaderData();
  const lang = useLang();
  const era = f.relatedEraId ? eras.find((e) => e.id === f.relatedEraId) : undefined;
  const extras = figureExtras[f.id];
  const relatedRegion = mapRegions.find((r) => r.id === f.region || (f.region === "mascara-west" && r.id === "oran-west"));
  const legendEra = LEGEND_ERAS.find((e) => e.id === eraOfCategory(f.category))!;
  const collection = collectionOf(f.id);
  const categoryDef = FIGURE_CATEGORIES.find((c) => c.id === f.category);

  const meta = figureMeta[f.id];
  const relatedFigures = Array.from(new Set(meta?.relatedFigureIds ?? []))
    .filter((id) => id !== f.id)
    .map((id) => figures.find((x) => x.id === id))
    .filter((x): x is NonNullable<typeof x> => Boolean(x))
    .filter((x, i, arr) => arr.findIndex((y) => y.id === x.id) === i);

  useEffect(() => {
    saveJourneyPlace({
      section: "figures",
      label: { fr: `Figure · ${t(f.displayName, "fr")}`, en: `Figure · ${t(f.displayName, "en")}`, ar: `شخصية · ${t(f.displayName, "ar")}` },
      description: typeof f.era === "string" ? { fr: f.era, en: f.era, ar: f.era } : f.era,
      href: `/figures/${f.id}`,
    });
  }, [f]);

  // ---- Localized section labels ----
  const atAGlanceLabel = lang === "fr" ? "En un coup d'œil" : lang === "ar" ? "لمحة سريعة" : "At a glance";
  const significanceLabel =
    lang === "fr" ? "Importance historique" : lang === "ar" ? "الأهمية التاريخية" : "Historical significance";
  const contributionsLabel =
    lang === "fr" ? "Grandes réalisations" : lang === "ar" ? "أبرز الإنجازات" : "Major achievements";
  const contextLabel =
    lang === "fr" ? "Contexte historique" : lang === "ar" ? "السياق التاريخي" : "Historical context";
  const galleryRowLabel = lang === "fr" ? "Galerie" : lang === "ar" ? "القاعة" : "Gallery";
  const legacyLabel = lang === "fr" ? "Héritage durable" : lang === "ar" ? "الإرث الباقي" : "Lasting legacy";
  const connectionsLabel = lang === "fr" ? "Connexions" : lang === "ar" ? "روابط" : "Connections";
  const quoteLabel = lang === "fr" ? "Citation mémorable" : lang === "ar" ? "قول مأثور" : "Memorable quote";
  const roleLabel = lang === "fr" ? "Rôle" : lang === "ar" ? "الدور" : "Role";
  const eraRowLabel = lang === "fr" ? "Ère" : lang === "ar" ? "الحقبة" : "Era";
  const periodLabel = lang === "fr" ? "Période" : lang === "ar" ? "الفترة" : "Period";
  const regionRowLabel = lang === "fr" ? "Région" : lang === "ar" ? "المنطقة" : "Region";
  const knownForLabel = lang === "fr" ? "Connu pour" : lang === "ar" ? "اشتهر بـ" : "Known for";
  const relatedFiguresLabel =
    lang === "fr" ? "Figures reliées" : lang === "ar" ? "شخصيات مرتبطة" : "Related figures";
  const culturalThreadsLabel =
    lang === "fr" ? "Fils culturels" : lang === "ar" ? "خيوط ثقافية" : "Cultural threads";
  const didYouKnowLabel = lang === "fr" ? "Le saviez-vous ?" : lang === "ar" ? "هل تعلم؟" : "Did you know?";
  const keyWorksLabel =
    lang === "fr" ? "Œuvres et lieux clés" : lang === "ar" ? "أعمال وأماكن بارزة" : "Key works & places";
  const listenLabel = lang === "fr" ? "Écouter sa voix" : lang === "ar" ? "استمع إلى صوته" : "Listen to their voice";
  const audioComingLabel =
    lang === "fr" ? "Archive sonore à venir" : lang === "ar" ? "أرشيف صوتي قادم" : "Future audio archive";

  return (
    <div className="min-h-screen">
      <Header />

      {/* ============ 1) HERO PRESENTATION ============ */}
      <section className="relative museum-hero">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.05] text-[18rem] sm:text-[26rem] font-black leading-none flex items-center justify-center select-none"
          style={{ color: "var(--accent)" }}
        >
          ⵣ
        </div>
        <div className="relative max-w-5xl mx-auto px-4 py-10 sm:py-14 animate-cinematic-in">
          <Link
            to="/figures"
            className="text-xs uppercase tracking-[0.18em] font-semibold text-muted-foreground hover:text-foreground"
          >
            ← {tu("backToFigures", lang)}
          </Link>

          <div className="mt-6 flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 text-center sm:text-start">
            {/* Large portrait medallion */}
            <div className="relative shrink-0">
              <MedallionFrame
                size={160}
                tone="gold"
                glow
                animate="reveal"
                inset={0.2}
                label={t(f.displayName, lang)}
                className="w-32 h-32 sm:w-40 sm:h-40"
                seal={<EraBadge kind={legendEra.badge} size={48} label={t(legendEra.label, lang)} />}
              >
                <span
                  aria-hidden
                  className="relative text-6xl sm:text-7xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
                  style={{ filter: "saturate(0.9)" }}
                >
                  {f.emoji}
                </span>
              </MedallionFrame>
            </div>

            <div className="flex-1 min-w-0">
              <span
                className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.22em]"
                style={{ color: "color-mix(in oklab, var(--brand-gold-deep) 85%, var(--foreground))" }}
              >
                {t(legendEra.label, lang)}
              </span>
              <h1
                className="mt-1.5 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.05]"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                {t(f.displayName, lang)}
              </h1>
              {/* Role / title + lifespan */}
              <div className="mt-3 flex flex-wrap gap-1.5 justify-center sm:justify-start text-xs">
                <Link
                  to="/figures"
                  hash={`gallery-${collection.id}`}
                  className="px-2.5 py-0.5 rounded-full font-semibold border inline-flex items-center gap-1 hover:border-primary/50 transition-colors"
                  style={{
                    borderColor: "color-mix(in oklab, var(--brand-gold) 40%, var(--border))",
                    background: "color-mix(in oklab, var(--brand-gold) 8%, var(--card))",
                    color: "color-mix(in oklab, var(--brand-gold-deep) 85%, var(--foreground))",
                  }}
                >
                  <CollectionEmblem emblem={collection.emblem} accent={collection.accent} size={18} className="-ms-0.5" />
                  {t(collection.label, lang)}
                </Link>
                {categoryDef && (
                  <span className="px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground font-semibold">
                    {categoryDef.emoji} {t(categoryDef.label, lang)}
                  </span>
                )}
                <span className="px-2.5 py-0.5 rounded-full bg-accent/20 text-accent-foreground font-semibold">
                  ◈ {t(f.regionLabel, lang)}
                </span>
                <span
                  className="px-2.5 py-0.5 rounded-full font-semibold border"
                  style={{
                    borderColor: "color-mix(in oklab, var(--brand-gold) 40%, var(--border))",
                    background: "color-mix(in oklab, var(--brand-gold) 10%, var(--card))",
                    color: "color-mix(in oklab, var(--brand-gold-deep) 85%, var(--foreground))",
                  }}
                >
                  {t(f.era, lang)}
                </span>
              </div>

              {meta?.cinematicLine && (
                <p
                  className="mt-5 text-lg sm:text-xl italic text-foreground/85 leading-relaxed border-l-2 ps-4"
                  style={{
                    borderColor: "color-mix(in oklab, var(--accent) 60%, var(--border))",
                    fontFamily: "Georgia, 'Times New Roman', serif",
                  }}
                >
                  “{t(meta.cinematicLine, lang)}”
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ============ EXHIBITION BODY ============ */}
      <main className="max-w-5xl mx-auto px-4 py-8 grid lg:grid-cols-[1fr_300px] gap-6 lg:gap-8 items-start">
        {/* ---- Main narrative column ---- */}
        <div className="space-y-6 min-w-0">
          {/* 2) Historical significance */}
          <ExhibitCard accent="var(--primary)">
            <SectionTitle emoji="⭐" label={significanceLabel} />
            <p className="leading-relaxed text-foreground/90">{t(f.importance, lang)}</p>
            {meta?.modernRelevance && (
              <p className="mt-3 leading-relaxed text-foreground/80">{t(meta.modernRelevance, lang)}</p>
            )}
          </ExhibitCard>

          {/* Their story */}
          <ExhibitCard>
            <SectionTitle emoji="📖" label={tu("theirStory", lang)} />
            <p className="leading-relaxed text-foreground/90">{t(f.story, lang)}</p>
          </ExhibitCard>

          {f.extended?.storyMode && f.extended.storyMode.length > 0 && (
            <StoryFlow
              scenes={(f.extended.storyMode as LocalizedString[]).map((p: LocalizedString, i: number): StoryScene => ({
                icon: i === 0 ? "✨" : undefined,
                body: p,
              }))}
              accent="var(--secondary)"
              title={lang === "fr" ? "Mode récit" : lang === "ar" ? "وضع السرد" : "Story mode"}
              continuityTitle={f.displayName}
              defaultGuide={
                lang === "fr"
                  ? "Suis le récit, pas à pas…"
                  : lang === "ar"
                    ? "تابع الحكاية، خطوةً بخطوة…"
                    : "Follow the story, step by step…"
              }
            />
          )}

          {/* 3) Key contributions */}
          {f.extended?.whatHappened && f.extended.whatHappened.length > 0 && (
            <ExhibitCard>
              <SectionTitle emoji="🏛️" label={contributionsLabel} />
              <ul className="space-y-2.5">
                {f.extended.whatHappened.map((p: LocalizedString, i: number) => (
                  <li key={i} className="flex gap-2.5 leading-relaxed text-foreground/90">
                    <span
                      className="mt-1 shrink-0 inline-block w-1.5 h-1.5 rounded-full"
                      style={{ background: "var(--brand-gold)" }}
                      aria-hidden
                    />
                    <span>{t(p, lang)}</span>
                  </li>
                ))}
              </ul>
            </ExhibitCard>
          )}

          {extras?.keyPlacesAndWorks && extras.keyPlacesAndWorks.length > 0 && (
            <ExhibitCard>
              <SectionTitle emoji="🗺️" label={keyWorksLabel} />
              <ul className="space-y-2">
                {extras.keyPlacesAndWorks.map((item, i) => (
                  <li
                    key={i}
                    className="rounded-xl border border-border bg-muted/40 px-3 py-2.5 flex gap-3 items-start"
                  >
                    <span className="text-xl leading-none mt-0.5" aria-hidden>
                      {item.emoji}
                    </span>
                    <div className="min-w-0">
                      <div className="font-semibold text-sm">{t(item.label, lang)}</div>
                      {item.note && (
                        <div className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                          {t(item.note, lang)}
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </ExhibitCard>
          )}

          {/* 4) Memorable quote */}
          {f.extended?.keyLesson && (
            <div
              className="relative rounded-2xl border p-6 sm:p-7 text-center"
              style={{
                background:
                  "linear-gradient(135deg, color-mix(in oklab, var(--accent) 14%, var(--card)), var(--card))",
                borderColor: "color-mix(in oklab, var(--brand-gold) 35%, var(--border))",
                boxShadow: "var(--shadow-soft)",
              }}
            >
              <div className="text-[10px] uppercase tracking-[0.22em] font-bold mb-3"
                style={{ color: "color-mix(in oklab, var(--brand-gold-deep) 85%, var(--foreground))" }}>
                {quoteLabel}
              </div>
              <p
                className="text-xl sm:text-2xl leading-relaxed font-semibold text-foreground"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                <span aria-hidden style={{ color: "var(--brand-gold)" }}>“</span>
                {t(f.extended.keyLesson, lang)}
                <span aria-hidden style={{ color: "var(--brand-gold)" }}>”</span>
              </p>
            </div>
          )}

          {/* The one fact */}
          <ExhibitCard accent="var(--accent)">
            <SectionTitle emoji="💡" label={tu("oneFact", lang)} />
            <p className="leading-relaxed font-medium text-foreground/90">{t(f.fact, lang)}</p>
          </ExhibitCard>

          {extras?.didYouKnow && (
            <ExhibitCard accent="var(--accent)">
              <SectionTitle emoji="💭" label={didYouKnowLabel} />
              <p className="leading-relaxed text-foreground/90">{t(extras.didYouKnow, lang)}</p>
            </ExhibitCard>
          )}

          {/* 6) Lasting legacy */}
          {(f.extended?.aftermath && f.extended.aftermath.length > 0) && (
            <ExhibitCard accent="var(--secondary)">
              <SectionTitle emoji="🌿" label={legacyLabel} />
              <div className="space-y-3">
                {f.extended.aftermath.map((p: LocalizedString, i: number) => (
                  <p key={i} className="leading-relaxed text-foreground/90">
                    {t(p, lang)}
                  </p>
                ))}
              </div>
            </ExhibitCard>
          )}

          {/* 7) Historical context — the era they lived in */}
          {era && (
            <ExhibitCard accent="var(--brand-gold-deep)">
              <SectionTitle emoji="🏺" label={contextLabel} />
              <div className="flex items-center gap-2 mb-2 text-sm font-semibold text-foreground/90">
                <span aria-hidden className="text-lg">{era.emoji}</span>
                <span>{t(era.title, lang)}</span>
                <span className="text-xs text-muted-foreground">· {era.dateRange}</span>
              </div>
              <p className="leading-relaxed text-foreground/85">{t(era.summary, lang)}</p>
              <Link
                to="/era/$eraId"
                params={{ eraId: era.id }}
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
              >
                {tu("relatedEra", lang)}
                <span aria-hidden>→</span>
              </Link>
            </ExhibitCard>
          )}


          <Link
            to="/figures/quiz"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-primary-foreground font-semibold"
            style={{ background: "var(--gradient-warm)" }}
          >
            {tu("guessThisFigureCta", lang)}
          </Link>
        </div>

        {/* ---- At a glance + connections sidebar ---- */}
        <aside className="space-y-6 lg:sticky lg:top-[76px]">
          {/* At a glance */}
          <div
            className="rounded-2xl border p-5 bg-parchment-card"
            style={{ borderColor: "var(--border)", boxShadow: "var(--shadow-soft)" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <EraBadge kind={legendEra.badge} size={34} />
              <div className="text-sm font-bold uppercase tracking-[0.16em] text-foreground">
                {atAGlanceLabel}
              </div>
            </div>
            <dl className="space-y-3 text-sm">
              <GlanceRow label={galleryRowLabel} value={`${collection.emblem} ${t(collection.label, lang)}`} />
              {categoryDef && <GlanceRow label={roleLabel} value={t(categoryDef.label, lang)} />}
              <GlanceRow label={eraRowLabel} value={t(legendEra.label, lang)} />
              <GlanceRow label={periodLabel} value={t(f.era, lang)} />
              <GlanceRow
                label={regionRowLabel}
                value={relatedRegion ? t(relatedRegion.name, lang) : t(f.regionLabel, lang)}
              />
              {meta?.themes && meta.themes.length > 0 && (
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground font-bold mb-1.5">
                    {knownForLabel}
                  </dt>
                  <dd className="flex flex-wrap gap-1.5">
                    {meta.themes.slice(0, 5).map((th) => {
                      const def = FIGURE_THEMES[th];
                      return (
                        <span
                          key={th}
                          className="px-2 py-0.5 rounded-full text-[11px] font-semibold border border-border/70 bg-card/70 text-muted-foreground"
                        >
                          <span className="mr-0.5" aria-hidden>{def.emoji}</span>
                          {t(def.label, lang)}
                        </span>
                      );
                    })}
                  </dd>
                </div>
              )}
            </dl>

            {era && (
              <div className="mt-4 pt-4 border-t border-border">
                <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground font-bold mb-2">
                  {tu("relatedEra", lang)}
                </div>
                <Link
                  to="/era/$eraId"
                  params={{ eraId: era.id }}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-muted hover:bg-muted/70 transition w-full"
                >
                  <span className="text-xl">{era.emoji}</span>
                  <span className="font-semibold text-sm">{t(era.title, lang)}</span>
                </Link>
              </div>
            )}

            {relatedRegion && (
              <Link
                to="/map"
                hash={`region-${relatedRegion.id}`}
                className="mt-2.5 inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-muted hover:bg-muted/70 transition w-full"
              >
                <span className="text-xl" aria-hidden>◈</span>
                <span className="font-semibold text-sm text-primary">{t(relatedRegion.name, lang)}</span>
              </Link>
            )}
          </div>

          {/* Audio archive placeholder */}
          {meta?.audioArchive && (
            <div
              className="rounded-2xl border border-dashed p-4 flex items-start gap-3"
              style={{
                borderColor: "color-mix(in oklab, var(--secondary) 35%, var(--border))",
                background: "color-mix(in oklab, var(--secondary) 5%, var(--card))",
              }}
            >
              <span className="text-2xl leading-none">🎙️</span>
              <div className="min-w-0">
                <div className="text-xs uppercase tracking-wider text-secondary font-bold">{listenLabel}</div>
                <div className="text-sm text-muted-foreground mt-0.5">
                  {meta.audioArchive.hint ? t(meta.audioArchive.hint, lang) : audioComingLabel}
                </div>
              </div>
            </div>
          )}
        </aside>
      </main>

      {/* ============ 5) CONNECTIONS — archive connection wall ============ */}
      <section className="max-w-5xl mx-auto px-4 pb-12">
        <div className="flex items-center gap-3 mb-5">
          <h2
            className="text-2xl font-bold"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            {connectionsLabel}
          </h2>
          <div
            aria-hidden
            className="flex-1 h-px"
            style={{
              background:
                "linear-gradient(90deg, color-mix(in oklab, var(--brand-gold) 60%, transparent), transparent)",
            }}
          />
        </div>

        <ConnectionMap figure={f} lang={lang} />

        {meta?.cultureLinks && meta.cultureLinks.length > 0 && (
          <div className="mt-8">
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3">
              {culturalThreadsLabel}
            </div>
            <div className="flex flex-wrap gap-2">
              {meta.cultureLinks.map((c, i) => (
                <Link
                  key={i}
                  to={CULTURE_KIND_TO[c.kind]}
                  className="px-3 py-1.5 rounded-full bg-card border border-border text-sm hover:border-primary/50 hover:text-primary transition"
                >
                  <span className="mr-1" aria-hidden>{cultureKindEmoji(c.kind)}</span>
                  {t(c.label, lang)}
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>


      {/* Explore other legends */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3">
          {tu("exploreFigures", lang)}
        </div>
        <div className="flex gap-2 flex-wrap">
          {figures
            .filter((x) => x.id !== f.id && !relatedFigures.some((r) => r.id === x.id))
            .slice(0, 10)
            .map((x) => (
              <Link
                key={x.id}
                to="/figures/$figureId"
                params={{ figureId: x.id }}
                className="px-3 py-1.5 rounded-full bg-card border border-border text-sm hover:border-primary/50 transition"
              >
                <span className="mr-1" aria-hidden>{x.emoji}</span>
                {t(x.displayName, lang)}
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}

/* ---------------- Presentational helpers ---------------- */

function ExhibitCard({
  children,
  accent,
}: {
  children: React.ReactNode;
  accent?: string;
}) {
  return (
    <div
      className="relative rounded-2xl bg-card border border-border p-5 sm:p-6 overflow-hidden"
      style={{ boxShadow: "var(--shadow-soft)" }}
    >
      {accent && (
        <span
          aria-hidden
          className="absolute inset-y-0 start-0 w-1"
          style={{ background: `color-mix(in oklab, ${accent} 70%, transparent)` }}
        />
      )}
      {children}
    </div>
  );
}

function SectionTitle({ emoji, label }: { emoji: string; label: string }) {
  return (
    <div className="text-xs uppercase tracking-wider text-muted-foreground font-bold mb-3 flex items-center gap-1.5">
      <span aria-hidden>{emoji}</span>
      <span>{label}</span>
    </div>
  );
}

function GlanceRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <dt className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground font-bold pt-0.5 shrink-0">
        {label}
      </dt>
      <dd className="text-sm font-semibold text-foreground text-end">{value}</dd>
    </div>
  );
}
