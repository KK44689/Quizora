// 'use client';

// import { useUser } from "@/app/context/userContext";
// import { QuizInfo } from "@/app/lib/definition";
// import { fetchQuizes, fetchUserQuizData } from "@/app/lib/quizes";
import { QuizInfo } from "@/app/lib/definition";
import { fetchQuizes, fetchUserQuizData } from "@/app/lib/quizes";
import { fetchCurrentUser } from "@/app/lib/users";
import Profile from "@/app/ui/dashboard/profile";
import { poppins } from "@/app/ui/font";
import Quizes from "@/app/ui/quiz/quizes";
import { Suspense } from "react";
// import { useEffect, useState } from "react";

export default async function Page() {
  const quizes = fetchQuizes();
  // const { user, setUser } = useUser();
  // const [quizes, setQuizes] = useState<QuizInfo[] | null>(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const [userQuiz, quizes] = await Promise.all([
  //       fetchUserQuizData(user!._id),
  //       fetchQuizes(),
  //     ]);

  //     if (!quizes || !userQuiz) {
  //       return <div>Loading...</div>;
  //     }

  //     setQuizes(quizes);
  //     setUser((prev) => ({
  //       ...prev!,
  //       quizPassed: userQuiz.quizPassed,
  //       correctAnswers: userQuiz.correctAnswers
  //     }))
  //   }

  //   fetchData();
  // }, []);

  return (
    <div>
      <main className="flex flex-col gap-12">
        <Suspense fallback={Loading()}>
          <Profile />
        </Suspense>

        <div className="flex flex-col gap-4">
          <h1 className={`${poppins.className} text-[var(--theme-blue)] font-bold text-base md:text-2xl`}>Featured Quizes</h1>
          <Suspense fallback={Loading()}>
            <Quizes quizesPromise={quizes} />
          </Suspense>
        </div>
      </main>
    </div>
  );
}

function Loading() {
  return <h1>Loading...</h1>;
}