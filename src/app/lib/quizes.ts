import { QuizHistoryItem, QuizInfo } from "./definition";

export const fetchQuizes = async () => {
  try {
    const res = await fetch('/api/quiz');
    const data = await res.json();

    return data;
  } catch (err) {
    console.error(err);
  }
}

export const postQuizHistory = async (quizResult: QuizHistoryItem) => {
  const quizId = quizResult.quizId;
  const userId = quizResult.userId;
  const answers = quizResult.answers;
  const submittedDate = quizResult.submittedDate;
  const score = quizResult.score;
  const quizStatus = quizResult.quizStatus;

  try {
    const res = await fetch('/api/quiz-history', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quizId, userId, answers, submittedDate, score, quizStatus })
    })

    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

export const fetchQuizById = async (id: string) => {
  try {
    const res = await fetch(`/api/quiz/${id}`);
    const data = await res.json();

    return data;
  } catch (err) {
    console.error(err);
  }
}

export const fetchQuizHistoryByQuizId = async (userId: string, quizId: string) => {
  try {
    const quizHistoryByUser = await fetch(`/api/quiz-history/${userId}`);
    const data = await quizHistoryByUser.json();
    const quizHistoryByQuizId = data.quizHistory.filter((quiz: QuizHistoryItem) => quiz.quizId === quizId);

    if (quizHistoryByUser.ok && quizHistoryByQuizId) {
      return quizHistoryByQuizId;
    }
  } catch (err) {
    console.error(err);
  }
}

export const fetchUserQuizHistory = async (userId: string) => {
  try {
    const [quizHistoryRes, quizRes] = await Promise.all([
      fetch(`/api/quiz-history/${userId}`),
      fetch(`/api/quiz`)
    ]);

    const [quizHistory, quizes] = await Promise.all([
      quizHistoryRes.json(),
      quizRes.json()
    ])

    const quizHistoryId = quizHistory.quizHistory.map((history: QuizHistoryItem) => history.quizId);
    const filteredQuiz: QuizInfo[] = quizes.filter((quiz: QuizInfo) => quizHistoryId.includes(quiz._id));

    if (filteredQuiz) return filteredQuiz;
  } catch (err) {
    console.error(err);
  }
}