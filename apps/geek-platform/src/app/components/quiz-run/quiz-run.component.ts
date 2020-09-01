import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssignmentStatus, QuizAssignmentDto, QuizDto, UserDto } from '@geek-platform/api-interfaces';
import { EMPTY, Observable, of, combineLatest, timer, BehaviorSubject, Subject } from 'rxjs';
import { filter, map, switchMap, take, takeUntil, withLatestFrom } from 'rxjs/operators';
import { UiSizes } from '@geek-platform/ui';
import { QuizAssignmentService } from '../../services/quiz-assignment/quiz-assignment.service';
import { UserService } from '../../services/user/user.service';
import { QuizService } from '../../services/quiz/quiz.service';
import { QuizAssignmentInterface } from '../quiz-assignment-page/config/quiz-assignment.interface';
import { either } from '../../helpers/either.helper';
import { State } from './config/quiz-run.interface';
import { generateState, saveSelectedAnswer, saveSubmittedAnswer } from './quiz-run.helpers';

@Component({
  selector: 'app-quiz-run',
  templateUrl: './quiz-run.component.html',
  styleUrls: ['./quiz-run.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizRunComponent implements OnInit, OnDestroy {
  public assignment$: Observable<QuizAssignmentInterface>;
  public timer$: Observable<number>;
  public headerSizeMedium = UiSizes.MEDIUM;
  public headerSizeSmall = UiSizes.SMALL;
  public state$: BehaviorSubject<State> = new BehaviorSubject(generateState());
  private questionsCount$: Observable<number>;
  private onDestroy$ = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private quizAssignmentService: QuizAssignmentService,
    private userService: UserService,
    private quizService: QuizService,
  ) {}

  ngOnInit(): void {
    this.quizService.fetch$().subscribe();
    this.userService.fetch$().subscribe();
    this.quizAssignmentService.fetch$().subscribe();
    this.assignment$ = this.getAssignment$();

    this.timer$ = this.getTimer$();

    this.questionsCount$ = this.assignment$
      .pipe(
        filter(data => !!data && !!data.quiz),
        map(data => data.quiz.questions.length),
      );

    this.timer$
      .pipe(
        filter(tick => tick <= 0),
        switchMap(() => this.state$),
        take(1),
        takeUntil(this.onDestroy$),
      )
      .subscribe(state => this.state$.next({ ...state, isQuizFinished: true }));

    this.state$
      .pipe(
        filter(state => state.isQuizFinished),
        switchMap(() => this.assignment$),
        switchMap(assignment => this.quizAssignmentService.stop$(assignment._id)),
        take(1),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public onSaveSelectedAnswer(number: number, id: string): void {
    this.state$.next(saveSelectedAnswer(this.state$.getValue(), number, id));
  }

  public onSaveSubmittedAnswer(number: number, id: string): void {
    this.questionsCount$
      .pipe(
        withLatestFrom(this.state$),
        take(1),
      )
      .subscribe(
        ([count, state]) => this.state$.next(saveSubmittedAnswer(state, number, id, count)),
      );
  }

  public submitQuizAnswers(): void {}

  private getAssignment$(): Observable<QuizAssignmentInterface> {
    return this.getQuizAssignmentId$()
      .pipe(
        switchMap(id => this.takeInProgress$(id)),
        switchMap(assignment => this.completeQuizAssignment$(assignment)),
      );
  }

  private getTimer$(): Observable<number> {
    return combineLatest([
        this.assignment$,
        timer(0, 1000),
      ])
      .pipe(
        filter(([assignment]) => assignment.startTime !== null),
        map(([assignment]) => assignment.timeLimitMs - (Date.now() - assignment.startTime)),
      );
  }

  private getQuizAssignmentId$(): Observable<string> {
    return this.activatedRoute
      .params
      .pipe(
        map(params => params.quizAssignmentId),
      );
  }

  private takeInProgress$(quizAssignmentId: string): Observable<QuizAssignmentDto> {
    return this.quizAssignmentService.getById$(quizAssignmentId)
      .pipe(
        filter(Boolean),
        take(1),
        switchMap((quizAssignment: QuizAssignmentDto) =>
          either(
            () => quizAssignment.status === AssignmentStatus.IN_PROGRESS,
            () => of(quizAssignment),
            () => either(
              () => quizAssignment.status === AssignmentStatus.ASSIGNED,
              () => this.quizAssignmentService.start$(quizAssignmentId),
              () => EMPTY,
            ),
          ),
        ),
      );
  }

  private completeQuizAssignment$(assignment: QuizAssignmentDto): Observable<QuizAssignmentInterface> {
    return combineLatest([
      this.userService.getById$(assignment.assignedToId)
        .pipe(
          filter(Boolean),
        ),
      this.quizService.getById$(assignment.quizId)
        .pipe(
          filter(Boolean),
        ),
    ])
    .pipe(
      map(([assignedTo, quiz]: [UserDto, QuizDto]) => ({ ...assignment, assignedTo, quiz })),
    );
  }
}
