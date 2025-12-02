'use client';

import { usePathname } from "next/navigation";
import { poppins } from "./font";
import { useEffect, useState } from "react";
import { fetchQuizById } from "../lib/quizes";

export function Breadcrumb() {
  const pathname = usePathname();
  const allPath = pathname.split("/").filter(Boolean);

  const [quizName, setQuizName] = useState("...");
  const last = allPath[allPath.length - 1];
  const isQuizId = /^[a-f\d]{24}$/i.test(last);

  const isShow = (allPath: string[]): boolean => {
    if (allPath.includes("dashboard") && allPath.length === 1) return false;
    return true;
  }

  useEffect(() => {
    const loadQuizName = async () => {
      if (isQuizId) {
        const quiz = await fetchQuizById(last);
        if (quiz) setQuizName(quiz.name);
      }
    };

    loadQuizName();
  }, [isQuizId, last]);

  return (
    <div className={`${poppins.className} flex flex-row`}>
      {isShow(allPath) &&
        allPath
          .map((path, index) => {
            if (path.includes("-")) path = path.replace("-", " ");
            if (index === allPath.length - 1 && quizName && isQuizId) {
              path = quizName;
            }
            console.log(path);
            return <h1 key={path} className="capitalize text-xs md:text-xl text-[#C4C4C4]">{index === 0 ? "" : "/"} {path}&nbsp;</h1>
          })
      }
    </div>
  );
}