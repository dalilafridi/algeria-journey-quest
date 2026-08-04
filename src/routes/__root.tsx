import { Outlet, Link, createRootRoute, HeadContent, Scripts, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { toast } from "sonner";

import appCss from "../styles.css?url";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { SplashScreen } from "@/components/brand/SplashScreen";
import { SignatureIntro } from "@/components/brand/SignatureIntro";
import { WelcomeJourney } from "@/components/WelcomeJourney";
import { ContinueJourneyCard } from "@/components/ContinueJourneyCard";
import { JourneyHud } from "@/components/JourneyHud";
import { BackToTop } from "@/components/BackToTop";
import { MuseumDock } from "@/components/MuseumDock";
import { SiteFooter } from "@/components/SiteFooter";
import { MotionReveal } from "@/components/MotionReveal";
import { SearchOverlay } from "@/components/SearchOverlay";
import { SkipLink, LangSync } from "@/components/A11y";
import { AudioGuideProvider } from "@/lib/audioGuide";
import { AudioMiniPlayer } from "@/components/audio/AudioGuide";
import { AskCurator } from "@/components/curator/AskCurator";
import { PassportTracker } from "@/components/PassportTracker";
import { getLang, tu } from "@/lib/i18n";


function NotFoundComponent() {
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

import { resolveInitialLang } from "@/lib/lang-server";
import type { Lang } from "@/lib/i18n";

export const Route = createRootRoute({
  // Publishes the active language on the router context so every route's
  // head() can emit localized title / description / og tags. Server side it
  // resolves from the dzo_lang cookie, client side from the saved choice.
  beforeLoad: async (): Promise<{ lang: Lang }> => {
    if (typeof window === "undefined") {
      return { lang: await resolveInitialLang() };
    }
    return { lang: getLang() };
  },
  loader: ({ context }): { lang: Lang } => ({ lang: context.lang }),
  head: ({ match }) => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=5" },
      { name: "theme-color", content: "#1a1410" },
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      { title: "DZ Odyssey, Algeria Through Time" },
      {
        name: "description",
        content:
          "DZ Odyssey, a cinematic museum passage through Algeria's eras, regions, figures and culture, from Numidia to independence.",
      },
      { name: "author", content: "DZ Odyssey" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "DZ Odyssey" },
      // NOTE (Phase 1): og:image and twitter:image intentionally live only on
      // leaf routes via `pageMeta({
      lang: headLang(match),...})`.
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  const { lang } = Route.useLoaderData();
  const dir = lang === "ar" ? "rtl" : "ltr";
  return (
    <html lang={lang} dir={dir}>
      <head>
        <HeadContent />
        {/* Cookie is authoritative for SSR/hydration. If a stale
            localStorage value disagrees with the cookie, sync localStorage
            TO the cookie rather than flipping the rendered language.
            Only fall back to localStorage if the cookie is absent. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var K='algeria-history-lang-v1';var m=/(?:^|;\\s*)dzo_lang=(en|fr|ar)/.exec(document.cookie||'');var c=m?m[1]:null;var l=localStorage.getItem(K);if(c){if(l!==c){localStorage.setItem(K,c);}}else if(l==='en'||l==='fr'||l==='ar'){document.documentElement.lang=l;document.documentElement.dir=(l==='ar')?'rtl':'ltr';document.cookie='dzo_lang='+l+'; path=/; max-age=31536000; samesite=lax';}}catch(e){}})();",
          }}
        />

      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const isCurator = pathname === "/curator" || pathname.startsWith("/curator/");

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      toast(tu("contentProtected", getLang()), { duration: 1500 });
    };
    document.addEventListener("contextmenu", handleContextMenu);
    return () => document.removeEventListener("contextmenu", handleContextMenu);
  }, []);

  if (isCurator) {
    return (
      <AudioGuideProvider>
        <LangSync />
        <Outlet />
        <Sonner />
      </AudioGuideProvider>
    );
  }

  return (
    <AudioGuideProvider>
      <SkipLink />
      <LangSync />
      <SplashScreen />
      <SignatureIntro />
      <ContinueJourneyCard />
      <Outlet />
      <SiteFooter />
      <WelcomeJourney />
      <JourneyHud />
      <BackToTop />
      <MuseumDock />
      <SearchOverlay />
      <MotionReveal />
      <AudioMiniPlayer />
      <AskCurator />
      <PassportTracker />
      <Sonner />
    </AudioGuideProvider>
  );
}
