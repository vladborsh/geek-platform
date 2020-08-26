import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { QuestionDto } from '@geek-platform/api-interfaces';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { initState, addAnswer, changeActualQuestion, changeAnswer, changeCorrectAnswer, removeAnswer } from './question-editor.helpers';

export interface State {
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
export class QuestionEditorComponent implements OnInit, OnDestroy {
  @Input() model: QuestionDto;
  @Output() modelChange = new EventEmitter<QuestionDto>();
  public state$ = new BehaviorSubject<State>(initState(this.model));

  private onDestroy$ = new Subject<void>();

  ngOnInit(): void {
    this.state$.pipe(takeUntil(this.onDestroy$)).subscribe(data => this.modelChange.emit(data.question));
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
}
