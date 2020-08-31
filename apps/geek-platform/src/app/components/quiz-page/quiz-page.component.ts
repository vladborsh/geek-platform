import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentStatus, QuizAssignmentDto, QuizDto } from '@geek-platform/api-interfaces';
import { Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { RouteUrls } from '../../enums/route.enum';
import { AuthService } from '../../services/auth/auth.service';
import { QuizAssignmentService } from '../../services/quiz-assignment/quiz-assignment.service';
import { QuizService } from '../../services/quiz/quiz.service';
import { createQuizAssignmentDefaults } from '../../helpers/create-quiz-assignment-defaults.helper';
import { either } from '../../helpers/either.helper';

function filterFiledFunc(item: QuizDto): string {
  return `${item.name}`;
}

function findMyAssignment(list: QuizAssignmentDto[], userId: string, quizId: string): QuizAssignmentDto | undefined {
  return list.find(assignment =>
    assignment.assignedToId === userId
    && assignment.quizId === quizId
    && assignment.status === AssignmentStatus.ASSIGNED,
  );
}

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizPageComponent implements OnInit {
  public items$: Observable<QuizDto[]>;
  public filterFiledFunc = filterFiledFunc;

  constructor(
    private quizService: QuizService,
    private authService: AuthService,
    private quizAssignmentService: QuizAssignmentService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.items$ = this.quizService.get$();
    this.quizService.fetch$().subscribe();
    this.quizAssignmentService.fetch$().subscribe();
  }

  public onAddQuiz(): void {
    this.router.navigate([`${RouteUrls.HOME}/${RouteUrls.EDITOR}`]);
  }

  public runQuiz(quizId: string): void {
    this.runQuizAssignment$(quizId)
      .subscribe(quizAssignmentId =>
        this.router.navigate([`${RouteUrls.HOME}/${RouteUrls.QUIZ_RUN}/${quizAssignmentId}`]),
      );
  }

  private createNewAssignment$(quizId: string): Observable<QuizAssignmentDto> {
    return this.quizAssignmentService.create$({
      ...createQuizAssignmentDefaults(),
      assignedToId: this.authService.user.id,
      quizId,
    });
  }

  private runQuizAssignment$(quizId: string): Observable<string> {
    return this.quizAssignmentService.get$()
      .pipe(
        take(1),
        switchMap(quizAssignmentList =>
          either(
            () => findMyAssignment(quizAssignmentList, this.authService.user.id, quizId),
            assignment => of(assignment),
            () => this.createNewAssignment$(quizId),
          ),
        ),
        map(quizAssignment => quizAssignment._id),
      );
  }
}
