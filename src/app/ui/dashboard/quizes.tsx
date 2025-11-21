'use client'

import { Quiz } from "@/app/lib/definition";
import { poppins } from "../font";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Quizes() {
  const [quizes, setQuizes] = useState<Quiz[]>([]);

  useEffect(() => {
    const fetchQuizes = async () => {
      const res = await fetch('/api/quizes');

      if (res.ok) {
        const data = await res.json();
        setQuizes(data);
      } else {
        const data = await res.json();
        console.error(data.error);
      }
    }

    fetchQuizes();
  }, []);

  return (
    <div className={`flex flex-col gap-6`}>
      <h1 className={`${poppins.className} text-[var(--theme-blue)] font-bold text-base md:text-2xl `}>Featured Quizes</h1>
      <div className="flex flex-col md:flex-row gap-8">
        {
          quizes.map((quiz) => {
            return (
              <div>
                <QuizCard info={quiz} />
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

export function QuizCard({ info }: { info: Quiz }) {
  return (
    <div className={`${poppins.className} text-white relative flex flex-1 flex-shrink-0 items-end justify-center`}>
      <Image
        src={info.image}
        alt={info.description}
        width={508}
        height={346}
        className={`rounded-lg `}
      />

      <p className="absolute md:-translate-y-1/2 backdrop-blur p-6 rounded-lg text-sm md:text-base m-4 md:m-0">{info.name}</p>
    </div>
  );
}