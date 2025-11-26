import { useState } from "react";
import { QuizConfirmReviewPanel } from "./quiz-confirm-review";
import { QuizHistoryItem } from "@/app/lib/definition";
import { postQuizHistory } from "@/app/lib/quizes";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/userContext";

export function QuizConfirmPanel({
  quizResult,
  onClose
}: {
  quizResult: QuizHistoryItem,
  onClose: () => void
}) {
  const [isShowConfirmReview, setIsShowConfirmReview] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, setUser } = useUser();

  const onReview = () => {

  };

  return (
    <>
      {isShowConfirmReview ?
        <QuizConfirmReviewPanel
          score={quizResult.score}
          isPassed={quizResult.quizStatus}
          onReview={onReview}
        /> :
        <QuizConfirmPanelDetails
          onClose={onClose}
          onConfirm={async () => {
            const response = await postQuizHistory(quizResult);

            if (!response) {
              console.error('Failed to post quiz result');
              router.push(pathname);
              return;
            }

            setUser((prev) => ({
              ...prev!,
              quizPassed: prev!.quizPassed + 1,
              correctAnswers: prev!.correctAnswers + quizResult.score
            }))
            
            setIsShowConfirmReview(true)
          }}
        />}
    </>
  );
}

function QuizConfirmPanelDetails({
  onClose,
  onConfirm
}: {
  onClose: () => void,
  onConfirm: () => void
}) {
  return (
    <div className="bg-white rounded-lg p-10 md:w-119 max-w-2xl md:h-109 shadow-lg relative flex flex-col items-center justify-center gap-9">
      <span className="bg-[var(--theme-blue)] rounded-full w-29 h-29 block"></span>
      <h2>Are you Sure you want to submit Quiz?</h2>
      <div className="flex flex-row gap-8">
        <button
          className=""
          onClick={onClose}
        >
          No
        </button>

        <button
          className=""
          onClick={onConfirm}
        >
          Yes
        </button>
      </div>
    </div>
  );
}