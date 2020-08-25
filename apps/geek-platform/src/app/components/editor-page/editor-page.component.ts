import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';
import { QuestionDto } from '@geek-platform/api-interfaces';

@Component({
  selector: 'app-editor-page',
  templateUrl: './editor-page.component.html',
  styleUrls: ['./editor-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorPageComponent {
  public question = {
    answers: ['Yes', 'No', 'I don`t know', 'Ask me later'],
    _id: '5f3f878cc8975e09e7fa9112',
    actualQuestion: 'Do you like potato?',
    correctAnswer: 1,
  };
  constructor(private location: Location) {}

  public goBack(): void {
    this.location.back();
  }

  public modelChange(v: QuestionDto): void {
  }
}
