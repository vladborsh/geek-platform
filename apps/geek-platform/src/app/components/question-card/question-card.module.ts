import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule, HeaderModule, RadioModule, ButtonModule } from '@geek-platform/ui';
import { QuestionCardComponent } from './question-card.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, CardModule, HeaderModule, RadioModule, FormsModule, ButtonModule],
  declarations: [QuestionCardComponent],
  exports: [QuestionCardComponent],
})
export class QuestionCardModule {}
