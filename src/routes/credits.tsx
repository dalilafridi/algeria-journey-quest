import { createFileRoute, Link } from "@tanstack/react-router";
import { InfoPage, InfoPlaque, type InfoSection } from "@/components/InfoPage";
import { useLang } from "@/lib/i18n";
import { pageMeta, headLang } from "@/lib/seo";
import { PAGE_META } from "@/lib/pageMetaCopy";

/**
 * Public credits page.
 *
 * Publishes ONLY attribution facts the museum can stand behind without
 * external documentation: imagery created for DZ Odyssey, the deliberate
 * absence of third-party crests and federation marks, and the route a rights
 * holder should take to reach the museum.
 *
 * Deliberately absent, and must stay absent: filenames, internal
 * classifications, review notes, uncertainty about individual items, and any
 * public-domain, licence or ownership claim for which no evidence is held.
 * The internal rights inventory is not a public document.
 */
export const Route = createFileRoute("/credits")({
  head: ({ match }) =>
    pageMeta({
      lang: headLang(match),
      path: "/credits",
      ...PAGE_META["/credits"],
    }),
  component: CreditsPage,
});

const KICKER = { en: "Institutional", fr: "Institutionnel", ar: "معلومات مؤسسية" };

const TITLE = {
  en: "Image & Media Credits",
  fr: "Crédits images et médias",
  ar: "اعتمادات الصور والوسائط",
};

const INTRO = {
  en: "This page records where the museum's visual material comes from. It lists only what the museum can state with certainty. Where an item's origin is still being established, it is not claimed here.",
  fr: "Cette page indique la provenance du matériel visuel du musée. Elle ne mentionne que ce que le musée peut affirmer avec certitude. Lorsque l'origine d'un élément reste à établir, rien n'est avancé ici.",
  ar: "تسجّل هذه الصفحة مصدر المواد البصرية في المتحف. ولا تُدرج فيها إلا ما يمكن للمتحف تأكيده بيقين. أما ما لا يزال مصدره قيد التحقق فلا يُدّعى شيء بشأنه هنا.",
};

const SECTIONS: InfoSection[] = [
  {
    heading: {
      en: "Imagery created for DZ Odyssey",
      fr: "Images créées pour DZ Odyssey",
      ar: "صور أُنشئت خصيصًا لدي زد أوديسي",
    },
    paras: [
      {
        en: "Most of the visual material in the museum was created for DZ Odyssey rather than drawn from an outside collection. This includes the regional and thematic emblems, the era imagery on the timeline, the exhibit visuals for heritage sites, the M'Zab architectural studies, and the museum's own marks and identity.",
        fr: "L'essentiel du matériel visuel du musée a été créé pour DZ Odyssey plutôt que repris d'un fonds extérieur. Cela comprend les emblèmes régionaux et thématiques, les images d'époque de la chronologie, les visuels d'exposition des sites patrimoniaux, les études architecturales du M'Zab, ainsi que les marques et l'identité du musée.",
        ar: "أُنشئ معظم المواد البصرية في المتحف خصيصًا لدي زد أوديسي، لا نقلًا عن مجموعة خارجية. ويشمل ذلك شعارات المناطق والمحاور، وصور الحقب في الخط الزمني، ومشاهد المواقع التراثية، ودراسات عمارة وادي ميزاب، وعلامات المتحف وهويته.",
      },
    ],
  },
  {
    heading: {
      en: "Illustrative and reconstructed visuals",
      fr: "Visuels illustratifs et reconstitués",
      ar: "المشاهد التوضيحية والمُعاد بناؤها",
    },
    paras: [
      {
        en: "Imagery that evokes a place, a period or a structure is illustrative work made for the museum, including visuals produced with image generation tools. It is labelled as illustrative in the exhibits and is never presented as a historical photograph or as a surveyed architectural record.",
        fr: "Les images évoquant un lieu, une époque ou un édifice sont des travaux illustratifs réalisés pour le musée, y compris des visuels produits à l'aide d'outils de génération d'images. Ils sont signalés comme illustratifs dans les expositions et ne sont jamais présentés comme photographies historiques ni comme relevés architecturaux.",
        ar: "الصور التي تستحضر مكانًا أو حقبة أو بناءً هي أعمال توضيحية أُنجزت للمتحف، بما فيها مشاهد أُنتجت بأدوات توليد الصور. وتُوسم بوصفها توضيحية داخل المعروضات، ولا تُقدَّم أبدًا بوصفها صورًا تاريخية أو رفعًا معماريًا موثّقًا.",
      },
    ],
  },
  {
    heading: {
      en: "Emblems, crests and institutional marks",
      fr: "Emblèmes, écussons et marques institutionnelles",
      ar: "الشعارات والأوسمة والعلامات المؤسسية",
    },
    bullets: [
      {
        en: "The museum uses no club crest, no federation mark and no competition logo. Clubs and competitions are identified by name, by colour and by typography only.",
        fr: "Le musée n'utilise aucun écusson de club, aucune marque de fédération et aucun logo de compétition. Les clubs et compétitions sont identifiés uniquement par leur nom, leurs couleurs et la typographie.",
        ar: "لا يستخدم المتحف أي شعار نادٍ أو علامة اتحاد أو شعار بطولة. وتُعرَّف الأندية والبطولات بالاسم واللون والخط الطباعي فقط.",
      },
      {
        en: "The regional and thematic medallions are original engraved emblems designed for DZ Odyssey. They are not reproductions of any official or heraldic device.",
        fr: "Les médaillons régionaux et thématiques sont des emblèmes gravés originaux conçus pour DZ Odyssey. Ils ne reproduisent aucun insigne officiel ou héraldique.",
        ar: "الميداليات الإقليمية والمحورية شعارات محفورة أصلية صُمّمت لدي زد أوديسي، وليست استنساخًا لأي شعار رسمي أو نبالي.",
      },
      {
        en: "The DZ Odyssey name, mark and identity belong to the museum.",
        fr: "Le nom, la marque et l'identité DZ Odyssey appartiennent au musée.",
        ar: "اسم دي زد أوديسي وعلامته وهويته ملك للمتحف.",
      },
    ],
  },
  {
    heading: {
      en: "Photographs and archival material",
      fr: "Photographies et documents d'archives",
      ar: "الصور الفوتوغرافية والمواد الأرشيفية",
    },
    paras: [
      {
        en: "The museum publishes a documentary photograph only when its provenance and usage rights are documented. Until that record exists, the item is not shown. Interpretive illustrations and reconstructions support the storytelling in the galleries and are never presented as archival evidence.",
        fr: "Le musée ne publie une photographie documentaire que lorsque sa provenance et ses droits d'usage sont documentés. Tant que ce dossier n'existe pas, l'élément n'est pas montré. Les illustrations et reconstitutions interprétatives accompagnent le récit des salles et ne sont jamais présentées comme des preuves d'archives.",
        ar: "لا ينشر المتحف صورة وثائقية إلا إذا كان مصدرها وحقوق استخدامها موثّقين. وما دام ذلك السجل غير متوفر، فلا يُعرض العنصر. أما الرسوم التفسيرية وعمليات إعادة البناء فتخدم السرد داخل القاعات ولا تُقدَّم أبدًا بوصفها أدلة أرشيفية.",
      },
      {
        en: "Where the museum shows a photograph, the intention is to credit it to its photographer or collection. Credits are added as each item's provenance is confirmed, and an item is corrected or withdrawn if its attribution cannot be established.",
        fr: "Lorsque le musée présente une photographie, l'intention est de la créditer à son photographe ou à son fonds. Les crédits sont ajoutés à mesure que la provenance de chaque élément est confirmée, et un élément est corrigé ou retiré si son attribution ne peut être établie.",
        ar: "حين يعرض المتحف صورة فوتوغرافية، فالغاية أن تُنسب إلى مصوّرها أو إلى المجموعة التي تحفظها. وتُضاف الاعتمادات كلما تأكّد مصدر العنصر، ويُصحَّح العنصر أو يُسحب إذا تعذّر إثبات نسبته.",
      },
    ],
  },
  {
    heading: {
      en: "Football photography",
      fr: "Photographies de football",
      ar: "الصور الفوتوغرافية لكرة القدم",
    },
    paras: [
      {
        en: "Football photography: Fédération Algérienne de Football (FAF). This credit records the source of the photographs shown in the football galleries. It does not indicate any partnership, sponsorship or endorsement.",
        fr: "Photographies de football : Fédération Algérienne de Football (FAF). Ce crédit indique la source des photographies présentées dans les salles du football. Il ne traduit aucun partenariat, parrainage ni approbation.",
        ar: "الصور الفوتوغرافية لكرة القدم: Fédération Algérienne de Football (FAF). يسجّل هذا الاعتماد مصدر الصور المعروضة في قاعات كرة القدم، ولا يدل على أي شراكة أو رعاية أو تأييد.",
      },
    ],
  },
  {
    heading: {
      en: "Kabyle jewelry photography",
      fr: "Photographies des bijoux kabyles",
      ar: "الصور الفوتوغرافية للحلي القبائلية",
    },
    paras: [
      {
        en: "Kabyle jewelry photography: Source: El Moudjahid, Fête du Bijou d'Ath Yenni. This credit records the source of the photographs shown in the Kabyle jewelry exhibit. It does not indicate any partnership, sponsorship or endorsement.",
        fr: "Photographies des bijoux kabyles : Source : El Moudjahid, Fête du Bijou d'Ath Yenni. Ce crédit indique la source des photographies présentées dans l'exposition consacrée aux bijoux kabyles. Il ne traduit aucun partenariat, parrainage ni approbation.",
        ar: "الصور الفوتوغرافية للحلي القبائلية: المصدر: El Moudjahid، Fête du Bijou d'Ath Yenni. يسجّل هذا الاعتماد مصدر الصور المعروضة في معرض الحلي القبائلية، ولا يدل على أي شراكة أو رعاية أو تأييد.",
      },
    ],
  },

  {
    heading: {
      en: "If you hold rights to something shown here",
      fr: "Si vous détenez des droits sur un élément affiché ici",
      ar: "إذا كنت تملك حقوقًا على عنصر معروض هنا",
    },
    paras: [
      {
        en: "Tell the museum. Any item will be credited correctly, corrected, or removed on request. This applies to photographs, drawings, marks and any depiction of an identifiable person.",
        fr: "Signalez-le au musée. Tout élément sera correctement crédité, corrigé ou retiré sur demande. Cela vaut pour les photographies, les dessins, les marques et toute représentation d'une personne identifiable.",
        ar: "أبلغ المتحف بذلك. سيُنسب أي عنصر نسبةً صحيحة أو يُصحَّح أو يُزال عند الطلب. وينطبق هذا على الصور والرسوم والعلامات وأي تمثيل لشخص يمكن التعرّف عليه.",
      },
    ],
  },
];

const CONTACT = {
  heading: { en: "Contact", fr: "Contact", ar: "التواصل" },
  lead: {
    en: "Rights holders and anyone with an attribution question can reach the museum through the corrections form on the About page.",
    fr: "Les ayants droit et toute personne ayant une question d'attribution peuvent joindre le musée via le formulaire de corrections de la page À propos.",
    ar: "يمكن لأصحاب الحقوق ولكل من لديه سؤال حول النسبة التواصل مع المتحف عبر استمارة التصحيحات في صفحة «حول المتحف».",
  },
  formLink: {
    en: "Rights or attribution concern form",
    fr: "Formulaire pour les questions de droits ou d'attribution",
    ar: "استمارة مسائل الحقوق والنسبة",
  },
  sourcesLink: {
    en: "Sources & editorial method",
    fr: "Sources et méthode éditoriale",
    ar: "المصادر والمنهج التحريري",
  },
};

function CreditsPage() {
  const lang = useLang();

  return (
    <InfoPage lang={lang} kicker={KICKER} title={TITLE} intro={INTRO} sections={SECTIONS}>
      <InfoPlaque>
        <h2 className="text-sm font-semibold text-foreground">{CONTACT.heading[lang]}</h2>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">{CONTACT.lead[lang]}</p>
        <p className="mt-3 text-sm">
          <Link to="/about" hash="contact-corrections" className="underline underline-offset-4">
            {CONTACT.formLink[lang]}
          </Link>
        </p>
        <p className="mt-3 text-sm">
          <Link to="/sources" className="underline underline-offset-4">
            {CONTACT.sourcesLink[lang]}
          </Link>
        </p>
      </InfoPlaque>
    </InfoPage>
  );
}
