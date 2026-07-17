/**
 * DZ Odyssey Studio — route permission matrix.
 *
 * Single source of truth used by:
 *  - the `_studio` pathless layout `beforeLoad` (server-enforced gate)
 *  - each protected page's `beforeLoad` (per-route authorization)
 *  - the sidebar (UX filtering only — never the security boundary)
 *
 * IMPORTANT: sidebar filtering is UX. Every server function that reads
 * privileged data must independently authorize with `requireStudioRoles(...)`.
 */

export type AppRole =
  | "museum_director"
  | "senior_curator"
  | "curator"
  | "researcher"
  | "fact_checker"
  | "translator"
  | "translation_reviewer"
  | "media_curator"
  | "rights_manager"
  | "accessibility_reviewer"
  | "educator"
  | "publisher"
  | "technical_administrator";

export const ALL_ROLES: AppRole[] = [
  "museum_director",
  "senior_curator",
  "curator",
  "researcher",
  "fact_checker",
  "translator",
  "translation_reviewer",
  "media_curator",
  "rights_manager",
  "accessibility_reviewer",
  "educator",
  "publisher",
  "technical_administrator",
];

export const ROLE_LABEL: Record<AppRole, string> = {
  museum_director: "Museum Director",
  senior_curator: "Senior Curator",
  curator: "Curator",
  researcher: "Researcher",
  fact_checker: "Fact Checker",
  translator: "Translator",
  translation_reviewer: "Translation Reviewer",
  media_curator: "Media Curator",
  rights_manager: "Rights Manager",
  accessibility_reviewer: "Accessibility Reviewer",
  educator: "Educator",
  publisher: "Publisher",
  technical_administrator: "Technical Administrator",
};

const ADMIN: AppRole[] = ["museum_director", "technical_administrator"];
const GOVERNANCE: AppRole[] = ["museum_director", "senior_curator", "technical_administrator"];

/**
 * Route path (URL, not route ID) → allowed roles. Empty array means
 * "any authenticated user with at least one Studio role".
 */
export const ROUTE_PERMISSIONS: Record<string, AppRole[]> = {
  "/curator": [],
  "/curator/content": ["museum_director", "senior_curator", "curator", "researcher", "fact_checker", "educator"],
  "/curator/figures": ["museum_director", "senior_curator", "curator", "researcher", "fact_checker", "translator", "translation_reviewer", "educator"],
  "/curator/figures/new": ["museum_director", "senior_curator", "curator", "researcher"],
  "/curator/coverage": [],
  "/curator/sources": ["museum_director", "senior_curator", "curator", "researcher", "fact_checker", "translator", "translation_reviewer", "media_curator", "rights_manager", "accessibility_reviewer", "educator", "publisher", "technical_administrator"],
  "/curator/sources/new": ["museum_director", "senior_curator", "curator", "researcher", "fact_checker"],
  "/curator/media": ["museum_director", "senior_curator", "media_curator", "rights_manager", "accessibility_reviewer"],
  "/curator/quality": ["museum_director", "senior_curator", "curator", "fact_checker", "translation_reviewer", "rights_manager", "accessibility_reviewer"],
  "/curator/translations": ["museum_director", "senior_curator", "translator", "translation_reviewer"],
  "/curator/football": ["museum_director", "senior_curator", "curator", "researcher"],
  "/curator/publishing": ["museum_director", "senior_curator", "publisher"],
  "/curator/analytics": ["museum_director", "senior_curator", "curator", "technical_administrator"],
  "/curator/contributors": ["museum_director", "senior_curator", "technical_administrator"],
  "/curator/education": ["museum_director", "senior_curator", "curator", "educator"],
  "/curator/preservation": ["museum_director", "technical_administrator", "media_curator", "rights_manager"],
  "/curator/acquisitions": ["museum_director", "senior_curator", "curator", "researcher", "rights_manager"],
  "/curator/roadmap": ["museum_director", "senior_curator", "curator", "technical_administrator"],
  "/curator/releases": ["museum_director", "senior_curator", "publisher", "technical_administrator"],
  "/curator/decisions": GOVERNANCE,
  "/curator/technical": ["museum_director", "senior_curator", "technical_administrator"],
  "/curator/blueprint": [],
  "/curator/settings": [],
  "/curator/profile": [],
  "/curator/team": ADMIN,
  "/curator/audit-log": GOVERNANCE,
};

export function roleIntersects(userRoles: AppRole[], allowed: AppRole[]): boolean {
  if (allowed.length === 0) return userRoles.length > 0;
  return userRoles.some((r) => allowed.includes(r));
}

export function canAccessRoute(pathname: string, userRoles: AppRole[]): boolean {
  const allowed = ROUTE_PERMISSIONS[pathname];
  if (!allowed) return userRoles.length > 0; // unknown Studio route → any Studio role
  return roleIntersects(userRoles, allowed);
}
