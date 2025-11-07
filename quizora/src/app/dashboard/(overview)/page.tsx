import { ProfileInfo } from "@/app/lib/definition";
import Profile from "@/app/ui/dashboard/profile";
import Quizes from "@/app/ui/dashboard/quizes";

// mock data
const profile: ProfileInfo = {
    name: "Luna Duck",
    imageSource: "",
    quizPassed: 0,
    correctAnswers: 0
}

export default function Page() {
    return (
        <div>
            <main className="flex flex-col gap-12">
                <Profile profile={profile} />
                <Quizes />
            </main>
        </div>
    );
}