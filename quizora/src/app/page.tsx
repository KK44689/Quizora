import Image from "next/image";
import { Metadata } from "next";
import { nunito_sans } from "./ui/font";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Quizora",
}

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row h-screen font-sans">
      <div className="flex flex-col items-center justify-center w-full bg-[var(--theme-blue)] gap-8 md:w-1/2 h-1/2 md:h-full ">
        <Image
          src='/quizora-white.png'
          alt={"Quizora Logo"}
          width={435}
          height={89}
          className="w-32 sm:w-48 md:w-64 lg:w-80 h-auto"
        />

        <h1 className={`${nunito_sans} text-base text-white font-bold text-center md:text-xl md:text-3xl md:leading-normal`}>The ultimate quiz game for curious minds.</h1>
      </div>

      <div className="flex flex-col h-1/2  w-full items-center justify-center gap-8 bg-white md:h-full md:w-1/2">
        <p className={`${nunito_sans} text-base text-[var(--theme-blue)] text-center md:text-3xl md:leading-normal`}>
          <b>Used this info to try it yourself!</b><br /><br />
          <b>Email:</b> test@quizora.com<br />
          <b>Password:</b> thisisapassword<br />
        </p>
        <Link href="/dashboard">  {/*TODO: Now it's bypass to dashboard, changed to login when ready*/}
          <button className="text-white bg-[var(--theme-blue)] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Login</button>
        </Link>
      </div>
    </div>
  );
}
