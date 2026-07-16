# DZ Odyssey Studio — First-Administrator Bootstrap

DZ Odyssey Studio uses role-based access control. The `assign_role()` and
`revoke_role()` RPCs both require the caller to already hold
`museum_director` or `technical_administrator`. Before any such user
exists, no one can assign roles through the app.

Public self-registration is **disabled** at the Auth layer
(`disable_signup = true`). Accounts are created either through the
one-time in-app bootstrap flow below or by an administrator once one
exists.

## The exact bootstrap sequence

1. **Create your account (in-app).** Open `/curator/sign-in`. When the
   environment is empty (`auth.users` has zero rows), the page shows a
   **"Create the first Museum Director account"** form instead of the
   normal sign-in form. Enter an email and a password of at least 12
   characters and submit. This creates your `auth.users` row (email
   pre-confirmed) and, via the `handle_new_user` trigger, your
   `public.profiles` row. **No Studio role is granted at this stage.**

2. **Grant `museum_director`.** A workspace operator (someone with access
   to the Lovable Cloud SQL editor for this project) runs the following
   SQL, substituting the email you just used:

   ```sql
   INSERT INTO public.user_roles (user_id, role, assigned_by)
   SELECT id, 'museum_director'::public.app_role, id
   FROM auth.users
   WHERE email = 'director@example.org'
   ON CONFLICT (user_id, role) DO NOTHING;
   ```

   For a purely technical operator instead of a museum director, use
   `'technical_administrator'::public.app_role`.

3. **Sign in again.** Return to `/curator/sign-in` and sign in with the
   same email and password.

4. **Access DZ Odyssey Studio.** You will land on `/curator` (Mission
   Control). All subsequent role assignments happen through
   `/curator/team`, which goes through `assign_role()` / `revoke_role()`
   and:

   - Derives the caller from `auth.uid()` — never from the client.
   - Verifies the caller is a Studio administrator.
   - Refuses to remove the last remaining `museum_director` or
     `technical_administrator`.
   - Writes an `audit_log` row in the same transaction as the change.

## Confirmation query

```sql
SELECT u.email, ur.role, ur.assigned_at
FROM public.user_roles ur
JOIN auth.users u ON u.id = ur.user_id
ORDER BY ur.assigned_at DESC;
```

## What must NOT happen

- Do **not** hardcode the operator's email in application code.
- Do **not** paste this SQL into any browser-rendered page.
- Do **not** grant `INSERT`/`UPDATE`/`DELETE` on `public.user_roles` to
  the `authenticated` role — Phase 2A relies on RPC-only mutation.
- Do **not** widen `EXECUTE` on `log_audit_event` beyond `service_role`.
- Do **not** re-enable `disable_signup = false` in this phase. New
  accounts should be provisioned by an administrator (Phase 2B will add
  an invitation flow).

## After the first account exists

The `/curator/sign-in` page automatically hides the bootstrap form once
any `auth.users` row exists. Additional accounts must be created by a
Museum Director. Until the Phase 2B invitation workflow ships, an
operator with SQL editor access can create additional accounts using
the Supabase Admin API (Backend → Users) and then grant the appropriate
Studio role from `/curator/team`.

## Recovery

If every administrator is inadvertently locked out (extremely unlikely
because of the continuity guard), an operator with SQL editor access
can re-run step 2 to restore a Studio administrator. All such recovery
actions are visible in the SQL history and should be noted in Governance
& Decisions.

---

## Phase 2B Step 1 — Research Library (write-enabled)

The Research Library at `/curator/sources` is the first write-enabled Studio
workspace. Public museum content (the TypeScript files under `src/data/`)
remains unchanged.

### Tables
- `public.source_records` — catalogued research sources.
- `public.source_links` — many-to-many links from sources to public museum
  records (referenced by stable content ID; the public TS files are NOT
  written back).

### Enums
- `source_type`, `reliability_tier`, `rights_status`, `source_status`.

### Permission matrix

| Action                              | Roles                                                                     |
|-------------------------------------|---------------------------------------------------------------------------|
| Read sources                        | any Studio role                                                           |
| Create / edit / link / unlink       | museum_director, senior_curator, curator, researcher, fact_checker        |
| Archive / restore                   | museum_director, senior_curator, curator                                  |
| Verify / revert verification        | museum_director, senior_curator, fact_checker                             |
| Permanent delete                    | intentionally not exposed in-app                                          |

All writes flow through `SECURITY DEFINER` RPCs
(`create_source`, `update_source`, `archive_source`, `restore_source`,
`set_source_verification`, `link_source_to_content`,
`unlink_source_from_content`) that:
- derive the actor from `auth.uid()`
- re-verify role membership via `can_write_sources` /
  `can_archive_sources` / `can_verify_sources`
- write an `audit_log` row in the same transaction

RLS on `source_records` and `source_links` grants **SELECT to authenticated
Studio members only** and denies all direct writes — every mutation must
go through the RPCs above.

### Audit events

`source.create`, `source.update`, `source.archive`, `source.restore`,
`source.verification`, `source.link`, `source.unlink`.

Visible per-source at `/curator/sources/$sourceId` and in the global feed at
`/curator/audit-log`.
