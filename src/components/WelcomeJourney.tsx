import { useEffect, useMemo, useRef, useState } from "react";
import { type Lang, useLang } from "@/lib/i18n";

const INTRO_KEY = "algeria-through-time-welcome-seen-v1";

const CREATOR_NARRATIVE: Record<Lang, { name: string; text: string }> = {
  fr: {
    name: "Dalila Fridi",
    text: "J’aime l’histoire… mais surtout les histoires qui nous relient.\n\nJ’ai grandi dans une famille où la liberté n’était pas un mot… mais une mémoire vivante.\nUne mémoire transmise à voix basse, dans les récits de ma mère et de mes grand-mères.\n\nElles ne racontaient pas seulement le passé…\nelles nous rappelaient qui nous sommes.\n\nJ’ai traversé des moments qui ont marqué notre histoire — Tafsut Imazighen en 1980, les événements de 1988 — et j’ai appris que l’identité se vit, se protège… et se transmet.\n\nOn m’a appris une chose essentielle : ne jamais oublier d’où nous venons.\n\nAlors j’ai voulu créer cet espace…\nun lieu pour explorer, comprendre, et ressentir l’Algérie autrement —\npour que les enfants d’ici et d’ailleurs puissent retrouver ce fil invisible qui les relie à leur histoire. 🇩🇿\n\n💻 Retraitée de l’IT… mais jamais de la curiosité\n🎛️ Toujours en train d’explorer et de créer\n📚 Toujours guidée par l’envie de comprendre ce qui vient après\n\n✨ « Chaque histoire compte… surtout la nôtre. »",
  },
  en: {
    name: "Dalila Fridi",
    text: "I love history… but even more, I love the stories that connect us.\n\nI grew up in a family where freedom was not just a word… but a living memory.\nA memory passed down quietly through the voices of my mother and grandmothers.\n\nThey didn’t just tell stories of the past…\nthey reminded us of who we are.\n\nI lived through moments that shaped our history — the 1980 Berber Spring and the 1988 uprising — and I learned that identity is something we live, protect… and pass on.\n\nI was taught one essential truth: never forget where we come from.\n\nSo I created this space…\na place to explore, understand, and feel Algeria differently —\nso that children here and across the diaspora can reconnect with that invisible thread that ties them to their roots. 🇩🇿\n\n💻 Retired from IT… but never from curiosity\n🎛️ Still exploring, still building, still creating\n📚 Always drawn to what comes next\n\n✨ “Every story matters… especially ours.”",
  },
  ar: {
    name: "دليلة فريدي",
    text: "أحب التاريخ… لكنني أحب أكثر القصص التي تربطنا ببعضنا البعض.\n\nنشأت في عائلة لم تكن الحرية فيها مجرد كلمة… بل ذاكرة حية.\nذاكرة تُروى بهدوء في حكايات أمي وجدّاتي.\n\nلم تكن تلك الحكايات عن الماضي فقط…\nبل كانت تذكرنا بمن نكون.\n\nعشت محطات شكّلت تاريخنا — الربيع الأمازيغي عام 1980 وأحداث 1988 — وتعلمت أن الهوية تُعاش، وتُحمى… وتُورث.\n\nتعلمت حقيقة بسيطة وعميقة: لا تنسَ أبدًا من أين أتيت.\n\nلهذا أنشأت هذا الفضاء…\nمكانًا لاكتشاف الجزائر بشكل مختلف —\nللفهم، للشعور، ولربط الأجيال بذلك الخيط الخفي الذي يصلهم بجذورهم. 🇩🇿\n\n💻 متقاعدة من مجال التكنولوجيا… لكن الفضول لا يتوقف\n🎛️ ما زلت أستكشف وأبتكر\n📚 وما زلت أنجذب لما هو قادم\n\n✨ \"كل قصة مهمة… وخاصة قصتنا.\"",
  },
};

const ACTIONS = {
  start: { en: "Start Your Journey", fr: "Commencer le voyage", ar: "ابدأ الرحلة" },
  skip: { en: "Skip", fr: "Passer", ar: "تخطي" },
  audio: { en: "Ambient sound", fr: "Ambiance sonore", ar: "صوت هادئ" },
};

type AmbientAudio = {
  context: AudioContext;
  gain: GainNode;
  oscillators: OscillatorNode[];
};

type AudioWindow = Window & typeof globalThis & { webkitAudioContext?: typeof AudioContext };

export function WelcomeJourney() {
  const lang = useLang();
  const [visible, setVisible] = useState(false);
  const [audioOn, setAudioOn] = useState(false);
  const audioRef = useRef<AmbientAudio | null>(null);
  const content = CREATOR_NARRATIVE[lang];
  const isArabic = lang === "ar";

  const [opening, body] = useMemo(() => {
    const [first, ...rest] = content.text.split("\n\n");
    return [first, rest.join("\n\n")];
  }, [content.text]);

  useEffect(() => {
    try {
      setVisible(localStorage.getItem(INTRO_KEY) !== "seen");
    } catch {
      setVisible(true);
    }
  }, []);

  useEffect(() => () => stopAudio(), []);

  const stopAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const now = audio.context.currentTime;
    audio.gain.gain.cancelScheduledValues(now);
    audio.gain.gain.linearRampToValueAtTime(0, now + 0.45);
    window.setTimeout(() => {
      audio.oscillators.forEach((oscillator) => oscillator.stop());
      void audio.context.close();
      audioRef.current = null;
    }, 520);
    setAudioOn(false);
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      stopAudio();
      return;
    }

    const AudioContextClass = window.AudioContext ?? (window as AudioWindow).webkitAudioContext;
    if (!AudioContextClass) return;
    const context = new AudioContextClass();
    const gain = context.createGain();
    gain.gain.value = 0;
    gain.connect(context.destination);

    const tones = [146.83, 220].map((frequency) => {
      const oscillator = context.createOscillator();
      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      oscillator.connect(gain);
      oscillator.start();
      return oscillator;
    });

    gain.gain.linearRampToValueAtTime(0.025, context.currentTime + 1.1);
    audioRef.current = { context, gain, oscillators: tones };
    setAudioOn(true);
  };

  const dismiss = () => {
    try {
      localStorage.setItem(INTRO_KEY, "seen");
    } catch {
      /* noop */
    }
    stopAudio();
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto px-4 py-6 sm:px-6 sm:py-10"
      dir={isArabic ? "rtl" : "ltr"}
      style={{ background: "var(--intro-background)", backgroundImage: "var(--intro-texture)" }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-title"
    >
      <div className="mx-auto flex min-h-full w-full max-w-3xl flex-col justify-between gap-8 text-foreground">
        <header className="flex items-center justify-between gap-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          <span>Algeria Through Time</span>
          <span aria-hidden className="text-base text-primary/70">ⵣ</span>
        </header>

        <main className="animate-fade-in py-4 sm:py-8">
          <p className="mb-4 text-sm font-semibold text-primary">{content.name}</p>
          <h1 id="welcome-title" className="max-w-2xl text-3xl font-semibold leading-tight sm:text-5xl">
            {opening}
          </h1>
          <div className="mt-8 whitespace-pre-line text-base leading-8 text-foreground/85 sm:text-lg sm:leading-9">
            {body}
          </div>
        </main>

        <footer className="sticky bottom-0 -mx-4 bg-[linear-gradient(to_top,var(--intro-background)_72%,transparent)] px-4 pb-4 pt-8 sm:static sm:bg-none sm:p-0">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={toggleAudio}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-lg text-foreground shadow-sm transition hover:border-primary/50 hover:bg-muted"
              aria-label={ACTIONS.audio[lang]}
              aria-pressed={audioOn}
              title={ACTIONS.audio[lang]}
            >
              🎧
            </button>
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={dismiss}
                className="rounded-full px-5 py-3 text-sm font-semibold text-muted-foreground transition hover:text-foreground"
              >
                {ACTIONS.skip[lang]}
              </button>
              <button
                type="button"
                onClick={dismiss}
                className="rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-sm transition hover:opacity-90 active:scale-95"
              >
                {ACTIONS.start[lang]}
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}