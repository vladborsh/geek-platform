import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentStatus, QuizAssignmentDto, QuizDto, UserDto } from '@geek-platform/api-interfaces';
import { EMPTY, Observable, of, combineLatest, timer, BehaviorSubject, Subject } from 'rxjs';
import { filter, map, switchMap, take, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { UiSizes } from '@geek-platform/ui';
import { QuizAssignmentService } from '../../services/quiz-assignment/quiz-assignment.service';
import { UserService } from '../../services/user/user.service';
import { QuizService } from '../../services/quiz/quiz.service';
import { QuizAssignmentInterface } from '../quiz-assignment-page/config/quiz-assignment.interface';
import { either } from '../../helpers/either.helper';
import { State } from './config/quiz-run.interface';
import { generateState, saveSelectedAnswer, saveSubmittedAnswer } from './quiz-run.helpers';
import { RouteUrls } from '../../enums/route.enum';

@Component({
  selector: 'app-quiz-run',
  templateUrl: './quiz-run.component.html',
  styleUrls: ['./quiz-run.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizRunComponent implements OnInit, OnDestroy {
  public assignment$: Observable<QuizAssignmentInterface>;
  public timingSource$ = new BehaviorSubject<number>(0);
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
    private router: Router,
  ) {}

  ngOnInit(): void {

    timer(0, 1000)
      .pipe(
        takeUntil(this.onDestroy$),
      )
      .subscribe(tick => this.timingSource$.next((tick)));

    this.quizService.fetch$().subscribe();
    this.userService.fetch$().subscribe();
    this.quizAssignmentService.fetch$().subscribe();

    this.assignment$ = this.getAssignment$();

    this.timer$ = this.getTimer$();
    this.questionsCount$ = this.getQuestionsCount$();

    this.setQuizFinishedByTimer$().subscribe();
    this.submitQuizAnswers$().subscribe();
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

  public onQuit(): void {
    this.router.navigate([`${RouteUrls.HOME}/${RouteUrls.QUIZ}`]);
  }

  private getQuestionsCount$(): Observable<number> {
    return this.assignment$
      .pipe(
        filter(data => !!data && !!data.quiz),
        map(data => data.quiz.questions.length),
      );
  }

  private setQuizFinishedByTimer$(): Observable<any> {
    return combineLatest([
        this.assignment$,
        this.timingSource$,
      ])
      .pipe(
        filter(([assignment]) => assignment.startTime !== null && (assignment.timeLimitMs - (Date.now() - assignment.startTime)) <= 0),
        take(1),
        tap(_ => this.state$.next({ ...this.state$.value, isQuizFinished: true })),
        takeUntil(this.onDestroy$),
      );
  }

  private submitQuizAnswers$(): Observable<QuizAssignmentDto> {
    return this.state$
      .pipe(
        filter(state => state.isQuizFinished),
        withLatestFrom(this.assignment$),
        switchMap(([state, assignment ]) =>
          this.quizAssignmentService.finish$(
            assignment._id,
            Object.values(state.questions).map(question => question.submittedAnswer),
          ),
        ),
        take(1),
      );
  }

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
        this.timingSource$,
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
