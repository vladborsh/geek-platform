import { Location } from '@angular/common';
import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { QuizDto, UserDto } from '@geek-platform/api-interfaces';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { map, mapTo, switchMap, takeUntil } from 'rxjs/operators';
import { createQuizAssignmentDefaults } from '../../helpers/create-quiz-assignment-defaults.helper';
import { QuizAssignmentService } from '../../services/quiz-assignment/quiz-assignment.service';
import { QuizService } from '../../services/quiz/quiz.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-quiz-assignment-create-page',
  templateUrl: './quiz-assignment-create-page.component.html',
  styleUrls: ['./quiz-assignment-create-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizAssignmentCreatePageComponent implements OnInit, OnDestroy {
  public users$: Observable<UserDto[]>;
  public quizzes$: Observable<QuizDto[]>;
  public assignVisible$: Observable<boolean>;
  public userId$ = new BehaviorSubject<string>(null);
  public quizId$ = new BehaviorSubject<string>(null);
  public onAssign$ = new Subject<void>();
  public onDestroy$ = new Subject<void>();

  constructor(
    private quizService: QuizService,
    private userService: UserService,
    private quizAssignmentService: QuizAssignmentService,
    private location: Location,
  ) {}

  public userSelectValueMapper = (item: UserDto) => item._id;
  public userSelectLabelMapper = (item: UserDto) => `${item.lastName} ${item.firstName}`;
  public quizSelectValueMapper = (item: QuizDto) => item._id;
  public quizSelectLabelMapper = (item: QuizDto) => item.name;

  ngOnInit(): void {
    this.users$ = this.userService.get$();
    this.quizzes$ = this.quizService.get$();
    this.assignVisible$ = combineLatest([this.userId$, this.quizId$]).pipe(
      map(([userId, quizId]) => !!userId && !!quizId),
    );
    combineLatest([this.userId$, this.quizId$])
      .pipe(
        switchMap(([assignedToId, quizId]) => this.onAssign$.pipe(mapTo([assignedToId, quizId]))),
        switchMap(([assignedToId, quizId]) =>
          this.quizAssignmentService.create$({
            ...createQuizAssignmentDefaults(),
            assignedToId,
            quizId,
          }),
        ),
        takeUntil(this.onDestroy$),
      )
      .subscribe(() => this.location.back());

    this.userService.fetch$();
    this.quizService.fetch$();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public onUserChange(userId: string): void {
    this.userId$.next(userId);
  }

  public onQuizChange(quizId: string): void {
    this.quizId$.next(quizId);
  }

  public onAssign(): void {
    this.onAssign$.next();
  }
}
