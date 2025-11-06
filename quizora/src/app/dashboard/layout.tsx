import "@/app/ui/globals.css";
import SearchBar from "../ui/dashboard/SearchBar";
import SideNav from "../ui/dashboard/SideNav";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-row gap-8">
                <SideNav />
                <SearchBar placeholder={"Search Quiz"} />
            </div>
            <div>
                {children}
            </div>
        </div>
    );
}
