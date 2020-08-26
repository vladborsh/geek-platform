import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-editor-page',
  templateUrl: './editor-page.component.html',
  styleUrls: ['./editor-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorPageComponent {
  public quiz = {
    _id: '5f3f907353c3bd0fcca900f8',
    name: 'Scala basic',
    questions: [
      {
        answers: ['Yes', 'No'],
        _id: '5f3f907353c3bd0fcca900f9',
        actualQuestion: 'Do you like JS?',
        correctAnswer: 0,
      },
      {
        answers: ['Yes, I do', 'No, I don`t', 'I can', 'I do'],
        _id: '5f3f907353c3bd0fcca900fa',
        actualQuestion: 'Do you like NodeJS?',
        correctAnswer: 0,
      },
      {
        answers: ['Yes, I do', 'No, I don`t', 'I can', 'I do', 'I remember'],
        _id: '5f3f907353c3bd0fcca900fe',
        actualQuestion: 'Do you like asm?',
        correctAnswer: 0,
      },
    ],
  };
  constructor(private location: Location) {}

  public goBack(): void {
    this.location.back();
  }
}
