/**
 * DZ Odyssey Studio — first-user bootstrap.
 *
 * Public signup is disabled at the Auth layer. The only way to create an
 * account is:
 *   1. This bootstrap flow, which is available ONLY while `auth.users` is
 *      empty and creates the very first account (with NO role assigned).
 *   2. Subsequent accounts are provisioned by a Museum Director /
 *      Technical Administrator (out-of-band for Phase 2A; a proper invite
 *      workflow is Phase 2B).
 *
 * The first-user account intentionally receives NO Studio role. After it
 * exists, a workspace operator runs the documented SQL from
 * `docs/STUDIO_ADMIN_BOOTSTRAP.md` to grant `museum_director`.
 */

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const getStudioBootstrapStatus = createServerFn({ method: "GET" }).handler(
  async () => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    // perPage=1 minimises payload; we only need the total count.
    const { data, error } = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 1 });
    if (error) throw new Error("Unable to read bootstrap status");
    const total = (data as { total?: number; users?: unknown[] })?.total
      ?? (data as { users?: unknown[] })?.users?.length
      ?? 0;
    return { needsBootstrap: total === 0 };
  },
);

const createFirstAdminSchema = z.object({
  email: z.string().trim().email().max(255),
  password: z.string().min(12).max(128),
});

export const createFirstAdminAccount = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => createFirstAdminSchema.parse(d))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    // Re-check server-side: refuse if any user already exists.
    const { data: list, error: listErr } = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 1 });
    if (listErr) throw new Error("Unable to verify bootstrap state");
    const total = (list as { total?: number; users?: unknown[] })?.total
      ?? (list as { users?: unknown[] })?.users?.length
      ?? 0;
    if (total > 0) {
      throw new Error("Bootstrap is closed: an account already exists. Contact a Museum Director for access.");
    }
    const { error } = await supabaseAdmin.auth.admin.createUser({
      email: data.email,
      password: data.password,
      email_confirm: true, // first-admin: skip email verification round-trip
    });
    if (error) throw new Error(error.message);
    // NOTE: intentionally NO role assignment. Role must be granted via the
    // documented SQL bootstrap procedure.
    return { ok: true };
  });
