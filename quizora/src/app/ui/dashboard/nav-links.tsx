'use client'

import Link from "next/link";
import Dashboard from "../../../../public/ic_round-space-dashboard.svg";
import History from "../../../../public/ic_twotone-history.svg";
import clsx from 'clsx';
import { usePathname } from "next/navigation";
import { poppins } from "../font";

const links = [
    { name: 'Dashboard', href: '/dashboard', icon: Dashboard },
    { name: 'Quiz History', href: '/quiz-history', icon: History }
]

export default function NavLinks() {
    const pathname = usePathname();
    return (
        <div>
            {
                links.map((link) => {
                    const LinkIcon = link.icon;
                    console.log(pathname === link.href);
                    return (
                        <div>
                            <Link
                                key={link.name}
                                href={link.href}
                                className={clsx(`${poppins.className} font-bold flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm text-[#696F79] font-medium md:flex-none md:justify-start md:p-2 md:px-3`,
                                    {
                                        'bg-[var(--theme-blue)] text-white': pathname === link.href,
                                        'bg-grey-500 text-[#696F79] hover:bg-sky-100 hover:text-blue-600': pathname !== link.href,
                                    }
                                )}
                            >
                                <LinkIcon className={clsx("w-6 h-6 text-[var(--theme-blue)]",
                                    {
                                        'text-white': pathname === link.href,
                                    }
                                )} />
                                <p className="hidden md:block font-semibold">{link.name}</p>
                            </Link>
                            <br />
                        </div>
                    );
                })
            }
        </div>
    );
}