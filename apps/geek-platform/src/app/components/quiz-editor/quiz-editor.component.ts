import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { QuizDto, QuestionDto } from '@geek-platform/api-interfaces';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { QuizService } from '../../services/quiz/quiz.service';
import {
  changeQuizName,
  changeQuestion,
  removeQuestion,
  generateState,
  addQuestion,
  dropQuestion,
} from './quiz-editor.helpers';
import { RouteUrls } from '../../enums/route.enum';
import { State } from './quiz-editor.interfaces';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-quiz-editor',
  templateUrl: './quiz-editor.component.html',
  styleUrls: ['./quiz-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizEditorComponent implements OnInit, OnDestroy {
  @Input() set model(quiz: QuizDto) {
    this.state$.next({
      ...this.state$.getValue(),
      quiz: { ...quiz },
    });
  }
  @Output() modelChange = new EventEmitter<QuizDto>();

  public state$ = new BehaviorSubject<State>(generateState());
  private onDestroy$ = new Subject<void>();

  constructor(private quizService: QuizService, private router: Router) {}

   ngOnInit(): void  {
    this.state$.pipe(
      takeUntil(this.onDestroy$),
    ).subscribe(
      data =>  this.modelChange.emit(data.quiz as QuizDto),
    );
   }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

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

  public onDropQuestion(event: CdkDragDrop<string[]>): void {
    this.state$.next(dropQuestion(this.state$.getValue(), event.previousIndex, event.currentIndex));
  }

  public onSaveQuiz(): void {
    this.state$.getValue().quiz._id
      ? this.quizService.update$(this.state$.getValue().quiz as QuizDto).subscribe()
      : this.quizService.create$(this.state$.getValue().quiz as QuizDto).subscribe();

    this.router.navigate([`${RouteUrls.HOME}/${RouteUrls.QUIZ}`]);
  }

  public trackByFunc(i: number): number {
    return i;
  }

}
