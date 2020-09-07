import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { QuizDto } from '@geek-platform/api-interfaces';
import { QuizService } from '../../services/quiz/quiz.service';

@Component({
  selector: 'app-editor-page',
  templateUrl: './editor-page.component.html',
  styleUrls: ['./editor-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorPageComponent implements OnInit {
  public quiz$: Observable<QuizDto>;
  constructor(private activatedRoute: ActivatedRoute, private quizService: QuizService) {}

  ngOnInit(): void {
    this.quiz$ = this.getQuiz$();
  }

  private getQuiz$(): Observable<QuizDto> {
    return this.getQuizId$()
      .pipe(
        switchMap(quizId => this.quizService.getById$(quizId)),
      );
  }

  private getQuizId$(): Observable<string> {
    return this.activatedRoute
      .params
      .pipe(
        map(params => params.quizId),
      );
  }
}
