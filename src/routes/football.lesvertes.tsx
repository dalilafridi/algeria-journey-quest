import { createFileRoute, Link } from "@tanstack/react-router";

import { Header } from "@/components/Header";
import { MedallionFrame } from "@/components/brand/MedallionFrame";
import { useLang, type Lang, type LocalizedString } from "@/lib/i18n";
import lesVertesHero from "@/assets/lesvertes-hero.jpg.asset.json";
import { pageMeta } from "@/lib/seo";
import {
  LES_VERTES_AFRICAN_JOURNEY,
  LES_VERTES_BARRIERS,
  LES_VERTES_BEGINNING,
  LES_VERTES_CLUBS,
  LES_VERTES_CLUBS_INTRO,
  LES_VERTES_HERO,
  LES_VERTES_NEW_GENERATION,
  LES_VERTES_NEXT_CHAPTER,
  LES_VERTES_PLAYERS,
  LES_VERTES_PUBLISHED,
  type PlayerCard,
  type WafconEntry,
  type WomensClub,
} from "@/data/lesVertes";

export const Route = createFileRoute("/football/lesvertes")({
  head: () =>
    pageMeta({
      path: "/football/lesvertes",
      title: "Les Vertes — Algeria's Women's National Team · DZ Odyssey",
      description: "Football, resilience and a new generation representing Algeria — a permanent exhibit in the Hall of Algerian Football.",
      image: lesVertesHero.url
    }),
  component: LesVertesExhibit,
});

const SERIF = { fontFamily: "Georgia, 'Iowan Old Style', 'Times New Roman', serif" };

function tt(v: LocalizedString | undefined, lang: Lang): string {
  if (v == null) return "";
  if (typeof v === "string") return v;
  return v[lang] ?? v.en ?? "";
}

/* -------------------- Hero -------------------- */

function Hero({ lang }: { lang: Lang }) {
  const H = LES_VERTES_HERO;
  return (
    <section
      className="relative overflow-hidden text-foreground"
      style={{
        background:
          "radial-gradient(ellipse at 50% 25%, oklch(0.9 0.05 130 / 0.35), transparent 65%), var(--gradient-parchment)",
      }}
    >
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20 md:py-28 grid gap-10 md:grid-cols-[1.05fr_1.15fr] items-center">
        <div className="animate-float-up">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.28em] font-bold text-primary">
            ⵣ · {tt(H.eyebrow, lang)}
          </p>
          <h1
            className="mt-4 text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] text-foreground"
            style={SERIF}
          >
            {tt(H.title, lang)}
          </h1>
          <p className="mt-4 text-xl sm:text-2xl max-w-xl text-foreground/80 italic" style={SERIF}>
            {tt(H.subtitle, lang)}
          </p>
          <p className="mt-5 text-base sm:text-lg max-w-xl text-foreground/70">
            {tt(H.tagline, lang)}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#beginning"
              className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              {tt(H.ctaLabel, lang)}
              <span aria-hidden>→</span>
            </a>
            <Link
              to="/football"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground hover:bg-muted transition"
            >
              {{ en: "← Back to the Hall", fr: "← Retour à la Galerie", ar: "← عودة إلى القاعة" }[lang]}
            </Link>
          </div>
        </div>

        <figure className="relative w-full">
          <div
            className="relative overflow-hidden rounded-2xl"
            style={{
              boxShadow:
                "0 30px 60px -28px oklch(0.15 0.03 40 / 0.55), 0 12px 24px -14px oklch(0.15 0.03 40 / 0.4), inset 0 0 0 1px oklch(0.55 0.06 60 / 0.35), inset 0 0 0 4px oklch(0.98 0.01 80 / 0.9)",
            }}
          >
            <img
              src={lesVertesHero.url}
              alt="Algeria's women's national football team in green and white, standing together on a pitch."
              width={1600}
              height={1000}
              loading="eager"
              className="block w-full h-auto"
              style={{ filter: "contrast(1.03) saturate(0.98) sepia(0.05)" }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(115% 90% at 50% 50%, transparent 60%, oklch(0.18 0.03 40 / 0.35) 100%)",
              }}
            />
          </div>
          <figcaption className="mt-3 text-xs text-muted-foreground text-center italic">
            {{
              en: "Les Vertes · a museum portrait of Algeria's women's national team.",
              fr: "Les Vertes · portrait muséal de la sélection féminine algérienne.",
              ar: "الخضراوات · صورة متحفية للمنتخب النسوي الجزائري.",
            }[lang]}
          </figcaption>
        </figure>
      </div>

      {/* subtle green / white / red accent line */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{
          background:
            "linear-gradient(90deg, oklch(0.55 0.14 145) 0%, oklch(0.55 0.14 145) 33%, oklch(0.96 0.01 90) 33%, oklch(0.96 0.01 90) 66%, oklch(0.58 0.18 25) 66%, oklch(0.58 0.18 25) 100%)",
          opacity: 0.55,
        }}
      />
    </section>
  );
}

/* -------------------- Section wrapper -------------------- */

function Section({
  id,
  n,
  title,
  emblem,
  children,
}: {
  id: string;
  n: string;
  title: string;
  emblem: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
      <div className="flex items-center gap-4 mb-6">
        <MedallionFrame size={48} tone="gold">
          <span className="text-lg font-bold text-[oklch(0.2_0.05_40)]" style={SERIF} aria-hidden>
            {emblem}
          </span>
        </MedallionFrame>
        <div>
          <div className="text-[10px] uppercase tracking-[0.28em] font-bold text-muted-foreground">
            {n}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground" style={SERIF}>
            {title}
          </h2>
        </div>
      </div>
      {children}
    </section>
  );
}

/* -------------------- 2. Beginning -------------------- */

function BeginningSection({ lang }: { lang: Lang }) {
  const B = LES_VERTES_BEGINNING;
  return (
    <Section
      id="beginning"
      n={{ en: "01 · The Beginning", fr: "01 · Les débuts", ar: "٠١ · البدايات" }[lang]}
      title={tt(B.title, lang)}
      emblem="✦"
    >
      <div className="max-w-3xl space-y-5">
        {B.paragraphs.map((p, i) => (
          <p key={i} className="text-[15px] sm:text-base leading-relaxed text-foreground/85" style={SERIF}>
            {tt(p, lang)}
          </p>
        ))}
      </div>
    </Section>
  );
}

/* -------------------- 3. African Journey -------------------- */

function AfricanJourneySection({ lang }: { lang: Lang }) {
  return (
    <Section
      id="african-journey"
      n={{ en: "02 · Their African Journey", fr: "02 · Leur parcours africain", ar: "٠٢ · مسيرتهنّ الإفريقية" }[lang]}
      title={{ en: "Their African Journey", fr: "Leur parcours africain", ar: "مسيرتهنّ الإفريقية" }[lang]}
      emblem="♛"
    >
      <p className="mb-8 max-w-3xl text-[15px] sm:text-base leading-relaxed text-foreground/80" style={SERIF}>
        {{
          en: "A visual timeline of Algeria's appearances at the Women's Africa Cup of Nations. Only verified tournament entries are shown; further editions will be added as they are researched and sourced.",
          fr: "Une chronologie visuelle des participations de l'Algérie à la CAN féminine. Seules les éditions vérifiées sont affichées ; d'autres seront ajoutées au fil de la recherche.",
          ar: "خطّ زمنيّ لمشاركات الجزائر في كأس أمم إفريقيا للسيدات. تُعرَض المشاركات الموثّقة فقط، وتُضاف مشاركات أخرى تِباعًا.",
        }[lang]}
      </p>

      <ol className="relative border-s-2 border-primary/40 ps-6 space-y-8">
        {LES_VERTES_AFRICAN_JOURNEY.map((e: WafconEntry) => (
          <li key={e.id} className="relative">
            <span
              aria-hidden
              className="absolute -start-[35px] top-1 h-4 w-4 rounded-full bg-primary shadow"
              style={{ boxShadow: "0 0 0 4px oklch(0.96 0.02 90)" }}
            />
            <div className="flex flex-wrap items-baseline gap-3">
              <span className="text-2xl font-bold text-foreground" style={SERIF}>
                {e.year}
              </span>
              {e.host && (
                <span className="text-sm text-muted-foreground">
                  · {tt(e.host, lang)}
                </span>
              )}
              {e.stage && (
                <span className="inline-flex items-center rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold">
                  {tt(e.stage, lang)}
                </span>
              )}
            </div>
            {e.keyResult && (
              <p className="mt-2 text-sm font-medium text-foreground/85">{tt(e.keyResult, lang)}</p>
            )}
            {e.note && (
              <p className="mt-2 text-[15px] leading-relaxed text-foreground/75 max-w-2xl" style={SERIF}>
                {tt(e.note, lang)}
              </p>
            )}
            {e.source && (
              <p className="mt-1 text-[11px] uppercase tracking-widest text-muted-foreground">
                {{ en: "Source", fr: "Source", ar: "المصدر" }[lang]}: {e.source}
              </p>
            )}
          </li>
        ))}
      </ol>
    </Section>
  );
}

/* -------------------- 4. Breaking Barriers -------------------- */

function BarriersSection({ lang }: { lang: Lang }) {
  return (
    <Section
      id="breaking-barriers"
      n={{ en: "03 · Breaking Barriers", fr: "03 · Briser les barrières", ar: "٠٣ · كسر الحواجز" }[lang]}
      title={{ en: "Breaking Barriers", fr: "Briser les barrières", ar: "كسر الحواجز" }[lang]}
      emblem="◈"
    >
      <p className="mb-8 max-w-3xl text-[15px] sm:text-base leading-relaxed text-foreground/80" style={SERIF}>
        {{
          en: "The story of Les Vertes is inseparable from the obstacles the players faced — and the persistence with which they answered.",
          fr: "L'histoire des Vertes est inséparable des obstacles rencontrés — et de la persévérance avec laquelle elles y ont répondu.",
          ar: "لا يمكن فصل قصّة الخضراوات عن العقبات التي واجهتها اللاعبات وعن الصبر الذي قابلن به تلك العقبات.",
        }[lang]}
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {LES_VERTES_BARRIERS.map((b) => (
          <article
            key={b.id}
            className="rounded-2xl border border-border bg-card p-5"
            style={{ boxShadow: "var(--shadow-soft)" }}
          >
            <h3 className="font-semibold text-foreground" style={SERIF}>
              {tt(b.title, lang)}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground/75">{tt(b.body, lang)}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

/* -------------------- 5. Players to Know -------------------- */

function PlayerCardView({ p, lang }: { p: PlayerCard; lang: Lang }) {
  return (
    <article
      className="rounded-2xl border border-border bg-card overflow-hidden"
      style={{ boxShadow: "var(--shadow-soft)" }}
    >
      {p.photoUrl ? (
        <img
          src={p.photoUrl}
          alt={`Portrait of ${p.fullName}`}
          width={480}
          height={480}
          loading="lazy"
          className="block w-full aspect-square object-cover"
        />
      ) : (
        <div className="aspect-square bg-muted flex items-center justify-center text-4xl text-muted-foreground" aria-hidden>
          ⚽
        </div>
      )}
      <div className="p-4">
        <h3 className="font-semibold text-foreground" style={SERIF}>{p.fullName}</h3>
        <dl className="mt-2 grid grid-cols-2 gap-y-1 text-xs">
          {p.position && (
            <>
              <dt className="text-muted-foreground">{{ en: "Position", fr: "Poste", ar: "المركز" }[lang]}</dt>
              <dd className="text-foreground/85">{tt(p.position, lang)}</dd>
            </>
          )}
          {p.club && (
            <>
              <dt className="text-muted-foreground">{{ en: "Club", fr: "Club", ar: "النادي" }[lang]}</dt>
              <dd className="text-foreground/85">{p.club}</dd>
            </>
          )}
          {typeof p.caps === "number" && (
            <>
              <dt className="text-muted-foreground">{{ en: "Caps", fr: "Sélections", ar: "المباريات" }[lang]}</dt>
              <dd className="text-foreground/85">{p.caps}</dd>
            </>
          )}
        </dl>
        {p.achievement && (
          <p className="mt-3 text-sm text-primary font-medium">{tt(p.achievement, lang)}</p>
        )}
        {p.biography && (
          <p className="mt-2 text-sm text-foreground/75 leading-relaxed">{tt(p.biography, lang)}</p>
        )}
        {p.source && (
          <p className="mt-2 text-[10px] uppercase tracking-widest text-muted-foreground">
            {{ en: "Source", fr: "Source", ar: "المصدر" }[lang]}: {p.source}
          </p>
        )}
      </div>
    </article>
  );
}

function PlayersSection({ lang }: { lang: Lang }) {
  return (
    <Section
      id="players"
      n={{ en: "04 · Players to Know", fr: "04 · Joueuses à connaître", ar: "٠٤ · لاعبات ينبغي معرفتهنّ" }[lang]}
      title={{ en: "Players to Know", fr: "Joueuses à connaître", ar: "لاعبات ينبغي معرفتهنّ" }[lang]}
      emblem="★"
    >
      {LES_VERTES_PLAYERS.length === 0 ? (
        <div
          className="rounded-2xl border border-dashed border-border bg-card/60 p-8 max-w-3xl"
          style={{ boxShadow: "var(--shadow-soft)" }}
        >
          <p className="text-[15px] leading-relaxed text-foreground/80" style={SERIF}>
            {{
              en: "Verified player profiles are being prepared by the museum's curators. Cards will appear here as biographies, statistics and photograph credits are sourced.",
              fr: "Des profils vérifiés de joueuses sont en préparation par les curateurs du musée. Les fiches apparaîtront ici au fil de la validation des biographies, des statistiques et des crédits photographiques.",
              ar: "يعمل قيّمو المتحف على إعداد بطاقات لاعبات موثّقة. ستظهر البطاقات هنا مع التحقّق من السير الذاتية والإحصائيّات وحقوق الصور.",
            }[lang]}
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {LES_VERTES_PLAYERS.map((p) => (
            <PlayerCardView key={p.id} p={p} lang={lang} />
          ))}
        </div>
      )}
    </Section>
  );
}

/* -------------------- 6. New Generation -------------------- */

function NewGenerationSection({ lang }: { lang: Lang }) {
  const N = LES_VERTES_NEW_GENERATION;
  const squad = N.currentSquad;
  return (
    <Section
      id="new-generation"
      n={{ en: "05 · A New Generation", fr: "05 · Une nouvelle génération", ar: "٠٥ · جيل جديد" }[lang]}
      title={tt(N.title, lang)}
      emblem="◇"
    >
      <div className="max-w-3xl space-y-5">
        {N.paragraphs.map((p, i) => (
          <p key={i} className="text-[15px] sm:text-base leading-relaxed text-foreground/85" style={SERIF}>
            {tt(p, lang)}
          </p>
        ))}
      </div>
      <div className="mt-10">
        <h3 className="text-xl font-semibold text-foreground" style={SERIF}>
          {tt(squad.heading, lang)}
        </h3>
        {squad.players.length === 0 ? (
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground italic">
            {tt(squad.curatorNote, lang)}
          </p>
        ) : (
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {squad.players.map((p) => (
              <PlayerCardView key={p.id} p={p} lang={lang} />
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}

/* -------------------- 7. Women's Clubs -------------------- */

function ClubsSection({ lang }: { lang: Lang }) {
  return (
    <Section
      id="womens-clubs"
      n={{ en: "06 · Women's Clubs", fr: "06 · Clubs féminins", ar: "٠٦ · الأندية النسوية" }[lang]}
      title={{ en: "Women's Clubs", fr: "Clubs féminins", ar: "الأندية النسوية" }[lang]}
      emblem="♜"
    >
      <p className="max-w-3xl text-[15px] sm:text-base leading-relaxed text-foreground/85" style={SERIF}>
        {tt(LES_VERTES_CLUBS_INTRO, lang)}
      </p>
      {LES_VERTES_CLUBS.length > 0 && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LES_VERTES_CLUBS.map((c: WomensClub) => (
            <article
              key={c.id}
              className="rounded-2xl border border-border bg-card p-5"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <h3 className="font-semibold text-foreground" style={SERIF}>{c.name}</h3>
              {c.city && <p className="text-xs text-muted-foreground mt-1">{tt(c.city, lang)}</p>}
              {c.note && <p className="mt-2 text-sm text-foreground/75">{tt(c.note, lang)}</p>}
            </article>
          ))}
        </div>
      )}
    </Section>
  );
}

/* -------------------- 8. Next Chapter -------------------- */

function NextChapterSection({ lang }: { lang: Lang }) {
  const N = LES_VERTES_NEXT_CHAPTER;
  return (
    <Section
      id="next-chapter"
      n={{ en: "07 · The Next Chapter", fr: "07 · Le prochain chapitre", ar: "٠٧ · الفصل القادم" }[lang]}
      title={tt(N.title, lang)}
      emblem="⚑"
    >
      <div className="max-w-3xl">
        <p className="text-[15px] sm:text-base leading-relaxed text-foreground/85" style={SERIF}>
          {tt(N.body, lang)}
        </p>
        <p
          className="mt-8 text-2xl sm:text-3xl italic text-foreground text-center border-t border-b border-primary/40 py-6"
          style={SERIF}
        >
          {tt(N.closingLine, lang)}
        </p>
      </div>
    </Section>
  );
}

/* -------------------- Page -------------------- */

function LesVertesExhibit() {
  const lang = useLang();
  return (
    <div className="min-h-dvh bg-background">
      <Header />
      <Hero lang={lang} />

      {LES_VERTES_PUBLISHED["beginning"] && <BeginningSection lang={lang} />}
      {LES_VERTES_PUBLISHED["african-journey"] && <AfricanJourneySection lang={lang} />}
      {LES_VERTES_PUBLISHED["breaking-barriers"] && <BarriersSection lang={lang} />}
      {LES_VERTES_PUBLISHED["players"] && <PlayersSection lang={lang} />}
      {LES_VERTES_PUBLISHED["new-generation"] && <NewGenerationSection lang={lang} />}
      {LES_VERTES_PUBLISHED["clubs"] && <ClubsSection lang={lang} />}
      {LES_VERTES_PUBLISHED["next-chapter"] && <NextChapterSection lang={lang} />}

      <footer className="py-14 text-center max-w-2xl mx-auto px-4">
        <MedallionFrame size={64} tone="gold" glow>
          <span className="text-2xl" aria-hidden>⚽</span>
        </MedallionFrame>
        <p className="mt-4 text-sm text-muted-foreground italic" style={SERIF}>
          {{
            en: "A permanent exhibit of the Hall of Algerian Football.",
            fr: "Une exposition permanente de la Galerie du football algérien.",
            ar: "معرض دائم من قاعة كرة القدم الجزائرية.",
          }[lang]}
        </p>
      </footer>
    </div>
  );
}
