import { ProfileInfo } from "@/app/lib/definition";
import { fetchQuizById, fetchQuizHistoryByQuizId } from "@/app/lib/quizes";
import { fetchCurrentUser } from "@/app/lib/users";
import { Quiz } from "@/app/ui/quiz/quiz-game";
import QuizInfoSkeleton from "@/app/ui/skeleton/quiz-info-skeleton";
import { Suspense } from "react";

export default async function Pages({ params }: { params: Promise<{ id: string }> }) {
  const param = await params;
  const id = param.id;
  const user = fetchCurrentUser();

  let quiz = fetchQuizById(id);
  let quizHistory = user.then(user =>
    fetchQuizHistoryByQuizId(user._id, id)
  );

  return (
    <div>
      <Suspense fallback={<QuizInfoSkeleton />}>
        <Quiz
          userPromise={user}
          quizPromise={quiz}
          quizHistoryPromise={quizHistory}
        />
      </Suspense>
    </div>
  );
}