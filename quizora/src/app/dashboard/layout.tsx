import "@/app/ui/globals.css";
import SearchBar from "../ui/dashboard/search-bar";
import SideNav from "../ui/dashboard/sidenav";
import Avatar from "../ui/dashboard/avatar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex min-h-screen">
            <SideNav />
            <div className="flex flex-col flex-1">
                <header className="flex md:h-[89px] sm:h-[64px] items-center px-8 py-4 bg-white">
                    <SearchBar placeholder="Search Quiz" />
                    <Avatar />
                </header>

                <main className="flex-1 p-8">{children}</main>
            </div>
        </div>
    );
}
