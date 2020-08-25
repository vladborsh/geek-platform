import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizRunComponent } from './quiz-run.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    QuizRunComponent,
  ],
  exports: [
    QuizRunComponent,
  ],
})
export class QuizRunModule {}
