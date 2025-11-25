import { useRouter } from "next/navigation";

export function QuizConfirmReviewPanel({
  score,
  isPassed,
  onReview,
}: {
  score: number,
  isPassed: boolean,
  onReview: () => void,
}) {
  const router = useRouter();
  
  const onBack = () => {
    router.push('/dashboard');
  }

  return (
    <div className="bg-white rounded-lg p-10 md:w-119 max-w-2xl md:h-109 shadow-lg relative flex flex-col items-center justify-center gap-9">
      <h1>{isPassed ? "Congratulations you have passed" : "Almost there! Try again!"}</h1>
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