import "@/app/ui/globals.css";
import SearchBar from "../ui/search-bar";
import SideNav from "../ui/dashboard/sidenav";
import Avatar from "../ui/dashboard/avatar";
import { Breadcrumb } from "../ui/breadcrumb";
import { fetchCurrentUser } from "../lib/users";
import { Suspense } from "react";
import AvatarSkeleton from "../ui/skeleton/avatar-skeleton";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await fetchCurrentUser();

  return (
    <div className="flex">
      <SideNav />
      <div className="flex flex-col flex-1 min-h-screen ml-16 md:ml-64">
        <header className="flex md:h-[89px] sm:h-[64px] items-center px-2 mx-4 md:px-8 py-4 bg-white">
          <SearchBar placeholder="Search Quiz" />
          <Suspense fallback={<AvatarSkeleton />}>
            <Avatar user={user} />
          </Suspense>
        </header>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Breadcrumb />
        </Suspense>
        <main className="flex flex-1 p-6 md:p-8 shadow-xl mr-4 md:mr-8 md:mb-4 h-fit rounded-lg">{children}</main>
      </div>
    </div>
  );
}
