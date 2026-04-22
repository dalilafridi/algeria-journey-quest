import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { LessonCard } from "@/components/LessonCard";
import { ExplainToggle } from "@/components/ExplainToggle";
import { lessons } from "@/data/lessons";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/lessons")({
  head: () => ({
    meta: [
      { title: "1-Minute Lessons — Algeria Through Time" },
      {
        name: "description",
        content: "Quick, focused lessons on Algerian history — read a topic in about a minute.",
      },
    ],
  }),
  component: LessonsPage,
});

const COPY = {
  title: { en: "1-Minute Lessons", fr: "Leçons en 1 minute", ar: "دروس في دقيقة" },
  subtitle: {
    en: "Short, clear lessons on key moments and figures of Algerian history.",
    fr: "Des leçons courtes et claires sur les moments et figures clés de l'histoire algérienne.",
    ar: "دروس قصيرة وواضحة حول لحظات وشخصيات بارزة في تاريخ الجزائر.",
  },
} as const;

function LessonsPage() {
  const lang = useLang();
  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-8 safe-pb">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold">{COPY.title[lang]}</h1>
            <p className="text-muted-foreground mt-1 text-sm sm:text-base">{COPY.subtitle[lang]}</p>
          </div>
          <ExplainToggle />
        </div>

        <div className="mt-6 grid gap-4">
          {lessons.map((l) => (
            <LessonCard key={l.id} lesson={l} />
          ))}
        </div>
      </main>
    </div>
  );
}
