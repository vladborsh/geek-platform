interface Answer {
  selectedAnswers: number[];
  submittedAnswer: number;
}

export interface State {
  currentQuestionIndex: number;
  isQuizFinished: boolean;
  questions: Record<string, Answer>;
}
