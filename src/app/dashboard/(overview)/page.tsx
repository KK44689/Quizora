'use client';

import { useUser } from "@/app/context/userContext";
import Profile from "@/app/ui/dashboard/profile";
import Quizes from "@/app/ui/quiz/quizes";

export default function Page() {
  const profile = useUser();

  return (
    <div>
      <main className="flex flex-col gap-12">
        <Profile profile={profile} />
        <Quizes />
      </main>
    </div>
  );
}