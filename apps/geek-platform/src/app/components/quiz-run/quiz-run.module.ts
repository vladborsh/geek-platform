import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule, HeaderModule } from '@geek-platform/ui';
import { QuizRunComponent } from './quiz-run.component';
import { QuestionCardModule } from '../question-card/question-card.module';
import { FormatTimeByColonPipeModule } from '../../pipes/format-time-by-colon/format-time-by-colon.module';

@NgModule({
  imports: [CommonModule, QuestionCardModule, HeaderModule, ButtonModule, FormatTimeByColonPipeModule],
  declarations: [QuizRunComponent],
  exports: [QuizRunComponent],
})
export class QuizRunModule {}
