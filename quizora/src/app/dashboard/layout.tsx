import "@/app/ui/globals.css";
import SearchBar from "../ui/dashboard/search-bar";
import SideNav from "../ui/dashboard/sidenav";
import Avatar from "../ui/dashboard/avatar";
import { ProfileInfo } from "../lib/definition";

const mockProfile: ProfileInfo = {
    name: "Luna Duck",
    imageSource: "/profile-pic.png",
    quizPassed: 0,
    correctAnswers: 0
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex min-h-screen">
            <SideNav />
            <div className="flex flex-col flex-1">
                <header className="flex md:h-[89px] sm:h-[64px] items-center px-2 mx-4 md:px-8 py-4 bg-white">
                    <SearchBar placeholder="Search Quiz" />
                    <Avatar profile={mockProfile} />
                </header>

                <main className="flex-1 p-6 md:p-8 shadow-xl mr-4 md:mr-8">{children}</main>
            </div>
        </div>
    );
}
