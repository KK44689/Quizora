'use client'

import "@/app/ui/globals.css";
import SearchBar from "../ui/dashboard/search-bar";
import SideNav from "../ui/dashboard/sidenav";
import Avatar from "../ui/dashboard/avatar";
import { ProfileInfo } from "../lib/definition";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [profile, setProfile] = useState<ProfileInfo>({
    firstName: "",
    lastName: "",
    image: "/profile-pic.svg",
    quizPassed: 0,
    correctAnswers: 0
  });

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch('/api/user');

      if (res.ok) {
        const data = await res.json();
        setProfile(data);
      }
      else {
        const data = await res.json();
        console.error(data.error);
      }
    }

    fetchUser();
  }, []);

  return (
    <div className="flex min-h-screen">
      <SideNav />
      <div className="flex flex-col flex-1">
        <header className="flex md:h-[89px] sm:h-[64px] items-center px-2 mx-4 md:px-8 py-4 bg-white">
          <SearchBar placeholder="Search Quiz" />
          <Avatar profile={profile} />
        </header>

        <main className="p-6 md:p-8 shadow-xl mr-4 md:mr-8 h-fit rounded-lg">{children}</main>
      </div>
    </div>
  );
}
