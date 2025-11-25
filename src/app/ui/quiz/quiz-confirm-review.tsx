export function QuizConfirmReviewPanel({
  score,
  onReview,
  onBack
}: {
  score: number,
  onReview: () => void,
  onBack: () => void
}) {
  return (
    <div className="bg-white rounded-lg p-10 md:w-119 max-w-2xl md:h-109 shadow-lg relative flex flex-col items-center justify-center gap-9">
      <h1>Congratulations you have passed</h1>
      <p>You scored {score}%</p>
      <div className="flex flex-row gap-8">
        <button
          className=""
          onClick={onReview}
        >
          Review Quiz
        </button>

        <button
          className=""
          onClick={onBack}
        >
          Go Home
        </button>
      </div>
    </div>
  );
}