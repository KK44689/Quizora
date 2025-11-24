export interface ProfileInfo {
  firstName: string;
  lastName: string;
  image: string;
  quizPassed: number;
  correctAnswers: number;
  quizHistory?: QuizHistoryItem[];
}

export interface LoginInfo {
  email: string,
  password: string
}

export interface UserQuizAnswer {
  choice: number;
  isCorrect: boolean;
}

export interface QuizHistoryItem {
  quizId: string;
  userId: string;
  answers: UserQuizAnswer[];
  submittedDate: string;
  highscore: string;
  quizStatus: boolean;
}

export interface Choice {
  id: number;
  choice: string;
}

export interface Question {
  id: number;
  question: string;
  choices: Choice[];
  answer: number;
}

export interface QuizInfo {
  _id: string;
  name: string;
  description: string;
  image: string;
  passPoint: number;
  questions: Question[];
}

export interface QuizGameplayInfo {
  currentQuestionId: number;
  quizLength: number;
}