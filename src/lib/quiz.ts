import type { Era, QuizQuestion } from "@/data/eras";

export function shuffle<T>(arr: readonly T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Pick 5–7 questions from a pool, balanced across question types.
 * Tries to include at least one mcq, one truefalse, and one whoami when available.
 * Remaining slots are filled randomly from leftover questions.
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
      const correct = q.items.map((it) => it.label);
      if (answer.length !== correct.length) return false;
      return answer.every((v, i) => v === correct[i]);
    }
  }
}

/** Human-readable description of what the correct answer is. */
export function describeCorrectAnswer(q: QuizQuestion): string {
  switch (q.type) {
    case "mcq":
    case "whoami":
    case "image":
      return q.options[q.answerIndex] ?? "—";
    case "truefalse":
      return q.answer ? "True" : "False";
    case "order":
      return q.items.map((it) => it.label).join(" → ");
  }
}

/** Human-readable description of what the user answered. */
export function describeUserAnswer(q: QuizQuestion, answer: unknown): string {
  if (answer === null || answer === undefined) return "No answer";
  switch (q.type) {
    case "mcq":
    case "whoami":
    case "image":
      return typeof answer === "number" ? (q.options[answer] ?? "—") : "—";
    case "truefalse":
      return answer === true ? "True" : answer === false ? "False" : "—";
    case "order":
      return Array.isArray(answer) ? (answer as string[]).join(" → ") : "—";
  }
}

/** Get the question prompt text in a uniform way. */
export function getPrompt(q: QuizQuestion): string {
  switch (q.type) {
    case "mcq":
    case "image":
      return q.question;
    case "truefalse":
      return q.statement;
    case "whoami":
      return "Who am I? — " + q.clues.join(" / ");
    case "order":
      return q.prompt;
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
        const unique = new Set(q.options);
        if (unique.size !== q.options.length) {
          issues.push(`${where}: duplicate options.`);
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
