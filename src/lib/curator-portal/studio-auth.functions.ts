/**
 * DZ Odyssey Studio — authenticated server functions.
 *
 * Every function below independently authorizes the caller. Never trust
 * `actor_user_id` from the client — always derive from `context.userId`
 * / `auth.uid()` inside SECURITY DEFINER RPCs.
 */

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { AppRole } from "./permissions";
import { ALL_ROLES, ROUTE_PERMISSIONS, roleIntersects } from "./permissions";

const roleSchema = z.enum(ALL_ROLES as [AppRole, ...AppRole[]]);

// ---------- Session ----------------------------------------------------

export const getStudioSession = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase.rpc("get_my_studio_roles");
    if (error) throw new Error("Failed to read Studio roles");
    const roles = (data ?? []).map((r: { role?: AppRole } | AppRole) =>
      typeof r === "string" ? r : (r as { role: AppRole }).role,
    ) as AppRole[];
    // profile is best-effort — do not fail the whole session on it.
    const { data: profile } = await context.supabase
      .from("profiles")
      .select("display_name, preferred_language")
      .eq("id", context.userId)
      .maybeSingle();
    return {
      userId: context.userId as string,
      email: (context.claims?.email as string | undefined) ?? null,
      roles,
      displayName: profile?.display_name ?? null,
      preferredLanguage: profile?.preferred_language ?? "en",
    };
  });

async function assertRoles(
  supabase: ReturnType<typeof requireSupabaseAuth extends never ? never : any>,
  userId: string,
  allowed: AppRole[],
) {
  const { data, error } = await supabase.rpc("get_my_studio_roles");
  if (error) throw new Error("Not authorized");
  const roles = ((data ?? []) as Array<{ role: AppRole } | AppRole>).map((r) =>
    typeof r === "string" ? r : r.role,
  ) as AppRole[];
  if (!roleIntersects(roles, allowed)) throw new Error("Not authorized");
  return { roles, userId };
}

// ---------- Profile ----------------------------------------------------

const profileSchema = z.object({
  display_name: z.string().trim().min(1).max(120).nullable(),
  preferred_language: z.enum(["en", "fr", "ar"]),
});

export const updateMyProfile = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => profileSchema.parse(data))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.rpc("update_my_profile", {
      _display_name: data.display_name,
      _preferred_language: data.preferred_language,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ---------- Preferences ------------------------------------------------

const prefsSchema = z.object({
  theme: z.enum(["parchment", "night"]).default("parchment"),
  sidebar_collapsed: z.boolean().default(false),
});

export const updateMyPreferences = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => prefsSchema.parse(data))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("studio_preferences")
      .upsert({
        user_id: context.userId,
        theme: data.theme,
        sidebar_collapsed: data.sidebar_collapsed,
        updated_at: new Date().toISOString(),
      });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ---------- Team (admin) -----------------------------------------------

export const listTeam = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    // Independent server-side authorization — do NOT trust the layout.
    await assertRoles(context.supabase, context.userId, [
      "museum_director",
      "technical_administrator",
    ]);
    const { data: profiles, error: pErr } = await context.supabase
      .from("profiles")
      .select("id, display_name, preferred_language, created_at, updated_at")
      .order("created_at", { ascending: true });
    if (pErr) throw new Error(pErr.message);
    const { data: roles, error: rErr } = await context.supabase
      .from("user_roles")
      .select("user_id, role, assigned_at");
    if (rErr) throw new Error(rErr.message);
    const rolesByUser = new Map<string, { role: AppRole; assigned_at: string }[]>();
    for (const r of roles ?? []) {
      const list = rolesByUser.get(r.user_id) ?? [];
      list.push({ role: r.role as AppRole, assigned_at: r.assigned_at });
      rolesByUser.set(r.user_id, list);
    }
    return (profiles ?? []).map((p) => ({
      id: p.id,
      display_name: p.display_name,
      created_at: p.created_at,
      updated_at: p.updated_at,
      roles: rolesByUser.get(p.id) ?? [],
    }));
  });

const assignSchema = z.object({
  target_user_id: z.string().uuid(),
  role: roleSchema,
});

export const assignRole = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => assignSchema.parse(d))
  .handler(async ({ data, context }) => {
    // The RPC itself re-verifies with auth.uid() + is_studio_admin,
    // so this is defense in depth, not the security boundary.
    const { error } = await context.supabase.rpc("assign_role", {
      _target_user: data.target_user_id,
      _role: data.role,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const revokeRole = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => assignSchema.parse(d))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.rpc("revoke_role", {
      _target_user: data.target_user_id,
      _role: data.role,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ---------- Audit log --------------------------------------------------

const auditQuerySchema = z.object({
  action: z.string().max(120).optional(),
  actor_user_id: z.string().uuid().optional(),
  entity_type: z.string().max(120).optional(),
  from: z.string().datetime().optional(),
  to: z.string().datetime().optional(),
  limit: z.number().int().min(1).max(200).default(50),
});

export const listAuditLog = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => auditQuerySchema.parse(d ?? {}))
  .handler(async ({ data, context }) => {
    await assertRoles(context.supabase, context.userId, [
      "museum_director",
      "senior_curator",
      "technical_administrator",
    ]);
    let q = context.supabase
      .from("audit_log")
      .select("id, actor_user_id, actor_email_snapshot, action, entity_type, entity_id, entity_label, before_summary, after_summary, metadata, created_at")
      .order("created_at", { ascending: false })
      .limit(data.limit);
    if (data.action) q = q.eq("action", data.action);
    if (data.actor_user_id) q = q.eq("actor_user_id", data.actor_user_id);
    if (data.entity_type) q = q.eq("entity_type", data.entity_type);
    if (data.from) q = q.gte("created_at", data.from);
    if (data.to) q = q.lte("created_at", data.to);
    const { data: rows, error } = await q;
    if (error) throw new Error(error.message);
    return rows ?? [];
  });

export const canAccess = (pathname: string, roles: AppRole[]) => {
  const allowed = ROUTE_PERMISSIONS[pathname];
  if (!allowed) return roles.length > 0;
  return roleIntersects(roles, allowed);
};
