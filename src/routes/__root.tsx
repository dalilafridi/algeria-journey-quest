import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
  useRouterState,
} from "@tanstack/react-router";
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
import { NotFoundView } from "@/components/NotFoundView";
import { MonitoringProbe } from "@/components/MonitoringProbe";
import { LangContext, getLang, t, tu } from "@/lib/i18n";
import { headLang } from "@/lib/seo";

/** Site-wide fallback metadata, in the three reviewed museum languages. */
const ROOT_TITLE = {
  en: "DZ Odyssey, Algeria Through Time",
  fr: "DZ Odyssey, l'Algérie à travers le temps",
  ar: "دي زد أوديسي، الجزائر عبر الزمن",
};
const ROOT_DESCRIPTION = {
  en: "DZ Odyssey, a cinematic museum passage through Algeria's eras, regions, figures and culture, from Numidia to independence.",
  fr: "DZ Odyssey, une traversée muséale et cinématique des époques, régions, figures et cultures de l'Algérie, de la Numidie à l'indépendance.",
  ar: "دي زد أوديسي، رحلة متحفية سينمائية عبر حِقب الجزائر ومناطقها وشخصياتها وثقافتها، من نوميديا إلى الاستقلال.",
};

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
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=5",
      },
      { name: "theme-color", content: "#1a1410" },
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      { title: t(ROOT_TITLE, headLang(match)) },
      { name: "description", content: t(ROOT_DESCRIPTION, headLang(match)) },
      { name: "author", content: "DZ Odyssey" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "DZ Odyssey" },
      // NOTE (Phase 1): og:image and twitter:image intentionally live only on
      // leaf routes, through the shared pageMeta helper.
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
  notFoundComponent: NotFoundView,
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
  // On an unmatched URL the journey chrome ("Continue Your Journey", HUD,
  // welcome overlay) is irrelevant and would advertise stale progress.
  const isNotFound = useRouterState({
    select: (r) => r.matches.some((m) => m.routeId === "/$" || m.globalNotFound === true),
  });
  // Cookie-resolved language, shared with every component so the server and
  // the first client render agree (no hydration mismatch in FR / AR).
  const { lang: ssrLang } = Route.useLoaderData();

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
      <LangContext.Provider value={ssrLang}>
        <AudioGuideProvider>
          <LangSync />
          <MonitoringProbe />
          <Outlet />
          <Sonner />
        </AudioGuideProvider>
      </LangContext.Provider>
    );
  }

  return (
    <LangContext.Provider value={ssrLang}>
      <AudioGuideProvider>
        <SkipLink />
        <LangSync />
        <MonitoringProbe />
        <SplashScreen />
        <SignatureIntro />
        {!isNotFound && <ContinueJourneyCard />}
        <Outlet />
        <SiteFooter />
        {!isNotFound && <WelcomeJourney />}
        {!isNotFound && <JourneyHud />}
        <BackToTop />
        <MuseumDock />
        <SearchOverlay />
        <MotionReveal />
        <AudioMiniPlayer />
        <AskCurator />
        <PassportTracker />
        <Sonner />
      </AudioGuideProvider>
    </LangContext.Provider>
  );
}
