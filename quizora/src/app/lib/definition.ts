export interface ProfileInfo {
    name: string,
    imageSource: string,
    quizPassed: number,
    correctAnswers: number
}

export interface QuizInfo {
    imageSource: string,
    description: string,
    status: boolean
}