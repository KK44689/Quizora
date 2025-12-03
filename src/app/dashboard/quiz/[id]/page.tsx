// 'use client';

// import { useUser } from "@/app/context/userContext";
import { QuizHistoryItem, QuizInfo } from "@/app/lib/definition";
import { fetchQuizById, fetchQuizHistoryByQuizId, postQuizHistory } from "@/app/lib/quizes";
import { fetchCurrentUser } from "@/app/lib/users";
import { Quiz } from "@/app/ui/quiz/quiz-game";
// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";

export default async function Pages({ params }: { params: Promise<{ id: string }> }) {
  // const { id } = useParams() as { id: string };
  const id = (await params).id;
  const user = await fetchCurrentUser();

  let quiz: QuizInfo | null = null;
  let quizHistory: QuizHistoryItem[] | null = null;
  let latestDate: string = '';
  let highscore: number | null = null;

  // const { user, setUser } = useUser();
  // const [quiz, setQuiz] = useState<QuizInfo | null>(null);

  // const [submittedDate, setSubmittedDate] = useState<string | null>(null);
  // const [highscore, setHighscore] = useState<number | null>(null);

  const fetchData = async () => {
    try {
      const [quizData, quizHistoryData] = await Promise.all([
        fetchQuizById(id),
        fetchQuizHistoryByQuizId(user!._id, id)
      ]);

      if (quizHistoryData) {
        // fetch latest submitted date
        quizHistory = quizHistoryData;
        const date = quizHistoryData.map((quiz: QuizHistoryItem) => quiz.submittedDate);
        latestDate = new Date(
          Math.max(...date.map((d: string) => new Date(d).getTime()))
        ).toString();

        // fetch score
        const allHighScore = quizHistoryData.map((quiz: QuizHistoryItem) => quiz.score);
        highscore = allHighScore.length === 0 ? null : Math.max(...allHighScore);
      }

      if (quizData) {
        quiz = quizData;
      }
    } catch (e) {
      console.error('Failed to fetch quiz history.', e);
    }
  }

  const fetchAllData = fetchData();
  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <div>
      {quiz === null ? <div>Loading...</div> :
        <Quiz
          user={user}
          quiz={quiz!}
          submittedDate={latestDate}
          highscore={highscore}
          onRefresh={fetchAllData}
        />
      }
    </div>
  );
}