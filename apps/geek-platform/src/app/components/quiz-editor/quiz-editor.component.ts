import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { QuizDto, QuestionDto } from '@geek-platform/api-interfaces';
import { BehaviorSubject } from 'rxjs';
import { changeQuizName, changeQuestion, removeQuestion } from './quiz-editor.helpers';

export interface State {
  quiz: QuizDto;
}

@Component({
    selector: 'app-quiz-editor',
    templateUrl: './quiz-editor.component.html',
    styleUrls: ['./quiz-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizEditorComponent {
  @Input() set model(quiz: QuizDto) {
    this.state$.next({ quiz });
  }
  public state$ = new BehaviorSubject<State>(null);

  public onChangeQuizName(text: string): void {
    this.state$.next(changeQuizName(this.state$.getValue(), text));
  }

  public onChangeQuestion(question: QuestionDto, index: number): void {
    this.state$.next(changeQuestion(this.state$.getValue(), question, index));
  }

  public onAddQuestion(): void {
  }

  public onRemoveQuestion(index: number): void {
    this.state$.next(removeQuestion(this.state$.getValue(), index));
  }

  public trackByFunc(i: number): number {
    return i;
  }

}
