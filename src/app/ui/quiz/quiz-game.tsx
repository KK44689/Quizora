import { Question, QuizHistoryItem, QuizInfo } from "@/app/lib/definition";
import Image from 'next/image';
import { QuizPanel } from "./quiz-panel";
import { useState } from "react";

export function Quiz({ quiz, quizHistory }: { quiz: QuizInfo, quizHistory: QuizHistoryItem }) {
  const [showPanel, setShowPanel] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);

  return (
    <div className="flex md:flex-row gap-8">
      <div className="w-full">
        <h1>{quiz.name}</h1>
        <Image
          src={quiz.image ?? null}
          width={903}
          height={487}
          alt="Quiz Image"
        />
        <p>{quiz.description}</p>
      </div>

      <div className="flex flex-col gap-6 text-left md:w-full md:items-center md:justify-center">
        <p className="text-left">
          Submitted Date: {quizHistory.submittedDate ?? "-"} <br />
          Your Highscore: {quizHistory.highscore ?? "-"} <br />
          Pass Points: {quiz.passPoint} <br />
        </p>
        <button
          className={`w-1/4 bg-[var(--theme-blue)] text-white`}
          onClick={() => {
            setShowPanel(true);
            setQuestions(quiz.questions);
          }}
        >
          Start
        </button>
        {showPanel && <QuizPanel question={questions} onClose={() => setShowPanel(false)} />}
      </div>
    </div>
  );
}