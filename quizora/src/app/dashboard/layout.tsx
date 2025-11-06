import "@/app/ui/globals.css";
import SearchBar from "../ui/dashboard/search-bar";
import SideNav from "../ui/dashboard/sidenav";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex min-h-screen">
            <SideNav />

            <div className="flex flex-col flex-1">
                <header className="my-10 flex items-center px-8 py-4 border-b border-gray-200 bg-white">
                    <SearchBar placeholder="Search Quiz" />
                </header>

                <main className="flex-1 p-8">{children}</main>
            </div>
        </div>
    );
}
