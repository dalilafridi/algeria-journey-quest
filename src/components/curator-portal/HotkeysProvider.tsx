/**
 * Global hotkeys provider — mounts a single window listener and
 * exposes ⌘K / ⌘S / Esc as an event bus. Handlers subscribe with
 * useHotkey(key, cb, deps).
 *
 * All hotkeys are Studio-only: mounted inside CuratorShell.
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";

export type HotkeyName = "cmdK" | "cmdS" | "esc";

interface HotkeysCtx {
  openSearch: () => void;
  closeSearch: () => void;
  searchOpen: boolean;
  on: (name: HotkeyName, cb: () => void) => () => void;
}

const Ctx = createContext<HotkeysCtx | null>(null);

export function HotkeysProvider({ children }: { children: ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const subs = useRef(new Map<HotkeyName, Set<() => void>>());

  const emit = useCallback((name: HotkeyName) => {
    const set = subs.current.get(name);
    if (!set) return;
    for (const cb of set) try { cb(); } catch { /* ignore */ }
  }, []);

  const on = useCallback((name: HotkeyName, cb: () => void) => {
    let set = subs.current.get(name);
    if (!set) { set = new Set(); subs.current.set(name, set); }
    set.add(cb);
    return () => { set!.delete(cb); };
  }, []);

  const openSearch = useCallback(() => setSearchOpen(true), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      const meta = e.metaKey || e.ctrlKey;
      const target = e.target as HTMLElement | null;
      const inField = !!target && (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      );
      if (meta && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        setSearchOpen((s) => !s);
        return;
      }
      if (meta && (e.key === "s" || e.key === "S")) {
        // Only intercept when inside a form field — spec: "⌘S saves the
        // current draft when focus is inside its editor".
        if (!inField) return;
        e.preventDefault();
        emit("cmdS");
        return;
      }
      if (e.key === "Escape") {
        emit("esc");
        if (searchOpen) setSearchOpen(false);
      }
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [emit, searchOpen]);

  const value = useMemo<HotkeysCtx>(() => ({ openSearch, closeSearch, searchOpen, on }), [openSearch, closeSearch, searchOpen, on]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useHotkeys(): HotkeysCtx {
  const v = useContext(Ctx);
  if (!v) throw new Error("HotkeysProvider is missing");
  return v;
}

export function useHotkey(name: HotkeyName, cb: () => void) {
  const { on } = useHotkeys();
  const ref = useRef(cb);
  ref.current = cb;
  useEffect(() => on(name, () => ref.current()), [name, on]);
}
