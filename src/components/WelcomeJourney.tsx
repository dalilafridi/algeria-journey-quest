import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { type Lang, useLang } from "@/lib/i18n";
import algeriaFlag from "@/assets/flags/algeria.svg";
import amazighFlagAsset from "@/assets/flags/amazigh-flag.png.asset.json";

const FLAG_LABELS: Record<Lang, { algeria: string; amazigh: string }> = {
  fr: { algeria: "Drapeau de l'Algérie", amazigh: "Drapeau amazigh" },
  en: { algeria: "Flag of Algeria", amazigh: "Amazigh flag" },
  ar: { algeria: "علم الجزائر", amazigh: "العلم الأمازيغي" },
};

export const OPEN_CREATOR_ABOUT_EVENT = "open-creator-about";

const POPUP_CONTENT: Record<Lang, { eyebrow: string; title: string; paragraphs: string[]; cta: string }> = {
  fr: {
    eyebrow: "À propos",
    title: "À propos de DZ Odyssey",
    paragraphs: [
      "DZ Odyssey est un musée numérique indépendant créé par Dalila Fridi pour rassembler l'histoire, la culture, les régions, les gens et les récits de l'Algérie au sein d'une expérience immersive.",
      "Conçu au fil de mois de recherche et d'un profond attachement à l'Algérie, il invite les visiteurs, chez eux et au sein de la diaspora, à explorer, découvrir et renouer avec leurs racines.",
    ],
    cta: "Découvrir l'histoire de DZ Odyssey",
  },
  en: {
    eyebrow: "About",
    title: "About DZ Odyssey",
    paragraphs: [
      "DZ Odyssey is an independent digital museum created by Dalila Fridi to bring Algeria's history, culture, regions, people, and stories together in one immersive experience.",
      "Built from months of research and a deep attachment to Algeria, it invites visitors at home and across the diaspora to explore, discover, and reconnect with their roots.",
    ],
    cta: "Discover the Story Behind DZ Odyssey",
  },
  ar: {
    eyebrow: "حول",
    title: "حول DZ Odyssey",
    paragraphs: [
      "DZ Odyssey متحف رقمي مستقل أنشأته دليلة فريدي لجمع تاريخ الجزائر وثقافتها ومناطقها وأهلها وقصصها في تجربة واحدة غامرة.",
      "بُني على مدى أشهر من البحث وارتباط عميق بالجزائر، ليدعو الزوار في الوطن وفي المهجر إلى الاستكشاف والاكتشاف وإعادة الاتصال بجذورهم.",
    ],
    cta: "اكتشف قصة DZ Odyssey",
  },
};

const CLOSE_LABEL: Record<Lang, string> = {
  fr: "Fermer",
  en: "Close",
  ar: "إغلاق",
};

export function WelcomeJourney() {
  const lang = useLang();
  const [visible, setVisible] = useState(false);
  const content = POPUP_CONTENT[lang];
  const isArabic = lang === "ar";

  useEffect(() => {
    const openAbout = () => setVisible(true);
    window.addEventListener(OPEN_CREATOR_ABOUT_EVENT, openAbout);
    return () => window.removeEventListener(OPEN_CREATOR_ABOUT_EVENT, openAbout);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-background/75 px-4 py-6 backdrop-blur-md sm:px-6 sm:py-10"
      dir={isArabic ? "rtl" : "ltr"}
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-popup-title"
    >
      <div className="mx-auto flex min-h-full w-full max-w-xl items-center text-foreground">
        <section className="relative w-full max-h-[88vh] overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-xl animate-fade-in sm:p-8">
          <button
            type="button"
            onClick={() => setVisible(false)}
            className="absolute end-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-foreground transition hover:bg-muted"
            aria-label={CLOSE_LABEL[lang]}
          >
            ×
          </button>

          <div className="mx-auto max-w-lg text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{content.eyebrow}</p>
            <h2 id="about-popup-title" className="mt-3 text-2xl font-semibold sm:text-3xl">
              {content.title}
            </h2>
            <div className="mt-4 flex items-center justify-center gap-3" dir="ltr">
              <img
                src={algeriaFlag}
                alt={FLAG_LABELS[lang].algeria}
                width={36}
                height={24}
                className="h-6 w-9 rounded-[2px] border border-border object-cover shadow-sm"
              />
              <img
                src={amazighFlagAsset.url}
                alt="Amazigh flag"
                width={36}
                height={24}
                className="h-6 w-9 rounded-[2px] border border-border object-cover shadow-sm"
              />

            </div>
            <div className="mt-6 space-y-4 text-base leading-7 text-foreground/90">
              {content.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <p className="mt-8">
              <Link
                to="/about"
                onClick={() => setVisible(false)}
                className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
              >
                {content.cta}
              </Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
