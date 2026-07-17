/**
 * ⌘K Global Search Palette. Studio-only.
 *
 * Reads via `searchStudio` server fn on every keystroke (debounced 200ms).
 * Results are keyboard-navigable and open the target Studio route.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { searchStudio, type SearchResult } from "@/lib/curator-portal/search.functions";
import { useHotkeys } from "./HotkeysProvider";

const KIND_LABEL: Record<SearchResult["kind"], string> = {
  figure_draft: "Figure draft",
  source: "Source",
  public_figure: "Public figure",
  public_era: "Public era",
};

export function GlobalSearchPalette() {
  const { searchOpen, closeSearch } = useHotkeys();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [busy, setBusy] = useState(false);
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const reqId = useRef(0);

  useEffect(() => {
    if (!searchOpen) return;
    setCursor(0);
    setTimeout(() => inputRef.current?.focus(), 20);
  }, [searchOpen]);

  useEffect(() => {
    if (!searchOpen) return;
    const term = q.trim();
    if (term.length === 0) { setResults([]); return; }
    const t = window.setTimeout(async () => {
      const my = ++reqId.current;
      setBusy(true);
      try {
        const r = await searchStudio({ data: { q: term, limit: 20 } });
        if (my === reqId.current) { setResults(r); setCursor(0); }
      } catch { /* silent */ } finally {
        if (my === reqId.current) setBusy(false);
      }
    }, 200);
    return () => window.clearTimeout(t);
  }, [q, searchOpen]);

  const go = useCallback((r: SearchResult) => {
    closeSearch();
    setQ("");
    void navigate({ to: r.link as never });
  }, [closeSearch, navigate]);

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setCursor((c) => Math.min(c + 1, results.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setCursor((c) => Math.max(c - 1, 0)); }
    else if (e.key === "Enter") { const r = results[cursor]; if (r) go(r); }
  };

  const grouped = useMemo(() => {
    const g: Record<string, SearchResult[]> = {};
    for (const r of results) { (g[r.kind] ||= []).push(r); }
    return g;
  }, [results]);

  if (!searchOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search Studio"
      onClick={(e) => { if (e.target === e.currentTarget) closeSearch(); }}
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        background: "rgba(20, 14, 8, 0.55)",
        display: "flex", alignItems: "flex-start", justifyContent: "center",
        padding: "10vh 16px",
      }}
    >
      <div style={{ width: "100%", maxWidth: 640, background: "white", borderRadius: 12, boxShadow: "0 20px 60px rgba(0,0,0,0.3)", overflow: "hidden" }}>
        <div style={{ padding: 12, borderBottom: "1px solid var(--cp-border)" }}>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={onKey}
            placeholder="Search figure drafts, sources, museum inventory…"
            aria-label="Search"
            style={{ width: "100%", border: "none", outline: "none", fontSize: 16, padding: "8px 4px" }}
          />
        </div>
        <div style={{ maxHeight: 420, overflowY: "auto" }}>
          {busy && q && results.length === 0 && (
            <div style={{ padding: 16, fontSize: 13, color: "var(--cp-ink-soft)" }}>Searching…</div>
          )}
          {!busy && q && results.length === 0 && (
            <div style={{ padding: 16, fontSize: 13, color: "var(--cp-ink-soft)" }}>No matches.</div>
          )}
          {!q && (
            <div style={{ padding: 16, fontSize: 12, color: "var(--cp-ink-soft)", lineHeight: 1.6 }}>
              Type to search figure drafts, sources, and public inventory.<br />
              <kbd>↑</kbd> <kbd>↓</kbd> to navigate · <kbd>Enter</kbd> to open · <kbd>Esc</kbd> to close.
            </div>
          )}
          {Object.entries(grouped).map(([kind, items]) => (
            <div key={kind}>
              <div style={{ padding: "8px 14px 2px", fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.09em", color: "var(--cp-ink-soft)" }}>
                {KIND_LABEL[kind as SearchResult["kind"]]}
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {items.map((r) => {
                  const idx = results.indexOf(r);
                  const active = idx === cursor;
                  return (
                    <li key={`${r.kind}-${r.id}`}>
                      <button
                        type="button"
                        onMouseEnter={() => setCursor(idx)}
                        onClick={() => go(r)}
                        style={{
                          display: "block", width: "100%", textAlign: "left",
                          padding: "8px 14px", background: active ? "#faf1de" : "transparent",
                          border: "none", cursor: "pointer",
                        }}
                      >
                        <div style={{ fontWeight: 600, fontSize: 13 }}>{r.title}</div>
                        {r.subtitle && <div style={{ fontSize: 11, color: "var(--cp-ink-soft)" }}>{r.subtitle}</div>}
                        {r.status && <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 0.5, color: "var(--cp-ink-soft)", marginTop: 2 }}>{r.status}</div>}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
