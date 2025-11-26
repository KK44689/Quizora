'use client';

import { useUser } from "@/app/context/userContext";
import { QuizHistoryItem, QuizInfo } from "@/app/lib/definition";
import { fetchQuizById, fetchQuizHistoryByQuizId } from "@/app/lib/quizes";
import { Quiz } from "@/app/ui/quiz/quiz-game";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Pages() {
  const { id } = useParams() as { id: string };
  const { user, setUser } = useUser();
  const [quiz, setQuiz] = useState<QuizInfo | null>(null);

  const [submittedDate, setSubmittedDate] = useState<string | null>(null);
  const [highscore, setHighscore] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [quizData, quizHistoryData] = await Promise.all([
          fetchQuizById(id),
          fetchQuizHistoryByQuizId(user!._id, id)
        ]);

        if (quizHistoryData) {
          // fetch latest submitted date
          const date = quizHistoryData.map((quiz: QuizHistoryItem) => quiz.submittedDate);
          const latestDate = new Date(
            Math.max(...date.map((d: string) => new Date(d).getTime()))
          );

          setSubmittedDate(isNaN(latestDate.getTime()) ? null : latestDate.toLocaleDateString());

          // fetch score
          const allHighScore = quizHistoryData.map((quiz: QuizHistoryItem) => quiz.score);
          const highscore = allHighScore.length === 0 ? null : Math.max(...allHighScore);

          setHighscore(highscore);
        }

        if (quizData) {
          setQuiz(quizData);
        }
      } catch (e) {
        console.error('Failed to fetch quiz history.', e);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      {quiz === null ? <div>Loading...</div> :
        <Quiz quiz={quiz!} submittedDate={submittedDate} highscore={highscore} />
      }
    </div>
  );
}