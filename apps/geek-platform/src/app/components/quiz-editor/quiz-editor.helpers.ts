import { State } from './quiz-editor.component';
import { QuestionDto } from '@geek-platform/api-interfaces';

const MIN_COUNT_QUESTIONS = 1;
const MAX_COUNT_QUESTIONS = 50;
const DEFAULT_COUNT_QUESTIONS = 3;

function generateQuestion(number: number): Partial<QuestionDto> {
  return {
    answers: ['Answer 1', 'Answer 2', 'Answer 3'],
    actualQuestion: `Question ${number}`,
    correctAnswer: 0,
  };
}

function generateQuestions(): Partial<QuestionDto>[] {
  const defaultQuestions: Partial<QuestionDto>[] = [];

  for (let i = 0; i < DEFAULT_COUNT_QUESTIONS; i++) {
    defaultQuestions.push(generateQuestion(i + 1));
  }

  return defaultQuestions;
}

export function generateState(): State {
  return {
    isVisibleAddButton: true,
    isVisibleDeleteButton: true,
    quiz: {
      name: 'Quiz name',
      questions: generateQuestions(),
    },
  };
}

export function changeQuizName(state: State, text: string): State {
  return {
    ...state,
    quiz: {
      ...state.quiz,
      name: text,
    },
  };
}

export function changeQuestion(state: State, question: QuestionDto, index: number): State {
  return {
    ...state,
    quiz: {
      ...state.quiz,
      questions: state.quiz.questions.map((item, i) => (i === index ? question : item)),
    },
  };
}

export function addQuestion(state: State): State {
  const newQuestions = [...state.quiz.questions, generateQuestion(state.quiz.questions.length + 1)];

  return {
    isVisibleDeleteButton: newQuestions.length > MIN_COUNT_QUESTIONS,
    isVisibleAddButton: newQuestions.length < MAX_COUNT_QUESTIONS,
    quiz: {
      ...state.quiz,
      questions: newQuestions,
    },
  };
}

export function removeQuestion(state: State, index: number): State {
  const newQuestions = state.quiz.questions.filter((_, i) => i !== index);

  return {
    isVisibleDeleteButton: newQuestions.length > MIN_COUNT_QUESTIONS,
    isVisibleAddButton: newQuestions.length < MAX_COUNT_QUESTIONS,
    quiz: {
      ...state.quiz,
      questions: newQuestions,
    },
  };
}
