import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { cinemaQuiz, cinemaThemeLabels, featuredFilms } from "@/data/cinema";
import { figures } from "@/data/figures";
import { t, useLang } from "@/lib/i18n";
import { saveJourneyPlace } from "@/lib/continuity";
import { JourneyNext } from "@/components/JourneyNext";

/** Map a film to a director figure profile when one exists in figures.ts. */
const FILM_DIRECTOR_FIGURE: Record<string, string> = {
  "omar-gatlato": "merzak-allouache",
  "bab-el-oued-city": "merzak-allouache",
  "chronicle-years-fire": "mohammed-lakhdar-hamina",
  "outside-the-law": "rachid-bouchareb",
};

/** Map a film to a related region (for the "place" link). */
const FILM_REGION: Record<string, string> = {
  "battle-of-algiers": "algiers",
  "omar-gatlato": "algiers",
  "bab-el-oued-city": "algiers",
};

export const Route = createFileRoute("/cinema")({
  head: () => ({
    meta: [
      { title: "Algerian Cinema & Film — Algeria Through Time" },
      {
        name: "description",
        content:
          "Featured Algerian films and a mini-quiz: memory, youth, women, society and resistance through cinema.",
      },
    ],
  }),
  component: CinemaPage,
});

function CinemaPage() {
  const lang = useLang();
  const [cinemaAnswers, setCinemaAnswers] = useState<Record<string, number>>({});

  useEffect(() => {
    saveJourneyPlace({
      section: "figures",
      label: { fr: "Cinéma", en: "Cinema", ar: "السينما" },
      description: {
        fr: "Films emblématiques d'Algérie",
        en: "Featured Algerian films",
        ar: "أفلام جزائرية بارزة",
      },
      href: "/cinema",
    });
  }, []);

  return (
    <div className="min-h-dvh">
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <nav className="text-xs text-muted-foreground mb-4">
          <Link to="/words" className="hover:text-foreground transition-colors">
            {lang === "fr" ? "Culture" : lang === "ar" ? "الثقافة" : "Culture"}
          </Link>
          <span className="mx-1.5">/</span>
          <span className="text-foreground font-semibold">
            {lang === "fr" ? "Cinéma & Film" : lang === "ar" ? "السينما والفن" : "Cinema & Film"}
          </span>
        </nav>

        <section>
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
              {lang === "fr" ? "Cinéma & Film" : lang === "ar" ? "السينما والفن" : "Cinema & Film"}
            </div>
            <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight">
              {lang === "fr" ? "Films emblématiques" : lang === "ar" ? "أفلام بارزة" : "Featured Films"}
            </h1>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              {lang === "fr"
                ? "Le cinéma raconte l'identité algérienne à travers la mémoire, la jeunesse, les femmes, la société et la résistance."
                : lang === "ar"
                  ? "تروي السينما الهوية الجزائرية عبر الذاكرة والشباب والنساء والمجتمع والمقاومة."
                  : "Cinema tells Algerian identity through memory, youth, women, society and resistance."}
            </p>
            <Link to="/moments" className="mt-3 inline-block text-sm font-semibold text-primary hover:underline">
              {lang === "fr" ? "Related · Explorer les récits" : lang === "ar" ? "مرتبط · استكشف القصص" : "Related · Explore stories"} →
            </Link>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {Object.entries(cinemaThemeLabels).map(([key, label]) => (
              <span key={key} className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-semibold">
                {t(label, lang)}
              </span>
            ))}
          </div>

          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            {featuredFilms.map((film) => {
              const directorId = FILM_DIRECTOR_FIGURE[film.id];
              const director = directorId ? figures.find((f) => f.id === directorId) : undefined;
              const regionId = FILM_REGION[film.id];
              return (
                <article
                  key={film.id}
                  className="card-hover rounded-2xl bg-card border border-border p-5 transition hover:border-primary/40"
                  style={{ boxShadow: "var(--shadow-soft)" }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-bold text-lg leading-tight">{t(film.title, lang)}</h3>
                    <span className="shrink-0 text-xs font-bold px-2 py-1 rounded-full bg-muted text-muted-foreground">
                      {film.year}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{t(film.description, lang)}</p>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs">
                    <span className="px-2.5 py-1 rounded-full bg-accent/20 text-accent-foreground font-semibold">
                      {t(cinemaThemeLabels[film.theme], lang)}
                    </span>
                    {film.director && (
                      director ? (
                        <Link
                          to="/figures/$figureId"
                          params={{ figureId: director.id }}
                          className="px-2.5 py-1 rounded-full bg-secondary/15 text-secondary font-semibold hover:bg-secondary/25 transition"
                        >
                          🎬 {t(film.director, lang)}
                        </Link>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full bg-muted text-muted-foreground font-semibold">
                          {t(film.director, lang)}
                        </span>
                      )
                    )}
                    {regionId && (
                      <Link
                        to="/map"
                        hash={`region-${regionId}`}
                        className="px-2.5 py-1 rounded-full bg-primary/10 text-primary font-semibold hover:bg-primary/20 transition"
                      >
                        📍 {regionId === "algiers" ? (lang === "fr" ? "Alger" : lang === "ar" ? "الجزائر العاصمة" : "Algiers") : regionId}
                      </Link>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-8 rounded-2xl bg-card border border-border p-5" style={{ boxShadow: "var(--shadow-soft)" }}>
            <h3 className="text-lg font-bold">
              {lang === "fr" ? "Mini-quiz cinéma" : lang === "ar" ? "اختبار سينمائي قصير" : "Cinema mini quiz"}
            </h3>
            <div className="mt-4 grid gap-4">
              {cinemaQuiz.map((q) => {
                const selected = cinemaAnswers[q.id];
                const locked = selected !== undefined;
                return (
                  <div key={q.id} className="rounded-xl bg-muted/40 border border-border p-4">
                    <div className="font-semibold text-sm">{t(q.prompt, lang)}</div>
                    <div className="mt-3 grid gap-2">
                      {q.options.map((option, index) => {
                        const correct = locked && index === q.answerIndex;
                        const wrong = locked && selected === index && index !== q.answerIndex;
                        return (
                          <button
                            key={index}
                            type="button"
                            disabled={locked}
                            onClick={() => setCinemaAnswers((prev) => ({ ...prev, [q.id]: index }))}
                            className={
                              "text-start px-3 py-2 rounded-lg border text-sm font-semibold transition " +
                              (correct
                                ? "bg-success/20 border-success/60"
                                : wrong
                                  ? "bg-destructive/15 border-destructive/50"
                                  : "bg-card border-border hover:border-primary/40")
                            }
                          >
                            {t(option, lang)}
                          </button>
                        );
                      })}
                    </div>
                    {locked && (
                      <p className="mt-3 text-xs text-muted-foreground leading-relaxed">💡 {t(q.explanation, lang)}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <JourneyNext current="cinema" />
      </main>
    </div>
  );
}
