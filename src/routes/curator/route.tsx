/**
 * /curator — layout route.
 *
 * Phase-1 access model: development-only. On a production build the entire
 * /curator/* tree throws notFound() so nothing is exposed to public visitors.
 *
 *   import.meta.env.DEV === true   → portal renders (temporary dev access)
 *   import.meta.env.DEV === false  → notFound() → the museum's 404 page
 *
 * Nothing about the portal is linked from the public museum navigation.
 *
 * Phase 2 will replace this with:
 *   1. Lovable Cloud auth (email + Google).
 *   2. A `curator` role in the `user_roles` table + `has_role()`.
 *   3. A server-side `beforeLoad` calling `requireSupabaseAuth` and
 *      checking the role, so production builds serve the portal only to
 *      authenticated curators — never through a client-only flag.
 *   4. Optional preview access via a NON-VITE server env var, validated
 *      server-side, that sets an HttpOnly/Secure/SameSite cookie.
 *
 * `VITE_*` variables must never be used for gating: they ship to the
 * browser bundle and cannot protect anything.
 */

import { createFileRoute, notFound } from "@tanstack/react-router";
import { CuratorShell } from "@/components/curator-portal/CuratorShell";

export const Route = createFileRoute("/curator")({
  beforeLoad: () => {
    if (!import.meta.env.DEV) {
      throw notFound();
    }
  },
  component: CuratorShell,
});
