/**
 * DZ Odyssey Studio — Museum Operating System shell.
 *
 * Phase 2B · Step 3: primary sidebar shows only operational
 * workspaces. Everything else is consolidated into "Planned Workspaces".
 * Global ⌘K search, keyboard hotkeys, and the notification bell are
 * mounted here.
 */

import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Gauge,
  Layers,
  Map as MapIcon,
  BookOpen,
  ShieldCheck,
  Compass,
  Settings as SettingsIcon,
  Languages,
  Trophy,
  Users,
  Menu,
  X,
  Search,
  User,
  ChevronsLeft,
  ChevronsRight,
  ExternalLink,
  LogOut,
  Inbox,
  Briefcase,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useStudioSession } from "./StudioSessionContext";
import { ROLE_LABEL, ROUTE_PERMISSIONS, roleIntersects } from "@/lib/curator-portal/permissions";
import { HotkeysProvider, useHotkeys } from "./HotkeysProvider";
import { GlobalSearchPalette } from "./GlobalSearchPalette";
import { NotificationBell } from "./NotificationBell";

interface NavItem { to: string; label: string; icon: typeof Gauge; exact?: boolean; group: string }

const NAV: NavItem[] = [
  // Operations — daily driver
  { to: "/curator", label: "Mission Control", icon: Gauge, exact: true, group: "Operations" },
  { to: "/curator/my-work", label: "My Work", icon: Briefcase, group: "Operations" },
  { to: "/curator/notifications", label: "Notifications", icon: Inbox, group: "Operations" },

  // Editorial — the workspaces that actually move content
  { to: "/curator/figures", label: "Historical Figure Drafts", icon: User, group: "Editorial" },
  { to: "/curator/sources", label: "Research Library", icon: BookOpen, group: "Editorial" },
  { to: "/curator/content", label: "Collections & Exhibits", icon: Layers, group: "Editorial" },
  { to: "/curator/coverage", label: "Museum Coverage", icon: MapIcon, group: "Editorial" },
  { to: "/curator/translations", label: "Translation Center", icon: Languages, group: "Editorial" },
  { to: "/curator/quality", label: "Curatorial Quality", icon: ShieldCheck, group: "Editorial" },
  { to: "/curator/football", label: "Football Studio", icon: Trophy, group: "Editorial" },

  // Governance — daily operational governance surfaces only
  { to: "/curator/team", label: "Team & Roles", icon: Users, group: "Governance" },
  { to: "/curator/audit-log", label: "Audit Log", icon: ShieldCheck, group: "Governance" },
  { to: "/curator/settings", label: "Settings", icon: SettingsIcon, group: "Governance" },
  { to: "/curator/profile", label: "My Profile", icon: User, group: "Governance" },

  // Everything else lives on the Planned page.
  { to: "/curator/planned", label: "Planned Workspaces", icon: Compass, group: "Reference" },
];

const GROUP_ORDER = ["Operations", "Editorial", "Governance", "Reference"];

export function CuratorShell() {
  return (
    <HotkeysProvider>
      <ShellBody />
      <GlobalSearchPalette />
    </HotkeysProvider>
  );
}

function ShellBody() {
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const [collapsed, setCollapsed] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const { openSearch } = useHotkeys();

  useEffect(() => {
    const saved = typeof window !== "undefined"
      ? (window.localStorage.getItem("curator-portal-theme") as "light" | "dark" | null)
      : null;
    if (saved) setTheme(saved);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("curator-portal-theme", theme);
    }
  }, [theme]);

  useEffect(() => { setDrawer(false); }, [pathname]);

  const crumbs = useMemo(() => {
    const segs = pathname.split("/").filter(Boolean);
    return segs.map((s, i) => ({
      label: s === "curator" ? "DZ Odyssey Studio" : s.replace(/-/g, " "),
      href: "/" + segs.slice(0, i + 1).join("/"),
    }));
  }, [pathname]);

  const session = useStudioSession();

  const visibleNav = useMemo(() => {
    return NAV.filter((n) => {
      const allowed = ROUTE_PERMISSIONS[n.to];
      if (!allowed || allowed.length === 0) return true;
      return roleIntersects(session.roles, allowed);
    });
  }, [session.roles]);

  const grouped = useMemo(() => {
    return GROUP_ORDER.map((g) => ({ group: g, items: visibleNav.filter((n) => n.group === g) }))
      .filter((g) => g.items.length > 0);
  }, [visibleNav]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    window.location.href = "/curator/sign-in";
  }

  return (
    <div data-portal="curator" data-portal-theme={theme} className="cp-root min-h-dvh">
      <a href="#curator-main" className="cp-skip">Skip to main content</a>

      {drawer && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={() => setDrawer(false)}
          aria-hidden
        />
      )}
      <aside
        className={`cp-sidebar ${collapsed ? "cp-sidebar--collapsed" : ""} ${drawer ? "cp-sidebar--open" : ""}`}
        aria-label="DZ Odyssey Studio navigation"
      >
        <div className="cp-sidebar__brand">
          <div className="cp-brand-mark" aria-hidden>DZ</div>
          {!collapsed && (
            <div className="cp-brand-text">
              <div className="cp-brand-title">DZ Odyssey Studio</div>
              <div className="cp-brand-sub">Museum Operating System</div>
            </div>
          )}
        </div>
        <nav className="cp-nav" aria-label="Sections">
          {grouped.map(({ group, items }) => (
            <div key={group} style={{ marginBottom: 10 }}>
              {!collapsed && (
                <div style={{ padding: "8px 10px 4px", fontSize: 10.5, letterSpacing: "0.09em", textTransform: "uppercase", color: "var(--cp-ink-soft)", opacity: 0.7 }}>
                  {group}
                </div>
              )}
              <ul>
                {items.map((item) => {
                  const active = item.exact
                    ? pathname === item.to
                    : pathname === item.to || pathname.startsWith(item.to + "/");
                  const Icon = item.icon;
                  return (
                    <li key={item.to}>
                      <Link
                        to={item.to as never}
                        className={`cp-nav__link ${active ? "cp-nav__link--active" : ""}`}
                        aria-current={active ? "page" : undefined}
                        title={collapsed ? item.label : undefined}
                      >
                        <Icon className="cp-nav__icon" aria-hidden />
                        {!collapsed && <span>{item.label}</span>}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
        <button
          type="button"
          onClick={() => setCollapsed((c) => !c)}
          className="cp-sidebar__collapse"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
          {!collapsed && <span>Collapse</span>}
        </button>
      </aside>

      <div className="cp-main">
        <header className="cp-header">
          <button
            type="button"
            className="cp-icon-btn md:hidden"
            onClick={() => setDrawer((d) => !d)}
            aria-label={drawer ? "Close navigation" : "Open navigation"}
            aria-expanded={drawer}
            aria-controls="cp-sidebar"
          >
            {drawer ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <nav className="cp-crumbs" aria-label="Breadcrumb">
            <ol>
              {crumbs.map((c, i) => (
                <li key={c.href}>
                  {i < crumbs.length - 1 ? (
                    <Link to={c.href as never}>{c.label}</Link>
                  ) : (
                    <span aria-current="page">{c.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <div className="cp-header__spacer" />

          <button
            type="button"
            onClick={openSearch}
            className="cp-search"
            aria-label="Open Studio search"
            title="Search (⌘K)"
            style={{ cursor: "pointer" }}
          >
            <Search className="h-4 w-4" aria-hidden />
            <span style={{ color: "var(--cp-ink-soft)", fontSize: 13 }}>Search Studio…</span>
            <kbd style={{
              marginLeft: "auto", fontSize: 10, padding: "2px 6px", border: "1px solid var(--cp-border)",
              borderRadius: 4, color: "var(--cp-ink-soft)", fontFamily: "inherit",
            }}>⌘K</kbd>
          </button>

          <a href="/" className="cp-view-public" title="Open the public museum in this tab">
            <ExternalLink className="h-4 w-4" aria-hidden />
            <span>View Public Museum</span>
          </a>

          <button
            type="button"
            className="cp-icon-btn"
            onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            <span aria-hidden>{theme === "dark" ? "◐" : "◑"}</span>
          </button>

          <NotificationBell />

          <Link
            to="/curator/profile"
            className="cp-profile"
            title={session.roles.map((r) => ROLE_LABEL[r]).join(", ") || "No Studio role"}
          >
            <User className="h-4 w-4" aria-hidden />
            <span className="hidden sm:inline">{session.displayName ?? session.email ?? "Studio user"}</span>
          </Link>

          <button
            type="button"
            className="cp-icon-btn"
            onClick={handleSignOut}
            aria-label="Sign out"
            title="Sign out"
          >
            <LogOut className="h-4 w-4" aria-hidden />
          </button>
        </header>

        <main id="curator-main" className="cp-content" tabIndex={-1}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
