
CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE TYPE public.source_type AS ENUM (
  'primary_source','academic_book','academic_article','archive',
  'museum_record','government_record','oral_history','interview',
  'newspaper','map','photograph','film','audio','documentary','website','other'
);

CREATE TYPE public.reliability_tier AS ENUM (
  'primary','scholarly','institutional','reputable_secondary','contextual','unverified'
);

CREATE TYPE public.rights_status AS ENUM (
  'public_domain','licensed','permission_required','fair_use_review','unknown','not_applicable'
);

CREATE TYPE public.source_status AS ENUM ('draft','verified','archived');

CREATE TABLE public.source_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  author text,
  publisher text,
  publication_date date,
  publication_year integer,
  source_type public.source_type NOT NULL DEFAULT 'other',
  language text,
  url text,
  isbn text,
  archive_or_institution text,
  identifier text,
  accessed_date date,
  verification_date date,
  reliability_tier public.reliability_tier NOT NULL DEFAULT 'unverified',
  rights_status public.rights_status NOT NULL DEFAULT 'unknown',
  citation_text text,
  notes text,
  status public.source_status NOT NULL DEFAULT 'draft',
  created_by uuid NOT NULL,
  updated_by uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  archived_at timestamptz,
  CONSTRAINT source_records_title_len CHECK (char_length(title) BETWEEN 1 AND 500),
  CONSTRAINT source_records_url_len CHECK (url IS NULL OR char_length(url) <= 2048),
  CONSTRAINT source_records_year_range CHECK (
    publication_year IS NULL OR (publication_year BETWEEN -3000 AND 3000)
  )
);

GRANT SELECT ON public.source_records TO authenticated;
GRANT ALL ON public.source_records TO service_role;

ALTER TABLE public.source_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "source_records: studio read"
  ON public.source_records FOR SELECT
  TO authenticated
  USING (public.has_any_studio_role(auth.uid()));

CREATE POLICY "source_records: no direct insert"
  ON public.source_records FOR INSERT TO authenticated WITH CHECK (false);
CREATE POLICY "source_records: no direct update"
  ON public.source_records FOR UPDATE TO authenticated USING (false) WITH CHECK (false);
CREATE POLICY "source_records: no direct delete"
  ON public.source_records FOR DELETE TO authenticated USING (false);

CREATE INDEX source_records_status_idx    ON public.source_records (status);
CREATE INDEX source_records_type_idx      ON public.source_records (source_type);
CREATE INDEX source_records_reliability_idx ON public.source_records (reliability_tier);
CREATE INDEX source_records_rights_idx    ON public.source_records (rights_status);
CREATE INDEX source_records_updated_idx   ON public.source_records (updated_at DESC);
CREATE INDEX source_records_created_by_idx ON public.source_records (created_by);
CREATE INDEX source_records_title_trgm    ON public.source_records USING gin (title gin_trgm_ops);

CREATE TABLE public.source_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id uuid NOT NULL REFERENCES public.source_records(id) ON DELETE CASCADE,
  content_type text NOT NULL,
  content_id text NOT NULL,
  content_label text NOT NULL,
  public_route text,
  relationship_note text,
  created_by uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (source_id, content_type, content_id),
  CONSTRAINT source_links_type_len CHECK (char_length(content_type) BETWEEN 1 AND 60),
  CONSTRAINT source_links_id_len CHECK (char_length(content_id) BETWEEN 1 AND 200),
  CONSTRAINT source_links_label_len CHECK (char_length(content_label) BETWEEN 1 AND 300)
);

GRANT SELECT ON public.source_links TO authenticated;
GRANT ALL ON public.source_links TO service_role;

ALTER TABLE public.source_links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "source_links: studio read"
  ON public.source_links FOR SELECT TO authenticated
  USING (public.has_any_studio_role(auth.uid()));

CREATE POLICY "source_links: no direct insert"
  ON public.source_links FOR INSERT TO authenticated WITH CHECK (false);
CREATE POLICY "source_links: no direct update"
  ON public.source_links FOR UPDATE TO authenticated USING (false) WITH CHECK (false);
CREATE POLICY "source_links: no direct delete"
  ON public.source_links FOR DELETE TO authenticated USING (false);

CREATE INDEX source_links_source_idx  ON public.source_links (source_id);
CREATE INDEX source_links_content_idx ON public.source_links (content_type, content_id);

CREATE OR REPLACE FUNCTION public.tg_source_records_touch()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER source_records_touch
BEFORE UPDATE ON public.source_records
FOR EACH ROW EXECUTE FUNCTION public.tg_source_records_touch();

CREATE OR REPLACE FUNCTION public.can_write_sources(_uid uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
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
$$;

CREATE OR REPLACE FUNCTION public.can_archive_sources(_uid uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _uid
      AND role IN (
        'museum_director'::public.app_role,
        'senior_curator'::public.app_role,
        'curator'::public.app_role
      )
  );
$$;

CREATE OR REPLACE FUNCTION public.can_verify_sources(_uid uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _uid
      AND role IN (
        'museum_director'::public.app_role,
        'senior_curator'::public.app_role,
        'fact_checker'::public.app_role
      )
  );
$$;

REVOKE EXECUTE ON FUNCTION public.can_write_sources(uuid)   FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.can_archive_sources(uuid) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.can_verify_sources(uuid)  FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.can_write_sources(uuid)   TO authenticated;
GRANT EXECUTE ON FUNCTION public.can_archive_sources(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.can_verify_sources(uuid)  TO authenticated;

CREATE OR REPLACE FUNCTION public.create_source(_payload jsonb)
RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  caller uuid := auth.uid();
  new_row public.source_records;
BEGIN
  IF caller IS NULL THEN
    RAISE EXCEPTION 'Authentication required' USING ERRCODE = '42501';
  END IF;
  IF NOT public.can_write_sources(caller) THEN
    RAISE EXCEPTION 'Not authorized to create sources' USING ERRCODE = '42501';
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
    'source.create', 'source_record', new_row.id::text, new_row.title,
    NULL, to_jsonb(new_row), NULL
  );
  RETURN new_row.id;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_source(_id uuid, _payload jsonb)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  caller uuid := auth.uid();
  before_row public.source_records;
  after_row public.source_records;
BEGIN
  IF caller IS NULL THEN
    RAISE EXCEPTION 'Authentication required' USING ERRCODE = '42501';
  END IF;
  IF NOT public.can_write_sources(caller) THEN
    RAISE EXCEPTION 'Not authorized to edit sources' USING ERRCODE = '42501';
  END IF;

  SELECT * INTO before_row FROM public.source_records WHERE id = _id;
  IF before_row.id IS NULL THEN
    RAISE EXCEPTION 'Source not found' USING ERRCODE = 'P0002';
  END IF;
  IF before_row.status = 'archived' THEN
    RAISE EXCEPTION 'Restore the source before editing' USING ERRCODE = '22023';
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
    'source.update', 'source_record', _id::text, after_row.title,
    to_jsonb(before_row), to_jsonb(after_row), NULL
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.archive_source(_id uuid)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  caller uuid := auth.uid();
  before_row public.source_records;
BEGIN
  IF caller IS NULL THEN RAISE EXCEPTION 'Authentication required' USING ERRCODE = '42501'; END IF;
  IF NOT public.can_archive_sources(caller) THEN
    RAISE EXCEPTION 'Not authorized to archive sources' USING ERRCODE = '42501';
  END IF;
  SELECT * INTO before_row FROM public.source_records WHERE id = _id;
  IF before_row.id IS NULL THEN RAISE EXCEPTION 'Source not found' USING ERRCODE = 'P0002'; END IF;
  IF before_row.status = 'archived' THEN RETURN; END IF;

  UPDATE public.source_records
    SET status = 'archived', archived_at = now(), updated_by = caller
    WHERE id = _id;

  PERFORM public.log_audit_event(
    'source.archive','source_record', _id::text, before_row.title,
    jsonb_build_object('status', before_row.status),
    jsonb_build_object('status','archived'), NULL
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.restore_source(_id uuid)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  caller uuid := auth.uid();
  before_row public.source_records;
BEGIN
  IF caller IS NULL THEN RAISE EXCEPTION 'Authentication required' USING ERRCODE = '42501'; END IF;
  IF NOT public.can_archive_sources(caller) THEN
    RAISE EXCEPTION 'Not authorized to restore sources' USING ERRCODE = '42501';
  END IF;
  SELECT * INTO before_row FROM public.source_records WHERE id = _id;
  IF before_row.id IS NULL THEN RAISE EXCEPTION 'Source not found' USING ERRCODE = 'P0002'; END IF;
  IF before_row.status <> 'archived' THEN RETURN; END IF;

  UPDATE public.source_records
    SET status = 'draft', archived_at = NULL, updated_by = caller
    WHERE id = _id;

  PERFORM public.log_audit_event(
    'source.restore','source_record', _id::text, before_row.title,
    jsonb_build_object('status','archived'),
    jsonb_build_object('status','draft'), NULL
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.set_source_verification(_id uuid, _verified boolean, _verification_date date)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  caller uuid := auth.uid();
  before_row public.source_records;
  new_status public.source_status;
  new_date date;
BEGIN
  IF caller IS NULL THEN RAISE EXCEPTION 'Authentication required' USING ERRCODE = '42501'; END IF;
  IF NOT public.can_verify_sources(caller) THEN
    RAISE EXCEPTION 'Not authorized to change verification status' USING ERRCODE = '42501';
  END IF;
  SELECT * INTO before_row FROM public.source_records WHERE id = _id;
  IF before_row.id IS NULL THEN RAISE EXCEPTION 'Source not found' USING ERRCODE = 'P0002'; END IF;
  IF before_row.status = 'archived' THEN
    RAISE EXCEPTION 'Cannot change verification on an archived source' USING ERRCODE = '22023';
  END IF;

  IF _verified THEN
    new_status := 'verified'::public.source_status;
    new_date := COALESCE(_verification_date, CURRENT_DATE);
  ELSE
    new_status := 'draft'::public.source_status;
    new_date := NULL;
  END IF;

  UPDATE public.source_records
    SET status = new_status,
        verification_date = new_date,
        updated_by = caller
    WHERE id = _id;

  PERFORM public.log_audit_event(
    'source.verification','source_record', _id::text, before_row.title,
    jsonb_build_object('status', before_row.status, 'verification_date', before_row.verification_date),
    jsonb_build_object('status', new_status, 'verification_date', new_date),
    NULL
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.link_source_to_content(
  _source_id uuid, _content_type text, _content_id text,
  _content_label text, _public_route text, _relationship_note text
) RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  caller uuid := auth.uid();
  new_id uuid;
  src public.source_records;
BEGIN
  IF caller IS NULL THEN RAISE EXCEPTION 'Authentication required' USING ERRCODE = '42501'; END IF;
  IF NOT public.can_write_sources(caller) THEN
    RAISE EXCEPTION 'Not authorized to link sources' USING ERRCODE = '42501';
  END IF;
  SELECT * INTO src FROM public.source_records WHERE id = _source_id;
  IF src.id IS NULL THEN RAISE EXCEPTION 'Source not found' USING ERRCODE = 'P0002'; END IF;

  INSERT INTO public.source_links(
    source_id, content_type, content_id, content_label, public_route, relationship_note, created_by
  ) VALUES (
    _source_id, _content_type, _content_id, _content_label,
    NULLIF(_public_route,''), NULLIF(_relationship_note,''), caller
  )
  ON CONFLICT (source_id, content_type, content_id) DO NOTHING
  RETURNING id INTO new_id;

  IF new_id IS NULL THEN
    RAISE EXCEPTION 'This source is already linked to that record' USING ERRCODE = '23505';
  END IF;

  PERFORM public.log_audit_event(
    'source.link','source_record', _source_id::text, src.title,
    NULL,
    jsonb_build_object('content_type', _content_type, 'content_id', _content_id, 'content_label', _content_label),
    NULL
  );
  RETURN new_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.unlink_source_from_content(_link_id uuid)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  caller uuid := auth.uid();
  lnk public.source_links;
  src public.source_records;
BEGIN
  IF caller IS NULL THEN RAISE EXCEPTION 'Authentication required' USING ERRCODE = '42501'; END IF;
  IF NOT public.can_write_sources(caller) THEN
    RAISE EXCEPTION 'Not authorized to unlink sources' USING ERRCODE = '42501';
  END IF;
  SELECT * INTO lnk FROM public.source_links WHERE id = _link_id;
  IF lnk.id IS NULL THEN RETURN; END IF;
  SELECT * INTO src FROM public.source_records WHERE id = lnk.source_id;

  DELETE FROM public.source_links WHERE id = _link_id;

  PERFORM public.log_audit_event(
    'source.unlink','source_record', lnk.source_id::text, COALESCE(src.title, lnk.content_label),
    jsonb_build_object('content_type', lnk.content_type, 'content_id', lnk.content_id, 'content_label', lnk.content_label),
    NULL, NULL
  );
END;
$$;

REVOKE EXECUTE ON FUNCTION public.create_source(jsonb)             FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.update_source(uuid, jsonb)       FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.archive_source(uuid)             FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.restore_source(uuid)             FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.set_source_verification(uuid, boolean, date) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.link_source_to_content(uuid, text, text, text, text, text) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.unlink_source_from_content(uuid) FROM PUBLIC, anon;

GRANT EXECUTE ON FUNCTION public.create_source(jsonb)             TO authenticated;
GRANT EXECUTE ON FUNCTION public.update_source(uuid, jsonb)       TO authenticated;
GRANT EXECUTE ON FUNCTION public.archive_source(uuid)             TO authenticated;
GRANT EXECUTE ON FUNCTION public.restore_source(uuid)             TO authenticated;
GRANT EXECUTE ON FUNCTION public.set_source_verification(uuid, boolean, date) TO authenticated;
GRANT EXECUTE ON FUNCTION public.link_source_to_content(uuid, text, text, text, text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.unlink_source_from_content(uuid) TO authenticated;
