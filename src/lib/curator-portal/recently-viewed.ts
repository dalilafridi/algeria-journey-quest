/**
 * Per-user "Recently viewed" — browser localStorage only.
 *
 * The key is namespaced by userId so different Studio accounts on the
 * same browser stay separate. Cap at 12 entries per kind.
 */

export type RecentKind = "figure_draft" | "source";
export interface RecentEntry {
  kind: RecentKind;
  id: string;
  title: string;
  subtitle?: string;
  at: number;
}

const CAP = 12;
const key = (userId: string) => `dz-studio:recent:${userId}`;

function readAll(userId: string): RecentEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key(userId));
    if (!raw) return [];
    const arr = JSON.parse(raw) as RecentEntry[];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function writeAll(userId: string, entries: RecentEntry[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key(userId), JSON.stringify(entries.slice(0, CAP * 2)));
  } catch {
    /* quota — ignore */
  }
}

export function pushRecent(userId: string, entry: Omit<RecentEntry, "at">): void {
  if (!userId) return;
  const all = readAll(userId).filter((e) => !(e.kind === entry.kind && e.id === entry.id));
  all.unshift({ ...entry, at: Date.now() });
  writeAll(userId, all);
}

export function listRecent(userId: string, kind?: RecentKind, limit = CAP): RecentEntry[] {
  const all = readAll(userId);
  return (kind ? all.filter((e) => e.kind === kind) : all).slice(0, limit);
}

export function clearRecent(userId: string): void {
  if (typeof window === "undefined" || !userId) return;
  try { window.localStorage.removeItem(key(userId)); } catch { /* ignore */ }
}
