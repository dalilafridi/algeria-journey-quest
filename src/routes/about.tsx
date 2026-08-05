import { createFileRoute, Link } from "@tanstack/react-router";
import { InfoPage, InfoPlaque, type InfoSection } from "@/components/InfoPage";
import { useLang } from "@/lib/i18n";
import { pageMeta, headLang } from "@/lib/seo";
import { PAGE_META } from "@/lib/pageMetaCopy";
import { PUBLIC_CONTACT_EMAIL, hasPublicContact } from "@/lib/siteContact";
import { CreatorStory } from "@/components/about/CreatorStory";

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
    <InfoPage lang={lang} kicker={KICKER} title={TITLE} intro={INTRO} sections={SECTIONS} beforeSections={<CreatorStory lang={lang} />}>
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
