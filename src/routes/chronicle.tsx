import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Header } from "@/components/Header";
import { eras } from "@/data/eras";
import { figures, type Figure } from "@/data/figures";
import { EraBadge, type EraBadgeKind } from "@/components/brand/EraBadge";
import { t, useLang, type Lang } from "@/lib/i18n";
import { ChevronLeft, ChevronRight, MapPin, Sparkles, Users, Scroll } from "lucide-react";

export const Route = createFileRoute("/chronicle")({
  head: () => ({
    meta: [
      { title: "Interactive Chronicle — DZ Odyssey" },
      {
        name: "description",
        content:
          "Drag across three thousand years of Algerian history. Meet the figures, regions and events of every era on one living timeline.",
      },
      { property: "og:title", content: "The Interactive Chronicle of Algeria" },
      {
        property: "og:description",
        content:
          "A cinematic, drag-through timeline of Algerian history — from prehistoric North Africa to the modern republic.",
      },
    ],
  }),
  component: ChroniclePage,
});

// ---------- Era → year mapping ----------

type EraBand = {
  id: string;
  legend: LegendEra;
  badge: EraBadgeKind;
  start: number; // negative = BC
  end: number;
};

const ERA_YEARS: Record<string, { start: number; end: number }> = {
  earlynorthafrica: { start: -1000, end: -202 },
  numidia: { start: -202, end: -46 },
  roman: { start: -46, end: 430 },
  islamic: { start: 640, end: 1516 },
  ottoman: { start: 1516, end: 1830 },
  french: { start: 1830, end: 1962 },
  independence: { start: 1954, end: 2026 },
};

const TIMELINE_START = -1000;
const TIMELINE_END = 2026;
const PX_PER_YEAR = 3.4; // ~10.3k px wide
const TOTAL_WIDTH = (TIMELINE_END - TIMELINE_START) * PX_PER_YEAR;

const yearToX = (year: number) => (year - TIMELINE_START) * PX_PER_YEAR;

// ---------- Curated events per era ----------

type ChronEvent = {
  year: number;
  label: { en: string; fr: string; ar: string };
  eraId: string;
};

const EVENTS: ChronEvent[] = [
  { eraId: "earlynorthafrica", year: -945, label: { en: "Sheshonq I rules Egypt", fr: "Sheshonq Ier règne sur l'Égypte", ar: "شيشنق الأول يحكم مصر" } },
  { eraId: "earlynorthafrica", year: -814, label: { en: "Founding of Carthage", fr: "Fondation de Carthage", ar: "تأسيس قرطاج" } },
  { eraId: "numidia", year: -202, label: { en: "Massinissa unites Numidia", fr: "Massinissa unifie la Numidie", ar: "ماسينيسا يوحّد نوميديا" } },
  { eraId: "numidia", year: -112, label: { en: "Jugurthine War begins", fr: "Début de la guerre de Jugurtha", ar: "بدء حرب يوغرطة" } },
  { eraId: "roman", year: 100, label: { en: "Timgad is founded", fr: "Fondation de Timgad", ar: "تأسيس تيمقاد" } },
  { eraId: "roman", year: 354, label: { en: "Birth of Augustine of Hippo", fr: "Naissance d'Augustin d'Hippone", ar: "مولد أوغسطينوس الهيبوني" } },
  { eraId: "roman", year: 430, label: { en: "Vandal conquest", fr: "Conquête vandale", ar: "الفتح الوندالي" } },
  { eraId: "islamic", year: 683, label: { en: "Dihya resists the Umayyads", fr: "Dihya résiste aux Omeyyades", ar: "الكاهنة تقاوم الأمويين" } },
  { eraId: "islamic", year: 909, label: { en: "Fatimid Caliphate rises", fr: "Essor du califat fatimide", ar: "قيام الخلافة الفاطمية" } },
  { eraId: "islamic", year: 1235, label: { en: "Zayyanid Kingdom of Tlemcen", fr: "Royaume zianide de Tlemcen", ar: "الدولة الزيانية بتلمسان" } },
  { eraId: "ottoman", year: 1516, label: { en: "Regency of Algiers founded", fr: "Fondation de la Régence d'Alger", ar: "تأسيس إيالة الجزائر" } },
  { eraId: "ottoman", year: 1671, label: { en: "Age of the Deys begins", fr: "Début de l'ère des Deys", ar: "بداية عصر الدايات" } },
  { eraId: "french", year: 1830, label: { en: "French invasion of Algiers", fr: "Invasion française d'Alger", ar: "الغزو الفرنسي للجزائر" } },
  { eraId: "french", year: 1847, label: { en: "Emir Abdelkader surrenders", fr: "Reddition de l'Émir Abdelkader", ar: "استسلام الأمير عبد القادر" } },
  { eraId: "french", year: 1857, label: { en: "Lalla Fatma N'Soumer captured", fr: "Capture de Lalla Fatma N'Soumer", ar: "أسر لالة فاطمة نسومر" } },
  { eraId: "french", year: 1945, label: { en: "Sétif & Guelma massacres", fr: "Massacres de Sétif et Guelma", ar: "مجازر سطيف وقالمة" } },
  { eraId: "independence", year: 1954, label: { en: "Toussaint Rouge — war begins", fr: "Toussaint Rouge — début de la guerre", ar: "الفاتح نوفمبر — انطلاق الثورة" } },
  { eraId: "independence", year: 1957, label: { en: "Battle of Algiers", fr: "Bataille d'Alger", ar: "معركة الجزائر" } },
  { eraId: "independence", year: 1962, label: { en: "Independence of Algeria", fr: "Indépendance de l'Algérie", ar: "استقلال الجزائر" } },
  { eraId: "independence", year: 2019, label: { en: "Hirak popular movement", fr: "Mouvement populaire Hirak", ar: "الحراك الشعبي" } },
];

// ---------- Figure → year (birth or peak) ----------

type ChronFigure = { figure: Figure; year: number };

const FIGURE_YEARS: Record<string, number> = {
  massinissa: -238,
  jugurtha: -160,
  syphax: -215,
  "juba-i": -85,
  "juba-ii": -50,
  tacfarinas: 20,
  augustine: 354,
  dihya: 660,
  "ibn-khaldun": 1332,
  abdelkader: 1808,
  "ahmed-bey": 1784,
  "lalla-fatma-nsoumer": 1830,
  "el-mokrani": 1815,
  "abane-ramdane": 1920,
  "krim-belkacem": 1922,
  "ben-mhidi": 1923,
  amirouche: 1926,
  "ferhat-abbas": 1899,
  "mouloud-feraoun": 1913,
  "assia-djebar": 1936,
  idir: 1949,
  matoub: 1956,
};

// ---------- Component ----------

function ChroniclePage() {
  const lang = useLang();
  const navigate = useNavigate();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeEra, setActiveEra] = useState<string>("earlynorthafrica");
  const [ready, setReady] = useState(false);

  const bands: EraBand[] = useMemo(
    () =>
      eras
        .filter((e) => ERA_YEARS[e.id])
        .map((e) => ({
          id: e.id,
          legend: eraOfCategory("ancient" as never), // placeholder overwritten below
          badge: e.id as EraBadgeKind,
          start: ERA_YEARS[e.id].start,
          end: ERA_YEARS[e.id].end,
        })),
    [],
  );

  const chronFigures: ChronFigure[] = useMemo(
    () =>
      figures
        .filter((f) => FIGURE_YEARS[f.id] != null)
        .map((f) => ({ figure: f, year: FIGURE_YEARS[f.id] })),
    [],
  );

  const activeEraObj = eras.find((e) => e.id === activeEra)!;
  const activeYears = ERA_YEARS[activeEra];
  const eraFigures = chronFigures.filter(
    (cf) => cf.year >= activeYears.start - 20 && cf.year <= activeYears.end + 20,
  );
  const eraEvents = EVENTS.filter((ev) => ev.eraId === activeEra);

  // Detect active era from scroll position (center of viewport).
  const onScroll = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const centerX = el.scrollLeft + el.clientWidth / 2;
    const centerYear = TIMELINE_START + centerX / PX_PER_YEAR;
    const found = bands.find((b) => centerYear >= b.start && centerYear <= b.end);
    if (found && found.id !== activeEra) setActiveEra(found.id);
  }, [activeEra, bands]);

  // Drag-to-scroll (desktop mouse).
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    let down = false;
    let startX = 0;
    let startScroll = 0;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse") {
        down = true;
        startX = e.clientX;
        startScroll = el.scrollLeft;
        el.setPointerCapture(e.pointerId);
        el.style.cursor = "grabbing";
      }
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      el.scrollLeft = startScroll - (e.clientX - startX);
    };
    const onUp = (e: PointerEvent) => {
      down = false;
      el.style.cursor = "";
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {
        /* noop */
      }
    };
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
    };
  }, []);

  // Wheel: convert vertical to horizontal.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        el.scrollLeft += e.deltaY;
        e.preventDefault();
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  // Initial center on Numidia era for a strong opening moment.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const b = ERA_YEARS.numidia;
    const centerYear = (b.start + b.end) / 2;
    el.scrollLeft = yearToX(centerYear) - el.clientWidth / 2;
    setReady(true);
    onScroll();
  }, [onScroll]);

  const scrollToEra = (id: string) => {
    const el = scrollerRef.current;
    const b = ERA_YEARS[id];
    if (!el || !b) return;
    const centerYear = (b.start + b.end) / 2;
    el.scrollTo({ left: yearToX(centerYear) - el.clientWidth / 2, behavior: "smooth" });
  };

  const step = (dir: 1 | -1) => {
    const idx = bands.findIndex((b) => b.id === activeEra);
    const next = bands[Math.min(bands.length - 1, Math.max(0, idx + dir))];
    if (next) scrollToEra(next.id);
  };

  const yearLabel = (y: number) =>
    y < 0 ? `${Math.abs(y)} BC` : `${y}`;

  return (
    <div className="min-h-dvh" style={{ background: "var(--chronicle-bg, #0b0906)" }}>
      <style>{`
        .chronicle-shell {
          --gold: oklch(0.82 0.13 82);
          --gold-soft: oklch(0.72 0.11 78);
          --parchment: oklch(0.92 0.03 82);
          --ink: oklch(0.14 0.02 60);
          --panel: oklch(0.18 0.02 55);
          --panel-2: oklch(0.12 0.02 55);
          --rule: color-mix(in oklab, var(--gold) 30%, transparent);
          color: var(--parchment);
        }
        .chronicle-shell .no-scrollbar::-webkit-scrollbar { display: none; }
        .chronicle-shell .no-scrollbar { scrollbar-width: none; }
        .chronicle-shell .gold-text { color: var(--gold); }
        .chronicle-shell .gold-border { border-color: var(--rule); }
        .chronicle-scroller {
          overflow-x: auto;
          overflow-y: hidden;
          overscroll-behavior-x: contain;
          -webkit-overflow-scrolling: touch;
          scroll-behavior: auto;
          cursor: grab;
          touch-action: pan-x;
        }
        .chronicle-fade-l, .chronicle-fade-r {
          position: absolute; top: 0; bottom: 0; width: 96px; pointer-events: none; z-index: 3;
        }
        .chronicle-fade-l { left: 0; background: linear-gradient(90deg, #0b0906 10%, transparent); }
        .chronicle-fade-r { right: 0; background: linear-gradient(-90deg, #0b0906 10%, transparent); }
        @keyframes chron-appear {
          from { opacity: 0; transform: translateY(6px) scale(0.9); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .chron-marker { animation: chron-appear 480ms cubic-bezier(.2,.7,.2,1) both; }
        @keyframes chron-glow {
          0%,100% { box-shadow: 0 0 0 0 color-mix(in oklab, var(--gold) 55%, transparent); }
          50%     { box-shadow: 0 0 0 8px color-mix(in oklab, var(--gold) 0%, transparent); }
        }
        .chron-active-pulse { animation: chron-glow 2.4s ease-in-out infinite; }
        .chron-axis-line {
          background:
            linear-gradient(90deg,
              color-mix(in oklab, var(--gold) 55%, transparent) 0%,
              color-mix(in oklab, var(--gold) 25%, transparent) 100%);
        }
        .chron-panel {
          background:
            radial-gradient(1200px 200px at 20% -20%, color-mix(in oklab, var(--gold) 8%, transparent), transparent 60%),
            linear-gradient(180deg, var(--panel) 0%, var(--panel-2) 100%);
          border: 1px solid var(--rule);
          box-shadow: 0 30px 80px -30px rgba(0,0,0,0.6), inset 0 1px 0 color-mix(in oklab, var(--gold) 12%, transparent);
        }
        .chron-chip {
          background: color-mix(in oklab, var(--gold) 8%, transparent);
          border: 1px solid var(--rule);
          color: var(--parchment);
        }
        .chron-chip:hover { background: color-mix(in oklab, var(--gold) 18%, transparent); }
        .chron-title-serif {
          font-family: "Cormorant Garamond", "Playfair Display", Georgia, ui-serif, serif;
          letter-spacing: -0.01em;
        }
        .chron-cap {
          font-family: ui-sans-serif, system-ui, sans-serif;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          font-size: 10.5px;
          color: color-mix(in oklab, var(--gold) 85%, white);
        }
        .chron-vignette::before {
          content: ""; position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(80% 60% at 50% 40%, transparent 55%, rgba(0,0,0,0.55) 100%);
        }
      `}</style>

      <div className="chronicle-shell relative">
        <Header />

        {/* Hero */}
        <section className="max-w-6xl mx-auto px-4 pt-8 sm:pt-12 pb-6 text-center">
          <div className="chron-cap inline-flex items-center gap-2 justify-center">
            <span aria-hidden>ⵣ</span>
            {lang === "fr" ? "La chronique interactive" : lang === "ar" ? "السجل التفاعلي" : "The Interactive Chronicle"}
          </div>
          <h1 className="chron-title-serif mt-3 text-4xl sm:text-6xl font-semibold">
            <span className="gold-text">3,000 years</span>{" "}
            {lang === "fr" ? "en un seul geste" : lang === "ar" ? "بلمسة واحدة" : "at your fingertips"}
          </h1>
          <p className="mt-3 text-sm sm:text-base opacity-80 max-w-2xl mx-auto">
            {lang === "fr"
              ? "Faites glisser la chronique pour parcourir l'Algérie, des premières civilisations amazighes à la République moderne."
              : lang === "ar"
                ? "اسحب الشريط الزمني عبر الجزائر، من أقدم الحضارات الأمازيغية إلى الجمهورية الحديثة."
                : "Drag the chronicle across Algeria, from the earliest Amazigh civilizations to the modern Republic."}
          </p>
        </section>

        {/* Timeline */}
        <section
          className="relative"
          style={{ background: "linear-gradient(180deg, #0b0906 0%, #100c07 100%)" }}
        >
          <div className="chronicle-fade-l" />
          <div className="chronicle-fade-r" />

          {/* Prev / Next controls */}
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-between px-2 sm:px-4">
            <button
              type="button"
              onClick={() => step(-1)}
              className="pointer-events-auto rounded-full p-2 sm:p-3 chron-panel hover:scale-105 transition"
              aria-label="Previous era"
            >
              <ChevronLeft className="w-5 h-5" style={{ color: "var(--gold)" }} />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              className="pointer-events-auto rounded-full p-2 sm:p-3 chron-panel hover:scale-105 transition"
              aria-label="Next era"
            >
              <ChevronRight className="w-5 h-5" style={{ color: "var(--gold)" }} />
            </button>
          </div>

          <div
            ref={scrollerRef}
            onScroll={onScroll}
            className="chronicle-scroller no-scrollbar select-none"
            style={{ height: "clamp(360px, 52vh, 520px)" }}
          >
            <div
              className="relative"
              style={{ width: TOTAL_WIDTH, height: "100%", opacity: ready ? 1 : 0, transition: "opacity 400ms" }}
            >
              {/* Era bands */}
              {bands.map((b) => {
                const isActive = b.id === activeEra;
                const left = yearToX(b.start);
                const width = yearToX(b.end) - left;
                const era = eras.find((e) => e.id === b.id)!;
                const legend = legendEraOf(era.figures ? "ancient" as never : "ancient" as never);
                void legend;
                return (
                  <div
                    key={b.id}
                    className="absolute top-0 bottom-0"
                    style={{
                      left,
                      width,
                      opacity: isActive ? 1 : 0.55,
                      transition: "opacity 500ms",
                    }}
                  >
                    {/* Era backdrop tint */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: isActive
                          ? "linear-gradient(180deg, color-mix(in oklab, var(--gold) 10%, transparent), transparent 70%)"
                          : "transparent",
                      }}
                    />
                    {/* Era label */}
                    <button
                      type="button"
                      onClick={() => scrollToEra(b.id)}
                      className="absolute left-1/2 -translate-x-1/2 top-6 text-center whitespace-nowrap"
                    >
                      <div className="chron-cap">{era.dateRange}</div>
                      <div
                        className="chron-title-serif text-2xl sm:text-3xl mt-1"
                        style={{ color: isActive ? "var(--gold)" : "var(--parchment)" }}
                      >
                        {t(era.title, lang)}
                      </div>
                    </button>
                  </div>
                );
              })}

              {/* Axis */}
              <div
                className="absolute left-0 right-0"
                style={{ bottom: 84, height: 2 }}
              >
                <div className="chron-axis-line w-full h-full rounded-full" />
              </div>

              {/* Century ticks */}
              {Array.from({ length: Math.floor((TIMELINE_END - TIMELINE_START) / 100) + 1 }).map((_, i) => {
                const year = TIMELINE_START + i * 100;
                const x = yearToX(year);
                const major = year % 500 === 0;
                return (
                  <div
                    key={year}
                    className="absolute"
                    style={{
                      left: x,
                      bottom: 78,
                      width: 1,
                      height: major ? 14 : 8,
                      background: "color-mix(in oklab, var(--gold) 40%, transparent)",
                    }}
                  >
                    {major && (
                      <div
                        className="absolute -translate-x-1/2 text-[10px] font-mono opacity-60"
                        style={{ top: 16, left: 0, color: "var(--gold-soft)" }}
                      >
                        {yearLabel(year)}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Era medallions on axis */}
              {bands.map((b) => {
                const x = yearToX((b.start + b.end) / 2);
                const isActive = b.id === activeEra;
                return (
                  <button
                    key={`badge-${b.id}`}
                    type="button"
                    onClick={() => scrollToEra(b.id)}
                    className={`absolute -translate-x-1/2 chron-marker ${isActive ? "chron-active-pulse" : ""} rounded-full`}
                    style={{ left: x, bottom: 110 }}
                    aria-label={`Jump to ${b.id}`}
                  >
                    <EraBadge
                      kind={b.badge}
                      unlocked
                      size={isActive ? 72 : 52}
                      animate={isActive}
                    />
                  </button>
                );
              })}

              {/* Event markers */}
              {EVENTS.map((ev, i) => {
                const x = yearToX(ev.year);
                const isActive = ev.eraId === activeEra;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() =>
                      navigate({ to: "/era/$eraId", params: { eraId: ev.eraId } })
                    }
                    className="absolute -translate-x-1/2 group chron-marker"
                    style={{ left: x, bottom: 40, animationDelay: `${i * 30}ms` }}
                    aria-label={ev.label[lang]}
                  >
                    <div
                      className="w-3 h-3 rounded-full mx-auto"
                      style={{
                        background: isActive ? "var(--gold)" : "var(--gold-soft)",
                        boxShadow: isActive ? "0 0 12px var(--gold)" : "none",
                      }}
                    />
                    <div
                      className="absolute left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap text-[11px] font-medium px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition"
                      style={{
                        background: "rgba(0,0,0,0.75)",
                        color: "var(--parchment)",
                        border: "1px solid var(--rule)",
                        top: 12,
                      }}
                    >
                      <span className="gold-text mr-2 font-mono text-[10px]">{yearLabel(ev.year)}</span>
                      {ev.label[lang]}
                    </div>
                  </button>
                );
              })}

              {/* Figure markers (above axis) */}
              {chronFigures.map((cf, i) => {
                const x = yearToX(cf.year);
                const isActive = eraOfCategory(cf.figure.category) === (
                  bands.find((b) => b.id === activeEra)?.legend ?? eraOfCategory(cf.figure.category)
                ) && cf.year >= (ERA_YEARS[activeEra]?.start ?? -Infinity) - 20
                  && cf.year <= (ERA_YEARS[activeEra]?.end ?? Infinity) + 20;
                return (
                  <button
                    key={cf.figure.id}
                    type="button"
                    onClick={() =>
                      navigate({ to: "/figures/$figureId", params: { figureId: cf.figure.id } })
                    }
                    className="absolute -translate-x-1/2 chron-marker text-center"
                    style={{ left: x, top: 130, animationDelay: `${i * 40}ms` }}
                    aria-label={t(cf.figure.displayName, lang)}
                  >
                    <div
                      className="mx-auto flex items-center justify-center rounded-full"
                      style={{
                        width: isActive ? 40 : 30,
                        height: isActive ? 40 : 30,
                        background:
                          "radial-gradient(circle at 30% 30%, oklch(0.85 0.11 82) 0%, oklch(0.55 0.09 70) 70%, oklch(0.32 0.05 60) 100%)",
                        border: "1px solid color-mix(in oklab, var(--gold) 60%, black)",
                        boxShadow: isActive
                          ? "0 6px 18px -4px color-mix(in oklab, var(--gold) 55%, transparent)"
                          : "0 3px 8px -2px rgba(0,0,0,0.5)",
                        transition: "all 400ms",
                        fontSize: isActive ? 20 : 16,
                        color: "#1a120a",
                      }}
                    >
                      <span aria-hidden>{cf.figure.emoji}</span>
                    </div>
                    <div
                      className="mt-1 text-[10px] font-medium opacity-80 max-w-[80px] leading-tight"
                      style={{ color: isActive ? "var(--gold)" : "var(--parchment)" }}
                    >
                      {t(cf.figure.displayName, lang)}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Era jump-rail */}
          <div className="max-w-6xl mx-auto px-4 pt-2 pb-6">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              {bands.map((b) => {
                const era = eras.find((e) => e.id === b.id)!;
                const isActive = b.id === activeEra;
                return (
                  <button
                    key={`rail-${b.id}`}
                    type="button"
                    onClick={() => scrollToEra(b.id)}
                    className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                      isActive ? "gold-text" : "opacity-70 hover:opacity-100"
                    }`}
                    style={{
                      background: isActive
                        ? "color-mix(in oklab, var(--gold) 18%, transparent)"
                        : "transparent",
                      border: `1px solid ${isActive ? "var(--rule)" : "transparent"}`,
                    }}
                  >
                    {t(era.title, lang)}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Active era exhibit panel */}
        <section className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
          <div className="chron-panel rounded-2xl p-5 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
              <div>
                <div className="chron-cap">
                  {lang === "fr" ? "Époque active" : lang === "ar" ? "الحقبة النشطة" : "Active era"}
                </div>
                <h2 className="chron-title-serif text-3xl sm:text-4xl mt-1">
                  {t(activeEraObj.title, lang)}
                </h2>
                <div className="text-sm gold-text font-mono mt-1">{activeEraObj.dateRange}</div>
              </div>
              <Link
                to="/era/$eraId"
                params={{ eraId: activeEraObj.id }}
                className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
                style={{
                  background: "var(--gold)",
                  color: "#1a120a",
                  boxShadow: "0 10px 30px -10px color-mix(in oklab, var(--gold) 60%, transparent)",
                }}
              >
                {lang === "fr" ? "Entrer dans l'époque" : lang === "ar" ? "ادخل الحقبة" : "Enter the era"}
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <p className="text-sm sm:text-base opacity-85 leading-relaxed max-w-3xl">
              {t(activeEraObj.summary, lang)}
            </p>

            <div className="grid gap-6 mt-8 sm:grid-cols-3">
              {/* Events */}
              <PanelColumn
                icon={<Scroll className="w-4 h-4" />}
                title={lang === "fr" ? "Événements majeurs" : lang === "ar" ? "أحداث كبرى" : "Major events"}
              >
                {eraEvents.length === 0 && <EmptyLine lang={lang} />}
                {eraEvents.map((ev, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => navigate({ to: "/era/$eraId", params: { eraId: ev.eraId } })}
                    className="chron-chip w-full text-left rounded-lg px-3 py-2 text-sm transition"
                  >
                    <span className="gold-text font-mono text-[11px] me-2">{yearLabel(ev.year)}</span>
                    {ev.label[lang]}
                  </button>
                ))}
              </PanelColumn>

              {/* Figures alive */}
              <PanelColumn
                icon={<Users className="w-4 h-4" />}
                title={lang === "fr" ? "Figures de l'époque" : lang === "ar" ? "شخصيات الحقبة" : "Figures of the era"}
              >
                {eraFigures.length === 0 && <EmptyLine lang={lang} />}
                {eraFigures.map(({ figure }) => (
                  <Link
                    key={figure.id}
                    to="/figures/$figureId"
                    params={{ figureId: figure.id }}
                    className="chron-chip flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition"
                  >
                    <span
                      aria-hidden
                      className="flex items-center justify-center w-8 h-8 rounded-full text-base shrink-0"
                      style={{
                        background:
                          "radial-gradient(circle at 30% 30%, oklch(0.85 0.11 82) 0%, oklch(0.55 0.09 70) 100%)",
                        color: "#1a120a",
                      }}
                    >
                      {figure.emoji}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-semibold truncate">{t(figure.displayName, lang)}</span>
                      <span className="block text-[11px] opacity-70 truncate">
                        {t(figure.regionLabel, lang)}
                      </span>
                    </span>
                  </Link>
                ))}
              </PanelColumn>

              {/* Regions involved */}
              <PanelColumn
                icon={<MapPin className="w-4 h-4" />}
                title={lang === "fr" ? "Régions impliquées" : lang === "ar" ? "المناطق المعنية" : "Regions involved"}
              >
                {(activeEraObj.places ?? []).length === 0 && <EmptyLine lang={lang} />}
                {(activeEraObj.places ?? []).map((p, i) => (
                  <div key={i} className="chron-chip rounded-lg px-3 py-2 text-sm">
                    <div className="font-semibold">{t(p.name, lang)}</div>
                    <div className="text-[11px] opacity-75 mt-0.5 leading-snug">{t(p.note, lang)}</div>
                  </div>
                ))}
                <Link
                  to="/map"
                  className="inline-flex items-center gap-1.5 mt-1 text-[11px] chron-cap gold-text hover:underline"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  {lang === "fr" ? "Ouvrir l'atlas" : lang === "ar" ? "افتح الأطلس" : "Open the atlas"}
                </Link>
              </PanelColumn>
            </div>
          </div>

          <p className="mt-6 text-center text-[11px] chron-cap opacity-70">
            {lang === "fr"
              ? "Glissez, faites défiler ou utilisez les flèches"
              : lang === "ar"
                ? "اسحب أو مرّر أو استخدم الأسهم"
                : "Drag, scroll, or use the arrows"}
          </p>
        </section>
      </div>
    </div>
  );
}

function PanelColumn({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="chron-cap flex items-center gap-2 mb-3 gold-text">
        {icon}
        {title}
      </div>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

function EmptyLine({ lang }: { lang: Lang }) {
  return (
    <div className="text-xs opacity-60 italic">
      {lang === "fr" ? "Aucun élément disponible." : lang === "ar" ? "لا توجد عناصر." : "No entries."}
    </div>
  );
}
