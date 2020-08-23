import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { QuizDto } from '@geek-platform/api-interfaces';
import { Observable } from 'rxjs';
import { QuizService } from '../../services/quiz/quiz.service';

function filterFiledFunc(item: QuizDto): string {
  return `${item.name}`;
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
  ) {}

  ngOnInit(): void {
    this.items$ = this.quizService.get$();
    this.quizService.fetch$().subscribe();
  }
}
