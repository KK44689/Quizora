import { usePathname } from "next/navigation";
import { poppins } from "./font";

export function PageDirectory({ quizName }: { quizName?: string }) {
  const pathname = usePathname();
  const allPath = pathname.split("/");

  const isShow = (allPath: string[]): boolean => {
    allPath = allPath.filter(path => path != "");
    if (allPath.includes("dashboard") && allPath.length === 1) return false;
    return true;
  }

  const isQuiz = (allPath: string[]): boolean => {
    allPath = allPath.filter(path => path != "");
    if (allPath.includes("quiz")) return true;
    return false;
  }

  return (
    <div className={`${poppins.className} flex flex-row`}>
      {isShow(allPath) &&
        allPath
          .filter(path => path != "")
          .map((path, index) => {
            if (path.includes("-")) path = path.replace("-", " ");
            if (isQuiz(allPath) && quizName && index === allPath.filter(path => path != "").length - 1) path = quizName;
            console.log(path);
            return <h1 key={path} className="capitalize md:text-xl text-[#C4C4C4]">{index === 0 ? "" : "/"} {path}&nbsp;</h1>
          })
      }
    </div>
  );
}