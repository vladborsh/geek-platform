import { Component, ChangeDetectionStrategy, Input, Output } from '@angular/core';
import { QuestionDto } from '@geek-platform/api-interfaces';
import { UiSizes } from '@geek-platform/ui';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionCardComponent {
  @Input() question: QuestionDto;
  public current: string;
  @Output() selected: string;
  @Output() submitted: string;

  public headerSize = UiSizes.X_SMALL;

  public onSelected(selectedAnswer: string): void {
    this.selected = selectedAnswer;
  }

  public onSubmit(): void {
    this.submitted = this.selected;
  }
}
