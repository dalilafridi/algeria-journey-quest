
-- =========================================================
-- 1. studio_notifications
-- =========================================================
CREATE TABLE public.studio_notifications (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_user_id   uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  actor_user_id       uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  kind                text NOT NULL,
  entity_type         text NOT NULL,
  entity_id           text NOT NULL,
  entity_label        text,
  message             text,
  metadata            jsonb,
  read_at             timestamptz,
  created_at          timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX studio_notifications_recipient_created_idx
  ON public.studio_notifications (recipient_user_id, created_at DESC);
CREATE INDEX studio_notifications_recipient_unread_idx
  ON public.studio_notifications (recipient_user_id, created_at DESC)
  WHERE read_at IS NULL;

GRANT SELECT, UPDATE ON public.studio_notifications TO authenticated;
GRANT ALL ON public.studio_notifications TO service_role;

ALTER TABLE public.studio_notifications ENABLE ROW LEVEL SECURITY;

-- Recipient sees only their own notifications.
CREATE POLICY "notif_select_own"
  ON public.studio_notifications FOR SELECT
  TO authenticated
  USING (recipient_user_id = auth.uid());

-- Recipient can mark their own notifications read (updating read_at).
CREATE POLICY "notif_update_own"
  ON public.studio_notifications FOR UPDATE
  TO authenticated
  USING (recipient_user_id = auth.uid())
  WITH CHECK (recipient_user_id = auth.uid());

-- Explicit deny: notifications are created only by SECURITY DEFINER
-- workflow functions, never by direct client inserts.
CREATE POLICY "notif_no_client_insert"
  ON public.studio_notifications FOR INSERT
  TO authenticated
  WITH CHECK (false);

-- Explicit deny: recipients cannot delete; retention is a maintenance job.
CREATE POLICY "notif_no_client_delete"
  ON public.studio_notifications FOR DELETE
  TO authenticated
  USING (false);

-- =========================================================
-- 2. Internal notification helpers (definer-only)
-- =========================================================

-- Insert a single notification. Skips when recipient == actor (never
-- notify a user about their own action) or when recipient is null.
CREATE OR REPLACE FUNCTION public._notify(
  _recipient uuid, _actor uuid, _kind text,
  _entity_type text, _entity_id text, _entity_label text,
  _message text, _metadata jsonb
) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $function$
BEGIN
  IF _recipient IS NULL THEN RETURN; END IF;
  IF _actor IS NOT NULL AND _recipient = _actor THEN RETURN; END IF;
  INSERT INTO public.studio_notifications(
    recipient_user_id, actor_user_id, kind,
    entity_type, entity_id, entity_label, message, metadata
  ) VALUES (_recipient, _actor, _kind, _entity_type, _entity_id, _entity_label, _message, _metadata);
END;
$function$;

-- Distinct users holding any of the requested roles.
CREATE OR REPLACE FUNCTION public._users_with_any_role(_roles app_role[])
RETURNS SETOF uuid
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public, pg_temp
AS $function$
  SELECT DISTINCT user_id FROM public.user_roles WHERE role = ANY(_roles);
$function$;

-- Notify everyone holding any of the roles.
CREATE OR REPLACE FUNCTION public._notify_roles(
  _roles app_role[], _actor uuid, _kind text,
  _entity_type text, _entity_id text, _entity_label text,
  _message text, _metadata jsonb
) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $function$
DECLARE u uuid;
BEGIN
  FOR u IN SELECT public._users_with_any_role(_roles) LOOP
    PERFORM public._notify(u, _actor, _kind, _entity_type, _entity_id, _entity_label, _message, _metadata);
  END LOOP;
END;
$function$;

REVOKE EXECUTE ON FUNCTION public._notify(uuid, uuid, text, text, text, text, text, jsonb) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public._users_with_any_role(app_role[]) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public._notify_roles(app_role[], uuid, text, text, text, text, text, jsonb) FROM PUBLIC, anon, authenticated;

-- =========================================================
-- 3. Server function to mark notifications read
-- =========================================================
CREATE OR REPLACE FUNCTION public.mark_notifications_read(_ids uuid[])
RETURNS int
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $function$
DECLARE caller uuid := auth.uid(); n int;
BEGIN
  IF caller IS NULL THEN RAISE EXCEPTION 'Authentication required' USING ERRCODE = '42501'; END IF;
  UPDATE public.studio_notifications
    SET read_at = now()
    WHERE recipient_user_id = caller
      AND read_at IS NULL
      AND (_ids IS NULL OR id = ANY(_ids));
  GET DIAGNOSTICS n = ROW_COUNT;
  RETURN n;
END;
$function$;

-- =========================================================
-- 4. Retrofit transition_figure_draft with targeted notifications
-- =========================================================
CREATE OR REPLACE FUNCTION public.transition_figure_draft(_id uuid, _next text, _note text)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE
  caller uuid := auth.uid();
  before_row public.figure_drafts;
  next_status public.figure_draft_status;
  allowed boolean := false;
  needs_role_ok boolean := false;
  action_kind text;
  notify_author boolean := false;
  notify_roles public.app_role[] := NULL;
  meta jsonb;
BEGIN
  IF caller IS NULL THEN RAISE EXCEPTION 'Authentication required' USING ERRCODE='42501'; END IF;
  SELECT * INTO before_row FROM public.figure_drafts WHERE id=_id;
  IF before_row.id IS NULL THEN RAISE EXCEPTION 'Draft not found' USING ERRCODE='P0002'; END IF;
  IF before_row.status='archived' THEN
    RAISE EXCEPTION 'Restore the draft before transitioning' USING ERRCODE='22023';
  END IF;
  next_status := _next::public.figure_draft_status;

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

  action_kind := CASE next_status
    WHEN 'approved'          THEN 'figure_draft.approve'
    WHEN 'changes_requested' THEN 'figure_draft.changes_requested'
    WHEN 'curator_review'    THEN 'figure_draft.submit'
    ELSE                          'figure_draft.status' END;

  PERFORM public.log_audit_event(
    action_kind, 'figure_draft', _id::text, before_row.name_en,
    jsonb_build_object('status', before_row.status),
    jsonb_build_object('status', next_status),
    jsonb_build_object('note', _note));

  -- Notifications (transactional; targeted per stage).
  meta := jsonb_build_object(
    'from_status', before_row.status,
    'to_status',   next_status,
    'note',        _note,
    'route',       format('/curator/figures/%s', _id));

  IF next_status = 'research_review' THEN
    notify_roles := ARRAY['museum_director','senior_curator','curator','researcher']::public.app_role[];
  ELSIF next_status = 'fact_check' THEN
    notify_roles := ARRAY['museum_director','senior_curator','fact_checker']::public.app_role[];
  ELSIF next_status = 'translation_review' THEN
    notify_roles := ARRAY['museum_director','senior_curator','translator','translation_reviewer']::public.app_role[];
  ELSIF next_status = 'curator_review' THEN
    notify_roles := ARRAY['museum_director','senior_curator']::public.app_role[];
  ELSIF next_status IN ('approved','changes_requested','draft') THEN
    notify_author := true;
  END IF;

  IF notify_roles IS NOT NULL THEN
    PERFORM public._notify_roles(
      notify_roles, caller,
      'figure_draft.' || next_status::text,
      'figure_draft', _id::text, before_row.name_en,
      format('%s needs %s', COALESCE(before_row.name_en, 'A figure draft'), next_status::text),
      meta);
  END IF;

  IF notify_author THEN
    PERFORM public._notify(before_row.created_by, caller,
      'figure_draft.' || next_status::text,
      'figure_draft', _id::text, before_row.name_en,
      CASE next_status
        WHEN 'approved'          THEN format('%s was approved', COALESCE(before_row.name_en,'Your draft'))
        WHEN 'changes_requested' THEN format('Changes requested on %s', COALESCE(before_row.name_en,'your draft'))
        ELSE                          format('%s reopened as draft', COALESCE(before_row.name_en,'Your draft'))
      END,
      meta);
    IF before_row.updated_by IS NOT NULL AND before_row.updated_by <> before_row.created_by THEN
      PERFORM public._notify(before_row.updated_by, caller,
        'figure_draft.' || next_status::text,
        'figure_draft', _id::text, before_row.name_en, NULL, meta);
    END IF;
  END IF;
END;
$function$;

-- =========================================================
-- 5. Retrofit set_source_verification with notifications
-- =========================================================
CREATE OR REPLACE FUNCTION public.set_source_verification(_id uuid, _verified boolean, _verification_date date)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE
  caller uuid := auth.uid();
  before_row public.source_records;
  new_status public.source_status;
  new_date date;
  linker uuid;
  meta jsonb;
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

  IF _verified THEN
    meta := jsonb_build_object(
      'route', format('/curator/sources/%s', _id),
      'status', new_status,
      'verification_date', new_date);
    -- Notify the source creator + everyone who linked the source (distinct).
    FOR linker IN (
      SELECT DISTINCT u FROM (
        SELECT before_row.created_by AS u
        UNION
        SELECT created_by FROM public.source_links WHERE source_id = _id
      ) s WHERE u IS NOT NULL
    ) LOOP
      PERFORM public._notify(linker, caller,
        'source.verified', 'source_record', _id::text, before_row.title,
        format('%s is now verified', COALESCE(before_row.title,'A source')),
        meta);
    END LOOP;
  END IF;
END;
$function$;

-- =========================================================
-- 6. Clone figure draft (transactional unique slug)
-- =========================================================
CREATE OR REPLACE FUNCTION public.clone_figure_draft(
  _id uuid, _include_relationships boolean
) RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $function$
DECLARE
  caller uuid := auth.uid();
  src public.figure_drafts;
  new_id uuid;
  base_slug text;
  new_slug text;
  i int := 1;
BEGIN
  IF caller IS NULL THEN RAISE EXCEPTION 'Authentication required' USING ERRCODE='42501'; END IF;
  IF NOT public.can_write_figure_drafts(caller) THEN
    RAISE EXCEPTION 'Not authorized to clone figure drafts' USING ERRCODE='42501';
  END IF;
  SELECT * INTO src FROM public.figure_drafts WHERE id=_id;
  IF src.id IS NULL THEN RAISE EXCEPTION 'Source draft not found' USING ERRCODE='P0002'; END IF;

  -- Lock to serialize slug picks across concurrent clones.
  PERFORM pg_advisory_xact_lock(hashtext('figure_drafts.slug'));

  base_slug := left(regexp_replace(src.slug || '-copy', '[^a-z0-9-]+', '-', 'g'), 120);
  new_slug := base_slug;
  WHILE EXISTS (SELECT 1 FROM public.figure_drafts WHERE slug = new_slug) LOOP
    i := i + 1;
    new_slug := left(base_slug || '-' || i::text, 120);
  END LOOP;

  INSERT INTO public.figure_drafts (
    slug, public_figure_id,
    name_en, name_fr, name_ar,
    subtitle_en, subtitle_fr, subtitle_ar,
    summary_en, summary_fr, summary_ar,
    biography_en, biography_fr, biography_ar,
    birth_year, death_year, birth_date_text, death_date_text,
    birthplace_text_en, birthplace_text_fr, birthplace_text_ar,
    status, created_by, updated_by,
    submitted_by, submitted_at, approved_by, approved_at,
    review_note, archived_at
  ) VALUES (
    new_slug, NULL,
    src.name_en || ' (copy)', src.name_fr, src.name_ar,
    src.subtitle_en, src.subtitle_fr, src.subtitle_ar,
    src.summary_en, src.summary_fr, src.summary_ar,
    src.biography_en, src.biography_fr, src.biography_ar,
    src.birth_year, src.death_year, src.birth_date_text, src.death_date_text,
    src.birthplace_text_en, src.birthplace_text_fr, src.birthplace_text_ar,
    'draft'::public.figure_draft_status, caller, caller,
    NULL, NULL, NULL, NULL,
    NULL, NULL
  ) RETURNING id INTO new_id;

  IF _include_relationships THEN
    INSERT INTO public.figure_draft_eras(figure_draft_id, era_id, era_label, created_by)
      SELECT new_id, era_id, era_label, caller FROM public.figure_draft_eras WHERE figure_draft_id = _id;
    INSERT INTO public.figure_draft_regions(figure_draft_id, region_id, region_label, created_by)
      SELECT new_id, region_id, region_label, caller FROM public.figure_draft_regions WHERE figure_draft_id = _id;
    INSERT INTO public.figure_draft_themes(figure_draft_id, theme_id, theme_label, created_by)
      SELECT new_id, theme_id, theme_label, caller FROM public.figure_draft_themes WHERE figure_draft_id = _id;
    INSERT INTO public.figure_draft_related_figures(
      figure_draft_id, related_figure_id, related_figure_label,
      relationship_type, relationship_note, created_by)
      SELECT new_id, related_figure_id, related_figure_label,
             relationship_type, relationship_note, caller
      FROM public.figure_draft_related_figures WHERE figure_draft_id = _id;
  END IF;

  PERFORM public._snapshot_figure_draft(new_id, caller,
    CASE WHEN _include_relationships THEN 'Cloned (with relationships)' ELSE 'Cloned' END);

  PERFORM public.log_audit_event(
    'figure_draft.clone', 'figure_draft', new_id::text,
    COALESCE(src.name_en, src.slug) || ' (copy)',
    jsonb_build_object('source_id', _id, 'source_slug', src.slug),
    jsonb_build_object('new_id', new_id, 'new_slug', new_slug, 'include_relationships', _include_relationships),
    NULL);

  RETURN new_id;
END;
$function$;

-- =========================================================
-- 7. Clone source (bibliographic only; resets to draft)
-- =========================================================
CREATE OR REPLACE FUNCTION public.clone_source(_id uuid)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $function$
DECLARE
  caller uuid := auth.uid();
  src public.source_records;
  new_id uuid;
BEGIN
  IF caller IS NULL THEN RAISE EXCEPTION 'Authentication required' USING ERRCODE='42501'; END IF;
  IF NOT public.can_write_sources(caller) THEN
    RAISE EXCEPTION 'Not authorized to clone sources' USING ERRCODE='42501';
  END IF;
  SELECT * INTO src FROM public.source_records WHERE id=_id;
  IF src.id IS NULL THEN RAISE EXCEPTION 'Source not found' USING ERRCODE='P0002'; END IF;

  INSERT INTO public.source_records (
    title, author, publisher, publication_date, publication_year,
    source_type, language, url, isbn, archive_or_institution, identifier,
    accessed_date, verification_date, reliability_tier, rights_status,
    citation_text, notes, status, created_by, updated_by, archived_at
  ) VALUES (
    src.title || ' (copy)', src.author, src.publisher, src.publication_date, src.publication_year,
    src.source_type, src.language, src.url, src.isbn, src.archive_or_institution, src.identifier,
    src.accessed_date, NULL, src.reliability_tier, src.rights_status,
    src.citation_text, src.notes, 'draft'::public.source_status, caller, caller, NULL
  ) RETURNING id INTO new_id;

  PERFORM public.log_audit_event(
    'source.clone', 'source_record', new_id::text, src.title || ' (copy)',
    jsonb_build_object('source_id', _id),
    jsonb_build_object('new_id', new_id),
    NULL);

  RETURN new_id;
END;
$function$;
