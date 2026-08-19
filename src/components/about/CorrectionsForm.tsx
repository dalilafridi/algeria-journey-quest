/**
 * Corrections & Suggestions form, rendered inside the existing institutional
 * plaque at the bottom of /about. Anchored at #contact-corrections so exhibit
 * source panels, the footer and the credits page can link straight to it.
 */
import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { submitFeedback, MESSAGE_TYPES, type MessageType } from "@/lib/feedback.functions";
import type { Lang } from "@/lib/i18n";

type L3 = Record<Lang, string>;
const L = (en: string, fr: string, ar: string): L3 => ({ en, fr, ar });

const T = {
  heading: L("Corrections & Suggestions", "Corrections et suggestions", "التصحيحات والاقتراحات"),
  intro: L(
    "DZ Odyssey is a growing digital museum, and thoughtful contributions are welcome. If you notice a historical error, translation issue, rights concern, or story that deserves to be included, please let us know.",
    "DZ Odyssey est un musée numérique en construction, et les contributions réfléchies sont les bienvenues. Si vous relevez une erreur historique, un problème de traduction, une question de droits ou une histoire qui mériterait d'y figurer, faites-le nous savoir.",
    "دي زد أوديسي متحف رقمي في نموّ مستمر، والمساهمات المدروسة موضع ترحيب. إذا لاحظت خطأ تاريخياً أو مشكلة في الترجمة أو مسألة حقوق أو قصة تستحق أن تُدرج، فأخبرنا من فضلك.",
  ),
  support: L(
    "The most useful reports name the page or exhibit, quote the passage in question and point to a published source. Reviewed corrections are applied to the exhibit and, when the change is significant, reflected in its sources panel.",
    "Les signalements les plus utiles indiquent la page ou l'exposition, citent le passage concerné et renvoient à une source publiée. Après examen, la correction est appliquée à l'exposition et, si le changement est important, reflétée dans son panneau de sources.",
    "أنفع البلاغات تلك التي تذكر الصفحة أو المعروضة، وتقتبس المقطع المعني، وتشير إلى مصدر منشور. بعد المراجعة يُطبَّق التصحيح على المعروضة، وإذا كان التغيير مهمًّا يُذكر في لوحة مصادرها.",
  ),

  name: L("Name", "Nom", "الاسم"),
  email: L("Email address", "Adresse e-mail", "البريد الإلكتروني"),
  emailHelp: L(
    "Your email will only be used to respond to this submission.",
    "Votre adresse ne servira qu'à répondre à ce message.",
    "لن يُستخدم بريدك إلا للردّ على هذه الرسالة.",
  ),
  type: L("Type of message", "Type de message", "نوع الرسالة"),
  page: L("Page or exhibit", "Page ou exposition", "الصفحة أو المعروضة"),
  pageUrl: L("Page URL", "URL de la page", "رابط الصفحة"),
  message: L("Message", "Message", "الرسالة"),
  source: L("Link to a published source", "Lien vers une source publiée", "رابط إلى مصدر منشور"),
  consent: L(
    "I understand that my submission may be reviewed and used to improve DZ Odyssey.",
    "Je comprends que mon message peut être examiné et utilisé pour améliorer DZ Odyssey.",
    "أفهم أنّ رسالتي قد تُراجَع وتُستخدم لتحسين دي زد أوديسي.",
  ),
  privacyNote: L(
    "Your name and email are used only to review this correction or suggestion and to reply to you. They are not used for marketing, newsletters or tracking, and they are never published.",
    "Votre nom et votre adresse e-mail servent uniquement à examiner cette correction ou suggestion et à vous répondre. Ils ne servent ni au marketing, ni à une lettre d'information, ni au suivi, et ne sont jamais publiés.",
    "يُستخدم اسمك وبريدك الإلكتروني فقط لمراجعة هذا التصحيح أو الاقتراح وللردّ عليك. ولا يُستخدمان في التسويق أو النشرات البريدية أو التتبّع، ولا يُنشران أبداً.",
  ),
  required: L("Required", "Obligatoire", "مطلوب"),
  optional: L("Optional", "Facultatif", "اختياري"),
  submit: L("Send Message", "Envoyer le message", "إرسال الرسالة"),
  sending: L("Sending", "Envoi en cours", "جارٍ الإرسال"),
  errName: L("Please enter your name.", "Veuillez indiquer votre nom.", "يرجى إدخال اسمك."),
  errEmail: L(
    "Please enter a valid email address.",
    "Veuillez saisir une adresse e-mail valide.",
    "يرجى إدخال بريد إلكتروني صالح.",
  ),
  errMessage: L(
    "Please write at least 20 characters.",
    "Veuillez écrire au moins 20 caractères.",
    "يرجى كتابة 20 حرفاً على الأقل.",
  ),
  errUrl: L(
    "Please enter a valid link beginning with http or https.",
    "Veuillez saisir un lien valide commençant par http ou https.",
    "يرجى إدخال رابط صالح يبدأ بـ http أو https.",
  ),
  errConsent: L(
    "Please confirm the statement above.",
    "Veuillez confirmer la mention ci-dessus.",
    "يرجى تأكيد العبارة أعلاه.",
  ),
  errSend: L(
    "We could not send your message. Please wait a moment and try again.",
    "Nous n'avons pas pu envoyer votre message. Patientez un instant, puis réessayez.",
    "تعذّر إرسال رسالتك. يرجى الانتظار قليلاً ثم المحاولة من جديد.",
  ),
  errRate: L(
    "You have sent several messages recently. Please try again later.",
    "Vous avez envoyé plusieurs messages récemment. Réessayez plus tard.",
    "لقد أرسلت عدة رسائل مؤخراً. يرجى المحاولة لاحقاً.",
  ),
  errDuplicate: L(
    "This message has already been received.",
    "Ce message a déjà été reçu.",
    "تم استلام هذه الرسالة من قبل.",
  ),
  successHeading: L(
    "Thank you for helping improve DZ Odyssey",
    "Merci de contribuer à améliorer DZ Odyssey",
    "شكراً لمساهمتك في تحسين دي زد أوديسي",
  ),
  successBody: L(
    "Your message has been received and will be reviewed.",
    "Votre message a bien été reçu et sera examiné.",
    "تمّ استلام رسالتك وستتم مراجعتها.",
  ),
  reference: L("Reference number", "Numéro de référence", "الرقم المرجعي"),
  continue: L("Continue Exploring", "Poursuivre la visite", "متابعة الاستكشاف"),
  again: L("Send Another Message", "Envoyer un autre message", "إرسال رسالة أخرى"),
  more: L(
    "Read how exhibits are researched and cited:",
    "Découvrez comment les expositions sont documentées et citées :",
    "اطّلع على طريقة توثيق المعروضات والاستشهاد بمصادرها:",
  ),
  sourcesLink: L(
    "Sources & Editorial Method",
    "Sources & méthode éditoriale",
    "المصادر والمنهج التحريري",
  ),
} satisfies Record<string, L3>;

const TYPE_LABEL: Record<MessageType, L3> = {
  historical_correction: L("Historical correction", "Correction historique", "تصحيح تاريخي"),
  translation_correction: L(
    "Translation correction",
    "Correction de traduction",
    "تصحيح في الترجمة",
  ),
  content_suggestion: L("Content suggestion", "Suggestion de contenu", "اقتراح محتوى"),
  technical_issue: L("Technical issue", "Problème technique", "مشكلة تقنية"),
  rights_concern: L(
    "Rights or attribution concern",
    "Question de droits ou d'attribution",
    "مسألة حقوق أو نسبة",
  ),
  general_feedback: L("General feedback", "Remarque générale", "ملاحظة عامة"),
};

const inputClass =
  "mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring";
const labelClass = "block text-sm font-medium text-foreground";
const tagClass = "ms-2 text-xs font-normal text-muted-foreground";

function isHttpUrl(v: string) {
  try {
    const u = new URL(v);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

export function CorrectionsForm({ lang }: { lang: Lang }) {
  const send = useServerFn(submitFeedback);
  const startedAt = useRef(Date.now());
  const [pageTitle, setPageTitle] = useState("");
  const [pageUrl, setPageUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [reference, setReference] = useState("");
  const [resetKey, setResetKey] = useState(0);

  // Prefill from an originating exhibit: ?from=<title>&url=<path>, otherwise
  // fall back to the same-origin referrer.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const from = params.get("from");
    const url = params.get("url");
    if (from) setPageTitle(from.slice(0, 200));
    if (url) {
      setPageUrl(new URL(url, window.location.origin).toString());
      return;
    }
    const ref = document.referrer;
    if (!ref) return;
    try {
      const parsed = new URL(ref);
      if (parsed.origin === window.location.origin && parsed.pathname !== "/about") {
        setPageUrl(parsed.toString());
        if (!from) setPageTitle(parsed.pathname);
      }
    } catch {
      /* noop */
    }
  }, []);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();
    const sourceUrl = String(form.get("sourceUrl") ?? "").trim();
    const consent = form.get("consent") === "on";

    const next: Record<string, string> = {};
    if (name.length < 2) next.name = T.errName[lang];
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) next.email = T.errEmail[lang];
    if (message.length < 20 || message.length > 5000) next.message = T.errMessage[lang];
    if (sourceUrl && !isHttpUrl(sourceUrl)) next.sourceUrl = T.errUrl[lang];
    if (!consent) next.consent = T.errConsent[lang];
    setErrors(next);
    setFormError("");
    if (Object.keys(next).length > 0) return;

    setBusy(true);
    try {
      const result = await send({
        data: {
          name,
          email,
          messageType: String(form.get("messageType") ?? "general_feedback") as MessageType,
          pageTitle: String(form.get("pageTitle") ?? "").trim(),
          pageUrl: String(form.get("pageUrl") ?? "").trim(),
          message,
          sourceUrl,
          consent: true as const,
          website: String(form.get("website") ?? ""),
          elapsedMs: Date.now() - startedAt.current,
        },
      });
      if (result.ok) {
        setReference(result.reference);
      } else if (result.code === "rate_limited") {
        setFormError(T.errRate[lang]);
      } else if (result.code === "duplicate") {
        setFormError(T.errDuplicate[lang]);
      } else {
        setFormError(T.errSend[lang]);
      }
    } catch {
      setFormError(T.errSend[lang]);
    } finally {
      setBusy(false);
    }
  }

  const sourcesLine = (
    <p className="mt-6 border-t border-border/70 pt-4 text-sm">
      {T.more[lang]}{" "}
      <Link to="/sources" className="underline underline-offset-4">
        {T.sourcesLink[lang]}
      </Link>
    </p>
  );

  if (reference) {
    return (
      <>
        <h2 className="text-lg font-semibold text-foreground">{T.successHeading[lang]}</h2>
        <p className="mt-2">{T.successBody[lang]}</p>
        <p className="mt-3 rounded-md border border-border bg-background/70 px-3 py-2 font-mono text-sm">
          {T.reference[lang]}: {reference}
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            to="/"
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            {T.continue[lang]}
          </Link>
          <button
            type="button"
            onClick={() => {
              setReference("");
              setErrors({});
              setFormError("");
              startedAt.current = Date.now();
              setResetKey((k) => k + 1);
            }}
            className="inline-flex items-center rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent"
          >
            {T.again[lang]}
          </button>
        </div>
        {sourcesLine}
      </>
    );
  }

  return (
    <>
      <h2 className="text-lg font-semibold text-foreground">{T.heading[lang]}</h2>
      <p className="mt-2">{T.intro[lang]}</p>
      <p className="mt-2 text-muted-foreground">{T.support[lang]}</p>

      <form key={resetKey} onSubmit={onSubmit} noValidate className="mt-5 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="cf-name">
              {T.name[lang]}
              <span className={tagClass}>({T.required[lang]})</span>
            </label>
            <input id="cf-name" name="name" type="text" required maxLength={120} className={inputClass} />
            {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
          </div>
          <div>
            <label className={labelClass} htmlFor="cf-email">
              {T.email[lang]}
              <span className={tagClass}>({T.required[lang]})</span>
            </label>
            <input
              id="cf-email"
              name="email"
              type="email"
              required
              maxLength={254}
              aria-describedby="cf-email-help"
              className={inputClass}
            />
            <p id="cf-email-help" className="mt-1 text-xs text-muted-foreground">
              {T.emailHelp[lang]}
            </p>
            {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
          </div>
        </div>

        <div>
          <label className={labelClass} htmlFor="cf-type">
            {T.type[lang]}
            <span className={tagClass}>({T.required[lang]})</span>
          </label>
          <select id="cf-type" name="messageType" required defaultValue="historical_correction" className={inputClass}>
            {MESSAGE_TYPES.map((value) => (
              <option key={value} value={value}>
                {TYPE_LABEL[value][lang]}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="cf-page">
              {T.page[lang]}
              <span className={tagClass}>({T.optional[lang]})</span>
            </label>
            <input
              id="cf-page"
              name="pageTitle"
              type="text"
              maxLength={200}
              value={pageTitle}
              onChange={(e) => setPageTitle(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="cf-url">
              {T.pageUrl[lang]}
              <span className={tagClass}>({T.optional[lang]})</span>
            </label>
            <input
              id="cf-url"
              name="pageUrl"
              type="url"
              dir="ltr"
              maxLength={500}
              value={pageUrl}
              onChange={(e) => setPageUrl(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className={labelClass} htmlFor="cf-message">
            {T.message[lang]}
            <span className={tagClass}>({T.required[lang]})</span>
          </label>
          <textarea
            id="cf-message"
            name="message"
            required
            rows={6}
            minLength={20}
            maxLength={5000}
            className={inputClass}
          />
          {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
        </div>

        <div>
          <label className={labelClass} htmlFor="cf-source">
            {T.source[lang]}
            <span className={tagClass}>({T.optional[lang]})</span>
          </label>
          <input
            id="cf-source"
            name="sourceUrl"
            type="url"
            dir="ltr"
            maxLength={500}
            className={inputClass}
          />
          {errors.sourceUrl && <p className="mt-1 text-xs text-destructive">{errors.sourceUrl}</p>}
        </div>

        {/* Honeypot: hidden from people, tempting to bots. */}
        <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden opacity-0">
          <label htmlFor="cf-website">Website</label>
          <input id="cf-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="flex items-start gap-2">
          <input
            id="cf-consent"
            name="consent"
            type="checkbox"
            required
            className="mt-1 h-4 w-4 rounded border-border accent-primary"
          />
          <label htmlFor="cf-consent" className="text-sm text-foreground/85">
            {T.consent[lang]}
            <span className={tagClass}>({T.required[lang]})</span>
          </label>
        </div>
        {errors.consent && <p className="text-xs text-destructive">{errors.consent}</p>}

        <p className="text-xs leading-relaxed text-muted-foreground border-t border-border/60 pt-3">
          {T.privacyNote[lang]}
        </p>

        {formError && (
          <p role="alert" className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {formError}
          </p>
        )}

        <button
          type="submit"
          disabled={busy}
          className="inline-flex items-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-70"
        >
          {busy ? T.sending[lang] : T.submit[lang]}
        </button>
      </form>

      {sourcesLine}
    </>
  );
}
