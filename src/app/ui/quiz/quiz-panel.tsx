import { Choice, ChoiceStatus, Question, QuizHistoryItem, UserQuizAnswer } from "@/app/lib/definition";
import { useState } from "react";
import { QuizConfirmPanel } from "./quiz-confirm-panel";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useUser } from "@/app/context/userContext";
import { QuizConfirmReviewPanel } from "./quiz-confirm-review";
import { postQuizHistory } from "@/app/lib/quizes";
import clsx from "clsx";

// Define Panel States
const PanelState = {
  Quiz: 'quiz',
  Confirm: 'confirm',
  ConfirmReview: 'confirmReview',
  Review: 'review'
}

type PanelState = typeof PanelState[keyof typeof PanelState];

export function QuizPanel({ questions, passPoints, onClose }: { questions: Question[], passPoints: number, onClose: () => void }) {
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  const [answers, setAnswers] = useState<UserQuizAnswer[]>([]);
  const [isLastQuestion, setIsLastQuestion] = useState(false);

  const [panelState, setPanelState] = useState(PanelState.Quiz);
  const router = useRouter();
  const pathname = usePathname();

  const nextQuestion = () => {
    if (currentQuestion.id === questions.length) {
      setIsLastQuestion(true);
      console.log(answers.map(answer => answer.choice));
      return;
    }

    let nextId = currentQuestion.id + 1;
    let nextQuestion = questions.find(question => question.id == nextId);
    if (!nextQuestion) {
      console.error(`question not found! ${currentQuestion.id}`);
      return;
    }

    setCurrentQuestion(nextQuestion);
  }

  const onAnswer = (choiceId: number) => {
    setAnswers(prev => [...prev, { id: currentQuestion.id, choice: choiceId, isCorrect: currentQuestion.answer === choiceId }]);
    nextQuestion();
  }

  const onBack = () => {
    if (currentQuestion.id === 1) {
      return;
    }

    let prevId = currentQuestion.id - 1;
    let prevQuestion = questions.find(question => question.id == prevId);

    if (!prevQuestion) {
      console.error(`question not found! ${currentQuestion.id}`);
      return;
    }

    setCurrentQuestion(prevQuestion);
  };

  const onSubmit = async () => {
    setPanelState(PanelState.Confirm);
  }

  const onConfirm = async () => {
    const response = await postQuizHistory(quizResult);

    if (!response) {
      console.error('Failed to post quiz result');
      router.push(pathname);
      return;
    }

    setCurrentQuestion(questions[0]);
    setPanelState(PanelState.ConfirmReview);
  }

  const totalScore = answers.reduce((acc, answer) => {
    return answer.isCorrect ? (acc + 1) : acc;
  }, 0);

  const { id } = useParams() as { id: string };
  const { user, setUser } = useUser();

  const quizResult: QuizHistoryItem = {
    quizId: id,
    userId: user!._id,
    answers: answers,
    submittedDate: new Date().toLocaleDateString(),
    score: totalScore,
    quizStatus: totalScore >= passPoints
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      {panelState == PanelState.Quiz &&
        <QuestionDetails
          currentQuestion={currentQuestion}
          isLastQuestion={isLastQuestion}
          status={{ isReview: false, answers: answers }}
          onClose={onClose}
          onBack={onBack}
          onAnswer={onAnswer}
          onSubmit={onSubmit}
          nextQuestion={nextQuestion}
        />
      }

      {panelState === PanelState.Confirm &&
        <QuizConfirmPanel onConfirm={onConfirm} onClose={() => setPanelState(PanelState.Quiz)} />
      }

      {panelState === PanelState.ConfirmReview &&
        <QuizConfirmReviewPanel
          score={quizResult.score}
          isPassed={quizResult.quizStatus}
          onReview={() => setPanelState(PanelState.Review)}
        />
      }

      {panelState == PanelState.Review &&
        <QuestionDetails
          currentQuestion={currentQuestion}
          isLastQuestion={isLastQuestion}
          status={{ isReview: true, answers: answers }}
          onClose={onClose}
          onBack={onBack}
          nextQuestion={nextQuestion}
        />
      }

    </div>
  );
}

function QuestionDetails({
  currentQuestion,
  isLastQuestion,
  status,
  onClose,
  onBack,
  onAnswer,
  onSubmit,
  nextQuestion
}: {
  currentQuestion: Question,
  isLastQuestion: boolean,
  status: { isReview: boolean, answers: UserQuizAnswer[] },
  onClose: () => void,
  onBack: () => void,
  onAnswer?: (id: number) => void,
  onSubmit?: () => void,
  nextQuestion: () => void
}) {
  return (
    <div className="bg-white rounded-lg p-10 w-full max-w-2xl h-155 shadow-lg relative">
      <button
        className="absolute top-4 right-4 text-xl"
        onClick={onClose}
      >
        X
      </button>

      <h1>Question {currentQuestion.id}</h1><br />

      {
        currentQuestion.id !== 1 &&
        (
          <button
            className="absolute top-4 left-4"
            onClick={onBack}
          >
            back
          </button>
        )
      }

      <p>{currentQuestion.question}</p>
      {
        currentQuestion.choices.map((choice) => (
          <div
            className="flex flex-col gap-8"
            key={choice.id}
          >
            <Choices
              choice={choice}
              status={{
                isReview: status.isReview,
                isCorrect: choice.id === currentQuestion.answer,
                isUserAnswer: status.answers.find(answer => answer.id === currentQuestion.id)?.choice === choice.id
              }}
              onChoiceClick={() => { if (onAnswer) onAnswer(choice.id) }}
            />
          </div>))
      }

      {isLastQuestion && !status.isReview && (
        <button
          className="bg-[var(--theme-blue)] text-white"
          onClick={() => { if (onSubmit) onSubmit() }}
        >
          Submit
        </button>
      )}

      {
        status.isReview && (
          <button
            className="bg-[var(--theme-blue)] text-white"
            onClick={nextQuestion}
          >
            Next
          </button>
        )
      }
    </div>
  );
}

function Choices({ choice, status, onChoiceClick }: { choice: Choice, status: ChoiceStatus, onChoiceClick: () => void }) {
  return (
    <button
      className={clsx("border border-solid p-8", {
        "border border-solid p-8 border-green-500 text-green-500": status.isReview && status.isCorrect,
        "border border-solid p-8 border-red-500 text-red-500": status.isReview && !status.isCorrect && status.isUserAnswer,
      })}
      onClick={onChoiceClick}
    >
      {choice.choice}
    </button>
  );
}