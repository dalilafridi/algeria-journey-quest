import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect } from "react";
import { Header } from "@/components/Header";
import { eras } from "@/data/eras";
import { getFigure, figures } from "@/data/figures";
import { figureExtras } from "@/data/figureExtras";
import { figureMeta, FIGURE_THEMES, cultureKindEmoji, type FigureCultureLinkKind } from "@/data/figureMeta";
import { mapRegions } from "@/data/mapRegions";
import { t, tu, useLang, type LocalizedString } from "@/lib/i18n";
import { StoryFlow, type StoryScene } from "@/components/story/StoryFlow";
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
            { title: `${t(loaderData.figure.displayName, "en")} — Great Figures of Algeria` },
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
          Back to figures
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

  const meta = figureMeta[f.id];
  const relatedFigures = (meta?.relatedFigureIds ?? [])
    .map((id) => figures.find((x) => x.id === id))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

  useEffect(() => {
    saveJourneyPlace({
      section: "figures",
      label: { fr: `Figure · ${t(f.displayName, "fr")}`, en: `Figure · ${t(f.displayName, "en")}`, ar: `شخصية · ${t(f.displayName, "ar")}` },
      description: typeof f.era === "string" ? { fr: f.era, en: f.era, ar: f.era } : f.era,
      href: `/figures/${f.id}`,
    });
  }, [f]);

  const didYouKnowLabel =
    lang === "fr" ? "Le saviez-vous ?" : lang === "ar" ? "هل تعلم؟" : "Did you know?";
  const keyWorksLabel =
    lang === "fr"
      ? "Œuvres et lieux clés"
      : lang === "ar"
        ? "أعمال وأماكن بارزة"
        : "Key works & places";
  const whyTodayLabel =
    lang === "fr" ? "Pourquoi cela compte aujourd'hui" : lang === "ar" ? "لماذا يهمّ هذا اليوم" : "Why they matter today";
  const connectedLabel =
    lang === "fr" ? "Voix reliées" : lang === "ar" ? "أصوات مرتبطة" : "Connected voices";
  const culturalThreadsLabel =
    lang === "fr" ? "Fils culturels" : lang === "ar" ? "خيوط ثقافية" : "Cultural threads";
  const listenLabel =
    lang === "fr" ? "Écouter sa voix" : lang === "ar" ? "استمع إلى صوته" : "Listen to their voice";
  const audioComingLabel =
    lang === "fr" ? "Archive sonore à venir" : lang === "ar" ? "أرشيف صوتي قادم" : "Future audio archive";

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-2xl mx-auto px-4 py-8">
        <Link to="/figures" className="text-sm text-muted-foreground hover:text-foreground">
          {tu("backToFigures", lang)}
        </Link>

        <div
          className="mt-4 rounded-2xl bg-card border border-border p-6 sm:p-8 animate-float-up"
          style={{ boxShadow: "var(--shadow-soft)" }}
        >
          <div className="flex items-start gap-4">
            <div className="text-5xl">{f.emoji}</div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {t(f.displayName, lang)}
              </h1>
              <div className="mt-1 flex flex-wrap gap-2 text-xs">
                <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-semibold">
                  {t(f.era, lang)}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-accent/20 text-accent-foreground font-semibold">
                  {t(f.regionLabel, lang)}
                </span>
              </div>
              {meta?.themes && meta.themes.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {meta.themes.map((th) => {
                    const def = FIGURE_THEMES[th];
                    return (
                      <span
                        key={th}
                        className="px-2 py-0.5 rounded-full text-[11px] font-semibold border border-border/70 bg-muted/40 text-muted-foreground"
                      >
                        <span className="mr-0.5">{def.emoji}</span>
                        {t(def.label, lang)}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {meta?.cinematicLine && (
            <p
              className="mt-5 italic text-foreground/80 leading-relaxed border-l-2 pl-3"
              style={{ borderColor: "color-mix(in oklab, var(--secondary) 55%, var(--border))", fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              {t(meta.cinematicLine, lang)}
            </p>
          )}

          <Section title={tu("theirStory", lang)} emoji="📖">
            <p className="leading-relaxed">{t(f.story, lang)}</p>
          </Section>

          {f.extended?.storyMode && f.extended.storyMode.length > 0 && (
            <div className="mt-6">
              <StoryFlow
                scenes={(f.extended.storyMode as LocalizedString[]).map((p: LocalizedString, i: number): StoryScene => ({
                  icon: i === 0 ? "✨" : undefined,
                  body: p,
                }))}
                accent="var(--secondary)"
                title={
                  lang === "fr"
                    ? "Mode récit"
                    : lang === "ar"
                      ? "وضع السرد"
                      : "Story mode"
                }
                continuityTitle={f.displayName}
                defaultGuide={
                  lang === "fr"
                    ? "Suis le récit, pas à pas…"
                    : lang === "ar"
                      ? "تابع الحكاية، خطوةً بخطوة…"
                      : "Follow the story, step by step…"
                }
              />
            </div>
          )}

          <Section title={tu("whyTheyMatter", lang)} emoji="⭐">
            <p className="leading-relaxed">{t(f.importance, lang)}</p>
          </Section>

          {meta?.modernRelevance && (
            <div
              className="mt-6 rounded-2xl border p-5"
              style={{
                background:
                  "linear-gradient(135deg, color-mix(in oklab, var(--primary) 10%, var(--card)), var(--card))",
                borderColor: "color-mix(in oklab, var(--primary) 35%, var(--border))",
              }}
            >
              <div className="text-xs uppercase tracking-wider text-primary font-bold mb-1.5 flex items-center gap-1.5">
                <span>✨</span>
                <span>{whyTodayLabel}</span>
              </div>
              <p className="leading-relaxed text-foreground/90">{t(meta.modernRelevance, lang)}</p>
            </div>
          )}

          {f.extended?.whatHappened && f.extended.whatHappened.length > 0 && (
            <Section
              title={
                lang === "fr"
                  ? "Ce qui s'est passé"
                  : lang === "ar"
                    ? "ما الذي حدث"
                    : "What happened"
              }
              emoji="📜"
            >
              <ul className="space-y-2">
                {f.extended.whatHappened.map((p: LocalizedString, i: number) => (
                  <li key={i} className="flex gap-2 leading-relaxed">
                    <span className="text-primary mt-0.5">•</span>
                    <span>{t(p, lang)}</span>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {f.extended?.aftermath && f.extended.aftermath.length > 0 && (
            <Section
              title={
                lang === "fr" ? "Héritage" : lang === "ar" ? "الإرث والآثار" : "Aftermath"
              }
              emoji="🌿"
            >
              <div className="space-y-3">
                {f.extended.aftermath.map((p: LocalizedString, i: number) => (
                  <p key={i} className="leading-relaxed text-foreground/90">
                    {t(p, lang)}
                  </p>
                ))}
              </div>
            </Section>
          )}

          <Section title={tu("oneFact", lang)} emoji="💡">
            <p className="leading-relaxed font-medium">{t(f.fact, lang)}</p>
          </Section>

          {extras?.didYouKnow && (
            <div
              className="mt-6 rounded-2xl border p-5"
              style={{
                background:
                  "linear-gradient(135deg, color-mix(in oklab, var(--accent) 18%, var(--card)), var(--card))",
                borderColor: "color-mix(in oklab, var(--accent) 40%, var(--border))",
              }}
            >
              <div className="text-xs uppercase tracking-wider text-accent-foreground/80 font-bold mb-1.5 flex items-center gap-1.5">
                <span>💭</span>
                <span>{didYouKnowLabel}</span>
              </div>
              <p className="leading-relaxed text-foreground/90">{t(extras.didYouKnow, lang)}</p>
            </div>
          )}

          {extras?.keyPlacesAndWorks && extras.keyPlacesAndWorks.length > 0 && (
            <Section title={keyWorksLabel} emoji="🗺️">
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
            </Section>
          )}

          {f.extended?.keyLesson && (
            <div
              className="mt-6 rounded-2xl border p-5"
              style={{
                background:
                  "linear-gradient(135deg, color-mix(in oklab, var(--secondary) 14%, var(--card)), var(--card))",
                borderColor: "color-mix(in oklab, var(--secondary) 35%, var(--border))",
              }}
            >
              <div className="text-xs uppercase tracking-wider text-secondary font-bold mb-1.5">
                {lang === "fr"
                  ? "Leçon clé"
                  : lang === "ar"
                    ? "الدرس الجوهري"
                    : "Key lesson"}
              </div>
              <p className="leading-relaxed font-semibold text-foreground">
                « {t(f.extended.keyLesson, lang)} »
              </p>
            </div>
          )}

          {era && (
            <div className="mt-6 pt-6 border-t border-border">
              <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">
                {tu("relatedEra", lang)}
              </div>
              <Link
                to="/era/$eraId"
                params={{ eraId: era.id }}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-muted hover:bg-muted/70 transition"
              >
                <span className="text-xl">{era.emoji}</span>
                <span className="font-semibold">{t(era.title, lang)}</span>
              </Link>
            </div>
          )}

          {relatedRegion && (
            <div className="mt-4 text-sm text-muted-foreground">
              {lang === "fr" ? "Related" : lang === "ar" ? "مرتبط" : "Related"}{" · "}
              <Link to="/map" hash={`region-${relatedRegion.id}`} className="font-semibold text-primary hover:underline">
                {t(relatedRegion.name, lang)}
              </Link>
            </div>
          )}

          <Link
            to="/figures/quiz"
            className="mt-6 inline-block px-5 py-2.5 rounded-xl text-primary-foreground font-semibold"
            style={{ background: "var(--gradient-warm)" }}
          >
            {tu("guessThisFigureCta", lang)}
          </Link>
        </div>

        {/* Other figures */}
        <div className="mt-8">
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3">
            {tu("exploreFigures", lang)}
          </div>
          <div className="flex gap-2 flex-wrap">
            {figures
              .filter((x) => x.id !== f.id)
              .slice(0, 8)
              .map((x) => (
                <Link
                  key={x.id}
                  to="/figures/$figureId"
                  params={{ figureId: x.id }}
                  className="px-3 py-1.5 rounded-full bg-card border border-border text-sm hover:border-primary/50 transition"
                >
                  <span className="mr-1">{x.emoji}</span>
                  {t(x.displayName, lang)}
                </Link>
              ))}
          </div>
        </div>
      </main>
    </div>
  );
}

function Section({ title, emoji, children }: { title: string; emoji: string; children: React.ReactNode }) {
  return (
    <div className="mt-6">
      <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2 flex items-center gap-1.5">
        <span>{emoji}</span>
        <span>{title}</span>
      </div>
      <div className="text-foreground">{children}</div>
    </div>
  );
}
