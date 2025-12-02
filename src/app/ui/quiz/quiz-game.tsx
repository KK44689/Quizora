import { Question, QuizInfo } from "@/app/lib/definition";
import Image from 'next/image';
import { QuizPanel } from "./quiz-panel";
import { useState } from "react";
import { poppins } from "../font";

export function Quiz({
  quiz,
  submittedDate,
  highscore,
  onRefresh
}: {
  quiz: QuizInfo,
  submittedDate: string | null,
  highscore: number | null,
  onRefresh: () => void
}) {
  const [showPanel, setShowPanel] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);

  return (
    <div className={`${poppins.className} flex flex-col md:flex-row gap-8`}>
      <div className="flex flex-col gap-8">
        <h1 className="text-[var(--theme-blue)] font-bold text-base md:text-2xl">{quiz.name}</h1>
        <div className="flex flex-col gap-8 md:ml-40">
          <Image
            src={quiz.image ?? null}
            width={903}
            height={487}
            alt="Quiz Image"
            className="w-full h-64 md:h-120 object-cover rounded-lg"
          />
          <p className="text-base text-center md:text-left">{quiz.description}</p>
        </div>
      </div>

      <div className="flex flex-col gap-12 text-left md:w-full md:items-center md:justify-center">
        <div className="flex gap-8 text-left text-[var(--theme-grey)]">
          <div className="flex flex-col gap-16 font-bold text-sm md:text-xl">
            <p>Submitted Date:</p>
            <p>Your Highscore:</p>
            <p>Pass Points:</p>
          </div>
          <div className="flex flex-col gap-16 text-sm md:text-xl">
            <p>{submittedDate ?? "-"}</p>
            <p>{highscore === null ? "-" : highscore * 10}</p>
            <p>{quiz.passPoint * 10} </p>
          </div>
        </div>
        <button
          className={`w-full h-16 md:w-52 rounded-xl bg-[var(--theme-blue)] text-white`}
          onClick={() => {
            setShowPanel(true);
            setQuestions(quiz.questions);
          }}
        >
          Start
        </button>
        {showPanel &&
          <QuizPanel
            questions={questions}
            passPoints={quiz.passPoint}
            onClose={() => {
              setShowPanel(false)
              onRefresh();
            }}
          />
        }
      </div>
    </div>
  );
}