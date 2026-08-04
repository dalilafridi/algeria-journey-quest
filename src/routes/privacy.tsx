import { createFileRoute, Link } from "@tanstack/react-router";
import { InfoPage, InfoPlaque, type InfoSection } from "@/components/InfoPage";
import { useLang } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";
import { PUBLIC_CONTACT_EMAIL, hasPublicContact } from "@/lib/siteContact";

export const Route = createFileRoute("/privacy")({
  head: () =>
    pageMeta({
      path: "/privacy",
      title: "Privacy at DZ Odyssey, what the museum stores",
      description:
        "What DZ Odyssey stores on your device, the one cookie it sets, how Ask the Curator and the audio guide handle your text, and how to erase everything.",
    }),
  component: PrivacyPage,
});

const KICKER = { en: "Visitor information", fr: "Information visiteur", ar: "معلومات الزائر" };
const TITLE = { en: "Privacy", fr: "Confidentialité", ar: "الخصوصية" };
const INTRO = {
  en: "This page describes how the public museum actually behaves today. Visiting the museum does not require an account, and your visit is kept on your own device rather than in a visitor profile held by us.",
  fr: "Cette page décrit le fonctionnement réel du musée public aujourd'hui. La visite ne nécessite aucun compte, et votre parcours reste sur votre appareil plutôt que dans un profil visiteur conservé par nous.",
  ar: "تصف هذه الصفحة السلوك الفعلي للمتحف العمومي اليوم. لا تتطلب الزيارة إنشاء حساب، ويبقى مسارك محفوظًا على جهازك لا في ملف زائر لدينا.",
};

const SECTIONS: InfoSection[] = [
  {
    heading: {
      en: "Progress and preferences stored on your device",
      fr: "Progression et préférences stockées sur votre appareil",
      ar: "التقدّم والتفضيلات المخزّنة على جهازك",
    },
    paras: [
      {
        en: "The museum uses your browser's local storage to remember your visit. These values stay in your browser and are not transmitted to a server by the museum.",
        fr: "Le musée utilise le stockage local de votre navigateur pour se souvenir de votre visite. Ces valeurs restent dans votre navigateur et ne sont pas transmises à un serveur par le musée.",
        ar: "يستخدم المتحف التخزين المحلي في متصفّحك لتذكّر زيارتك. تبقى هذه القيم داخل متصفّحك ولا يرسلها المتحف إلى أي خادم.",
      },
    ],
    bullets: [
      {
        en: "Your chosen language, so the museum reopens in English, French or Arabic.",
        fr: "La langue choisie, afin que le musée rouvre en anglais, français ou arabe.",
        ar: "اللغة التي اخترتها، ليُفتح المتحف مجددًا بالإنجليزية أو الفرنسية أو العربية.",
      },
      {
        en: "Quiz and lesson progress, discovered exhibits, and your museum passport stamps.",
        fr: "La progression des quiz et leçons, les expositions découvertes et les tampons de votre passeport.",
        ar: "تقدّم الاختبارات والدروس، والمعروضات المكتشفة، وأختام جواز المتحف.",
      },
      {
        en: "The last place you were reading, used by the Continue your journey card.",
        fr: "Le dernier endroit consulté, utilisé par la carte Reprendre le parcours.",
        ar: "آخر موضع كنت تقرأ فيه، وتستعمله بطاقة متابعة الرحلة.",
      },
      {
        en: "Interface preferences such as ambience sound, immersive mode and explain mode.",
        fr: "Les préférences d'interface comme l'ambiance sonore, le mode immersif et le mode explication.",
        ar: "تفضيلات الواجهة مثل الصوت المحيط والوضع الغامر ووضع الشرح.",
      },
    ],
  },
  {
    heading: { en: "Cookies", fr: "Cookies", ar: "ملفات تعريف الارتباط" },
    paras: [
      {
        en: "One cookie is set, named dzo_lang. It stores only your language code so the first screen can be rendered in the right language and direction before the page loads. It contains no identifier and is not used for advertising or tracking. No advertising, marketing or third party tracking cookies are set.",
        fr: "Un seul cookie est déposé, nommé dzo_lang. Il ne contient que votre code de langue, afin que le premier écran s'affiche dans la bonne langue et le bon sens de lecture avant le chargement. Il ne contient aucun identifiant et ne sert ni à la publicité ni au pistage. Aucun cookie publicitaire, marketing ou de pistage tiers n'est déposé.",
        ar: "يُوضع ملف ارتباط واحد باسم dzo_lang. لا يحفظ سوى رمز لغتك ليُعرض أول شاشة باللغة والاتجاه الصحيحين قبل اكتمال التحميل. لا يحتوي أي معرّف ولا يُستخدم للإعلان أو التتبّع. ولا تُوضع أي ملفات ارتباط إعلانية أو تسويقية أو تتبّعية من أطراف أخرى.",
      },
    ],
  },
  {
    heading: { en: "Accounts", fr: "Comptes", ar: "الحسابات" },
    paras: [
      {
        en: "The public museum has no visitor sign up and no visitor login. Your passport and progress belong to the browser you use, so they do not follow you to another device. A separate, private editorial workspace exists for the museum's own curators, and it is not reachable from the public museum.",
        fr: "Le musée public ne propose ni inscription ni connexion visiteur. Votre passeport et votre progression appartiennent au navigateur utilisé et ne vous suivent donc pas sur un autre appareil. Un espace éditorial privé distinct existe pour les conservateurs du musée, et il n'est pas accessible depuis le musée public.",
        ar: "لا يوفّر المتحف العمومي تسجيل زوّار ولا دخولًا للزوّار. جواز سفرك وتقدّمك يخصّان المتصفّح الذي تستخدمه، ولذلك لا ينتقلان معك إلى جهاز آخر. وهناك مساحة تحرير خاصة منفصلة لأمناء المتحف، غير متاحة من المتحف العمومي.",
      },
    ],
  },
  {
    heading: { en: "Analytics", fr: "Mesure d'audience", ar: "تحليلات الزيارة" },
    paras: [
      {
        en: "The museum's own code contains no analytics script, no advertising pixel and no third party tracker. The hosting platform that serves the site may keep ordinary technical request logs, as any web host does.",
        fr: "Le code du musée ne contient aucun script de mesure d'audience, aucun pixel publicitaire et aucun traceur tiers. La plateforme d'hébergement qui sert le site peut conserver des journaux techniques de requêtes ordinaires, comme tout hébergeur.",
        ar: "لا يتضمّن كود المتحف أي سكربت تحليلات ولا بكسل إعلاني ولا أي أداة تتبّع من طرف آخر. وقد تحتفظ منصّة الاستضافة التي تقدّم الموقع بسجلات تقنية اعتيادية للطلبات، كما تفعل أي استضافة.",
      },
    ],
  },
  {
    heading: { en: "Ask the Curator", fr: "Demander au conservateur", ar: "اسأل أمين المتحف" },
    paras: [
      {
        en: "When you send a question to Ask the Curator, your message is transmitted to the museum's server and forwarded to an AI provider through the hosting platform's AI gateway, which generates the answer. The conversation lives in the open panel only. Closing the panel or reloading the page ends it, and the museum does not save your conversation to a database or attach it to your identity. Please do not type personal, sensitive or confidential information into the panel.",
        fr: "Lorsque vous envoyez une question au conservateur, votre message est transmis au serveur du musée puis à un fournisseur d'IA via la passerelle d'IA de la plateforme d'hébergement, qui produit la réponse. La conversation n'existe que dans le panneau ouvert. La fermer ou recharger la page y met fin, et le musée n'enregistre pas votre conversation dans une base de données et ne l'associe pas à votre identité. Évitez d'y saisir des informations personnelles, sensibles ou confidentielles.",
        ar: "عندما ترسل سؤالًا إلى أمين المتحف، تُرسل رسالتك إلى خادم المتحف ثم تُمرَّر إلى مزوّد ذكاء اصطناعي عبر بوابة الذكاء الاصطناعي لمنصّة الاستضافة التي تولّد الجواب. تبقى المحادثة داخل اللوحة المفتوحة فقط. وإغلاق اللوحة أو إعادة تحميل الصفحة ينهيها، ولا يحفظ المتحف محادثتك في قاعدة بيانات ولا يربطها بهويتك. يُرجى عدم كتابة معلومات شخصية أو حسّاسة أو سرّية داخل اللوحة.",
      },
    ],
  },
  {
    heading: { en: "Audio guide", fr: "Guide audio", ar: "الدليل الصوتي" },
    paras: [
      {
        en: "If you start the audio guide, the exhibit text being read is sent to the same AI gateway to produce speech, and the audio is played back in your browser. Only museum exhibit text is sent, never text you typed.",
        fr: "Si vous lancez le guide audio, le texte de l'exposition lue est envoyé à la même passerelle d'IA pour produire la voix, puis l'audio est joué dans votre navigateur. Seul le texte des expositions est envoyé, jamais un texte que vous avez saisi.",
        ar: "إذا شغّلت الدليل الصوتي، يُرسل نص المعروضة المقروء إلى بوابة الذكاء الاصطناعي نفسها لتوليد الصوت، ثم يُشغَّل الصوت في متصفّحك. لا يُرسل سوى نص المعروضات، ولا يُرسل أبدًا نص كتبته أنت.",
      },
    ],
  },
  {
    heading: { en: "External services", fr: "Services externes", ar: "خدمات خارجية" },
    bullets: [
      {
        en: "The hosting platform that serves the site and runs its server functions.",
        fr: "La plateforme d'hébergement qui sert le site et exécute ses fonctions serveur.",
        ar: "منصّة الاستضافة التي تقدّم الموقع وتشغّل دوالّه الخادمية.",
      },
      {
        en: "The platform's AI gateway, used only for Ask the Curator and the audio guide.",
        fr: "La passerelle d'IA de la plateforme, utilisée uniquement pour le conservateur et le guide audio.",
        ar: "بوابة الذكاء الاصطناعي للمنصّة، وتُستخدم فقط لأمين المتحف وللدليل الصوتي.",
      },
      {
        en: "Web fonts served by Google Fonts, which receives the standard technical request needed to deliver a font file.",
        fr: "Les polices web servies par Google Fonts, qui reçoit la requête technique standard nécessaire à la livraison d'un fichier de police.",
        ar: "خطوط الويب المقدَّمة من Google Fonts، وهي تتلقّى الطلب التقني المعتاد اللازم لتسليم ملف الخط.",
      },
      {
        en: "Source links on exhibit pages point to outside institutions such as UNESCO. Once you follow such a link, that site's own policy applies.",
        fr: "Les liens de sources renvoient à des institutions extérieures telles que l'UNESCO. Dès que vous suivez un tel lien, la politique du site visité s'applique.",
        ar: "تحيل روابط المصادر إلى مؤسسات خارجية مثل اليونسكو. وبمجرد اتّباعك أحد هذه الروابط تسري سياسة ذلك الموقع.",
      },
    ],
  },
  {
    heading: {
      en: "Retention and deletion",
      fr: "Conservation et suppression",
      ar: "الاحتفاظ والحذف",
    },
    paras: [
      {
        en: "Because your progress is stored in your browser, you control how long it is kept. Clearing site data for this site in your browser settings erases your language preference, progress, discoveries and passport immediately and permanently. Some screens also offer a reset control that clears saved progress.",
        fr: "Comme votre progression est stockée dans votre navigateur, vous en maîtrisez la durée de conservation. Effacer les données de ce site dans les réglages du navigateur supprime immédiatement et définitivement votre préférence de langue, votre progression, vos découvertes et votre passeport. Certains écrans proposent aussi une commande de réinitialisation.",
        ar: "بما أن تقدّمك مخزَّن في متصفّحك، فأنت من يتحكّم في مدة الاحتفاظ به. ومسح بيانات هذا الموقع من إعدادات المتصفّح يحذف فورًا ونهائيًا تفضيل اللغة والتقدّم والاكتشافات وجواز المتحف. كما توفّر بعض الشاشات زرّ إعادة ضبط يمسح التقدّم المحفوظ.",
      },
    ],
  },
];

const CONTACT = {
  heading: { en: "Privacy questions", fr: "Questions de confidentialité", ar: "أسئلة حول الخصوصية" },
  withAddress: { en: "Write to us at", fr: "Écrivez-nous à", ar: "راسلنا على" },
  pending: {
    en: "A public contact channel for privacy questions is being prepared and will be published here.",
    fr: "Un canal de contact public pour les questions de confidentialité est en préparation et sera publié ici.",
    ar: "تجري تهيئة قناة تواصل عمومية لأسئلة الخصوصية وستُنشر هنا.",
  },
  terms: { en: "Terms of use", fr: "Conditions d'utilisation", ar: "شروط الاستخدام" },
};

function PrivacyPage() {
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
          <Link to="/terms" className="underline underline-offset-4">
            {CONTACT.terms[lang]}
          </Link>
        </p>
      </InfoPlaque>
    </InfoPage>
  );
}
