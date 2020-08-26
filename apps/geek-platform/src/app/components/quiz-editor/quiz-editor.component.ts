import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { QuizDto } from '@geek-platform/api-interfaces';
import { BehaviorSubject } from 'rxjs';

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

  public onAdd(): void {
  }

  public trackByFunc(i: number): number {
    return i;
  }

}
