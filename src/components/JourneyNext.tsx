import { Link } from "@tanstack/react-router";
import { useLang, type Lang } from "@/lib/i18n";

type StepId = "history" | "regions" | "culture" | "cuisine" | "cinema" | "stargazing";

type StepDef = {
  id: StepId;
  to: string;
  label: Record<Lang, string>;
  hint: Record<Lang, string>;
};

// The unified guided flow.
const FLOW: StepDef[] = [
  {
    id: "history",
    to: "/timeline",
    label: { en: "Journey", fr: "Parcours", ar: "الرحلة" },
    hint: {
      en: "Walk through Algeria's eras",
      fr: "Traversez les époques de l'Algérie",
      ar: "اعبر عصور الجزائر",
    },
  },
  {
    id: "regions",
    to: "/map",
    label: { en: "Regions", fr: "Régions", ar: "المناطق" },
    hint: {
      en: "Explore the land that shaped them",
      fr: "Explorez la terre qui les a façonnés",
      ar: "اكتشف الأرض التي شكّلتهم",
    },
  },
  {
    id: "culture",
    to: "/words",
    label: { en: "Culture", fr: "Culture", ar: "الثقافة" },
    hint: {
      en: "Words, ideas and figures",
      fr: "Mots, idées et figures",
      ar: "كلمات وأفكار وشخصيات",
    },
  },
  {
    id: "cuisine",
    to: "/cuisine",
    label: { en: "Cuisine", fr: "Cuisine", ar: "المطبخ" },
    hint: {
      en: "Taste the memory of each region",
      fr: "Goûtez la mémoire de chaque région",
      ar: "تذوّق ذاكرة كل منطقة",
    },
  },
  {
    id: "cinema",
    to: "/cinema",
    label: { en: "Cinema", fr: "Cinéma", ar: "السينما" },
    hint: {
      en: "Stories told in light and sound",
      fr: "Des histoires racontées en lumière et en son",
      ar: "حكايات تُروى بالضوء والصوت",
    },
  },
];

const COPY = {
  continue: { en: "Continue your journey", fr: "Continuez votre voyage", ar: "تابع رحلتك" },
  next: { en: "Discover next", fr: "Découvrez la suite", ar: "اكتشف ما يلي" },
} as const;

export function JourneyNext({ current }: { current: StepId }) {
  const lang = useLang();
  const idx = FLOW.findIndex((s) => s.id === current);
  // If not in main flow (e.g. stargazing), point back to Culture as a soft anchor.
  const next = idx >= 0 && idx < FLOW.length - 1 ? FLOW[idx + 1] : FLOW[2];
  if (!next) return null;

  return (
    <section
      className="mt-10 sm:mt-14 animate-fade-in"
      aria-label={COPY.continue[lang]}
    >
      <Link
        to={next.to}
        className="group block rounded-2xl border border-border bg-card/80 hover:bg-card transition-all p-4 sm:p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
              {COPY.continue[lang]}
            </div>
            <div className="mt-1 text-base sm:text-lg font-extrabold text-foreground truncate">
              {next.label[lang]}
            </div>
            <p className="mt-0.5 text-sm text-muted-foreground truncate">
              {next.hint[lang]}
            </p>
          </div>
          <span
            className="shrink-0 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:translate-x-0.5 transition-transform rtl:group-hover:-translate-x-0.5"
            aria-hidden
          >
            {COPY.next[lang]}
            <span className="rtl:rotate-180">→</span>
          </span>
        </div>
      </Link>
    </section>
  );
}
