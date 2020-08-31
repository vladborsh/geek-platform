interface Answer {
  selectedAnswers: number[];
  submittedAnswer: number;
}

export interface State {
  currentQuestionIndex: number;
  isTestFinished: boolean;
  questions: Record<string, Answer>;
}
