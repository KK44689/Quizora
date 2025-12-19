import { headers } from "next/headers";
import { QuizCollection, QuizHistoryItem, QuizInfo, UserResults } from "./definition";

export const fetchQuizes = async (page: number) => {
  try {
    const host = (await headers()).get("host");
    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

    const baseUrl = `${protocol}://${host}`;

    const res = await fetch(`${baseUrl}/api/quiz?page=${page}`);
    // const text = await res.text();
    // console.log(`quizes: ${text.slice(0, 100)}`);

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Request failed: ${text}`);
    }
    console.log(`baseUrl: ${baseUrl}`);
    const data = await res.json();
    // console.log(`data: ${data}`);

    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export const fetchQuizById = async (id: string) => {
  try {
    const host = (await headers()).get("host");
    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

    const baseUrl = `${protocol}://${host}`;
    const res = await fetch(`${baseUrl}/api/quiz/${id}`);
    const data = await res.json();

    return data;
  } catch (err) {
    console.error(err);
  }
}

export const fetchQuizByQuery = async (query: string) => {
  try {
    const host = (await headers()).get("host");
    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

    const baseUrl = `${protocol}://${host}`;

    const quizes = await fetch(`${baseUrl}/api/quiz`);
    const result = await quizes.json();

    const filteredResult: QuizInfo[] = result.quizes.filter((quiz: QuizInfo) => quiz.name.toLowerCase().includes(query) || quiz.description.toLowerCase().includes(query));

    const ITEMS_PER_PAGE = Number(process.env.ITEMS_PER_PAGE);
    const totalPages = Math.ceil(filteredResult.length / ITEMS_PER_PAGE);
    const filteredQuiz: QuizCollection = { quizes: filteredResult, totalPages: totalPages };
    return filteredQuiz;
  } catch (err) {
    console.error(err);
    return { quizes: [], totalPages: 0 };
  }
}

export const fetchQuizHistoryByQuizId = async (userId: string, quizId: string) => {
  try {
    const host = (await headers()).get("host");
    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

    const baseUrl = `${protocol}://${host}`;

    const quizHistoryByUser = await fetch(`${baseUrl}/api/quiz-history/${userId}`);
    const data = await quizHistoryByUser.json();
    const quizHistoryByQuizId = data.quizHistory.filter((quiz: QuizHistoryItem) => quiz.quizId === quizId);

    if (quizHistoryByUser.ok && quizHistoryByQuizId) {
      return quizHistoryByQuizId;
    }
  } catch (err) {
    console.error(err);
  }
}

export const fetchUserQuizHistory = async (userId: string, page: number) => {
  try {
    const host = (await headers()).get("host");
    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

    const baseUrl = `${protocol}://${host}`;

    const [quizHistoryRes, quizRes] = await Promise.all([
      fetch(`${baseUrl}/api/quiz-history/${userId}`),
      fetch(`${baseUrl}/api/quiz?page=${page}`)
    ]);

    const [quizHistory, quizes] = await Promise.all([
      quizHistoryRes.json(),
      quizRes.json()
    ])

    const quizHistoryId = quizHistory.quizHistory.map((history: QuizHistoryItem) => history.quizId);
    const filteredQuiz = quizes.quizes.filter((quiz: QuizInfo) => quizHistoryId.includes(quiz._id));
    const ITEMS_PER_PAGE = Number(process.env.ITEMS_PER_PAGE);
    const totalPages = Math.ceil(filteredQuiz.length / ITEMS_PER_PAGE);
    const filteredQuizData: QuizCollection = { quizes: filteredQuiz, totalPages: totalPages };

    return filteredQuizData;
  } catch (err) {
    console.error(err);
    return { quizes: [], totalPages: 0 };
  }
}

export const fetchUserQuizData = async (userId: string) => {
  try {
    const host = (await headers()).get("host");
    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

    const baseUrl = `${protocol}://${host}`;

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