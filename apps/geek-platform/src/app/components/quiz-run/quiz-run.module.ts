import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderModule } from '@geek-platform/ui';
import { QuizRunComponent } from './quiz-run.component';
import { QuestionCardModule } from '../question-card/question-card.module';

@NgModule({
  imports: [CommonModule, QuestionCardModule, HeaderModule],
  declarations: [QuizRunComponent],
  exports: [QuizRunComponent],
})
export class QuizRunModule {}
