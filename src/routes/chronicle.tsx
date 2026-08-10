/**
 * The Chronicle — "Algeria, Century by Century".
 *
 * A vertical, chapter-based museum narrative. The Timeline answers "when did
 * it happen"; the Chronicle answers "how did one Algeria become the next".
 *
 * Structure: a cinematic opening, a sticky chronological rail (desktop) or a
 * compact progress strip (mobile), one chapter per established era, full width
 * turning-point interludes between chapters, and a reflective ending.
 *
 * All era, figure, region and event content comes from the existing project
 * data. Nothing here changes established routes or identifiers.
 */

import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Header } from "@/components/Header";
import { eras } from "@/data/eras";
import { getEraExtras } from "@/data/eraExtras";
import { getFigure, FIGURE_CATEGORIES } from "@/data/figures";
import { mapRegions } from "@/data/mapRegions";
import { EraBadge, type EraBadgeKind } from "@/components/brand/EraBadge";
import { MedallionFrame } from "@/components/brand/MedallionFrame";
import { t, useLang } from "@/lib/i18n";
import { pageMeta, headLang } from "@/lib/seo";
import { PAGE_META } from "@/lib/pageMetaCopy";
import {
  CHRONICLE_CHAPTERS,
  CHRONICLE_UI,
  ERA_IMAGE_ALT,
  IMAGE_DISCLOSURE,
  RAIL_MARKERS,
  TURNING_POINTS,
} from "@/data/chronicle";

import imgEarly from "@/assets/era-earlynorthafrica.jpg";
import imgNumidia from "@/assets/era-numidia.png";
import imgRoman from "@/assets/era-roman.png";
import imgIslamic from "@/assets/era-islamic.png";
import imgOttoman from "@/assets/era-ottoman.jpg";
import imgFrench from "@/assets/era-french.png";
import imgIndependence from "@/assets/era-independence.png";

const ERA_IMAGE: Record<string, string> = {
  earlynorthafrica: imgEarly,
  numidia: imgNumidia,
  roman: imgRoman,
  islamic: imgIslamic,
  ottoman: imgOttoman,
  french: imgFrench,
  independence: imgIndependence,
};

const SERIF = "Georgia, 'Times New Roman', serif";

export const Route = createFileRoute("/chronicle")({
  head: ({ match }) =>
    pageMeta({
      lang: headLang(match),
      path: "/chronicle",
      ...PAGE_META["/chronicle"],
      image: imgNumidia,
    }),
  component: ChroniclePage,
});

const sectionId = (eraId: string) => `chronicle-${eraId}`;

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="text-[12px] font-semibold uppercase tracking-[0.22em]"
      style={{ color: "var(--brand-gold-deep)" }}
    >
      {children}
    </div>
  );
}

function Rule() {
  return (
    <span
      aria-hidden
      className="block h-px w-full"
      style={{ background: "color-mix(in oklab, var(--brand-gold) 45%, transparent)" }}
    />
  );
}

function ChroniclePage() {
  const lang = useLang();
  const [activeEra, setActiveEra] = useState<string>("earlynorthafrica");
  const observedRef = useRef<HTMLDivElement>(null);

  const chapters = useMemo(
    () =>
      CHRONICLE_CHAPTERS.map((c) => ({
        chapter: c,
        era: eras.find((e) => e.id === c.eraId)!,
        extras: getEraExtras(c.eraId),
      })).filter((c) => c.era),
    [],
  );

  const activeEraTitle = useMemo(() => {
    if (activeEra === "today") return t(CHRONICLE_UI.endEyebrow, lang);
    const e = eras.find((x) => x.id === activeEra);
    return e ? t(e.title, lang) : "";
  }, [activeEra, lang]);

  // Active chapter detection. Intersection Observer keeps this cheap.
  useEffect(() => {
    const root = observedRef.current;
    if (!root) return;
    const sections = Array.from(root.querySelectorAll<HTMLElement>("[data-era-section]"));
    if (!sections.length) return;
    const visible = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).dataset.eraSection!;
          if (entry.isIntersecting) visible.set(id, entry.intersectionRatio);
          else visible.delete(id);
        }
        let best: string | null = null;
        let bestRatio = 0;
        visible.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        });
        if (best) setActiveEra(best);
      },
      { rootMargin: "-25% 0px -45% 0px", threshold: [0, 0.15, 0.4, 0.75, 1] },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const goTo = useCallback((eraId: string) => {
    const el = document.getElementById(sectionId(eraId));
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    el.focus({ preventScroll: true });
  }, []);

  const eraOptions = [
    ...chapters.map((c) => ({ id: c.era.id, label: t(c.era.title, lang) })),
    { id: "today", label: t(CHRONICLE_UI.endEyebrow, lang) },
  ];
  const activeIndex = Math.max(0, eraOptions.findIndex((o) => o.id === activeEra));

  return (
    <div className="min-h-dvh" style={{ background: "var(--background)" }}>
      <Header />
      <main id="main" tabIndex={-1}>
        {/* ---------------------------------------------- Opening */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 80% at 50% 0%, color-mix(in oklab, var(--brand-gold) 12%, transparent) 0%, transparent 62%)",
            }}
          />
          <div className="relative max-w-3xl mx-auto px-5 pt-14 pb-16 sm:pt-24 sm:pb-24 text-center">
            <Eyebrow>{t(CHRONICLE_UI.eyebrow, lang)}</Eyebrow>
            <h1
              className="mt-5 text-[2.1rem] leading-[1.12] sm:text-5xl lg:text-6xl font-semibold text-foreground"
              style={{ fontFamily: SERIF, letterSpacing: "-0.015em" }}
            >
              {t(CHRONICLE_UI.h1, lang)}
            </h1>
            <div className="mt-7 mx-auto max-w-[7rem]">
              <Rule />
            </div>
            <p
              className="mt-7 mx-auto max-w-[52ch] text-[17px] leading-[1.72] text-foreground/85"
              style={{ fontFamily: SERIF }}
            >
              {t(CHRONICLE_UI.intro, lang)}
            </p>
            <p className="mt-4 mx-auto max-w-[52ch] text-[15px] leading-[1.72] text-muted-foreground">
              {t(CHRONICLE_UI.support, lang)}
            </p>

            <div className="mt-9 flex flex-col items-center gap-5">
              <button
                type="button"
                onClick={() => goTo("earlynorthafrica")}
                className="inline-flex items-center gap-2 rounded-full px-7 min-h-12 text-[15px] font-semibold text-primary-foreground transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
                style={{ background: "var(--gradient-warm)" }}
              >
                {t(CHRONICLE_UI.begin, lang)}
              </button>
              <span className="inline-flex flex-col items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                {t(CHRONICLE_UI.scrollHint, lang)}
                <span
                  aria-hidden
                  className="block w-px h-8"
                  style={{
                    background:
                      "linear-gradient(180deg, color-mix(in oklab, var(--brand-gold) 60%, transparent), transparent)",
                  }}
                />
              </span>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------- Mobile progress + jump */}
        <div
          className="lg:hidden sticky top-16 z-30 border-y backdrop-blur"
          style={{
            borderColor: "color-mix(in oklab, var(--brand-gold) 24%, var(--border))",
            background: "color-mix(in oklab, var(--card) 88%, transparent)",
          }}
        >
          <div className="px-4 py-2.5 flex items-center gap-3">
            <div className="min-w-0 flex-1">
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                {t(CHRONICLE_UI.progress, lang)}
              </div>
              <div className="truncate text-[13px] font-semibold text-foreground">{activeEraTitle}</div>
              <div
                className="mt-1.5 h-1 rounded-full overflow-hidden"
                style={{ background: "color-mix(in oklab, var(--foreground) 10%, transparent)" }}
              >
                <span
                  className="block h-full rounded-full"
                  style={{
                    width: `${((activeIndex + 1) / eraOptions.length) * 100}%`,
                    background: "var(--brand-gold-deep)",
                  }}
                />
              </div>
            </div>
            <label className="shrink-0">
              <span className="sr-only">{t(CHRONICLE_UI.jumpToEra, lang)}</span>
              <select
                value={activeEra}
                onChange={(e) => goTo(e.target.value)}
                className="min-h-11 rounded-lg border bg-card px-3 text-[13px] font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                style={{ borderColor: "color-mix(in oklab, var(--brand-gold) 30%, var(--border))" }}
              >
                {eraOptions.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {/* ---------------------------------------------- Chronicle body */}
        <div
          ref={observedRef}
          className="max-w-6xl mx-auto px-4 sm:px-6 pb-4 grid gap-8 lg:gap-14 lg:grid-cols-[12rem_minmax(0,1fr)]"
        >
          {/* Chronological rail */}
          <nav
            aria-label={t(CHRONICLE_UI.railTitle, lang)}
            className="hidden lg:block"
          >
            <div className="sticky top-[7.5rem] pb-16">
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {t(CHRONICLE_UI.railTitle, lang)}
              </div>
              <div
                className="mt-2 text-[13px] font-semibold leading-snug"
                style={{ fontFamily: SERIF, color: "var(--brand-gold-deep)" }}
              >
                {activeEraTitle}
              </div>
              <ol className="mt-4 relative">
                <span
                  aria-hidden
                  className="absolute top-2 bottom-2 w-px"
                  style={{
                    insetInlineStart: "0.3125rem",
                    background: "color-mix(in oklab, var(--foreground) 14%, transparent)",
                  }}
                />
                {RAIL_MARKERS.map((m) => {
                  const active = m.eraId === activeEra;
                  return (
                    <li key={m.id} className="relative">
                      <button
                        type="button"
                        onClick={() => goTo(m.eraId)}
                        aria-current={active ? "true" : undefined}
                        className="group flex w-full items-center gap-3 py-1.5 text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded"
                      >
                        <span
                          aria-hidden
                          className="relative z-10 shrink-0 rounded-full transition-all"
                          style={{
                            width: active ? "0.7rem" : "0.4rem",
                            height: active ? "0.7rem" : "0.4rem",
                            marginInlineStart: active ? "0" : "0.15rem",
                            background: active
                              ? "var(--brand-gold-deep)"
                              : "color-mix(in oklab, var(--foreground) 28%, transparent)",
                            boxShadow: active
                              ? "0 0 0 3px color-mix(in oklab, var(--brand-gold) 22%, transparent)"
                              : "none",
                          }}
                        />
                        <span
                          className={`text-[13px] transition-colors ${
                            active
                              ? "font-bold text-foreground underline decoration-2 underline-offset-4"
                              : "text-muted-foreground group-hover:text-foreground"
                          }`}
                          style={active ? { textDecorationColor: "var(--brand-gold-deep)" } : undefined}
                        >
                          {t(m.label, lang)}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>
          </nav>

          {/* Chapters */}
          <div className="min-w-0">
            {chapters.map(({ chapter, era, extras }, index) => {
              const turning = TURNING_POINTS.find((tp) => tp.afterEraId === era.id);
              const figureIds = (extras?.keyFigureIds ?? []).slice(0, 4);
              const regionIds = (extras?.relatedRegionIds ?? []).slice(0, 3);
              return (
                <div key={era.id}>
                  <section
                    id={sectionId(era.id)}
                    data-era-section={era.id}
                    tabIndex={-1}
                    aria-labelledby={`${sectionId(era.id)}-title`}
                    className="scroll-mt-[9rem] py-12 sm:py-16 outline-none"
                  >
                    {/* Chapter opening */}
                    <div className="flex items-start gap-4">
                      <EraBadge kind={era.id as EraBadgeKind} size={44} />
                      <div className="min-w-0">
                        <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                          {t(CHRONICLE_UI.chapter, lang)} {index + 1}
                        </div>
                        <h2
                          id={`${sectionId(era.id)}-title`}
                          className="mt-1 text-[1.7rem] sm:text-4xl font-semibold leading-tight text-foreground"
                          style={{ fontFamily: SERIF, letterSpacing: "-0.012em" }}
                        >
                          {t(era.title, lang)}
                        </h2>
                        <div
                          dir="ltr"
                          className="mt-1.5 text-[13px] font-semibold tracking-wide rtl:text-right"
                          style={{ color: "var(--brand-gold-deep)", unicodeBidi: "isolate" }}
                        >
                          {era.dateRange}
                        </div>

                      </div>
                    </div>

                    {/* Visual anchor */}
                    <figure className="mt-7">
                      <div
                        className="overflow-hidden rounded-xl border"
                        style={{
                          borderColor: "color-mix(in oklab, var(--brand-gold) 26%, var(--border))",
                        }}
                      >
                        <img
                          src={ERA_IMAGE[era.id]}
                          alt={t(ERA_IMAGE_ALT[era.id], lang)}
                          loading={index === 0 ? "eager" : "lazy"}
                          decoding="async"
                          className="w-full aspect-[16/9] object-cover"
                        />
                      </div>
                      <figcaption className="mt-2 text-[12px] leading-relaxed text-muted-foreground">
                        {t(IMAGE_DISCLOSURE, lang)}
                      </figcaption>
                    </figure>

                    {/* Narrative */}
                    <div className="mt-7 max-w-[62ch]">
                      <p
                        className="text-[17px] leading-[1.72] text-foreground/90"
                        style={{ fontFamily: SERIF }}
                      >
                        {t(era.summary, lang)}
                      </p>
                      {chapter.story.map((p, i) => (
                        <p key={i} className="mt-4 text-[16px] leading-[1.75] text-foreground/85">
                          {t(p, lang)}
                        </p>
                      ))}
                      <Link
                        to="/era/$eraId"
                        params={{ eraId: era.id }}
                        className="mt-6 inline-flex items-center gap-2 min-h-11 text-[15px] font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded"
                      >
                        {t(CHRONICLE_UI.enterExhibit, lang)}
                        <span aria-hidden className="inline-block rtl:rotate-180">
                          →
                        </span>
                      </Link>
                    </div>

                    {/* Defining moments */}
                    <div className="mt-12">
                      <h3 className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                        {t(CHRONICLE_UI.definingMoments, lang)}
                      </h3>
                      <div className="mt-3">
                        <Rule />
                      </div>
                      <ol className="mt-2">
                        {chapter.events.map((ev) => (
                          <li
                            key={`${era.id}-${ev.year}`}
                            className="py-5 border-b"
                            style={{ borderColor: "color-mix(in oklab, var(--foreground) 10%, transparent)" }}
                          >
                            <div
                              className="text-[12.5px] font-bold uppercase tracking-[0.14em]"
                              style={{ color: "var(--brand-gold-deep)" }}
                            >
                              {t(ev.date, lang)}
                            </div>
                            <h4
                              className="mt-2 text-[1.15rem] font-semibold leading-snug text-foreground"
                              style={{ fontFamily: SERIF }}
                            >
                              {t(ev.title, lang)}
                            </h4>
                            <p className="mt-1.5 max-w-[62ch] text-[15px] leading-[1.7] text-muted-foreground">
                              {t(ev.detail, lang)}
                            </p>
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* People of the era */}
                    {figureIds.length > 0 && (
                      <div className="mt-12">
                        <h3 className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                          {t(CHRONICLE_UI.people, lang)}
                        </h3>
                        <div className="mt-3">
                          <Rule />
                        </div>
                        <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                          {figureIds.map((fid) => {
                            const f = getFigure(fid);
                            if (!f) return null;
                            const role = FIGURE_CATEGORIES.find((c) => c.id === f.category);
                            const displayName = t(f.displayName, lang);
                            return (
                              <li key={fid}>
                                <Link
                                  to="/figures/$figureId"
                                  params={{ figureId: f.id }}
                                  className="group flex h-full items-start gap-4 rounded-xl border bg-card p-4 transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                                  style={{
                                    borderColor: "color-mix(in oklab, var(--brand-gold) 22%, var(--border))",
                                  }}
                                >
                                  <MedallionFrame size={56} tone="bronze" inset={0.16}>
                                    <span
                                      aria-hidden
                                      className="text-[1.15rem] font-semibold"
                                      style={{ fontFamily: SERIF, color: "oklch(0.24 0.04 45)" }}
                                    >
                                      {displayName.trim().charAt(0)}
                                    </span>
                                  </MedallionFrame>
                                  <div className="min-w-0">
                                    <div
                                      className="text-[1.02rem] font-semibold leading-snug text-foreground group-hover:text-primary transition-colors"
                                      style={{ fontFamily: SERIF }}
                                    >
                                      {displayName}
                                    </div>
                                    {role && (
                                      <div className="mt-0.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                                        {t(role.label, lang)}
                                      </div>
                                    )}
                                    <p className="mt-1.5 text-[14px] leading-[1.6] text-muted-foreground line-clamp-3">
                                      {t(f.importance, lang)}
                                    </p>
                                  </div>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}

                    {/* Places of the era */}
                    {regionIds.length > 0 && (
                      <div className="mt-12">
                        <h3 className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                          {t(CHRONICLE_UI.places, lang)}
                        </h3>
                        <div className="mt-3">
                          <Rule />
                        </div>
                        <ul className="mt-5 grid gap-3 sm:grid-cols-3">
                          {regionIds.map((rid) => {
                            const r = mapRegions.find((x) => x.id === rid);
                            if (!r) return null;
                            return (
                              <li key={rid}>
                                <Link
                                  to="/region/$regionId"
                                  params={{ regionId: r.id }}
                                  className="group block h-full rounded-xl border bg-card p-4 transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                                  style={{
                                    borderColor: "color-mix(in oklab, var(--brand-gold) 22%, var(--border))",
                                  }}
                                >
                                  <div
                                    className="text-[1rem] font-semibold text-foreground group-hover:text-primary transition-colors"
                                    style={{ fontFamily: SERIF }}
                                  >
                                    {t(r.name, lang)}
                                  </div>
                                  <p className="mt-1.5 text-[14px] leading-[1.6] text-muted-foreground">
                                    {t(r.focus, lang)}
                                  </p>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}

                    {/* Bridge to the next era */}
                    <div
                      className="mt-12 border-s-2 ps-5 py-1"
                      style={{ borderColor: "color-mix(in oklab, var(--brand-gold) 55%, transparent)" }}
                    >
                      <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                        {t(CHRONICLE_UI.whatFollowed, lang)}
                      </div>
                      <p
                        className="mt-2 max-w-[62ch] text-[16.5px] italic leading-[1.72] text-foreground/85"
                        style={{ fontFamily: SERIF }}
                      >
                        {t(chapter.bridge, lang)}
                      </p>
                    </div>
                  </section>

                  {/* Turning point interlude */}
                  {turning && (
                    <aside
                      aria-label={t(CHRONICLE_UI.turningPoint, lang)}
                      className="my-2 rounded-2xl border px-6 py-8 sm:px-10 sm:py-10"
                      style={{
                        borderColor: "color-mix(in oklab, var(--brand-gold) 30%, var(--border))",
                        background:
                          "linear-gradient(180deg, color-mix(in oklab, var(--brand-gold) 8%, var(--card)) 0%, var(--card) 100%)",
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <span aria-hidden style={{ color: "var(--brand-gold-deep)" }}>
                          ❖
                        </span>
                        <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                          {t(CHRONICLE_UI.turningPoint, lang)}
                        </span>
                      </div>
                      <div
                        className="mt-4 text-[13px] font-bold uppercase tracking-[0.14em]"
                        style={{ color: "var(--brand-gold-deep)" }}
                      >
                        {t(turning.date, lang)}
                      </div>
                      <h3
                        className="mt-2 text-[1.5rem] sm:text-[1.85rem] font-semibold leading-tight text-foreground"
                        style={{ fontFamily: SERIF }}
                      >
                        {t(turning.title, lang)}
                      </h3>
                      <p className="mt-3 max-w-[62ch] text-[16px] leading-[1.72] text-muted-foreground">
                        {t(turning.body, lang)}
                      </p>
                    </aside>
                  )}
                </div>
              );
            })}

            {/* ---------------------------------------------- Ending */}
            <section
              id={sectionId("today")}
              data-era-section="today"
              tabIndex={-1}
              aria-labelledby="chronicle-end-title"
              className="scroll-mt-[9rem] py-16 outline-none"
            >
              <Eyebrow>{t(CHRONICLE_UI.endEyebrow, lang)}</Eyebrow>
              <h2
                id="chronicle-end-title"
                className="mt-4 text-[1.8rem] sm:text-4xl font-semibold leading-tight text-foreground"
                style={{ fontFamily: SERIF }}
              >
                {t(CHRONICLE_UI.endHeading, lang)}
              </h2>
              <p className="mt-5 max-w-[62ch] text-[16.5px] leading-[1.75] text-muted-foreground">
                {t(CHRONICLE_UI.endBody, lang)}
              </p>
              <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.72] text-muted-foreground">
                {t(CHRONICLE_UI.endNote, lang)}
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/timeline"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-6 min-h-12 text-[15px] font-semibold text-primary-foreground transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
                  style={{ background: "var(--gradient-warm)" }}
                >
                  {t(CHRONICLE_UI.exploreTimeline, lang)}
                </Link>
                <Link
                  to="/journeys/$journeyId"
                  params={{ journeyId: "grand-tour" }}
                  className="inline-flex items-center justify-center gap-2 rounded-full border px-6 min-h-12 text-[15px] font-semibold text-foreground transition hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                  style={{ borderColor: "color-mix(in oklab, var(--brand-gold) 40%, var(--border))" }}
                >
                  {t(CHRONICLE_UI.beginJourney, lang)}
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
