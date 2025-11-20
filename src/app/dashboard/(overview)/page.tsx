import { ProfileInfo } from "@/app/lib/definition";
import Profile from "@/app/ui/dashboard/profile";
import Quizes from "@/app/ui/dashboard/quizes";

export default async function Page() {
  return (
    <div>
      <main className="flex flex-col gap-12">
        <Profile />
        <Quizes />
      </main>
    </div>
  );
}