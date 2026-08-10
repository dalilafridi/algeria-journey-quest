/**
 * Dedicated editorial presentation of the museum's creator, used only on
 * /about. Kept out of the shared InfoPage body so the other institutional
 * pages (privacy, terms, sources, credits) are untouched.
 */
import type { Lang } from "@/lib/i18n";

type T = Record<Lang, string>;

const EYEBROW: T = { en: "The creator", fr: "La créatrice", ar: "المُبدِعة" };
const NAME = "Dalila Fridi";
const ROLE: T = {
  en: "Creator of the Experience",
  fr: "Créatrice de l'expérience",
  ar: "خالقة التجربة",
};

/** Narrative before the pull quote. */
const OPENING: T[] = [
  {
    en: "I have always loved history, but what fascinates me most are the stories that connect us.",
    fr: "J'ai toujours aimé l'histoire, mais ce qui me fascine le plus, ce sont les histoires qui nous relient.",
    ar: "لطالما أحببت التاريخ، لكن ما يأسرني أكثر هو القصص التي تربطنا ببعضنا.",
  },
  {
    en: "I grew up in a family where freedom was never just a word. It was a living memory, passed down quietly through the voices of my mother and grandmothers.",
    fr: "J'ai grandi dans une famille où la liberté n'a jamais été qu'un simple mot. C'était un souvenir vivant, transmis en silence par la voix de ma mère et de mes grands-mères.",
    ar: "نشأت في عائلة لم تكن فيها الحرية مجرد كلمة. كانت ذكرى حية، تُنقَل بهدوء عبر أصوات أمّي وجدّاتي.",
  },
  {
    en: "They did more than tell us stories about the past. They reminded us who we are, where we come from, and why remembering matters.",
    fr: "Elles ne se contentaient pas de nous raconter des histoires du passé. Elles nous rappelaient qui nous sommes, d'où nous venons, et pourquoi se souvenir compte.",
    ar: "لم يكتفين بحكايات الماضي. كنّ يذكّرننا بمن نحن، ومن أين أتينا، ولماذا يهمّ أن نتذكّر.",
  },
  {
    en: "I also lived through defining moments in Algeria's modern history, including the Berber Spring of 1980 and the October 1988 uprising. I left Algeria at the beginning of the Black Decade. Although I was no longer there, distance offered no escape from the fear, grief and helplessness of watching my country suffer. If anything, those years taught me that Algeria remains part of us wherever we live. Identity is not something we simply inherit. It is something we live, protect, question and pass on.",
    fr: "J'ai également vécu des moments déterminants de l'histoire moderne de l'Algérie, notamment le Printemps berbère de 1980 et le soulèvement d'octobre 1988. J'ai quitté l'Algérie au début de la Décennie noire. Même si je n'étais plus sur place, la distance ne m'a épargnée ni de la peur, ni du chagrin, ni du sentiment d'impuissance face à la souffrance de mon pays. Ces années m'ont appris que l'Algérie reste en nous, où que nous vivions. L'identité n'est pas quelque chose dont nous héritons simplement. C'est quelque chose que nous vivons, protégeons, questionnons et transmettons.",
    ar: "كما عشتُ لحظات مفصلية في تاريخ الجزائر الحديث، من بينها الربيع الأمازيغي عام 1980 وانتفاضة أكتوبر 1988. غادرتُ الجزائر في بداية العشرية السوداء. ورغم أنني لم أعد موجودة هناك، فإن البعد لم يحمِني من الخوف والحزن والشعور بالعجز وأنا أرى بلدي يعاني. وقد علمتني تلك السنوات أن الجزائر تظل جزءًا منا أينما عشنا. فالهوية ليست مجرد شيء نرثه، بل هي شيء نعيشه ونحميه ونتساءل بشأنه وننقله إلى الأجيال القادمة.",
  },
];

const LEAD_IN: T = {
  en: "One truth has stayed with me throughout my life:",
  fr: "Une vérité m'est restée au fil de ma vie :",
  ar: "حقيقة واحدة بقيت معي طوال حياتي:",
};

const PULL_QUOTE: T = {
  en: "Never forget where you come from.",
  fr: "N'oublie jamais d'où tu viens.",
  ar: "لا تنسَ أبدًا من أين أنت.",
};

/** Narrative after the pull quote. */
const CLOSING: T[] = [
  {
    en: "That belief inspired me to create DZ Odyssey, a space where history is not only studied, but explored, heard, felt, and rediscovered.",
    fr: "Cette conviction m'a inspirée pour créer DZ Odyssey, un espace où l'histoire ne se contente pas d'être étudiée, mais explorée, entendue, ressentie et redécouverte.",
    ar: "هذا الإيمان ألهمني لإنشاء DZ Odyssey، مساحة لا يُدرَس فيها التاريخ فحسب، بل يُستكشف ويُسمَع ويُحَسّ ويُعاد اكتشافه.",
  },
  {
    en: "I spent months researching historical events, people, traditions, and stories. Along the way, I discovered things about Algeria that even I did not know. Every discovery deepened my curiosity and reminded me how much of our story is still waiting to be shared.",
    fr: "J'ai passé des mois à rechercher des événements historiques, des personnes, des traditions et des récits. En chemin, j'ai découvert des choses sur l'Algérie que moi-même je ne connaissais pas. Chaque découverte a renforcé ma curiosité et m'a rappelé combien de notre histoire attend encore d'être partagée.",
    ar: "قضيتُ شهورًا أبحث في الأحداث التاريخية والشخصيات والتقاليد والقصص. وفي الطريق اكتشفتُ عن الجزائر أشياء لم أكن أعرفها. كل اكتشاف عمّق فضولي وذكّرني بكمّ ما زال من قصتنا ينتظر أن يُروى.",
  },
  {
    en: "Drawing on my background in technology, my love for history, my attachment to Algeria, and my curiosity about AI and emerging tools, I began building this experience.",
    fr: "En m'appuyant sur mon parcours dans la technologie, mon amour de l'histoire, mon attachement à l'Algérie et ma curiosité pour l'intelligence artificielle et les outils émergents, j'ai commencé à construire cette expérience.",
    ar: "انطلاقًا من خلفيتي في التكنولوجيا، وحبّي للتاريخ، وارتباطي بالجزائر، وفضولي تجاه الذكاء الاصطناعي والأدوات الناشئة، بدأتُ ببناء هذه التجربة.",
  },
  {
    en: "My hope is that DZ Odyssey will help children and adults, in Algeria and across the diaspora, reconnect with the invisible thread that ties us to our roots.",
    fr: "J'espère que DZ Odyssey aidera les enfants et les adultes, en Algérie et dans la diaspora, à renouer avec le fil invisible qui nous lie à nos racines.",
    ar: "أملي أن تساعد DZ Odyssey الأطفال والكبار، في الجزائر وفي المهجر، على استعادة الخيط الخفي الذي يربطنا بجذورنا.",
  },
];

const CODA_HEADING: T = {
  en: "From systems to stories",
  fr: "Des systèmes aux histoires",
  ar: "من الأنظمة إلى الحكايات",
};

const CODA_BODY: T = {
  en: "Retirement gave me time, but curiosity gave me direction. After a career in information technology, I found myself building again, this time with history as the architecture. I brought together the tools I knew, the new ones I wanted to understand, and months of research to create a museum that can continue growing. I am still learning, still building, and still discovering what comes next.",
  fr: "La retraite m'a donné du temps, mais c'est la curiosité qui m'a donné une direction. Après une carrière dans les technologies de l'information, je me suis remise à construire, cette fois avec l'histoire pour architecture. J'ai réuni les outils que je connaissais, ceux que je souhaitais découvrir et des mois de recherche pour créer un musée appelé à continuer de grandir. Je continue d'apprendre, de construire et de découvrir ce qui vient ensuite.",
  ar: "منحني التقاعد الوقت، لكن الفضول هو الذي منحني الاتجاه. بعد مسيرة مهنية في تكنولوجيا المعلومات، وجدت نفسي أبني من جديد، وهذه المرة كان التاريخ هو البنية التي استندت إليها. جمعت بين الأدوات التي أعرفها، والأدوات الجديدة التي أردت فهمها، وأشهر من البحث، لإنشاء متحف يمكنه أن يواصل النمو. وما زلت أتعلم، وأبني، وأكتشف ما سيأتي بعد ذلك.",
};

const CODA_TECH: T = {
  en: "Over the past year, I also learned to use Canva, creating and refining some of the illustrations that helped shape the museum's visual identity. Built with React, Vite and Supabase, with AI-assisted audio and translation APIs.",
  fr: "Au cours de l'année écoulée, j'ai également appris à utiliser Canva pour créer et affiner certaines illustrations qui ont contribué à façonner l'identité visuelle du musée. Créé avec React, Vite et Supabase, avec l'aide de l'IA pour l'audio et des API de traduction.",
  ar: "وخلال العام الماضي، تعلمت أيضًا استخدام Canva لإنشاء بعض الرسوم التوضيحية وتطويرها، مما ساهم في تشكيل الهوية البصرية للمتحف. بُني باستخدام React وVite وSupabase، مع الاستعانة بالذكاء الاصطناعي في المحتوى الصوتي وواجهات برمجة التطبيقات للترجمة.",
};

const SIGNATURE: T = {
  en: "Every story matters, especially ours.",
  fr: "Chaque histoire compte, surtout la nôtre.",
  ar: "كل قصةٍ لها قيمة، وخاصة قصتنا.",
};

/** Restrained Amazigh-inspired lozenge rule. Decorative only. */
function GeometryRule() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 240 16"
      className="h-4 w-40 text-[color-mix(in_oklab,var(--primary)_55%,var(--border))]"
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

/** Temporary monogram seal, replaceable by an approved portrait later. */
function MonogramMedallion() {
  return (
    <div
      aria-hidden="true"
      className="relative grid h-24 w-24 shrink-0 place-items-center rounded-full border border-[color-mix(in_oklab,var(--primary)_35%,var(--border))] bg-[linear-gradient(150deg,color-mix(in_oklab,var(--accent)_22%,var(--card)),var(--card))] shadow-sm sm:h-28 sm:w-28"
    >
      <span className="absolute inset-[6px] rounded-full border border-[color-mix(in_oklab,var(--primary)_22%,transparent)]" />
      <span className="absolute inset-[11px] rounded-full border border-dotted border-[color-mix(in_oklab,var(--primary)_18%,transparent)]" />
      <span className="font-serif text-2xl tracking-[0.12em] text-[color-mix(in_oklab,var(--primary)_85%,var(--foreground))] sm:text-3xl">
        DF
      </span>
    </div>
  );
}

export function CreatorStory({ lang }: { lang: Lang }) {
  return (
    <section
      aria-labelledby="creator-heading"
      className="relative mt-4 overflow-hidden rounded-2xl border border-[color-mix(in_oklab,var(--primary)_18%,var(--border))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--accent)_7%,var(--card)),var(--card))] px-5 py-10 sm:px-9 sm:py-14"
    >
      <div className="flex flex-col items-center gap-5 text-center">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-muted-foreground">
          {EYEBROW[lang]}
        </p>
        <MonogramMedallion />
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

      <div className="mx-auto mt-10 max-w-[62ch] space-y-6">
        <p className="font-serif text-[1.2rem] leading-[1.55] text-foreground sm:text-[1.35rem]">
          {OPENING[0][lang]}
        </p>
        {OPENING.slice(1).map((p) => (
          <p key={p.en} className="text-base leading-[1.72] text-foreground/90 sm:text-[1.0625rem]">
            {p[lang]}
          </p>
        ))}

        <p className="text-base leading-[1.72] text-muted-foreground sm:text-[1.0625rem]">
          {LEAD_IN[lang]}
        </p>
      </div>

      <figure className="mx-auto my-10 max-w-[46ch] text-center sm:my-12">
        <blockquote className="font-serif text-[1.35rem] italic leading-[1.4] text-[color-mix(in_oklab,var(--primary)_78%,var(--foreground))] sm:text-[1.6rem]">
          {PULL_QUOTE[lang]}
        </blockquote>
        <div className="mt-6 flex justify-center">
          <span
            aria-hidden="true"
            className="h-px w-24 bg-[color-mix(in_oklab,var(--primary)_45%,transparent)]"
          />
        </div>
      </figure>

      <div className="mx-auto max-w-[62ch] space-y-6">
        {CLOSING.map((p) => (
          <p key={p.en} className="text-base leading-[1.72] text-foreground/90 sm:text-[1.0625rem]">
            {p[lang]}
          </p>
        ))}
      </div>

      <section
        aria-labelledby="creator-coda-heading"
        className="mx-auto mt-12 max-w-[62ch] border-t border-[color-mix(in_oklab,var(--primary)_20%,var(--border))] pt-9"
      >
        <div className="grid gap-4 sm:grid-cols-[minmax(0,11rem)_minmax(0,1fr)] sm:gap-8">
          <h3
            id="creator-coda-heading"
            className="font-serif text-[1.375rem] leading-[1.3] text-foreground sm:text-[1.55rem]"
          >
            {CODA_HEADING[lang]}
          </h3>
          <div className="min-w-0 space-y-4">
            <p className="text-base leading-[1.72] text-foreground/90 sm:text-[1.0625rem]">
              {CODA_BODY[lang]}
            </p>
            <p className="text-[0.9375rem] leading-[1.65] text-muted-foreground">
              {CODA_TECH[lang]}
            </p>
          </div>
        </div>
      </section>

      <p className="mx-auto mt-14 max-w-[46ch] text-center font-serif text-[1.35rem] italic leading-[1.45] text-[color-mix(in_oklab,var(--primary)_72%,var(--foreground))] sm:text-[1.55rem]">
        {SIGNATURE[lang]}
      </p>


      <div className="mt-10 flex justify-center" aria-hidden="true">
        <GeometryRule />
      </div>
    </section>
  );
}
