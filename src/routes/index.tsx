import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { dailyFacts } from "@/data/eras";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Algeria Through Time — A Fun History Journey" },
      {
        name: "description",
        content:
          "Explore the rich history of Algeria from Numidia to independence. Learn through stories, quizzes, and badges.",
      },
      { property: "og:title", content: "Algeria Through Time" },
      {
        property: "og:description",
        content: "A playful journey through 2,000+ years of Algerian history.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const fact = dailyFacts[new Date().getDate() % dailyFacts.length];

  return (
    <div className="min-h-screen">
      <Header />
      <main
        className="px-4 py-12 sm:py-20"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="max-w-3xl mx-auto text-center animate-float-up">
          <div className="text-6xl sm:text-7xl mb-4">🏺🕌🕊️</div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground">
            Algeria
            <span
              className="block bg-clip-text text-transparent"
              style={{ backgroundImage: "var(--gradient-warm)" }}
            >
              Through Time
            </span>
          </h1>
          <p className="mt-5 text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto">
            From the Numidian kings to the heroes of independence — a fun, story-driven
            journey through 2,000+ years of history.
          </p>
          <Link
            to="/timeline"
            className="inline-block mt-8 px-8 py-4 rounded-2xl text-lg font-bold text-primary-foreground transition-transform hover:scale-105 active:scale-95"
            style={{ background: "var(--gradient-warm)", boxShadow: "var(--shadow-glow)" }}
          >
            🚀 Start Your Journey
          </Link>
        </div>
      </main>

      <section className="max-w-3xl mx-auto px-4 py-12 grid sm:grid-cols-3 gap-4">
        {[
          { icon: "📜", title: "5 Eras", desc: "From Numidia to today" },
          { icon: "🎯", title: "Fun Quizzes", desc: "Test what you learn" },
          { icon: "🏆", title: "Earn Badges", desc: "Become a history hero" },
        ].map((f) => (
          <div
            key={f.title}
            className="rounded-2xl bg-card p-5 text-center border border-border"
            style={{ boxShadow: "var(--shadow-soft)" }}
          >
            <div className="text-3xl mb-2">{f.icon}</div>
            <h3 className="font-bold">{f.title}</h3>
            <p className="text-sm text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </section>

      <section className="max-w-3xl mx-auto px-4 pb-16">
        <div
          className="rounded-2xl p-6 border border-accent/40"
          style={{
            background: "linear-gradient(135deg, var(--accent) / 0.15, transparent)",
            backgroundColor: "color-mix(in oklab, var(--accent) 18%, var(--card))",
            boxShadow: "var(--shadow-soft)",
          }}
        >
          <div className="flex items-start gap-3">
            <div className="text-3xl">💡</div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-accent-foreground/80">
                Did you know?
              </div>
              <p className="mt-1 text-foreground font-medium">{fact}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
