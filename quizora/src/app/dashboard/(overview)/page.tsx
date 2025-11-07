import { ProfileInfo } from "@/app/lib/definition";
import Profile from "@/app/ui/dashboard/profile";

// mock data
const profile: ProfileInfo = {
    name: "Luna Duck",
    imageSource: "",
    quizPassed: 0,
    correctAnswers: 0
}

export default function Page() {
    return (
        <div className="flex flex-col">
            <main>
                <Profile profile={profile} />
            </main>
        </div>
    );
}