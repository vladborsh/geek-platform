import { Component, ChangeDetectionStrategy } from '@angular/core';
import { QuestionDto } from '@geek-platform/api-interfaces';

@Component({
  selector: 'app-quize-page',
  templateUrl: './quize-page.component.html',
  styleUrls: ['./quize-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizePageComponent  {
  public questions: QuestionDto[];

  constructor() {
    this.questions = [
      {
        _id: '5f3a22d1475af5f152c01fd7',
        actualQuestion: 'Do you like JS?',
        answers: ['Yes', 'No', `I don't know exactly.` ],
        correctAnswer: 0,
      },
    ];
  }
}
