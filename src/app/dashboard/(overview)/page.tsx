'use client';

import Profile from "@/app/ui/dashboard/profile";
import Quizes from "@/app/ui/dashboard/quizes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    image: "/profile-pic.svg",
    quizPassed: 0,
    correctAnswers: 0
  });

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch('/api/user');
      console.log(res.ok);

      if (res.ok) {
        const data = await res.json();
        setProfile(data);
      }
      else {
        const data = await res.json();
        console.error(data.error);
        router.push('/login');
      }
    }

    fetchUser();
  }, [router]);

  return (
    <div>
      <main className="flex flex-col gap-12">
        <Profile profile={profile} />
        <Quizes />
      </main>
    </div>
  );
}