/**
 * Curator Portal shell — sidebar + top header + breadcrumbs + mobile drawer.
 *
 * Loaded ONLY by /curator routes. Applies a `[data-portal="curator"]`
 * attribute so portal-scoped CSS tokens in styles.css take effect and never
 * leak into the public museum.
 */

import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  LayoutDashboard,
  Library,
  Map as MapIcon,
  BookOpen,
  Image as ImageIcon,
  ShieldCheck,
  GitBranch,
  PackageCheck,
  Scale,
  Activity,
  Compass,
  Settings as SettingsIcon,
  Menu,
  X,
  Search,
  Bell,
  User,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

const NAV: { to: string; label: string; icon: typeof LayoutDashboard; exact?: boolean }[] = [
  { to: "/curator", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/curator/content", label: "Content", icon: Library },
  { to: "/curator/coverage", label: "Coverage", icon: MapIcon },
  { to: "/curator/sources", label: "Sources", icon: BookOpen },
  { to: "/curator/media", label: "Media", icon: ImageIcon },
  { to: "/curator/quality", label: "Quality", icon: ShieldCheck },
  { to: "/curator/roadmap", label: "Roadmap", icon: GitBranch },
  { to: "/curator/releases", label: "Releases", icon: PackageCheck },
  { to: "/curator/decisions", label: "Decisions", icon: Scale },
  { to: "/curator/technical", label: "Technical Health", icon: Activity },
  { to: "/curator/blueprint", label: "Master Blueprint", icon: Compass },
  { to: "/curator/settings", label: "Settings", icon: SettingsIcon },
];

export function CuratorShell() {
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const [collapsed, setCollapsed] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

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
      label: s === "curator" ? "Curator Portal" : s.replace(/-/g, " "),
      href: "/" + segs.slice(0, i + 1).join("/"),
    }));
  }, [pathname]);

  return (
    <div data-portal="curator" data-portal-theme={theme} className="cp-root min-h-dvh">
      <a href="#curator-main" className="cp-skip">Skip to main content</a>

      {/* Mobile drawer */}
      {drawer && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={() => setDrawer(false)}
          aria-hidden
        />
      )}
      <aside
        className={`cp-sidebar ${collapsed ? "cp-sidebar--collapsed" : ""} ${drawer ? "cp-sidebar--open" : ""}`}
        aria-label="Curator Portal navigation"
      >
        <div className="cp-sidebar__brand">
          <div className="cp-brand-mark" aria-hidden>DZ</div>
          {!collapsed && (
            <div className="cp-brand-text">
              <div className="cp-brand-title">Curator Portal</div>
              <div className="cp-brand-sub">DZ Odyssey · internal</div>
            </div>
          )}
        </div>
        <nav className="cp-nav" aria-label="Sections">
          <ul>
            {NAV.map((item) => {
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

          <label className="cp-search">
            <Search className="h-4 w-4" aria-hidden />
            <input
              type="search"
              placeholder="Search portal…"
              aria-label="Search portal"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const q = (e.currentTarget.value || "").trim();
                  if (q.length > 0) {
                    // Navigate via location — inventory search lives on /curator/content
                    window.location.href = `/curator/content?q=${encodeURIComponent(q)}`;
                  }
                }
              }}
            />
          </label>

          <button
            type="button"
            className="cp-icon-btn"
            onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            <span aria-hidden>{theme === "dark" ? "◐" : "◑"}</span>
          </button>

          <button type="button" className="cp-icon-btn" aria-label="Notifications">
            <Bell className="h-5 w-5" aria-hidden />
          </button>

          <div className="cp-profile" title="Profile — Phase 2">
            <User className="h-4 w-4" aria-hidden />
            <span className="hidden sm:inline">Curator (dev)</span>
          </div>
        </header>

        <TempAccessBanner />

        <main id="curator-main" className="cp-content" tabIndex={-1}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function TempAccessBanner() {
  return (
    <div className="cp-temp-banner" role="status">
      <strong>Temporary development access.</strong>
      &nbsp;Real role-based authentication will replace this gate in Phase 2.
    </div>
  );
}
