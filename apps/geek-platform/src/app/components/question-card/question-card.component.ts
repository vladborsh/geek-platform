import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { QuestionDto } from '@geek-platform/api-interfaces';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionCardComponent {
  @Input() question: QuestionDto;

}
