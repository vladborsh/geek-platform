import { State } from './config/quiz-run.interface';

export function generateState(): State {
  return {
    currentQuestionIndex: 0,
    isQuizFinished: false,
    questions: {},
  };
}

export function saveSelectedAnswer(state: State, selectedAnswer: number, id: string): State {
  return {
    ...state,
    questions: {
      ...state.questions,
      [id]: {
        ...state.questions[id],
        selectedAnswers: !state.questions[id]?.selectedAnswers ? [selectedAnswer] : [...state.questions[id]?.selectedAnswers, selectedAnswer],
      },
    },
  };
}

export function saveSubmittedAnswer(state: State, submittedAnswer: number, id: string, questionsCount: number): State {
  const currentQuestionIndex = state.currentQuestionIndex + 1 === questionsCount ? state.currentQuestionIndex : state.currentQuestionIndex + 1;

  return {
    ...state,
    isQuizFinished: state.currentQuestionIndex + 1 === questionsCount,
    currentQuestionIndex,
    questions: {
      ...state.questions,
      [id]: {
        ...state.questions[id],
        submittedAnswer,
      },
    },
  };
}
