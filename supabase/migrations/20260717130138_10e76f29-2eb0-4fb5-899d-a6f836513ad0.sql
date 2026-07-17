
-- ============================================================
-- Phase 2B Step 2: Historical Figure Drafts + Research cleanup
-- ============================================================

-- ---------- Part A: harden existing source functions ----------
-- Standardise search_path and fully schema-qualify. Also fix
-- link_source_to_content to be idempotent (no duplicate audit event
-- when the link already exists).

CREATE OR REPLACE FUNCTION public.can_write_sources(_uid uuid)
 RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER
 SET search_path = public, pg_temp
AS $function$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _uid
      AND role IN (
        'museum_director'::public.app_role,
        'senior_curator'::public.app_role,
        'curator'::public.app_role,
        'researcher'::public.app_role,
        'fact_checker'::public.app_role
      )
  );
$function$;

CREATE OR REPLACE FUNCTION public.can_archive_sources(_uid uuid)
 RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER
 SET search_path = public, pg_temp
AS $function$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _uid
      AND role IN (
        'museum_director'::public.app_role,
        'senior_curator'::public.app_role,
        'curator'::public.app_role
      )
  );
$function$;

CREATE OR REPLACE FUNCTION public.can_verify_sources(_uid uuid)
 RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER
 SET search_path = public, pg_temp
AS $function$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _uid
      AND role IN (
        'museum_director'::public.app_role,
        'senior_curator'::public.app_role,
        'fact_checker'::public.app_role
      )
  );
$function$;

-- Recreate create_source / update_source / archive / restore / verify with
-- hardened search_path (they already reference public.*; make it explicit).

CREATE OR REPLACE FUNCTION public.create_source(_payload jsonb)
 RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER
 SET search_path = public, pg_temp
AS $function$
DECLARE
  caller uuid := auth.uid();
  new_row public.source_records;
BEGIN
  IF caller IS NULL THEN RAISE EXCEPTION 'Authentication required' USING ERRCODE='42501'; END IF;
  IF NOT public.can_write_sources(caller) THEN
    RAISE EXCEPTION 'Not authorized to create sources' USING ERRCODE='42501';
  END IF;
  INSERT INTO public.source_records (
    title, author, publisher, publication_date, publication_year,
    source_type, language, url, isbn, archive_or_institution, identifier,
    accessed_date, verification_date, reliability_tier, rights_status,
    citation_text, notes, status, created_by, updated_by
  ) VALUES (
    NULLIF(trim(_payload->>'title'),''),
    NULLIF(_payload->>'author',''),
    NULLIF(_payload->>'publisher',''),
    NULLIF(_payload->>'publication_date','')::date,
    NULLIF(_payload->>'publication_year','')::int,
    COALESCE((_payload->>'source_type')::public.source_type,'other'),
    NULLIF(_payload->>'language',''),
    NULLIF(_payload->>'url',''),
    NULLIF(_payload->>'isbn',''),
    NULLIF(_payload->>'archive_or_institution',''),
    NULLIF(_payload->>'identifier',''),
    NULLIF(_payload->>'accessed_date','')::date,
    NULLIF(_payload->>'verification_date','')::date,
    COALESCE((_payload->>'reliability_tier')::public.reliability_tier,'unverified'),
    COALESCE((_payload->>'rights_status')::public.rights_status,'unknown'),
    NULLIF(_payload->>'citation_text',''),
    NULLIF(_payload->>'notes',''),
    'draft'::public.source_status,
    caller, caller
  ) RETURNING * INTO new_row;
  PERFORM public.log_audit_event(
    'source.create','source_record', new_row.id::text, new_row.title,
    NULL, to_jsonb(new_row), NULL
  );
  RETURN new_row.id;
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_source(_id uuid, _payload jsonb)
 RETURNS void LANGUAGE plpgsql SECURITY DEFINER
 SET search_path = public, pg_temp
AS $function$
DECLARE
  caller uuid := auth.uid();
  before_row public.source_records;
  after_row public.source_records;
BEGIN
  IF caller IS NULL THEN RAISE EXCEPTION 'Authentication required' USING ERRCODE='42501'; END IF;
  IF NOT public.can_write_sources(caller) THEN
    RAISE EXCEPTION 'Not authorized to edit sources' USING ERRCODE='42501';
  END IF;
  SELECT * INTO before_row FROM public.source_records WHERE id = _id;
  IF before_row.id IS NULL THEN RAISE EXCEPTION 'Source not found' USING ERRCODE='P0002'; END IF;
  IF before_row.status = 'archived' THEN
    RAISE EXCEPTION 'Restore the source before editing' USING ERRCODE='22023';
  END IF;
  UPDATE public.source_records SET
    title                  = COALESCE(NULLIF(trim(_payload->>'title'),''), title),
    author                 = CASE WHEN _payload ? 'author' THEN NULLIF(_payload->>'author','') ELSE author END,
    publisher              = CASE WHEN _payload ? 'publisher' THEN NULLIF(_payload->>'publisher','') ELSE publisher END,
    publication_date       = CASE WHEN _payload ? 'publication_date' THEN NULLIF(_payload->>'publication_date','')::date ELSE publication_date END,
    publication_year       = CASE WHEN _payload ? 'publication_year' THEN NULLIF(_payload->>'publication_year','')::int ELSE publication_year END,
    source_type            = CASE WHEN _payload ? 'source_type' THEN (_payload->>'source_type')::public.source_type ELSE source_type END,
    language               = CASE WHEN _payload ? 'language' THEN NULLIF(_payload->>'language','') ELSE language END,
    url                    = CASE WHEN _payload ? 'url' THEN NULLIF(_payload->>'url','') ELSE url END,
    isbn                   = CASE WHEN _payload ? 'isbn' THEN NULLIF(_payload->>'isbn','') ELSE isbn END,
    archive_or_institution = CASE WHEN _payload ? 'archive_or_institution' THEN NULLIF(_payload->>'archive_or_institution','') ELSE archive_or_institution END,
    identifier             = CASE WHEN _payload ? 'identifier' THEN NULLIF(_payload->>'identifier','') ELSE identifier END,
    accessed_date          = CASE WHEN _payload ? 'accessed_date' THEN NULLIF(_payload->>'accessed_date','')::date ELSE accessed_date END,
    reliability_tier       = CASE WHEN _payload ? 'reliability_tier' THEN (_payload->>'reliability_tier')::public.reliability_tier ELSE reliability_tier END,
    rights_status          = CASE WHEN _payload ? 'rights_status' THEN (_payload->>'rights_status')::public.rights_status ELSE rights_status END,
    citation_text          = CASE WHEN _payload ? 'citation_text' THEN NULLIF(_payload->>'citation_text','') ELSE citation_text END,
    notes                  = CASE WHEN _payload ? 'notes' THEN NULLIF(_payload->>'notes','') ELSE notes END,
    updated_by             = caller
  WHERE id = _id
  RETURNING * INTO after_row;
  PERFORM public.log_audit_event(
    'source.update','source_record', _id::text, after_row.title,
    to_jsonb(before_row), to_jsonb(after_row), NULL
  );
END;
$function$;

CREATE OR REPLACE FUNCTION public.archive_source(_id uuid)
 RETURNS void LANGUAGE plpgsql SECURITY DEFINER
 SET search_path = public, pg_temp
AS $function$
DECLARE caller uuid := auth.uid(); before_row public.source_records;
BEGIN
  IF caller IS NULL THEN RAISE EXCEPTION 'Authentication required' USING ERRCODE='42501'; END IF;
  IF NOT public.can_archive_sources(caller) THEN
    RAISE EXCEPTION 'Not authorized to archive sources' USING ERRCODE='42501';
  END IF;
  SELECT * INTO before_row FROM public.source_records WHERE id = _id;
  IF before_row.id IS NULL THEN RAISE EXCEPTION 'Source not found' USING ERRCODE='P0002'; END IF;
  IF before_row.status = 'archived' THEN RETURN; END IF;
  UPDATE public.source_records SET status='archived', archived_at=now(), updated_by=caller WHERE id=_id;
  PERFORM public.log_audit_event('source.archive','source_record',_id::text,before_row.title,
    jsonb_build_object('status',before_row.status), jsonb_build_object('status','archived'), NULL);
END;
$function$;

CREATE OR REPLACE FUNCTION public.restore_source(_id uuid)
 RETURNS void LANGUAGE plpgsql SECURITY DEFINER
 SET search_path = public, pg_temp
AS $function$
DECLARE caller uuid := auth.uid(); before_row public.source_records;
BEGIN
  IF caller IS NULL THEN RAISE EXCEPTION 'Authentication required' USING ERRCODE='42501'; END IF;
  IF NOT public.can_archive_sources(caller) THEN
    RAISE EXCEPTION 'Not authorized to restore sources' USING ERRCODE='42501';
  END IF;
  SELECT * INTO before_row FROM public.source_records WHERE id = _id;
  IF before_row.id IS NULL THEN RAISE EXCEPTION 'Source not found' USING ERRCODE='P0002'; END IF;
  IF before_row.status <> 'archived' THEN RETURN; END IF;
  UPDATE public.source_records SET status='draft', archived_at=NULL, updated_by=caller WHERE id=_id;
  PERFORM public.log_audit_event('source.restore','source_record',_id::text,before_row.title,
    jsonb_build_object('status','archived'), jsonb_build_object('status','draft'), NULL);
END;
$function$;

CREATE OR REPLACE FUNCTION public.set_source_verification(_id uuid, _verified boolean, _verification_date date)
 RETURNS void LANGUAGE plpgsql SECURITY DEFINER
 SET search_path = public, pg_temp
AS $function$
DECLARE
  caller uuid := auth.uid();
  before_row public.source_records;
  new_status public.source_status;
  new_date date;
BEGIN
  IF caller IS NULL THEN RAISE EXCEPTION 'Authentication required' USING ERRCODE='42501'; END IF;
  IF NOT public.can_verify_sources(caller) THEN
    RAISE EXCEPTION 'Not authorized to change verification status' USING ERRCODE='42501';
  END IF;
  SELECT * INTO before_row FROM public.source_records WHERE id = _id;
  IF before_row.id IS NULL THEN RAISE EXCEPTION 'Source not found' USING ERRCODE='P0002'; END IF;
  IF before_row.status = 'archived' THEN
    RAISE EXCEPTION 'Cannot change verification on an archived source' USING ERRCODE='22023';
  END IF;
  IF _verified THEN
    new_status := 'verified'::public.source_status;
    new_date := COALESCE(_verification_date, CURRENT_DATE);
  ELSE
    new_status := 'draft'::public.source_status;
    new_date := NULL;
  END IF;
  UPDATE public.source_records
    SET status=new_status, verification_date=new_date, updated_by=caller
    WHERE id=_id;
  PERFORM public.log_audit_event('source.verification','source_record',_id::text,before_row.title,
    jsonb_build_object('status',before_row.status,'verification_date',before_row.verification_date),
    jsonb_build_object('status',new_status,'verification_date',new_date), NULL);
END;
$function$;

-- link_source_to_content: idempotent (returns existing link id, no audit
-- when the link already existed). No duplicate-key error is raised.
CREATE OR REPLACE FUNCTION public.link_source_to_content(
  _source_id uuid, _content_type text, _content_id text, _content_label text,
  _public_route text, _relationship_note text
) RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER
  SET search_path = public, pg_temp
AS $function$
DECLARE
  caller uuid := auth.uid();
  new_id uuid;
  existing_id uuid;
  src public.source_records;
BEGIN
  IF caller IS NULL THEN RAISE EXCEPTION 'Authentication required' USING ERRCODE='42501'; END IF;
  IF NOT public.can_write_sources(caller) THEN
    RAISE EXCEPTION 'Not authorized to link sources' USING ERRCODE='42501';
  END IF;
  SELECT * INTO src FROM public.source_records WHERE id = _source_id;
  IF src.id IS NULL THEN RAISE EXCEPTION 'Source not found' USING ERRCODE='P0002'; END IF;

  SELECT id INTO existing_id FROM public.source_links
    WHERE source_id=_source_id AND content_type=_content_type AND content_id=_content_id;
  IF existing_id IS NOT NULL THEN
    RETURN existing_id;   -- idempotent, no audit, no duplicate row
  END IF;

  INSERT INTO public.source_links(
    source_id, content_type, content_id, content_label, public_route, relationship_note, created_by
  ) VALUES (
    _source_id, _content_type, _content_id, _content_label,
    NULLIF(_public_route,''), NULLIF(_relationship_note,''), caller
  ) RETURNING id INTO new_id;

  PERFORM public.log_audit_event('source.link','source_record',_source_id::text,src.title, NULL,
    jsonb_build_object('content_type',_content_type,'content_id',_content_id,'content_label',_content_label),
    NULL);
  RETURN new_id;
END;
$function$;

CREATE OR REPLACE FUNCTION public.unlink_source_from_content(_link_id uuid)
 RETURNS void LANGUAGE plpgsql SECURITY DEFINER
 SET search_path = public, pg_temp
AS $function$
DECLARE
  caller uuid := auth.uid();
  lnk public.source_links;
  src public.source_records;
BEGIN
  IF caller IS NULL THEN RAISE EXCEPTION 'Authentication required' USING ERRCODE='42501'; END IF;
  IF NOT public.can_write_sources(caller) THEN
    RAISE EXCEPTION 'Not authorized to unlink sources' USING ERRCODE='42501';
  END IF;
  SELECT * INTO lnk FROM public.source_links WHERE id=_link_id;
  IF lnk.id IS NULL THEN RETURN; END IF;
  SELECT * INTO src FROM public.source_records WHERE id=lnk.source_id;
  DELETE FROM public.source_links WHERE id=_link_id;
  PERFORM public.log_audit_event('source.unlink','source_record', lnk.source_id::text,
    COALESCE(src.title, lnk.content_label),
    jsonb_build_object('content_type',lnk.content_type,'content_id',lnk.content_id,'content_label',lnk.content_label),
    NULL, NULL);
END;
$function$;

-- Keep grants tight (already revoked from anon in earlier hardening — reassert)
REVOKE ALL ON FUNCTION public.create_source(jsonb) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.update_source(uuid, jsonb) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.archive_source(uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.restore_source(uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.set_source_verification(uuid, boolean, date) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.link_source_to_content(uuid, text, text, text, text, text) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.unlink_source_from_content(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.create_source(jsonb) TO authenticated;
GRANT EXECUTE ON FUNCTION public.update_source(uuid, jsonb) TO authenticated;
GRANT EXECUTE ON FUNCTION public.archive_source(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.restore_source(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.set_source_verification(uuid, boolean, date) TO authenticated;
GRANT EXECUTE ON FUNCTION public.link_source_to_content(uuid, text, text, text, text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.unlink_source_from_content(uuid) TO authenticated;

-- ---------- Part B: Figure Drafts core ----------

CREATE TYPE public.figure_draft_status AS ENUM (
  'draft', 'research_review', 'fact_check', 'translation_review',
  'curator_review', 'approved', 'changes_requested', 'archived'
);

CREATE TABLE public.figure_drafts (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  public_figure_id    text,
  slug                text NOT NULL,
  name_en             text NOT NULL,
  name_fr             text,
  name_ar             text,
  subtitle_en         text,
  subtitle_fr         text,
  subtitle_ar         text,
  summary_en          text,
  summary_fr          text,
  summary_ar          text,
  biography_en        text,
  biography_fr        text,
  biography_ar        text,
  birth_year          integer,
  death_year          integer,
  birth_date_text     text,
  death_date_text     text,
  birthplace_text_en  text,
  birthplace_text_fr  text,
  birthplace_text_ar  text,
  status              public.figure_draft_status NOT NULL DEFAULT 'draft',
  review_note         text,
  created_by          uuid NOT NULL,
  updated_by          uuid NOT NULL,
  submitted_by        uuid,
  submitted_at        timestamptz,
  approved_by         uuid,
  approved_at         timestamptz,
  archived_at         timestamptz,
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT figure_drafts_slug_format CHECK (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  CONSTRAINT figure_drafts_name_en_len CHECK (length(name_en) BETWEEN 1 AND 200),
  CONSTRAINT figure_drafts_lifespan   CHECK (death_year IS NULL OR birth_year IS NULL OR death_year >= birth_year),
  CONSTRAINT figure_drafts_approved_meta CHECK (
    status <> 'approved' OR (approved_by IS NOT NULL AND approved_at IS NOT NULL)
  )
);

-- Unique slug among non-archived drafts
CREATE UNIQUE INDEX figure_drafts_slug_active_uidx
  ON public.figure_drafts (slug) WHERE status <> 'archived';

CREATE INDEX figure_drafts_status_idx ON public.figure_drafts (status);
CREATE INDEX figure_drafts_updated_at_idx ON public.figure_drafts (updated_at DESC);

GRANT SELECT ON public.figure_drafts TO authenticated;
GRANT ALL ON public.figure_drafts TO service_role;
ALTER TABLE public.figure_drafts ENABLE ROW LEVEL SECURITY;

-- Any Studio role can read; nobody can write directly (RPCs only).
CREATE POLICY "Studio can read drafts" ON public.figure_drafts FOR SELECT
  TO authenticated USING (public.has_any_studio_role(auth.uid()));

CREATE POLICY "No direct insert on figure_drafts" ON public.figure_drafts
  FOR INSERT TO authenticated WITH CHECK (false);
CREATE POLICY "No direct update on figure_drafts" ON public.figure_drafts
  FOR UPDATE TO authenticated USING (false) WITH CHECK (false);
CREATE POLICY "No direct delete on figure_drafts" ON public.figure_drafts
  FOR DELETE TO authenticated USING (false);

-- Revisions
CREATE TABLE public.figure_draft_revisions (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  figure_draft_id   uuid NOT NULL REFERENCES public.figure_drafts(id) ON DELETE CASCADE,
  revision_number   integer NOT NULL,
  snapshot          jsonb NOT NULL,
  changed_by        uuid NOT NULL,
  change_summary    text,
  created_at        timestamptz NOT NULL DEFAULT now(),
  UNIQUE (figure_draft_id, revision_number)
);
CREATE INDEX figure_draft_revisions_draft_idx
  ON public.figure_draft_revisions (figure_draft_id, revision_number DESC);
GRANT SELECT ON public.figure_draft_revisions TO authenticated;
GRANT ALL ON public.figure_draft_revisions TO service_role;
ALTER TABLE public.figure_draft_revisions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Studio can read revisions" ON public.figure_draft_revisions FOR SELECT
  TO authenticated USING (public.has_any_studio_role(auth.uid()));
CREATE POLICY "No direct write on revisions" ON public.figure_draft_revisions
  FOR ALL TO authenticated USING (false) WITH CHECK (false);

-- Relationships
CREATE TABLE public.figure_draft_regions (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  figure_draft_id uuid NOT NULL REFERENCES public.figure_drafts(id) ON DELETE CASCADE,
  region_id       text NOT NULL,
  region_label    text NOT NULL,
  created_by      uuid NOT NULL,
  created_at      timestamptz NOT NULL DEFAULT now(),
  UNIQUE (figure_draft_id, region_id)
);
CREATE TABLE public.figure_draft_eras (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  figure_draft_id uuid NOT NULL REFERENCES public.figure_drafts(id) ON DELETE CASCADE,
  era_id          text NOT NULL,
  era_label       text NOT NULL,
  created_by      uuid NOT NULL,
  created_at      timestamptz NOT NULL DEFAULT now(),
  UNIQUE (figure_draft_id, era_id)
);
CREATE TABLE public.figure_draft_themes (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  figure_draft_id uuid NOT NULL REFERENCES public.figure_drafts(id) ON DELETE CASCADE,
  theme_id        text NOT NULL,
  theme_label     text NOT NULL,
  created_by      uuid NOT NULL,
  created_at      timestamptz NOT NULL DEFAULT now(),
  UNIQUE (figure_draft_id, theme_id)
);
CREATE TABLE public.figure_draft_related_figures (
  id                     uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  figure_draft_id        uuid NOT NULL REFERENCES public.figure_drafts(id) ON DELETE CASCADE,
  related_figure_id      text NOT NULL,
  related_figure_label   text NOT NULL,
  relationship_type      text,
  relationship_note      text,
  created_by             uuid NOT NULL,
  created_at             timestamptz NOT NULL DEFAULT now(),
  UNIQUE (figure_draft_id, related_figure_id)
);

-- Grants + RLS for relationship tables
DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'figure_draft_regions','figure_draft_eras',
    'figure_draft_themes','figure_draft_related_figures'
  ] LOOP
    EXECUTE format('GRANT SELECT ON public.%I TO authenticated;', t);
    EXECUTE format('GRANT ALL ON public.%I TO service_role;', t);
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY;', t);
    EXECUTE format('CREATE POLICY %I ON public.%I FOR SELECT TO authenticated USING (public.has_any_studio_role(auth.uid()));', t||'_read', t);
    EXECUTE format('CREATE POLICY %I ON public.%I FOR ALL TO authenticated USING (false) WITH CHECK (false);', t||'_no_direct_write', t);
  END LOOP;
END $$;

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.tg_figure_drafts_touch()
 RETURNS trigger LANGUAGE plpgsql
 SET search_path = public, pg_temp
AS $function$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$function$;
CREATE TRIGGER figure_drafts_touch
BEFORE UPDATE ON public.figure_drafts
FOR EACH ROW EXECUTE FUNCTION public.tg_figure_drafts_touch();

-- ---------- Part C: role helpers ----------

CREATE OR REPLACE FUNCTION public.can_write_figure_drafts(_uid uuid)
 RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER
 SET search_path = public, pg_temp
AS $function$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id=_uid
    AND role IN ('museum_director'::public.app_role,'senior_curator'::public.app_role,'curator'::public.app_role));
$function$;

CREATE OR REPLACE FUNCTION public.can_research_figure_drafts(_uid uuid)
 RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER
 SET search_path = public, pg_temp
AS $function$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id=_uid
    AND role IN ('museum_director'::public.app_role,'senior_curator'::public.app_role,
                 'curator'::public.app_role,'researcher'::public.app_role));
$function$;

CREATE OR REPLACE FUNCTION public.can_fact_check_figure_drafts(_uid uuid)
 RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER
 SET search_path = public, pg_temp
AS $function$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id=_uid
    AND role IN ('museum_director'::public.app_role,'senior_curator'::public.app_role,'fact_checker'::public.app_role));
$function$;

CREATE OR REPLACE FUNCTION public.can_translate_figure_drafts(_uid uuid)
 RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER
 SET search_path = public, pg_temp
AS $function$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id=_uid
    AND role IN ('museum_director'::public.app_role,'senior_curator'::public.app_role,
                 'translator'::public.app_role,'translation_reviewer'::public.app_role));
$function$;

CREATE OR REPLACE FUNCTION public.can_translation_review_figure_drafts(_uid uuid)
 RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER
 SET search_path = public, pg_temp
AS $function$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id=_uid
    AND role IN ('museum_director'::public.app_role,'senior_curator'::public.app_role,'translation_reviewer'::public.app_role));
$function$;

CREATE OR REPLACE FUNCTION public.can_approve_figure_drafts(_uid uuid)
 RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER
 SET search_path = public, pg_temp
AS $function$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id=_uid
    AND role IN ('museum_director'::public.app_role,'senior_curator'::public.app_role));
$function$;

REVOKE ALL ON FUNCTION public.can_write_figure_drafts(uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.can_research_figure_drafts(uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.can_fact_check_figure_drafts(uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.can_translate_figure_drafts(uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.can_translation_review_figure_drafts(uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.can_approve_figure_drafts(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.can_write_figure_drafts(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.can_research_figure_drafts(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.can_fact_check_figure_drafts(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.can_translate_figure_drafts(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.can_translation_review_figure_drafts(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.can_approve_figure_drafts(uuid) TO authenticated;

-- ---------- Part D: revision snapshot helper (internal) ----------

CREATE OR REPLACE FUNCTION public._snapshot_figure_draft(_id uuid, _actor uuid, _summary text)
 RETURNS void LANGUAGE plpgsql SECURITY DEFINER
 SET search_path = public, pg_temp
AS $function$
DECLARE
  next_no int;
  snap jsonb;
BEGIN
  SELECT COALESCE(MAX(revision_number),0)+1 INTO next_no
    FROM public.figure_draft_revisions WHERE figure_draft_id=_id;

  SELECT to_jsonb(fd) || jsonb_build_object(
    'regions',  COALESCE((SELECT jsonb_agg(to_jsonb(r)) FROM public.figure_draft_regions r WHERE r.figure_draft_id=_id), '[]'::jsonb),
    'eras',     COALESCE((SELECT jsonb_agg(to_jsonb(e)) FROM public.figure_draft_eras e WHERE e.figure_draft_id=_id), '[]'::jsonb),
    'themes',   COALESCE((SELECT jsonb_agg(to_jsonb(t)) FROM public.figure_draft_themes t WHERE t.figure_draft_id=_id), '[]'::jsonb),
    'related_figures', COALESCE((SELECT jsonb_agg(to_jsonb(rf)) FROM public.figure_draft_related_figures rf WHERE rf.figure_draft_id=_id), '[]'::jsonb)
  ) INTO snap FROM public.figure_drafts fd WHERE fd.id=_id;

  INSERT INTO public.figure_draft_revisions(figure_draft_id, revision_number, snapshot, changed_by, change_summary)
    VALUES (_id, next_no, snap, _actor, _summary);
END;
$function$;
REVOKE ALL ON FUNCTION public._snapshot_figure_draft(uuid,uuid,text) FROM PUBLIC, anon, authenticated;

-- ---------- Part E: mutation RPCs ----------

-- Create
CREATE OR REPLACE FUNCTION public.create_figure_draft(_payload jsonb)
 RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER
 SET search_path = public, pg_temp
AS $function$
DECLARE
  caller uuid := auth.uid();
  new_row public.figure_drafts;
BEGIN
  IF caller IS NULL THEN RAISE EXCEPTION 'Authentication required' USING ERRCODE='42501'; END IF;
  IF NOT public.can_write_figure_drafts(caller) THEN
    RAISE EXCEPTION 'Not authorized to create figure drafts' USING ERRCODE='42501';
  END IF;

  INSERT INTO public.figure_drafts (
    public_figure_id, slug, name_en, name_fr, name_ar,
    subtitle_en, subtitle_fr, subtitle_ar,
    summary_en, summary_fr, summary_ar,
    biography_en, biography_fr, biography_ar,
    birth_year, death_year, birth_date_text, death_date_text,
    birthplace_text_en, birthplace_text_fr, birthplace_text_ar,
    status, created_by, updated_by
  ) VALUES (
    NULLIF(_payload->>'public_figure_id',''),
    lower(trim(_payload->>'slug')),
    NULLIF(trim(_payload->>'name_en'),''),
    NULLIF(_payload->>'name_fr',''), NULLIF(_payload->>'name_ar',''),
    NULLIF(_payload->>'subtitle_en',''), NULLIF(_payload->>'subtitle_fr',''), NULLIF(_payload->>'subtitle_ar',''),
    NULLIF(_payload->>'summary_en',''), NULLIF(_payload->>'summary_fr',''), NULLIF(_payload->>'summary_ar',''),
    NULLIF(_payload->>'biography_en',''), NULLIF(_payload->>'biography_fr',''), NULLIF(_payload->>'biography_ar',''),
    NULLIF(_payload->>'birth_year','')::int, NULLIF(_payload->>'death_year','')::int,
    NULLIF(_payload->>'birth_date_text',''), NULLIF(_payload->>'death_date_text',''),
    NULLIF(_payload->>'birthplace_text_en',''), NULLIF(_payload->>'birthplace_text_fr',''), NULLIF(_payload->>'birthplace_text_ar',''),
    'draft'::public.figure_draft_status, caller, caller
  ) RETURNING * INTO new_row;

  PERFORM public._snapshot_figure_draft(new_row.id, caller, 'Draft created');
  PERFORM public.log_audit_event('figure_draft.create','figure_draft', new_row.id::text, new_row.name_en,
    NULL, to_jsonb(new_row), NULL);
  RETURN new_row.id;
END;
$function$;

-- Update. Determines which field group is being edited and enforces
-- per-role authorisation. `_scope` values:
--   'identity'      → identity fields (name_*, subtitle_*, slug, lifespan, birthplace_*)
--   'narrative'     → summary_en, biography_en
--   'research'      → (relationships handled via dedicated RPCs; scope kept for future notes)
--   'translation'   → *_fr / *_ar fields only
-- Editing an approved draft forces status back to 'draft' and clears approval metadata.
CREATE OR REPLACE FUNCTION public.update_figure_draft(_id uuid, _scope text, _payload jsonb)
 RETURNS void LANGUAGE plpgsql SECURITY DEFINER
 SET search_path = public, pg_temp
AS $function$
DECLARE
  caller uuid := auth.uid();
  before_row public.figure_drafts;
  after_row public.figure_drafts;
  status_reset boolean := false;
BEGIN
  IF caller IS NULL THEN RAISE EXCEPTION 'Authentication required' USING ERRCODE='42501'; END IF;
  SELECT * INTO before_row FROM public.figure_drafts WHERE id=_id;
  IF before_row.id IS NULL THEN RAISE EXCEPTION 'Draft not found' USING ERRCODE='P0002'; END IF;
  IF before_row.status='archived' THEN
    RAISE EXCEPTION 'Restore the draft before editing' USING ERRCODE='22023';
  END IF;

  -- authorisation per scope
  IF _scope IN ('identity','narrative') THEN
    IF NOT public.can_write_figure_drafts(caller) THEN
      RAISE EXCEPTION 'Not authorized to edit identity/narrative' USING ERRCODE='42501';
    END IF;
  ELSIF _scope='translation' THEN
    IF NOT public.can_translate_figure_drafts(caller) THEN
      RAISE EXCEPTION 'Not authorized to edit translations' USING ERRCODE='42501';
    END IF;
  ELSIF _scope='research' THEN
    IF NOT public.can_research_figure_drafts(caller) THEN
      RAISE EXCEPTION 'Not authorized to edit research fields' USING ERRCODE='42501';
    END IF;
  ELSE
    RAISE EXCEPTION 'Unknown update scope %', _scope USING ERRCODE='22023';
  END IF;

  -- If currently approved, editing puts it back to draft (approval invalidated).
  IF before_row.status='approved' THEN status_reset := true; END IF;

  UPDATE public.figure_drafts SET
    -- identity
    slug               = CASE WHEN _scope='identity' AND _payload ? 'slug' THEN lower(trim(_payload->>'slug')) ELSE slug END,
    public_figure_id   = CASE WHEN _scope='identity' AND _payload ? 'public_figure_id' THEN NULLIF(_payload->>'public_figure_id','') ELSE public_figure_id END,
    name_en            = CASE WHEN _scope='identity' AND _payload ? 'name_en' THEN NULLIF(trim(_payload->>'name_en'),'') ELSE name_en END,
    subtitle_en        = CASE WHEN _scope='identity' AND _payload ? 'subtitle_en' THEN NULLIF(_payload->>'subtitle_en','') ELSE subtitle_en END,
    birth_year         = CASE WHEN _scope='identity' AND _payload ? 'birth_year' THEN NULLIF(_payload->>'birth_year','')::int ELSE birth_year END,
    death_year         = CASE WHEN _scope='identity' AND _payload ? 'death_year' THEN NULLIF(_payload->>'death_year','')::int ELSE death_year END,
    birth_date_text    = CASE WHEN _scope='identity' AND _payload ? 'birth_date_text' THEN NULLIF(_payload->>'birth_date_text','') ELSE birth_date_text END,
    death_date_text    = CASE WHEN _scope='identity' AND _payload ? 'death_date_text' THEN NULLIF(_payload->>'death_date_text','') ELSE death_date_text END,
    birthplace_text_en = CASE WHEN _scope='identity' AND _payload ? 'birthplace_text_en' THEN NULLIF(_payload->>'birthplace_text_en','') ELSE birthplace_text_en END,

    -- narrative (English master)
    summary_en   = CASE WHEN _scope='narrative' AND _payload ? 'summary_en' THEN NULLIF(_payload->>'summary_en','') ELSE summary_en END,
    biography_en = CASE WHEN _scope='narrative' AND _payload ? 'biography_en' THEN NULLIF(_payload->>'biography_en','') ELSE biography_en END,

    -- translation-only
    name_fr            = CASE WHEN _scope='translation' AND _payload ? 'name_fr' THEN NULLIF(_payload->>'name_fr','') ELSE name_fr END,
    name_ar            = CASE WHEN _scope='translation' AND _payload ? 'name_ar' THEN NULLIF(_payload->>'name_ar','') ELSE name_ar END,
    subtitle_fr        = CASE WHEN _scope='translation' AND _payload ? 'subtitle_fr' THEN NULLIF(_payload->>'subtitle_fr','') ELSE subtitle_fr END,
    subtitle_ar        = CASE WHEN _scope='translation' AND _payload ? 'subtitle_ar' THEN NULLIF(_payload->>'subtitle_ar','') ELSE subtitle_ar END,
    summary_fr         = CASE WHEN _scope='translation' AND _payload ? 'summary_fr' THEN NULLIF(_payload->>'summary_fr','') ELSE summary_fr END,
    summary_ar         = CASE WHEN _scope='translation' AND _payload ? 'summary_ar' THEN NULLIF(_payload->>'summary_ar','') ELSE summary_ar END,
    biography_fr       = CASE WHEN _scope='translation' AND _payload ? 'biography_fr' THEN NULLIF(_payload->>'biography_fr','') ELSE biography_fr END,
    biography_ar       = CASE WHEN _scope='translation' AND _payload ? 'biography_ar' THEN NULLIF(_payload->>'biography_ar','') ELSE biography_ar END,
    birthplace_text_fr = CASE WHEN _scope='translation' AND _payload ? 'birthplace_text_fr' THEN NULLIF(_payload->>'birthplace_text_fr','') ELSE birthplace_text_fr END,
    birthplace_text_ar = CASE WHEN _scope='translation' AND _payload ? 'birthplace_text_ar' THEN NULLIF(_payload->>'birthplace_text_ar','') ELSE birthplace_text_ar END,

    status       = CASE WHEN status_reset THEN 'draft'::public.figure_draft_status ELSE status END,
    approved_by  = CASE WHEN status_reset THEN NULL ELSE approved_by END,
    approved_at  = CASE WHEN status_reset THEN NULL ELSE approved_at END,
    updated_by   = caller
  WHERE id=_id RETURNING * INTO after_row;

  PERFORM public._snapshot_figure_draft(_id, caller, format('Edited (%s)', _scope));
  PERFORM public.log_audit_event('figure_draft.update','figure_draft', _id::text, after_row.name_en,
    to_jsonb(before_row), to_jsonb(after_row), jsonb_build_object('scope', _scope, 'status_reset', status_reset));
END;
$function$;

-- Status transitions. Allowed transitions:
--   draft            → research_review  (curator+)
--   research_review  → fact_check       (fact_checker+)
--   fact_check       → translation_review (translator/reviewer+)
--   translation_review → curator_review  (curator+)
--   curator_review   → approved          (approve role)
--   curator_review   → changes_requested (approve role)
--   research_review, fact_check, translation_review → changes_requested (respective role)
--   changes_requested → draft            (curator+)
CREATE OR REPLACE FUNCTION public.transition_figure_draft(_id uuid, _next text, _note text)
 RETURNS void LANGUAGE plpgsql SECURITY DEFINER
 SET search_path = public, pg_temp
AS $function$
DECLARE
  caller uuid := auth.uid();
  before_row public.figure_drafts;
  next_status public.figure_draft_status;
  allowed boolean := false;
  needs_role_ok boolean := false;
BEGIN
  IF caller IS NULL THEN RAISE EXCEPTION 'Authentication required' USING ERRCODE='42501'; END IF;
  SELECT * INTO before_row FROM public.figure_drafts WHERE id=_id;
  IF before_row.id IS NULL THEN RAISE EXCEPTION 'Draft not found' USING ERRCODE='P0002'; END IF;
  IF before_row.status='archived' THEN
    RAISE EXCEPTION 'Restore the draft before transitioning' USING ERRCODE='22023';
  END IF;
  next_status := _next::public.figure_draft_status;

  -- allow-list
  IF before_row.status='draft'             AND next_status='research_review'   THEN allowed := true; needs_role_ok := public.can_write_figure_drafts(caller);
  ELSIF before_row.status='research_review'  AND next_status='fact_check'         THEN allowed := true; needs_role_ok := public.can_fact_check_figure_drafts(caller);
  ELSIF before_row.status='fact_check'       AND next_status='translation_review' THEN allowed := true; needs_role_ok := public.can_translate_figure_drafts(caller);
  ELSIF before_row.status='translation_review' AND next_status='curator_review'   THEN allowed := true; needs_role_ok := public.can_write_figure_drafts(caller);
  ELSIF before_row.status='curator_review'   AND next_status='approved'           THEN allowed := true; needs_role_ok := public.can_approve_figure_drafts(caller);
  ELSIF before_row.status='curator_review'   AND next_status='changes_requested'  THEN allowed := true; needs_role_ok := public.can_approve_figure_drafts(caller);
  ELSIF before_row.status IN ('research_review','fact_check','translation_review')
        AND next_status='changes_requested'                                       THEN allowed := true;
        needs_role_ok := CASE before_row.status
          WHEN 'research_review'    THEN public.can_research_figure_drafts(caller)
          WHEN 'fact_check'         THEN public.can_fact_check_figure_drafts(caller)
          WHEN 'translation_review' THEN public.can_translation_review_figure_drafts(caller)
          ELSE false END;
  ELSIF before_row.status='changes_requested' AND next_status='draft'             THEN allowed := true; needs_role_ok := public.can_write_figure_drafts(caller);
  END IF;

  IF NOT allowed THEN
    RAISE EXCEPTION 'Transition from % to % is not allowed', before_row.status, next_status USING ERRCODE='22023';
  END IF;
  IF NOT needs_role_ok THEN
    RAISE EXCEPTION 'Not authorized for this transition' USING ERRCODE='42501';
  END IF;

  -- Required fields at critical gates
  IF next_status='curator_review' THEN
    IF before_row.name_en IS NULL OR before_row.biography_en IS NULL THEN
      RAISE EXCEPTION 'Name and English biography are required before curator review' USING ERRCODE='22023';
    END IF;
  END IF;
  IF next_status='changes_requested' AND (_note IS NULL OR length(trim(_note)) < 3) THEN
    RAISE EXCEPTION 'A review note is required when requesting changes' USING ERRCODE='22023';
  END IF;

  UPDATE public.figure_drafts SET
    status       = next_status,
    review_note  = CASE WHEN _note IS NOT NULL AND length(trim(_note))>0 THEN _note ELSE review_note END,
    submitted_by = CASE WHEN next_status='curator_review' THEN caller ELSE submitted_by END,
    submitted_at = CASE WHEN next_status='curator_review' THEN now() ELSE submitted_at END,
    approved_by  = CASE WHEN next_status='approved' THEN caller ELSE approved_by END,
    approved_at  = CASE WHEN next_status='approved' THEN now() ELSE approved_at END,
    updated_by   = caller
  WHERE id=_id;

  PERFORM public._snapshot_figure_draft(_id, caller, format('Status → %s', next_status));
  PERFORM public.log_audit_event(
    CASE next_status
      WHEN 'approved' THEN 'figure_draft.approve'
      WHEN 'changes_requested' THEN 'figure_draft.changes_requested'
      WHEN 'curator_review' THEN 'figure_draft.submit'
      ELSE 'figure_draft.status' END,
    'figure_draft', _id::text, before_row.name_en,
    jsonb_build_object('status', before_row.status),
    jsonb_build_object('status', next_status),
    jsonb_build_object('note', _note));
END;
$function$;

-- Archive / restore
CREATE OR REPLACE FUNCTION public.archive_figure_draft(_id uuid)
 RETURNS void LANGUAGE plpgsql SECURITY DEFINER
 SET search_path = public, pg_temp
AS $function$
DECLARE caller uuid := auth.uid(); before_row public.figure_drafts;
BEGIN
  IF caller IS NULL THEN RAISE EXCEPTION 'Authentication required' USING ERRCODE='42501'; END IF;
  IF NOT public.can_approve_figure_drafts(caller) THEN
    RAISE EXCEPTION 'Not authorized to archive drafts' USING ERRCODE='42501';
  END IF;
  SELECT * INTO before_row FROM public.figure_drafts WHERE id=_id;
  IF before_row.id IS NULL THEN RAISE EXCEPTION 'Draft not found' USING ERRCODE='P0002'; END IF;
  IF before_row.status='archived' THEN RETURN; END IF;
  UPDATE public.figure_drafts SET status='archived', archived_at=now(), updated_by=caller WHERE id=_id;
  PERFORM public._snapshot_figure_draft(_id, caller, 'Archived');
  PERFORM public.log_audit_event('figure_draft.archive','figure_draft',_id::text,before_row.name_en,
    jsonb_build_object('status',before_row.status), jsonb_build_object('status','archived'), NULL);
END;
$function$;

CREATE OR REPLACE FUNCTION public.restore_figure_draft(_id uuid)
 RETURNS void LANGUAGE plpgsql SECURITY DEFINER
 SET search_path = public, pg_temp
AS $function$
DECLARE caller uuid := auth.uid(); before_row public.figure_drafts;
BEGIN
  IF caller IS NULL THEN RAISE EXCEPTION 'Authentication required' USING ERRCODE='42501'; END IF;
  IF NOT public.can_approve_figure_drafts(caller) THEN
    RAISE EXCEPTION 'Not authorized to restore drafts' USING ERRCODE='42501';
  END IF;
  SELECT * INTO before_row FROM public.figure_drafts WHERE id=_id;
  IF before_row.id IS NULL THEN RAISE EXCEPTION 'Draft not found' USING ERRCODE='P0002'; END IF;
  IF before_row.status <> 'archived' THEN RETURN; END IF;
  UPDATE public.figure_drafts SET status='draft', archived_at=NULL, updated_by=caller WHERE id=_id;
  PERFORM public._snapshot_figure_draft(_id, caller, 'Restored');
  PERFORM public.log_audit_event('figure_draft.restore','figure_draft',_id::text,before_row.name_en,
    jsonb_build_object('status','archived'), jsonb_build_object('status','draft'), NULL);
END;
$function$;

-- Relationship helpers (parametrised by _kind = 'region'|'era'|'theme'|'related_figure')
CREATE OR REPLACE FUNCTION public.add_figure_draft_relation(
  _draft_id uuid, _kind text, _ref_id text, _label text,
  _relationship_type text, _relationship_note text
) RETURNS void LANGUAGE plpgsql SECURITY DEFINER
  SET search_path = public, pg_temp
AS $function$
DECLARE
  caller uuid := auth.uid();
  d public.figure_drafts;
BEGIN
  IF caller IS NULL THEN RAISE EXCEPTION 'Authentication required' USING ERRCODE='42501'; END IF;
  IF NOT public.can_research_figure_drafts(caller) THEN
    RAISE EXCEPTION 'Not authorized to edit research relationships' USING ERRCODE='42501';
  END IF;
  SELECT * INTO d FROM public.figure_drafts WHERE id=_draft_id;
  IF d.id IS NULL THEN RAISE EXCEPTION 'Draft not found' USING ERRCODE='P0002'; END IF;
  IF d.status='archived' THEN RAISE EXCEPTION 'Restore before editing' USING ERRCODE='22023'; END IF;

  IF _kind='region' THEN
    INSERT INTO public.figure_draft_regions(figure_draft_id, region_id, region_label, created_by)
      VALUES (_draft_id, _ref_id, _label, caller)
      ON CONFLICT (figure_draft_id, region_id) DO NOTHING;
  ELSIF _kind='era' THEN
    INSERT INTO public.figure_draft_eras(figure_draft_id, era_id, era_label, created_by)
      VALUES (_draft_id, _ref_id, _label, caller)
      ON CONFLICT (figure_draft_id, era_id) DO NOTHING;
  ELSIF _kind='theme' THEN
    INSERT INTO public.figure_draft_themes(figure_draft_id, theme_id, theme_label, created_by)
      VALUES (_draft_id, _ref_id, _label, caller)
      ON CONFLICT (figure_draft_id, theme_id) DO NOTHING;
  ELSIF _kind='related_figure' THEN
    INSERT INTO public.figure_draft_related_figures(figure_draft_id, related_figure_id, related_figure_label, relationship_type, relationship_note, created_by)
      VALUES (_draft_id, _ref_id, _label, NULLIF(_relationship_type,''), NULLIF(_relationship_note,''), caller)
      ON CONFLICT (figure_draft_id, related_figure_id) DO NOTHING;
  ELSE
    RAISE EXCEPTION 'Unknown relationship kind %', _kind USING ERRCODE='22023';
  END IF;

  PERFORM public._snapshot_figure_draft(_draft_id, caller, format('Linked %s: %s', _kind, _label));
  PERFORM public.log_audit_event('figure_draft.relation_add','figure_draft',_draft_id::text, d.name_en,
    NULL, jsonb_build_object('kind',_kind,'ref_id',_ref_id,'label',_label), NULL);
END;
$function$;

CREATE OR REPLACE FUNCTION public.remove_figure_draft_relation(
  _draft_id uuid, _kind text, _ref_id text
) RETURNS void LANGUAGE plpgsql SECURITY DEFINER
  SET search_path = public, pg_temp
AS $function$
DECLARE
  caller uuid := auth.uid();
  d public.figure_drafts;
  removed int := 0;
BEGIN
  IF caller IS NULL THEN RAISE EXCEPTION 'Authentication required' USING ERRCODE='42501'; END IF;
  IF NOT public.can_research_figure_drafts(caller) THEN
    RAISE EXCEPTION 'Not authorized to edit research relationships' USING ERRCODE='42501';
  END IF;
  SELECT * INTO d FROM public.figure_drafts WHERE id=_draft_id;
  IF d.id IS NULL THEN RAISE EXCEPTION 'Draft not found' USING ERRCODE='P0002'; END IF;
  IF d.status='archived' THEN RAISE EXCEPTION 'Restore before editing' USING ERRCODE='22023'; END IF;

  IF _kind='region' THEN
    DELETE FROM public.figure_draft_regions WHERE figure_draft_id=_draft_id AND region_id=_ref_id;
    GET DIAGNOSTICS removed = ROW_COUNT;
  ELSIF _kind='era' THEN
    DELETE FROM public.figure_draft_eras WHERE figure_draft_id=_draft_id AND era_id=_ref_id;
    GET DIAGNOSTICS removed = ROW_COUNT;
  ELSIF _kind='theme' THEN
    DELETE FROM public.figure_draft_themes WHERE figure_draft_id=_draft_id AND theme_id=_ref_id;
    GET DIAGNOSTICS removed = ROW_COUNT;
  ELSIF _kind='related_figure' THEN
    DELETE FROM public.figure_draft_related_figures WHERE figure_draft_id=_draft_id AND related_figure_id=_ref_id;
    GET DIAGNOSTICS removed = ROW_COUNT;
  ELSE
    RAISE EXCEPTION 'Unknown relationship kind %', _kind USING ERRCODE='22023';
  END IF;

  IF removed = 0 THEN RETURN; END IF;
  PERFORM public._snapshot_figure_draft(_draft_id, caller, format('Unlinked %s: %s', _kind, _ref_id));
  PERFORM public.log_audit_event('figure_draft.relation_remove','figure_draft',_draft_id::text, d.name_en,
    jsonb_build_object('kind',_kind,'ref_id',_ref_id), NULL, NULL);
END;
$function$;

-- Grants for mutation RPCs
REVOKE ALL ON FUNCTION public.create_figure_draft(jsonb) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.update_figure_draft(uuid, text, jsonb) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.transition_figure_draft(uuid, text, text) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.archive_figure_draft(uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.restore_figure_draft(uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.add_figure_draft_relation(uuid, text, text, text, text, text) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.remove_figure_draft_relation(uuid, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.create_figure_draft(jsonb) TO authenticated;
GRANT EXECUTE ON FUNCTION public.update_figure_draft(uuid, text, jsonb) TO authenticated;
GRANT EXECUTE ON FUNCTION public.transition_figure_draft(uuid, text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.archive_figure_draft(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.restore_figure_draft(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.add_figure_draft_relation(uuid, text, text, text, text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.remove_figure_draft_relation(uuid, text, text) TO authenticated;
