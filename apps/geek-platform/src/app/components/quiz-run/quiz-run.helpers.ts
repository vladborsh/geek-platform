import { State } from './config/quiz-run.interface';

export function generateState(): State {
  return {
    currentQuestionIndex: 0,
    isTestFinished: false,
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

export function saveSubmittedAnswer(state: State, number: number, id: string): State {
  return {
    ...state,
    currentQuestionIndex: state.currentQuestionIndex + 1,
    questions: {
      ...state.questions,
      [id]: {
        ...state.questions[id],
        submittedAnswer: number,
      },
    },
  };
}
