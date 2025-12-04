import { fetchQuizes } from "@/app/lib/quizes";
import Profile from "@/app/ui/dashboard/profile";
import { poppins } from "@/app/ui/font";
import Quizes from "@/app/ui/quiz/quizes";
import { Suspense } from "react";

export default async function Page() {
  const quizes = fetchQuizes();

  return (
    <div>
      <main className="flex flex-col gap-12">
        <Suspense fallback={Loading()}>
          <Profile />
        </Suspense>

        <div className="flex flex-col gap-4">
          <h1 className={`${poppins.className} text-[var(--theme-blue)] font-bold text-base md:text-2xl`}>Featured Quizes</h1>
          <Suspense fallback={Loading()}>
            <Quizes quizesPromise={quizes} noDataText="No quiz found." />
          </Suspense>
        </div>
      </main>
    </div>
  );
}

function Loading() {
  return <h1>Loading...</h1>;
}