import { createFileRoute, notFound } from "@tanstack/react-router";
import { NotFoundView } from "@/components/NotFoundView";
import { headLang, pageMeta } from "@/lib/seo";

/**
 * Catch-all 404 route.
 *
 * The loader throws `notFound()` so TanStack Start's SSR response carries a
 * real HTTP 404 (router.stores.statusCode) instead of a soft 200. The screen
 * itself renders from `notFoundComponent`. `pageMeta` omits the canonical
 * link for noindex pages, so a 404 never claims the homepage URL, and this
 * head() replaces whatever metadata the previous route had.
 */
const NOT_FOUND_META = {
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
};

export const Route = createFileRoute("/$")({
  loader: () => {
    throw notFound();
  },
  head: ({ match }) =>
    pageMeta({
      lang: headLang(match),
      path: "/404",
      title: NOT_FOUND_META.title,
      description: NOT_FOUND_META.description,
      noindex: true,
    }),
  component: NotFoundView,
  notFoundComponent: NotFoundView,
  errorComponent: NotFoundView,
});
