import { State } from './quiz-editor.component';
import { QuestionDto } from '@geek-platform/api-interfaces';

export function changeQuizName(state: State, text: string): State {
  return {
    quiz: {
      ...state.quiz,
      name: text,
    },
  };
}

export function changeQuestion(state: State, question: QuestionDto, index: number): State {
  return {
    quiz: {
      ...state.quiz,
      questions: state.quiz.questions.map((item, i) => (i === index ? question : item)),
    },
  };
}

export function removeQuestion(state: State, index: number): State {
  const newQuestions = state.quiz.questions.filter((_, i) => i !== index);

  return {
    quiz: {
      ...state.quiz,
      questions: newQuestions,
    },
  };
}
