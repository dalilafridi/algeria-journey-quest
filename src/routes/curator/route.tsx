/**
 * /curator — layout route.
 *
 * Phase-1 access model: available ONLY on the explicitly approved Lovable
 * in-editor preview hostname. Any other host returns 404.
 *
 * Allowed hostname:
 *   - id-preview--4ec5c163-c082-44f1-a21c-176429962830.lovable.app
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
 * No DEV flag, VITE_* token, password, or sessionStorage — gating is purely
 * exact-host based here.
 */

import { createFileRoute, notFound } from "@tanstack/react-router";
import { createIsomorphicFn } from "@tanstack/react-start";
import { CuratorShell } from "@/components/curator-portal/CuratorShell";

const APPROVED_CURATOR_PREVIEW_HOST = "id-preview--4ec5c163-c082-44f1-a21c-176429962830.lovable.app";

function isApprovedCuratorHost(host: string | null | undefined): boolean {
  if (!host) return false;
  return host.toLowerCase().split(":")[0] === APPROVED_CURATOR_PREVIEW_HOST;
}

const getHost = createIsomorphicFn()
  .client(() => window.location.hostname)
  .server(() => {
    try {
      // Lazy require keeps the server-only import out of the client bundle.
      const { getRequest } = require("@tanstack/react-start/server") as {
        getRequest: () => Request | undefined;
      };
      return getRequest()?.headers.get("host") ?? null;
    } catch {
      return null;
    }
  });

export const Route = createFileRoute("/curator")({
  beforeLoad: () => {
    if (!isApprovedCuratorHost(getHost())) {
      throw notFound();
    }
  },
  component: CuratorShell,
});

