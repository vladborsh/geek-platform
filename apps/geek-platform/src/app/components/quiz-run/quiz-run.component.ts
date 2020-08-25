import { Location } from '@angular/common';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssignmentStatus, QuizAssignmentDto, QuizDto, UserDto } from '@geek-platform/api-interfaces';
import { EMPTY, Observable, of, combineLatest } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { QuizAssignmentService } from '../../services/quiz-assignment/quiz-assignment.service';
import { UserService } from '../../services/user/user.service';
import { QuizService } from '../../services/quiz/quiz.service';
import { QuizAssignmentInterface } from '../quiz-assignment-page/config/quiz-assignment.interface';
import { either } from '../../helpers/either.helper';

@Component({
  selector: 'app-quiz-run',
  templateUrl: './quiz-run.component.html',
  styleUrls: ['./quiz-run.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizRunComponent implements OnInit {
  public assignment$: Observable<QuizAssignmentInterface>;

  constructor(
    private location:  Location,
    private activatedRoute: ActivatedRoute,
    private quizAssignmentService: QuizAssignmentService,
    private userService: UserService,
    private quizService: QuizService,
  ) {}

  ngOnInit(): void {
    this.quizService.fetch$().subscribe();
    this.userService.fetch$().subscribe();
    this.quizAssignmentService.fetch$().subscribe();
    this.assignment$ = this.getQuizAssignmentId$()
      .pipe(
        switchMap(id => this.takeInProgress$(id)),
        switchMap(assignment => this.completeQuizAssignment$(assignment)),
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
