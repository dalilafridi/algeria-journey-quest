/**
 * Hydration-safe access to the visitor's local calendar date for the
 * "On this day" selection.
 *
 * The server has no way of knowing the visitor's timezone, so the first
 * render (server plus hydration) deliberately reports `ready: false` and no
 * exact match. Callers show the neutral archive presentation during that
 * pass, which means the wrong day's event is never flashed under an
 * "On this day" heading. After mount the real local month and day are used.
 */

import { useEffect, useState } from "react";
import { selectOnThisDay, type OnThisDaySelection } from "@/data/onThisDay";

export type LocalOnThisDay = {
  /** Null until the visitor's local date is known (first client render). */
  selection: OnThisDaySelection | null;
  /** True only after mount, when the local calendar date is available. */
  ready: boolean;
  /** True only when an approved entry matches the local month and day. */
  exact: boolean;
};

export function useLocalOnThisDay(): LocalOnThisDay {
  const [selection, setSelection] = useState<OnThisDaySelection | null>(null);

  useEffect(() => {
    const compute = () => {
      const now = new Date();
      const next = selectOnThisDay(now.getFullYear(), now.getMonth() + 1, now.getDate());
      setSelection((prev) =>
        prev && prev.entry.id === next.entry.id && prev.exact === next.exact ? prev : next,
      );
    };
    compute();
    // Roll over if the tab is left open past local midnight.
    const timer = window.setInterval(compute, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  return { selection, ready: selection !== null, exact: selection?.exact === true };
}
