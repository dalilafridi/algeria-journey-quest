create table if not exists public.monitoring_events (
  id uuid primary key default gen_random_uuid(),
  event_type text not null check (event_type in ('js_error','unhandled_rejection','failed_request','broken_image','not_found','manual')),
  severity text not null default 'error' check (severity in ('error','warning','info')),
  message text not null,
  route text,
  page_url text,
  resource_url text,
  status_code integer,
  stack text,
  user_agent text,
  language text,
  viewport text,
  environment text not null default 'production',
  fingerprint text not null,
  occurred_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index if not exists monitoring_events_occurred_idx on public.monitoring_events (occurred_at desc);
create index if not exists monitoring_events_fingerprint_idx on public.monitoring_events (fingerprint, occurred_at desc);
create index if not exists monitoring_events_type_idx on public.monitoring_events (event_type, occurred_at desc);

create table if not exists public.monitoring_alerts (
  id uuid primary key default gen_random_uuid(),
  kind text not null,
  summary text not null,
  event_count integer not null default 0,
  window_minutes integer not null default 15,
  recipient text,
  delivered boolean not null default false,
  delivery_error text,
  acknowledged_at timestamptz,
  triggered_at timestamptz not null default now()
);

create index if not exists monitoring_alerts_triggered_idx on public.monitoring_alerts (triggered_at desc);

create table if not exists public.monitoring_alert_settings (
  id boolean primary key default true check (id),
  enabled boolean not null default true,
  alert_email text,
  error_threshold integer not null default 10,
  window_minutes integer not null default 15,
  last_alert_at timestamptz,
  updated_at timestamptz not null default now()
);

insert into public.monitoring_alert_settings (id) values (true) on conflict (id) do nothing;

grant select on public.monitoring_events to authenticated;
grant select, update on public.monitoring_alerts to authenticated;
grant select, update on public.monitoring_alert_settings to authenticated;
grant all on public.monitoring_events to service_role;
grant all on public.monitoring_alerts to service_role;
grant all on public.monitoring_alert_settings to service_role;

alter table public.monitoring_events enable row level security;
alter table public.monitoring_alerts enable row level security;
alter table public.monitoring_alert_settings enable row level security;

create policy "Studio oversight can read monitoring events"
  on public.monitoring_events for select to authenticated
  using (
    public.is_studio_admin(auth.uid())
    or public.has_role(auth.uid(), 'senior_curator')
  );

create policy "Studio oversight can read monitoring alerts"
  on public.monitoring_alerts for select to authenticated
  using (
    public.is_studio_admin(auth.uid())
    or public.has_role(auth.uid(), 'senior_curator')
  );

create policy "Studio oversight can acknowledge monitoring alerts"
  on public.monitoring_alerts for update to authenticated
  using (
    public.is_studio_admin(auth.uid())
    or public.has_role(auth.uid(), 'senior_curator')
  )
  with check (
    public.is_studio_admin(auth.uid())
    or public.has_role(auth.uid(), 'senior_curator')
  );

create policy "Studio oversight can read alert settings"
  on public.monitoring_alert_settings for select to authenticated
  using (
    public.is_studio_admin(auth.uid())
    or public.has_role(auth.uid(), 'senior_curator')
  );

create policy "Studio admins can change alert settings"
  on public.monitoring_alert_settings for update to authenticated
  using (public.is_studio_admin(auth.uid()))
  with check (public.is_studio_admin(auth.uid()));