import { createFileRoute, Link } from "@tanstack/react-router";
import { InfoPage, InfoPlaque, type InfoSection } from "@/components/InfoPage";
import { useLang } from "@/lib/i18n";
import { pageMeta, headLang } from "@/lib/seo";
import { PAGE_META } from "@/lib/pageMetaCopy";
import { PUBLIC_CONTACT_EMAIL, hasPublicContact } from "@/lib/siteContact";

export const Route = createFileRoute("/about")({
  head: ({ match }) =>
    pageMeta({
      lang: headLang(match),
      path: "/about",
      ...PAGE_META["/about"],
    }),
  component: AboutPage,
});

const KICKER = { en: "The museum", fr: "Le musée", ar: "المتحف" };
const TITLE = {
  en: "About DZ Odyssey",
  fr: "À propos de DZ Odyssey",
  ar: "حول دي زد أوديسي",
};
const INTRO = {
  en: "DZ Odyssey is an immersive digital museum of Algeria. It gathers eras, regions, historical figures, culture, cuisine and football into one guided passage that can be visited from anywhere, in three languages.",
  fr: "DZ Odyssey est un musée numérique immersif consacré à l'Algérie. Il réunit époques, régions, figures historiques, culture, cuisine et football en un parcours guidé, accessible partout et en trois langues.",
  ar: "دي زد أوديسي متحف رقمي غامر مخصّص للجزائر. يجمع الحِقب والمناطق والشخصيات التاريخية والثقافة والمطبخ وكرة القدم في مسار واحد موجَّه، متاح من أي مكان وبثلاث لغات.",
};

const SECTIONS: InfoSection[] = [
  {
    heading: {
      en: "Creator of the Experience",
      fr: "La créatrice de l'expérience",
      ar: "خالقة التجربة",
    },
    paras: [
      {
        en: "Dalila Fridi",
        fr: "Dalila Fridi",
        ar: "دليلة فريدي",
      },
      {
        en: "I have always loved history, but what fascinates me most are the stories that connect us.",
        fr: "J'ai toujours aimé l'histoire, mais ce qui me fascine le plus, ce sont les histoires qui nous relient.",
        ar: "لطالما أحببت التاريخ، لكن ما يأسرني أكثر هو القصص التي تربطنا ببعضنا.",
      },
      {
        en: "I grew up in a family where freedom was never just a word. It was a living memory, passed down quietly through the voices of my mother and grandmothers.",
        fr: "J'ai grandi dans une famille où la liberté n'a jamais été qu'un simple mot. C'était un souvenir vivant, transmis en silence par la voix de ma mère et de mes grands-mères.",
        ar: "نشأت في عائلة حيث لم تكن الحرية مجرد كلمة. كانت ذكرى حية، تُنقَل بهدوء عبر أصوات أمّي وجدّاتي.",
      },
      {
        en: "They did more than tell us stories about the past. They reminded us who we are, where we come from, and why remembering matters.",
        fr: "Elles ne se contentaient pas de nous raconter des histoires du passé. Elles nous rappelaient qui nous sommes, d'où nous venons, et pourquoi se souvenir compte.",
        ar: "لم يقتصر الأمر على حكايات من الماضي. لقد ذكّرننا بمن نحن، ومن أين أتينا، ولماذا يهمّ أن نتذكّر.",
      },
      {
        en: "I also lived through defining moments in Algeria's modern history, including the Berber Spring of 1980 and the October 1988 uprising. Those experiences taught me that identity is not something we simply inherit. It is something we live, protect, question, and pass on.",
        fr: "J'ai aussi vécu des moments déterminants de l'histoire moderne de l'Algérie, dont le printemps berbère de 1980 et les émeutes d'octobre 1988. Ces expériences m'ont appris que l'identité ne se reçoit pas simplement. Elle se vit, se protège, se questionne et se transmet.",
        ar: "عشتُ أيضًا لحظات محورية في التاريخ الجزائري الحديث، منها الربيع الأمازيغي عام 1980 وانتفاضة أكتوبر 1988. علّمتني هذه التجارب أن الهوية ليست شيئًا نرثه ببساطة. إنها شيء نعيشه، نحميه، نسأل عنه، ونورّثه.",
      },
      {
        en: "One truth has stayed with me throughout my life:",
        fr: "Une vérité m'est restée au fil de ma vie :",
        ar: "حقيقة واحدة بقيت معي طوال حياتي:",
      },
      {
        en: "Never forget where you come from.",
        fr: "N'oublie jamais d'où tu viens.",
        ar: "لا تنسَ أبدًا من أين أنت.",
      },
      {
        en: "That belief inspired me to create DZ Odyssey, a space where history is not only studied, but explored, heard, felt, and rediscovered.",
        fr: "Cette conviction m'a inspirée pour créer DZ Odyssey, un espace où l'histoire ne se contente pas d'être étudiée, mais explorée, entendue, ressentie et redécouverte.",
        ar: "هذا الإيمان هو ما ألهمني لإنشاء دي زد أوديسي، مساحة حيث لا يُدرس التاريخ فحسب، بل يُستكشف ويُسمع ويُشعر ويُعاد اكتشافه.",
      },
      {
        en: "I spent months researching historical events, people, traditions, and stories. Along the way, I discovered things about Algeria that even I did not know. Every discovery deepened my curiosity and reminded me how much of our story is still waiting to be shared.",
        fr: "J'ai passé des mois à rechercher des événements historiques, des personnes, des traditions et des récits. En chemin, j'ai découvert des choses sur l'Algérie que moi-même je ne connaissais pas. Chaque découverte a renforcé ma curiosité et m'a rappelé combien de notre histoire attend encore d'être partagée.",
        ar: "قضيتُ شهورًا أبحث في الأحداث التاريخية والشخصيات والتقاليد والقصص. وفي الطريق، اكتشفتُ أشياء عن الجزائر حتى أنا لم أكن أعرفها. كل اكتشاف عمّق فضولي وذكّرني بكمّ من قصتنا لا يزال ينتظر أن يُشارك.",
      },
      {
        en: "Drawing on my background in technology, my love for history, my attachment to Algeria, and my curiosity about AI and emerging tools, I began building this experience.",
        fr: "En m'appuyant sur mon parcours dans la technologie, mon amour de l'histoire, mon attachement à l'Algérie et ma curiosité pour l'intelligence artificielle et les outils émergents, j'ai commencé à construire cette expérience.",
        ar: "مستفيدةً من خلفيتي في التكنولوجيا، وحبي للتاريخ، وارتباطي بالجزائر، وفضولي حول الذكاء الاصطناعي والأدوات الناشئة، بدأتُ ببناء هذه التجربة.",
      },
      {
        en: "My hope is that DZ Odyssey will help children and adults, in Algeria and across the diaspora, reconnect with the invisible thread that ties us to our roots.",
        fr: "J'espère que DZ Odyssey aidera les enfants et les adultes, en Algérie et dans la diaspora, à renouer avec le fil invisible qui nous lie à nos racines.",
        ar: "أملي أن تساعد دي زد أوديسي الأطفال والكبار، في الجزائر وفي المهجر، على إعادة الاتصال بالخيط الخفي الذي يربطنا بجذورنا.",
      },
    ],
    bullets: [
      {
        en: "💻 Retired from IT, but never from curiosity",
        fr: "💻 Retraitée de l'informatique, mais jamais de la curiosité",
        ar: "💻 متقاعدة من تكنولوجيا المعلومات، لكن ليس من الفضول",
      },
      {
        en: "🎛️ Still exploring, building, and creating",
        fr: "🎛️ Toujours en train d'explorer, de construire et de créer",
        ar: "🎛️ ما زلت أستكشف وأبني وأبدع",
      },
        {
          en: "📚 Always learning and looking toward what comes next",
          fr: "📚 Toujours en train d'apprendre et de regarder vers la suite",
          ar: "📚 دائمًا أتعلّم وأنظر إلى ما يأتي",
        },
      ],
      postBullets: [
        {
          en: "✨ Every story matters, especially ours.",
          fr: "✨ Chaque histoire compte, surtout la nôtre.",
          ar: "✨ كل قصةٍ لها قيمة، وخاصة قصتنا.",
        },
      ],
    },
  {
    heading: { en: "What this museum is", fr: "Ce qu'est ce musée", ar: "ما هو هذا المتحف" },
    paras: [
      {
        en: "Every screen is designed as a gallery rather than a web page. Exhibits are curated, sequenced and written to be read slowly, with the same care a physical museum gives to a room.",
        fr: "Chaque écran est conçu comme une salle plutôt que comme une page web. Les expositions sont sélectionnées, ordonnées et écrites pour être lues lentement, avec le soin qu'un musée réel accorde à une salle.",
        ar: "كل شاشة مصمَّمة كقاعة عرض لا كصفحة ويب. المعروضات منتقاة ومرتّبة ومكتوبة لتُقرأ على مهل، بالعناية نفسها التي يمنحها متحف حقيقي لقاعاته.",
      },
      {
        en: "The collection grows over time. New exhibits, regions and halls are added as research and writing are completed.",
        fr: "La collection s'enrichit avec le temps. De nouvelles expositions, régions et salles sont ajoutées à mesure que la recherche et la rédaction avancent.",
        ar: "تنمو المجموعة مع الوقت. تُضاف معروضات ومناطق وقاعات جديدة كلما اكتمل البحث والتحرير.",
      },
    ],
  },
  {
    heading: { en: "Its purpose", fr: "Sa raison d'être", ar: "غايته" },
    paras: [
      {
        en: "The purpose is transmission. Algerian history is often encountered in fragments, so the museum offers a continuous passage from ancient Numidia through independence and into contemporary culture, keeping the thread visible between one era and the next.",
        fr: "L'objectif est la transmission. L'histoire algérienne se rencontre souvent par fragments : le musée propose donc un parcours continu, de la Numidie antique à l'indépendance puis à la culture contemporaine, en gardant visible le fil qui relie les époques.",
        ar: "الغاية هي النقل والتوريث. كثيرًا ما يُلتقى التاريخ الجزائري مشتَّتًا، لذا يقدّم المتحف مسارًا متصلًا من نوميديا القديمة إلى الاستقلال ثم الثقافة المعاصرة، مع إبقاء الخيط الرابط بين الحِقب ظاهرًا.",
      },
    ],
  },
  {
    heading: { en: "Who it is for", fr: "À qui il s'adresse", ar: "لمن هو موجّه" },
    bullets: [
      {
        en: "Visitors in Algeria who want a coherent view of their own history.",
        fr: "Les visiteurs en Algérie qui souhaitent une vue cohérente de leur histoire.",
        ar: "الزوّار في الجزائر الراغبون في رؤية متماسكة لتاريخهم.",
      },
      {
        en: "Families of the diaspora, and especially children who read in French or English before Arabic.",
        fr: "Les familles de la diaspora, en particulier les enfants qui lisent en français ou en anglais avant l'arabe.",
        ar: "عائلات المهجر، وخاصة الأطفال الذين يقرأون بالفرنسية أو الإنجليزية قبل العربية.",
      },
      {
        en: "Teachers and students looking for sourced, classroom-friendly material.",
        fr: "Les enseignants et les élèves en quête de contenus sourcés, utilisables en classe.",
        ar: "المعلّمون والطلبة الباحثون عن مواد موثّقة صالحة للاستخدام الدراسي.",
      },
      {
        en: "Curious travellers and readers discovering Algeria for the first time.",
        fr: "Les voyageurs et lecteurs curieux qui découvrent l'Algérie pour la première fois.",
        ar: "المسافرون والقرّاء الفضوليون الذين يكتشفون الجزائر لأول مرة.",
      },
    ],
  },
  {
    heading: {
      en: "Our commitments",
      fr: "Nos engagements",
      ar: "التزاماتنا",
    },
    bullets: [
      {
        en: "Historical accuracy: statements follow mainstream scholarly consensus, and where scholars disagree the disagreement is stated rather than hidden.",
        fr: "Exactitude historique : les affirmations suivent le consensus universitaire dominant, et lorsque les chercheurs divergent, la divergence est signalée plutôt que masquée.",
        ar: "الدقّة التاريخية: تتبع المعلومات الإجماع العلمي السائد، وعند اختلاف الباحثين يُذكر الخلاف بدل إخفائه.",
      },
      {
        en: "Cultural respect: Amazigh, Arab, Ottoman, Andalusian, Saharan and Mediterranean layers are treated as part of one plural heritage.",
        fr: "Respect culturel : les strates amazighe, arabe, ottomane, andalouse, saharienne et méditerranéenne sont traitées comme un patrimoine pluriel commun.",
        ar: "الاحترام الثقافي: تُعامَل الطبقات الأمازيغية والعربية والعثمانية والأندلسية والصحراوية والمتوسطية كتراث واحد متعدّد.",
      },
      {
        en: "Visible sourcing: exhibits carry a sources panel so a visitor can trace where a claim comes from.",
        fr: "Sources visibles : les expositions comportent un panneau de sources permettant de retracer l'origine d'une affirmation.",
        ar: "مصادر ظاهرة: تحمل المعروضات لوحة مصادر تتيح للزائر تتبّع أصل أي معلومة.",
      },
      {
        en: "Multilingual access: English, French and Arabic are first-class, with full right to left reading in Arabic.",
        fr: "Accès multilingue : l'anglais, le français et l'arabe sont traités à parts égales, avec une lecture de droite à gauche complète en arabe.",
        ar: "إتاحة متعددة اللغات: الإنجليزية والفرنسية والعربية جميعها لغات أساسية، مع قراءة كاملة من اليمين إلى اليسار في العربية.",
      },
    ],
  },
  {
    heading: {
      en: "An independent project",
      fr: "Un projet indépendant",
      ar: "مشروع مستقل",
    },
    paras: [
      {
        en: "DZ Odyssey is an independent digital cultural project. It does not speak for any government, institution, university or association, and nothing on the site should be read as an official position.",
        fr: "DZ Odyssey est un projet culturel numérique indépendant. Il ne parle au nom d'aucun gouvernement, institution, université ou association, et rien sur le site ne doit être lu comme une position officielle.",
        ar: "دي زد أوديسي مشروع ثقافي رقمي مستقل. لا يتحدّث باسم أي حكومة أو مؤسسة أو جامعة أو جمعية، ولا ينبغي قراءة أي محتوى فيه كموقف رسمي.",
      },
    ],
  },
  {
    heading: {
      en: "Suggesting a correction",
      fr: "Signaler une correction",
      ar: "اقتراح تصحيح",
    },
    paras: [
      {
        en: "Corrections are welcome and treated seriously. The most useful reports name the exhibit, quote the sentence in question, and point to a published source. Reviewed corrections are applied to the exhibit and, when the change is significant, reflected in its sources panel.",
        fr: "Les corrections sont bienvenues et prises au sérieux. Les signalements les plus utiles nomment l'exposition, citent la phrase concernée et indiquent une source publiée. Après examen, la correction est appliquée à l'exposition et, si le changement est important, reflétée dans son panneau de sources.",
        ar: "نرحّب بالتصحيحات ونتعامل معها بجدّية. أنفع البلاغات تلك التي تذكر اسم المعروضة، وتقتبس الجملة المعنية، وتشير إلى مصدر منشور. بعد المراجعة يُطبَّق التصحيح على المعروضة، وإذا كان التغيير مهمًّا يُذكر في لوحة مصادرها.",
      },
    ],
  },
];

const CONTACT = {
  heading: { en: "Contact and corrections", fr: "Contact et corrections", ar: "التواصل والتصحيحات" },
  withAddress: {
    en: "Write to us at",
    fr: "Écrivez-nous à",
    ar: "راسلنا على",
  },
  pending: {
    en: "A public contact channel for corrections is being prepared and will be published here.",
    fr: "Un canal de contact public pour les corrections est en préparation et sera publié ici.",
    ar: "تجري تهيئة قناة تواصل عمومية للتصحيحات وستُنشر هنا.",
  },
  more: {
    en: "Read how exhibits are researched and cited:",
    fr: "Découvrez comment les expositions sont documentées et citées :",
    ar: "اطّلع على طريقة توثيق المعروضات والاستشهاد بمصادرها:",
  },
  sourcesLink: { en: "Sources & Editorial Method", fr: "Sources & méthode éditoriale", ar: "المصادر والمنهج التحريري" },
};

function AboutPage() {
  const lang = useLang();
  return (
    <InfoPage lang={lang} kicker={KICKER} title={TITLE} intro={INTRO} sections={SECTIONS}>
      <InfoPlaque>
        <h2 className="text-base font-semibold text-foreground">{CONTACT.heading[lang]}</h2>
        <p className="mt-2">
          {hasPublicContact() ? (
            <>
              {CONTACT.withAddress[lang]}{" "}
              <a className="underline underline-offset-4" href={`mailto:${PUBLIC_CONTACT_EMAIL}`}>
                {PUBLIC_CONTACT_EMAIL}
              </a>
              .
            </>
          ) : (
            CONTACT.pending[lang]
          )}
        </p>
        <p className="mt-3">
          {CONTACT.more[lang]}{" "}
          <Link to="/sources" className="underline underline-offset-4">
            {CONTACT.sourcesLink[lang]}
          </Link>
        </p>
      </InfoPlaque>
    </InfoPage>
  );
}
