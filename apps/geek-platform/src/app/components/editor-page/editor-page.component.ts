import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, take, debounceTime, filter, takeUntil } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { QuizDto } from '@geek-platform/api-interfaces';
import { QuizService } from '../../services/quiz/quiz.service';

@Component({
  selector: 'app-editor-page',
  templateUrl: './editor-page.component.html',
  styleUrls: ['./editor-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorPageComponent implements OnInit, OnDestroy {
  public quiz$ = new BehaviorSubject<QuizDto>(null);
  public quizCache$ = new BehaviorSubject<QuizDto>(null);
  private debounceTime = 300;
  private onDestroy$ = new Subject<void>();

  constructor(private activatedRoute: ActivatedRoute, private quizService: QuizService) {}

  ngOnInit(): void {
    this.getQuiz()
      .subscribe((quiz: QuizDto) => {
        this.quiz$.next(quiz);
        this.quizCache$.next(quiz);
      });
    this.sendQuiz().subscribe();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public onChangeQuiz(quiz: QuizDto): void {
    this.quizCache$.next(quiz);
  }

  private getQuizId$(): Observable<string> {
    return this.activatedRoute
      .params
      .pipe(
        map(params => params.quizId),
      );
  }

  private getQuiz(): Observable<unknown> {
    return this.getQuizId$()
      .pipe(
        switchMap(quizId => this.quizService.getById$(quizId)),
        filter(Boolean),
        take(1),
      );
  }

  private sendQuiz(): Observable<QuizDto> {
    return this.quizCache$
      .pipe(
        filter(quiz => !!quiz && !!quiz._id),
        debounceTime(this.debounceTime),
        switchMap(data => this.quizService.update$(data)),
        takeUntil(this.onDestroy$),
      );
  }
}
