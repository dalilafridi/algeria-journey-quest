import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { LANGS, getLang, setLang, useLang, type Lang } from "@/lib/i18n";
import { OPEN_CREATOR_ABOUT_EVENT } from "@/components/WelcomeJourney";
import { openMuseumSearch } from "@/components/SearchOverlay";
import { NAV_SECTIONS, NAV_UI, type NavItem, type Tri } from "@/lib/navConfig";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import brandIcon from "@/assets/brand-icon.png";

const LANG_SHORT: Record<Lang, string> = { en: "EN", fr: "FR", ar: "AR" };
const LANG_LABEL: Record<Lang, string> = { en: "English", fr: "Français", ar: "العربية" };

const tri = (v: Tri, l: Lang) => v[l];

/* ---------------------------------------------------------------- icons */

function IconSearch(props: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={props.className} aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function IconPassport(props: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={props.className} aria-hidden>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <circle cx="12" cy="10" r="2.6" />
      <path d="M9 16.5h6" />
    </svg>
  );
}

function IconChevron(props: { open?: boolean; className?: string }) {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={(props.className ?? "") + " transition-transform " + (props.open ? "rotate-180" : "")} aria-hidden>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function IconMenu(props: { open?: boolean }) {
  return props.open ? (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ) : (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
      <line x1="3" y1="7" x2="21" y2="7" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="17" x2="21" y2="17" />
    </svg>
  );
}

/* ------------------------------------------------------------- helpers */

function itemProps(item: NavItem) {
  return {
    to: item.to as any,
    params: item.params as any,
    search: item.search as any,
    hash: item.hash,
  };
}

const GOLD_BORDER = "color-mix(in oklab, var(--brand-gold, var(--accent)) 34%, var(--border))";

/* -------------------------------------------------------------- header */

export function Header() {
  const lang = useLang();
  const current: Lang = lang ?? getLang();
  const path = useRouterState({ select: (s) => s.location.pathname });

  const [openSection, setOpenSection] = useState<string | null>(null);
  const [langOpen, setLangOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock background scroll while the mobile directory is open.
  useEffect(() => {
    if (!drawerOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [drawerOpen]);

  // Escape closes the drawer and restores focus to the menu button.
  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };
    window.addEventListener("keydown", onKey);
    drawerRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerOpen]);

  const closeDrawer = () => {
    setDrawerOpen(false);
    menuButtonRef.current?.focus();
  };

  const openAbout = () => {
    window.dispatchEvent(new Event(OPEN_CREATOR_ABOUT_EVENT));
    setDrawerOpen(false);
  };

  const isPassport = path.startsWith("/passport");
  const activeSectionId = NAV_SECTIONS.find((s) => s.match(path))?.id ?? null;

  const hoverOpen = (id: string) => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setOpenSection(id), 90);
  };
  const hoverClose = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
  };

  const utilityBtn =
    "inline-flex items-center gap-2 h-9 px-3 text-[0.8125rem] font-medium tracking-wide text-foreground/80 hover:text-foreground transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]";

  return (
    <header
      className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur-md"
      style={{ borderColor: GOLD_BORDER }}
    >
      {/* ------------------------------------------------ upper level */}
      <div
        className={
          "mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 motion-safe:transition-all motion-reduce:transition-none " +
          (scrolled ? "py-2" : "py-3.5 lg:py-5")
        }
      >
        <Link to="/" className="group flex min-w-0 items-center gap-3" aria-label={tri(NAV_UI.brandName, current)}>
          <span
            className={
              "relative inline-flex shrink-0 items-center justify-center rounded-full border bg-card shadow-sm motion-safe:transition-all " +
              (scrolled ? "h-9 w-9" : "h-10 w-10 lg:h-12 lg:w-12")
            }
            style={{ borderColor: GOLD_BORDER }}
          >
            <img src={brandIcon} alt="" className="h-2/3 w-2/3 rounded-full object-cover" />
          </span>
          <span className="flex min-w-0 flex-col leading-none">
            <span
              className={
                "truncate font-semibold uppercase text-foreground motion-safe:transition-all " +
                (scrolled ? "text-[0.95rem] tracking-[0.18em]" : "text-base lg:text-xl tracking-[0.22em]")
              }
              style={{ fontFamily: "Georgia, 'Iowan Old Style', 'Times New Roman', serif" }}
            >
              {tri(NAV_UI.brandName, current)}
            </span>
            <span
              className={
                "mt-1 truncate text-[0.6875rem] uppercase tracking-[0.16em] text-muted-foreground motion-safe:transition-all " +
                (scrolled ? "hidden sm:block" : "block")
              }
            >
              {tri(NAV_UI.brandSub, current)}
            </span>
          </span>
        </Link>

        {/* utilities */}
        <div className="flex items-center gap-1 sm:gap-2">
          <button type="button" onClick={openMuseumSearch} className={utilityBtn} title={tri(NAV_UI.search, current) + " (⌘K)"}>
            <IconSearch />
            <span className="hidden sm:inline">{tri(NAV_UI.search, current)}</span>
            <span className="sr-only sm:hidden">{tri(NAV_UI.search, current)}</span>
          </button>

          <span className="hidden h-5 w-px bg-border sm:inline-block" aria-hidden />

          <DropdownMenu open={langOpen} onOpenChange={setLangOpen}>
            <DropdownMenuTrigger asChild>
              <button type="button" className={utilityBtn} aria-label={tri(NAV_UI.language, current)}>
                <span className="font-semibold tracking-[0.12em]">{LANG_SHORT[current]}</span>
                <IconChevron open={langOpen} className="opacity-60" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align={current === "ar" ? "start" : "end"}
              sideOffset={10}
              className="min-w-[170px] rounded-none border bg-popover p-1 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.5)]"
              style={{ borderColor: GOLD_BORDER }}
            >
              {LANGS.map((l) => (
                <DropdownMenuItem
                  key={l.code}
                  lang={l.code}
                  onSelect={() => setLang(l.code)}
                  aria-current={current === l.code ? "true" : undefined}
                  className={
                    "min-h-11 cursor-pointer rounded-none px-3 py-2.5 text-sm " +
                    (l.code === "ar" ? "justify-end text-right" : "justify-start text-left") +
                    (current === l.code ? " font-semibold text-foreground" : " text-muted-foreground")
                  }
                >
                  {LANG_LABEL[l.code]}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <span className="hidden h-5 w-px bg-border sm:inline-block" aria-hidden />

          <Link
            to="/passport"
            className={
              "hidden items-center gap-2 border px-3.5 py-2 text-[0.8125rem] font-medium tracking-wide transition-colors sm:inline-flex " +
              (isPassport ? "text-foreground" : "text-foreground/80 hover:text-foreground")
            }
            style={{
              borderColor: GOLD_BORDER,
              background: isPassport ? "color-mix(in oklab, var(--brand-gold, var(--accent)) 12%, transparent)" : "transparent",
            }}
            aria-current={isPassport ? "page" : undefined}
          >
            <IconPassport />
            {tri(NAV_UI.passport, current)}
          </Link>

          {/* mobile menu button */}
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => (drawerOpen ? closeDrawer() : setDrawerOpen(true))}
            aria-expanded={drawerOpen}
            aria-controls="museum-directory"
            aria-label={tri(NAV_UI.menu, current)}
            className="inline-flex h-11 w-11 items-center justify-center border text-foreground lg:hidden"
            style={{ borderColor: GOLD_BORDER }}
          >
            <IconMenu open={drawerOpen} />
          </button>
        </div>
      </div>

      {/* ------------------------------------------------ lower level */}
      <nav
        className="hidden border-t lg:block"
        style={{ borderColor: "color-mix(in oklab, var(--brand-gold, var(--accent)) 18%, var(--border))" }}
        aria-label={tri(NAV_UI.directory, current)}
      >
        <ul className="mx-auto flex max-w-6xl items-stretch gap-1 px-4 sm:px-6">
          {NAV_SECTIONS.map((section) => {
            const active = activeSectionId === section.id;
            const open = openSection === section.id;
            return (
              <li
                key={section.id}
                className="relative"
                onMouseEnter={() => hoverOpen(section.id)}
                onMouseLeave={() => {
                  hoverClose();
                  setOpenSection((cur) => (cur === section.id ? null : cur));
                }}
              >
                <div className="flex items-center">
                  <Link
                    to={section.to as any}
                    className={
                      "relative py-3 ps-3 pe-1 text-[0.875rem] tracking-wide transition-colors " +
                      (active ? "font-semibold text-foreground" : "text-foreground/75 hover:text-foreground")
                    }
                    aria-current={active ? "page" : undefined}
                  >
                    {tri(section.label, current)}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-x-3 bottom-0 h-px"
                      style={{ background: active ? "var(--brand-gold, var(--accent))" : "transparent" }}
                    />
                  </Link>
                  <DropdownMenu
                    open={open}
                    onOpenChange={(v) => setOpenSection(v ? section.id : null)}
                    modal={false}
                  >
                    <DropdownMenuTrigger asChild>
                      <button
                        type="button"
                        className="py-3 pe-3 ps-0.5 text-foreground/60 hover:text-foreground"
                        aria-label={tri(section.label, current) + " " + tri(NAV_UI.menu, current)}
                      >
                        <IconChevron open={open} />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align={current === "ar" ? "end" : "start"}
                      sideOffset={0}
                      collisionPadding={16}
                      className="rounded-none border p-3 shadow-[0_18px_44px_-30px_rgba(0,0,0,0.55)]"
                      style={{
                        borderColor: GOLD_BORDER,
                        background: "var(--popover)",
                        maxWidth: "min(94vw, 44rem)",
                      }}
                    >
                      <p className="px-2 pb-2 text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                        {tri(section.label, current)}
                      </p>
                      <div className={section.columns === 2 ? "grid grid-cols-2 gap-x-4" : "flex w-[19rem] flex-col"}>
                        {section.items.map((item) => (
                          <DropdownMenuItem key={item.to + (item.hash ?? "") + item.label.en} asChild>
                            <Link
                              {...itemProps(item)}
                              className="block cursor-pointer rounded-none px-2 py-2.5 text-sm text-foreground/85 transition-colors hover:bg-muted hover:text-foreground focus:bg-muted"
                            >
                              <span className="block font-medium">{tri(item.label, current)}</span>
                              {item.desc ? (
                                <span className="mt-0.5 block text-[0.75rem] leading-snug text-muted-foreground">
                                  {tri(item.desc, current)}
                                </span>
                              ) : null}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* ------------------------------------------ mobile directory */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label={tri(NAV_UI.close, current)}
            className="absolute inset-0 bg-foreground/25"
            onClick={closeDrawer}
          />
          <div
            id="museum-directory"
            ref={drawerRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label={tri(NAV_UI.directory, current)}
            className="absolute inset-y-0 end-0 flex w-full max-w-[26rem] flex-col border-s bg-background outline-none"
            style={{ borderColor: GOLD_BORDER, paddingBottom: "env(safe-area-inset-bottom)" }}
          >
            <div className="flex items-center justify-between border-b px-4 py-3" style={{ borderColor: GOLD_BORDER }}>
              <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {tri(NAV_UI.directory, current)}
              </span>
              <button
                type="button"
                onClick={closeDrawer}
                aria-label={tri(NAV_UI.close, current)}
                className="inline-flex h-11 w-11 items-center justify-center text-foreground"
              >
                <IconMenu open />
              </button>
            </div>

            <div className="flex items-center gap-2 border-b px-4 py-3" style={{ borderColor: "var(--border)" }}>
              <Link
                to="/passport"
                onClick={closeDrawer}
                className="inline-flex flex-1 items-center justify-center gap-2 border px-3 py-2.5 text-sm font-medium text-foreground"
                style={{ borderColor: GOLD_BORDER }}
              >
                <IconPassport />
                {tri(NAV_UI.passport, current)}
              </Link>
              <div className="flex items-center gap-1" role="group" aria-label={tri(NAV_UI.language, current)}>
                {LANGS.map((l) => (
                  <button
                    key={l.code}
                    type="button"
                    lang={l.code}
                    onClick={() => setLang(l.code)}
                    aria-current={current === l.code ? "true" : undefined}
                    className={
                      "min-h-11 min-w-11 border px-2 text-sm " +
                      (current === l.code ? "font-semibold text-foreground" : "text-muted-foreground")
                    }
                    style={{
                      borderColor: current === l.code ? GOLD_BORDER : "var(--border)",
                      background: current === l.code ? "color-mix(in oklab, var(--brand-gold, var(--accent)) 12%, transparent)" : "transparent",
                    }}
                  >
                    {LANG_SHORT[l.code]}
                  </button>
                ))}
              </div>
            </div>

            <nav className="flex-1 overflow-y-auto overscroll-contain px-2 py-2" aria-label={tri(NAV_UI.directory, current)}>
              {NAV_SECTIONS.map((section) => {
                const isOpen = expanded === section.id;
                const active = activeSectionId === section.id;
                return (
                  <div key={section.id} className="border-b" style={{ borderColor: "var(--border)" }}>
                    <div className="flex items-stretch">
                      <Link
                        to={section.to as any}
                        onClick={closeDrawer}
                        className={
                          "flex-1 px-3 py-3.5 text-base " +
                          (active ? "font-semibold text-foreground" : "text-foreground/85")
                        }
                        aria-current={active ? "page" : undefined}
                      >
                        {tri(section.label, current)}
                      </Link>
                      <button
                        type="button"
                        onClick={() => setExpanded(isOpen ? null : section.id)}
                        aria-expanded={isOpen}
                        aria-controls={`dir-${section.id}`}
                        aria-label={tri(section.label, current) + " " + tri(NAV_UI.menu, current)}
                        className="inline-flex h-12 w-12 items-center justify-center text-foreground/70"
                      >
                        <IconChevron open={isOpen} className="scale-125" />
                      </button>
                    </div>
                    {isOpen && (
                      <ul id={`dir-${section.id}`} className="pb-2 ps-3">
                        {section.items.map((item) => (
                          <li key={item.to + (item.hash ?? "") + item.label.en}>
                            <Link
                              {...itemProps(item)}
                              onClick={closeDrawer}
                              className="block border-s ps-3 py-2.5 text-sm text-foreground/85"
                              style={{ borderColor: "var(--border)" }}
                            >
                              {tri(item.label, current)}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}

              <button
                type="button"
                onClick={openAbout}
                className="w-full px-3 py-3.5 text-start text-base text-foreground/85"
              >
                {tri(NAV_UI.creatorNote, current)}
              </button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
