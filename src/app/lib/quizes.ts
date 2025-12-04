import { QuizHistoryItem, QuizInfo, UserResults } from "./definition";

function getBaseUrl() {
  if (typeof window !== "undefined") {
    // Client side
    return window.location.origin;
  }

  // Server side
  const host = process.env.VERCEL_URL;
  if (host) return `https://${host}`;

  // Local dev
  return `http://localhost:3000`;
}

const baseUrl = getBaseUrl();

export const fetchQuizes = async () => {
  try {
    const res = await fetch(`${baseUrl}/api/quiz`);
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

export const fetchQuizByQuery = async (query: string) => {
  try {
    // const host = (await headers()).get("host");
    // const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

    // const baseUrl = `${protocol}://${host}`;

    const quizes = await fetch(`${baseUrl}/api/quiz`);
    const result = await quizes.json();
    console.log(result);
    const filteredResult: QuizInfo[] = result.filter((quiz: QuizInfo) => quiz.name.toLowerCase().includes(query) || quiz.description.toLowerCase().includes(query));
    return filteredResult;
  } catch (err) {
    console.error(err);
    return [];
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

    return filteredQuiz;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export const fetchUserQuizData = async (userId: string) => {
  try {
    const quizHistory = await fetch(`${baseUrl}/api/quiz-history/${userId}`).then(res => res.json());

    let quizResult: UserResults = { quizPassed: 0, correctAnswers: 0 };

    quizHistory.quizHistory.forEach((history: QuizHistoryItem) => {
      if (history.quizStatus) quizResult.quizPassed += 1;
      quizResult.correctAnswers += history.score;
    });

    return quizResult;
  } catch (err) {
    console.error(err);
  }
}