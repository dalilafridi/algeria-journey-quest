import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
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
import { MotionReveal } from "@/components/MotionReveal";
import { SearchOverlay } from "@/components/SearchOverlay";
import { SkipLink, LangSync } from "@/components/A11y";


function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=5" },
      { name: "theme-color", content: "#1a1410" },
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      { title: "Algeria Through Time" },
      { name: "description", content: "Algeria Through Time – A journey through Algerian history" },
      { name: "author", content: "Algeria Through Time" },
      { property: "og:title", content: "Algeria Through Time" },
      { property: "og:description", content: "Algeria Through Time – A journey through Algerian history" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Algeria Through Time" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Algeria Through Time" },
      { name: "twitter:description", content: "Algeria Through Time – A journey through Algerian history" },
      {
        property: "og:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/3b623ed1-1f9c-426d-8427-90f0fa77ed1b/id-preview-f7737c2e--4ec5c163-c082-44f1-a21c-176429962830.lovable.app-1776796791852.png",
      },
      {
        name: "twitter:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/3b623ed1-1f9c-426d-8427-90f0fa77ed1b/id-preview-f7737c2e--4ec5c163-c082-44f1-a21c-176429962830.lovable.app-1776796791852.png",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      // Preconnect for the optional Arabic webfonts (only loaded by LangSync
      // when the user picks Arabic — keeps non-AR users from paying for it).
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      toast("This contente is protected. Please contact us for permission to reuse. ", { duration: 1500 });
    };
    document.addEventListener("contextmenu", handleContextMenu);
    return () => document.removeEventListener("contextmenu", handleContextMenu);
  }, []);

  return (
    <>
      <SkipLink />
      <LangSync />
      <SplashScreen />
      <SignatureIntro />
      <ContinueJourneyCard />
      <div id="main" tabIndex={-1}>
        <Outlet />
      </div>
      <WelcomeJourney />
      <JourneyHud />
      <BackToTop />
      <MuseumDock />
      <SearchOverlay />
      <MotionReveal />
      <Sonner />

    </>
  );
}
