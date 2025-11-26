'use client'

import { useUser } from "@/app/context/userContext";
import { QuizInfo } from "@/app/lib/definition";
import { fetchUserQuizHistory } from "@/app/lib/quizes";
import Quizes from "@/app/ui/quiz/quizes";
import { useEffect, useState } from "react";

export default function QuizHistory() {
  const [quizes, setQuizes] = useState<QuizInfo[] | null>(null);
  const { user, setUser } = useUser();

  useEffect(() => {
    const fetchQuizes = async () => {
      const data = await fetchUserQuizHistory(user!._id);
      if (data) setQuizes(data);
    }

    fetchQuizes();
  }, []);

  return (
    <div>
      <h1>Quiz History</h1>
      {quizes === null ? <div>Loading...</div> :
        <div>
          <Quizes quizes={quizes!} />
        </div>
      }
    </div>
  );
}