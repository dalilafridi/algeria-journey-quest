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

      {/* Cinematic banner header */}
      <section
        className="relative overflow-hidden border-b border-border"
        style={{
          background:
            "linear-gradient(135deg, color-mix(in oklab, var(--primary) 22%, var(--background)), var(--background) 60%, color-mix(in oklab, var(--accent) 18%, var(--background)))",
        }}
      >
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.05] text-[18rem] sm:text-[26rem] font-black leading-none flex items-center justify-center select-none"
          style={{ color: "var(--accent)" }}
        >
          ⵣ
        </div>
        <div className="relative max-w-3xl mx-auto px-4 py-10 sm:py-14 animate-cinematic-in">
          <Link
            to="/figures"
            className="text-xs uppercase tracking-[0.18em] font-semibold text-muted-foreground hover:text-foreground"
          >
            ← {tu("backToFigures", lang)}
          </Link>
          <div className="mt-5 flex items-start gap-5">
            <div
              className="relative shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center"
              style={{
                background:
                  "radial-gradient(circle at 35% 30%, color-mix(in oklab, var(--brand-gold-bright) 55%, var(--card)) 0%, color-mix(in oklab, var(--brand-gold) 30%, var(--card)) 45%, color-mix(in oklab, var(--brand-gold-deep) 32%, var(--card)) 100%)",
                boxShadow:
                  "0 0 0 1px color-mix(in oklab, var(--brand-gold) 60%, transparent), inset 0 -10px 22px color-mix(in oklab, var(--foreground) 22%, transparent), var(--shadow-gold-glow)",
              }}
            >
              <div
                aria-hidden
                className="absolute inset-1.5 rounded-full border"
                style={{ borderColor: "color-mix(in oklab, var(--background) 60%, transparent)" }}
              />
              <span
                aria-hidden
                className="relative text-5xl sm:text-6xl drop-shadow-[0_2px_6px_rgba(0,0,0,0.25)]"
                style={{ filter: "saturate(0.9)" }}
              >
                {f.emoji}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.05]"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                {t(f.displayName, lang)}
              </h1>
              <div className="mt-2 flex flex-wrap gap-1.5 text-xs">
                <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-semibold">
                  {t(f.era, lang)}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-accent/20 text-accent-foreground font-semibold">
                  📍 {t(f.regionLabel, lang)}
                </span>
                {meta?.themes?.slice(0, 4).map((th) => {
                  const def = FIGURE_THEMES[th];
                  return (
                    <span
                      key={th}
                      className="px-2 py-0.5 rounded-full text-[11px] font-semibold border border-border/70 bg-card/70 text-muted-foreground"
                    >
                      <span className="mr-0.5">{def.emoji}</span>
                      {t(def.label, lang)}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          {meta?.cinematicLine && (
            <p
              className="mt-6 text-lg sm:text-xl italic text-foreground/85 leading-relaxed border-l-2 ps-4"
              style={{
                borderColor: "color-mix(in oklab, var(--accent) 60%, var(--border))",
                fontFamily: "Georgia, 'Times New Roman', serif",
              }}
            >
              “{t(meta.cinematicLine, lang)}”
            </p>
          )}
        </div>
      </section>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <div
          className="rounded-2xl bg-card border border-border p-6 sm:p-8 animate-float-up"
          style={{ boxShadow: "var(--shadow-soft)" }}
        >

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

        {/* Connected voices (curated) */}
        {relatedFigures.length > 0 && (
          <div className="mt-8">
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3 flex items-center gap-1.5">
              <span>🕸️</span>
              <span>{connectedLabel}</span>
            </div>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {relatedFigures.map((r) => {
                const shared =
                  r.region === f.region
                    ? t(r.regionLabel, lang)
                    : r.category === f.category
                      ? t(r.era, lang)
                      : t(r.era, lang);
                return (
                  <Link
                    key={r.id}
                    to="/figures/$figureId"
                    params={{ figureId: r.id }}
                    className="rounded-xl border border-border bg-card px-3 py-2.5 hover:border-primary/50 transition flex items-start gap-2.5 group"
                  >
                    <span className="text-2xl leading-none mt-0.5">{r.emoji}</span>
                    <span className="min-w-0">
                      <span className="block font-semibold text-sm group-hover:text-primary transition truncate">
                        {t(r.displayName, lang)}
                      </span>
                      <span className="block text-[11px] text-muted-foreground truncate">{shared}</span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Cultural threads */}
        {meta?.cultureLinks && meta.cultureLinks.length > 0 && (
          <div className="mt-8">
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3 flex items-center gap-1.5">
              <span>🧵</span>
              <span>{culturalThreadsLabel}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {meta.cultureLinks.map((c, i) => (
                <Link
                  key={i}
                  to={CULTURE_KIND_TO[c.kind]}
                  className="px-3 py-1.5 rounded-full bg-card border border-border text-sm hover:border-primary/50 hover:text-primary transition"
                >
                  <span className="mr-1">{cultureKindEmoji(c.kind)}</span>
                  {t(c.label, lang)}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Audio archive placeholder */}
        {meta?.audioArchive && (
          <div
            className="mt-8 rounded-2xl border border-dashed p-4 flex items-start gap-3"
            style={{
              borderColor: "color-mix(in oklab, var(--secondary) 35%, var(--border))",
              background: "color-mix(in oklab, var(--secondary) 5%, var(--card))",
            }}
          >
            <span className="text-2xl leading-none">🎙️</span>
            <div className="min-w-0">
              <div className="text-xs uppercase tracking-wider text-secondary font-bold">
                {listenLabel}
              </div>
              <div className="text-sm text-muted-foreground mt-0.5">
                {meta.audioArchive.hint ? t(meta.audioArchive.hint, lang) : audioComingLabel}
              </div>
            </div>
          </div>
        )}

        {/* Explore other figures */}
        <div className="mt-8">
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3">
            {tu("exploreFigures", lang)}
          </div>
          <div className="flex gap-2 flex-wrap">
            {figures
              .filter((x) => x.id !== f.id && !relatedFigures.some((r) => r.id === x.id))
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
