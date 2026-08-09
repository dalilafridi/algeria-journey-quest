/**
 * Women of the Algerian Revolution (1954 – 1962) — foundation exhibit.
 *
 * Text-led by design: no hero photograph is used until rights-cleared
 * historical images are secured. Every piece of content is declared in
 * `src/data/womenOfIndependence.ts`; this file owns only the curated section
 * order and the layout composition, built entirely from `@/components/exhibit`.
 */

import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { useLang, t as tr, type LocalizedString } from "@/lib/i18n";
import { pageMeta, headLang } from "@/lib/seo";
import { PAGE_META } from "@/lib/pageMetaCopy";
import { ExhibitProvenance } from "@/components/provenance/ExhibitProvenance";
import {
  Section,
  EyebrowTitle,
  Prose,
  Plaque,
  ExhibitHero,
  NumberedGrid,
  DataStatsCard,
  RelatedExhibits,
  SERIF,
  type NumberedItem,
  type RelatedExhibit,
} from "@/components/exhibit";
import {
  WOI_IDENTITY,
  WOI_OPENING,
  WOI_ROLES,
  WOI_ROLES_HEADING,
  WOI_WOMEN,
  WOI_WOMEN_HEADING,
  WOI_BEYOND,
  WOI_NUMBERS,
  WOI_AFTER,
  WOI_GROWING,
  WOI_SOURCE_INTRO,
  type WomanEntry,
} from "@/data/womenOfIndependence";

const L = (en: string, fr: string, ar: string): LocalizedString => ({ en, fr, ar });

export const Route = createFileRoute("/women-of-independence")({
  head: ({ match }) =>
    pageMeta({
      lang: headLang(match),
      path: "/women-of-independence",
      ...PAGE_META["/women-of-independence"],
      type: "article",
    }),
  component: WomenOfIndependenceExhibit,
});

/* ------------------------------------------------------------------ copy */

const UI = {
  rolesEyebrow: L("Roles", "Rôles", "الأدوار"),
  womenEyebrow: L("Portraits", "Portraits", "صور"),
  beyondEyebrow: L("Memory", "Mémoire", "الذاكرة"),
  numbersEyebrow: L("Research", "Recherche", "بحث"),
  afterEyebrow: L("Afterwards", "Ensuite", "بعد ذلك"),
  growingEyebrow: L("Living exhibit", "Exposition vivante", "معرض حيّ"),
  openingEyebrow: L("Introduction", "Introduction", "مقدمة"),
  openingTitle: L(
    "A struggle carried in many places",
    "Une lutte menée en de nombreux lieux",
    "نضال خيضَ في أماكن كثيرة",
  ),
  visitFigure: L("Visit her exhibit", "Voir son exposition", "زر صفحتها"),
  datesPending: L(
    "Life dates pending verified sourcing.",
    "Dates de vie en attente de sources vérifiées.",
    "تواريخ الحياة في انتظار مصادر موثّقة.",
  ),
  statsLabel: L(
    "Museum data card · women in the war of liberation",
    "Fiche muséale · les femmes dans la guerre de libération",
    "بطاقة متحفية · النساء في حرب التحرير",
  ),
  relatedLabel: L("Related exhibit", "Exposition liée", "معرض ذو صلة"),
  relatedEnter: L("Enter →", "Entrer →", "ادخل →"),
  relatedHeading: L("Continue the visit", "Poursuivre la visite", "تابع الزيارة"),
  backLabel: L("← Return to museum", "← Retour au musée", "← عودة إلى المتحف"),
  footer: L(
    "Women of the Algerian Revolution · a permanent exhibit of DZ Odyssey.",
    "Les femmes de la Révolution algérienne · une exposition permanente de DZ Odyssey.",
    "نساء الثورة الجزائرية · معرض دائم في دي زد أوديسي.",
  ),
};

const RELATED: RelatedExhibit[] = [
  {
    to: "/era/$eraId",
    params: { eraId: "independence" },
    label: L("War of Independence", "Guerre d'indépendance", "حرب الاستقلال"),
    body: L(
      "The era that frames this exhibit, from the first day of November 1954 to independence in 1962.",
      "L'époque qui encadre cette exposition, du 1er novembre 1954 à l'indépendance en 1962.",
      "الحقبة التي يندرج فيها هذا المعرض، من أول نوفمبر 1954 إلى الاستقلال سنة 1962.",
    ),
  },
  {
    to: "/figures",
    label: L("Hall of Legends", "Panthéon des figures", "قاعة الشخصيات"),
    body: L(
      "Individual exhibits for the figures of Algerian history, including the women of the revolution.",
      "Les expositions consacrées aux figures de l'histoire algérienne, dont les femmes de la révolution.",
      "المعارض المخصّصة لشخصيات التاريخ الجزائري، ومنها نساء الثورة.",
    ),
  },
  {
    to: "/region/$regionId",
    params: { regionId: "algiers" },
    label: L("Algiers", "Alger", "الجزائر العاصمة"),
    body: L(
      "The Casbah and the city where much of the urban resistance described here took place.",
      "La Casbah et la ville où s'est déroulée une grande part de la résistance urbaine décrite ici.",
      "القصبة والمدينة التي جرى فيها جانب كبير من المقاومة الحضرية الموصوفة هنا.",
    ),
  },
];

/* ------------------------------------------------------------- component */

function WomenOfIndependenceExhibit() {
  const lang = useLang();

  const roleItems: NumberedItem[] = WOI_ROLES.map((r) => ({
    title: r.heading,
    meta: r.term ? { en: r.term, fr: r.term, ar: r.term } : undefined,
    role: r.definition,
    body: r.body,
  }));

  return (
    <div className="min-h-dvh bg-parchment">
      <Header />

      <main id="main" tabIndex={-1}>
        <ExhibitHero
          eyebrow={WOI_IDENTITY.eyebrow}
          title={WOI_IDENTITY.title}
          subtitle={WOI_IDENTITY.subtitle}
          lede={WOI_IDENTITY.teaser}
          meta={
            <span dir="ltr" style={{ unicodeBidi: "isolate" }}>
              {WOI_IDENTITY.dateRange}
            </span>
          }
          backTo="/timeline"
          backLabel={UI.backLabel}
        />

        <Section tone="ivory">
          <EyebrowTitle eyebrow={UI.openingEyebrow} title={UI.openingTitle} />
          <Prose>
            {WOI_OPENING.map((p, i) => (
              <p key={i}>{tr(p, lang)}</p>
            ))}
          </Prose>
        </Section>

        <Section tone="sand">
          <EyebrowTitle eyebrow={UI.rolesEyebrow} title={WOI_ROLES_HEADING} />
          <NumberedGrid items={roleItems} columns={2} />
        </Section>

        <Section tone="parchment">
          <EyebrowTitle eyebrow={UI.womenEyebrow} title={WOI_WOMEN_HEADING} />
          <ul className="grid gap-5 sm:grid-cols-2" role="list">
            {WOI_WOMEN.map((w) => (
              <li key={w.id}>
                <WomanPlaque woman={w} />
              </li>
            ))}
          </ul>
        </Section>

        <Section tone="ivory">
          <EyebrowTitle eyebrow={UI.beyondEyebrow} title={WOI_BEYOND.heading} />
          <Prose>
            {WOI_BEYOND.paragraphs.map((p, i) => (
              <p key={i}>{tr(p, lang)}</p>
            ))}
          </Prose>
        </Section>

        <Section tone="sand">
          <EyebrowTitle eyebrow={UI.numbersEyebrow} title={WOI_NUMBERS.heading} />
          <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] items-start">
            <DataStatsCard
              label={UI.statsLabel}
              stats={WOI_NUMBERS.stats.map((s) => ({ label: s.label, value: s.value }))}
              footer={WOI_NUMBERS.attribution}
            />
            <Plaque>
              <p className="text-sm sm:text-base text-foreground/80 leading-[1.75]">
                {tr(WOI_NUMBERS.majority, lang)}
              </p>
              <p className="mt-4 pt-4 border-t border-border/60 text-xs text-muted-foreground italic">
                {tr(WOI_NUMBERS.qualification, lang)}
              </p>
            </Plaque>
          </div>
        </Section>

        <Section tone="parchment">
          <EyebrowTitle eyebrow={UI.afterEyebrow} title={WOI_AFTER.heading} />
          <Prose>
            {WOI_AFTER.paragraphs.map((p, i) => (
              <p key={i}>{tr(p, lang)}</p>
            ))}
          </Prose>
        </Section>

        <Section tone="ivory">
          <EyebrowTitle eyebrow={UI.growingEyebrow} title={WOI_GROWING.heading} />
          <Plaque className="max-w-3xl">
            <p className="text-sm sm:text-base text-foreground/80 leading-[1.75]">
              {tr(WOI_GROWING.body, lang)}
            </p>
            <a
              href={WOI_GROWING.ctaHref}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              {tr(WOI_GROWING.cta, lang)}
              <span aria-hidden className="rtl:rotate-180">
                →
              </span>
            </a>
          </Plaque>
        </Section>

        <Section tone="sand">
          <EyebrowTitle
            eyebrow={UI.relatedLabel}
            title={UI.relatedHeading}
          />
          <RelatedExhibits items={RELATED} label={UI.relatedLabel} enterLabel={UI.relatedEnter} />
        </Section>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-14">
          <p className="mb-5 max-w-3xl text-sm text-muted-foreground leading-[1.7]">
            {tr(WOI_SOURCE_INTRO, lang)}
          </p>
          <ExhibitProvenance exhibitId="women-of-independence" />
        </section>
      </main>

      <footer className="border-t border-border/60 bg-card/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <p className="text-xs text-muted-foreground italic">{tr(UI.footer, lang)}</p>
        </div>
      </footer>
    </div>
  );
}

/** A single woman's museum plaque, linked to her exhibit when one exists. */
function WomanPlaque({ woman }: { woman: WomanEntry }) {
  const lang = useLang();
  const name = tr(woman.displayName, lang);

  const inner = (
    <>
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-xl font-bold text-foreground" style={SERIF}>
          {name}
        </h3>
        {woman.years && (
          <span
            dir="ltr"
            className="shrink-0 text-xs text-muted-foreground"
            style={{ unicodeBidi: "isolate" }}
          >
            {woman.years}
          </span>
        )}
      </div>
      <p className="mt-3 text-sm text-foreground/80 leading-[1.75]">{tr(woman.role, lang)}</p>
      {woman.note && (
        <p className="mt-3 text-xs text-muted-foreground leading-[1.6]">{tr(woman.note, lang)}</p>
      )}
      {woman.datesNeedSourcing && (
        <p className="mt-3 text-xs text-muted-foreground italic">{tr(UI.datesPending, lang)}</p>
      )}
      {woman.figureId && (
        <p className="mt-4 text-xs font-semibold text-primary">
          {tr(UI.visitFigure, lang)}{" "}
          <span aria-hidden className="rtl:rotate-180 inline-block">
            →
          </span>
        </p>
      )}
    </>
  );

  const cardClass =
    "block h-full rounded-2xl border border-border bg-card p-6 sm:p-7 transition";
  const cardStyle = { boxShadow: "var(--shadow-soft)" } as const;

  if (woman.figureId) {
    return (
      <Link
        to="/figures/$figureId"
        params={{ figureId: woman.figureId }}
        className={`${cardClass} hover:-translate-y-0.5`}
        style={cardStyle}
      >
        {inner}
      </Link>
    );
  }

  return (
    <div className={cardClass} style={cardStyle}>
      {inner}
    </div>
  );
}
