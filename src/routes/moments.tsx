import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { AmazighSymbol } from "@/components/brand/AmazighSymbol";
import { useLang, type Lang, type Localized } from "@/lib/i18n";
import {
  GuideBubble,
  MuseumReveal,
  DecisionGame,
  MapSection,
  ReflectionCard,
  WeRememberCard,
  DailyCard,
  type DecisionScenario,
  type MapRegion,
  type DailyQuestion,
} from "@/components/moments/Immersive";
import { StoryFlow } from "@/components/story/StoryFlow";
import { TAFSUT_SCENES, DECADE_SCENES, EDUCATION_SCENES, INDEPENDENCE_WAR_SCENES } from "@/data/storyScenes";

// ============================================================
// Route
// ============================================================
export const Route = createFileRoute("/moments")({
  head: () => ({
    meta: [
      { title: "Moments That Shaped Algeria — Algeria Through Time" },
      {
        name: "description",
        content:
          "A gentle, museum-style page for children: Tafsut Imazighen (1980) and the Black Decade (1990s). Identity, courage, memory, and peace.",
      },
      { property: "og:title", content: "Moments That Shaped Algeria" },
      {
        property: "og:description",
        content:
          "Two pivotal chapters of modern Algerian history, told with care for young learners.",
      },
    ],
  }),
  component: MomentsPage,
});

// ============================================================
// Multilingual helpers
// ============================================================
type L3 = Localized<string>;
const L = (fr: string, en: string, ar: string): L3 => ({ fr, en, ar });
const tr = (v: L3, lang: Lang) => v[lang] ?? v.en;

// ============================================================
// UI strings (page-local)
// ============================================================
const UI = {
  hero: {
    title: L(
      "Moments qui ont façonné l'Algérie",
      "Moments That Shaped Algeria",
      "لحظات صنعت الجزائر",
    ),
    subtitle: L(
      "Identité, courage, mémoire et paix — deux chapitres essentiels de l'histoire algérienne, racontés avec douceur.",
      "Identity, courage, memory, and peace — two essential chapters of Algerian history, told with care.",
      "الهوية، الشجاعة، الذاكرة والسلام — فصلان أساسيان من تاريخ الجزائر، يُرويان برفق.",
    ),
    badge: L("Salle d'exposition", "Exhibition Hall", "قاعة العرض"),
  },
  storyMode: L("Mode récit", "Story mode", "وضع القصة"),
  whatHappened: L("Ce qui s'est passé", "What happened", "ما الذي حدث"),
  aftermath: L("Et après ?", "Aftermath", "وما بعده"),
  keyLesson: L("Leçon à retenir", "Key lesson", "الدرس المستفاد"),
  timelineTitle: L("Frise interactive", "Interactive timeline", "خط زمني تفاعلي"),
  gameTitle: L("Et toi, que ferais-tu ?", "What would you do?", "وأنت، ماذا ستفعل؟"),
  quizTitle: L("Petit quiz", "Quick quiz", "اختبار قصير"),
  badgesTitle: L("Tes insignes", "Your badges", "أوسمتك"),
  next: L("Question suivante", "Next question", "السؤال التالي"),
  restart: L("Recommencer", "Start again", "إعادة"),
  yourScore: L("Ton résultat", "Your score", "نتيجتك"),
  reflect: L("Réfléchis…", "Take a moment…", "تأمّل قليلاً…"),
  chooseAgain: L("Choisir à nouveau", "Choose again", "اختر مجدّدًا"),
};

// ============================================================
// Tiny presentational atoms
// ============================================================
function SectionDivider() {
  return (
    <div className="flex items-center gap-4 my-10" aria-hidden>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <AmazighSymbol size={28} glow={false} className="opacity-70" />
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/15 border border-secondary/30 text-xs font-semibold tracking-wide uppercase text-secondary">
      <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
      {children}
    </div>
  );
}

function MuseumCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={
        "rounded-2xl border border-border bg-card/95 shadow-sm hover:shadow-md transition-shadow p-6 sm:p-7 " +
        className
      }
    >
      {children}
    </div>
  );
}

// ============================================================
// HeroSection
// ============================================================
function HeroSection({ lang }: { lang: Lang }) {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 70% at 20% 10%, color-mix(in oklab, var(--secondary) 18%, transparent), transparent), radial-gradient(50% 60% at 90% 20%, color-mix(in oklab, var(--primary) 14%, transparent), transparent)",
        }}
        aria-hidden
      />
      <div className="max-w-4xl mx-auto px-4 pt-12 pb-8 sm:pt-16 sm:pb-12 text-center">
        <div className="flex justify-center mb-5">
          <AmazighSymbol size={64} />
        </div>
        <div className="flex justify-center mb-4">
          <Eyebrow>{tr(UI.hero.badge, lang)}</Eyebrow>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight tracking-tight text-foreground">
          {tr(UI.hero.title, lang)}
        </h1>
        <p className="mt-4 sm:mt-5 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {tr(UI.hero.subtitle, lang)}
        </p>
      </div>
    </section>
  );
}

// ============================================================
// StoryBlock — narrative passage
// ============================================================
function StoryBlock({ icon, title, body, lang }: { icon: string; title: L3; body: L3; lang: Lang }) {
  return (
    <MuseumCard>
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl" aria-hidden>
          {icon}
        </span>
        <h3 className="text-lg sm:text-xl font-bold">{tr(title, lang)}</h3>
      </div>
      <p className="text-foreground/85 leading-relaxed whitespace-pre-line">{tr(body, lang)}</p>
    </MuseumCard>
  );
}

// ============================================================
// FactsGrid — visual bullets
// ============================================================
function FactsGrid({ items, lang }: { items: { icon: string; text: L3 }[]; lang: Lang }) {
  return (
    <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
      {items.map((it, i) => (
        <div
          key={i}
          className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card/70"
        >
          <span className="text-xl shrink-0" aria-hidden>
            {it.icon}
          </span>
          <p className="text-sm sm:text-[15px] text-foreground/85 leading-relaxed">
            {tr(it.text, lang)}
          </p>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// LessonCard
// ============================================================
function LessonCard({ text, accent, lang }: { text: L3; accent: string; lang: Lang }) {
  return (
    <div
      className="relative rounded-2xl border p-6 sm:p-7 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, color-mix(in oklab, " +
          accent +
          " 18%, var(--card)), var(--card))",
        borderColor: "color-mix(in oklab, " + accent + " 35%, var(--border))",
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <AmazighSymbol size={22} glow={false} />
        <span className="text-xs font-bold uppercase tracking-wider text-foreground/70">
          {tr(UI.keyLesson, lang)}
        </span>
      </div>
      <p className="text-lg sm:text-xl font-semibold leading-snug text-foreground">
        “{tr(text, lang)}”
      </p>
    </div>
  );
}

// ============================================================
// TimelineSection — horizontal scroller
// ============================================================
type TimelineNode = { year: string; label: L3; topic: "tafsut" | "decade" | "shared" };

function TimelineSection({ nodes, lang }: { nodes: TimelineNode[]; lang: Lang }) {
  const [active, setActive] = useState(0);
  const node = nodes[active];
  const color = (t: TimelineNode["topic"]) =>
    t === "tafsut"
      ? "var(--secondary)"
      : t === "decade"
        ? "oklch(0.6 0.12 25)"
        : "var(--primary)";

  return (
    <MuseumCard>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg sm:text-xl font-bold">{tr(UI.timelineTitle, lang)}</h3>
        <span className="text-xs text-muted-foreground">{node.year}</span>
      </div>

      <div
        className="overflow-x-auto pb-3 -mx-2 px-2"
        style={{ scrollbarWidth: "thin" }}
      >
        <div className="relative min-w-max">
          <div className="absolute top-5 left-0 right-0 h-px bg-border" aria-hidden />
          <ol className="flex items-start gap-6 sm:gap-10 relative">
            {nodes.map((n, i) => {
              const isActive = i === active;
              return (
                <li key={n.year + i} className="flex flex-col items-center w-28 sm:w-36">
                  <button
                    onClick={() => setActive(i)}
                    className="relative z-10 w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center text-xs font-bold"
                    style={{
                      borderColor: isActive ? color(n.topic) : "var(--border)",
                      background: isActive ? color(n.topic) : "var(--card)",
                      color: isActive ? "white" : "var(--foreground)",
                      transform: isActive ? "scale(1.08)" : "scale(1)",
                      boxShadow: isActive
                        ? `0 4px 16px color-mix(in oklab, ${color(n.topic)} 35%, transparent)`
                        : "none",
                    }}
                    aria-pressed={isActive}
                  >
                    •
                  </button>
                  <span className="mt-2 text-xs font-bold text-foreground/80">{n.year}</span>
                  <span className="mt-1 text-[11px] sm:text-xs text-center text-muted-foreground leading-snug">
                    {tr(n.label, lang)}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </MuseumCard>
  );
}

// ============================================================
// ChoiceGame — "What would you do?"
// ============================================================
type Choice = { label: L3; feedback: L3 };
type Scenario = { prompt: L3; choices: Choice[] };

function ChoiceGame({ scenario, lang }: { scenario: Scenario; lang: Lang }) {
  const [picked, setPicked] = useState<number | null>(null);
  return (
    <MuseumCard>
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl" aria-hidden>
          🤔
        </span>
        <h3 className="text-lg sm:text-xl font-bold">{tr(UI.gameTitle, lang)}</h3>
      </div>
      <p className="text-foreground/85 leading-relaxed mb-4">{tr(scenario.prompt, lang)}</p>

      {picked === null ? (
        <div className="grid sm:grid-cols-2 gap-3">
          {scenario.choices.map((c, i) => (
            <button
              key={i}
              onClick={() => setPicked(i)}
              className="text-start p-4 rounded-xl border border-border bg-card hover:bg-muted/40 hover:border-secondary/50 transition-all"
            >
              <span className="text-sm font-semibold">{tr(c.label, lang)}</span>
            </button>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-secondary/40 bg-secondary/10 p-4">
          <div className="text-xs font-bold uppercase tracking-wider text-secondary mb-1">
            {tr(UI.reflect, lang)}
          </div>
          <p className="text-foreground/90 leading-relaxed">
            {tr(scenario.choices[picked].feedback, lang)}
          </p>
          <button
            onClick={() => setPicked(null)}
            className="mt-3 text-sm font-semibold text-secondary hover:underline"
          >
            ↺ {tr(UI.chooseAgain, lang)}
          </button>
        </div>
      )}
    </MuseumCard>
  );
}

// ============================================================
// QuizSection
// ============================================================
type QuizQ = { q: L3; options: L3[]; answerIndex: number; explain: L3 };

function QuizSection({
  title,
  questions,
  onPerfect,
  lang,
}: {
  title: L3;
  questions: QuizQ[];
  onPerfect?: () => void;
  lang: Lang;
}) {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = questions[idx];

  const choose = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === q.answerIndex) setScore((s) => s + 1);
  };

  const next = () => {
    if (idx + 1 >= questions.length) {
      setDone(true);
      if (score + (picked === q.answerIndex ? 0 : 0) === questions.length && onPerfect) onPerfect();
      // The above guard preserves perfect detection at end
      if (score === questions.length && onPerfect) onPerfect();
    } else {
      setIdx(idx + 1);
      setPicked(null);
    }
  };

  const reset = () => {
    setIdx(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  };

  return (
    <MuseumCard>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl" aria-hidden>
            🧠
          </span>
          <h3 className="text-lg sm:text-xl font-bold">{tr(title, lang)}</h3>
        </div>
        <span className="text-xs text-muted-foreground">
          {Math.min(idx + 1, questions.length)} / {questions.length}
        </span>
      </div>

      {done ? (
        <div className="text-center py-6">
          <div className="text-4xl mb-3">🎓</div>
          <p className="text-lg font-bold">{tr(UI.yourScore, lang)}</p>
          <p className="text-3xl font-extrabold mt-1 text-secondary">
            {score} / {questions.length}
          </p>
          <button
            onClick={reset}
            className="mt-5 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition"
          >
            ↺ {tr(UI.restart, lang)}
          </button>
        </div>
      ) : (
        <>
          <p className="text-foreground/90 leading-relaxed mb-4">{tr(q.q, lang)}</p>
          <div className="grid gap-2.5">
            {q.options.map((opt, i) => {
              const isCorrect = picked !== null && i === q.answerIndex;
              const isWrong = picked === i && i !== q.answerIndex;
              return (
                <button
                  key={i}
                  onClick={() => choose(i)}
                  disabled={picked !== null}
                  className={
                    "text-start p-3.5 rounded-xl border transition-all " +
                    (isCorrect
                      ? "border-secondary bg-secondary/15"
                      : isWrong
                        ? "border-destructive/60 bg-destructive/10"
                        : "border-border bg-card hover:bg-muted/40 hover:border-secondary/40")
                  }
                >
                  <span className="text-sm sm:text-[15px] font-medium">{tr(opt, lang)}</span>
                </button>
              );
            })}
          </div>

          {picked !== null && (
            <div className="mt-4 p-3.5 rounded-xl bg-muted/40 border border-border">
              <p className="text-sm text-foreground/85 leading-relaxed">{tr(q.explain, lang)}</p>
              <button
                onClick={next}
                className="mt-3 px-4 py-1.5 rounded-full bg-foreground text-background text-sm font-semibold hover:opacity-90 transition"
              >
                {tr(UI.next, lang)} →
              </button>
            </div>
          )}
        </>
      )}
    </MuseumCard>
  );
}

// ============================================================
// BadgeDisplay
// ============================================================
type Badge = { id: string; emoji: string; name: L3; hint: L3 };

function BadgeDisplay({ badges, earned, lang }: { badges: Badge[]; earned: Set<string>; lang: Lang }) {
  return (
    <MuseumCard>
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl" aria-hidden>
          🏅
        </span>
        <h3 className="text-lg sm:text-xl font-bold">{tr(UI.badgesTitle, lang)}</h3>
      </div>
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {badges.map((b) => {
          const got = earned.has(b.id);
          return (
            <div
              key={b.id}
              className={
                "rounded-2xl border p-4 text-center transition-all " +
                (got
                  ? "border-secondary/50 bg-secondary/10 shadow-sm"
                  : "border-dashed border-border bg-muted/20 opacity-60")
              }
            >
              <div className="text-3xl sm:text-4xl mb-1.5" aria-hidden>
                {b.emoji}
              </div>
              <div className="text-sm font-bold">{tr(b.name, lang)}</div>
              <div className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
                {tr(b.hint, lang)}
              </div>
            </div>
          );
        })}
      </div>
    </MuseumCard>
  );
}

// ============================================================
// Topic data — Tafsut Imazighen (1980)
// ============================================================
const TAFSUT = {
  title: L("Tafsut Imazighen — Le Printemps berbère (1980)", "Tafsut Imazighen — Berber Spring (1980)", "تافسوت إمازيغن — الربيع الأمازيغي (1980)"),
  year: "1980",
  tagColor: "var(--secondary)",
  story: L(
    "En 1980, un écrivain nommé Mouloud Mammeri voulait parler de la poésie kabyle ancienne, dans une grande ville d'Algérie. Mais sa conférence fut interdite. Beaucoup d'étudiants, surtout en Kabylie, trouvèrent cela injuste. Ils sortirent calmement dans la rue pour dire : « Notre langue compte. Notre culture compte. »",
    "In 1980, a writer named Mouloud Mammeri wanted to give a talk about old Kabyle poetry in a big Algerian city. The talk was cancelled. Many students, especially in Kabylie, felt this was unfair. They walked into the streets, peacefully, to say: “Our language matters. Our culture matters.”",
    "في سنة 1980، أراد كاتب اسمه مولود معمري أن يلقي محاضرة حول الشعر القبائلي القديم في مدينة جزائرية كبيرة. مُنعت محاضرته. شعر كثير من الطلبة، خاصة في منطقة القبائل، أن هذا ظلم. خرجوا بهدوء إلى الشوارع ليقولوا: «لغتنا مهمة، ثقافتنا مهمة».",
  ),
  facts: [
    { icon: "📍", text: L("La Kabylie au cœur du mouvement", "Kabylie at the heart of the movement", "منطقة القبائل في قلب الحراك") },
    { icon: "🗣️", text: L("Demande de reconnaissance de la langue amazighe", "A call to recognise the Amazigh language", "المطالبة بالاعتراف باللغة الأمازيغية") },
    { icon: "🕊️", text: L("Manifestations pacifiques d'étudiants", "Peaceful student demonstrations", "مظاهرات طلابية سلمية") },
    { icon: "⚖️", text: L("Une réponse dure des autorités de l'époque", "A harsh response from the authorities at the time", "ردّ صارم من السلطات آنذاك") },
  ],
  timeline: [
    { year: "1980", topic: "tafsut" as const, label: L("Le Printemps berbère commence", "The Berber Spring begins", "بداية الربيع الأمازيغي") },
    { year: "1988", topic: "shared" as const, label: L("Plus de libertés en Algérie", "More freedoms in Algeria", "توسيع الحريات في الجزائر") },
    { year: "2002", topic: "tafsut" as const, label: L("Tamazight devient langue nationale", "Tamazight becomes a national language", "ترسيم الأمازيغية لغة وطنية") },
    { year: "2016", topic: "tafsut" as const, label: L("Tamazight devient langue officielle", "Tamazight becomes an official language", "الأمازيغية لغة رسمية") },
  ],
  lesson: L(
    "Parfois, de petites voix créent de grands changements.",
    "Sometimes small voices create big change.",
    "أحيانًا، أصوات صغيرة تُحدِث تغييرات كبيرة.",
  ),
  decisions: [
    {
      prompt: L(
        "Tu es étudiant·e en 1980. Ta langue maternelle n'est pas reconnue à l'école. Que choisis-tu ?",
        "You are a student in 1980. Your mother tongue is not recognised at school. What do you choose?",
        "أنت طالب·ة سنة 1980. لغتك الأم غير معترف بها في المدرسة. ماذا تختار؟",
      ),
      choices: [
        {
          label: L("Parler calmement avec d'autres élèves", "Speak calmly with other students", "أتحدّث بهدوء مع زملائي"),
          feedback: L(
            "Bravo. Partager ses idées avec respect aide les autres à comprendre, et c'est souvent comme ça que tout commence.",
            "Well done. Sharing ideas with respect helps others understand — that's often how change begins.",
            "أحسنت. مشاركة الأفكار باحترام تساعد الآخرين على الفهم، وهكذا يبدأ التغيير غالبًا.",
          ),
        },
        {
          label: L("Écrire un poème dans ta langue", "Write a poem in your language", "أكتب قصيدة بلغتي"),
          feedback: L(
            "Belle idée. Les mots et la poésie gardent une langue vivante, même quand le monde semble fermé.",
            "A beautiful idea. Words and poetry keep a language alive, even when the world feels closed.",
            "فكرة جميلة. الكلمات والشعر يُبقيان اللغة حيّة حتى حين يبدو العالم مغلقًا.",
          ),
        },
        {
          label: L("Rester silencieux·se pour éviter les ennuis", "Stay silent to avoid trouble", "أصمت لتجنّب المشاكل"),
          feedback: L(
            "C'est compréhensible : la peur est humaine. Mais avec le temps, parler — gentiment — peut aider à se sentir plus libre.",
            "That's understandable — fear is human. But with time, speaking up gently can help you feel freer.",
            "هذا مفهوم؛ الخوف شعور إنساني. لكن مع الوقت، الكلام بلطف قد يجعلك تشعر بحرية أكبر.",
          ),
        },
      ],
    },
    {
      prompt: L(
        "Un·e camarade se moque d'un mot en tamazight. Que fais-tu ?",
        "A classmate makes fun of a word in Tamazight. What do you do?",
        "زميل يسخر من كلمة بالأمازيغية. ماذا تفعل؟",
      ),
      choices: [
        {
          label: L("Lui expliquer ce que ce mot veut dire", "Explain what the word means", "أشرح له معنى الكلمة"),
          feedback: L(
            "Très bien. Expliquer avec calme transforme la moquerie en curiosité.",
            "Lovely. Explaining calmly turns mockery into curiosity.",
            "رائع. الشرح بهدوء يحوّل السخرية إلى فضول.",
          ),
        },
        {
          label: L("Lui apprendre un mot kabyle drôle", "Teach them a fun Kabyle word", "أعلّمه كلمة قبائلية ممتعة"),
          feedback: L(
            "Joli choix. Partager une langue par le jeu rapproche les enfants.",
            "Nice choice. Sharing a language through play brings children closer.",
            "اختيار جميل. تعلّم اللغة باللعب يقرّب الأطفال.",
          ),
        },
      ],
    },
    {
      prompt: L(
        "Tu écris une rédaction libre. Sur quoi parles-tu ?",
        "You write a free essay. What do you write about?",
        "تكتب موضوعًا حرًا. عن ماذا تكتب؟",
      ),
      choices: [
        {
          label: L("Une histoire racontée par ta grand-mère", "A story told by your grandmother", "قصة روتها لك جدّتك"),
          feedback: L(
            "Magnifique. Les histoires de famille sont la mémoire vivante d'un peuple.",
            "Beautiful. Family stories are the living memory of a people.",
            "رائع. حكايات العائلة هي ذاكرة الشعب الحيّة.",
          ),
        },
        {
          label: L("La poésie d'un village", "The poetry of a village", "شعر قرية صغيرة"),
          feedback: L(
            "Belle idée. Chaque village garde des trésors de mots à protéger.",
            "Lovely. Every village holds treasures of words to protect.",
            "فكرة جميلة. كل قرية تحوي كنوزًا من الكلمات.",
          ),
        },
      ],
    },
  ] as DecisionScenario[],
  connect: [
    L(
      "Aujourd'hui, le tamazight est une langue officielle, enseignée dans plusieurs écoles algériennes.",
      "Today, Tamazight is an official language, taught in many Algerian schools.",
      "اليوم، الأمازيغية لغة رسمية وتُدرَّس في العديد من المدارس الجزائرية.",
    ),
    L(
      "Yennayer, le Nouvel An amazigh, est désormais un jour férié national.",
      "Yennayer, the Amazigh New Year, is now a national public holiday.",
      "يَنّاير، رأس السنة الأمازيغية، أصبح عطلة وطنية.",
    ),
  ],
  quiz: [
    {
      q: L(
        "Pourquoi Tafsut Imazighen a-t-il commencé ?",
        "Why did Tafsut Imazighen begin?",
        "لماذا بدأ تافسوت إمازيغن؟",
      ),
      options: [
        L("Une conférence sur la poésie kabyle a été interdite", "A talk on Kabyle poetry was banned", "مُنعت محاضرة عن الشعر القبائلي"),
        L("Une finale de football", "A football final", "نهائي كرة قدم"),
        L("Un concert international", "An international concert", "حفل موسيقي دولي"),
      ],
      answerIndex: 0,
      explain: L(
        "L'interdiction d'une conférence de Mouloud Mammeri a déclenché les premières manifestations.",
        "The cancellation of Mouloud Mammeri's talk sparked the first protests.",
        "كان إلغاء محاضرة مولود معمري الشرارة الأولى للمظاهرات.",
      ),
    },
    {
      q: L(
        "Quelle région a été au cœur du mouvement ?",
        "Which region was at the heart of the movement?",
        "أي منطقة كانت قلب الحراك؟",
      ),
      options: [
        L("La Kabylie", "Kabylie", "منطقة القبائل"),
        L("Le Hoggar", "Hoggar", "الهقار"),
        L("Le Mzab", "Mzab", "ميزاب"),
      ],
      answerIndex: 0,
      explain: L(
        "La Kabylie a porté ce mouvement de reconnaissance culturelle.",
        "Kabylie led this movement for cultural recognition.",
        "قادت منطقة القبائل هذا الحراك من أجل الاعتراف الثقافي.",
      ),
    },
    {
      q: L(
        "En quelle année Tamazight devient-elle langue officielle ?",
        "In what year did Tamazight become an official language?",
        "في أي سنة أصبحت الأمازيغية لغة رسمية؟",
      ),
      options: [L("1980", "1980", "1980"), L("2002", "2002", "2002"), L("2016", "2016", "2016")],
      answerIndex: 2,
      explain: L(
        "En 2016, Tamazight a été reconnue comme langue officielle de l'Algérie.",
        "In 2016, Tamazight was recognised as an official language of Algeria.",
        "في 2016، تمّ الاعتراف بالأمازيغية لغةً رسمية للجزائر.",
      ),
    },
  ] as QuizQ[],
};

// ============================================================
// Topic data — Black Decade (1990s)
// ============================================================
const DECADE = {
  title: L("La Décennie Noire (années 1990)", "The Black Decade (1990s)", "العشرية السوداء (التسعينيات)"),
  year: "1990s",
  tagColor: "oklch(0.6 0.12 25)",
  story: L(
    "Au début des années 1990, l'Algérie traversait une période très difficile. Des élections ont été interrompues, et un long conflit a commencé entre l'État et certains groupes armés. Beaucoup de familles ont vécu dans la peur. Pourtant, à travers tout cela, des enseignants, des médecins, des artistes et des voisins ont continué à protéger les autres et à garder espoir.",
    "In the early 1990s, Algeria went through a very hard time. Elections were stopped, and a long conflict began between the state and some armed groups. Many families lived with fear. Yet through all of this, teachers, doctors, artists and neighbours kept protecting one another and holding on to hope.",
    "في بداية التسعينيات، عاشت الجزائر فترة صعبة جدًا. أُوقفت الانتخابات وبدأ نزاع طويل بين الدولة وبعض الجماعات المسلّحة. عاشت عائلات كثيرة في خوف. ومع ذلك، واصل المعلمون والأطباء والفنانون والجيران حماية بعضهم البعض والتمسّك بالأمل.",
  ),
  facts: [
    { icon: "🗳️", text: L("Le processus électoral a été interrompu", "The electoral process was interrupted", "تمّ إيقاف المسار الانتخابي") },
    { icon: "🏘️", text: L("Un conflit civil long et douloureux", "A long and painful civil conflict", "نزاع داخلي طويل ومؤلم") },
    { icon: "📰", text: L("Des journalistes et des enseignants ont été menacés", "Journalists and teachers were threatened", "تعرّض صحفيون ومعلمون لتهديدات") },
    { icon: "🤝", text: L("Beaucoup d'Algériens se sont entraidés", "Many Algerians helped one another", "تعاون كثير من الجزائريين فيما بينهم") },
  ],
  timeline: [
    { year: "1991", topic: "decade" as const, label: L("Élections interrompues", "Elections interrupted", "إيقاف الانتخابات") },
    { year: "1992", topic: "decade" as const, label: L("Début du conflit", "Conflict begins", "بداية النزاع") },
    { year: "1999", topic: "decade" as const, label: L("Concorde civile", "Civil concord", "الوئام المدني") },
    { year: "2005", topic: "decade" as const, label: L("Charte pour la paix", "Charter for peace", "ميثاق السلم") },
  ],
  lesson: L(
    "La paix est quelque chose que nous devons protéger.",
    "Peace is something we must protect.",
    "السلام أمانة علينا أن نحميها.",
  ),
  decisions: [
    {
      prompt: L(
        "Tu es enfant pendant ces années. Un·e ami·e à l'école est triste et a peur. Que fais-tu ?",
        "You are a child during these years. A friend at school is sad and afraid. What do you do?",
        "أنت طفل·ة في تلك السنوات. صديق·ة لك في المدرسة حزين وخائف. ماذا تفعل؟",
      ),
      choices: [
        {
          label: L("L'écouter sans juger", "Listen without judging", "أستمع إليه دون حكم"),
          feedback: L(
            "Très bien. Écouter avec gentillesse est l'un des plus grands cadeaux qu'on peut offrir.",
            "Wonderful. Listening with kindness is one of the greatest gifts we can give.",
            "رائع. الإنصات بلطف من أعظم الهدايا التي نستطيع تقديمها.",
          ),
        },
        {
          label: L("En parler à un adulte de confiance", "Tell a trusted adult", "أُخبر شخصًا بالغًا أثق به"),
          feedback: L(
            "C'est sage. Quand quelque chose pèse trop lourd, demander de l'aide est une vraie force.",
            "Wise choice. When something feels too heavy, asking for help is real strength.",
            "خيار حكيم. حين يصبح الشيء ثقيلًا، طلب المساعدة قوّة حقيقية.",
          ),
        },
        {
          label: L("Lui dessiner quelque chose de joli", "Draw something kind for them", "أرسم له شيئًا جميلًا"),
          feedback: L(
            "Magnifique. Les petits gestes de douceur aident à reconstruire la confiance et la paix.",
            "Beautiful. Small gentle gestures help rebuild trust and peace.",
            "جميل. اللفتات اللطيفة الصغيرة تُعيد بناء الثقة والسلام.",
          ),
        },
      ],
    },
    {
      prompt: L(
        "Un voisin a perdu un proche. Comment montrer ton soutien ?",
        "A neighbour has lost a loved one. How do you show support?",
        "جار فقد عزيزًا عليه. كيف تُظهر دعمك؟",
      ),
      choices: [
        {
          label: L("Lui apporter un petit plat avec ta famille", "Bring a small dish with your family", "أُحضر معه طبقًا صغيرًا مع عائلتي"),
          feedback: L(
            "Geste précieux. Partager un repas, c'est dire « tu n'es pas seul ».",
            "A precious gesture. Sharing a meal says “you are not alone.”",
            "لفتة ثمينة. مشاركة الطعام تقول «لست وحدك».",
          ),
        },
        {
          label: L("Lui écrire un petit mot gentil", "Write them a kind note", "أكتب له كلمة لطيفة"),
          feedback: L(
            "Les mots doux laissent des traces qui durent longtemps.",
            "Kind words leave traces that last a long time.",
            "الكلمات اللطيفة تترك أثرًا يدوم طويلًا.",
          ),
        },
      ],
    },
    {
      prompt: L(
        "À l'école, un débat tourne mal. Que choisis-tu ?",
        "At school, a debate gets heated. What do you choose?",
        "في المدرسة، يحتدم نقاش. ماذا تختار؟",
      ),
      choices: [
        {
          label: L("Demander à chacun de parler à son tour", "Ask everyone to speak in turn", "أطلب أن يتحدّث كلٌّ بدوره"),
          feedback: L(
            "Très bien. Donner la parole à chacun, c'est déjà construire la paix.",
            "Wonderful. Giving each person a turn is already building peace.",
            "رائع. إعطاء الجميع الكلمة هو بداية بناء السلام.",
          ),
        },
        {
          label: L("Proposer une pause et un verre d'eau", "Suggest a break and a glass of water", "أقترح استراحة وكأس ماء"),
          feedback: L(
            "Sage. Le calme aide à mieux se comprendre.",
            "Wise. Calm helps us understand each other better.",
            "حكيم. الهدوء يُساعد على الفهم.",
          ),
        },
      ],
    },
  ] as DecisionScenario[],
  connect: [
    L(
      "Aujourd'hui, l'Algérie cultive la paix civile et la mémoire des familles touchées.",
      "Today, Algeria nurtures civil peace and the memory of the families affected.",
      "اليوم، تحرص الجزائر على السلم المدني وذاكرة العائلات المتأثرة.",
    ),
    L(
      "Cette histoire nous rappelle qu'écouter et respecter les autres protège la société.",
      "This history reminds us that listening to and respecting others protects society.",
      "هذا التاريخ يُذكّرنا بأن الإصغاء والاحترام يحميان المجتمع.",
    ),
  ],
  remember: L(
    "Beaucoup de familles ont été touchées. Se souvenir, avec douceur, aide à protéger la paix d'aujourd'hui et de demain.",
    "Many families were affected. Remembering, gently, helps protect the peace of today and tomorrow.",
    "تأثّرت عائلات كثيرة. التذكّر بلطف يساعد على حماية سلام اليوم والغد.",
  ),
  quiz: [
    {
      q: L(
        "Comment a commencé cette période difficile ?",
        "How did this difficult period begin?",
        "كيف بدأت هذه الفترة الصعبة؟",
      ),
      options: [
        L("Le processus électoral a été interrompu", "The electoral process was interrupted", "أُوقف المسار الانتخابي"),
        L("Un grand festival a été annulé", "A big festival was cancelled", "أُلغي مهرجان كبير"),
        L("Une frontière a été déplacée", "A border was moved", "تمّ تغيير حدود"),
      ],
      answerIndex: 0,
      explain: L(
        "L'interruption du processus électoral en 1992 a marqué le début du conflit.",
        "The interruption of the electoral process in 1992 marked the start of the conflict.",
        "كان إيقاف المسار الانتخابي سنة 1992 بداية النزاع.",
      ),
    },
    {
      q: L(
        "Quelle leçon importante en garder ?",
        "What important lesson can we keep?",
        "ما الدرس المهم الذي نحتفظ به؟",
      ),
      options: [
        L("La paix doit être protégée chaque jour", "Peace must be protected every day", "السلام يجب أن نحميه كل يوم"),
        L("Il faut oublier le passé", "We must forget the past", "يجب نسيان الماضي"),
        L("Il faut éviter de parler aux voisins", "We should avoid talking to neighbours", "يجب تجنّب الحديث مع الجيران"),
      ],
      answerIndex: 0,
      explain: L(
        "Se souvenir, avec respect, aide à construire une société plus paisible.",
        "Remembering, with respect, helps build a more peaceful society.",
        "التذكّر باحترام يُساعد على بناء مجتمع أكثر سلامًا.",
      ),
    },
    {
      q: L(
        "Que peut-on faire pour aider la paix autour de nous ?",
        "What can we do to help peace around us?",
        "ماذا يمكننا أن نفعل لنُساعد السلام حولنا؟",
      ),
      options: [
        L("Être gentil, écouter, respecter les différences", "Be kind, listen, respect differences", "أن نكون لطفاء، نُصغي، ونحترم الاختلاف"),
        L("Crier plus fort que les autres", "Shout louder than others", "نصرخ أعلى من الآخرين"),
        L("Refuser de parler", "Refuse to speak", "نرفض الكلام"),
      ],
      answerIndex: 0,
      explain: L(
        "La paix grandit grâce à la gentillesse et au respect, chaque jour.",
        "Peace grows through kindness and respect, every day.",
        "ينمو السلام بالطف والاحترام، كل يوم.",
      ),
    },
  ] as QuizQ[],
};

// ============================================================
// Page
// ============================================================
function MomentsPage() {
  const lang = useLang();
  const [earned, setEarned] = useState<Set<string>>(new Set());

  const grant = (id: string) =>
    setEarned((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });

  const badges: Badge[] = useMemo(
    () => [
      {
        id: "courage",
        emoji: "🌿",
        name: L("Courage", "Courage", "شجاعة"),
        hint: L(
          "Apprendre l'histoire de Tafsut Imazighen et oser parler avec respect.",
          "Learn about Tafsut Imazighen and dare to speak with respect.",
          "تعلّم تافسوت إمازيغن والجرأة على الكلام باحترام.",
        ),
      },
      {
        id: "peace",
        emoji: "🕊️",
        name: L("Paix", "Peace", "سلام"),
        hint: L(
          "Comprendre la Décennie Noire et choisir la douceur autour de soi.",
          "Understand the Black Decade and choose kindness around you.",
          "فهم العشرية السوداء واختيار اللطف حولك.",
        ),
      },
      {
        id: "knowledge",
        emoji: "🧠",
        name: L("Savoir", "Knowledge", "معرفة"),
        hint: L(
          "Réussir un quiz parfaitement et garder la curiosité vivante.",
          "Score perfectly on a quiz and keep curiosity alive.",
          "نتيجة كاملة في اختبار، والحفاظ على الفضول حيًّا.",
        ),
      },
    ],
    [],
  );

  const sharedTimeline: TimelineNode[] = useMemo(
    () => [
      ...TAFSUT.timeline,
      ...DECADE.timeline,
    ].sort((a, b) => parseInt(a.year) - parseInt(b.year)),
    [],
  );

  const regions: MapRegion[] = useMemo(
    () => [
      {
        id: "kabylie",
        name: L("Kabylie", "Kabylie", "القبائل"),
        cx: 62.5,
        cy: 11,
        r: 3,
        description: L(
          "Région montagneuse au nord, cœur du mouvement amazigh et terre de poètes.",
          "A mountainous northern region, heart of the Amazigh movement and a land of poets.",
          "منطقة جبلية في الشمال، قلب الحراك الأمازيغي وأرض الشعراء.",
        ),
        events: [
          L("Tafsut Imazighen (1980)", "Tafsut Imazighen (1980)", "تافسوت إمازيغن (1980)"),
          L("Printemps noir (2001)", "Black Spring (2001)", "الربيع الأسود (2001)"),
        ],
        figures: [
          L("Mouloud Mammeri", "Mouloud Mammeri", "مولود معمري"),
          L("Lounès Matoub", "Lounès Matoub", "لونيس معطوب"),
        ],
      },
      {
        id: "alger",
        name: L("Alger", "Algiers", "الجزائر"),
        cx: 53,
        cy: 9.5,
        r: 3,
        description: L(
          "La capitale, lieu de décisions politiques majeures et de rassemblements historiques.",
          "The capital, where major political decisions and historic gatherings take place.",
          "العاصمة، مركز القرارات السياسية الكبرى والتجمعات التاريخية.",
        ),
        events: [
          L("Élections interrompues (1991)", "Elections interrupted (1991)", "إيقاف الانتخابات (1991)"),
          L("Concorde civile (1999)", "Civil concord (1999)", "الوئام المدني (1999)"),
        ],
        figures: [
          L("Mouloud Mammeri", "Mouloud Mammeri", "مولود معمري"),
        ],
      },
      {
        id: "aures",
        name: L("Aurès", "Aurès", "الأوراس"),
        cx: 73,
        cy: 18.5,
        r: 3,
        description: L(
          "Massif montagneux au sud-est, terre de résistance et de traditions amazighes chaouies.",
          "A southeastern mountain range, a land of resistance and Chaoui Amazigh traditions.",
          "سلسلة جبلية في الجنوب الشرقي، أرض المقاومة والتقاليد الشاوية الأمازيغية.",
        ),
        events: [
          L("Foyer historique du patrimoine chaoui", "Historic heart of the Chaoui heritage", "موطن تاريخي للتراث الشاوي"),
        ],
        figures: [L("Mostefa Ben Boulaïd", "Mostefa Ben Boulaïd", "مصطفى بن بولعيد")],
      },
      {
        id: "constantine",
        name: L("Constantine", "Constantine", "قسنطينة"),
        cx: 73.5,
        cy: 14.5,
        r: 3,
        description: L(
          "Ville des ponts et du savoir, importante pour l'éducation et la culture algérienne.",
          "City of bridges and learning, central to Algerian education and culture.",
          "مدينة الجسور والعلم، ذات أهمية في التعليم والثقافة الجزائرية.",
        ),
        events: [
          L("Centre culturel et universitaire majeur", "A major cultural and university hub", "مركز ثقافي وجامعي كبير"),
        ],
        figures: [L("Malek Bennabi", "Malek Bennabi", "مالك بن نبي")],
      },
    ],
    [],
  );

  const dailyFacts3: L3[] = useMemo(
    () => [
      L(
        "Yennayer, le Nouvel An amazigh, est célébré chaque 12 janvier en Algérie.",
        "Yennayer, the Amazigh New Year, is celebrated every 12 January in Algeria.",
        "يَنّاير، رأس السنة الأمازيغية، يُحتفل به كل 12 جانفي في الجزائر.",
      ),
      L(
        "L'alphabet tifinagh est l'un des plus anciens systèmes d'écriture d'Afrique du Nord.",
        "The Tifinagh alphabet is one of the oldest writing systems in North Africa.",
        "الأبجدية التيفيناغ من أقدم أنظمة الكتابة في شمال إفريقيا.",
      ),
      L(
        "La Concorde civile de 1999 a marqué un grand pas vers la paix en Algérie.",
        "The 1999 Civil Concord marked a major step toward peace in Algeria.",
        "ميثاق الوئام المدني سنة 1999 كان خطوة كبيرة نحو السلام.",
      ),
      L(
        "Mouloud Mammeri a recueilli des poèmes kabyles pour les protéger de l'oubli.",
        "Mouloud Mammeri collected Kabyle poems to save them from being forgotten.",
        "جمع مولود معمري قصائد قبائلية لحمايتها من النسيان.",
      ),
    ],
    [],
  );

  const dailyQs: DailyQuestion[] = useMemo(
    () => [
      {
        q: L(
          "Quelle langue est devenue officielle en Algérie en 2016 ?",
          "Which language became official in Algeria in 2016?",
          "ما هي اللغة التي أصبحت رسمية في الجزائر عام 2016؟",
        ),
        options: [L("Tamazight", "Tamazight", "الأمازيغية"), L("Latin", "Latin", "اللاتينية"), L("Italien", "Italian", "الإيطالية")],
        answerIndex: 0,
      },
      {
        q: L(
          "En quelle décennie l'Algérie a-t-elle vécu la « Décennie Noire » ?",
          "In which decade did Algeria experience the “Black Decade”?",
          "في أي عقد عاشت الجزائر «العشرية السوداء»؟",
        ),
        options: [L("Années 1970", "1970s", "السبعينيات"), L("Années 1990", "1990s", "التسعينيات"), L("Années 2010", "2010s", "العشرية الثانية من الألفية")],
        answerIndex: 1,
      },
      {
        q: L(
          "Que demandait le mouvement Tafsut Imazighen ?",
          "What did the Tafsut Imazighen movement ask for?",
          "ماذا طالب به حراك تافسوت إمازيغن؟",
        ),
        options: [
          L("La reconnaissance de la culture amazighe", "Recognition of the Amazigh culture", "الاعتراف بالثقافة الأمازيغية"),
          L("Une nouvelle monnaie", "A new currency", "عملة جديدة"),
          L("Un nouveau drapeau", "A new flag", "علم جديد"),
        ],
        answerIndex: 0,
      },
    ],
    [],
  );

  const isAr = lang === "ar";

  return (
    <div className="min-h-screen" dir={isAr ? "rtl" : "ltr"}>
      <Header />
      <HeroSection lang={lang} />

      <main className="max-w-4xl mx-auto px-4 pb-20">
        {/* Daily card — retention */}
        <MuseumReveal className="mt-2 sm:mt-4">
          <DailyCard facts={dailyFacts3} questions={dailyQs} lang={lang} />
        </MuseumReveal>

        {/* Shared interactive timeline */}
        <MuseumReveal className="mt-6">
          <TimelineSection nodes={sharedTimeline} lang={lang} />
        </MuseumReveal>

        {/* Map mode */}
        <MuseumReveal className="mt-6">
          <MapSection regions={regions} lang={lang} />
        </MuseumReveal>

        <SectionDivider />

        {/* ---------- TAFSUT IMAZIGHEN ---------- */}
        <section aria-labelledby="tafsut-title" className="space-y-5">
          <MuseumReveal>
            <div className="text-center">
              <Eyebrow>1980 · Tafsut Imazighen</Eyebrow>
              <h2
                id="tafsut-title"
                className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight"
              >
                {tr(TAFSUT.title, lang)}
              </h2>
            </div>
          </MuseumReveal>

          <GuideBubble
            text={L(
              "Prenons un instant pour comprendre ce qui s'est passé en 1980…",
              "Let's take a moment to understand what happened in 1980…",
              "لنأخذ لحظة لفهم ما حدث في 1980…",
            )}
            lang={lang}
          />

          <MuseumReveal>
            <StoryFlow
              scenes={TAFSUT_SCENES}
              accent={TAFSUT.tagColor}
              title={UI.storyMode}
            />
          </MuseumReveal>

          <MuseumReveal>
            <MuseumCard>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl" aria-hidden>
                  🪶
                </span>
                <h3 className="text-lg sm:text-xl font-bold">{tr(UI.whatHappened, lang)}</h3>
              </div>
              <FactsGrid items={TAFSUT.facts} lang={lang} />
            </MuseumCard>
          </MuseumReveal>

          <MuseumReveal>
            <MuseumCard>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl" aria-hidden>
                  🌅
                </span>
                <h3 className="text-lg sm:text-xl font-bold">{tr(UI.aftermath, lang)}</h3>
              </div>
              <ol className="relative border-s-2 border-secondary/30 ms-2 ps-5 space-y-4">
                {TAFSUT.timeline.map((n) => (
                  <li key={n.year} className="relative">
                    <span className="absolute -start-[27px] top-1 w-3 h-3 rounded-full bg-secondary" />
                    <div className="text-sm font-bold text-secondary">{n.year}</div>
                    <div className="text-foreground/85">{tr(n.label, lang)}</div>
                  </li>
                ))}
              </ol>
            </MuseumCard>
          </MuseumReveal>

          <MuseumReveal>
            <LessonCard text={TAFSUT.lesson} accent="var(--secondary)" lang={lang} />
          </MuseumReveal>

          <MuseumReveal>
            <DecisionGame scenarios={TAFSUT.decisions} lang={lang} />
          </MuseumReveal>

          <MuseumReveal>
            <ReflectionCard points={TAFSUT.connect} accent="var(--secondary)" lang={lang} />
          </MuseumReveal>

          <MuseumReveal>
            <QuizSection
              title={UI.quizTitle}
              questions={TAFSUT.quiz}
              lang={lang}
              onPerfect={() => {
                grant("courage");
                grant("knowledge");
              }}
            />
          </MuseumReveal>
        </section>

        <SectionDivider />

        {/* ---------- BLACK DECADE ---------- */}
        <section aria-labelledby="decade-title" className="space-y-5">
          <MuseumReveal>
            <div className="text-center">
              <Eyebrow>1990s · {tr(L("Mémoire", "Memory", "ذاكرة"), lang)}</Eyebrow>
              <h2
                id="decade-title"
                className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight"
              >
                {tr(DECADE.title, lang)}
              </h2>
            </div>
          </MuseumReveal>

          <GuideBubble
            text={L(
              "Cette page parle d'une période sensible. Nous l'abordons avec douceur et respect.",
              "This section covers a sensitive time. We approach it with care and respect.",
              "هذه الفقرة تتحدّث عن فترة حسّاسة. نقاربها برفق واحترام.",
            )}
            lang={lang}
          />

          <MuseumReveal>
            <StoryFlow
              scenes={DECADE_SCENES}
              accent={DECADE.tagColor}
              title={UI.storyMode}
            />
          </MuseumReveal>

          <MuseumReveal>
            <MuseumCard>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl" aria-hidden>
                  🕯️
                </span>
                <h3 className="text-lg sm:text-xl font-bold">{tr(UI.whatHappened, lang)}</h3>
              </div>
              <FactsGrid items={DECADE.facts} lang={lang} />
            </MuseumCard>
          </MuseumReveal>

          <MuseumReveal>
            <WeRememberCard text={DECADE.remember} lang={lang} />
          </MuseumReveal>

          <MuseumReveal>
            <MuseumCard>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl" aria-hidden>
                  🕊️
                </span>
                <h3 className="text-lg sm:text-xl font-bold">{tr(UI.aftermath, lang)}</h3>
              </div>
              <p className="text-foreground/85 leading-relaxed">
                {tr(
                  L(
                    "Après ces années difficiles, l'Algérie a cherché à guérir : se souvenir avec respect, écouter les familles touchées, et protéger la paix pour que cela ne se reproduise pas. Apprendre cette histoire, avec douceur, fait partie de cette guérison.",
                    "After these hard years, Algeria sought to heal: to remember with respect, to listen to the families affected, and to protect peace so it never happens again. Learning this history, gently, is part of that healing.",
                    "بعد تلك السنوات الصعبة، سعت الجزائر إلى التعافي: التذكّر باحترام، والإنصات للعائلات المتأثرة، وحماية السلام كي لا يتكرّر ما حدث. تعلّم هذا التاريخ بلطف جزء من هذا التعافي.",
                  ),
                  lang,
                )}
              </p>
            </MuseumCard>
          </MuseumReveal>

          <MuseumReveal>
            <LessonCard text={DECADE.lesson} accent="oklch(0.6 0.12 25)" lang={lang} />
          </MuseumReveal>

          <MuseumReveal>
            <DecisionGame scenarios={DECADE.decisions} lang={lang} />
          </MuseumReveal>

          <MuseumReveal>
            <ReflectionCard points={DECADE.connect} accent="oklch(0.6 0.12 25)" lang={lang} />
          </MuseumReveal>

          <MuseumReveal>
            <QuizSection
              title={UI.quizTitle}
              questions={DECADE.quiz}
              lang={lang}
              onPerfect={() => {
                grant("peace");
                grant("knowledge");
              }}
            />
          </MuseumReveal>
        </section>

        <SectionDivider />

        {/* ---------- EDUCATION & IDENTITY ---------- */}
        <section aria-labelledby="education-title" className="space-y-5">
          <MuseumReveal>
            <div className="text-center">
              <Eyebrow>{tr(L("Idées · Transmission", "Ideas · Transmission", "أفكار · نقل"), lang)}</Eyebrow>
              <h2
                id="education-title"
                className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight"
              >
                {tr(L("Éducation & Identité", "Education & Identity", "التعليم والهوية"), lang)}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {tr(
                  L(
                    "Comment l'identité algérienne s'est préservée et renforcée à travers l'éducation, la langue et la transmission.",
                    "How Algerian identity was preserved and strengthened through education, language, and cultural transmission.",
                    "كيف صانت اللغةُ والتعليمُ ونقلُ الثقافة الهويةَ الجزائرية وقوّتها.",
                  ),
                  lang,
                )}
              </p>
            </div>
          </MuseumReveal>

          <GuideBubble
            text={L(
              "Ce récit n'est pas une histoire de guerre — c'est une histoire d'idées, d'apprentissage et d'identité.",
              "This is not a war story — it is a story of ideas, learning, and identity.",
              "هذه ليست قصة حرب — بل قصة أفكار وتعلّم وهوية.",
            )}
            lang={lang}
          />

          <MuseumReveal>
            <StoryFlow
              scenes={EDUCATION_SCENES}
              accent="var(--primary)"
              title={UI.storyMode}
            />
          </MuseumReveal>

          <MuseumReveal>
            <div className="flex justify-center">
              <Link
                to="/figures/$figureId"
                params={{ figureId: "ben-badis" }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold shadow-sm hover:opacity-90 transition"
              >
                <span aria-hidden>👤</span>
                {tr(
                  L(
                    "Découvrir le profil de Ben Badis",
                    "Discover Ben Badis's profile",
                    "اكتشف صفحة بن باديس",
                  ),
                  lang,
                )}
                <span aria-hidden>{lang === "ar" ? "←" : "→"}</span>
              </Link>
            </div>
          </MuseumReveal>
        </section>

        <SectionDivider />

        {/* Badges */}
        <MuseumReveal>
          <BadgeDisplay badges={badges} earned={earned} lang={lang} />
        </MuseumReveal>

        <div className="text-center mt-10">
          <AmazighSymbol size={36} glow={false} className="opacity-60 mx-auto" />
          <p className="mt-3 text-xs text-muted-foreground">
            {tr(
              L(
                "Avec respect pour la mémoire de l'Algérie.",
                "With respect for Algeria's memory.",
                "احترامًا لذاكرة الجزائر.",
              ),
              lang,
            )}
          </p>
        </div>
      </main>
    </div>
  );
}
