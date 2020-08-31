import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssignmentStatus, QuizAssignmentDto, QuizDto, UserDto } from '@geek-platform/api-interfaces';
import { EMPTY, Observable, of, combineLatest, timer, BehaviorSubject } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';
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
export class QuizRunComponent implements OnInit {
  public assignment$: Observable<QuizAssignmentInterface>;
  public timer$: Observable<number>;
  public quizNameSize = UiSizes.MEDIUM;
  public state$: BehaviorSubject<State> = new BehaviorSubject(generateState());
  private questionsCount = 0;

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
    this.assignment$.subscribe(data => this.questionsCount = data.quiz.questions.length);
  }

  public onSaveSelectedAnswer(number: number, id: string): void {
    this.state$.next(saveSelectedAnswer(this.state$.getValue(), number, id));
  }

  public onSaveSubmittedAnswer(number: number, id: string): void {
    this.state$.next(saveSubmittedAnswer(this.state$.getValue(), number, id, this.questionsCount));
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
        timer(0, 1000),
      ])
      .pipe(
        map(([assignment, time]) => assignment.createdDate + (time * 1000)),
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
