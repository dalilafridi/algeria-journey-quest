import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { resetAllQuizProgress } from "@/lib/progress";
import { LANGS, getLang, setLang, useLang, type Lang } from "@/lib/i18n";
import { OPEN_CREATOR_ABOUT_EVENT } from "@/components/WelcomeJourney";
import brandIcon from "@/assets/brand-icon.png";

const LANG_LABEL: Record<Lang, string> = {
  fr: "Français",
  en: "English",
  ar: "العربية",
};

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const lang = useLang();
  const navigate = useNavigate();
  const langRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [menuOpen]);

  // Close popovers on outside click
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const current: Lang = lang ?? getLang();

  const T = {
    journey: { fr: "Parcours", en: "Journey", ar: "الرحلة" }[current],
    figures: { fr: "Figures", en: "Figures", ar: "الشخصيات" }[current],
    regions: { fr: "Régions", en: "Regions", ar: "المناطق" }[current],
    words: { fr: "Paroles", en: "Words", ar: "كلمات" }[current],
    moments: { fr: "Moments", en: "Moments", ar: "لحظات" }[current],
    appName: { fr: "Algeria Through Time", en: "Algeria Through Time", ar: "Algeria Through Time" }[current],
    myProgress: { fr: "Ma progression", en: "My Progress", ar: "تقدّمي" }[current],
    settings: { fr: "Paramètres", en: "Settings", ar: "الإعدادات" }[current],
    about: { fr: "À propos", en: "About", ar: "حول" }[current],
    resetQuizzes: { fr: "Réinitialiser les quiz", en: "Reset Quizzes", ar: "إعادة ضبط الاختبارات" }[current],
    confirmReset: {
      fr: "Réinitialiser tout le progrès des quiz ?",
      en: "Reset all quiz progress?",
      ar: "إعادة ضبط كل تقدّم الاختبارات؟",
    }[current],
  };

  const navLinks = [
    { to: "/timeline" as const, label: T.journey },
    { to: "/figures" as const, label: T.figures },
    { to: "/map" as const, label: T.regions },
    { to: "/words" as const, label: T.words },
    { to: "/moments" as const, label: T.moments },
  ];

  const handleReset = () => {
    if (typeof window !== "undefined" && window.confirm(T.confirmReset)) {
      resetAllQuizProgress();
    }
    setProfileOpen(false);
  };

  const openAbout = () => {
    window.dispatchEvent(new Event(OPEN_CREATOR_ABOUT_EVENT));
    setProfileOpen(false);
    setMenuOpen(false);
  };

  const linkClass =
    "text-sm font-medium text-muted-foreground hover:text-foreground transition-all whitespace-nowrap rounded-full px-3 py-2";
  const activeLinkClass =
    linkClass + " text-foreground bg-muted shadow-[inset_0_0_0_1px_var(--border)]";

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-3 sm:px-5 py-3 flex items-center justify-between gap-3 lg:gap-6">
        <Link
          to="/"
          className="flex items-center gap-2.5 min-w-0 group"
          onClick={() => setMenuOpen(false)}
          aria-label={T.appName}
        >
          <span className="relative inline-flex w-9 h-9 items-center justify-center rounded-full border border-border bg-card shadow-sm transition-transform group-hover:scale-[1.02]">
            <img src={brandIcon} alt="" className="w-6 h-6 rounded-full object-cover" />
          </span>
          <span className="flex min-w-0 items-baseline gap-1.5">
            <span className="hidden sm:inline truncate text-sm font-semibold tracking-wide text-foreground lg:text-base">
              {T.appName}
            </span>
            <span className="hidden md:inline text-sm text-accent-foreground" aria-hidden>
              ⵣ
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6 flex-1 justify-center">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={linkClass}
              activeProps={{ className: activeLinkClass }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language dropdown */}
          <div className="relative" ref={langRef}>
            <button
              type="button"
              onClick={() => {
                setLangOpen((v) => !v);
                setProfileOpen(false);
              }}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full border border-border bg-card text-sm font-medium text-foreground hover:bg-muted transition-colors"
              aria-label="Select language"
              aria-expanded={langOpen}
            >
              <span aria-hidden>🌐</span>
              <span className="hidden sm:inline">{LANG_LABEL[current]}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-60">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {langOpen && (
              <div className="absolute right-0 mt-2 min-w-[170px] rounded-xl border border-border bg-popover shadow-lg overflow-hidden animate-float-up">
                {LANGS.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLang(l.code);
                      setLangOpen(false);
                    }}
                    className={
                      "w-full px-3 py-2.5 text-sm hover:bg-muted transition-colors " +
                      (l.code === "ar" ? "text-right" : "text-left") +
                      " " +
                      (current === l.code ? "text-foreground font-semibold" : "text-muted-foreground")
                    }
                  >
                    {LANG_LABEL[l.code]}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={openAbout}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-card text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            <span aria-hidden>ℹ️</span>
            {T.about}
          </button>

          {/* Profile dropdown — desktop */}
          <div className="relative hidden lg:block" ref={profileRef}>
            <button
              type="button"
              onClick={() => {
                setProfileOpen((v) => !v);
                setLangOpen(false);
              }}
              className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-border bg-card text-foreground hover:bg-muted transition-colors"
              aria-label="Profile menu"
              aria-expanded={profileOpen}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>
            {profileOpen && (
              <div className="absolute right-0 mt-2 min-w-[200px] rounded-xl border border-border bg-popover shadow-lg overflow-hidden animate-float-up">
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    navigate({ to: "/profile" });
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                >
                  {T.myProgress}
                </button>
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    navigate({ to: "/profile" });
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                >
                  {T.settings}
                </button>
                <div className="h-px bg-border" />
                <button
                  onClick={openAbout}
                  className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors flex items-center gap-2"
                >
                  <span aria-hidden>ℹ️</span>
                  {T.about}
                </button>
                <button
                  onClick={handleReset}
                  className="w-full text-left px-3 py-2 text-sm text-destructive hover:bg-muted transition-colors"
                >
                  {T.resetQuizzes}
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl border border-border bg-card text-foreground active:scale-95 transition"
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {menuOpen && (
        <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-md animate-float-up">
          <nav className="max-w-5xl mx-auto px-3 py-2 flex flex-col">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setMenuOpen(false)}
                className="px-3 py-3 rounded-xl text-base font-medium text-foreground hover:bg-muted active:bg-muted transition"
              >
                {l.label}
              </Link>
            ))}
            <div className="h-px bg-border my-1 mx-3" />
            <Link
              to="/profile"
              onClick={() => setMenuOpen(false)}
              className="px-3 py-3 rounded-xl text-base font-medium text-foreground hover:bg-muted active:bg-muted transition flex items-center gap-2"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              {T.myProgress}
            </Link>
            <button
              onClick={openAbout}
              className="text-left px-3 py-3 rounded-xl text-base font-medium text-foreground hover:bg-muted transition flex items-center gap-2"
            >
              <span aria-hidden>ℹ️</span>
              {T.about}
            </button>
            <button
              onClick={() => {
                setMenuOpen(false);
                handleReset();
              }}
              className="text-left px-3 py-3 rounded-xl text-base font-medium text-destructive hover:bg-muted transition"
            >
              {T.resetQuizzes}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
