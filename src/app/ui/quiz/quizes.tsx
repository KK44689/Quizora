'use client'

import { QuizInfo } from "@/app/lib/definition";
import { poppins } from "../font";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchQuizes } from "@/app/lib/quizes";

export default function Quizes({ quizes }: { quizes: QuizInfo[] }) {
  // const [quizes, setQuizes] = useState<QuizInfo[]>([]);

  // useEffect(() => {
  //   const quizes = async () => {
  //     const data = await fetchQuizes();
  //     if (!data) {
  //       return;
  //     }

  //     setQuizes(data);
  //   }

  //   quizes();
  // }, []);

  return (
    <div className={`flex flex-col gap-6`}>
      <h1 className={`${poppins.className} text-[var(--theme-blue)] font-bold text-base md:text-2xl `}>Featured Quizes</h1>
      <div className="flex flex-col md:grid md:grid-cols-3 gap-8 ">
        {
          quizes.map((quiz) => {
            return (
              <div key={quiz._id}>
                <QuizCard info={quiz} />
              </div>
            );
          })
        }
      </div>
      <div className="mt-5 flex w-full justify-center">
      </div>
    </div>
  );
}

export function QuizCard({ info }: { info: QuizInfo }) {
  return (
    <Link href={`/dashboard/quiz/${info._id}`}>
      <div className={`${poppins.className} text-white relative flex flex-1 flex-shrink-0 items-end justify-center`}>
        <Image
          src={info.image}
          alt={info.description}
          width={508}
          height={346}
          className={`w-full h-80 rounded-lg object-cover`}
        />

        <p className="absolute md:-translate-y-1/2 backdrop-blur p-6 rounded-lg text-sm md:text-base m-4 md:m-0">{info.name}</p>
      </div>
    </Link>
  );
}