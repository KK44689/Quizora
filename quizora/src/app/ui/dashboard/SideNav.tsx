import Image from "next/image";
import NavLinks from "./nav-links";
import Link from "next/link";
import LogoutIcon from "@/app/assets/icons/ri_logout-box-fill.svg";
import { poppins } from "../font";

export default function SideNav() {
    return (
        <div className='flex flex-col h-screen w-16 p-4 md:p-8 gap-16 md:w-64'>
            <Link href={"/"} className="flex items-center justify-center">
                <Image
                    src="/quizora-blue.png"
                    alt="quizola logo"
                    width={435}
                    height={89}
                    className="w-3/4 h-auto"
                />
            </Link>
            <div className="flex flex-col grow items-center md:items-stretch justify-between md:space-x-0 md:space-y-2">
                <NavLinks />
                <div className="hidden h-auto w-full grow rounded-md md:block"></div>
                <form className="mt-auto flex justify-center md:justify-start">
                    <button className={`${poppins.className} font-bold flex w-[48px] h-[48px] md:w-full grow items-center justify-center gap-2 rounded-md p-1 md:p-3 text-sm text-[var(--theme-grey)] font-medium md:flex-none md:justify-start`}>
                        <LogoutIcon className="w-8 h-8 md:h-6 text-[var(--theme-blue)]" />
                        <div className={`${poppins.className} font-semibold text-[var(--theme-grey)] hidden md:block`}>Log Out</div>
                    </button>
                </form>
            </div>
        </div>
    );
}