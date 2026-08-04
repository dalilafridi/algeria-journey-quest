/**
 * Mounts the production monitoring client and reports 404 hits.
 * Renders nothing; safe to include once in the root layout.
 */

import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { installMonitoring, reportNotFound } from "@/lib/monitoring/client";

export function MonitoringProbe() {
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const isNotFound = useRouterState({
    select: (r) => r.matches.some((m) => m.routeId === "/$" || m.globalNotFound === true),
  });

  useEffect(() => {
    installMonitoring();
  }, []);

  useEffect(() => {
    if (isNotFound) reportNotFound(pathname);
  }, [isNotFound, pathname]);

  return null;
}
