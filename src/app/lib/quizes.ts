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

  if (quizHistoryByUser.ok) {
    return data.filter((quiz: QuizHistoryItem) => quiz.quizId === quizId);
  } else {
    console.error('Failed to fetch quiz history by quiz id', data.error);
  }
}

export const getQuizHighScore = async (userId: string, quizId: string) => {
  const res = await fetch(`/api/quiz-history/${userId}`);
  const data = await res.json();
  const quizResult = data.filter((quiz: QuizHistoryItem) => quiz.quizId === quizId);
  console.log(`quizResult: ${quizResult.join()}`);
  const allHighScore = quizResult.map((quiz: QuizHistoryItem) => quiz.score);
  const highscore = Math.max(...allHighScore);

  if (res.ok) {
    return highscore;
  } else {
    console.error(data.error);
  }
}