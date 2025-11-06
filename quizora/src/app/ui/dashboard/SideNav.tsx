import Image from "next/image";
import NavLinks from "./nav-links";
import Link from "next/link";

export default function SideNav() {
    return (
        <div className='flex flex-col h-full w-32 p-8 gap-16 sm:w-48 md:w-64 my-8'>
            <Link href={"/"} className="flex items-center justify-center">
                <Image
                    src="/quizora-blue.png"
                    alt="quizola logo"
                    width={435}
                    height={89}
                    className="w-3/4 h-auto"
                />
            </Link>
            <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                <NavLinks />
                <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>

            </div>
        </div>
    );
}