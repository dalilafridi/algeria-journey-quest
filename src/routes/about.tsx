import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { InfoPage, InfoPlaque, type InfoSection } from "@/components/InfoPage";
import { useLang } from "@/lib/i18n";
import { pageMeta, headLang } from "@/lib/seo";
import { PAGE_META } from "@/lib/pageMetaCopy";
import { CreatorStory } from "@/components/about/CreatorStory";
import { CorrectionsForm } from "@/components/about/CorrectionsForm";

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
  en: "DZ Odyssey is an independent digital museum devoted to Algeria. It brings together history, regions, people, culture, cuisine and football in one journey that can be explored from anywhere, in English, French and Arabic.",
  fr: "DZ Odyssey est un musée numérique indépendant consacré à l'Algérie. Il réunit l'histoire, les régions, les personnes, la culture, la cuisine et le football en un seul parcours, explorable depuis partout, en anglais, en français et en arabe.",
  ar: "دي زد أوديسي متحف رقمي مستقل مخصّص للجزائر. يجمع التاريخ والمناطق والشخصيات والثقافة والمطبخ وكرة القدم في رحلة واحدة يمكن استكشافها من أي مكان، بالإنجليزية والفرنسية والعربية.",
};

const SECTIONS: InfoSection[] = [
  {
    heading: {
      en: "The Museum and Its Mission",
      fr: "Le musée et sa mission",
      ar: "المتحف ورسالته",
    },
    paras: [
      {
        en: "DZ Odyssey presents Algeria as a connected journey rather than a collection of isolated facts. Its exhibits move across eras, regions, historical figures, cultural traditions, cuisine and football, helping visitors see the threads that connect one story to another.",
        fr: "DZ Odyssey présente l'Algérie comme un parcours continu plutôt que comme une somme de faits isolés. Ses expositions traversent les époques, les régions, les figures historiques, les traditions culturelles, la cuisine et le football, afin que les visiteurs perçoivent les fils qui relient une histoire à une autre.",
        ar: "يقدّم دي زد أوديسي الجزائر كرحلة متصلة لا كمجموعة من الوقائع المتفرّقة. تنتقل معروضاته بين الحِقب والمناطق والشخصيات التاريخية والتقاليد الثقافية والمطبخ وكرة القدم، لتساعد الزائر على رؤية الخيوط التي تربط قصة بأخرى.",
      },
      {
        en: "The museum is created for visitors in Algeria, families across the diaspora, teachers, students, travellers and anyone who wants to understand Algeria beyond the fragments in which its history is often presented.",
        fr: "Le musée s'adresse aux visiteurs en Algérie, aux familles de la diaspora, aux enseignants, aux élèves, aux voyageurs et à toute personne souhaitant comprendre l'Algérie au-delà des fragments par lesquels son histoire est souvent présentée.",
        ar: "أُنشئ المتحف لزوّار الجزائر، ولعائلات المهجر، وللمعلّمين والطلبة والمسافرين، ولكل من يريد فهم الجزائر بما يتجاوز الشذرات التي كثيرًا ما يُقدَّم بها تاريخها.",
      },
      {
        en: "The collection continues to grow as new research, stories and exhibits are completed.",
        fr: "La collection continue de s'enrichir à mesure que de nouvelles recherches, histoires et expositions sont achevées.",
        ar: "وتواصل المجموعة نموّها كلما اكتملت أبحاث وقصص ومعروضات جديدة.",
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

function AboutPage() {
  const lang = useLang();

  // Deep links such as /about#contact-corrections must land on the panel even
  // when the router hydrates after the browser's initial hash handling.
  useEffect(() => {
    if (window.location.hash !== "#contact-corrections") return;
    const el = document.getElementById("contact-corrections");
    if (!el) return;
    const id = window.setTimeout(() => el.scrollIntoView({ block: "start" }), 60);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <InfoPage lang={lang} kicker={KICKER} title={TITLE} intro={INTRO} sections={SECTIONS} beforeSections={<CreatorStory lang={lang} />}>
      <InfoPlaque id="contact-corrections">
        <CorrectionsForm lang={lang} />
      </InfoPlaque>
    </InfoPage>
  );
}
