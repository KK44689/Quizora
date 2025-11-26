'use client';

import { useUser } from "@/app/context/userContext";
import { QuizInfo } from "@/app/lib/definition";
import { fetchQuizes } from "@/app/lib/quizes";
import Profile from "@/app/ui/dashboard/profile";
import Quizes from "@/app/ui/quiz/quizes";
import { useEffect, useState } from "react";

export default function Page() {
  const { user, setUser } = useUser();
  const [quizes, setQuizes] = useState<QuizInfo[]>([]);

  useEffect(() => {
    const quizes = async () => {
      const data = await fetchQuizes();
      if (!data) {
        return <div>Loading...</div>;
      }

      setQuizes(data);
    }

    quizes();
  }, []);

  return (
    <div>
      <main className="flex flex-col gap-12">
        {
          user === null ?
            <div>Loading...</div> :
            <Profile profile={user} />
        }

        <Quizes quizes={quizes} />
      </main>
    </div>
  );
}