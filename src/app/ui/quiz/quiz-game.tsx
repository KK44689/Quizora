import { Question, QuizHistoryItem, QuizInfo } from "@/app/lib/definition";
import Image from 'next/image';
import { QuizPanel } from "./quiz-panel";
import { useEffect, useState } from "react";
import { getQuizHighScore } from "@/app/lib/quizes";
import { useUser } from "@/app/context/userContext";

export function Quiz({ quiz, quizHistory }: { quiz: QuizInfo, quizHistory: QuizHistoryItem | null }) {
  const [showPanel, setShowPanel] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const profile = useUser();
  const [highscore, setHighscore] = useState(0);

  useEffect(() => {
    const getHighScore = async () => {
      const rawHighscore = await getQuizHighScore(profile._id, quiz._id)
      if (rawHighscore) setHighscore(rawHighscore);
    };

    getHighScore();
  }, []);

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
          Submitted Date: {quizHistory?.submittedDate ?? "-"} <br />
          Your Highscore: {highscore === 0 ? "-" : highscore} <br />
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
        {showPanel && <QuizPanel questions={questions} passPoints={quiz.passPoint} onClose={() => setShowPanel(false)} />}
      </div>
    </div>
  );
}