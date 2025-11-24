import { useState } from "react";
import { QuizConfirmReviewPanel } from "./quiz-confirm-review";

export function QuizConfirmPanel({
  score,
  onClose
}: {
  score: number,
  onClose: () => void
}) {
  const [isShowConfirmReview, setIsShowConfirmReview] = useState(false);

  const onReview = () => {

  };

  const onBack = () => {

  };

  return (
    <>
      {isShowConfirmReview ?
        <QuizConfirmReviewPanel
          score={score}
          onReview={onReview}
          onBack={onBack}
        /> :
        <QuizConfirmPanelDetails
          onClose={onClose}
          onConfirm={() => setIsShowConfirmReview(true)}
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