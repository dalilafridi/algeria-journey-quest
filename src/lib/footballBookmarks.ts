import { useCallback, useEffect, useState } from "react";

/**
 * Tiny localStorage bookmark store for the Football wing.
 * Two independent buckets: favorite players (by id) and favorite matches
 * (by id). Values are string sets serialized as JSON arrays.
 */

const KEYS = {
  players: "dz-football-fav-players-v1",
  matches: "dz-football-fav-matches-v1",
} as const;

const EVT = "dz-football-bookmarks-updated";

type Kind = keyof typeof KEYS;

function read(kind: Kind): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(KEYS[kind]);
    if (!raw) return new Set();
    const arr = JSON.parse(raw) as unknown;
    if (!Array.isArray(arr)) return new Set();
    return new Set(arr.filter((v): v is string => typeof v === "string"));
  } catch {
    return new Set();
  }
}

function write(kind: Kind, set: Set<string>) {
  try {
    localStorage.setItem(KEYS[kind], JSON.stringify(Array.from(set)));
    window.dispatchEvent(new Event(EVT));
  } catch {
    /* noop */
  }
}

export function useFootballBookmarks(kind: Kind) {
  const [ids, setIds] = useState<Set<string>>(() => read(kind));

  useEffect(() => {
    const update = () => setIds(read(kind));
    update();
    window.addEventListener(EVT, update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener(EVT, update);
      window.removeEventListener("storage", update);
    };
  }, [kind]);

  const toggle = useCallback(
    (id: string) => {
      const current = read(kind);
      if (current.has(id)) current.delete(id);
      else current.add(id);
      write(kind, current);
    },
    [kind]
  );

  const has = useCallback((id: string) => ids.has(id), [ids]);

  return { ids, has, toggle };
}
