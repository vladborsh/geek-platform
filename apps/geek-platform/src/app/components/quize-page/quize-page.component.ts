import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz/quiz.service';

@Component({
  selector: 'app-quize-page',
  templateUrl: './quize-page.component.html',
  styleUrls: ['./quize-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizePageComponent implements OnInit {
  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.quizService.fetch$().subscribe();
  }
}
