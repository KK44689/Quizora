import Image from "next/image";
import { Metadata } from "next";
import { nunito_sans } from "./ui/font";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Quizora",
}

export default function Home() {
  return (
    <div className="flex flex-row md:flex-row sm:flex-col min-h-screen W-full items-center justify-center font-sans bg-[#1935CA]">
      <div className="flex flex-col w-full items-center justify-center gap-8">
        <Image
          src='/quizora-white.png'
          alt={"Quizora Logo"}
          width={435}
          height={89} />

        <h1 className={`${nunito_sans} text-xl text-white md:text-3xl md:leading-normal font-bold`}>The ultimate quiz game for curious minds.</h1>
      </div>

      <div className="flex flex-col min-h-screen w-full max-w-3xl items-center justify-center gap-8 bg-white">
        <p className={`${nunito_sans} text-xl md:text-3xl md:leading-normal text-[#1935CA] text-center`}>
          <b>Used this info to try it yourself!</b><br /><br />
          <b>Email:</b> test@quizora.com<br />
          <b>Password:</b> thisisapassword<br />
        </p>
        <Link href="/dashboard">  {/*TODO: Now it's bypass to dashboard, changed to login when ready*/}
          <button className="text-white bg-[#1935CA] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Login</button>
        </Link>
      </div>
    </div>
  );
}
