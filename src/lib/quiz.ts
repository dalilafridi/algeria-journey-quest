import type { QuizQuestion } from "@/data/eras";

export function shuffle<T>(arr: readonly T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Pick 5–7 random questions from a pool. */
export function pickQuizQuestions(pool: QuizQuestion[]): QuizQuestion[] {
  const min = 5;
  const max = 7;
  const target = Math.min(pool.length, min + Math.floor(Math.random() * (max - min + 1)));
  return shuffle(pool).slice(0, target);
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
