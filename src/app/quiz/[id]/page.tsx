import { fetchQuizById, fetchQuizHistoryByQuizId } from "@/app/lib/quizes";
import { fetchCurrentUser } from "@/app/lib/users";
import { Quiz } from "@/app/ui/quiz/quiz-game";
import { Suspense } from "react";

export default async function Pages({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const user = await fetchCurrentUser();

  let quiz = fetchQuizById(id);
  let quizHistory = fetchQuizHistoryByQuizId(user!._id, id);

  return (
    <div>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Quiz
          user={user}
          quizPromise={quiz}
          quizHistoryPromise={quizHistory}
        />
      </Suspense>
    </div>
  );
}