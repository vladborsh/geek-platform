import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from '@geek-platform/ui';
import { QuestionCardComponent } from './question-card.component';

@NgModule({
  imports: [CommonModule, CardModule],
  declarations: [QuestionCardComponent],
  exports: [QuestionCardComponent],
})
export class QuestionCardModule {}
