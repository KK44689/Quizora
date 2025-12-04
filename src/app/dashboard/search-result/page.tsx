import { fetchQuizByQuery } from "@/app/lib/quizes";
import { poppins } from "@/app/ui/font";
import Quizes from "@/app/ui/quiz/quizes";
import { Suspense } from "react";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const quizes = fetchQuizByQuery(query);

  console.log(quizes);
  return (
    <div className={`${poppins.className} flex flex-col gap-4`}>
      <h1 className="text-[var(--theme-blue)] font-bold text-base md:text-2xl">Search Result of <span className="font-medium text-[var(--theme-grey)]">"{query}"</span></h1>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Quizes quizesPromise={quizes} noDataText={`No result for ${query}`} />
      </Suspense>
    </div>
  );
}