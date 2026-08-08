import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { t, useLang, type Lang } from "@/lib/i18n";
import {
  computeStamps,
  getPassport,
  setVisitorName,
  syncStamps,
  type PassportState,
  type Stamp,
} from "@/lib/passport";
import { getProgress, getLevelInfo } from "@/lib/progress";
import { eras } from "@/data/eras";
import { mapRegions } from "@/data/mapRegions";
import { figures } from "@/data/figures";
import { pageMeta, headLang } from "@/lib/seo";
import { PAGE_META } from "@/lib/pageMetaCopy";
import { Download, Printer, UserPen } from "lucide-react";

export const Route = createFileRoute("/passport")({
  head: ({ match }) =>
    pageMeta({
      lang: headLang(match),
      path: "/passport",
      ...PAGE_META["/passport"],
      noindex: true,
    }),
  component: PassportPage,
});

const SERIF = "Georgia, 'Times New Roman', serif";

type Tri = { en: string; fr: string; ar: string };
const tri = (lang: Lang, s: Tri) => (lang === "fr" ? s.fr : lang === "ar" ? s.ar : s.en);

const TXT: Record<string, Tri> = {
  brand: { en: "DZ Odyssey", fr: "DZ Odyssey", ar: "DZ Odyssey" },
  title: {
    en: "Museum Visitor Passport",
    fr: "Passeport du visiteur du musée",
    ar: "جواز زائر المتحف",
  },
  tagline: { en: "Algeria Through Time", fr: "L'Algérie à travers le temps", ar: "الجزائر عبر الزمن" },
  museumMark: {
    en: "Museum of Algerian Memory",
    fr: "Musée de la mémoire algérienne",
    ar: "متحف الذاكرة الجزائرية",
  },
  visitor: { en: "Visitor", fr: "Visiteur", ar: "الزائر" },
  noName: { en: "Museum Visitor", fr: "Visiteur du musée", ar: "زائر المتحف" },
  editName: { en: "Set your name", fr: "Définir votre nom", ar: "أدخل اسمك" },
  setVisitorName: { en: "Set visitor name", fr: "Définir le nom du visiteur", ar: "تعيين اسم الزائر" },
  namePlaceholder: {
    en: "Your name on the passport",
    fr: "Votre nom sur le passeport",
    ar: "اسمك على الجواز",
  },
  save: { en: "Save", fr: "Enregistrer", ar: "حفظ" },
  cancel: { en: "Cancel", fr: "Annuler", ar: "إلغاء" },
  passportNo: { en: "Passport N°", fr: "N° de passeport", ar: "رقم الجواز" },
  issued: { en: "Issue date", fr: "Date d'émission", ar: "تاريخ الإصدار" },
  rank: { en: "Explorer rank", fr: "Rang d'explorateur", ar: "رتبة المستكشف" },
  xp: { en: "Experience", fr: "Expérience", ar: "نقاط الخبرة" },
  xpUnit: { en: "XP", fr: "XP", ar: "نقطة" },
  journey: { en: "Museum journey", fr: "Parcours au musée", ar: "رحلة المتحف" },
  eras: { en: "Eras visited", fr: "Ères visitées", ar: "الحقب المزارة" },
  regions: { en: "Regions explored", fr: "Régions explorées", ar: "المناطق المستكشفة" },
  figuresLbl: { en: "Figures viewed", fr: "Figures vues", ar: "الشخصيات المطلع عليها" },
  cultureLbl: { en: "Culture exhibits", fr: "Expositions culturelles", ar: "المعارض الثقافية" },
  quizzes: { en: "Quizzes completed", fr: "Quiz terminés", ar: "الاختبارات المنجزة" },
  overall: { en: "Overall progress", fr: "Progression globale", ar: "التقدّم الإجمالي" },
  stamps: { en: "Museum stamp collection", fr: "Collection de tampons", ar: "مجموعة أختام المتحف" },
  earnedOf: { en: "earned of", fr: "obtenus sur", ar: "من أصل" },
  earned: { en: "Earned", fr: "Obtenu", ar: "محصَّل" },
  locked: { en: "Locked", fr: "Verrouillé", ar: "مقفل" },
  welcome: {
    en: "Your museum journey has just begun. Visit exhibits to collect your first stamp.",
    fr: "Votre parcours au musée ne fait que commencer. Visitez les expositions pour obtenir votre premier tampon.",
    ar: "رحلتك في المتحف بدأت للتو. زر المعارض لتجمع ختمك الأول.",
  },
  beginExploring: { en: "Begin exploring", fr: "Commencer l'exploration", ar: "ابدأ الاستكشاف" },
  yourJourney: { en: "Your Journey", fr: "Votre parcours", ar: "رحلتك" },
  catEras: { en: "Eras", fr: "Ères", ar: "الحقب" },
  catRegions: { en: "Regions", fr: "Régions", ar: "المناطق" },
  catFigures: { en: "Figures", fr: "Figures", ar: "الشخصيات" },
  catCulture: { en: "Culture", fr: "Culture", ar: "الثقافة" },
  catQuizzes: { en: "Quizzes", fr: "Quiz", ar: "الاختبارات" },
  emptyEras: { en: "No eras visited yet", fr: "Aucune ère visitée", ar: "لم تزر أي حقبة بعد" },
  emptyRegions: { en: "No regions explored yet", fr: "Aucune région explorée", ar: "لم تستكشف أي منطقة بعد" },
  emptyFigures: { en: "No figures viewed yet", fr: "Aucune figure consultée", ar: "لم تطّلع على أي شخصية بعد" },
  emptyCulture: { en: "No culture exhibits yet", fr: "Aucune exposition culturelle", ar: "لا معارض ثقافية بعد" },
  emptyQuizzes: { en: "No quizzes completed yet", fr: "Aucun quiz terminé", ar: "لم تنجز أي اختبار بعد" },
  curatedBy: { en: "Curated by", fr: "Sous la direction de", ar: "بإشراف" },
  curatorRole: {
    en: "Creator of DZ Odyssey",
    fr: "Créatrice de DZ Odyssey",
    ar: "منشئة DZ Odyssey",
  },
  print: { en: "Print", fr: "Imprimer", ar: "طباعة" },
  download: { en: "Download PDF", fr: "Télécharger le PDF", ar: "تنزيل PDF" },
  preparing: { en: "Preparing…", fr: "Préparation…", ar: "جارٍ التحضير…" },
  legend: {
    en: "Every stamp is a memory of an exhibit you have walked through.",
    fr: "Chaque tampon est le souvenir d'une exposition que vous avez traversée.",
    ar: "كل ختم ذكرى من معرض عبرته.",
  },
};

const CURATOR_NAME = "Dalila Fridi";

// Localized explorer rank titles, indexed by level (1..10).
const RANK_TITLES: Tri[] = [
  { en: "Curious Wanderer", fr: "Promeneur curieux", ar: "متجوّل فضولي" },
  { en: "Story Seeker", fr: "Chercheur d'histoires", ar: "باحث عن الحكايات" },
  { en: "History Apprentice", fr: "Apprenti historien", ar: "متدرّب في التاريخ" },
  { en: "Chronicle Keeper", fr: "Gardien des chroniques", ar: "حافظ السجلات" },
  { en: "Era Explorer", fr: "Explorateur des ères", ar: "مستكشف الحقب" },
  { en: "Sage of the Sands", fr: "Sage des sables", ar: "حكيم الرمال" },
  { en: "Master Storyteller", fr: "Maître conteur", ar: "راوٍ بارع" },
  { en: "Living Archive", fr: "Archive vivante", ar: "أرشيف حيّ" },
  { en: "Grand Historian", fr: "Grand historien", ar: "مؤرّخ كبير" },
  { en: "Legend of Algeria", fr: "Légende de l'Algérie", ar: "أسطورة الجزائر" },
];

const localeOf = (lang: Lang) => (lang === "fr" ? "fr-FR" : lang === "ar" ? "ar-DZ" : "en-GB");

function PassportPage() {
  const lang = useLang();
  const [state, setState] = useState<PassportState>(() => ({
    visits: { era: [], figure: [], region: [], culture: [] },
    stamps: [],
    issuedAt: "",
    visitorId: "DZ-000000",
  }));
  const [editing, setEditing] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    syncStamps();
    setState(getPassport());
    const onUpdate = () => {
      syncStamps();
      setState(getPassport());
    };
    window.addEventListener("passport-updated", onUpdate);
    window.addEventListener("progress-updated", onUpdate);
    return () => {
      window.removeEventListener("passport-updated", onUpdate);
      window.removeEventListener("progress-updated", onUpdate);
    };
  }, []);

  const stamps = useMemo(() => computeStamps(state), [state]);
  const progress = useMemo(() => getProgress(), [state]);
  const level = getLevelInfo(progress.xp);
  const quizEntries = Object.entries(progress.completed ?? {});
  const quizzes = quizEntries.length;
  const earnedStamps = stamps.filter((s) => s.earned);

  const issuedStr = state.issuedAt
    ? new Date(state.issuedAt).toLocaleDateString(localeOf(lang), {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "—";

  const visitedEras = state.visits.era
    .map((id) => eras.find((e) => e.id === id))
    .filter(Boolean) as typeof eras;
  const visitedRegions = state.visits.region
    .map((id) => mapRegions.find((r) => r.id === id))
    .filter(Boolean) as typeof mapRegions;
  const visitedFigures = state.visits.figure
    .map((id) => figures.find((f) => f.id === id))
    .filter(Boolean) as typeof figures;

  const overall = Math.round(
    (Math.min(1, visitedEras.length / Math.max(1, eras.length)) +
      Math.min(1, visitedRegions.length / Math.max(1, mapRegions.length)) +
      Math.min(1, stamps.length ? earnedStamps.length / stamps.length : 0) +
      Math.min(1, quizzes / Math.max(1, eras.length))) *
      25,
  );

  const handlePrint = useCallback(() => {
    if (typeof window !== "undefined") window.print();
  }, []);

  // The booklet is taller than a single capture can reliably rasterise, so the
  // PDF is produced through the browser's own print pipeline ("Save as PDF"),
  // which keeps text vector-sharp and honours the print stylesheet.
  const handleDownload = useCallback(async () => {
    if (typeof window === "undefined") return;
    setDownloading(true);
    try {
      await new Promise((r) => window.setTimeout(r, 50));
      window.print();
    } finally {
      setDownloading(false);
    }
  }, []);



  const startEdit = () => {
    setNameInput(state.visitorName ?? "");
    setEditing(true);
  };
  const saveName = () => {
    setVisitorName(nameInput);
    setState(getPassport());
    setEditing(false);
  };

  const displayName = state.visitorName?.trim() || tri(lang, TXT.noName);
  const firstEra = eras[0];

  return (
    <div className="min-h-dvh bg-background">
      <div className="no-print">
        <Header />
      </div>

      <main id="main" tabIndex={-1} className="mx-auto w-full max-w-4xl px-4 sm:px-6 py-6 sm:py-10">
        {/* Toolbar */}
        <div className="no-print mb-6 flex flex-wrap items-center justify-center gap-2 sm:justify-end">
          <ToolbarButton onClick={startEdit} icon={<UserPen className="h-4 w-4" aria-hidden />}>
            {tri(lang, TXT.setVisitorName)}
          </ToolbarButton>
          <ToolbarButton
            onClick={handleDownload}
            primary
            disabled={downloading}
            icon={<Download className="h-4 w-4" aria-hidden />}
          >
            {downloading ? tri(lang, TXT.preparing) : tri(lang, TXT.download)}
          </ToolbarButton>
          <ToolbarButton onClick={handlePrint} icon={<Printer className="h-4 w-4" aria-hidden />}>
            {tri(lang, TXT.print)}
          </ToolbarButton>
        </div>

        {/* Booklet */}
        <article
          id="passport-print"
          className="relative isolate z-10 overflow-hidden rounded-lg border border-border bg-card shadow-[0_18px_40px_-32px_rgba(60,40,20,0.55)]"
        >
          <GeometricBand />
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* LEFT PAGE: identity */}
            <section className="relative p-6 sm:p-8 border-b border-border md:border-b-0 md:border-e md:border-e-border">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p
                    className="text-[10px] font-semibold uppercase tracking-[0.34em] text-primary"
                    style={{ fontFamily: SERIF }}
                  >
                    {tri(lang, TXT.brand)}
                  </p>
                  <h1
                    className="mt-2 font-semibold leading-tight text-foreground"
                    style={{ fontFamily: SERIF, fontSize: "clamp(1.3rem, 1.05rem + 0.7vw, 1.7rem)" }}
                  >
                    {tri(lang, TXT.title)}
                  </h1>
                  <p className="mt-1 text-sm italic text-muted-foreground" style={{ fontFamily: SERIF }}>
                    {tri(lang, TXT.tagline)}
                  </p>
                </div>
                <BrandMark />
              </div>

              <dl className="mt-7 space-y-4">
                <Field label={tri(lang, TXT.visitor)}>
                  <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span
                      className={
                        "text-lg font-semibold " +
                        (state.visitorName?.trim() ? "text-foreground" : "text-muted-foreground italic")
                      }
                      style={{ fontFamily: SERIF }}
                    >
                      {displayName}
                    </span>
                    <button
                      type="button"
                      onClick={startEdit}
                      className="no-print rounded-sm text-xs font-medium text-primary underline underline-offset-4 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    >
                      {tri(lang, TXT.editName)}
                    </button>
                  </span>
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field label={tri(lang, TXT.passportNo)}>
                    <span className="text-base tracking-[0.18em] text-foreground" style={{ fontFamily: SERIF }}>
                      {state.visitorId}
                    </span>
                  </Field>
                  <Field label={tri(lang, TXT.issued)}>
                    <span className="text-base text-foreground" style={{ fontFamily: SERIF }}>
                      {issuedStr}
                    </span>
                  </Field>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Field label={tri(lang, TXT.rank)}>
                    <span className="text-base text-foreground" style={{ fontFamily: SERIF }}>
                      {tri(lang, RANK_TITLES[Math.min(RANK_TITLES.length, Math.max(1, level.level)) - 1])}
                    </span>
                  </Field>
                  <Field label={tri(lang, TXT.xp)}>
                    <span className="text-base text-foreground" style={{ fontFamily: SERIF }}>
                      {progress.xp}{" "}
                      <span className="text-xs text-muted-foreground">{tri(lang, TXT.xpUnit)}</span>
                    </span>
                  </Field>
                </div>
              </dl>

              {/* Curator attribution + seal */}
              <div className="mt-8 flex items-end justify-between gap-4 border-t border-border pt-5">
                <div>
                  <p
                    className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground"
                    style={{ fontFamily: SERIF }}
                  >
                    {tri(lang, TXT.curatedBy)}
                  </p>
                  <p
                    className="mt-1.5 text-lg tracking-[0.06em] text-foreground"
                    style={{ fontFamily: SERIF }}
                  >
                    {CURATOR_NAME}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{tri(lang, TXT.curatorRole)}</p>
                </div>
                <MuseumSeal label={tri(lang, TXT.museumMark)} />
              </div>
            </section>

            {/* RIGHT PAGE: journey */}
            <section className="relative p-6 sm:p-8">
              <h2
                className="font-semibold uppercase tracking-[0.3em] text-primary"
                style={{ fontFamily: SERIF, fontSize: "11px" }}
              >
                {tri(lang, TXT.journey)}
              </h2>

              <div className="mt-5 space-y-3">
                <ProgressRow
                  label={tri(lang, TXT.eras)}
                  value={visitedEras.length}
                  total={eras.length}
                />
                <ProgressRow
                  label={tri(lang, TXT.regions)}
                  value={visitedRegions.length}
                  total={mapRegions.length}
                />
                <ProgressRow label={tri(lang, TXT.figuresLbl)} value={state.visits.figure.length} />
                <ProgressRow label={tri(lang, TXT.cultureLbl)} value={state.visits.culture.length} />
                <ProgressRow label={tri(lang, TXT.quizzes)} value={quizzes} total={eras.length} />
                <div className="pt-2">
                  <div className="flex items-baseline justify-between gap-3">
                    <span
                      className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground"
                      style={{ fontFamily: SERIF }}
                    >
                      {tri(lang, TXT.overall)}
                    </span>
                    <span className="text-sm font-semibold text-foreground">{overall}%</span>
                  </div>
                  <div
                    className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted"
                    role="progressbar"
                    aria-valuenow={overall}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={tri(lang, TXT.overall)}
                  >
                    <div className="h-full rounded-full bg-primary" style={{ width: `${overall}%` }} />
                  </div>
                </div>
              </div>

            </section>
          </div>

          {/* Stamp collection, full-width booklet page */}
          <section className="border-t border-border p-6 sm:p-8">
            <div className="flex items-baseline justify-between gap-3">
              <h2
                className="font-semibold uppercase tracking-[0.28em] text-primary"
                style={{ fontFamily: SERIF, fontSize: "11px" }}
              >
                {tri(lang, TXT.stamps)}
              </h2>
              <span className="text-xs text-muted-foreground">
                {earnedStamps.length} {tri(lang, TXT.earnedOf)} {stamps.length}
              </span>
            </div>

            {earnedStamps.length === 0 && (
              <div className="mt-4 flex flex-col items-center gap-3 rounded-md border border-border bg-muted/50 p-4 text-center">
                <p className="text-sm text-foreground" style={{ fontFamily: SERIF }}>
                  {tri(lang, TXT.welcome)}
                </p>
                <Link
                  to="/timeline"
                  className="no-print inline-flex min-h-11 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  {tri(lang, TXT.beginExploring)}
                </Link>
              </div>
            )}

            <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
              {stamps.map((s) => (
                <StampCard key={s.id} stamp={s} lang={lang} />
              ))}
            </ul>
            <p className="mt-5 text-center text-[11px] italic text-muted-foreground">
              {tri(lang, TXT.legend)}
            </p>
          </section>
          <GeometricBand />
        </article>

        {/* Your Journey */}
        <section className="mt-10">
          <h2
            className="font-semibold text-foreground"
            style={{ fontFamily: SERIF, fontSize: "1.15rem" }}
          >
            {tri(lang, TXT.yourJourney)}
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <JourneyCategory
              title={tri(lang, TXT.catEras)}
              count={visitedEras.length}
              emptyText={tri(lang, TXT.emptyEras)}
              emptyLink={{
                to: "/timeline",
                label:
                  lang === "fr"
                    ? `Commencer par ${t(firstEra.title, "fr")}`
                    : lang === "ar"
                      ? `ابدأ بـ ${t(firstEra.title, "ar")}`
                      : `Begin with ${t(firstEra.title, "en")}`,
              }}
              items={visitedEras.map((e) => ({
                key: e.id,
                to: `/era/${e.id}`,
                title: t(e.title, lang),
                sub: e.dateRange,
              }))}
            />
            <JourneyCategory
              title={tri(lang, TXT.catRegions)}
              count={visitedRegions.length}
              emptyText={tri(lang, TXT.emptyRegions)}
              emptyLink={{
                to: "/atlas",
                label:
                  lang === "fr"
                    ? "Ouvrir l'atlas historique"
                    : lang === "ar"
                      ? "افتح الأطلس التاريخي"
                      : "Open the historical atlas",
              }}
              items={visitedRegions.map((r) => ({
                key: r.id,
                to: `/region/${r.id}`,
                title: t(r.name, lang),
                sub: t(r.focus, lang),
              }))}
            />
            <JourneyCategory
              title={tri(lang, TXT.catFigures)}
              count={visitedFigures.length}
              emptyText={tri(lang, TXT.emptyFigures)}
              emptyLink={{
                to: "/figures",
                label:
                  lang === "fr"
                    ? "Entrer dans le panthéon"
                    : lang === "ar"
                      ? "ادخل قاعة الشخصيات"
                      : "Enter the hall of figures",
              }}
              items={visitedFigures.slice(0, 24).map((f) => ({
                key: f.id,
                to: `/figures/${f.id}`,
                title: t(f.displayName, lang),
                sub: t(f.era, lang),
              }))}
            />
            <JourneyCategory
              title={tri(lang, TXT.catCulture)}
              count={state.visits.culture.length}
              emptyText={tri(lang, TXT.emptyCulture)}
              emptyLink={{
                to: "/culture",
                label:
                  lang === "fr"
                    ? "Découvrir les expositions culturelles"
                    : lang === "ar"
                      ? "اكتشف المعارض الثقافية"
                      : "Discover the culture exhibits",
              }}
              items={state.visits.culture.slice(0, 24).map((id) => ({
                key: id,
                to: "/culture",
                title: prettyCulture(id),
              }))}
            />
            <JourneyCategory
              title={tri(lang, TXT.catQuizzes)}
              count={quizzes}
              emptyText={tri(lang, TXT.emptyQuizzes)}
              emptyLink={{
                to: `/quiz/${firstEra.id}`,
                label:
                  lang === "fr"
                    ? `Passer le quiz : ${t(firstEra.title, "fr")}`
                    : lang === "ar"
                      ? `اجتز اختبار: ${t(firstEra.title, "ar")}`
                      : `Take the quiz: ${t(firstEra.title, "en")}`,
              }}
              items={quizEntries.slice(0, 24).map(([id, c]) => {
                const era = eras.find((e) => e.id === id);
                return {
                  key: id,
                  to: `/quiz/${id}`,
                  title: era ? t(era.title, lang) : id,
                  sub: c && c.total ? `${c.bestScore} / ${c.total}` : undefined,
                };
              })}
            />
          </div>
        </section>
      </main>

      {/* Edit name dialog */}
      {editing && (
        <div
          className="no-print fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 px-4"
          role="dialog"
          aria-modal="true"
          aria-label={tri(lang, TXT.setVisitorName)}
        >
          <div className="w-full max-w-sm rounded-lg border border-border bg-card p-5 shadow-xl">
            <p
              className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground"
              style={{ fontFamily: SERIF }}
            >
              {tri(lang, TXT.setVisitorName)}
            </p>
            <input
              autoFocus
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") saveName();
                if (e.key === "Escape") setEditing(false);
              }}
              placeholder={tri(lang, TXT.namePlaceholder)}
              aria-label={tri(lang, TXT.namePlaceholder)}
              className="mt-3 w-full rounded-md border border-border bg-background px-3 py-2 text-foreground outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              style={{ fontFamily: SERIF }}
              maxLength={40}
            />
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setEditing(false)}
                className="min-h-11 rounded-full border border-border px-4 text-sm text-foreground hover:bg-muted"
              >
                {tri(lang, TXT.cancel)}
              </button>
              <button
                onClick={saveName}
                className="min-h-11 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground hover:brightness-110"
              >
                {tri(lang, TXT.save)}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Print styling: only the booklet is printed */}
      <style>{`
        @media print {
          @page { size: A4 landscape; margin: 10mm; }
          html, body { background: #ffffff !important; }
          body * { visibility: hidden !important; }
          #passport-print, #passport-print * { visibility: visible !important; }
          .no-print, .no-print * { display: none !important; }
          #passport-print {
            position: absolute !important;
            inset-inline-start: 0;
            top: 0;
            width: 100%;
            box-shadow: none !important;
            border-color: #b9a887 !important;
            break-inside: avoid;
            page-break-inside: avoid;
          }
        }
      `}</style>
    </div>
  );
}

// ---------- helpers ----------

function prettyCulture(id: string) {
  const raw = id.includes(":") ? id.split(":").slice(1).join(":") : id;
  return raw
    .split(/[-_]/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

// ---------- sub-components ----------

function ToolbarButton({
  onClick,
  children,
  icon,
  primary,
  disabled,
}: {
  onClick: () => void;
  children: React.ReactNode;
  icon: React.ReactNode;
  primary?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={
        "inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:opacity-60 " +
        (primary
          ? "bg-primary text-primary-foreground hover:brightness-110"
          : "border border-border bg-card text-foreground hover:bg-muted")
      }
    >
      {icon}
      <span>{children}</span>
    </button>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt
        className="text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground"
        style={{ fontFamily: SERIF }}
      >
        {label}
      </dt>
      <dd className="mt-1">{children}</dd>
    </div>
  );
}

function ProgressRow({ label, value, total }: { label: string; value: number; total?: number }) {
  const pct = total ? Math.min(100, Math.round((value / total) * 100)) : value > 0 ? 100 : 0;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-sm text-foreground">{label}</span>
        <span
          className="text-sm font-semibold text-foreground"
          style={{ fontFamily: SERIF, unicodeBidi: "isolate" }}
          dir="ltr"
        >
          {total ? `${value} / ${total}` : value}
        </span>
      </div>
      <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full bg-secondary" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function StampCard({ stamp, lang }: { stamp: Stamp; lang: Lang }) {
  const earned = stamp.earned;
  const title = t(stamp.title, lang);
  const dateStr = stamp.earnedAt
    ? new Date(stamp.earnedAt).toLocaleDateString(localeOf(lang), {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : null;
  const stateLabel = earned ? tri(lang, TXT.earned) : tri(lang, TXT.locked);
  return (
    <li
      className={
        "flex flex-col items-center rounded-md border p-3 text-center " +
        (earned ? "border-accent bg-accent/10" : "border-dashed border-border bg-muted/40")
      }
    >
      <StampSeal earned={earned} label={`${title}, ${stateLabel}`} />
      <p
        className={
          "mt-2 text-[11px] font-semibold leading-snug " +
          (earned ? "text-foreground" : "text-muted-foreground")
        }
        style={{ fontFamily: SERIF }}
      >
        {title}
      </p>
      <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
        {earned ? (dateStr ? `${stateLabel} · ${dateStr}` : stateLabel) : stateLabel}
      </p>
      {!earned && stamp.progress > 0 && stamp.progress < 1 && (
        <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-secondary"
            style={{ width: `${Math.round(stamp.progress * 100)}%` }}
          />
        </div>
      )}
    </li>
  );
}

function StampSeal({ earned, label }: { earned: boolean; label: string }) {
  return (
    <svg viewBox="0 0 64 64" className="h-12 w-12" role="img" aria-label={label}>
      <circle
        cx="32"
        cy="32"
        r="28"
        fill={earned ? "currentColor" : "none"}
        className={earned ? "text-accent/35" : ""}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeDasharray={earned ? undefined : "4 4"}
        style={{ color: "var(--color-foreground)", opacity: earned ? 1 : 0.45 }}
      />
      <circle
        cx="32"
        cy="32"
        r="22"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        style={{ color: "var(--color-foreground)", opacity: earned ? 0.65 : 0.3 }}
      />
      <text
        x="32"
        y="39"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="20"
        fontWeight="700"
        fill="currentColor"
        style={{ color: "var(--color-foreground)", opacity: earned ? 1 : 0.45 }}
      >
        ⵣ
      </text>
    </svg>
  );
}

function BrandMark() {
  return (
    <svg viewBox="0 0 72 72" className="h-14 w-14 shrink-0" aria-hidden focusable="false">
      <circle
        cx="36"
        cy="36"
        r="33"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        style={{ color: "var(--color-primary)" }}
      />
      <circle
        cx="36"
        cy="36"
        r="27"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.7"
        style={{ color: "var(--color-primary)", opacity: 0.6 }}
      />
      <text
        x="36"
        y="45"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="26"
        fontWeight="700"
        fill="currentColor"
        style={{ color: "var(--color-primary)" }}
      >
        ⵣ
      </text>
    </svg>
  );
}

function MuseumSeal({ label }: { label: string }) {
  return (
    <div
      className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-full border border-accent/70 bg-accent/10 text-center"
      role="img"
      aria-label={`DZ Odyssey, ${label}`}
    >
      <span className="text-lg leading-none text-foreground" style={{ fontFamily: SERIF }} aria-hidden>
        ⵣ
      </span>
      <span
        className="mt-1 text-[8px] font-semibold uppercase tracking-[0.14em] text-foreground"
        style={{ fontFamily: SERIF }}
        aria-hidden
      >
        DZ Odyssey
      </span>
    </div>
  );
}

function GeometricBand() {
  return (
    <div
      aria-hidden
      className="h-2 w-full opacity-70"
      style={{
        backgroundImage:
          "repeating-linear-gradient(135deg, var(--color-accent) 0 6px, transparent 6px 12px), repeating-linear-gradient(45deg, var(--color-primary) 0 6px, transparent 6px 12px)",
        backgroundSize: "12px 8px",
      }}
    />
  );
}

function JourneyCategory({
  title,
  count,
  items,
  emptyText,
  emptyLink,
}: {
  title: string;
  count: number;
  items: { key: string; to: string; title: string; sub?: string }[];
  emptyText: string;
  emptyLink: { to: string; label: string };
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="mb-3 flex items-baseline justify-between">
        <h3
          className="font-semibold uppercase tracking-[0.26em] text-primary"
          style={{ fontFamily: SERIF, fontSize: "11px" }}
        >
          {title}
        </h3>
        <span className="text-xs text-muted-foreground">{count}</span>
      </div>
      {items.length === 0 ? (
        <div>
          <p className="text-sm text-muted-foreground">{emptyText}</p>
          <Link
            to={emptyLink.to}
            className="mt-1 inline-block text-sm font-medium text-primary underline underline-offset-4 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {emptyLink.label}
          </Link>
        </div>
      ) : (
        <ul className="space-y-1">
          {items.map((it) => (
            <li key={it.key}>
              <Link
                to={it.to}
                className="flex items-baseline justify-between gap-2 rounded-sm px-1 py-1 text-sm text-foreground hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <span className="truncate" style={{ fontFamily: SERIF }}>
                  {it.title}
                </span>
                {it.sub ? (
                  <span className="shrink-0 text-[11px] text-muted-foreground">{it.sub}</span>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
