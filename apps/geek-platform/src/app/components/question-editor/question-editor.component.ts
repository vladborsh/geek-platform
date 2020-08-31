import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { QuestionDto } from '@geek-platform/api-interfaces';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import {
  initState,
  addAnswer,
  changeActualQuestion,
  changeAnswer,
  changeCorrectAnswer,
  removeAnswer,
  dropAnswer,
} from './question-editor.helpers';
import { State } from './question-editor.interfaces';

@Component({
  selector: 'app-question-editor',
  templateUrl: './question-editor.component.html',
  styleUrls: ['./question-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionEditorComponent implements OnInit, OnDestroy {
  @Input() set model(question: QuestionDto) {
    this.state$.next(initState(question));
  }
  @Output() modelChange = new EventEmitter<QuestionDto>();
  public state$ = new BehaviorSubject<State>(null);

  private onDestroy$ = new Subject<void>();

  ngOnInit(): void {
    this.state$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(data => this.modelChange.emit(data.question));
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public onChangeAnswer(text: string, index: number): void {
    this.state$.next(changeAnswer(this.state$.getValue(), text, index));
  }

  public onChangeCorrectAnswer(number: number): void {
    this.state$.next(changeCorrectAnswer(this.state$.getValue(), number));
  }

  public onChangeActualQuestion(text: string): void {
    this.state$.next(changeActualQuestion(this.state$.getValue(), text));
  }

  public onRemove(index: number): void {
    this.state$.next(removeAnswer(this.state$.getValue(), index));
  }

  public onAdd(): void {
    this.state$.next(addAnswer(this.state$.getValue()));
  }

  public trackByFunc(i: number): number {
    return i;
  }

  public onDropAnswer(event: CdkDragDrop<string[]>): void {
    this.state$.next(dropAnswer(this.state$.getValue(), event.previousIndex, event.currentIndex));
  }
}
