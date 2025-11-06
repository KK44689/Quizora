import Image from "next/image";

export default function SideNav() {
    return (
        <div className="relative w-full h-64 sm:h-80 md:h-96">
            <Image
                src="/quizora-blue.png"
                alt="quizola logo"
                // width={435}
                // height={89}
                fill
                className="object-contain"
            />
        </div>
    );
}