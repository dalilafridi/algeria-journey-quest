import { createFileRoute, Link } from "@tanstack/react-router";
import { InfoPage, InfoPlaque, type InfoSection } from "@/components/InfoPage";
import { useLang, t as tr, type Lang } from "@/lib/i18n";
import { pageMeta, headLang } from "@/lib/seo";
import { PAGE_META } from "@/lib/pageMetaCopy";
import { SOURCES } from "@/data/provenance/sources";
import type { SourceCategory } from "@/lib/provenance";

export const Route = createFileRoute("/sources")({
  head: ({ match }) =>
    pageMeta({
      lang: headLang(match),
      path: "/sources",
      ...PAGE_META["/sources"],
    }),
  component: SourcesPage,
});

const KICKER = { en: "Editorial", fr: "Éditorial", ar: "التحرير" };
const TITLE = {
  en: "Sources & Editorial Method",
  fr: "Sources & méthode éditoriale",
  ar: "المصادر والمنهج التحريري",
};
const INTRO = {
  en: "This page explains how exhibits are researched, written, cited and corrected. It is a statement of method, not a claim that every sentence in the museum has been formally peer reviewed.",
  fr: "Cette page explique comment les expositions sont documentées, rédigées, citées et corrigées. C'est un exposé de méthode, non une affirmation que chaque phrase du musée a fait l'objet d'une évaluation académique formelle.",
  ar: "توضّح هذه الصفحة كيف تُبحَث المعروضات وتُكتب ويُستشهد لها وتُصحَّح. هي بيان منهج، لا ادّعاء بأن كل جملة في المتحف خضعت لتحكيم أكاديمي رسمي.",
};

const SECTIONS: InfoSection[] = [
  {
    heading: { en: "Research and editorial principles", fr: "Principes de recherche et d'édition", ar: "مبادئ البحث والتحرير" },
    bullets: [
      {
        en: "A claim is written only when at least one identifiable published source supports it.",
        fr: "Une affirmation n'est rédigée que si au moins une source publiée identifiable la soutient.",
        ar: "لا تُكتب أي معلومة إلا إذا دعمها مصدر منشور واحد على الأقل يمكن تحديده.",
      },
      {
        en: "Narrative style never overrides the evidence. Where the record is thin, the text says so.",
        fr: "Le style narratif ne prime jamais sur les preuves. Lorsque les traces sont minces, le texte le dit.",
        ar: "لا يطغى الأسلوب السردي على الأدلة. وحين تكون الشواهد ضئيلة، يقول النص ذلك صراحة.",
      },
      {
        en: "Contested national memory is presented with its plurality intact, without adopting a partisan voice.",
        fr: "La mémoire nationale contestée est présentée dans sa pluralité, sans adopter une voix partisane.",
        ar: "تُعرض الذاكرة الوطنية المتنازع عليها بتعدّديتها كاملة، دون تبنّي صوت حزبي.",
      },
      {
        en: "Oral tradition is valued and labelled as oral tradition rather than presented as documentary record.",
        fr: "La tradition orale est valorisée et signalée comme telle, non présentée comme document d'archive.",
        ar: "يُقدَّر التقليد الشفهي ويُشار إليه بوصفه كذلك، لا بوصفه وثيقة أرشيفية.",
      },
    ],
  },
  {
    heading: { en: "Source hierarchy", fr: "Hiérarchie des sources", ar: "تراتبية المصادر" },
    paras: [
      {
        en: "When sources disagree, they are weighed in this order, with the higher level preferred unless a specific reason is stated in the exhibit.",
        fr: "En cas de divergence, les sources sont pondérées dans cet ordre, le niveau supérieur prévalant sauf raison précise indiquée dans l'exposition.",
        ar: "عند اختلاف المصادر تُرجَّح بهذا الترتيب، مع تفضيل المستوى الأعلى ما لم يُذكر سبب محدّد داخل المعروضة.",
      },
    ],
    bullets: [
      {
        en: "Primary sources: archival documents, inscriptions, period photography, contemporaneous press, and first-hand testimony.",
        fr: "Sources primaires : documents d'archives, inscriptions, photographies d'époque, presse contemporaine des faits et témoignages directs.",
        ar: "المصادر الأولية: وثائق الأرشيف، والنقوش، وصور الحقبة، والصحافة المعاصرة للحدث، والشهادات المباشرة.",
      },
      {
        en: "Academic secondary sources: peer reviewed books, journal articles and reference encyclopedias.",
        fr: "Sources secondaires académiques : ouvrages évalués par les pairs, articles de revues et encyclopédies de référence.",
        ar: "المصادر الثانوية الأكاديمية: الكتب المحكّمة والمقالات الدورية والموسوعات المرجعية.",
      },
      {
        en: "Institutional references: museums, national archives, heritage agencies and recognized sporting federations.",
        fr: "Références institutionnelles : musées, archives nationales, agences du patrimoine et fédérations sportives reconnues.",
        ar: "المراجع المؤسسية: المتاحف والأرشيفات الوطنية وهيئات التراث والاتحادات الرياضية المعترف بها.",
      },
      {
        en: "International bodies and heritage listings such as UNESCO World Heritage records.",
        fr: "Organismes internationaux et inscriptions patrimoniales, notamment les dossiers du patrimoine mondial de l'UNESCO.",
        ar: "الهيئات الدولية وقوائم التراث، مثل سجلات التراث العالمي لليونسكو.",
      },
      {
        en: "Quality journalism and documentary work, used for recent events and for cultural or sporting memory.",
        fr: "Journalisme de qualité et travail documentaire, pour les événements récents et la mémoire culturelle ou sportive.",
        ar: "الصحافة الرصينة والأعمال الوثائقية، للأحداث الحديثة وللذاكرة الثقافية والرياضية.",
      },
    ],
  },
  {
    heading: { en: "Citation standards", fr: "Normes de citation", ar: "معايير الاستشهاد" },
    bullets: [
      {
        en: "Sources are defined once in a shared registry and referenced by exhibits, so the same work is never described in two conflicting ways.",
        fr: "Les sources sont définies une seule fois dans un registre partagé et référencées par les expositions, afin qu'une même œuvre ne soit jamais décrite de deux façons contradictoires.",
        ar: "تُعرَّف المصادر مرة واحدة في سجل مشترك وتُحيل إليها المعروضات، حتى لا يوصف العمل الواحد بطريقتين متعارضتين.",
      },
      {
        en: "Each record carries a title, a kind, a publisher or archive when known, and a public link when one exists.",
        fr: "Chaque notice comporte un titre, un type, un éditeur ou une archive lorsque connus, et un lien public lorsqu'il existe.",
        ar: "تحمل كل بطاقة عنوانًا ونوعًا وناشرًا أو أرشيفًا عند معرفته، ورابطًا عموميًا إن وُجد.",
      },
      {
        en: "Exhibits display a confidence label so a visitor can tell verified fact from widely accepted account, ongoing academic debate, or tradition.",
        fr: "Les expositions affichent un indicateur de confiance permettant de distinguer le fait vérifié, le récit largement admis, le débat académique en cours et la tradition.",
        ar: "تعرض المعروضات مؤشّر ثقة يميّز بين الحقيقة المؤكدة والرواية المقبولة على نطاق واسع والنقاش الأكاديمي الجاري والتقليد المتوارث.",
      },
    ],
  },
  {
    heading: {
      en: "Disputed and evolving interpretations",
      fr: "Interprétations contestées et évolutives",
      ar: "التفسيرات المتنازع عليها والمتغيّرة",
    },
    paras: [
      {
        en: "Dates, place names and casualty figures vary between traditions and archives. Where a figure is contested, the exhibit states the range and names the disagreement instead of choosing silently. Interpretations are revised when new scholarship becomes available.",
        fr: "Les dates, toponymes et bilans humains varient selon les traditions et les archives. Lorsqu'un chiffre est contesté, l'exposition indique la fourchette et nomme le désaccord plutôt que de trancher en silence. Les interprétations sont révisées à mesure que de nouveaux travaux paraissent.",
        ar: "تتباين التواريخ وأسماء الأماكن وأعداد الضحايا بين الروايات والأرشيفات. وعند تنازع رقم ما، تذكر المعروضة المجال وتسمّي الخلاف بدل الحسم الصامت. وتُراجَع التفسيرات كلما توفّرت أبحاث جديدة.",
      },
    ],
  },
  {
    heading: { en: "Translation review", fr: "Révision des traductions", ar: "مراجعة الترجمة" },
    bullets: [
      {
        en: "English, French and Arabic carry the same facts. A translation may adapt phrasing but may not add, soften or remove a claim.",
        fr: "L'anglais, le français et l'arabe portent les mêmes faits. Une traduction peut adapter la formulation mais ne peut ajouter, atténuer ou supprimer une affirmation.",
        ar: "تحمل الإنجليزية والفرنسية والعربية الوقائع نفسها. يجوز للترجمة تكييف الصياغة لكن لا يجوز لها إضافة معلومة أو تخفيفها أو حذفها.",
      },
      {
        en: "Names of people and places keep their Amazigh, Arabic or French forms where those forms are the ones used in the sources.",
        fr: "Les noms de personnes et de lieux conservent leurs formes amazighe, arabe ou française lorsque ce sont celles employées par les sources.",
        ar: "تحتفظ أسماء الأشخاص والأماكن بصيغها الأمازيغية أو العربية أو الفرنسية حين تكون تلك الصيغ هي المستعملة في المصادر.",
      },
      {
        en: "Machine assisted drafts are never published as final text without a human editorial pass.",
        fr: "Les brouillons assistés par machine ne sont jamais publiés comme texte définitif sans relecture humaine.",
        ar: "لا تُنشر المسودات المُعانة آليًا كنص نهائي دون مراجعة تحريرية بشرية.",
      },
    ],
  },
  {
    heading: { en: "Corrections policy", fr: "Politique de correction", ar: "سياسة التصحيح" },
    paras: [
      {
        en: "Reports of a factual error are reviewed against the cited sources. Confirmed errors are corrected in all three languages, and the source list of the exhibit is updated when the correction rests on a new reference. Where a report reflects a genuine scholarly dispute rather than an error, the exhibit is reworded to present both readings.",
        fr: "Tout signalement d'erreur factuelle est examiné au regard des sources citées. Les erreurs confirmées sont corrigées dans les trois langues, et la liste des sources de l'exposition est mise à jour lorsque la correction repose sur une nouvelle référence. Si le signalement relève d'un véritable débat scientifique plutôt que d'une erreur, l'exposition est reformulée pour présenter les deux lectures.",
        ar: "تُراجَع البلاغات عن أخطاء واقعية بمقارنتها بالمصادر المستشهد بها. وتُصحَّح الأخطاء المؤكدة في اللغات الثلاث، وتُحدَّث قائمة مصادر المعروضة عندما يستند التصحيح إلى مرجع جديد. وإذا كان البلاغ يعكس خلافًا علميًا حقيقيًا لا خطأً، تُعاد صياغة المعروضة لتعرض القراءتين.",
      },
    ],
  },
  {
    heading: {
      en: "Images and media attribution",
      fr: "Attribution des images et médias",
      ar: "نسبة الصور والوسائط",
    },
    bullets: [
      {
        en: "Archival photographs are credited to their collection or photographer when that information is known.",
        fr: "Les photographies d'archives sont créditées à leur fonds ou à leur photographe lorsque cette information est connue.",
        ar: "تُنسب الصور الأرشيفية إلى مجموعتها أو مصوّرها متى عُرفت تلك المعلومة.",
      },
      {
        en: "Illustrative or reconstructed imagery, including generated visuals used to evoke a place or a period, is labelled as illustrative and is never presented as a historical document.",
        fr: "Les images illustratives ou reconstituées, y compris les visuels générés pour évoquer un lieu ou une époque, sont signalées comme illustratives et ne sont jamais présentées comme documents historiques.",
        ar: "تُوسم الصور التوضيحية أو المُعاد بناؤها، بما فيها المرئيات المولَّدة لاستحضار مكان أو حقبة، بأنها توضيحية ولا تُقدَّم أبدًا كوثيقة تاريخية.",
      },
      {
        en: "If a rights holder identifies an item that should be credited differently or withdrawn, the item is reviewed and updated.",
        fr: "Si un ayant droit signale un élément à créditer autrement ou à retirer, cet élément est réexaminé et mis à jour.",
        ar: "إذا أشار صاحب حقوق إلى عنصر ينبغي نسبه بطريقة أخرى أو سحبه، يُعاد النظر في العنصر ويُحدَّث.",
      },
    ],
  },
];

const CATEGORY_LABEL: Record<SourceCategory, Record<Lang, string>> = {
  primary: { en: "Primary sources", fr: "Sources primaires", ar: "مصادر أولية" },
  academic: { en: "Academic references", fr: "Références académiques", ar: "مراجع أكاديمية" },
  museum: { en: "Museums and collections", fr: "Musées et collections", ar: "متاحف ومجموعات" },
  international: {
    en: "International and heritage bodies",
    fr: "Organismes internationaux et patrimoniaux",
    ar: "هيئات دولية وتراثية",
  },
  archive: { en: "Archives", fr: "Archives", ar: "أرشيفات" },
  media: { en: "Media and documentary", fr: "Médias et documentaires", ar: "إعلام وأفلام وثائقية" },
  football: { en: "Football records", fr: "Archives du football", ar: "سجلات كرة القدم" },
  further: { en: "Further reading", fr: "Pour aller plus loin", ar: "قراءات إضافية" },
};

const REGISTRY_COPY = {
  heading: { en: "Public source registry", fr: "Registre public des sources", ar: "سجل المصادر العمومي" },
  intro: {
    en: "These are the published works and institutional records the museum cites. Only public, publishable records appear here. Studio notes, drafts and internal review material are never shown.",
    fr: "Voici les ouvrages publiés et notices institutionnelles cités par le musée. Seules les notices publiques et publiables figurent ici. Les notes du Studio, les brouillons et les documents de relecture interne ne sont jamais affichés.",
    ar: "هذه هي الأعمال المنشورة والسجلات المؤسسية التي يستشهد بها المتحف. لا تظهر هنا إلا السجلات العمومية القابلة للنشر. أما ملاحظات الاستوديو والمسودات ومواد المراجعة الداخلية فلا تُعرض أبدًا.",
  },
  open: { en: "Open source", fr: "Ouvrir la source", ar: "فتح المصدر" },
};

const CONTACT = {
  heading: { en: "Report a correction", fr: "Signaler une correction", ar: "الإبلاغ عن تصحيح" },
  lead: {
    en: "Use the corrections form on the About page. Please name the exhibit, quote the passage, and add a published source when you can.",
    fr: "Utilisez le formulaire de corrections sur la page À propos. Indiquez si possible l'exposition, citez le passage et ajoutez une source publiée.",
    ar: "استخدم استمارة التصحيحات في صفحة «حول المتحف». يرجى ذكر المعروضة واقتباس المقطع وإضافة مصدر منشور إن أمكن.",
  },
  formLink: {
    en: "Corrections & Suggestions form",
    fr: "Formulaire de corrections et suggestions",
    ar: "استمارة التصحيحات والاقتراحات",
  },
  aboutLink: { en: "About the museum", fr: "À propos du musée", ar: "حول المتحف" },
};

function SourcesPage() {
  const lang = useLang();
  const grouped = new Map<SourceCategory, typeof SOURCES>();
  for (const s of SOURCES) {
    const list = (grouped.get(s.category) ?? []) as typeof SOURCES;
    grouped.set(s.category, [...list, s]);
  }
  const order: SourceCategory[] = [
    "primary",
    "archive",
    "academic",
    "museum",
    "international",
    "media",
    "football",
    "further",
  ];

  return (
    <InfoPage lang={lang} kicker={KICKER} title={TITLE} intro={INTRO} sections={SECTIONS}>
      <section className="mt-12 space-y-4">
        <h2 className="text-lg font-semibold sm:text-xl">{REGISTRY_COPY.heading[lang]}</h2>
        <p className="text-sm leading-7 text-foreground/85 sm:text-base">{REGISTRY_COPY.intro[lang]}</p>

        <div className="space-y-8 pt-2">
          {order.map((cat) => {
            const list = grouped.get(cat);
            if (!list || list.length === 0) return null;
            return (
              <div key={cat}>
                <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {CATEGORY_LABEL[cat][lang]}
                </h3>
                <ul className="mt-3 space-y-3">
                  {list.map((s) => (
                    <li key={s.id} className="rounded-lg border border-border bg-card/60 p-4">
                      <p className="text-sm font-medium text-foreground">{tr(s.title, lang)}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {[tr(s.author, lang), tr(s.publisher, lang), tr(s.archive, lang), s.publishedAt]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                      {s.url && (
                        <a
                          href={s.url}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="mt-2 inline-block text-xs underline underline-offset-4"
                        >
                          {REGISTRY_COPY.open[lang]}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <InfoPlaque>
        <h2 className="text-base font-semibold text-foreground">{CONTACT.heading[lang]}</h2>
        <p className="mt-2">{CONTACT.lead[lang]}</p>
        <p className="mt-3">
          <Link
            to="/about"
            hash="contact-corrections"
            className="underline underline-offset-4"
          >
            {CONTACT.formLink[lang]}
          </Link>
        </p>
        <p className="mt-3">
          <Link to="/about" className="underline underline-offset-4">
            {CONTACT.aboutLink[lang]}
          </Link>
        </p>
      </InfoPlaque>
    </InfoPage>
  );
}
