import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { QuizDto, QuestionDto } from '@geek-platform/api-interfaces';
import { BehaviorSubject } from 'rxjs';
import {
  changeQuizName,
  changeQuestion,
  removeQuestion,
  generateState,
  addQuestion,
} from './quiz-editor.helpers';

export interface State {
  isVisibleAddButton: boolean;
  isVisibleDeleteButton: boolean;
  quiz: {
    _id?: string;
    name: string;
    questions: Partial<QuestionDto>[];
  };
}

@Component({
  selector: 'app-quiz-editor',
  templateUrl: './quiz-editor.component.html',
  styleUrls: ['./quiz-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizEditorComponent {
  @Input() set model(quiz: QuizDto) {
    this.state$.next({
      ...this.state$.getValue(),
      quiz: {...quiz},
    });
  }
  public state$ = new BehaviorSubject<State>(generateState());

  public onChangeQuizName(text: string): void {
    this.state$.next(changeQuizName(this.state$.getValue(), text));
  }

  public onChangeQuestion(question: QuestionDto, index: number): void {
    this.state$.next(changeQuestion(this.state$.getValue(), question, index));
  }

  public onAddQuestion(): void {
    this.state$.next(addQuestion(this.state$.getValue()));
  }

  public onRemoveQuestion(index: number): void {
    this.state$.next(removeQuestion(this.state$.getValue(), index));
  }

  public onSaveQuiz(): void {}

  public trackByFunc(i: number): number {
    return i;
  }
}