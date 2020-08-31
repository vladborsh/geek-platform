import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule, HeaderModule } from '@geek-platform/ui';
import { QuizRunComponent } from './quiz-run.component';
import { QuestionCardModule } from '../question-card/question-card.module';
import { FormatTimerDownPipeModule } from '../../pipes/format-timer-down/format-timer-down.module';

@NgModule({
  imports: [CommonModule, QuestionCardModule, HeaderModule, ButtonModule, FormatTimerDownPipeModule],
  declarations: [QuizRunComponent],
  exports: [QuizRunComponent],
})
export class QuizRunModule {}
