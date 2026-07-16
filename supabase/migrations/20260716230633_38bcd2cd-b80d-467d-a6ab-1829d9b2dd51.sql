
-- 1. studio_preferences: explicit self-only DELETE policy
CREATE POLICY "prefs: self delete"
  ON public.studio_preferences
  FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- 2. user_roles: explicit deny for direct INSERT/UPDATE/DELETE.
-- All role changes must go through assign_role / revoke_role SECURITY DEFINER RPCs.
CREATE POLICY "user_roles: no direct insert"
  ON public.user_roles
  FOR INSERT
  TO authenticated
  WITH CHECK (false);

CREATE POLICY "user_roles: no direct update"
  ON public.user_roles
  FOR UPDATE
  TO authenticated
  USING (false)
  WITH CHECK (false);

CREATE POLICY "user_roles: no direct delete"
  ON public.user_roles
  FOR DELETE
  TO authenticated
  USING (false);

-- 3. Lock down SECURITY DEFINER functions.
-- Internal helpers used only by RLS policies / triggers / other SECURITY DEFINER fns:
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.has_any_studio_role(uuid) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.is_studio_admin(uuid) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.log_audit_event(text, text, text, text, jsonb, jsonb, jsonb) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;

-- Functions intentionally callable by signed-in users (they self-authorize inside):
REVOKE ALL ON FUNCTION public.get_my_studio_roles() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_my_studio_roles() TO authenticated;

REVOKE ALL ON FUNCTION public.update_my_profile(text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.update_my_profile(text, text) TO authenticated;

REVOKE ALL ON FUNCTION public.assign_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.assign_role(uuid, public.app_role) TO authenticated;

REVOKE ALL ON FUNCTION public.revoke_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.revoke_role(uuid, public.app_role) TO authenticated;
