import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { recordVisit, type VisitKind } from "@/lib/passport";

/**
 * Watches the current pathname and records passport visits for
 * era / figure / region / culture detail pages. Runs once at root.
 */
export function PassportTracker() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (!pathname) return;
    const rules: { prefix: string; kind: VisitKind }[] = [
      { prefix: "/era/", kind: "era" },
      { prefix: "/figures/", kind: "figure" },
      { prefix: "/region/", kind: "region" },
      { prefix: "/culture/", kind: "culture" },
    ];
    for (const r of rules) {
      if (pathname.startsWith(r.prefix)) {
        const rest = pathname.slice(r.prefix.length).split("/")[0];
        // Skip list/index pages like /figures/collection or /figures/quiz
        if (!rest) return;
        if (r.kind === "figure" && (rest === "collection" || rest === "quiz")) return;
        recordVisit(r.kind, decodeURIComponent(rest));
        return;
      }
    }
  }, [pathname]);

  return null;
}
