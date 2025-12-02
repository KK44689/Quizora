import "@/app/ui/globals.css";
import SearchBar from "../ui/dashboard/search-bar";
import SideNav from "../ui/dashboard/sidenav";
import Avatar from "../ui/dashboard/avatar";
import { UserProvider } from "../context/userContext";
import { Breadcrumb } from "../ui/breadcrumb";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserProvider>
      <div className="flex min-h-screen">
        <SideNav />
        <div className="flex flex-col flex-1">
          <header className="flex md:h-[89px] sm:h-[64px] items-center px-2 mx-4 md:px-8 py-4 bg-white">
            <SearchBar placeholder="Search Quiz" />
            <Avatar />
          </header>
          <Breadcrumb />
          <main className="p-6 md:p-8 shadow-xl mr-4 md:mr-8 h-fit rounded-lg">{children}</main>
        </div>
      </div>
    </UserProvider>
  );
}
