/**
 * Kabyle Jewelry: Silver, Color, and Memory
 *
 * A self-contained cultural exhibit rendered only inside the Kabylie region
 * page. Museum adaptation based on the French Wikipedia overview "Bijoux
 * kabyles" and the scholarly references it lists. Trilingual (EN / FR / AR),
 * RTL-safe, no automatic animation.
 */

import { t, useLang, type LocalizedString } from "@/lib/i18n";
import mainPhoto from "@/assets/bijou-artisanale.jpg.asset.json";
import detailPhoto from "@/assets/bijoux.jpg.asset.json";

const SERIF = "Georgia, 'Times New Roman', serif";

const L = (en: string, fr: string, ar: string): LocalizedString => ({ en, fr, ar });

const COPY = {
  eyebrow: L("Living heritage", "Patrimoine vivant", "تراث حيّ"),
  title: L(
    "Kabyle Jewelry: Silver, Color, and Memory",
    "Bijoux kabyles : argent, couleurs et mémoire",
    "الحلي القبائلية: فضة وألوان وذاكرة",
  ),
  intro1: L(
    "Kabyle jewelry is among the most recognizable artistic traditions of Algeria. With its vibrant colors, intricate forms, and remarkable silverwork, it carries the skill and memory of generations of artisans.",
    "Les bijoux kabyles comptent parmi les traditions artistiques les plus reconnaissables d'Algérie. Par leurs couleurs vives, leurs formes minutieuses et un travail de l'argent remarquable, ils portent le savoir-faire et la mémoire de générations d'artisans.",
    "تُعدّ الحلي القبائلية من أكثر التقاليد الفنية الجزائرية تميّزاً. بألوانها الزاهية وأشكالها الدقيقة وصياغتها الفضية البديعة، تحمل مهارة أجيال من الحرفيين وذاكرتهم.",
  ),
  intro2: L(
    "These pieces were never created merely as decoration. They formed part of traditional dress, expressed identity and belonging, accompanied important ceremonies, and represented heritage preserved within families.",
    "Ces pièces n'ont jamais été conçues comme un simple ornement. Elles faisaient partie du costume traditionnel, exprimaient l'identité et l'appartenance, accompagnaient les grandes cérémonies et incarnaient un héritage conservé au sein des familles.",
    "لم تُصنع هذه القطع لمجرد الزينة. كانت جزءاً من اللباس التقليدي، وتعبيراً عن الهوية والانتماء، ورفيقةً للمناسبات الكبرى، وميراثاً محفوظاً داخل العائلات.",
  ),

  s1Title: L("The Colors of Kabylie", "Les couleurs de la Kabylie", "ألوان بلاد القبائل"),
  s1a: L(
    "Traditional Kabyle jewelry is fashioned principally from silver, sometimes strengthened with copper. Its distinctive brilliance comes from the contrast between the metal, Mediterranean red coral known locally as imeržan, and vividly colored enamel.",
    "Le bijou kabyle traditionnel est façonné principalement dans l'argent, parfois renforcé de cuivre. Son éclat singulier naît du contraste entre le métal, le corail rouge de Méditerranée appelé localement imeržan, et des émaux aux couleurs vives.",
    "تُصاغ الحلي القبائلية التقليدية أساساً من الفضة، ويُقوّى المعدن أحياناً بالنحاس. ويأتي بريقها المميّز من التباين بين المعدن، والمرجان الأحمر المتوسطي المعروف محلياً باسم imeržan، والمينا ذات الألوان الزاهية.",
  ),
  s1b: L(
    "Blue, green, and yellow enamels are arranged within fine metal compartments using a technique known as cloisonné. Red does not traditionally come from enamel. It is introduced through pieces of coral set into the silver.",
    "Les émaux bleus, verts et jaunes sont disposés dans de fines cloisons métalliques selon la technique dite du cloisonné. Le rouge ne provient pas traditionnellement de l'émail. Il est apporté par des morceaux de corail sertis dans l'argent.",
    "تُوضع مينا الأزرق والأخضر والأصفر داخل حجيرات معدنية دقيقة بتقنية تُعرف بالتقسيم (cloisonné). أما الأحمر فلا يأتي تقليدياً من المينا، بل من قطع المرجان المرصّعة في الفضة.",
  ),
  s1Callout: L(
    "Silver provides the foundation. Enamel brings color. Coral gives the jewelry its unmistakable red.",
    "L'argent fournit la structure. L'émail apporte la couleur. Le corail donne au bijou son rouge inimitable.",
    "الفضة تمنح الأساس، والمينا تمنح اللون، والمرجان يمنح الحليّ حمرته التي لا تُخطئها العين.",
  ),

  s2Title: L("Jewelry with a Purpose", "Des bijoux qui ont un rôle", "حليٌّ لها وظيفة"),
  s2a: L(
    "Every form had a place in traditional life. Fibulae known as ibzimen fastened draped garments and were often worn in pairs connected by a chain. The tabzimt, an elaborate pectoral decorated with enamel, silverwork, and coral, became one of the most important pieces of the Kabyle ensemble.",
    "Chaque forme avait sa place dans la vie traditionnelle. Les fibules appelées ibzimen fermaient les vêtements drapés et se portaient souvent par paire, reliées par une chaîne. La tabzimt, plaque pectorale élaborée ornée d'émail, de travail d'argent et de corail, est devenue l'une des pièces majeures de la parure kabyle.",
    "لكل شكل موضعه في الحياة التقليدية. فالمشابك المعروفة باسم ibzimen كانت تثبّت الثياب المسدلة وتُلبس غالباً مزدوجةً تربطها سلسلة. أما tabzimt، وهي حلية صدرية متقنة مزيّنة بالمينا والفضة والمرجان، فأصبحت من أهم قطع الزيّ القبائلي.",
  ),
  s2b: L(
    "Bracelets, anklets, earrings, necklaces, rings, belts, and diadems completed the adornment. Some pieces were associated with weddings and family ceremonies, while others could preserve household wealth or be passed from one generation to the next.",
    "Bracelets, chevillères, boucles d'oreilles, colliers, bagues, ceintures et diadèmes complétaient la parure. Certaines pièces étaient liées aux mariages et aux cérémonies familiales, tandis que d'autres pouvaient conserver la richesse du foyer ou se transmettre d'une génération à l'autre.",
    "وتكتمل الزينة بالأساور والخلاخيل والأقراط والعقود والخواتم والأحزمة والتيجان. ارتبطت بعض القطع بالأعراس والمناسبات العائلية، بينما كانت أخرى تحفظ ثروة البيت أو تنتقل من جيل إلى جيل.",
  ),

  typologyTitle: L("Object labels", "Cartels d'objets", "بطاقات المعروضات"),
  typologyNote: L(
    "Traditional terminology as used in Kabylie.",
    "Terminologie traditionnelle telle qu'employée en Kabylie.",
    "المصطلحات التقليدية كما تُستعمل في بلاد القبائل.",
  ),

  s3Title: L("The Artisans of Ath Yenni", "Les artisans d'Ath Yenni", "حرفيّو آث يني"),
  s3a: L(
    "The villages of Ath Yenni, also known as Beni Yenni, became especially renowned for this tradition. Their artisans developed jewelry distinguished by fine silverwork, filigree, coral settings, and brilliant blue, green, and yellow enamels.",
    "Les villages d'Ath Yenni, également appelés Beni Yenni, sont devenus particulièrement réputés pour cette tradition. Leurs artisans ont développé des bijoux reconnaissables à la finesse du travail de l'argent, au filigrane, aux sertissages de corail et à l'éclat des émaux bleus, verts et jaunes.",
    "اشتهرت قرى آث يني، المعروفة أيضاً ببني يني، بهذا التقليد على نحو خاص. طوّر حرفيّوها حلياً تتميّز بدقّة صياغة الفضة، والمشغولات المخرّمة، وترصيع المرجان، وبريق المينا الزرقاء والخضراء والصفراء.",
  ),
  s3b: L(
    "Knowledge of the craft was often transmitted within families. The tradition continues today, sustained by artisans who preserve established techniques while creating pieces for new generations.",
    "Le savoir du métier se transmettait souvent au sein des familles. La tradition se poursuit aujourd'hui, portée par des artisans qui préservent les techniques établies tout en créant des pièces pour de nouvelles générations.",
    "كانت معرفة الحرفة تُتوارث غالباً داخل العائلات. ولا يزال التقليد مستمراً اليوم بفضل حرفيين يحافظون على التقنيات المتوارثة ويصوغون قطعاً لأجيال جديدة.",
  ),

  s4Title: L("More Than Ornament", "Plus qu'une parure", "أكثر من زينة"),
  s4a: L(
    "Kabyle jewelry could be practical, ornamental, symbolic, familial, and economic at the same time. Its designs helped express community identity, its pieces enriched family heritage, and its silver could represent lasting value.",
    "Le bijou kabyle pouvait être à la fois utile, ornemental, symbolique, familial et économique. Ses motifs exprimaient l'identité de la communauté, ses pièces enrichissaient le patrimoine familial et son argent pouvait représenter une valeur durable.",
    "كانت الحلية القبائلية عمليّة وزخرفية ورمزية وعائلية واقتصادية في آن واحد. عبّرت زخارفها عن هوية الجماعة، وأثْرت قطعُها ميراث العائلة، ومثّلت فضّتها قيمةً باقية.",
  ),
  s4b: L(
    "Today, Kabyle jewelry remains an enduring witness to the creativity of Kabylie and to the richness of Algeria's Amazigh cultural heritage.",
    "Aujourd'hui, le bijou kabyle demeure un témoin durable de la créativité de la Kabylie et de la richesse du patrimoine culturel amazigh de l'Algérie.",
    "تبقى الحلي القبائلية اليوم شاهداً دائماً على إبداع بلاد القبائل وعلى غنى التراث الثقافي الأمازيغي في الجزائر.",
  ),

  quote: L(
    "Every piece carries more than silver and color. It carries memory.",
    "Chaque pièce porte plus que de l'argent et de la couleur. Elle porte la mémoire.",
    "كل قطعة تحمل ما هو أكثر من الفضة واللون. إنها تحمل الذاكرة.",
  ),

  materialsTitle: L("Materials", "Matériaux", "المواد"),
  matSilver: L("Silver", "Argent", "الفضة"),
  matSilverBody: L(
    "The structural metal, sometimes strengthened with copper.",
    "Le métal de structure, parfois renforcé de cuivre.",
    "المعدن الأساسي، ويُقوّى أحياناً بالنحاس.",
  ),
  matEnamel: L("Enamel", "Émail", "المينا"),
  matEnamelBody: L(
    "Blue, green, and yellow, set in fine compartments (cloisonné).",
    "Bleu, vert et jaune, posés dans de fines cloisons (cloisonné).",
    "أزرق وأخضر وأصفر، توضع في حجيرات دقيقة (cloisonné).",
  ),
  matCoral: L("Coral (imeržan)", "Corail (imeržan)", "المرجان (imeržan)"),
  matCoralBody: L(
    "Mediterranean red coral set into the silver.",
    "Corail rouge de Méditerranée serti dans l'argent.",
    "مرجان أحمر متوسطي مرصّع في الفضة.",
  ),

  mainAlt: L(
    "Display of traditional Kabyle silver jewelry decorated with colorful enamel and coral-red details",
    "Présentation de bijoux kabyles traditionnels en argent, ornés d'émaux colorés et de détails rouge corail",
    "عرض لحلي قبائلية فضية تقليدية مزيّنة بمينا ملوّنة وتفاصيل حمراء مرجانية",
  ),
  mainCaption: L(
    "Kabyle silverwork brings together intricate metalwork, vivid enamel, and coral-red ornament.",
    "L'orfèvrerie kabyle réunit un travail du métal minutieux, des émaux éclatants et un ornement rouge corail.",
    "تجمع صياغة الفضة القبائلية بين دقّة العمل المعدني، والمينا الزاهية، والزخرفة الحمراء المرجانية.",
  ),
  detailAlt: L(
    "Kabyle bracelets and jewelry decorated with colored enamel and coral-red stones",
    "Bracelets et bijoux kabyles ornés d'émaux colorés et de pierres rouge corail",
    "أساور وحلي قبائلية مزيّنة بمينا ملوّنة وأحجار حمراء مرجانية",
  ),
  detailCaption: L(
    "Blue, green, and yellow enamel creates a vivid contrast against the silver.",
    "Les émaux bleus, verts et jaunes créent un contraste éclatant avec l'argent.",
    "تخلق المينا الزرقاء والخضراء والصفراء تبايناً حيّاً مع الفضة.",
  ),

  sourcesTitle: L(
    "Sources and further reading",
    "Sources et lectures complémentaires",
    "المصادر وقراءات إضافية",
  ),
  sourcesIntro: L(
    "The encyclopedia entry below served as the starting overview. The scholarly publications that follow are the underlying references.",
    "La notice encyclopédique ci-dessous a servi de premier aperçu. Les publications savantes qui suivent en constituent les références de fond.",
    "استُخدمت المادة الموسوعية أدناه كمدخل عام أوّلي، أما المنشورات العلمية التي تليها فهي المراجع الأساسية.",
  ),
};

type ObjectLabel = { term: string; body: LocalizedString };

const OBJECTS: ObjectLabel[] = [
  {
    term: "Ibzimen",
    body: L(
      "Silver fibulae traditionally used to fasten garments",
      "Fibules en argent traditionnellement utilisées pour fermer les vêtements",
      "مشابك فضية تُستعمل تقليدياً لتثبيت الثياب",
    ),
  },
  {
    term: "Tabzimt",
    body: L(
      "A prominent pectoral ornament decorated on both sides",
      "Une importante parure pectorale décorée sur ses deux faces",
      "حلية صدرية بارزة مزيّنة على وجهيها",
    ),
  },
  {
    term: "Letrak",
    body: L("Traditional large earrings", "Grandes boucles d'oreilles traditionnelles", "أقراط تقليدية كبيرة"),
  },
  {
    term: "Azrar",
    body: L("Necklaces composed of pendants", "Colliers composés de pendentifs", "عقود مؤلّفة من دلايات"),
  },
  {
    term: "Ta'essabt",
    body: L(
      "A ceremonial silver diadem associated with marriage",
      "Un diadème d'argent de cérémonie associé au mariage",
      "تاج فضي احتفالي يرتبط بالزواج",
    ),
  },
  {
    term: "Ikhelkhalen",
    body: L("Large traditional anklets", "Grands bracelets de cheville traditionnels", "خلاخيل تقليدية كبيرة"),
  },
];

const SOURCES: { text: string; href?: string }[] = [
  { text: "\u00ab Bijoux kabyles \u00bb, Wikip\u00e9dia, French edition", href: "https://fr.wikipedia.org/wiki/Bijoux_kabyles" },
  {
    text: "Henriette Camps-Fabrer, \u00ab Bijoux \u00bb, Encyclop\u00e9die berb\u00e8re, 1991. DOI: 10.4000/encyclopedieberbere.1758",
    href: "https://doi.org/10.4000/encyclopedieberbere.1758",
  },
  { text: "Henriette Camps-Fabrer, Les Bijoux de grande Kabylie, 1970" },
  { text: "Myriam Donsimoni, Mohamed Kemmar and C\u00e9cile Perret, Les bijoutiers d'Ath-Yenni, 2010" },
  { text: "Leyla Belka\u00efd, Costumes d'Alg\u00e9rie, 2003" },
];

const SILVER = "oklch(0.72 0.012 250)";
const CORAL = "oklch(0.55 0.16 30)";
const ENAMEL_BLUE = "oklch(0.48 0.12 245)";
const ENAMEL_GREEN = "oklch(0.48 0.10 155)";
const ENAMEL_YELLOW = "oklch(0.66 0.13 85)";

function Ornament() {
  return (
    <div
      aria-hidden
      className="h-[10px] w-full rounded-full"
      style={{
        backgroundImage:
          `repeating-linear-gradient(135deg, ${SILVER} 0 6px, transparent 6px 12px),` +
          `repeating-linear-gradient(45deg, color-mix(in oklab, ${ENAMEL_BLUE} 55%, transparent) 0 6px, transparent 6px 12px)`,
        opacity: 0.5,
      }}
    />
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return <p className="text-[15px] sm:text-base leading-relaxed text-foreground/90">{children}</p>;
}

export function KabyleJewelry() {
  const lang = useLang();
  const tr = (s: LocalizedString) => t(s, lang);

  return (
    <section
      id="jewelry"
      aria-labelledby="kabyle-jewelry-title"
      className="w-full max-w-full overflow-hidden rounded-2xl border p-5 sm:p-8 space-y-8"
      style={{
        borderColor: "color-mix(in oklab, var(--brand-gold) 26%, var(--border))",
        background:
          "linear-gradient(160deg, color-mix(in oklab, var(--brand-silver) 22%, var(--card)), var(--card) 60%)",
        boxShadow: "var(--shadow-soft)",
      }}
    >
      {/* Header */}
      <header className="space-y-3">
        <Ornament />
        <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.24em] text-muted-foreground">
          {tr(COPY.eyebrow)}
        </p>
        <h2
          id="kabyle-jewelry-title"
          className="text-2xl sm:text-[2rem] leading-tight font-bold text-foreground"
          style={{ fontFamily: SERIF }}
        >
          {tr(COPY.title)}
        </h2>
        <div className="space-y-3 max-w-3xl">
          <Body>{tr(COPY.intro1)}</Body>
          <Body>{tr(COPY.intro2)}</Body>
        </div>
      </header>

      {/* Main photograph */}
      <figure className="space-y-2 mx-auto max-w-3xl">
        <div
          className="overflow-hidden rounded-xl border bg-card"
          style={{ borderColor: "color-mix(in oklab, var(--brand-bronze) 35%, var(--border))" }}
        >
          <img
            src={mainPhoto.url}
            alt={tr(COPY.mainAlt)}
            loading="lazy"
            width={960}
            height={719}
            className="w-full h-auto object-contain"
          />
        </div>
        <figcaption className="text-xs sm:text-[13px] text-muted-foreground">
          {tr(COPY.mainCaption)}
        </figcaption>
      </figure>


      {/* Section 1 */}
      <div className="space-y-3 max-w-3xl">
        <h3 className="text-lg sm:text-xl font-bold text-foreground" style={{ fontFamily: SERIF }}>
          {tr(COPY.s1Title)}
        </h3>
        <Body>{tr(COPY.s1a)}</Body>
        <Body>{tr(COPY.s1b)}</Body>
      </div>

      <p
        className="rounded-xl border-s-4 px-4 py-3 text-[15px] sm:text-base font-medium text-foreground"
        style={{
          borderInlineStartColor: CORAL,
          borderColor: `color-mix(in oklab, ${CORAL} 30%, var(--border))`,
          background: `color-mix(in oklab, ${CORAL} 8%, var(--card))`,
        }}
      >
        {tr(COPY.s1Callout)}
      </p>

      {/* Materials panel */}
      <div
        className="rounded-xl border p-4 sm:p-5"
        style={{
          borderColor: "color-mix(in oklab, var(--brand-bronze) 28%, var(--border))",
          background: "color-mix(in oklab, var(--brand-silver) 18%, var(--card))",
        }}
      >
        <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-3">
          {tr(COPY.materialsTitle)}
        </h3>
        <ul className="grid gap-3 sm:grid-cols-3">
          {[
            { c: SILVER, title: COPY.matSilver, body: COPY.matSilverBody },
            { c: ENAMEL_BLUE, title: COPY.matEnamel, body: COPY.matEnamelBody },
            { c: CORAL, title: COPY.matCoral, body: COPY.matCoralBody },
          ].map((m, i) => (
            <li key={i} className="flex gap-3">
              <span
                aria-hidden
                className="mt-1 h-4 w-4 shrink-0 rounded-full border"
                style={{
                  background:
                    i === 1
                      ? `linear-gradient(135deg, ${ENAMEL_BLUE}, ${ENAMEL_GREEN} 55%, ${ENAMEL_YELLOW})`
                      : m.c,
                  borderColor: "color-mix(in oklab, var(--brand-bronze) 40%, var(--border))",
                }}
              />
              <div>
                <div className="text-sm font-semibold text-foreground">{tr(m.title)}</div>
                <div className="text-[13px] leading-relaxed text-muted-foreground">{tr(m.body)}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Section 2 */}
      <div className="space-y-3 max-w-3xl">
        <h3 className="text-lg sm:text-xl font-bold text-foreground" style={{ fontFamily: SERIF }}>
          {tr(COPY.s2Title)}
        </h3>
        <Body>{tr(COPY.s2a)}</Body>
        <Body>{tr(COPY.s2b)}</Body>
      </div>

      {/* Object labels */}
      <div className="space-y-3">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
          {tr(COPY.typologyTitle)}
        </h3>
        <p className="text-[13px] text-muted-foreground">{tr(COPY.typologyNote)}</p>
        <dl className="grid gap-3 sm:grid-cols-2">
          {OBJECTS.map((o) => (
            <div
              key={o.term}
              className="rounded-lg border bg-card/80 px-4 py-3"
              style={{ borderColor: "color-mix(in oklab, var(--brand-gold) 24%, var(--border))" }}
            >
              <dt
                className="text-base font-semibold text-foreground"
                style={{ fontFamily: SERIF }}
                dir="ltr"
              >
                {o.term}
              </dt>
              <dd className="text-[13px] leading-relaxed text-muted-foreground mt-1">{tr(o.body)}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Section 3 */}
      <div className="space-y-3 max-w-3xl">
        <h3 className="text-lg sm:text-xl font-bold text-foreground" style={{ fontFamily: SERIF }}>
          {tr(COPY.s3Title)}
        </h3>
        <Body>{tr(COPY.s3a)}</Body>
        <Body>{tr(COPY.s3b)}</Body>
      </div>

      {/* Section 4 */}
      <div className="space-y-3 max-w-3xl">
        <h3 className="text-lg sm:text-xl font-bold text-foreground" style={{ fontFamily: SERIF }}>
          {tr(COPY.s4Title)}
        </h3>
        <Body>{tr(COPY.s4a)}</Body>
        <Body>{tr(COPY.s4b)}</Body>
      </div>

      {/* Closing quote */}
      <blockquote
        className="rounded-2xl border px-5 py-6 text-center"
        style={{
          borderColor: `color-mix(in oklab, ${CORAL} 26%, var(--border))`,
          background: `linear-gradient(135deg, color-mix(in oklab, ${ENAMEL_BLUE} 7%, var(--card)), color-mix(in oklab, ${CORAL} 7%, var(--card)))`,
        }}
      >
        <p
          className="text-lg sm:text-xl italic leading-relaxed text-foreground"
          style={{ fontFamily: SERIF }}
        >
          {tr(COPY.quote)}
        </p>
      </blockquote>

      {/* Sources */}
      <details
        className="rounded-xl border bg-card/70 px-4 py-3"
        style={{ borderColor: "color-mix(in oklab, var(--brand-bronze) 24%, var(--border))" }}
      >
        <summary className="cursor-pointer text-sm font-semibold text-foreground">
          {tr(COPY.sourcesTitle)}
        </summary>
        <p className="mt-3 text-[13px] text-muted-foreground">{tr(COPY.sourcesIntro)}</p>
        <ul className="mt-3 space-y-2 text-[13px] text-foreground/90">
          {SOURCES.map((s) => (
            <li key={s.text} className="break-words">
              {s.href ? (
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-primary"
                >
                  {s.text}
                </a>
              ) : (
                s.text
              )}
            </li>
          ))}
        </ul>
      </details>
    </section>
  );
}

export default KabyleJewelry;
