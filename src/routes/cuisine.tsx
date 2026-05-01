import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { StoryFlow } from "@/components/story/StoryFlow";
import { cuisineCopy, cuisineRegions, cuisineStory, cuisineSweets, type CuisineRegionId } from "@/data/cuisine";
import { dishMemoryLines, cinematicCopy } from "@/data/cinematic";
import { discover } from "@/lib/discoveries";
import { t, useLang } from "@/lib/i18n";
import { saveJourneyPlace } from "@/lib/continuity";
import { JourneyNext } from "@/components/JourneyNext";
import cuisineHero from "@/assets/cuisine-hero.jpg";

export const Route = createFileRoute("/cuisine")({
  head: () => ({
    meta: [
      { title: "Cuisine of Algeria — Where memory, culture, and taste meet" },
      {
        name: "description",
        content:
          "A cinematic cultural journey through Algerian cuisine — couscous, chorba, rechta, dates and bread — from Kabylie to the Sahara.",
      },
      { property: "og:title", content: "Cuisine of Algeria" },
      {
        property: "og:description",
        content: "Food, memory and identity — a sensory journey through the regions of Algeria.",
      },
      { property: "og:image", content: cuisineHero },
      { name: "twitter:image", content: cuisineHero },
    ],
  }),
  component: CuisinePage,
});

function CuisinePage() {
  const lang = useLang();
  const [activeRegion, setActiveRegion] = useState<CuisineRegionId | null>(null);
  const [openDish, setOpenDish] = useState<string | null>(null);
  const [openSweet, setOpenSweet] = useState<string | null>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    saveJourneyPlace({
      section: "words",
      label: cuisineCopy.sectionTitle as { en: string; fr: string; ar: string },
      description: cuisineCopy.subtitle as { en: string; fr: string; ar: string },
      href: "/cuisine",
    });
  }, []);

  // Listen to Surprise-me cuisine event
  useEffect(() => {
    const onPick = (e: Event) => {
      const id = (e as CustomEvent).detail as CuisineRegionId;
      if (!id) return;
      setActiveRegion(id);
      window.requestAnimationFrame(() => {
        document.getElementById("cuisine-dishes")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    };
    window.addEventListener("cuisine:open-region", onPick as EventListener);
    return () => window.removeEventListener("cuisine:open-region", onPick as EventListener);
  }, []);

  const region = activeRegion
    ? cuisineRegions.find((r) => r.id === activeRegion) ?? null
    : null;

  const scrollToExplore = () => {
    if (typeof window === "undefined") return;
    const el = document.getElementById("cuisine-story");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen">
      <Header />

      {/* HERO */}
      <section className="relative w-full overflow-hidden">
        <div className="relative h-[62vh] min-h-[420px] max-h-[640px] w-full">
          <img
            src={cuisineHero}
            alt=""
            className="absolute inset-0 w-full h-[115%] object-cover will-change-transform"
            style={{
              transform: `translate3d(0, ${Math.min(scrollY * 0.25, 140)}px, 0) scale(1.05)`,
              filter: "brightness(0.88) contrast(0.98)",
            }}
            width={1920}
            height={1080}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, color-mix(in oklab, black 55%, transparent) 0%, color-mix(in oklab, black 35%, transparent) 50%, color-mix(in oklab, black 78%, transparent) 100%)",
            }}
            aria-hidden
          />
          <div className="relative z-10 h-full max-w-3xl mx-auto px-5 flex flex-col items-center justify-center text-center text-white">
            <Link
              to="/words"
              className="absolute top-4 left-4 text-xs sm:text-sm font-medium text-white/85 hover:text-white transition-colors"
            >
              {t(cuisineCopy.back, lang)}
            </Link>
            <p className="text-[11px] sm:text-xs uppercase tracking-[0.25em] font-bold text-white/75 mb-3">
              {t(cuisineCopy.sectionTitle, lang)}
            </p>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight max-w-2xl text-balance">
              “{t(cuisineCopy.poetic, lang)}”
            </h1>
            <p className="mt-4 text-sm sm:text-base text-white/85 max-w-md leading-relaxed">
              {t(cuisineCopy.subtitle, lang)}
            </p>
            <button
              type="button"
              onClick={scrollToExplore}
              className="mt-7 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-foreground text-sm font-bold shadow-lg hover:scale-[1.03] active:scale-[0.98] transition-transform"
            >
              {t(cuisineCopy.cta, lang)} →
            </button>
          </div>
        </div>
      </section>

      <main className="max-w-3xl mx-auto px-4 py-10 safe-pb space-y-12">
        {/* STORY MODE */}
        <section id="cuisine-story" className="scroll-mt-24">
          <StoryFlow
            title={cuisineCopy.storyTitle}
            continuityTitle={cuisineCopy.storyTitle}
            scenes={cuisineStory.map((s) => ({
              icon: s.icon,
              title: s.title,
              body: s.body,
            }))}
            accent="var(--secondary)"
          />
        </section>

        {/* REGIONS GRID */}
        <section>
          <header className="mb-4">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              {t(cuisineCopy.regionsTitle, lang)}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {t(cuisineCopy.regionsHint, lang)}
            </p>
          </header>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {cuisineRegions.map((r) => {
              const isActive = activeRegion === r.id;
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => {
                    setActiveRegion(isActive ? null : r.id);
                    setOpenDish(null);
                    if (!isActive && typeof window !== "undefined") {
                      window.requestAnimationFrame(() => {
                        document
                          .getElementById("cuisine-dishes")
                          ?.scrollIntoView({ behavior: "smooth", block: "start" });
                      });
                    }
                  }}
                  className="group text-left rounded-2xl border bg-card p-4 transition-all hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  style={{
                    borderColor: isActive
                      ? "color-mix(in oklab, var(--secondary) 55%, var(--border))"
                      : "var(--border)",
                    background: isActive
                      ? "color-mix(in oklab, var(--secondary) 10%, var(--card))"
                      : undefined,
                    boxShadow: isActive ? "var(--shadow-soft)" : undefined,
                  }}
                  aria-pressed={isActive}
                >
                  <div className="text-2xl mb-1.5" aria-hidden>
                    {r.icon}
                  </div>
                  <div className="font-bold text-sm sm:text-base text-foreground">
                    {t(r.name, lang)}
                  </div>
                  <div className="text-[12px] sm:text-xs text-muted-foreground leading-snug mt-1 line-clamp-2">
                    {t(r.tagline, lang)}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* DISH CARDS */}
        <section id="cuisine-dishes" className="scroll-mt-24 min-h-[40px]">
          {region && (
            <div className="animate-fade-in">
              <header className="mb-4 flex items-baseline justify-between gap-3">
                <h2 className="text-lg sm:text-xl font-extrabold tracking-tight">
                  <span className="mr-2" aria-hidden>{region.icon}</span>
                  {t(region.name, lang)}
                </h2>
                <span className="text-[11px] text-muted-foreground">
                  {t(cuisineCopy.tapToOpen, lang)}
                </span>
              </header>

              <div className="grid sm:grid-cols-2 gap-4">
                {region.dishes.map((d, idx) => {
                  const isOpen = openDish === d.id;
                  const memory = dishMemoryLines[d.id];
                  const isSignature = idx === 0;
                  return (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => {
                        const next = isOpen ? null : d.id;
                        setOpenDish(next);
                        if (next) discover("dish", d.id, d.name, lang);
                      }}
                      className="group text-left rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1 hover:border-secondary/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      style={{ boxShadow: "var(--shadow-soft)" }}
                      aria-expanded={isOpen}
                    >
                      <div
                        className="relative w-full h-[150px] overflow-hidden rounded-t-2xl"
                        style={{
                          background:
                            "linear-gradient(135deg, color-mix(in oklab, " +
                            d.hue +
                            " 26%, #f5ead8) 0%, color-mix(in oklab, " +
                            d.hue +
                            " 6%, #ece0c9) 100%)",
                        }}
                        aria-hidden
                      >
                        <div
                          className="absolute inset-0 opacity-[0.18]"
                          style={{
                            backgroundImage:
                              "radial-gradient(circle at 30% 35%, color-mix(in oklab, " +
                              d.hue +
                              " 55%, transparent) 0%, transparent 55%), radial-gradient(circle at 75% 70%, color-mix(in oklab, var(--secondary) 45%, transparent) 0%, transparent 50%)",
                          }}
                        />
                        {isSignature && (
                          <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-background/85 backdrop-blur-sm px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-secondary border border-secondary/40">
                            ★ {lang === "fr" ? "Signature" : lang === "ar" ? "الطبق المميّز" : "Signature"}
                          </span>
                        )}
                      </div>
                      <div className="p-5">
                        <div className="font-bold text-base text-foreground leading-tight">
                          {t(d.name, lang)}
                        </div>
                        <p className="text-[13.5px] text-muted-foreground leading-relaxed mt-1.5">
                          {t(d.description, lang)}
                        </p>
                        {d.whenEaten && (
                          <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-secondary">
                            <span aria-hidden>🕰️</span>
                            {t(cuisineCopy.whenEaten, lang)} · {t(d.whenEaten, lang)}
                          </div>
                        )}
                        {isOpen && memory && (
                          <div className="mt-4 px-3.5 py-3 rounded-xl border border-dashed border-secondary/40 bg-secondary/5 text-[12.5px] italic leading-relaxed text-foreground/80 animate-cinematic-in">
                            <div className="not-italic text-[10px] font-bold uppercase tracking-wider text-secondary mb-1.5">
                              {t(cinematicCopy.memoryLabel, lang)}
                            </div>
                            “{t(memory, lang)}”
                          </div>
                        )}
                        {isOpen && d.note && (
                          <div
                            className="mt-3 rounded-xl p-3.5 text-[13px] italic leading-relaxed animate-fade-in"
                            style={{
                              background:
                                "color-mix(in oklab, " + d.hue + " 12%, var(--muted))",
                              color: "color-mix(in oklab, var(--foreground) 85%, transparent)",
                            }}
                          >
                            <div className="not-italic text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                              {t(cuisineCopy.culturalNote, lang)}
                            </div>
                            “{t(d.note, lang)}”
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </section>

        {/* SWEET TRADITIONS */}
        <section>
          <header className="mb-4">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              {t(cuisineCopy.sweetsTitle, lang)}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {t(cuisineCopy.sweetsHint, lang)}
            </p>
          </header>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {cuisineSweets.map((s) => {
              const isOpen = openSweet === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setOpenSweet(isOpen ? null : s.id)}
                  className="group text-left rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1 hover:border-secondary/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  style={{ boxShadow: "var(--shadow-soft)" }}
                  aria-expanded={isOpen}
                >
                  <div
                    className="relative w-full h-[130px] overflow-hidden rounded-t-2xl"
                    style={{
                      background:
                        "linear-gradient(135deg, color-mix(in oklab, " +
                        s.hue +
                        " 26%, #f5ead8) 0%, color-mix(in oklab, " +
                        s.hue +
                        " 6%, #ece0c9) 100%)",
                    }}
                    aria-hidden
                  >
                    <div
                      className="absolute inset-0 opacity-[0.18]"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle at 35% 40%, color-mix(in oklab, " +
                          s.hue +
                          " 50%, transparent) 0%, transparent 55%), radial-gradient(circle at 75% 70%, color-mix(in oklab, var(--secondary) 40%, transparent) 0%, transparent 50%)",
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <div className="font-bold text-sm sm:text-base text-foreground leading-tight">
                      {t(s.name, lang)}
                    </div>
                    <p className="text-[12.5px] sm:text-[13px] text-muted-foreground leading-relaxed mt-1.5">
                      {t(s.description, lang)}
                    </p>
                    {isOpen && s.whenEaten && (
                      <div className="mt-2.5 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-secondary animate-fade-in">
                        <span aria-hidden>🕰️</span>
                        {t(cuisineCopy.whenEaten, lang)} · {t(s.whenEaten, lang)}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </section>
        <JourneyNext current="cuisine" />
      </main>
    </div>
  );
}
