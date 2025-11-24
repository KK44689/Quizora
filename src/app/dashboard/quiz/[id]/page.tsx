'use client';

import { QuizHistoryItem, QuizInfo } from "@/app/lib/definition";
import { Quiz } from "@/app/ui/quiz/quiz-game";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Pages() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState<QuizInfo>({
    _id: "",
    name: "",
    description: "",
    image: "",
    passPoint: 100,
    questions: []
  });

  const mockHistory: QuizHistoryItem = {
    quizId: "",
    userId: "",
    answers: [],
    submittedDate: new Date().toLocaleDateString("en-GB"),
    highscore: "-",
    quizStatus: false
  };

  useEffect(() => {
    const fetchQuiz = async () => {
      const res = await fetch(`/api/quiz/${id}`);

      if (res.ok) {
        const data = await res.json();
        setQuiz(data);
      } else {
        const data = await res.json();
        console.error(data.error);
      }
    }

    fetchQuiz();
  }, [id]);

  return (
    <div>
      {/* TODO:Show quiz history data */}
      <Quiz quiz={quiz} quizHistory={mockHistory} />
    </div>
  );
}