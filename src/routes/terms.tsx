import { createFileRoute, Link } from "@tanstack/react-router";
import { InfoPage, InfoPlaque, type InfoSection } from "@/components/InfoPage";
import { useLang } from "@/lib/i18n";
import { pageMeta, headLang } from "@/lib/seo";
import { PUBLIC_CONTACT_EMAIL, hasPublicContact } from "@/lib/siteContact";

export const Route = createFileRoute("/terms")({
  head: ({ match }) =>
    pageMeta({
      lang: headLang(match),
      path: "/terms",
      title: "Terms of Use, DZ Odyssey",
      description:
        "The terms for visiting DZ Odyssey: educational purpose, permitted personal use, media rights, accuracy and corrections, AI answers, external links and prohibited misuse.",
    }),
  component: TermsPage,
});

const KICKER = { en: "Visitor information", fr: "Information visiteur", ar: "معلومات الزائر" };
const TITLE = { en: "Terms of Use", fr: "Conditions d'utilisation", ar: "شروط الاستخدام" };
const INTRO = {
  en: "These terms describe how DZ Odyssey may be used. By visiting the museum you accept them. They are written in plain language and are not a substitute for legal advice.",
  fr: "Ces conditions décrivent l'usage autorisé de DZ Odyssey. En visitant le musée, vous les acceptez. Elles sont rédigées en langage clair et ne remplacent pas un conseil juridique.",
  ar: "تصف هذه الشروط كيفية استخدام دي زد أوديسي. وبزيارتك المتحف فإنك تقبلها. وهي مكتوبة بلغة واضحة ولا تُغني عن استشارة قانونية.",
};

const SECTIONS: InfoSection[] = [
  {
    heading: {
      en: "Educational and cultural purpose",
      fr: "Vocation éducative et culturelle",
      ar: "الغاية التعليمية والثقافية",
    },
    paras: [
      {
        en: "DZ Odyssey is an independent digital cultural project offered for education and cultural transmission. It is not an official record, an academic publication of record, or a source of legal, political or professional advice.",
        fr: "DZ Odyssey est un projet culturel numérique indépendant proposé à des fins éducatives et de transmission culturelle. Ce n'est ni un registre officiel, ni une publication académique de référence, ni une source de conseil juridique, politique ou professionnel.",
        ar: "دي زد أوديسي مشروع ثقافي رقمي مستقل يُقدَّم لأغراض التعليم ونقل الثقافة. وهو ليس سجلًا رسميًا ولا منشورًا أكاديميًا مرجعيًا ولا مصدرًا لمشورة قانونية أو سياسية أو مهنية.",
      },
    ],
  },
  {
    heading: {
      en: "Copyright and permitted personal use",
      fr: "Droit d'auteur et usage personnel autorisé",
      ar: "حقوق النشر والاستخدام الشخصي المسموح",
    },
    bullets: [
      {
        en: "You may read, share links, quote short passages with attribution to DZ Odyssey, and use the museum for personal study or classroom teaching.",
        fr: "Vous pouvez lire, partager des liens, citer de courts passages en créditant DZ Odyssey, et utiliser le musée pour l'étude personnelle ou l'enseignement en classe.",
        ar: "يمكنك القراءة ومشاركة الروابط واقتباس مقاطع قصيرة مع نسبها إلى دي زد أوديسي، واستخدام المتحف للدراسة الشخصية أو التدريس الصفّي.",
      },
      {
        en: "You may not republish exhibits wholesale, resell the content, or present it as your own work.",
        fr: "Vous ne pouvez pas republier des expositions en intégralité, revendre le contenu, ni le présenter comme votre propre travail.",
        ar: "لا يجوز إعادة نشر المعروضات بالكامل، ولا بيع المحتوى، ولا تقديمه على أنه من عملك.",
      },
      {
        en: "Requests for broader reuse, including publication or exhibition, are welcome and reviewed case by case.",
        fr: "Les demandes de réutilisation plus large, y compris publication ou exposition, sont les bienvenues et examinées au cas par cas.",
        ar: "نرحّب بطلبات الاستخدام الأوسع، بما فيها النشر أو العرض، وتُدرس حالة بحالة.",
      },
    ],
  },
  {
    heading: { en: "Images and media rights", fr: "Droits sur les images et médias", ar: "حقوق الصور والوسائط" },
    paras: [
      {
        en: "Some imagery is archival material credited to its collection, and some is illustrative or reconstructed visual work created for the museum. Illustrative imagery is labelled as such and must not be presented as a historical photograph. If you hold rights to an item shown here and believe it is credited incorrectly, tell us and it will be reviewed, corrected or removed.",
        fr: "Certaines images sont des documents d'archives crédités à leur fonds, d'autres sont des visuels illustratifs ou reconstitués réalisés pour le musée. Les images illustratives sont signalées comme telles et ne doivent pas être présentées comme des photographies historiques. Si vous détenez des droits sur un élément affiché ici et estimez qu'il est mal crédité, signalez-le : il sera réexaminé, corrigé ou retiré.",
        ar: "بعض الصور مواد أرشيفية منسوبة إلى مجموعاتها، وبعضها أعمال بصرية توضيحية أو مُعاد بناؤها أُنجزت للمتحف. وتُوسم الصور التوضيحية بذلك ولا يجوز تقديمها كصور تاريخية. وإذا كنت صاحب حقوق في عنصر معروض هنا وترى أن نسبه خاطئ، فأبلغنا وسيُراجَع أو يُصحَّح أو يُزال.",
      },
    ],
  },
  {
    heading: { en: "Accuracy and corrections", fr: "Exactitude et corrections", ar: "الدقة والتصحيح" },
    paras: [
      {
        en: "Exhibits are researched carefully and cite their sources, but history is revised as new work appears and errors remain possible. The museum is offered as it is, without a warranty that every detail is complete or final. Corrections are welcome and are handled as described in the Sources and Editorial Method page.",
        fr: "Les expositions sont documentées avec soin et citent leurs sources, mais l'histoire se révise à mesure que paraissent de nouveaux travaux, et des erreurs restent possibles. Le musée est proposé en l'état, sans garantie que chaque détail soit complet ou définitif. Les corrections sont bienvenues et traitées comme décrit dans la page Sources et méthode éditoriale.",
        ar: "تُبحَث المعروضات بعناية وتذكر مصادرها، لكن التاريخ يُراجَع مع ظهور أبحاث جديدة، ويبقى وقوع الأخطاء ممكنًا. يُقدَّم المتحف كما هو، دون ضمان اكتمال كل تفصيل أو نهائيته. ونرحّب بالتصحيحات وتُعالَج وفق ما توضّحه صفحة المصادر والمنهج التحريري.",
      },
    ],
  },
  {
    heading: {
      en: "AI generated answers in Ask the Curator",
      fr: "Réponses générées par IA dans Demander au conservateur",
      ar: "الأجوبة المولَّدة بالذكاء الاصطناعي في اسأل أمين المتحف",
    },
    paras: [
      {
        en: "Ask the Curator produces answers with an AI model that is instructed to speak only from the museum's own exhibits. Answers are generated automatically and are not reviewed before you read them, so they may be incomplete or mistaken. Treat them as a guide to the exhibits rather than as a citable authority, and confirm anything important against the exhibit page and its sources.",
        fr: "Le conservateur produit ses réponses avec un modèle d'IA à qui il est demandé de ne s'appuyer que sur les expositions du musée. Les réponses sont générées automatiquement et ne sont pas relues avant que vous les lisiez : elles peuvent donc être incomplètes ou erronées. Considérez-les comme un guide vers les expositions plutôt que comme une autorité citable, et vérifiez tout point important sur la page d'exposition et ses sources.",
        ar: "يولّد أمين المتحف أجوبته بنموذج ذكاء اصطناعي مُوجَّه للاعتماد على معروضات المتحف وحدها. تُنتَج الأجوبة آليًا ولا تُراجَع قبل أن تقرأها، لذا قد تكون ناقصة أو خاطئة. تعامل معها كدليل إلى المعروضات لا كمرجع قابل للاستشهاد، وتحقّق من أي معلومة مهمة من صفحة المعروضة ومصادرها.",
      },
    ],
  },
  {
    heading: { en: "External links", fr: "Liens externes", ar: "الروابط الخارجية" },
    paras: [
      {
        en: "Source links lead to outside institutions, archives and publishers. Their content, availability and policies are their own responsibility, and a link is not an endorsement.",
        fr: "Les liens de sources mènent à des institutions, archives et éditeurs extérieurs. Leur contenu, leur disponibilité et leurs politiques relèvent de leur seule responsabilité, et un lien ne vaut pas approbation.",
        ar: "تقود روابط المصادر إلى مؤسسات وأرشيفات وناشرين من خارج الموقع. ومحتواها وتوفّرها وسياساتها من مسؤوليتها وحدها، ووجود رابط لا يعني التأييد.",
      },
    ],
  },
  {
    heading: { en: "Prohibited misuse", fr: "Usages interdits", ar: "الاستخدامات الممنوعة" },
    bullets: [
      {
        en: "Do not alter, decontextualize or falsify exhibit content, including translations and captions.",
        fr: "Ne pas altérer, décontextualiser ou falsifier le contenu des expositions, y compris les traductions et légendes.",
        ar: "يُمنع تحريف محتوى المعروضات أو انتزاعه من سياقه أو تزويره، بما في ذلك الترجمات والتعليقات.",
      },
      {
        en: "Do not use the museum to promote hatred, incitement or discrimination against any community.",
        fr: "Ne pas utiliser le musée pour promouvoir la haine, l'incitation ou la discrimination envers une communauté.",
        ar: "يُمنع استخدام المتحف للترويج للكراهية أو التحريض أو التمييز ضد أي جماعة.",
      },
      {
        en: "Do not scrape at a scale that degrades the service, attempt to reach private editorial areas, or interfere with the site's operation.",
        fr: "Ne pas extraire des données à une échelle qui dégrade le service, ne pas tenter d'accéder aux espaces éditoriaux privés, ne pas perturber le fonctionnement du site.",
        ar: "يُمنع السحب الآلي بحجم يضرّ بالخدمة، أو محاولة الوصول إلى المساحات التحريرية الخاصة، أو تعطيل عمل الموقع.",
      },
    ],
  },
  {
    heading: { en: "Changes to the service", fr: "Évolutions du service", ar: "تغييرات الخدمة" },
    paras: [
      {
        en: "The museum evolves. Exhibits, halls and features may be added, revised or withdrawn, and these terms may be updated. Continuing to visit after a change means you accept the updated terms.",
        fr: "Le musée évolue. Des expositions, salles et fonctionnalités peuvent être ajoutées, révisées ou retirées, et ces conditions peuvent être mises à jour. Poursuivre la visite après une modification vaut acceptation des conditions mises à jour.",
        ar: "المتحف في تطوّر. قد تُضاف معروضات وقاعات وميزات أو تُنقَّح أو تُسحَب، وقد تُحدَّث هذه الشروط. ومواصلة الزيارة بعد أي تغيير تعني قبولك الشروط المحدَّثة.",
      },
    ],
  },
];

const CONTACT = {
  heading: { en: "Contact", fr: "Contact", ar: "التواصل" },
  withAddress: { en: "Write to us at", fr: "Écrivez-nous à", ar: "راسلنا على" },
  pending: {
    en: "A public contact channel is being prepared and will be published here.",
    fr: "Un canal de contact public est en préparation et sera publié ici.",
    ar: "تجري تهيئة قناة تواصل عمومية وستُنشر هنا.",
  },
  privacy: { en: "Privacy", fr: "Confidentialité", ar: "الخصوصية" },
  sources: { en: "Sources & Editorial Method", fr: "Sources & méthode éditoriale", ar: "المصادر والمنهج التحريري" },
};

function TermsPage() {
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
        <p className="mt-3 flex flex-wrap gap-x-4">
          <Link to="/privacy" className="underline underline-offset-4">
            {CONTACT.privacy[lang]}
          </Link>
          <Link to="/sources" className="underline underline-offset-4">
            {CONTACT.sources[lang]}
          </Link>
        </p>
      </InfoPlaque>
    </InfoPage>
  );
}
