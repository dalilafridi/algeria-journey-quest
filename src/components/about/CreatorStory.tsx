/**
 * Dedicated editorial presentation of the museum's creator, used only on
 * /about. Kept out of the shared InfoPage body so the other institutional
 * pages (privacy, terms, sources, credits) are untouched.
 *
 * Layout: a compact creator header, then three narrative sections connected by
 * a quiet rule rather than enclosed in one large card.
 */
import type { Lang } from "@/lib/i18n";
import { DalilaFridiMonogram } from "@/components/brand/DalilaFridiMark";

type T = Record<Lang, string>;

const EYEBROW: T = { en: "The creator", fr: "La créatrice", ar: "المُبدِعة" };
const NAME = "Dalila Fridi";
const ROLE: T = {
  en: "Founder and Curator",
  fr: "Fondatrice et commissaire",
  ar: "المؤسِّسة والقيّمة على المشروع",
};

const H_WHY: T = {
  en: "Why I Built DZ Odyssey",
  fr: "Pourquoi j'ai créé DZ Odyssey",
  ar: "لماذا أنشأت DZ Odyssey",
};

const WHY_LEAD: T = {
  en: "I have always loved history, but even more, I love the stories that connect us.",
  fr: "J'ai toujours aimé l'histoire, mais j'aime plus encore les histoires qui nous relient.",
  ar: "لطالما أحببتُ التاريخ، لكنني أحبّ أكثر منه القصص التي تجمع بيننا.",
};

const WHY: T[] = [
  {
    en: "I grew up in a family where freedom was never just a word. It lived in the memories of my mother and grandmothers, in the stories they told and in the things they wanted us never to forget.",
    fr: "J'ai grandi dans une famille où la liberté n'a jamais été un simple mot. Elle vivait dans les souvenirs de ma mère et de mes grands-mères, dans les récits qu'elles nous faisaient et dans ce qu'elles voulaient que nous n'oublions jamais.",
    ar: "نشأتُ في عائلة لم تكن الحرية فيها مجرد كلمة. كانت تعيش في ذاكرة أمي وجدّاتي، وفي الحكايات التي روينها، وفي الأشياء التي أردن لنا ألّا ننساها أبدًا.",
  },
  {
    en: "They taught me who we were, where we came from and why remembering matters.",
    fr: "Elles m'ont appris qui nous étions, d'où nous venions et pourquoi il importe de se souvenir.",
    ar: "علّمنني من كنّا، ومن أين أتينا، ولماذا يهمّ أن نتذكّر.",
  },
  {
    en: "I lived through the Berber Spring of 1980 and the October 1988 uprising. I left Algeria at the beginning of the Black Decade. I was no longer there, but distance did not protect me from the fear, grief and helplessness of watching my country suffer.",
    fr: "J'ai vécu le Printemps berbère de 1980 et le soulèvement d'octobre 1988. J'ai quitté l'Algérie au début de la décennie noire. Je n'étais plus sur place, mais la distance ne m'a protégée ni de la peur, ni du chagrin, ni du sentiment d'impuissance devant la souffrance de mon pays.",
    ar: "عشتُ الربيع الأمازيغي عام 1980 وانتفاضة أكتوبر 1988. غادرتُ الجزائر في بداية العشرية السوداء. لم أعد هناك، لكنّ البعد لم يحمِني من الخوف والحزن والعجز وأنا أرى بلدي يعاني.",
  },
  {
    en: "If anything, those years taught me that Algeria remains part of us wherever we live.",
    fr: "Ces années m'ont surtout appris que l'Algérie reste une part de nous, où que nous vivions.",
    ar: "بل إن تلك السنوات علّمتني أن الجزائر تبقى جزءًا منّا أينما عشنا.",
  },
];

const PULL_QUOTE: T = {
  en: "Never forget where you come from.",
  fr: "N'oublie jamais d'où tu viens.",
  ar: "لا تنسَ أبدًا من أين أتيت.",
};

const AFTER_QUOTE: T[] = [
  {
    en: "That belief became DZ Odyssey.",
    fr: "Cette conviction est devenue DZ Odyssey.",
    ar: "تلك القناعة صارت DZ Odyssey.",
  },
  {
    en: "I wanted to create a place where Algeria could be explored through its history, people, regions, cultures, food and football. A place for Algerians, for the diaspora, for younger generations and for anyone curious enough to discover a country too often reduced to a few familiar chapters.",
    fr: "Je voulais créer un lieu où l'Algérie puisse s'explorer à travers son histoire, ses habitants, ses régions, ses cultures, sa cuisine et son football. Un lieu pour les Algériens, pour la diaspora, pour les jeunes générations et pour toute personne assez curieuse pour découvrir un pays trop souvent réduit à quelques chapitres connus.",
    ar: "أردتُ أن أصنع مكانًا يمكن فيه استكشاف الجزائر عبر تاريخها وناسها ومناطقها وثقافاتها ومطبخها وكرة قدمها. مكان للجزائريين، ولأبناء المهجر، وللأجيال الشابة، ولكل فضولي يرغب في اكتشاف بلد كثيرًا ما يُختزل في بضعة فصول مألوفة.",
  },
  {
    en: "I spent months researching and building this museum. Along the way, I discovered stories about Algeria that even I did not know. Each one reminded me how much of our history is still waiting to be shared.",
    fr: "J'ai passé des mois à faire des recherches et à construire ce musée. En chemin, j'ai découvert sur l'Algérie des histoires que moi-même j'ignorais. Chacune m'a rappelé tout ce qui attend encore d'être partagé de notre histoire.",
    ar: "قضيتُ شهورًا في البحث وفي بناء هذا المتحف. وفي الطريق اكتشفتُ عن الجزائر قصصًا لم أكن أعرفها. وكل قصة ذكّرتني بكم من تاريخنا ما زال ينتظر أن يُروى.",
  },
];

const H_TECH: T = {
  en: "From Databases to a Digital Museum",
  fr: "Des bases de données au musée numérique",
  ar: "من قواعد البيانات إلى متحف رقمي",
};

const TECH_STORY: T[] = [
  {
    en: "I spent my career working in technology, particularly with data and complex systems. Retirement gave me the time to explore something different, while curiosity pushed me to start building again.",
    fr: "J'ai fait carrière dans la technologie, en particulier autour des données et des systèmes complexes. La retraite m'a donné le temps d'explorer autre chose, et la curiosité m'a poussée à construire de nouveau.",
    ar: "أمضيتُ مسيرتي المهنية في مجال التكنولوجيا، وخاصة مع البيانات والأنظمة المعقّدة. أتاح لي التقاعد وقتًا لاستكشاف شيء مختلف، ودفعني الفضول إلى العودة للبناء من جديد.",
  },
  {
    en: "This time, the subject was Algeria.",
    fr: "Cette fois, le sujet était l'Algérie.",
    ar: "وهذه المرة كان الموضوع هو الجزائر.",
  },
  {
    en: "I combined what I already knew with what I wanted to learn. I taught myself new tools, experimented with AI, learned Canva and brought together research, writing, design and technology to create DZ Odyssey.",
    fr: "J'ai combiné ce que je savais déjà avec ce que je voulais apprendre. J'ai appris seule de nouveaux outils, expérimenté l'IA, découvert Canva et réuni la recherche, l'écriture, le design et la technologie pour créer DZ Odyssey.",
    ar: "جمعتُ بين ما أعرفه وما أردتُ تعلّمه. تعلّمتُ أدوات جديدة بنفسي، وجرّبتُ الذكاء الاصطناعي، وتعلّمتُ Canva، وجمعتُ البحث والكتابة والتصميم والتكنولوجيا لإنشاء DZ Odyssey.",
  },
  {
    en: "I am still learning. The museum is still growing. That is part of the adventure.",
    fr: "J'apprends encore. Le musée continue de grandir. Cela fait partie de l'aventure.",
    ar: "ما زلتُ أتعلّم. وما زال المتحف ينمو. وهذا جزء من المغامرة.",
  },
];

const H_BEHIND: T = {
  en: "Behind the Museum",
  fr: "Dans les coulisses du musée",
  ar: "خلف كواليس المتحف",
};

const BEHIND_INTRO: T = {
  en: "DZ Odyssey combines research, writing, design and technology.",
  fr: "DZ Odyssey réunit la recherche, l'écriture, le design et la technologie.",
  ar: "يجمع DZ Odyssey بين البحث والكتابة والتصميم والتكنولوجيا.",
};

const TOOLS: { label: string; l10n?: T }[] = [
  { label: "React" },
  { label: "Vite" },
  { label: "Supabase" },
  { label: "Canva" },
  {
    label: "AI-assisted audio",
    l10n: {
      en: "AI-assisted audio",
      fr: "Audio assisté par IA",
      ar: "صوت بمساعدة الذكاء الاصطناعي",
    },
  },
  {
    label: "Translation APIs",
    l10n: {
      en: "Translation APIs",
      fr: "API de traduction",
      ar: "واجهات برمجة الترجمة",
    },
  },
];

const H_HOPE: T = {
  en: "What I Hope It Becomes",
  fr: "Ce que j'espère pour DZ Odyssey",
  ar: "ما أرجوه لـ DZ Odyssey",
};

const HOPE: T[] = [
  {
    en: "My hope is simple: that DZ Odyssey helps people feel closer to Algeria.",
    fr: "Mon souhait est simple : que DZ Odyssey aide chacun à se sentir plus proche de l'Algérie.",
    ar: "أملي بسيط: أن يساعد DZ Odyssey الناس على الشعور بقربٍ أكبر من الجزائر.",
  },
  {
    en: "For some, it may be a return to familiar stories. For others, it may be a first introduction. For children of the diaspora, perhaps it can help make Algeria feel less distant.",
    fr: "Pour certains, ce sera un retour vers des récits familiers. Pour d'autres, une première rencontre. Pour les enfants de la diaspora, il rendra peut-être l'Algérie un peu moins lointaine.",
    ar: "بالنسبة إلى البعض قد يكون عودة إلى قصص مألوفة. وبالنسبة إلى آخرين قد يكون تعارفًا أول. ولأبناء المهجر، لعلّه يجعل الجزائر أقل بعدًا.",
  },
];

const HOPE_EMPHASIS: T[] = [
  {
    en: "DZ Odyssey is independent, free to visit and open to everyone.",
    fr: "DZ Odyssey est indépendant, gratuit et ouvert à tous.",
    ar: "DZ Odyssey مشروع مستقل، زيارته مجانية وهو مفتوح للجميع.",
  },
  {
    en: "Every story matters. Especially ours.",
    fr: "Chaque histoire compte. Surtout la nôtre.",
    ar: "كل قصة لها قيمة. وخاصة قصتنا.",
  },
];

/** Restrained Amazigh-inspired rule used between sections. */
function GeometryRule({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 240 16"
      className={className ?? "h-3 w-40 text-[color-mix(in_oklab,var(--primary)_55%,transparent)]"}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
    >
      <path d="M0 8h88M152 8h88" />
      <path d="M104 8l8-6 8 6-8 6z" />
      <path d="M120 8l8-6 8 6-8 6z" />
      <path d="M96 2v12M144 2v12" />
    </svg>
  );
}

const P = "text-base leading-[1.72] text-foreground/90 sm:text-[1.0625rem]";
const H = "font-serif text-[1.375rem] leading-[1.3] text-foreground sm:text-[1.6rem]";

export function CreatorStory({ lang }: { lang: Lang }) {
  return (
    <section aria-labelledby="creator-heading" className="mt-2">
      {/* Compact creator header */}
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-muted-foreground">
          {EYEBROW[lang]}
        </p>
        <DalilaFridiMonogram size="about" />
        <div className="space-y-1.5">
          <h2 id="creator-heading" className="font-serif text-3xl leading-tight sm:text-4xl">
            {NAME}
          </h2>
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground sm:text-sm">
            {ROLE[lang]}
          </p>
        </div>
        <GeometryRule />
      </div>

      <div className="mx-auto mt-10 max-w-[62ch] space-y-12">
        {/* Section one */}
        <section aria-labelledby="creator-why" className="space-y-4">
          <h3 id="creator-why" className={H}>
            {H_WHY[lang]}
          </h3>
          <p className="font-serif text-[1.2rem] leading-[1.55] text-foreground sm:text-[1.3rem]">
            {WHY_LEAD[lang]}
          </p>
          {WHY.map((p) => (
            <p key={p.en} className={P}>
              {p[lang]}
            </p>
          ))}
        </section>

        <figure className="mx-auto max-w-[46ch] text-center">
          <blockquote className="font-serif text-[1.3rem] italic leading-[1.45] text-[color-mix(in_oklab,var(--primary)_78%,var(--foreground))] sm:text-[1.55rem]">
            {PULL_QUOTE[lang]}
          </blockquote>
          <div className="mt-6 flex justify-center">
            <span
              aria-hidden="true"
              className="h-px w-24 bg-[color-mix(in_oklab,var(--primary)_45%,transparent)]"
            />
          </div>
        </figure>

        <div className="space-y-4">
          {AFTER_QUOTE.map((p) => (
            <p key={p.en} className={P}>
              {p[lang]}
            </p>
          ))}
        </div>

        {/* Section two, with the small technology panel beside it on desktop */}
        <section
          aria-labelledby="creator-tech"
          className="border-t border-[color-mix(in_oklab,var(--primary)_18%,var(--border))] pt-10"
        >
          <h3 id="creator-tech" className={H}>
            {H_TECH[lang]}
          </h3>
          <div className="mt-4 grid gap-8 lg:grid-cols-[minmax(0,1fr)_15rem]">
            <div className="min-w-0 space-y-4">
              {TECH_STORY.map((p) => (
                <p key={p.en} className={P}>
                  {p[lang]}
                </p>
              ))}
            </div>
            <aside
              aria-labelledby="creator-behind"
              className="h-fit rounded-xl border border-border bg-card/60 p-4"
            >
              <h4
                id="creator-behind"
                className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground"
              >
                {H_BEHIND[lang]}
              </h4>
              <p className="mt-2 text-[0.9375rem] leading-[1.65] text-foreground/85">
                {BEHIND_INTRO[lang]}
              </p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {TOOLS.map((t) => (
                  <li
                    key={t.label}
                    className="rounded-full border border-border bg-background/60 px-2.5 py-1 text-xs text-foreground/80"
                    dir={t.l10n ? undefined : "ltr"}
                  >
                    {t.l10n ? t.l10n[lang] : t.label}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        {/* Section three */}
        <section
          aria-labelledby="creator-hope"
          className="space-y-4 border-t border-[color-mix(in_oklab,var(--primary)_18%,var(--border))] pt-10"
        >
          <h3 id="creator-hope" className={H}>
            {H_HOPE[lang]}
          </h3>
          {HOPE.map((p) => (
            <p key={p.en} className={P}>
              {p[lang]}
            </p>
          ))}
          <div className="space-y-2 pt-2">
            {HOPE_EMPHASIS.map((p) => (
              <p
                key={p.en}
                className="font-serif text-[1.15rem] leading-[1.5] text-[color-mix(in_oklab,var(--primary)_72%,var(--foreground))] sm:text-[1.25rem]"
              >
                {p[lang]}
              </p>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-12 flex justify-center" aria-hidden="true">
        <GeometryRule />
      </div>
    </section>
  );
}
