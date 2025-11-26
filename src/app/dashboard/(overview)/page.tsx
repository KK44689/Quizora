'use client';

import { useUser } from "@/app/context/userContext";
import Profile from "@/app/ui/dashboard/profile";
import Quizes from "@/app/ui/quiz/quizes";

export default function Page() {
  const { user, setUser } = useUser();

  return (
    <div>
      <main className="flex flex-col gap-12">
        {
          user === null ?
            <div>Loading...</div> :
            <Profile profile={user} />
        }
        <Quizes />
      </main>
    </div>
  );
}