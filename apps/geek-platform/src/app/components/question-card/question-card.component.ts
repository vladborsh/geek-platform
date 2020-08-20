import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
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
  @Output() selected = new EventEmitter<number>();
  @Output() submitted = new EventEmitter<number>();

  public headerSize = UiSizes.X_SMALL;
  public selectedAnswer: number;
  public isSelected = false;

  public onSelected(selectedAnswer: number): void {
    this.isSelected = true;
    this.selectedAnswer = selectedAnswer;
    this.selected.emit(selectedAnswer);
  }

  public onSubmit(): void {
    this.submitted.emit(this.selectedAnswer);
  }
}
