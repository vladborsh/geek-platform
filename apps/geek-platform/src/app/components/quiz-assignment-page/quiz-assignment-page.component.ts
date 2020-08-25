import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { QuizAssignmentService } from '../../services/quiz-assignment/quiz-assignment.service';
import { UserService } from '../../services/user/user.service';
import { QuizService } from '../../services/quiz/quiz.service';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { QuizAssignmentInterface } from './config/quiz-assignment.interface';
import { Router } from '@angular/router';
import { RouteUrls } from '../../enums/route.enum';

function quizAssignmentFilterFunc({ quiz, assignedTo }: QuizAssignmentInterface): string {
  return `${quiz.name}${assignedTo.firstName}${assignedTo.lastName}`;
}

@Component({
  selector: 'app-quiz-assignment-page',
  templateUrl: './quiz-assignment-page.component.html',
  styleUrls: ['./quiz-assignment-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizAssignmentPageComponent implements OnInit {
  public items$: Observable<QuizAssignmentInterface[]>;
  public filterFiledFunc = quizAssignmentFilterFunc;

  constructor(
    private userService: UserService,
    private quizAssignmentService: QuizAssignmentService,
    private quizService: QuizService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.items$ = combineLatest([
      this.quizAssignmentService.get$(),
      this.quizService.getRecord$(),
      this.userService.getRecord$(),
    ]).pipe(
      map(([quizAssignments, quizzesRecord, usersRecord]) =>
        quizAssignments.map(assignment => ({
          ...assignment,
          assignedTo: usersRecord[assignment.assignedToId],
          quiz: quizzesRecord[assignment.quizId],
        })),
      ),
    );

    this.fetch();
  }

  public createAssignment(): void {
    this.router.navigate([`${RouteUrls.HOME}/${RouteUrls.QUIZ_ASSIGNMENT_NEW}`]);
  }

  private fetch(): void {
    this.quizAssignmentService.fetch$().subscribe();
    this.userService.fetch$().subscribe();
    this.quizService.fetch$().subscribe();
  }
}
