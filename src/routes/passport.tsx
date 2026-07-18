import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { t, useLang, type Lang } from "@/lib/i18n";
import {
  computeStamps,
  getPassport,
  setVisitorName,
  type PassportState,
  type Stamp,
} from "@/lib/passport";
import { getProgress, getLevelInfo } from "@/lib/progress";
import { eras } from "@/data/eras";
import { mapRegions } from "@/data/mapRegions";
import { figures } from "@/data/figures";

export const Route = createFileRoute("/passport")({
  head: () => ({
    meta: [
      { title: "Visitor Passport — Algeria Through Time" },
      {
        name: "description",
        content:
          "Your personal DZ Odyssey museum passport — track visits, collect stamps, and export your journey.",
      },
      { property: "og:title", content: "Visitor Passport — Algeria Through Time" },
      {
        property: "og:description",
        content:
          "A gold-foil museum passport that records the eras, regions and figures you have explored.",
      },
    ],
  }),
  component: PassportPage,
});

const SERIF = "Georgia, 'Times New Roman', serif";

const TXT = {
  title: { en: "Visitor Passport", fr: "Passeport du visiteur", ar: "جواز الزائر" },
  subtitle: {
    en: "Algeria Through Time — Museum of Memory",
    fr: "L'Algérie à travers le temps — Musée de la mémoire",
    ar: "الجزائر عبر الزمن — متحف الذاكرة",
  },
  issued: { en: "Issued", fr: "Émis le", ar: "تاريخ الإصدار" },
  passportNo: { en: "Passport N°", fr: "N° de passeport", ar: "رقم الجواز" },
  visitor: { en: "Visitor", fr: "Visiteur", ar: "الزائر" },
  editName: { en: "Set your name", fr: "Définir votre nom", ar: "أدخل اسمك" },
  namePlaceholder: {
    en: "Your name on the passport",
    fr: "Votre nom sur le passeport",
    ar: "اسمك على الجواز",
  },
  save: { en: "Save", fr: "Enregistrer", ar: "حفظ" },
  cancel: { en: "Cancel", fr: "Annuler", ar: "إلغاء" },
  print: { en: "Print", fr: "Imprimer", ar: "طباعة" },
  export: { en: "Export as PDF", fr: "Exporter en PDF", ar: "تصدير PDF" },
  eras: { en: "Eras visited", fr: "Ères visitées", ar: "الحقب المزارة" },
  regions: { en: "Regions explored", fr: "Régions explorées", ar: "المناطق المستكشفة" },
  figuresLbl: { en: "Figures viewed", fr: "Figures vues", ar: "الشخصيات المطلع عليها" },
  cultureLbl: { en: "Culture exhibits", fr: "Expositions culturelles", ar: "المعارض الثقافية" },
  quizzes: { en: "Quizzes taken", fr: "Quiz effectués", ar: "الاختبارات المنجزة" },
  stamps: { en: "Museum Stamps", fr: "Tampons du musée", ar: "أختام المتحف" },
  earnedOf: { en: "earned of", fr: "obtenus sur", ar: "من أصل" },
  yourJourney: { en: "Your Journey", fr: "Votre parcours", ar: "رحلتك" },
  visitedEras: { en: "Eras", fr: "Ères", ar: "الحقب" },
  visitedRegions: { en: "Regions", fr: "Régions", ar: "المناطق" },
  visitedFigures: { en: "Figures", fr: "Figures", ar: "الشخصيات" },
  locked: { en: "Locked", fr: "Verrouillé", ar: "مقفل" },
  empty: {
    en: "No visits yet — start exploring the museum to fill your passport.",
    fr: "Aucune visite pour l'instant — explorez le musée pour remplir votre passeport.",
    ar: "لم تتم أي زيارة بعد — استكشف المتحف لملء جوازك.",
  },
  startExploring: { en: "Start exploring", fr: "Commencer à explorer", ar: "ابدأ الاستكشاف" },
  level: { en: "Rank", fr: "Rang", ar: "الرتبة" },
  xp: { en: "XP", fr: "XP", ar: "نقاط الخبرة" },
  officialSeal: { en: "Official Seal", fr: "Sceau officiel", ar: "الختم الرسمي" },
  curator: { en: "Chief Curator", fr: "Conservateur en chef", ar: "أمين المتحف" },
  legend: {
    en: "Every stamp is a memory of an exhibit you have walked through.",
    fr: "Chaque tampon est le souvenir d'une exposition que vous avez traversée.",
    ar: "كل ختم ذكرى من معرض عبرته.",
  },
};

const tri = (lang: Lang, s: { en: string; fr: string; ar: string }) =>
  lang === "fr" ? s.fr : lang === "ar" ? s.ar : s.en;

function PassportPage() {
  const lang = useLang();
  const [state, setState] = useState<PassportState>(() => getPassport());
  const [editing, setEditing] = useState(false);
  const [nameInput, setNameInput] = useState("");

  useEffect(() => {
    const onUpdate = () => setState(getPassport());
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
  const quizzes = Object.values(progress.completed).length;
  const earnedStamps = stamps.filter((s) => s.earned);

  const issued = new Date(state.issuedAt);
  const issuedStr = issued.toLocaleDateString(lang === "fr" ? "fr-FR" : lang === "ar" ? "ar-DZ" : "en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const visitedEras = state.visits.era
    .map((id) => eras.find((e) => e.id === id))
    .filter(Boolean) as typeof eras;
  const visitedRegions = state.visits.region
    .map((id) => mapRegions.find((r) => r.id === id))
    .filter(Boolean) as typeof mapRegions;
  const visitedFigures = state.visits.figure
    .map((id) => figures.find((f) => f.id === id))
    .filter(Boolean) as typeof figures;

  const totalVisits =
    state.visits.era.length +
    state.visits.region.length +
    state.visits.figure.length +
    state.visits.culture.length;

  const handlePrint = () => {
    if (typeof window !== "undefined") window.print();
  };

  const startEdit = () => {
    setNameInput(state.visitorName ?? "");
    setEditing(true);
  };
  const saveName = () => {
    setVisitorName(nameInput);
    setState(getPassport());
    setEditing(false);
  };

  return (
    <div className="min-h-dvh bg-background">
      <div className="no-print">
        <Header />
      </div>

      <main className="max-w-5xl mx-auto px-3 sm:px-6 py-6 sm:py-10">
        {/* Toolbar */}
        <div className="no-print mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground" style={{ fontFamily: SERIF }}>
              DZ Odyssey · Museum of Memory
            </p>
            <h1 className="text-2xl sm:text-3xl font-semibold text-foreground" style={{ fontFamily: SERIF }}>
              {tri(lang, TXT.title)}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={startEdit}
              className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition"
            >
              {tri(lang, TXT.editName)}
            </button>
            <button
              onClick={handlePrint}
              className="rounded-full bg-gradient-to-b from-amber-300 to-amber-500 px-4 py-2 text-sm font-semibold text-[#1a1206] shadow-[0_6px_18px_-6px_rgba(251,191,36,0.55)] hover:brightness-105 transition"
            >
              {tri(lang, TXT.export)}
            </button>
          </div>
        </div>

        {/* Passport booklet */}
        <article
          id="passport-print"
          className="relative rounded-3xl overflow-hidden shadow-[0_30px_80px_-40px_rgba(0,0,0,0.7)]"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 0%, #1c140a 0%, #0e0906 60%, #070503 100%)",
          }}
        >
          {/* Gold foil border */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-3xl"
            style={{
              padding: 2,
              background:
                "linear-gradient(135deg, #b8862a 0%, #f7e18a 30%, #eecb63 50%, #b8862a 70%, #f6df85 100%)",
              WebkitMask:
                "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-3 rounded-2xl border border-amber-300/25"
          />

          {/* Header face */}
          <div className="relative px-6 sm:px-10 pt-10 pb-8">
            <div
              aria-hidden
              className="absolute -top-24 -right-24 h-64 w-64 rounded-full opacity-30 blur-3xl"
              style={{ background: "radial-gradient(circle, #f6df85 0%, transparent 60%)" }}
            />
            <div className="flex items-start justify-between gap-6">
              <div className="min-w-0">
                <p
                  className="text-[10px] uppercase tracking-[0.4em] text-amber-200/70"
                  style={{ fontFamily: SERIF }}
                >
                  République · الجمهورية · Republic
                </p>
                <h2
                  className="mt-2 text-3xl sm:text-4xl font-semibold text-amber-100 leading-tight"
                  style={{ fontFamily: SERIF, letterSpacing: "0.02em" }}
                >
                  {tri(lang, TXT.title)}
                </h2>
                <p
                  className="mt-1 text-sm text-amber-200/70"
                  style={{ fontFamily: SERIF, fontStyle: "italic" }}
                >
                  {tri(lang, TXT.subtitle)}
                </p>
              </div>
              <div className="shrink-0">
                <GoldMedallion />
              </div>
            </div>

            {/* Identity strip */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <IdField label={tri(lang, TXT.visitor)}>
                <span className="text-amber-100" style={{ fontFamily: SERIF }}>
                  {state.visitorName || "—"}
                </span>
              </IdField>
              <IdField label={tri(lang, TXT.passportNo)}>
                <span className="tracking-widest text-amber-100" style={{ fontFamily: SERIF }}>
                  {state.visitorId}
                </span>
              </IdField>
              <IdField label={tri(lang, TXT.issued)}>
                <span className="text-amber-100" style={{ fontFamily: SERIF }}>
                  {issuedStr}
                </span>
              </IdField>
            </div>

            {/* Rank + XP */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-5 gap-3">
              <StatTile label={tri(lang, TXT.level)} value={String(level.level)} sub={level.title} />
              <StatTile label={tri(lang, TXT.xp)} value={String(progress.xp)} />
              <StatTile label={tri(lang, TXT.eras)} value={String(state.visits.era.length)} sub={`/ ${eras.length}`} />
              <StatTile label={tri(lang, TXT.regions)} value={String(state.visits.region.length)} sub={`/ ${mapRegions.length}`} />
              <StatTile label={tri(lang, TXT.figuresLbl)} value={String(state.visits.figure.length)} />
            </div>
          </div>

          <Divider />

          {/* Stamps grid */}
          <section className="relative px-6 sm:px-10 py-8">
            <SectionTitle
              en={TXT.stamps.en}
              fr={TXT.stamps.fr}
              ar={TXT.stamps.ar}
              lang={lang}
              suffix={`${earnedStamps.length} ${tri(lang, TXT.earnedOf)} ${stamps.length}`}
            />
            {totalVisits === 0 && earnedStamps.length === 0 ? (
              <div className="mt-6 rounded-2xl border border-amber-300/20 bg-amber-100/5 p-6 text-center">
                <p className="text-amber-100/80" style={{ fontFamily: SERIF }}>
                  {tri(lang, TXT.empty)}
                </p>
                <Link
                  to="/timeline"
                  className="no-print mt-4 inline-flex rounded-full bg-gradient-to-b from-amber-300 to-amber-500 px-5 py-2 text-sm font-semibold text-[#1a1206] hover:brightness-105 transition"
                >
                  {tri(lang, TXT.startExploring)}
                </Link>
              </div>
            ) : (
              <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {stamps.map((s) => (
                  <StampChip key={s.id} stamp={s} lang={lang} />
                ))}
              </div>
            )}
            <p
              className="mt-6 text-center text-[11px] uppercase tracking-[0.28em] text-amber-200/50"
              style={{ fontFamily: SERIF }}
            >
              {tri(lang, TXT.legend)}
            </p>
          </section>

          <Divider />

          {/* Journey pages */}
          <section className="relative px-6 sm:px-10 py-8">
            <SectionTitle en={TXT.yourJourney.en} fr={TXT.yourJourney.fr} ar={TXT.yourJourney.ar} lang={lang} />

            <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-5">
              <JourneyColumn title={tri(lang, TXT.visitedEras)} count={visitedEras.length}>
                {visitedEras.length === 0 ? (
                  <EmptyLine lang={lang} />
                ) : (
                  visitedEras.map((e) => (
                    <JourneyLine
                      key={e.id}
                      to={`/era/${e.id}`}
                      title={t(e.title, lang)}
                      sub={e.dateRange}
                      emoji={e.emoji}
                    />
                  ))
                )}
              </JourneyColumn>
              <JourneyColumn title={tri(lang, TXT.visitedRegions)} count={visitedRegions.length}>
                {visitedRegions.length === 0 ? (
                  <EmptyLine lang={lang} />
                ) : (
                  visitedRegions.map((r) => (
                    <JourneyLine
                      key={r.id}
                      to={`/region/${r.id}`}
                      title={t(r.name, lang)}
                      sub={t(r.focus, lang)}
                      emoji={r.emoji}
                    />
                  ))
                )}
              </JourneyColumn>
              <JourneyColumn title={tri(lang, TXT.visitedFigures)} count={visitedFigures.length}>
                {visitedFigures.length === 0 ? (
                  <EmptyLine lang={lang} />
                ) : (
                  visitedFigures.slice(0, 24).map((f) => (
                    <JourneyLine
                      key={f.id}
                      to={`/figures/${f.id}`}
                      title={t(f.displayName, lang)}
                      sub={t(f.era, lang)}
                      emoji={f.emoji}
                    />
                  ))
                )}
              </JourneyColumn>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-center">
              <MiniStat label={tri(lang, TXT.cultureLbl)} value={state.visits.culture.length} />
              <MiniStat label={tri(lang, TXT.quizzes)} value={quizzes} />
            </div>
          </section>

          {/* Signature footer */}
          <div className="relative px-6 sm:px-10 pb-10 pt-2">
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.32em] text-amber-200/60" style={{ fontFamily: SERIF }}>
                  {tri(lang, TXT.curator)}
                </p>
                <p
                  className="mt-1 text-xl text-amber-100"
                  style={{ fontFamily: "Snell Roundhand, 'Brush Script MT', cursive" }}
                >
                  El-Karim al-Djazairi
                </p>
                <div className="mt-1 h-px w-40 bg-gradient-to-r from-amber-300/60 to-transparent" />
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-[0.32em] text-amber-200/60" style={{ fontFamily: SERIF }}>
                  {tri(lang, TXT.officialSeal)}
                </p>
                <div className="mt-2 flex justify-end">
                  <OfficialSeal date={issuedStr} />
                </div>
              </div>
            </div>
          </div>
        </article>

        <div className="no-print mt-4 flex justify-center">
          <button
            onClick={handlePrint}
            className="rounded-full border border-amber-300/40 px-5 py-2 text-sm text-amber-100 hover:bg-amber-300/10 transition"
          >
            {tri(lang, TXT.print)}
          </button>
        </div>
      </main>

      {/* Edit name dialog */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 no-print">
          <div className="w-full max-w-sm rounded-2xl border border-amber-300/30 bg-[#12100c] p-5 shadow-2xl">
            <p className="text-sm uppercase tracking-[0.24em] text-amber-200/70" style={{ fontFamily: SERIF }}>
              {tri(lang, TXT.editName)}
            </p>
            <input
              autoFocus
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder={tri(lang, TXT.namePlaceholder)}
              className="mt-3 w-full rounded-lg border border-amber-300/25 bg-black/40 px-3 py-2 text-amber-100 outline-none focus:border-amber-300/70"
              style={{ fontFamily: SERIF }}
              maxLength={40}
            />
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setEditing(false)}
                className="rounded-full border border-amber-300/30 px-4 py-1.5 text-sm text-amber-100 hover:bg-amber-300/10"
              >
                {tri(lang, TXT.cancel)}
              </button>
              <button
                onClick={saveName}
                className="rounded-full bg-gradient-to-b from-amber-300 to-amber-500 px-4 py-1.5 text-sm font-semibold text-[#1a1206] hover:brightness-105"
              >
                {tri(lang, TXT.save)}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Print styling */}
      <style>{`
        @media print {
          @page { size: A4; margin: 12mm; }
          html, body { background: #ffffff !important; }
          .no-print { display: none !important; }
          #passport-print {
            box-shadow: none !important;
            break-inside: avoid;
          }
        }
      `}</style>
    </div>
  );
}

// ---------- Sub-components ----------

function IdField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-amber-300/20 bg-black/30 px-4 py-3">
      <p className="text-[10px] uppercase tracking-[0.32em] text-amber-200/60" style={{ fontFamily: SERIF }}>
        {label}
      </p>
      <div className="mt-1 text-base">{children}</div>
    </div>
  );
}

function StatTile({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-xl border border-amber-300/15 bg-gradient-to-b from-amber-100/[0.04] to-transparent px-3 py-3 text-center">
      <p className="text-[10px] uppercase tracking-[0.28em] text-amber-200/60" style={{ fontFamily: SERIF }}>
        {label}
      </p>
      <p className="mt-1 text-xl font-semibold text-amber-100" style={{ fontFamily: SERIF }}>
        {value}
        {sub ? <span className="text-xs font-normal text-amber-200/60"> {sub}</span> : null}
      </p>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-amber-300/15 bg-black/20 px-3 py-2">
      <p className="text-[10px] uppercase tracking-[0.28em] text-amber-200/60" style={{ fontFamily: SERIF }}>
        {label}
      </p>
      <p className="text-lg text-amber-100" style={{ fontFamily: SERIF }}>{value}</p>
    </div>
  );
}

function Divider() {
  return (
    <div
      aria-hidden
      className="relative mx-6 sm:mx-10 h-px"
      style={{
        background:
          "linear-gradient(90deg, transparent 0%, rgba(246,223,133,0.5) 20%, rgba(246,223,133,0.8) 50%, rgba(246,223,133,0.5) 80%, transparent 100%)",
      }}
    />
  );
}

function SectionTitle({
  en,
  fr,
  ar,
  lang,
  suffix,
}: {
  en: string;
  fr: string;
  ar: string;
  lang: Lang;
  suffix?: string;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <h3 className="text-lg sm:text-xl font-semibold text-amber-100" style={{ fontFamily: SERIF }}>
        {lang === "fr" ? fr : lang === "ar" ? ar : en}
      </h3>
      {suffix ? (
        <span className="text-xs text-amber-200/60" style={{ fontFamily: SERIF }}>
          {suffix}
        </span>
      ) : null}
    </div>
  );
}

function StampChip({ stamp, lang }: { stamp: Stamp; lang: Lang }) {
  const earned = stamp.earned;
  return (
    <div
      className={
        "relative rounded-2xl border p-4 text-center transition " +
        (earned
          ? "border-amber-300/60 bg-gradient-to-b from-amber-100/10 to-amber-500/5 shadow-[0_10px_30px_-16px_rgba(246,223,133,0.6)]"
          : "border-amber-300/10 bg-black/20 opacity-70")
      }
    >
      <div className="mx-auto flex h-16 w-16 items-center justify-center">
        <StampSeal earned={earned} />
      </div>
      <p
        className={
          "mt-2 text-xs font-semibold leading-snug " +
          (earned ? "text-amber-100" : "text-amber-200/50")
        }
        style={{ fontFamily: SERIF }}
      >
        {t(stamp.title, lang)}
      </p>
      {!earned && (
        <p className="mt-1 text-[10px] uppercase tracking-widest text-amber-200/40" style={{ fontFamily: SERIF }}>
          {t(stamp.hint, lang)}
        </p>
      )}
      {!earned && stamp.progress > 0 && stamp.progress < 1 && (
        <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-amber-200/10">
          <div
            className="h-full bg-gradient-to-r from-amber-300 to-amber-500"
            style={{ width: `${Math.round(stamp.progress * 100)}%` }}
          />
        </div>
      )}
    </div>
  );
}

function StampSeal({ earned }: { earned: boolean }) {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full">
      <defs>
        <radialGradient id="stampGold" cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#fff2b8" />
          <stop offset="55%" stopColor="#f0c14b" />
          <stop offset="100%" stopColor="#8a5a12" />
        </radialGradient>
      </defs>
      <circle
        cx="32"
        cy="32"
        r="28"
        fill={earned ? "url(#stampGold)" : "transparent"}
        stroke={earned ? "#f6df85" : "rgba(246,223,133,0.35)"}
        strokeWidth="1.4"
        strokeDasharray={earned ? undefined : "3 3"}
      />
      <circle
        cx="32"
        cy="32"
        r="22"
        fill="none"
        stroke={earned ? "rgba(60,30,5,0.55)" : "rgba(246,223,133,0.35)"}
        strokeWidth="0.8"
      />
      <text
        x="32"
        y="37"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="20"
        fill={earned ? "#3a2405" : "rgba(246,223,133,0.5)"}
        fontWeight="700"
      >
        ⵣ
      </text>
    </svg>
  );
}

function GoldMedallion() {
  return (
    <svg viewBox="0 0 96 96" className="h-20 w-20">
      <defs>
        <radialGradient id="medal" cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#fff2b8" />
          <stop offset="60%" stopColor="#e9c15a" />
          <stop offset="100%" stopColor="#7a4d0c" />
        </radialGradient>
      </defs>
      <circle cx="48" cy="48" r="44" fill="url(#medal)" stroke="#f6df85" strokeWidth="1.5" />
      <circle cx="48" cy="48" r="36" fill="none" stroke="rgba(58,36,5,0.55)" strokeWidth="0.8" />
      <text x="48" y="55" textAnchor="middle" fontFamily="Georgia, serif" fontSize="26" fill="#3a2405" fontWeight="700">
        ⵣ
      </text>
      <text
        x="48"
        y="18"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="7"
        letterSpacing="2"
        fill="#3a2405"
      >
        DZ · ODYSSEY
      </text>
    </svg>
  );
}

function OfficialSeal({ date }: { date: string }) {
  return (
    <svg viewBox="0 0 100 100" className="h-24 w-24">
      <defs>
        <radialGradient id="sealGold" cx="50%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#fff2b8" />
          <stop offset="60%" stopColor="#e9c15a" />
          <stop offset="100%" stopColor="#7a4d0c" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill="url(#sealGold)" opacity="0.9" />
      <circle cx="50" cy="50" r="46" fill="none" stroke="#f6df85" strokeWidth="1.2" />
      <circle cx="50" cy="50" r="36" fill="none" stroke="rgba(58,36,5,0.6)" strokeWidth="0.6" />
      <text x="50" y="45" textAnchor="middle" fontFamily="Georgia, serif" fontSize="9" letterSpacing="2" fill="#3a2405">
        MUSEUM OF MEMORY
      </text>
      <text x="50" y="58" textAnchor="middle" fontFamily="Georgia, serif" fontSize="18" fontWeight="700" fill="#3a2405">
        ⵣ
      </text>
      <text x="50" y="72" textAnchor="middle" fontFamily="Georgia, serif" fontSize="6" letterSpacing="1" fill="#3a2405">
        {date}
      </text>
    </svg>
  );
}

function JourneyColumn({
  title,
  count,
  children,
}: {
  title: string;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-amber-300/15 bg-black/25 p-4">
      <div className="mb-3 flex items-baseline justify-between">
        <p className="text-[11px] uppercase tracking-[0.28em] text-amber-200/70" style={{ fontFamily: SERIF }}>
          {title}
        </p>
        <span className="text-xs text-amber-200/60" style={{ fontFamily: SERIF }}>{count}</span>
      </div>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

function JourneyLine({
  to,
  title,
  sub,
  emoji,
}: {
  to: string;
  title: string;
  sub?: string;
  emoji?: string;
}) {
  return (
    <Link
      to={to}
      className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-amber-100/90 hover:bg-amber-300/10 transition"
    >
      <span aria-hidden className="text-sm">{emoji ?? "✦"}</span>
      <span className="flex-1 truncate text-sm" style={{ fontFamily: SERIF }}>{title}</span>
      {sub ? <span className="hidden sm:inline text-[10px] text-amber-200/50">{sub}</span> : null}
    </Link>
  );
}

function EmptyLine({ lang }: { lang: Lang }) {
  const msg =
    lang === "fr" ? "Aucune visite" : lang === "ar" ? "لا زيارة بعد" : "No visits yet";
  return (
    <p className="text-xs italic text-amber-200/50" style={{ fontFamily: SERIF }}>
      {msg}
    </p>
  );
}
