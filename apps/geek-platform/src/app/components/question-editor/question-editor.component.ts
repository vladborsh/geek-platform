import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { QuestionDto } from '@geek-platform/api-interfaces';
import { BehaviorSubject } from 'rxjs';
import * as config from './config';

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
export class QuestionEditorComponent implements OnInit {
  @Input() model: QuestionDto;
  @Output() modelChange = new EventEmitter<QuestionDto>();
  public state$: BehaviorSubject<State>;

  ngOnInit(): void {
    this.state$ = new BehaviorSubject<State>(config.initState(this.model));
    this.state$.subscribe(data => this.modelChange.emit(data.question));
  }

  public onChangeAnswer(text: string, index: number): void {
    this.state$.next(config.changeAnswer(this.state$.getValue(), text, index));
  }

  public onChangeCorrectAnswer(number: number): void {
    this.state$.next(config.changeCorrectAnswer(this.state$.getValue(), number));
  }

  public onChangeActualQuestion(text: string): void {
    this.state$.next(config.changeActualQuestion(this.state$.getValue(), text));
  }

  public onRemove(index: number): void {
    this.state$.next(config.removeAnswer(this.state$.getValue(), index));
  }

  public onAdd(): void {
    this.state$.next(config.addAnswer(this.state$.getValue()));
  }

  public trackByFunc(i: number): number {
    return i;
  }
}
