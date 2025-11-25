import { QuizHistoryItem } from "./definition";

export const fetchQuizes = async () => {
  const res = await fetch('/api/quiz');
  const data = await res.json();

  if (res.ok) {
    return data;
  } else {
    console.error(data.error);
  }
}

export const postQuizHistory = async (quizResult: QuizHistoryItem) => {
  const quizId = quizResult.quizId;
  const userId = quizResult.userId;
  const answers = quizResult.answers;
  const submittedDate = quizResult.submittedDate;
  const score = quizResult.score;
  const quizStatus = quizResult.quizStatus;

  const res = await fetch('/api/quiz-history', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quizId, userId, answers, submittedDate, score, quizStatus })
  })

  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    console.error(data.error);
  }
}

export const fetchQuizById = async (id: string) => {
  const res = await fetch(`/api/quiz/${id}`);
  const data = await res.json();

  if (res.ok) {
    return data;
  } else {
    console.error(data.error);
  }
}

export const fetchQuizHistoryByQuizId = async (userId: string, quizId: string) => {
  const quizHistoryByUser = await fetch(`/api/quiz-history/${userId}`);
  const data = await quizHistoryByUser.json();
  const quizHistoryByQuizId = data.quizHistory.filter((quiz: QuizHistoryItem) => quiz.quizId === quizId);

  if (quizHistoryByUser.ok && quizHistoryByQuizId) {
    return quizHistoryByQuizId;
  } else {
    console.error(data.error);
  }
}