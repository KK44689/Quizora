// 'use client'

// import { useUser } from "@/app/context/userContext";
import { fetchUserById } from "@/app/api/users/route";
import { QuizInfo } from "@/app/lib/definition";
import {  fetchUserQuizHistory } from "@/app/lib/quizes";
import { fetchCurrentUser } from "@/app/lib/users";
import { poppins } from "@/app/ui/font";
import Quizes from "@/app/ui/quiz/quizes";
import { Suspense } from "react";
// import { useEffect, useState } from "react";

export default async function QuizHistory() {
  const user = await fetchCurrentUser();
  const quizes = fetchUserQuizHistory(user._id);
  // const [quizes, setQuizes] = useState<QuizInfo[] | null>(null);
  // const { user, setUser } = useUser();

  // useEffect(() => {
  //   const fetchQuizes = async () => {
  //     const data = await fetchUserQuizHistory(user!._id);
  //     if (data) setQuizes(data);
  //   }

  //   fetchQuizes();
  // }, []);

  return (
    <div className={`${poppins.className} flex flex-col gap-4`}>
      <h1 className="text-[var(--theme-blue)] font-bold text-base md:text-2xl">Quiz History</h1>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Quizes quizesPromise={quizes} noDataText="No quizhistory found."/>
      </Suspense>
    </div>
  );
}