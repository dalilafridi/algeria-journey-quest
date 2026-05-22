import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { t, useLang, type Lang } from "@/lib/i18n";
import {
  clearRecent,
  getDiscoveries,
  getRecent,
  highlight,
  kindLabel,
  pushRecent,
  searchAll,
  type SearchHit,
  type SearchItem,
  type SearchKind,
} from "@/lib/search";

export const OPEN_SEARCH_EVENT = "museum:open-search";

/** Imperative helper — fire from anywhere to open the overlay. */
export function openMuseumSearch() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(OPEN_SEARCH_EVENT));
  }
}

const COPY = {
  title: {
    en: "Search the museum",
    fr: "Explorer le musée",
    ar: "ابحث في المتحف",
  },
  placeholder: {
    en: "Search figures, eras, regions, words…",
    fr: "Chercher figures, époques, régions, paroles…",
    ar: "ابحث عن الشخصيات والحقب والمناطق والكلمات…",
  },
  recent: { en: "Recent searches", fr: "Recherches récentes", ar: "عمليات بحث حديثة" },
  clear: { en: "Clear", fr: "Effacer", ar: "مسح" },
  discoveries: {
    en: "Suggested discoveries",
    fr: "Découvertes suggérées",
    ar: "اكتشافات مقترحة",
  },
  empty: {
    en: "Nothing in the archive matches that yet.",
    fr: "Rien dans l'archive ne correspond à cela.",
    ar: "لا شيء في الأرشيف يطابق ذلك بعد.",
  },
  emptyHint: {
    en: "Try a name, a region, or a single word.",
    fr: "Essayez un nom, une région ou un seul mot.",
    ar: "جرّب اسمًا أو منطقة أو كلمة واحدة.",
  },
  hintShortcut: {
    en: "Open with ⌘K · / · close with Esc",
    fr: "Ouvrir avec ⌘K · / · fermer avec Échap",
    ar: "افتح بـ ⌘K · / · أغلق بـ Esc",
  },
  resultsCount: {
    en: "results",
    fr: "résultats",
    ar: "نتائج",
  },
  jumpTo: { en: "Open", fr: "Ouvrir", ar: "افتح" },
} as const;

export function SearchOverlay() {
  const lang = useLang();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [recent, setRecent] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Open / close API ------------------------------------------------------
  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_SEARCH_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_SEARCH_EVENT, onOpen);
  }, []);

  // Keyboard shortcut -----------------------------------------------------
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isTyping =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);

      // Cmd/Ctrl + K — always works.
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      // "/" — only when not already typing into a field.
      if (!isTyping && !open && e.key === "/") {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Lock body scroll while open + manage focus ----------------------------
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setRecent(getRecent());
    setActiveIndex(0);
    // Defer focus until the overlay is painted to avoid mobile keyboard jank.
    const id = window.setTimeout(() => inputRef.current?.focus(), 30);
    return () => {
      document.body.style.overflow = prev;
      window.clearTimeout(id);
    };
  }, [open]);

  // Computed --------------------------------------------------------------
  const results: SearchHit[] = useMemo(
    () => (query.trim() ? searchAll(query, 30) : []),
    [query],
  );
  const discoveries = useMemo(() => (query.trim() ? [] : getDiscoveries()), [query]);

  // Reset active index when result set changes
  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  // Scroll active result into view
  useEffect(() => {
    if (!open) return;
    const el = listRef.current?.querySelector<HTMLElement>(
      `[data-result-index="${activeIndex}"]`,
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, open]);

  // Navigation -----------------------------------------------------------
  const goTo = (item: SearchItem) => {
    pushRecent(query.trim() || t(item.title, lang));
    setOpen(false);
    setQuery("");
    const [path, hash] = item.href.split("#");
    navigate({ to: path as never, hash: hash || undefined });
  };


  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const list = results.length ? results : (discoveries as SearchItem[]);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, Math.max(0, list.length - 1)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const chosen = list[activeIndex];
      if (chosen) goTo(chosen);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
    }
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t(COPY.title, lang)}
      className="fixed inset-0 z-[60] flex items-start justify-center px-3 sm:px-6 pt-[calc(env(safe-area-inset-top)+1rem)] sm:pt-20 animate-fade-in"
    >
      {/* Cinematic dim layer */}
      <button
        type="button"
        aria-label="Close search"
        onClick={() => setOpen(false)}
        className="absolute inset-0 bg-foreground/55 backdrop-blur-md transition-opacity"
      />

      {/* Panel */}
      <div
        className="relative w-full max-w-2xl rounded-3xl border border-border/80 bg-card/95 overflow-hidden shadow-2xl animate-float-up"
        style={{
          boxShadow:
            "0 20px 60px -20px rgba(20,12,4,0.45), 0 0 0 1px rgba(180,140,80,0.18)",
          background:
            "linear-gradient(180deg, color-mix(in oklab, var(--card) 94%, var(--accent) 6%), var(--card))",
        }}
      >
        {/* Header — input */}
        <div className="flex items-center gap-3 px-4 sm:px-5 pt-4 sm:pt-5 pb-3 border-b border-border/60">
          <span
            aria-hidden
            className="shrink-0 text-lg sm:text-xl text-accent-foreground/90"
          >
            ⵣ
          </span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onInputKey}
            type="search"
            inputMode="search"
            autoComplete="off"
            spellCheck={false}
            placeholder={t(COPY.placeholder, lang)}
            className="flex-1 min-w-0 bg-transparent text-base sm:text-lg text-foreground placeholder:text-muted-foreground/70 outline-none border-0 focus:ring-0"
            aria-label={t(COPY.title, lang)}
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full border border-border bg-card/70 hover:bg-muted transition"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div
          ref={listRef}
          className="max-h-[68vh] sm:max-h-[60vh] overflow-y-auto overscroll-contain"
        >
          {/* Results */}
          {results.length > 0 && (
            <ul className="py-2">
              {results.map((hit, i) => (
                <li key={hit.id} data-result-index={i}>
                  <ResultRow
                    item={hit}
                    lang={lang}
                    active={i === activeIndex}
                    query={query}
                    onHover={() => setActiveIndex(i)}
                    onClick={() => goTo(hit)}
                  />
                </li>
              ))}
              <li className="px-5 pt-2 pb-3 text-[11px] uppercase tracking-[0.2em] text-muted-foreground/70 text-center">
                {results.length} {t(COPY.resultsCount, lang)}
              </li>
            </ul>
          )}

          {/* Empty state for an active query */}
          {query.trim() && results.length === 0 && (
            <div className="px-6 py-12 text-center">
              <div className="text-3xl opacity-60" aria-hidden>
                ✦
              </div>
              <p
                className="mt-3 text-base text-foreground/90"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                {t(COPY.empty, lang)}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {t(COPY.emptyHint, lang)}
              </p>
            </div>
          )}

          {/* Idle state — recent + discoveries */}
          {!query.trim() && (
            <div className="py-3">
              {recent.length > 0 && (
                <Section
                  label={t(COPY.recent, lang)}
                  action={{
                    label: t(COPY.clear, lang),
                    onClick: () => {
                      clearRecent();
                      setRecent([]);
                    },
                  }}
                >
                  <div className="flex flex-wrap gap-2 px-5 pb-2">
                    {recent.map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => {
                          setQuery(q);
                          inputRef.current?.focus();
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-background/70 text-xs font-medium text-foreground hover:border-accent/60 hover:bg-accent/10 transition"
                      >
                        <span aria-hidden className="opacity-50">
                          ⟲
                        </span>
                        {q}
                      </button>
                    ))}
                  </div>
                </Section>
              )}

              {discoveries.length > 0 && (
                <Section label={t(COPY.discoveries, lang)}>
                  <ul>
                    {discoveries.map((d, i) => (
                      <li key={d.id} data-result-index={i}>
                        <ResultRow
                          item={d}
                          lang={lang}
                          active={i === activeIndex}
                          query=""
                          onHover={() => setActiveIndex(i)}
                          onClick={() => goTo(d)}
                        />
                      </li>
                    ))}
                  </ul>
                </Section>
              )}
            </div>
          )}
        </div>

        {/* Footer — quiet shortcut hint */}
        <div className="hidden sm:flex items-center justify-between gap-3 px-5 py-2.5 border-t border-border/60 bg-background/40 text-[11px] text-muted-foreground">
          <span>{t(COPY.hintShortcut, lang)}</span>
          <span className="inline-flex items-center gap-1.5">
            <Kbd>↑</Kbd>
            <Kbd>↓</Kbd>
            <span>·</span>
            <Kbd>↵</Kbd>
            <span>{t(COPY.jumpTo, lang)}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- Pieces

function Section({
  label,
  action,
  children,
}: {
  label: string;
  action?: { label: string; onClick: () => void };
  children: React.ReactNode;
}) {
  return (
    <section className="pt-3">
      <div className="flex items-center justify-between px-5 pb-2">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted-foreground">
          {label}
        </h3>
        {action && (
          <button
            type="button"
            onClick={action.onClick}
            className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground transition"
          >
            {action.label}
          </button>
        )}
      </div>
      {children}
    </section>
  );
}

function ResultRow({
  item,
  lang,
  active,
  query,
  onHover,
  onClick,
}: {
  item: SearchItem;
  lang: Lang;
  active: boolean;
  query: string;
  onHover: () => void;
  onClick: () => void;
}) {
  const title = t(item.title, lang);
  const snippet = t(item.snippet, lang);
  const context = item.context ? t(item.context, lang) : "";

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={onHover}
      onFocus={onHover}
      className={
        "group w-full text-start flex items-start gap-3 sm:gap-4 px-4 sm:px-5 py-3 sm:py-3.5 transition-colors min-h-[64px] " +
        (active
          ? "bg-accent/12"
          : "hover:bg-muted/60")
      }
    >
      <span
        aria-hidden
        className={
          "shrink-0 inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full border text-lg transition " +
          (active
            ? "border-accent/60 bg-background shadow-[0_0_0_3px_color-mix(in_oklab,var(--accent)_18%,transparent)]"
            : "border-border bg-background/70")
        }
      >
        {item.emoji}
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span
            className="truncate text-sm sm:text-base font-semibold text-foreground"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            <HL text={title} query={query} />
          </span>
          <KindChip kind={item.kind} lang={lang} />
        </span>
        {snippet && (
          <span className="mt-0.5 block text-xs sm:text-[13px] leading-snug text-muted-foreground line-clamp-2">
            <HL text={snippet} query={query} />
          </span>
        )}
        {context && (
          <span className="mt-1 inline-block text-[10px] uppercase tracking-[0.18em] text-muted-foreground/80">
            {context}
          </span>
        )}
      </span>
      <span
        aria-hidden
        className={
          "shrink-0 self-center text-sm font-semibold transition " +
          (active ? "text-accent-foreground" : "text-muted-foreground/60 group-hover:text-foreground")
        }
      >
        ›
      </span>
    </button>
  );
}

function KindChip({ kind, lang }: { kind: SearchKind; lang: Lang }) {
  return (
    <span className="shrink-0 inline-flex items-center px-1.5 py-0.5 rounded-full border border-border/70 bg-background/70 text-[9px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
      {kindLabel(kind, lang)}
    </span>
  );
}

function HL({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  const segs = highlight(text, query);
  return (
    <>
      {segs.map((s, i) =>
        s.match ? (
          <mark
            key={i}
            className="bg-transparent text-accent-foreground"
            style={{
              boxShadow: "inset 0 -0.5em 0 color-mix(in oklab, var(--accent) 24%, transparent)",
              borderRadius: "0.18em",
              padding: "0 0.1em",
            }}
          >
            {s.text}
          </mark>
        ) : (
          <span key={i}>{s.text}</span>
        ),
      )}
    </>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex items-center justify-center min-w-[20px] h-5 px-1 rounded-md border border-border bg-background text-[10px] font-semibold text-foreground/80">
      {children}
    </kbd>
  );
}
