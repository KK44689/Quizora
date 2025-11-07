import { poppins } from "../font";
import Image from "next/image";
import { QuizInfo } from "@/app/lib/definition";

const mockQuizes: QuizInfo[] = [{
    imageSource: "/quiz-placeholder-image.png",
    description: "Protecting the Organization against Phishing Attacks",
    status: false
},
{
    imageSource: "/quiz-placeholder-image.png",
    description: "Ransomeware and Attack Landscape in Coporate.",
    status: false
}]

export default function Quizes() {
    return (
        <div className={`flex flex-col gap-6`}>
            <h1 className={`${poppins.className} text-[var(--theme-blue)] font-bold text-base md:text-2xl `}>Featured Quizes</h1>
            <div className="flex flex-col md:flex-row gap-8">
                {
                    mockQuizes.map((quiz) => {
                        return (
                            <div>
                                <QuizCard info={quiz} />
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}

export function QuizCard({ info }: { info: QuizInfo }) {
    return (
        <div className={`${poppins.className} text-white relative flex flex-1 flex-shrink-0 items-end justify-center`}>
            <Image
                src={info.imageSource}
                alt={info.description}
                width={508}
                height={346}
                className={`rounded-lg `}
            />

            <p className="absolute md:-translate-y-1/2 backdrop-blur p-6 rounded-lg text-sm md:text-base m-4 md:m-0">{info.description}</p>
        </div>
    );
}