/**
 * /curator — layout route.
 *
 * Phase-1 review: the portal is read-only and renders on every deployment
 * so reviewers can access it without authentication. All host, DEV, token,
 * and sessionStorage gates have been removed intentionally.
 *
 * Protections preserved elsewhere:
 *  - No /curator links in public navigation.
 *  - Every editing / upload / delete / publish / role action stays disabled.
 *  - No secrets, credentials, private user data, or unpublished licensed media.
 *
 * Phase 2 will replace this with Lovable Cloud auth + a `curator` role
 * checked server-side via `requireSupabaseAuth`.
 */

import { createFileRoute } from "@tanstack/react-router";
import { CuratorShell } from "@/components/curator-portal/CuratorShell";

export const Route = createFileRoute("/curator")({
  component: CuratorShell,
});
