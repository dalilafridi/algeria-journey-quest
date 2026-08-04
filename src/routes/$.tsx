import { createFileRoute, Link } from "@tanstack/react-router";
import { getLang, tu } from "@/lib/i18n";
import { pageMeta, headLang } from "@/lib/seo";

/**
 * Catch-all 404 route.
 *
 * It exists so unmatched URLs get their own noindex head instead of
 * inheriting the site-wide defaults. `pageMeta` omits the canonical link for
 * noindex pages, so a 404 never claims the homepage URL.
 */
export const Route = createFileRoute("/$")({
  head: ({ match }) =>
    pageMeta({
      lang: headLang(match),
      path: "/404",
      title: {
        en: "Page not found, DZ Odyssey",
        fr: "Page introuvable, DZ Odyssey",
        ar: "الصفحة غير موجودة، دي زد أوديسي",
      },
      description: {
        en: "This gallery does not exist. Return to the entrance hall of DZ Odyssey.",
        fr: "Cette salle n'existe pas. Revenez au hall d'entrée de DZ Odyssey.",
        ar: "هذه القاعة غير موجودة. عد إلى بهو الدخول في دي زد أوديسي.",
      },
      noindex: true,
    }),
  component: NotFoundRoute,
});

function NotFoundRoute() {
  const lang = getLang();
  return (
    <main id="main" tabIndex={-1} className="flex min-h-dvh items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">{tu("notFoundTitle", lang)}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{tu("notFoundBody", lang)}</p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {tu("goHome", lang)}
          </Link>
        </div>
      </div>
    </main>
  );
}
