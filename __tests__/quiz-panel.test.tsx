import { QuizPanel } from "@/app/ui/quiz/quiz-panel";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { QuizConfirmPanel } from "@/app/ui/quiz/quiz-confirm-panel";

const userData = {
  _id: "test",
  firstName: "Luna",
  lastName: "Duck",
  image: "/avatar.png",
};

const questions = [{
  "id": 1,
  "question": "Which game features the character 'Master Chief'?",
  "choices": [
    {
      "id": 1,
      "choice": "Halo"
    },
    {
      "id": 2,
      "choice": "Call of Duty"
    },
    {
      "id": 3,
      "choice": "Gears of War"
    },
    {
      "id": 4,
      "choice": "Overwatch"
    }
  ],
  "answer": 1
},
{
  "id": 2,
  "question": "In Mario Kart, which item can throw a shell backwards?",
  "choices": [
    {
      "id": 1,
      "choice": "Banana"
    },
    {
      "id": 2,
      "choice": "Red Shell"
    },
    {
      "id": 3,
      "choice": "Green Shell"
    },
    {
      "id": 4,
      "choice": "Mushroom"
    }
  ],
  "answer": 2
},
{
  "id": 3,
  "question": "Which game popularized the 'Battle Royale' genre?",
  "choices": [
    {
      "id": 1,
      "choice": "Fortnite"
    },
    {
      "id": 2,
      "choice": "PUBG"
    },
    {
      "id": 3,
      "choice": "Apex Legends"
    },
    {
      "id": 4,
      "choice": "Call of Duty: Warzone"
    }
  ],
  "answer": 2
}]

// Mock useRouter
jest.mock("next/navigation", () => ({
  __esModule: true,
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => "/quiz/quiz-test",
  useParams: () => ({ id: "quiz-test" })
}));

jest.mock("@/app/ui/quiz/quiz-confirm-panel", () => ({
  __esModule: true,
  QuizConfirmPanel: ({ onConfirm, onClose }: any) => (
    <div data-testid="quiz-confirm">
      <button onClick={onConfirm}>confirm</button>
      <button onClick={onClose}>cancel</button>
    </div>
  ),
}));

jest.mock("@/app/ui/quiz/quiz-confirm-review", () => ({
  __esModule: true,
  QuizConfirmReviewPanel: ({ onReview }: any) => (
    <div data-testid="quiz-confirm-review">
      <button onClick={onReview}>review</button>
    </div>
  ),
}));

describe("Quiz Panel", () => {
  const setup = () => {
    render(
      <QuizPanel
        user={userData}
        questions={questions}
        passPoints={3}
        onClose={jest.fn()}
      />);
  };

  it("render question info", () => {
    setup();

    expect(screen.getByText("Question 1")).toBeInTheDocument();
    expect(screen.getByText("Which game features the character 'Master Chief'?")).toBeInTheDocument();
  });

  it("render question choices", () => {
    setup();

    const choice1 = screen.getByRole("button", { name: "Halo" });
    const choice2 = screen.getByRole("button", { name: "Call of Duty" });
    const choice3 = screen.getByRole("button", { name: "Gears of War" });
    const choice4 = screen.getByRole("button", { name: "Overwatch" });

    expect(choice1).toBeInTheDocument();
    expect(choice2).toBeInTheDocument();
    expect(choice3).toBeInTheDocument();
    expect(choice4).toBeInTheDocument();
  });

  it("render close button", () => {
    setup();

    const closeButton = screen.getByRole("button", { name: /close/i });
    expect(closeButton).toBeInTheDocument();
  });

  it("render first question", () => {
    setup();

    const backButton = screen.queryByRole("button", { name: /back/i });
    const nextButton = screen.getByRole("button", { name: /next/i });

    expect(backButton).not.toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  it("render second question", () => {
    setup();

    const nextButton = screen.getByRole("button", { name: /next/i });
    fireEvent.click(nextButton);

    const backButton = screen.getByRole("button", { name: /back/i });

    expect(backButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  it("render third question", () => {
    setup();

    const nextButton = screen.getByRole("button", { name: /next/i });
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);

    const backButton = screen.getByRole("button", { name: /back/i });
    const submitButton = screen.getByRole("button", { name: /submit/i });

    expect(backButton).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it("show confirm panel", () => {
    setup();
    const nextButton = screen.getByRole("button", { name: /next/i });
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);

    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);

    const confirmPanel = screen.getByTestId("quiz-confirm");
    expect(confirmPanel).toBeInTheDocument();
  });
});

// describe("Quiz Flow", () => {
//   const setup = () => {
//     render(
//       <QuizPanel
//         user={userData}
//         questions={questions}
//         passPoints={3}
//         onClose={jest.fn()}
//       />);
//   };


// });