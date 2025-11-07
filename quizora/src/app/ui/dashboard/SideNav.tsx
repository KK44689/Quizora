import Image from "next/image";
import NavLinks from "./nav-links";
import Link from "next/link";
import LogoutIcon from "@/app/assets/icons/ri_logout-box-fill.svg";
import { poppins } from "../font";

export default function SideNav() {
    return (
        <div className='flex flex-col h-screen w-28 p-8 gap-16 sm:w-48 md:w-64'>
            <Link href={"/"} className="flex items-center justify-center">
                <Image
                    src="/quizora-blue.png"
                    alt="quizola logo"
                    width={435}
                    height={89}
                    className="w-3/4 h-auto"
                />
            </Link>
            <div className="flex flex-col grow justify-between space-x-2 md:space-x-0 md:space-y-2">
                <NavLinks />
                <div className="hidden h-auto w-full grow rounded-md md:block"></div>
                <form className="mt-auto flex justify-center md:justify-start">
                    <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                        <LogoutIcon className="w-6 md:h-6 text-[var(--theme-blue)]" />
                        <div className={`${poppins.className} font-semibold text-[var(--theme-grey)] hidden md:block`}>Log Out</div>
                    </button>
                </form>
            </div>
        </div>
    );
}