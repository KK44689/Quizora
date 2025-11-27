'use client';

import { useUser } from "@/app/context/userContext";
import { QuizInfo } from "@/app/lib/definition";
import { fetchQuizes, fetchUserQuizData } from "@/app/lib/quizes";
import Profile from "@/app/ui/dashboard/profile";
import { poppins } from "@/app/ui/font";
import Quizes from "@/app/ui/quiz/quizes";
import { useEffect, useState } from "react";

export default function Page() {
  const { user, setUser } = useUser();
  const [quizes, setQuizes] = useState<QuizInfo[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const [userQuiz, quizes] = await Promise.all([
        fetchUserQuizData(user!._id),
        fetchQuizes(),
      ]);

      if (!quizes || !userQuiz) {
        return <div>Loading...</div>;
      }

      setQuizes(quizes);
      setUser((prev) => ({
        ...prev!,
        quizPassed: userQuiz.quizPassed,
        correctAnswers: userQuiz.correctAnswers
      }))
    }

    fetchData();
  }, []);

  return (
    <div>
      <main className="flex flex-col gap-12">
        {
          user === null ?
            <div>Loading...</div> :
            <Profile profile={user} />
        }

        <h1 className={`${poppins.className} text-[var(--theme-blue)] font-bold text-base md:text-2xl `}>Featured Quizes</h1>
        {
          quizes === null ?
            <div>Loading...</div> :
            <Quizes quizes={quizes!} />
        }
      </main>
    </div>
  );
}