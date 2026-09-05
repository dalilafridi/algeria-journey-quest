/**
 * Street food section for the Cuisine exhibit.
 *
 * Cultural-memory story built around the frites-omelette sandwich, with three
 * smaller supporting street-food cards. Artwork is a code-native interpretive
 * illustration (no photographs, no cartoons).
 */

import { t, useLang, type LocalizedString } from "@/lib/i18n";

const L = (en: string, fr: string, ar: string): LocalizedString => ({ en, fr, ar });

const SERIF = 'Georgia, "Iowan Old Style", "Times New Roman", serif';

const copy = {
  eyebrow: L("Food of the street", "Cuisine de la rue", "طعام الشارع"),
  heading: L("The lunch that became a memory", "Le déjeuner devenu souvenir", "غداء أصبح ذكرى"),
  intro: L(
    "Algerian street food was built for everyday life: hot, filling, inexpensive and easy to carry. From Oran's karantika to Biskra's doubara and the folded layers of mhadjeb, modest ingredients became regional signatures. Few foods capture this spirit more completely than the frites-omelette sandwich.",
    "La cuisine de rue algérienne s'est construite autour de la vie quotidienne : chaude, généreuse, abordable et facile à emporter. De la karantika d'Oran à la doubara de Biskra, en passant par les couches repliées du mhadjeb, des ingrédients modestes sont devenus des signatures régionales. Peu de plats incarnent mieux cet esprit que le sandwich frites-omelette.",
    "نشأ طعام الشارع الجزائري من إيقاع الحياة اليومية: ساخن، مشبع، بسيط الثمن وسهل الحمل. من الكارانتيكا الوهرانية إلى دوبارة بسكرة وطبقات المحاجب المطوية، تحولت مكونات متواضعة إلى أطباق مرتبطة بمناطق وذكريات. وقليل من الأكلات يجسد هذه الروح مثل ساندويتش فريت أومليت.",
  ),
  featureTitle: L("Frites-omelette", "Frites-omelette", "ساندويتش البطاطا المقلية والعجة"),
  featureSubtitle: L(
    "Baguette + fries + eggs. That is almost the entire story.",
    "Baguette + frites + œufs. C'est presque toute l'histoire.",
    "خبز + بطاطا مقلية + بيض. هذه تقريبا كل الحكاية.",
  ),
  featureBody1: L(
    "The classic Algerian frites-omelette is almost comically simple: a baguette filled with fries and eggs, often joined by harissa, mayonnaise or cheese. More elaborate versions may include minced meat or merguez and move toward what is commonly called a complet.",
    "Le frites-omelette algérien classique est d'une simplicité presque comique : une baguette garnie de frites et d'œufs, souvent accompagnés de harissa, de mayonnaise ou de fromage. Des versions plus élaborées peuvent ajouter de la viande hachée ou de la merguez et se rapprocher de ce que l'on appelle couramment un complet.",
    "يتميز ساندويتش فريت أومليت الجزائري الكلاسيكي ببساطة تكاد تكون مضحكة: خبز باغيت محشو بالبطاطا المقلية والبيض، مع الهريسة أو المايونيز أو الجبن في كثير من الأحيان. وقد تضاف إليه اللحمة المفرومة أو المرقاز في نسخ أكثر سخاء تقترب مما يعرف باسم complet.",
  ),
  featureBody2: L(
    "Its importance is not culinary sophistication. It is social history. The sandwich became popular because it was inexpensive, filling, quick to prepare and easy to carry. It fed workers between shifts, students between classes and schoolchildren on their way home.",
    "Son importance ne réside pas dans la sophistication culinaire, mais dans l'histoire sociale. Le sandwich s'est imposé parce qu'il était abordable, rassasiant, rapide à préparer et facile à emporter. Il nourrissait les travailleurs entre deux services, les étudiants entre deux cours et les écoliers sur le chemin du retour.",
    "لا تكمن أهميته في التعقيد، بل في تاريخه الاجتماعي. فقد انتشر لأنه كان قليل التكلفة، مشبعا، سريع التحضير وسهل الحمل. أكل منه العمال بين فترات العمل، والطلبة بين الدروس، والتلاميذ في طريق العودة إلى البيت.",
  ),
  anecdoteTitle: L("A note from the counter", "Un mot du comptoir", "كلمة من عند الكونتوار"),
  anecdote: L(
    "Nobody ordered a frites-omelette for the elegant plating. You ordered it because you were hungry, in a hurry and had just enough money. Five minutes later, fries were escaping from the baguette, harissa was on your fingers, and lunch had done its job.",
    "Personne ne commandait un frites-omelette pour l'élégance du dressage. On le commandait parce qu'on avait faim, qu'on était pressé et qu'on avait juste assez d'argent. Cinq minutes plus tard, les frites s'échappaient de la baguette, la harissa était sur les doigts et le déjeuner avait rempli sa mission.",
    "لم يكن أحد يطلب ساندويتش فريت أومليت من أجل أناقة التقديم. كان يُطلب لأن الجوع حاضر، والوقت قصير، والنقود تكفي بالكاد. وبعد خمس دقائق، كانت البطاطا تهرب من الخبز، والهريسة على الأصابع، والغداء قد أدى مهمته.",
  ),
  gargoteTitle: L(
    "Its natural habitat: the gargote",
    "Son habitat naturel : la gargote",
    "مكانه الطبيعي: القارغوت",
  ),
  gargote: L(
    "The sandwich belongs to the small neighborhood counter. Fries can be prepared in quantity, eggs take only minutes, and the baguette turns everything into a portable meal. This was food organized around the pace of ordinary urban life, not formal dining.",
    "Ce sandwich appartient au petit comptoir de quartier. Les frites peuvent être préparées en quantité, les œufs ne demandent que quelques minutes et la baguette transforme le tout en repas à emporter. C'est une cuisine adaptée au rythme de la vie urbaine ordinaire, loin des repas formels.",
    "ينتمي هذا الساندويتش إلى المطاعم الشعبية الصغيرة وكونتوارات الأحياء. يمكن تحضير البطاطا بكميات كبيرة، ولا يحتاج البيض إلا إلى دقائق، ثم يحول الخبز المزيج إلى وجبة سهلة الحمل. إنه طعام صمم لإيقاع الحياة الحضرية اليومية، لا للمائدة الرسمية.",
  ),
  memoryTitle: L("Memory and diaspora", "Mémoire et diaspora", "الذاكرة والمهجر"),
  memory: L(
    "For many Algerians, the memory is larger than the ingredients: the smell of frying potatoes, the neighborhood shop, lunch after school, and perhaps a cold bottle of gazouz. In the diaspora, the same simple sandwich can bring Algeria back in a single bite.",
    "Pour beaucoup d'Algériens, le souvenir dépasse les ingrédients : l'odeur des pommes de terre qui cuisent, le petit commerce du quartier, le déjeuner après l'école et peut-être une bouteille de gazouz bien fraîche. Dans la diaspora, ce sandwich très simple peut faire revenir l'Algérie dès la première bouchée.",
    "بالنسبة إلى كثير من الجزائريين، تتجاوز الذكرى مكونات الساندويتش: رائحة البطاطا وهي تقلى، ومحل الحي، وغداء ما بعد المدرسة، وربما قارورة غازوز باردة. وفي المهجر، قد يعيد هذا الساندويتش البسيط الجزائر منذ أول لقمة.",
  ),
  pullQuote: L(
    "Working-class food that became cultural memory.",
    "Une cuisine populaire devenue mémoire culturelle.",
    "طعام شعبي أصبح ذاكرة ثقافية.",
  ),
  cautionTitle: L("Curator's note", "Note du conservateur", "ملاحظة أمين المتحف"),
  caution: L(
    "There is no securely documented inventor, first restaurant or exact creation date for the Algerian frites-omelette sandwich. Available reporting points to modern popularization, with some accounts connecting its wider consumption to the growth of industrial egg production in the early 2000s. This should be presented as a historical reconstruction, not a settled origin story.",
    "Il n'existe pas d'inventeur, de premier restaurant ni de date de création solidement documentés pour le sandwich frites-omelette algérien. Les sources disponibles indiquent une popularisation moderne, certains récits reliant sa consommation plus large au développement de la production industrielle d'œufs au début des années 2000. Cette chronologie doit être présentée comme une reconstruction historique, et non comme une origine définitivement établie.",
    "لا يوجد مخترع موثق أو مطعم أول أو تاريخ دقيق ثابت لظهور ساندويتش فريت أومليت الجزائري. وتشير المصادر المتاحة إلى انتشار حديث، إذ تربط بعض الروايات اتساع استهلاكه بتطور الإنتاج الصناعي للبيض في بداية سنوات 2000. ويجب تقديم ذلك بوصفه إعادة بناء تاريخية، لا قصة أصل محسومة.",
  ),
  illustrationCaption: L(
    "Interpretive illustration: a baguette wrapped in paper, drawn for this exhibit.",
    "Illustration interprétative : une baguette enveloppée de papier, dessinée pour cette exposition.",
    "رسم تفسيري: خبز باغيت ملفوف بالورق، أُنجز خصيصا لهذا المعرض.",
  ),
  supportingTitle: L(
    "Other counters, other regions",
    "Autres comptoirs, autres régions",
    "كونتوارات أخرى، مناطق أخرى",
  ),
  regionLabel: L("Region", "Région", "المنطقة"),
};

type StreetItem = {
  id: string;
  name: LocalizedString;
  latin?: string;
  region: LocalizedString;
  description: LocalizedString;
};

const supporting: StreetItem[] = [
  {
    id: "karantika",
    name: L("Karantika / Garantita", "Karantika / Garantita", "الكارانتيكا"),
    latin: "Karantika / Garantita",
    region: L("Oran and western Algeria", "Oran et l'ouest algérien", "وهران والغرب الجزائري"),
    description: L(
      "A hot chickpea-flour specialty commonly served with cumin and harissa, sometimes inside bread. Its popular origin story is linked to the Spanish presence in Oran, but the precise story remains culinary tradition rather than settled fact.",
      "Une spécialité chaude à base de farine de pois chiches, généralement servie avec du cumin et de la harissa, parfois dans du pain. Son récit d'origine populaire est lié à la présence espagnole à Oran, mais son histoire précise relève davantage de la tradition culinaire que d'un fait définitivement établi.",
      "طبق ساخن من دقيق الحمص، يقدم عادة مع الكمون والهريسة وأحيانا داخل الخبز. وترتبط رواية أصله الشعبية بالوجود الإسباني في وهران، لكن التفاصيل الدقيقة تبقى من التراث المتداول أكثر من كونها حقيقة تاريخية محسومة.",
    ),
  },
  {
    id: "doubara",
    name: L("Doubara", "Doubara", "الدوبارة"),
    latin: "Doubara",
    region: L(
      "Biskra and southeastern Algeria",
      "Biskra et le sud-est algérien",
      "بسكرة والجنوب الشرقي الجزائري",
    ),
    description: L(
      "Chickpeas or fava beans with tomato, garlic, spices and plenty of heat. Doubara shows how an inexpensive dish can cross social boundaries and become a regional emblem.",
      "Pois chiches ou fèves, tomate, ail, épices et beaucoup de piquant. La doubara montre comment un plat abordable peut traverser les milieux sociaux et devenir un emblème régional.",
      "حمص أو فول مع الطماطم والثوم والتوابل وحرارة الفلفل. توضح الدوبارة كيف يمكن لطبق بسيط الثمن أن يعبر الفئات الاجتماعية ويصبح رمزا لمنطقة كاملة.",
    ),
  },
  {
    id: "mhadjeb",
    name: L("Mhadjeb", "Mhadjeb", "المحاجب"),
    latin: "Mhadjeb",
    region: L("Across Algeria", "Partout en Algérie", "في كامل الجزائر"),
    description: L(
      "A semolina flatbread folded around cooked onion, tomato and peppers. It moves naturally between home cooking and street food.",
      "Une galette de semoule repliée autour d'une farce cuite à base d'oignon, de tomate et de poivrons. Elle passe naturellement de la cuisine familiale à la cuisine de rue.",
      "فطيرة من السميد تطوى حول حشوة مطبوخة من البصل والطماطم والفلفل. تنتقل المحاجب بسهولة بين مطبخ البيت وطعام الشارع.",
    ),
  },
];

/** Code-native engraved still life: a paper-wrapped baguette. */
function WrappedBaguette() {
  return (
    <svg
      viewBox="0 0 320 200"
      role="img"
      aria-label="Engraved illustration of a paper-wrapped baguette sandwich"
      className="w-full h-auto"
    >
      <defs>
        <linearGradient id="sf-paper" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="color-mix(in oklab, var(--secondary) 12%, #f6efe0)" />
          <stop offset="100%" stopColor="color-mix(in oklab, var(--secondary) 4%, #ece0c9)" />
        </linearGradient>
        <pattern id="sf-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="color-mix(in oklab, var(--secondary) 40%, transparent)" strokeWidth="0.6" />
        </pattern>
      </defs>

      <rect x="0" y="0" width="320" height="200" fill="url(#sf-paper)" rx="10" />
      <rect x="0" y="0" width="320" height="200" fill="url(#sf-hatch)" opacity="0.18" rx="10" />

      {/* paper wrapper */}
      <g
        fill="none"
        stroke="color-mix(in oklab, var(--foreground) 55%, transparent)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M44 138 L96 74 L228 74 L280 138 Z" fill="color-mix(in oklab, #ffffff 55%, transparent)" />
        <path d="M96 74 L120 138 M228 74 L204 138" strokeWidth="1" opacity="0.6" />
        {/* baguette emerging from the wrapper */}
        <path d="M104 74 C118 40, 210 40, 224 74" fill="color-mix(in oklab, var(--secondary) 22%, #f0e2c6)" />
        <path d="M126 56 l14 8 M154 50 l14 8 M182 52 l14 8" strokeWidth="1" opacity="0.7" />
        {/* fries and omelette peeking out */}
        <path d="M138 62 l6 -22 M150 60 l3 -24 M164 60 l9 -21" strokeWidth="1.4" opacity="0.8" />
        <path d="M118 70 c12 -10, 26 -6, 32 2" strokeWidth="1.2" opacity="0.75" />
        {/* counter line */}
        <path d="M28 146 L292 146" strokeWidth="1.2" opacity="0.5" />
      </g>
    </svg>
  );
}

export function StreetFood() {
  const lang = useLang();
  const isAr = lang === "ar";

  return (
    <section id="street-food" className="scroll-mt-24">
      <header className="mb-5">
        <p className="text-[11px] sm:text-xs uppercase tracking-[0.26em] font-semibold text-secondary">
          {t(copy.eyebrow, lang)}
        </p>
        <h2 className="mt-2 text-xl sm:text-2xl font-extrabold tracking-tight">{t(copy.heading, lang)}</h2>
        <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">{t(copy.intro, lang)}</p>
      </header>

      {/* FEATURED: frites-omelette */}
      <article
        className="rounded-3xl border overflow-hidden"
        style={{
          borderColor: "color-mix(in oklab, var(--secondary) 40%, var(--border))",
          background: "color-mix(in oklab, var(--secondary) 6%, var(--card))",
          boxShadow: "var(--shadow-soft)",
        }}
      >
        <figure className="m-0">
          <div className="px-4 pt-4 sm:px-6 sm:pt-6">
            <WrappedBaguette />
          </div>
          <figcaption className="px-4 sm:px-6 pt-2 text-[11px] text-muted-foreground">
            {t(copy.illustrationCaption, lang)}
          </figcaption>
        </figure>

        <div className="p-5 sm:p-7">
          <h3
            className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight"
            style={{ fontFamily: SERIF }}
          >
            {t(copy.featureTitle, lang)}
          </h3>
          {isAr && (
            <p dir="ltr" className="mt-1 text-sm font-semibold text-secondary text-start">
              Frites-omelette
            </p>
          )}
          <p className="mt-2 text-[14px] sm:text-[15px] font-semibold text-secondary">
            {t(copy.featureSubtitle, lang)}
          </p>

          <p className="mt-4 text-[14.5px] leading-relaxed text-foreground/85">{t(copy.featureBody1, lang)}</p>
          <p className="mt-3 text-[14.5px] leading-relaxed text-foreground/85">{t(copy.featureBody2, lang)}</p>

          {/* Anecdote */}
          <div
            className="mt-6 rounded-2xl border border-dashed p-4 sm:p-5"
            style={{
              borderColor: "color-mix(in oklab, var(--secondary) 45%, var(--border))",
              background: "color-mix(in oklab, var(--secondary) 8%, var(--background))",
            }}
          >
            <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-secondary">
              {t(copy.anecdoteTitle, lang)}
            </div>
            <p className="mt-2 text-[13.5px] italic leading-relaxed text-foreground/85">
              {t(copy.anecdote, lang)}
            </p>
          </div>

          {/* Gargote */}
          <div className="mt-6">
            <h4 className="text-base font-bold tracking-tight">
              {isAr ? (
                <>
                  مكانه الطبيعي:{" "}
                  <span dir="ltr" className="inline-block">
                    gargote
                  </span>
                </>
              ) : (
                t(copy.gargoteTitle, lang)
              )}
            </h4>
            <p className="mt-2 text-[14.5px] leading-relaxed text-foreground/85">{t(copy.gargote, lang)}</p>
          </div>

          {/* Memory */}
          <div className="mt-6">
            <h4 className="text-base font-bold tracking-tight">{t(copy.memoryTitle, lang)}</h4>
            <p className="mt-2 text-[14.5px] leading-relaxed text-foreground/85">{t(copy.memory, lang)}</p>
          </div>

          <blockquote
            className="mt-6 ps-4 border-s-2 italic text-[15px] leading-relaxed text-foreground/90"
            style={{
              borderColor: "color-mix(in oklab, var(--secondary) 60%, transparent)",
              fontFamily: SERIF,
            }}
          >
            {t(copy.pullQuote, lang)}
          </blockquote>

          {/* Historical caution */}
          <div
            className="mt-6 rounded-2xl p-4 sm:p-5"
            style={{ background: "color-mix(in oklab, var(--muted) 75%, transparent)" }}
          >
            <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              {t(copy.cautionTitle, lang)}
            </div>
            <p className="mt-2 text-[13px] leading-relaxed text-foreground/80">{t(copy.caution, lang)}</p>
          </div>
        </div>
      </article>

      {/* SUPPORTING CARDS */}
      <h3 className="mt-8 mb-3 text-sm font-bold uppercase tracking-[0.18em] text-muted-foreground">
        {t(copy.supportingTitle, lang)}
      </h3>
      <div className="grid sm:grid-cols-3 gap-3">
        {supporting.map((s) => (
          <article
            key={s.id}
            className="rounded-2xl border border-border bg-card p-4"
            style={{ boxShadow: "var(--shadow-soft)" }}
          >
            <h4 className="font-bold text-[15px] leading-tight text-foreground">{t(s.name, lang)}</h4>
            {isAr && s.latin && (
              <p dir="ltr" className="text-[11px] font-semibold text-secondary text-start">
                {s.latin}
              </p>
            )}
            <p className="mt-1 text-[11px] uppercase tracking-wider font-semibold text-secondary">
              {t(copy.regionLabel, lang)} · {t(s.region, lang)}
            </p>
            <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{t(s.description, lang)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
