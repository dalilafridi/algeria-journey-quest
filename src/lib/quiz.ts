import type { Era, QuizQuestion } from "@/data/eras";
import { t, tu, type Lang } from "@/lib/i18n";

export function shuffle<T>(arr: readonly T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export type Difficulty = "easy" | "medium" | "hard";

function diffOf(q: QuizQuestion): Difficulty {
  return q.difficulty ?? "medium";
}

/**
 * Pick 5–7 questions from a pool, balanced across question types AND difficulty
 * (easy / medium / hard) when the pool is rich enough.
 */
export function pickQuizQuestions(pool: QuizQuestion[]): QuizQuestion[] {
  const min = 5;
  const max = 7;
  const target = Math.min(pool.length, min + Math.floor(Math.random() * (max - min + 1)));

  const byType: Record<QuizQuestion["type"], QuizQuestion[]> = {
    mcq: [],
    truefalse: [],
    whoami: [],
    order: [],
    image: [],
  };
  for (const q of pool) byType[q.type].push(q);
  for (const k of Object.keys(byType) as QuizQuestion["type"][]) {
    byType[k] = shuffle(byType[k]);
  }

  const picked: QuizQuestion[] = [];
  const seen = new Set<QuizQuestion>();

  // Guarantee at least one of each core type when possible.
  for (const t of ["mcq", "truefalse", "whoami"] as const) {
    const q = byType[t].shift();
    if (q && picked.length < target) {
      picked.push(q);
      seen.add(q);
    }
  }

  // Try to ensure at least one of each difficulty (easy/medium/hard) when available.
  const remainingByDiff: Record<Difficulty, QuizQuestion[]> = {
    easy: shuffle(pool.filter((q) => !seen.has(q) && diffOf(q) === "easy")),
    medium: shuffle(pool.filter((q) => !seen.has(q) && diffOf(q) === "medium")),
    hard: shuffle(pool.filter((q) => !seen.has(q) && diffOf(q) === "hard")),
  };
  const haveDiffs = new Set(picked.map(diffOf));
  for (const d of ["easy", "medium", "hard"] as const) {
    if (haveDiffs.has(d)) continue;
    const q = remainingByDiff[d].shift();
    if (q && picked.length < target) {
      picked.push(q);
      seen.add(q);
      haveDiffs.add(d);
    }
  }

  // Fill remaining slots from a shuffled pool of everything else.
  const rest = shuffle(pool.filter((q) => !seen.has(q)));
  for (const q of rest) {
    if (picked.length >= target) break;
    picked.push(q);
  }

  return shuffle(picked);
}

/** Check whether the user's answer is correct for any question type. */
export function isAnswerCorrect(q: QuizQuestion, answer: unknown): boolean {
  switch (q.type) {
    case "mcq":
    case "whoami":
    case "image":
      return answer === q.answerIndex;
    case "truefalse":
      return answer === q.answer;
    case "order": {
      if (!Array.isArray(answer)) return false;
      // Compare by item id (stable across languages).
      const correct = q.items.map((it) => it.id);
      if (answer.length !== correct.length) return false;
      return answer.every((v, i) => v === correct[i]);
    }
  }
}

/** Localized description of the correct answer. */
export function describeCorrectAnswer(q: QuizQuestion, lang: Lang): string {
  switch (q.type) {
    case "mcq":
    case "whoami":
    case "image":
      return t(q.options[q.answerIndex], lang) ?? "—";
    case "truefalse":
      return q.answer ? tu("trueShort", lang) : tu("falseShort", lang);
    case "order":
      return q.items.map((it) => t(it.label, lang)).join(" → ");
  }
}

/** Localized description of the user's answer. */
export function describeUserAnswer(q: QuizQuestion, answer: unknown, lang: Lang): string {
  if (answer === null || answer === undefined) return tu("noAnswer", lang);
  switch (q.type) {
    case "mcq":
    case "whoami":
    case "image":
      return typeof answer === "number" ? (t(q.options[answer], lang) ?? "—") : "—";
    case "truefalse":
      return answer === true
        ? tu("trueShort", lang)
        : answer === false
          ? tu("falseShort", lang)
          : "—";
    case "order":
      if (!Array.isArray(answer)) return "—";
      // answer is an array of item ids
      return (answer as string[])
        .map((id) => {
          const it = q.items.find((x) => x.id === id);
          return it ? t(it.label, lang) : id;
        })
        .join(" → ");
  }
}

/** Get the question prompt text in a uniform way (localized). */
export function getPrompt(q: QuizQuestion, lang: Lang): string {
  switch (q.type) {
    case "mcq":
    case "image":
      return t(q.question, lang);
    case "truefalse":
      return t(q.statement, lang);
    case "whoami":
      return tu("whoAmI", lang) + " — " + q.clues.map((c) => t(c, lang)).join(" / ");
    case "order":
      return t(q.prompt, lang);
  }
}

/**
 * Dev-time validation: ensures every era has at least 10 questions and that
 * options/answerIndex pairs are valid. Logs warnings rather than throwing so
 * production never crashes on data issues.
 */
export function validateEras(eras: readonly Era[]): string[] {
  const issues: string[] = [];
  for (const era of eras) {
    if (era.quiz.length < 10) {
      issues.push(`[${era.id}] has only ${era.quiz.length} questions (min 10).`);
    }
    era.quiz.forEach((q, i) => {
      const where = `[${era.id}] Q${i + 1} (${q.type})`;
      if (q.type === "mcq" || q.type === "whoami" || q.type === "image") {
        if (!q.options || q.options.length < 2) {
          issues.push(`${where}: needs at least 2 options.`);
        }
        if (q.answerIndex < 0 || q.answerIndex >= q.options.length) {
          issues.push(`${where}: answerIndex ${q.answerIndex} out of range.`);
        }
        const seen = new Set<string>();
        for (const opt of q.options) {
          const key = typeof opt === "string" ? opt : opt.en;
          if (seen.has(key)) issues.push(`${where}: duplicate option "${key}".`);
          seen.add(key);
        }
      }
      if (q.type === "order" && q.items.length < 2) {
        issues.push(`${where}: order needs at least 2 items.`);
      }
    });
  }
  if (issues.length && typeof console !== "undefined") {
    console.warn("[quiz validation]\n" + issues.join("\n"));
  }
  return issues;
}
