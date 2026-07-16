
-- ============================================================
-- DZ Odyssey Studio — Phase 2A: auth, roles, RLS, audit
-- ============================================================

-- 1) Role enum ------------------------------------------------
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM (
    'museum_director',
    'senior_curator',
    'curator',
    'researcher',
    'fact_checker',
    'translator',
    'translation_reviewer',
    'media_curator',
    'rights_manager',
    'accessibility_reviewer',
    'educator',
    'publisher',
    'technical_administrator'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- 2) profiles -------------------------------------------------
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text,
  preferred_language text NOT NULL DEFAULT 'en',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3) user_roles -----------------------------------------------
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  assigned_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  assigned_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
-- Only SELECT for authenticated; writes go through SECURITY DEFINER RPCs.
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 4) studio_preferences ---------------------------------------
CREATE TABLE public.studio_preferences (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  theme text NOT NULL DEFAULT 'parchment',
  sidebar_collapsed boolean NOT NULL DEFAULT false,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.studio_preferences TO authenticated;
GRANT ALL ON public.studio_preferences TO service_role;
ALTER TABLE public.studio_preferences ENABLE ROW LEVEL SECURITY;

-- 5) audit_log ------------------------------------------------
CREATE TABLE public.audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  actor_email_snapshot text,
  action text NOT NULL,
  entity_type text,
  entity_id text,
  entity_label text,
  before_summary jsonb,
  after_summary jsonb,
  metadata jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
-- SELECT only; inserts go through SECURITY DEFINER helpers.
GRANT SELECT ON public.audit_log TO authenticated;
GRANT ALL ON public.audit_log TO service_role;
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

CREATE INDEX audit_log_created_at_idx ON public.audit_log(created_at DESC);
CREATE INDEX audit_log_actor_idx ON public.audit_log(actor_user_id);
CREATE INDEX audit_log_action_idx ON public.audit_log(action);

-- ============================================================
-- 6) Security-definer helpers
-- ============================================================

-- has_role: caller-agnostic reader used by RLS. Marked SECURITY DEFINER
-- with a hardened search_path so it cannot be shadowed and cannot recurse
-- through user_roles RLS.
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  );
$$;
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;

CREATE OR REPLACE FUNCTION public.has_any_studio_role(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id);
$$;
REVOKE ALL ON FUNCTION public.has_any_studio_role(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_any_studio_role(uuid) TO authenticated, service_role;

CREATE OR REPLACE FUNCTION public.is_studio_admin(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id
      AND role IN ('museum_director'::public.app_role, 'technical_administrator'::public.app_role)
  );
$$;
REVOKE ALL ON FUNCTION public.is_studio_admin(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_studio_admin(uuid) TO authenticated, service_role;

-- get_studio_roles: returns the caller's own roles. Uses auth.uid() only.
CREATE OR REPLACE FUNCTION public.get_my_studio_roles()
RETURNS SETOF public.app_role
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
  SELECT role FROM public.user_roles WHERE user_id = auth.uid();
$$;
REVOKE ALL ON FUNCTION public.get_my_studio_roles() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_my_studio_roles() TO authenticated, service_role;

-- Internal audit writer. NOT exposed to clients.
CREATE OR REPLACE FUNCTION public.log_audit_event(
  _action text,
  _entity_type text,
  _entity_id text,
  _entity_label text,
  _before jsonb,
  _after jsonb,
  _metadata jsonb
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  new_id uuid;
  actor uuid := auth.uid();
  actor_email text;
BEGIN
  IF actor IS NULL THEN
    RAISE EXCEPTION 'log_audit_event requires an authenticated caller';
  END IF;
  SELECT email INTO actor_email FROM auth.users WHERE id = actor;
  INSERT INTO public.audit_log(
    actor_user_id, actor_email_snapshot, action,
    entity_type, entity_id, entity_label,
    before_summary, after_summary, metadata
  ) VALUES (
    actor, actor_email, _action,
    _entity_type, _entity_id, _entity_label,
    _before, _after, _metadata
  ) RETURNING id INTO new_id;
  RETURN new_id;
END;
$$;
REVOKE ALL ON FUNCTION public.log_audit_event(text, text, text, text, jsonb, jsonb, jsonb)
  FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.log_audit_event(text, text, text, text, jsonb, jsonb, jsonb)
  TO service_role;

-- assign_role: caller must be an active Studio admin. Writes audit in the
-- same transaction as the role change.
CREATE OR REPLACE FUNCTION public.assign_role(_target_user uuid, _role public.app_role)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  caller uuid := auth.uid();
  caller_email text;
  target_email text;
BEGIN
  IF caller IS NULL THEN
    RAISE EXCEPTION 'Authentication required' USING ERRCODE = '42501';
  END IF;
  IF NOT public.is_studio_admin(caller) THEN
    RAISE EXCEPTION 'Not authorized to assign roles' USING ERRCODE = '42501';
  END IF;

  INSERT INTO public.user_roles(user_id, role, assigned_by)
  VALUES (_target_user, _role, caller)
  ON CONFLICT (user_id, role) DO NOTHING;

  SELECT email INTO caller_email FROM auth.users WHERE id = caller;
  SELECT email INTO target_email FROM auth.users WHERE id = _target_user;

  INSERT INTO public.audit_log(
    actor_user_id, actor_email_snapshot, action,
    entity_type, entity_id, entity_label,
    after_summary
  ) VALUES (
    caller, caller_email, 'role.assign',
    'user_role', _target_user::text, target_email,
    jsonb_build_object('role', _role)
  );
END;
$$;
REVOKE ALL ON FUNCTION public.assign_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.assign_role(uuid, public.app_role) TO authenticated;

-- revoke_role: same authorization, plus continuity guard preventing loss
-- of the last active museum_director/technical_administrator.
CREATE OR REPLACE FUNCTION public.revoke_role(_target_user uuid, _role public.app_role)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  caller uuid := auth.uid();
  caller_email text;
  target_email text;
  remaining_admins int;
BEGIN
  IF caller IS NULL THEN
    RAISE EXCEPTION 'Authentication required' USING ERRCODE = '42501';
  END IF;
  IF NOT public.is_studio_admin(caller) THEN
    RAISE EXCEPTION 'Not authorized to revoke roles' USING ERRCODE = '42501';
  END IF;

  -- Continuity guard: if this is a museum_director or technical_administrator
  -- revocation, ensure at least one *other* active admin will remain.
  IF _role IN ('museum_director'::public.app_role, 'technical_administrator'::public.app_role) THEN
    SELECT COUNT(DISTINCT user_id) INTO remaining_admins
    FROM public.user_roles
    WHERE role IN ('museum_director'::public.app_role, 'technical_administrator'::public.app_role)
      AND NOT (user_id = _target_user AND role = _role);
    IF remaining_admins < 1 THEN
      RAISE EXCEPTION 'Cannot remove the last remaining Studio administrator'
        USING ERRCODE = '23514';
    END IF;
  END IF;

  DELETE FROM public.user_roles
  WHERE user_id = _target_user AND role = _role;

  SELECT email INTO caller_email FROM auth.users WHERE id = caller;
  SELECT email INTO target_email FROM auth.users WHERE id = _target_user;

  INSERT INTO public.audit_log(
    actor_user_id, actor_email_snapshot, action,
    entity_type, entity_id, entity_label,
    before_summary
  ) VALUES (
    caller, caller_email, 'role.revoke',
    'user_role', _target_user::text, target_email,
    jsonb_build_object('role', _role)
  );
END;
$$;
REVOKE ALL ON FUNCTION public.revoke_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.revoke_role(uuid, public.app_role) TO authenticated;

-- update_my_profile: narrow, Zod-mirrored update surface (display_name +
-- preferred_language only). Roles/id/timestamps cannot be touched.
CREATE OR REPLACE FUNCTION public.update_my_profile(
  _display_name text,
  _preferred_language text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  caller uuid := auth.uid();
  before_row public.profiles;
BEGIN
  IF caller IS NULL THEN
    RAISE EXCEPTION 'Authentication required' USING ERRCODE = '42501';
  END IF;
  IF _preferred_language IS NULL
    OR _preferred_language NOT IN ('en', 'fr', 'ar') THEN
    RAISE EXCEPTION 'Invalid preferred_language';
  END IF;
  IF _display_name IS NOT NULL AND length(_display_name) > 120 THEN
    RAISE EXCEPTION 'display_name too long';
  END IF;

  SELECT * INTO before_row FROM public.profiles WHERE id = caller;

  INSERT INTO public.profiles(id, display_name, preferred_language)
  VALUES (caller, _display_name, _preferred_language)
  ON CONFLICT (id) DO UPDATE
    SET display_name = EXCLUDED.display_name,
        preferred_language = EXCLUDED.preferred_language,
        updated_at = now();

  INSERT INTO public.audit_log(
    actor_user_id, action, entity_type, entity_id,
    before_summary, after_summary
  ) VALUES (
    caller, 'profile.update', 'profile', caller::text,
    to_jsonb(before_row),
    jsonb_build_object('display_name', _display_name, 'preferred_language', _preferred_language)
  );
END;
$$;
REVOKE ALL ON FUNCTION public.update_my_profile(text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.update_my_profile(text, text) TO authenticated;

-- ============================================================
-- 7) Profile bootstrap trigger
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  INSERT INTO public.profiles(id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)));
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- 8) RLS policies
-- ============================================================

-- profiles
CREATE POLICY "profiles: read own"
  ON public.profiles FOR SELECT TO authenticated
  USING (id = auth.uid());
CREATE POLICY "profiles: admins read all"
  ON public.profiles FOR SELECT TO authenticated
  USING (public.is_studio_admin(auth.uid()));
-- No direct UPDATE policy: updates go through update_my_profile().
-- We still allow a limited self-update policy for the RPC-less path in
-- Phase 2B; keep it locked here.
CREATE POLICY "profiles: no direct update"
  ON public.profiles FOR UPDATE TO authenticated
  USING (false) WITH CHECK (false);

-- user_roles
CREATE POLICY "user_roles: read own"
  ON public.user_roles FOR SELECT TO authenticated
  USING (user_id = auth.uid());
CREATE POLICY "user_roles: admins read all"
  ON public.user_roles FOR SELECT TO authenticated
  USING (public.is_studio_admin(auth.uid()));
-- No INSERT/UPDATE/DELETE policies: mutations must go through
-- assign_role() / revoke_role() SECURITY DEFINER functions.

-- studio_preferences
CREATE POLICY "prefs: self select"
  ON public.studio_preferences FOR SELECT TO authenticated
  USING (user_id = auth.uid());
CREATE POLICY "prefs: self upsert"
  ON public.studio_preferences FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());
CREATE POLICY "prefs: self update"
  ON public.studio_preferences FOR UPDATE TO authenticated
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- audit_log: governance-only SELECT; no client writes.
CREATE POLICY "audit: governance read"
  ON public.audit_log FOR SELECT TO authenticated
  USING (
    public.has_role(auth.uid(), 'museum_director'::public.app_role)
    OR public.has_role(auth.uid(), 'senior_curator'::public.app_role)
    OR public.has_role(auth.uid(), 'technical_administrator'::public.app_role)
  );
