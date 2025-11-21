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
  id: string;                 // MongoDB ObjectId (string form)
  answers: UserQuizAnswer[];
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

export interface Quiz {
  _id: string;
  name: string;
  description: string;
  image: string;
  passPoint: number;
  questions: Question[];
}