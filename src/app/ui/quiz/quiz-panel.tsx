import { Choice, Question, UserQuizAnswer } from "@/app/lib/definition";
import { useState } from "react";
import { QuizConfirmPanel } from "./quiz-confirm-panel";

export function QuizPanel({ question: questions, onClose }: { question: Question[], onClose: () => void }) {
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  const [answers, setAnswers] = useState<UserQuizAnswer[]>([]);
  const [isLastQuestion, setIsLastQuestion] = useState(false);
  const [isShowConfirm, setIsShowConfirm] = useState(false);

  const onAnswer = (choiceId: number) => {
    setAnswers(prev => [...prev, { choice: choiceId, isCorrect: currentQuestion.answer === choiceId }]);

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
    setIsShowConfirm(true);
  }

  const totalScore = answers.reduce((acc, answer) => {
    return answer.isCorrect ? (acc + 1) : acc;
  }, 0);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      {isShowConfirm ?
        <QuizConfirmPanel onClose={() => setIsShowConfirm(false)} score={totalScore * 10} /> :
        <QuestionDetails
          currentQuestion={currentQuestion}
          isLastQuestion={isLastQuestion}
          onClose={onClose}
          onBack={onBack}
          onAnswer={onAnswer}
          onSubmit={onSubmit}
        />
      }
    </div>
  );
}

function QuestionDetails({
  currentQuestion,
  isLastQuestion,
  onClose,
  onBack,
  onAnswer,
  onSubmit
}: {
  currentQuestion: Question,
  isLastQuestion: boolean,
  onClose: () => void,
  onBack: () => void,
  onAnswer: (id: number) => void,
  onSubmit: () => void
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
            <Choices choice={choice} onChoiceClick={() => onAnswer(choice.id)} />
          </div>))
      }

      {isLastQuestion && (
        <button
          className="bg-[var(--theme-blue)] text-white"
          onClick={onSubmit}
        >
          Submit
        </button>
      )}
    </div>
  );
}

function Choices({ choice, onChoiceClick }: { choice: Choice, onChoiceClick: () => void }) {
  return (
    <button
      className="border border-solid p-8"
      onClick={onChoiceClick}
    >
      {choice.choice}
    </button>
  );
}