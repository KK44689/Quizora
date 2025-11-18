import Image from "next/image";
import { ProfileInfo } from "@/app/lib/definition";
import FlagIcon from "@/app/assets/icons/ant-design_flag-filled.svg";
import CorrectIcon from "@/app/assets/icons/akar-icons_circle-check-fill.svg";
import { poppins } from "../font";
import { fetchUserById } from "../../api/users/route";

export default async function Profile() {
  //mock user id: wait for authentication
  const userId = "691aeb45c58c242a1b47ad18";
  const profile = await fetchUserById(userId);

  if(!profile) return <p>No user with id {userId} found.</p>

  return (
    <div className={`flex flex-col md:flex-row grow w-full items-center md:justify-start gap-8`}>
      <Image
        src="/profile-pic.png"
        alt="profile picture"
        width={245}
        height={235}
        className="w-42 h-42 md:w-64 md:h-64"
      />

      <div className={`${poppins.className} flex flex-col items-center md:items-start md:justify-start gap-8`}>
        <h1 className={`text-3xl font-bold text-[var(--theme-blue)]`}>{profile.firstName} {profile.lastName}</h1>

        <div className="flex gap-12">
          <div className="flex flex-col md:flex-row items-center text-center md:text-start gap-4 ">
            <span className={`w-12 h-12 shadow-lg rounded-lg flex items-center justify-center`}><FlagIcon className="w-6 h-6 md:w-8 md:h-8" /></span>
            <span className={`text-[var(--theme-grey)] flex flex-col gap-1`}>
              <h1 className={`text-xl font-bold`}>{profile.quizPassed}</h1>
              <p className={`text-sm md:text-base`}>Quiz Passed</p>
            </span>
          </div>

          <div className="flex flex-col md:flex-row items-center text-center md:text-start gap-4">
            <span className={`w-12 h-12 shadow-lg rounded-lg flex items-center justify-center`}><CorrectIcon className="w-6 h-6 md:w-8 md:h-8" /></span>
            <span className={`text-[var(--theme-grey)] flex flex-col gap-1`}>
              <h1 className={`text-xl font-bold`}>{profile.correctAnswers}</h1>
              <p className={`text-sm md:text-base`}>Correct Answers</p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}