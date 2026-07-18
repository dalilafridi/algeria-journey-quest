import { createFileRoute, Link } from "@tanstack/react-router";

import { Header } from "@/components/Header";
import { MedallionFrame } from "@/components/brand/MedallionFrame";
import { useLang, t, type Lang } from "@/lib/i18n";
import { listClubMuseums } from "@/data/clubs";
import type { ClubMuseum } from "@/data/clubs/types";

export const Route = createFileRoute("/clubs")({
  head: () => ({
    meta: [
      { title: "Club Museums — The Hall of Algerian Football | DZ Odyssey" },
      { name: "description", content: "Step inside curated museum wings dedicated to Algeria's great football clubs, from JS Kabylie's continental glory to the historic institutions of Algiers, Sétif and Oran." },
      { property: "og:title", content: "Club Museums — The Hall of Algerian Football" },
      { property: "og:description", content: "Curated museum wings for Algeria's great football clubs — starting with JS Kabylie." },
    ],
  }),
  component: ClubsLanding,
});

const SERIF = { fontFamily: "Georgia, 'Iowan Old Style', 'Times New Roman', serif" };

function ClubsLanding() {
  const lang = useLang();
  const clubs = listClubMuseums();
  const featured = clubs.find((c) => c.featured) ?? clubs[0];
  const others = clubs.filter((c) => c.id !== featured.id);

  const T = {
    eyebrow: { en: "A new wing of the Hall of Algerian Football", fr: "Une nouvelle aile de la Galerie du Football Algérien", ar: "جناح جديد من قاعة كرة القدم الجزائرية" }[lang],
    title: { en: "Club Museums", fr: "Musées des Clubs", ar: "متاحف الأندية" }[lang],
    subtitle: {
      en: "Walk through curated museum wings for each of Algeria's great clubs — their origins, trophies, legends and matchday culture.",
      fr: "Parcourez des ailes muséales dédiées à chacun des grands clubs algériens — leurs origines, leurs trophées, leurs légendes et leur culture des jours de match.",
      ar: "تجوّل بين أجنحة متحفية مخصصة لأعرق الأندية الجزائرية — نشأتها، وألقابها، وأساطيرها، وثقافة يوم المباراة.",
    }[lang],
    featured: { en: "Flagship exhibit", fr: "Exposition phare", ar: "المعرض الرئيسي" }[lang],
    enter: { en: "Enter the museum", fr: "Entrer dans le musée", ar: "ادخل المتحف" }[lang],
    comingSoon: { en: "Coming soon", fr: "Bientôt", ar: "قريباً" }[lang],
    backToFootball: { en: "← Back to the Hall of Algerian Football", fr: "← Retour à la Galerie du Football Algérien", ar: "← العودة إلى قاعة كرة القدم الجزائرية" }[lang],
    founded: { en: "Founded", fr: "Fondé", ar: "تأسس" }[lang],
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <section
        className="relative overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at 50% 15%, oklch(0.28 0.05 60 / 0.55), transparent 65%), linear-gradient(180deg, oklch(0.985 0.02 84), oklch(0.94 0.04 76))",
        }}
      >
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.28em] font-bold text-primary">
            ⵣ · {T.eyebrow}
          </p>
          <h1 className="mt-3 text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05]" style={SERIF}>
            {T.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base sm:text-lg italic text-foreground/75" style={SERIF}>
            {T.subtitle}
          </p>
          <div className="mt-6">
            <Link
              to="/football"
              className="text-sm text-primary hover:underline"
            >
              {T.backToFootball}
            </Link>
          </div>
        </div>
      </section>

      {/* Featured club */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10">
        <FeaturedCard club={featured} lang={lang} label={T.featured} cta={T.enter} founded={T.founded} />
      </section>

      {/* Other clubs */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6" style={SERIF}>
          {{ en: "More clubs", fr: "Autres clubs", ar: "أندية أخرى" }[lang]}
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((c) => (
            <ClubCard key={c.id} club={c} lang={lang} enter={T.enter} comingSoon={T.comingSoon} founded={T.founded} />
          ))}
        </div>
      </section>
    </div>
  );
}

function FeaturedCard({ club, lang, label, cta, founded }: { club: ClubMuseum; lang: Lang; label: string; cta: string; founded: string }) {
  return (
    <Link
      to="/clubs/$clubId"
      params={{ clubId: club.id }}
      className="group block rounded-2xl overflow-hidden border transition hover:-translate-y-0.5"
      style={{
        borderColor: "oklch(0.7 0.1 75 / 0.35)",
        background:
          "linear-gradient(180deg, oklch(0.20 0.03 50 / 0.9), oklch(0.14 0.02 45 / 0.9))",
        boxShadow: "0 30px 80px -30px oklch(0 0 0 / 0.7)",
      }}
    >
      <div className="grid gap-6 md:grid-cols-[220px_1fr] p-6 sm:p-8 items-center">
        <div className="flex justify-center md:justify-start">
          <div
            className="w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] rounded-full flex items-center justify-center"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${club.identity.colors.primary}, ${club.identity.colors.secondary})`,
              boxShadow: "0 20px 45px -18px oklch(0 0 0 / 0.65), inset 0 0 0 4px oklch(1 0 0 / 0.06)",
            }}
            aria-hidden
          >
            <span className="text-4xl sm:text-5xl font-black tracking-widest text-[oklch(0.98_0.02_80)] drop-shadow" style={SERIF}>
              {club.identity.crestGlyph}
            </span>
          </div>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary">{label}</p>
          <h3 className="mt-2 text-2xl sm:text-3xl font-bold" style={SERIF}>{t(club.fullName, lang)}</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {t(club.city, lang)} · {founded} {club.founded}
          </p>
          <p className="mt-3 italic text-foreground" style={SERIF}>{t(club.tagline, lang)}</p>
          <span
            className="inline-flex items-center gap-2 mt-5 rounded-full px-4 py-2 text-sm font-semibold text-[oklch(0.15_0.02_45)]"
            style={{ background: "linear-gradient(135deg, oklch(0.92 0.13 86), oklch(0.72 0.14 72))" }}
          >
            {cta} <span aria-hidden>→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}

function ClubCard({ club, lang, enter, comingSoon, founded }: { club: ClubMuseum; lang: Lang; enter: string; comingSoon: string; founded: string }) {
  const isComplete = club.status === "complete";
  const body = (
    <div
      className="h-full rounded-2xl overflow-hidden border p-5 flex flex-col gap-3 transition"
      style={{
        borderColor: "oklch(0.7 0.1 75 / 0.3)",
        background: "linear-gradient(180deg, oklch(0.18 0.02 50 / 0.85), oklch(0.12 0.02 45 / 0.9))",
      }}
    >
      <div className="flex items-center gap-3">
        <MedallionFrame tone="bronze" size={56}>
          <div
            className="w-full h-full rounded-full flex items-center justify-center text-sm font-black tracking-widest"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${club.identity.colors.primary}, ${club.identity.colors.secondary})`,
              color: "oklch(0.98 0.02 80)",
            }}
            aria-hidden
          >
            {club.identity.crestGlyph}
          </div>
        </MedallionFrame>
        <div>
          <div className="text-base font-bold leading-tight" style={SERIF}>{t(club.fullName, lang)}</div>
          <div className="text-xs text-muted-foreground">{t(club.city, lang)} · {founded} {club.founded}</div>
        </div>
      </div>
      <p className="text-sm italic text-foreground/85" style={SERIF}>{t(club.tagline, lang)}</p>
      <div className="mt-auto pt-2">
        <span
          className={
            "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold " +
            (isComplete
              ? "text-[oklch(0.15_0.02_45)]"
              : "border border-[oklch(0.7_0.1_75_/_0.4)] text-[oklch(0.9_0.06_82)]")
          }
          style={isComplete ? { background: "linear-gradient(135deg, oklch(0.92 0.13 86), oklch(0.72 0.14 72))" } : undefined}
        >
          {isComplete ? (<>{enter} <span aria-hidden>→</span></>) : <>✦ {comingSoon}</>}
        </span>
      </div>
    </div>
  );
  return isComplete ? (
    <Link to="/clubs/$clubId" params={{ clubId: club.id }} className="block group hover:-translate-y-0.5 transition">
      {body}
    </Link>
  ) : (
    <div aria-disabled className="opacity-90">{body}</div>
  );
}
