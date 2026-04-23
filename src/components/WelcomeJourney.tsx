import { useEffect, useMemo, useState } from "react";
import { type Lang, useLang } from "@/lib/i18n";

export const OPEN_CREATOR_ABOUT_EVENT = "open-creator-about";

const CREATOR_NARRATIVE: Record<Lang, { name: string; text: string }> = {
  fr: {
    name: "Dalila Fridi",
    text: "J’aime l’histoire… mais surtout les histoires qui nous relient.\n\nJ’ai grandi dans une famille où la liberté n’était pas un mot… mais une mémoire vivante.\nUne mémoire transmise à voix basse, dans les récits de ma mère et de mes grand-mères.\n\nElles ne racontaient pas seulement le passé…\nelles nous rappelaient qui nous sommes.\n\nJ’ai traversé des moments qui ont marqué notre histoire — Tafsut Imazighen en 1980, les événements de 1988 — et j’ai appris que l’identité se vit, se protège… et se transmet.\n\nOn m’a appris une chose essentielle : ne jamais oublier d’où nous venons.\n\nAlors j’ai voulu créer cet espace…\nun lieu pour explorer, comprendre, et ressentir l’Algérie autrement —\npour que les enfants d’ici et d’ailleurs puissent retrouver ce fil invisible qui les relie à leur histoire. 🇩🇿\n\n💻 Retraitée de l’IT… mais jamais de la curiosité\n🎛️ Toujours en train d’explorer et de créer\n📚 Toujours guidée par l’envie de comprendre ce qui vient après\n\n✨ « Chaque histoire compte… surtout la nôtre. »",
  },
  en: {
    name: "Dalila Fridi",
    text: "I love history… but even more, I love the stories that connect us.\n\nI grew up in a family where freedom was not just a word… but a living memory.\nA memory passed down quietly through the voices of my mother and grandmothers.\n\nThey didn’t just tell stories of the past…\nthey reminded us of who we are.\n\nI lived through moments that shaped our history — the 1980 Berber Spring and the 1988 uprising — and I learned that identity is something we live, protect… and pass on.\n\nI was taught one essential truth: never forget where we come from.\n\nSo I created this space…\na place to explore, understand, and feel Algeria differently —\nso that children here and across the diaspora can reconnect with that invisible thread that ties them to their roots. 🇩🇿\n\n💻 Retired from IT… but never from curiosity\n🎛️ Still exploring, still building, still creating\n📚 Always drawn to what comes next\n\n✨ “Every story matters… especially ours.”",
  },
  ar: {
    name: "دليلة فريدي",
    text: "أحب التاريخ… لكنني أحب أكثر القصص التي تربطنا ببعضنا البعض.\n\nنشأت في عائلة لم تكن الحرية فيها مجرد كلمة… بل ذاكرة حية.\nذاكرة تُروى بهدوء في حكايات أمي وجدّاتي.\n\nلم تكن تلك الحكايات عن الماضي فقط…\nبل كانت تذكرنا بمن نكون.\n\nعشت محطات شكّلت تاريخنا — الربيع الأمازيغي عام 1980 وأحداث 1988 — وتعلمت أن الهوية تُعاش، وتُحمى… وتُورث.\n\nتعلمت حقيقة بسيطة وعميقة: لا تنسَ أبدًا من أين أتيت.\n\nلهذا أنشأت هذا الفضاء…\nمكانًا لاكتشاف الجزائر بشكل مختلف —\nللفهم، للشعور، ولربط الأجيال بذلك الخيط الخفي الذي يصلهم بجذورهم. 🇩🇿\n\n💻 متقاعدة من مجال التكنولوجيا… لكن الفضول لا يتوقف\n🎛️ ما زلت أستكشف وأبتكر\n📚 وما زلت أنجذب لما هو قادم\n\n✨ \"كل قصة مهمة… وخاصة قصتنا.\"",
  },
};

const ABOUT_UI: Record<Lang, { label: string; close: string; byline: string }> = {
  fr: { label: "À propos", close: "Fermer", byline: "Créatrice de l’expérience" },
  en: { label: "About", close: "Close", byline: "Creator of the experience" },
  ar: { label: "حول", close: "إغلاق", byline: "مُنشِئة التجربة" },
};

export function WelcomeJourney() {
  const lang = useLang();
  const [visible, setVisible] = useState(false);
  const content = CREATOR_NARRATIVE[lang];
  const isArabic = lang === "ar";

  const [opening, body] = useMemo(() => {
    const [first, ...rest] = content.text.split("\n\n");
    return [first, rest.join("\n\n")];
  }, [content.text]);

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
      aria-labelledby="creator-about-title"
    >
      <div className="mx-auto flex min-h-full w-full max-w-2xl items-center text-foreground">
        <section className="relative w-full max-h-[88vh] overflow-y-auto rounded-2xl border border-border bg-card p-5 shadow-xl animate-fade-in sm:p-8">
          <button
            type="button"
            onClick={() => setVisible(false)}
            className="absolute end-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-foreground transition hover:bg-muted"
            aria-label={ABOUT_UI[lang].close}
          >
            ×
          </button>

          <div className="mx-auto max-w-xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{ABOUT_UI[lang].label}</p>
            <h2 id="creator-about-title" className="mt-3 text-3xl font-semibold sm:text-4xl">
              {content.name}
            </h2>
            <p className="mx-auto mt-2 text-sm font-medium text-primary">{ABOUT_UI[lang].byline}</p>
            <p className="mx-auto mt-8 text-xl font-semibold leading-relaxed text-foreground sm:text-2xl">{opening}</p>
            <div className="mx-auto mt-7 whitespace-pre-line text-center text-base leading-8 text-foreground/85">
              {body}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}