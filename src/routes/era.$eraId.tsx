import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { EraMap } from "@/components/EraMap";
import { eras } from "@/data/eras";
import { t, tu, useLang } from "@/lib/i18n";

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
    <div className="min-h-screen flex items-center justify-center">
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

function EraPage() {
  const { era } = Route.useLoaderData();
  const lang = useLang();

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-8">
        <Link
          to="/timeline"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          {tu("backToTimeline", lang)}
        </Link>

        <header className="mt-4 animate-float-up">
          <div className="text-6xl">{era.emoji}</div>
          <div className="text-sm font-semibold text-primary mt-2">{era.dateRange}</div>
          <h1 className="text-4xl font-extrabold tracking-tight">{t(era.title, lang)}</h1>
          <p className="mt-4 text-lg text-foreground/85 leading-relaxed">
            {t(era.summary, lang)}
          </p>
        </header>

        <section className="mt-8 grid sm:grid-cols-2 gap-4">
          <Card title={tu("keyFigures", lang)} icon="👤">
            <ul className="space-y-3">
              {era.figures.map((f, i) => (
                <li key={i}>
                  <div className="font-semibold">{t(f.name, lang)}</div>
                  <div className="text-sm text-muted-foreground">{t(f.note, lang)}</div>
                </li>
              ))}
            </ul>
          </Card>
          <Card title={tu("keyPlaces", lang)} icon="📍">
            <ul className="space-y-3">
              {era.places.map((p, i) => (
                <li key={i}>
                  <div className="font-semibold">{t(p.name, lang)}</div>
                  <div className="text-sm text-muted-foreground">{t(p.note, lang)}</div>
                </li>
              ))}
            </ul>
          </Card>
        </section>

        {era.places.length > 0 && (
          <section className="mt-6">
            <Card title={tu("mapOfKeyPlaces", lang)} icon="🗺️">
              <EraMap places={era.places} lang={lang} />
            </Card>
          </section>
        )}

        <section className="mt-6">
          <Card title={tu("didYouKnow", lang)} icon="💡" accent>
            <ul className="space-y-2">
              {era.facts.map((f, i) => (
                <li key={i} className="flex gap-2">
                  <span>✨</span>
                  <span>{t(f, lang)}</span>
                </li>
              ))}
            </ul>
          </Card>
        </section>

        <Link
          to="/quiz/$eraId"
          params={{ eraId: era.id }}
          className="mt-8 block w-full text-center px-6 py-4 rounded-2xl text-lg font-bold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-95"
          style={{ background: "var(--gradient-warm)", boxShadow: "var(--shadow-glow)" }}
        >
          {tu("takeQuiz", lang)}
        </Link>
      </main>
    </div>
  );
}

function Card({
  title,
  icon,
  accent,
  children,
}: {
  title: string;
  icon: string;
  accent?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-2xl p-5 border"
      style={{
        backgroundColor: accent
          ? "color-mix(in oklab, var(--accent) 18%, var(--card))"
          : "var(--card)",
        borderColor: accent ? "color-mix(in oklab, var(--accent) 50%, transparent)" : "var(--border)",
        boxShadow: "var(--shadow-soft)",
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl">{icon}</span>
        <h3 className="font-bold">{title}</h3>
      </div>
      <div className="text-sm">{children}</div>
    </div>
  );
}
