import { Link } from "@tanstack/react-router";
import { getLang, t, tu } from "@/lib/i18n";

/**
 * Shared 404 body. Rendered by the catch-all route and by the root
 * notFoundComponent so both paths show the same museum-quality screen.
 * Semantics: one <main id="main">, a single H1, and accessible links back
 * into the museum. No canonical, no journey chrome.
 */
const HEADING = {
  en: "Page not found",
  fr: "Page introuvable",
  ar: "الصفحة غير موجودة",
};

const AREAS_LABEL = {
  en: "Or continue into the museum",
  fr: "Ou poursuivez la visite du musée",
  ar: "أو تابع زيارة المتحف",
};

const AREAS = [
  { to: "/timeline", label: { en: "Timeline", fr: "Chronologie", ar: "الخط الزمني" } },
  { to: "/atlas", label: { en: "Explore Algeria", fr: "Explorer l'Algérie", ar: "استكشف الجزائر" } },
  { to: "/figures", label: { en: "Hall of Legends", fr: "Panthéon", ar: "قاعة الرموز" } },
  { to: "/football", label: { en: "Hall of Football", fr: "Hall du football", ar: "قاعة كرة القدم" } },
  { to: "/culture", label: { en: "Culture", fr: "Culture", ar: "الثقافة" } },
] as const;

export function NotFoundView() {
  const lang = getLang();
  return (
    <main
      id="main"
      tabIndex={-1}
      className="flex min-h-dvh items-center justify-center bg-background px-4 py-16"
    >
      <div className="max-w-lg text-center">
        <p aria-hidden="true" className="text-7xl font-bold text-muted-foreground/60">
          404
        </p>
        <h1 className="mt-4 text-2xl font-semibold text-foreground">{t(HEADING, lang)}</h1>
        <p className="mt-3 text-sm text-muted-foreground">{tu("notFoundBody", lang)}</p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {tu("goHome", lang)}
          </Link>
        </div>
        <nav aria-label={t(AREAS_LABEL, lang)} className="mt-10">
          <h2 className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
            {t(AREAS_LABEL, lang)}
          </h2>
          <ul className="mt-4 flex flex-wrap justify-center gap-2">
            {AREAS.map((area) => (
              <li key={area.to}>
                <Link
                  to={area.to}
                  className="inline-flex rounded-full border border-border px-4 py-2 text-sm text-foreground transition-colors hover:bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  {t(area.label, lang)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </main>
  );
}
