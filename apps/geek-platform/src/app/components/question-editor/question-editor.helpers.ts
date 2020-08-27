import { QuestionDto } from '@geek-platform/api-interfaces';
import { State } from './question-editor.component';
import { moveItemInArray } from '@angular/cdk/drag-drop';

const MAX_ANSWERS_COUNT = 6;
const MIN_ANSWERS_COUNT = 3;

export function initState(model: QuestionDto): State {
  return {
    question: model,
    isVisibleAddButton: model?.answers.length < MAX_ANSWERS_COUNT,
    isVisibleDeleteButton: model?.answers.length > MIN_ANSWERS_COUNT,
  };
}

export function changeAnswer(state: State, text: string, index: number): State {
  return {
    ...state,
    question: {
      ...state.question,
      answers: state.question.answers.map((item, i) => i === index ? text : item),
    },
  };
}

export function changeCorrectAnswer(state: State, number: number): State {
  return {
    ...state,
    question: {
      ...state.question,
      correctAnswer: number,
    },
  };
}

export function changeActualQuestion(state: State, text: string): State {
  return {
    ...state,
    question: {
      ...state.question,
      actualQuestion: text,
    },
  };
}

export function removeAnswer(state: State, index: number): State {
  const newAnswers = state.question.answers.filter((_, i) => i !== index);

  return {
    ...state,
    isVisibleDeleteButton: newAnswers.length > MIN_ANSWERS_COUNT,
    isVisibleAddButton: newAnswers.length < MAX_ANSWERS_COUNT,
    question: {
      ...state.question,
      answers: newAnswers,
      correctAnswer: state.question.correctAnswer + 1 > newAnswers.length ? 0 : state.question.correctAnswer,
    },
  };
}

export function addAnswer(state: State): State {
  const newAnswers = [ ...state.question.answers, ''];

  return {
    ...state,
    isVisibleDeleteButton: newAnswers.length > MIN_ANSWERS_COUNT,
    isVisibleAddButton: newAnswers.length < MAX_ANSWERS_COUNT,
    question: {
      ...state.question,
      answers: newAnswers,
    },
  };
}

export function dropAnswer(state: State, previousIndex: number, currentIndex: number): State {
  const newAnswers = [...state.question.answers];
  moveItemInArray(newAnswers, previousIndex, currentIndex);

  return {
    ...state,
    question: {
      ...state.question,
      answers: newAnswers,
    },
  };
}
