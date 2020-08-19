import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { QuestionDto } from '@geek-platform/api-interfaces';

import { QuizService } from '../../services/quiz/quiz.service';

@Component({
  selector: 'app-quize-page',
  templateUrl: './quize-page.component.html',
  styleUrls: ['./quize-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizePageComponent implements OnInit {
  public questions: QuestionDto[];

  constructor(private quizService: QuizService) {
    this.questions = [
      {
        _id: '',
        actualQuestion: '',
        answers: [''],
        correctAnswer: 0,
      },
    ];
  }

  ngOnInit(): void {
    this.getQuestions();
  }

  private getQuestions(): void {
    this.quizService.getQuizzes$().subscribe(quizzes => (this.questions = quizzes[0].questions));
  }
}
