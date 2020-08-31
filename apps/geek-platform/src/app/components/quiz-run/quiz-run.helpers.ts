import { State } from './config/quiz-run.interface';

export function generateState(): State {
  return {
    currentQuestionIndex: 0,
    isQuizFinished: false,
    questions: {},
  };
}

export function saveSelectedAnswer(state: State, number: number, id: string): State {
  return {
    ...state,
    questions: {
      ...state.questions,
      [id]: {
        ...state.questions[id],
        selectedAnswers: !state.questions[id]?.selectedAnswers ? [number] : [...state.questions[id]?.selectedAnswers, number],
      },
    },
  };
}

export function saveSubmittedAnswer(state: State, number: number, id: string, questionCount: number): State {
  const currentQuestionIndex = state.currentQuestionIndex + 1 === questionCount ? state.currentQuestionIndex : state.currentQuestionIndex + 1;

  return {
    ...state,
    isQuizFinished: state.currentQuestionIndex + 1 === questionCount,
    currentQuestionIndex,
    questions: {
      ...state.questions,
      [id]: {
        ...state.questions[id],
        submittedAnswer: number,
      },
    },
  };
}
