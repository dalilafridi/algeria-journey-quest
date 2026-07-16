/**
 * /curator — layout route.
 *
 * Phase-1 access model: available on DEV and on Lovable preview hostnames
 * ONLY. Any other host (custom domain, published .lovable.app) returns 404.
 *
 * Allowed hostnames:
 *   - localhost / 127.0.0.1                  (local dev)
 *   - id-preview--*.lovable.app              (Lovable in-editor preview)
 *   - *--*-dev.lovable.app                   (stable preview URL)
 *
 * Blocked (returns notFound):
 *   - dzodyssey.numeradataworks.com          (production custom domain)
 *   - algeria-journey-quest.lovable.app      (published lovable subdomain)
 *   - any other host
 *
 * The check runs BOTH on the server (via the request Host header during SSR)
 * and on the client (via window.location.hostname), so the portal never
 * renders — and its HTML never ships — on production hosts.
 *
 * Phase 2 will replace this with Lovable Cloud auth + a `curator` role
 * checked server-side via `requireSupabaseAuth`.
 *
 * No VITE_* token, no sessionStorage — gating is purely host-based here.
 */

import { createFileRoute, notFound } from "@tanstack/react-router";
import { getRequest } from "@tanstack/react-start/server";
import { CuratorShell } from "@/components/curator-portal/CuratorShell";

function isPreviewHost(host: string | null | undefined): boolean {
  if (!host) return false;
  const h = host.toLowerCase().split(":")[0];
  if (h === "localhost" || h === "127.0.0.1" || h === "0.0.0.0") return true;
  if (!h.endsWith(".lovable.app")) return false;
  if (h.startsWith("id-preview--")) return true;
  if (h.endsWith("-dev.lovable.app")) return true;
  return false;
}

export const Route = createFileRoute("/curator")({
  beforeLoad: () => {
    if (import.meta.env.DEV) return;
    let host: string | null | undefined;
    if (typeof window !== "undefined") {
      host = window.location.hostname;
    } else {
      try {
        const req = getWebRequest();
        host = req?.headers.get("host");
      } catch {
        host = null;
      }
    }
    if (!isPreviewHost(host)) {
      throw notFound();
    }
  },
  component: CuratorShell,
});
