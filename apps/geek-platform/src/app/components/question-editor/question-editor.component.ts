import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { QuestionDto } from '@geek-platform/api-interfaces';
import { BehaviorSubject } from 'rxjs';

interface State {
  question: QuestionDto;
  isVisibleAddButton: boolean;
  isVisibleDeleteButton: boolean;
}

const MAX_ANSWERS_COUNT = 6;
const MIN_ANSWERS_COUNT = 3;

@Component({
    selector: 'app-question-editor',
    templateUrl: './question-editor.component.html',
    styleUrls: ['./question-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionEditorComponent implements OnInit {
  @Input() model: QuestionDto;
  @Output() modelChange = new EventEmitter<QuestionDto>();
  public state$: BehaviorSubject<State>;

  ngOnInit(): void {
    this.state$ = new BehaviorSubject<State>({
      question: this.model,
      isVisibleAddButton: this.model.answers.length < MAX_ANSWERS_COUNT,
      isVisibleDeleteButton: this.model.answers.length > MIN_ANSWERS_COUNT,
    });
    this.state$.subscribe(data => this.modelChange.emit(data.question));
  }

  public onChangeAnswer(text: string, index: number): void {
    this.state$.next(changeAnswer(this.getState(), text, index));
  }

  public onChangeCorrectAnswer(number: number): void {
    this.state$.next(changeCorrectAnswer(this.getState(), number));
  }

  public onChangeActualQuestion(text: string): void {
    this.state$.next(changeActualQuestion(this.getState(), text));
  }

  public onRemove(index: number): void {
    this.state$.next(removeAnswer(this.getState(), index));
  }

  public onAdd(): void {
    this.state$.next(addAnswer(this.getState()));
  }

  public trackByFunc(i: number): number {
    return i;
  }

  private getState(): State {
    return this.state$.getValue();
  }
}

function changeAnswer(state: State, text: string, index: number): State {
  return {
    ...state,
    question: {
      ...state.question,
      answers: state.question.answers.map((item, i) => i === index ? text : item),
    },
  };
}

function changeCorrectAnswer(state: State, number: number): State {
  return {
    ...state,
    question: {
      ...state.question,
      correctAnswer: number,
    },
  };
}

function changeActualQuestion(state: State, text: string): State {
  return {
    ...state,
    question: {
      ...state.question,
      actualQuestion: text,
    },
  };
}

function removeAnswer(state: State, index: number): State {
  const newAnswers = state.question.answers.filter((_, i) => i !== index);

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

function addAnswer(state: State): State {
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
