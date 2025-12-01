import { fetchQuizById } from "./quizes";

export const getQuizNameFromPath = async (pathname: string) => {
  let allPath = pathname.split("/");
  allPath = allPath.filter(path => path != "");

  if (allPath.includes("quiz")) {
    const quizId = allPath[allPath.length - 1];
    const quiz = await fetchQuizById(quizId);
    if (quiz) return quiz.name;
  }
}