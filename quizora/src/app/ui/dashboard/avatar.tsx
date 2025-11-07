import Image from "next/image";
import { poppins } from "../font";

export default function Avatar() {
    return (
        <div className="flex gap-2 items-center ml-8 md:ml-48">
            {/* TODO: fetch image & name from server */}
            <Image
                src="/profile-pic.png"
                alt="avatar picture"
                width={48}
                height={48}
                className="w-8 h-8 md:w-12 md:h-12 object-cover rounded-full"
            />

            <p className={`${poppins.className} hidden md:block text-[var(--theme-grey)]`}>Luna Duck</p>
        </div>
    );
}