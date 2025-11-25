'use client';

import { useUser } from "@/app/context/userContext";
import { QuizHistoryItem, QuizInfo } from "@/app/lib/definition";
import { fetchQuizById, fetchQuizHistoryByQuizId } from "@/app/lib/quizes";
import { Quiz } from "@/app/ui/quiz/quiz-game";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Pages() {
  const { id } = useParams() as { id: string };
  const profile = useUser();
  const [quiz, setQuiz] = useState<QuizInfo>({
    _id: "",
    name: "",
    description: "",
    image: "",
    passPoint: 100,
    questions: []
  });

  const [quizHistory, setQuizHistory] = useState<QuizHistoryItem | null>(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      const data = await fetchQuizById(id);
      if (data) setQuiz(data);
    }

    const fetchQuizHistory = async () => {
      const data = await fetchQuizHistoryByQuizId(profile._id, id);
      if (data) setQuizHistory(data);
    }

    fetchQuiz();
  }, [id]);

  return (
    <div>
      <Quiz quiz={quiz} quizHistory={quizHistory} />
    </div>
  );
}