import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { eras } from "@/data/eras";
import { getFigure, figures } from "@/data/figures";
import { t, tu, useLang } from "@/lib/i18n";

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
            </div>
          </div>

          <Section title={tu("theirStory", lang)} emoji="📖">
            <p className="leading-relaxed">{t(f.story, lang)}</p>
          </Section>

          <Section title={tu("whyTheyMatter", lang)} emoji="⭐">
            <p className="leading-relaxed">{t(f.importance, lang)}</p>
          </Section>

          <Section title={tu("oneFact", lang)} emoji="💡">
            <p className="leading-relaxed font-medium">{t(f.fact, lang)}</p>
          </Section>

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
