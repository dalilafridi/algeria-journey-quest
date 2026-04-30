import { useNavigate, useRouterState } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useImmersion } from "@/lib/immersion";
import { useLang, type Lang } from "@/lib/i18n";
import { mapRegions } from "@/data/mapRegions";
import { figures } from "@/data/figures";
import { cuisineRegions } from "@/data/cuisine";

type Step = {
  id: "history" | "regions" | "culture" | "cuisine" | "cinema";
  label: Record<Lang, string>;
  match: (path: string) => boolean;
  to: string;
};

const STEPS: Step[] = [
  {
    id: "history",
    label: { fr: "Parcours", en: "Journey", ar: "الرحلة" },
    // Journey owns: home, timeline, eras, lessons, and Moments That Shaped Algeria
    match: (p) =>
      p === "/" ||
      p.startsWith("/timeline") ||
      p.startsWith("/era") ||
      p.startsWith("/moments") ||
      p.startsWith("/lessons"),
    to: "/timeline",
  },
  {
    id: "regions",
    label: { fr: "Régions", en: "Regions", ar: "المناطق" },
    match: (p) => p.startsWith("/map"),
    to: "/map",
  },
  {
    id: "culture",
    label: { fr: "Culture", en: "Culture", ar: "الثقافة" },
    // Culture owns words, ideas and figures (excluding cinema deep-link)
    match: (p) => p.startsWith("/words") || p.startsWith("/ideas") || p.startsWith("/figures"),
    to: "/words",
  },
  {
    id: "cuisine",
    label: { fr: "Cuisine", en: "Cuisine", ar: "المطبخ" },
    match: (p) => p.startsWith("/cuisine"),
    to: "/cuisine",
  },
];

const COPY = {
  immersion: { fr: "Mode immersion", en: "Immersion mode", ar: "وضع الانغماس" },
  surprise: { fr: "Surprenez-moi", en: "Surprise me", ar: "فاجئني" },
  on: { fr: "ON", en: "ON", ar: "تشغيل" },
  off: { fr: "OFF", en: "OFF", ar: "إيقاف" },
};

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function JourneyHud() {
  const lang = useLang();
  const navigate = useNavigate();
  const [immersion, setImmersion] = useImmersion();
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  const activeId = useMemo(
    () => STEPS.find((s) => s.match(path))?.id ?? null,
    [path],
  );

  const surprise = () => {
    const choice = Math.floor(Math.random() * 4);
    if (choice === 0) {
      const r = pick(mapRegions);
      navigate({ to: "/map", hash: `region-${r.id}` });
    } else if (choice === 1) {
      const f = pick(figures);
      navigate({ to: "/figures/$figureId", params: { figureId: f.id } });
    } else if (choice === 2) {
      const r = pick(cuisineRegions);
      navigate({ to: "/cuisine", hash: `cuisine-dishes` });
      window.setTimeout(() => {
        window.dispatchEvent(new CustomEvent("cuisine:open-region", { detail: r.id }));
      }, 250);
    } else {
      navigate({ to: "/moments" });
    }
  };

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-40 pointer-events-none"
      style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
    >
      <div className="mx-auto max-w-3xl px-3">
        <div
          className="pointer-events-auto rounded-2xl border border-border bg-background/85 backdrop-blur-md shadow-[0_6px_24px_-12px_rgba(0,0,0,0.25)]"
        >
          <div className="flex items-center gap-2 px-3 py-2">
            <div className="flex items-center gap-1.5 flex-1 min-w-0 overflow-hidden">
              {STEPS.map((s, i) => {
                const isActive = s.id === activeId;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => navigate({ to: s.to })}
                    className="group inline-flex items-center gap-1.5 shrink min-w-0"
                    aria-label={s.label[lang]}
                  >
                    <span
                      className={
                        "block rounded-full transition-all duration-300 " +
                        (isActive
                          ? "w-6 h-1.5 bg-primary"
                          : "w-1.5 h-1.5 bg-muted-foreground/40 group-hover:bg-muted-foreground/70")
                      }
                    />
                    <span
                      className={
                        "text-[11px] font-semibold whitespace-nowrap transition-colors " +
                        (isActive
                          ? "text-foreground"
                          : "text-muted-foreground/70 hidden sm:inline")
                      }
                    >
                      {s.label[lang]}
                    </span>
                    {i < STEPS.length - 1 && (
                      <span className="hidden sm:inline text-muted-foreground/30 text-[10px]">·</span>
                    )}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="ml-1 inline-flex items-center justify-center w-8 h-8 rounded-full border border-border bg-card hover:bg-muted transition-colors text-foreground"
              aria-label="More"
              aria-expanded={open}
            >
              <span className="text-base leading-none" aria-hidden>
                {open ? "×" : "✦"}
              </span>
            </button>
          </div>

          {open && (
            <div className="border-t border-border px-3 py-2 flex flex-wrap items-center gap-2 animate-fade-in">
              <button
                type="button"
                onClick={() => setImmersion(!immersion)}
                className={
                  "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all " +
                  (immersion
                    ? "bg-foreground text-background border-foreground"
                    : "bg-card text-foreground border-border hover:bg-muted")
                }
                aria-pressed={immersion}
              >
                <span aria-hidden>🌙</span>
                {COPY.immersion[lang]} · {immersion ? COPY.on[lang] : COPY.off[lang]}
              </button>
              <button
                type="button"
                onClick={surprise}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-primary text-primary-foreground hover:opacity-90 active:scale-95 transition-all"
              >
                <span aria-hidden>🎲</span>
                {COPY.surprise[lang]}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
