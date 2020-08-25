import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { QuestionDto } from '@geek-platform/api-interfaces';
import { BehaviorSubject } from 'rxjs';

interface State {
  question: QuestionDto;
  isVisibleAddButton: boolean;
  isVisibleDeleteButton: boolean;
}

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
  private MAX_ANSWERS_COUNT = 6;
  private MIN_ANSWERS_COUNT = 3;

  ngOnInit(): void {
    this.state$ = new BehaviorSubject<State>({
      question: this.model,
      isVisibleAddButton: this.model.answers.length < this.MAX_ANSWERS_COUNT,
      isVisibleDeleteButton: this.model.answers.length > this.MIN_ANSWERS_COUNT,
    });
  }

  public changeAnswer(value: string, index: number): void {
    const state = this.state$.getValue();
    const newAnswers = state.question.answers;
    newAnswers[index] = value;

    this.state$.next({
      ...state,
      question: {
        ...state.question,
        answers: newAnswers,
      },
    });
  }
  public changeActualQuestion(value: string): void {
    const state = this.state$.getValue();
    this.state$.next({
      ...state,
      question: {
        ...state.question,
        actualQuestion: value,
      },
    });
  }

  public onDelete(index: number): void {
    const state = this.state$.getValue();
    const newAnswers = state.question.answers.filter((_, i) => i !== index);

    this.state$.next({
      ...state,
      isVisibleDeleteButton: newAnswers.length > this.MIN_ANSWERS_COUNT,
      isVisibleAddButton: newAnswers.length < this.MAX_ANSWERS_COUNT,
      question: {
        ...state.question,
        answers: newAnswers,
      },
    });
  }

  public onAdd(): void {
    const state = this.state$.getValue();
    const newAnswers = state.question.answers;
    newAnswers.push('');

    this.state$.next({
      ...state,
      isVisibleDeleteButton: newAnswers.length > this.MIN_ANSWERS_COUNT,
      isVisibleAddButton: newAnswers.length < this.MAX_ANSWERS_COUNT,
      question: {
        ...state.question,
        answers: newAnswers,
      },
    });
  }

  public onChange(): void {
    this.modelChange.emit(this.state$.getValue().question);
  }
}
