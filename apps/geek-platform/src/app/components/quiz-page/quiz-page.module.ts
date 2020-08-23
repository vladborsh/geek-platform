import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizPageComponent } from './quiz-page.component';
import { ListFilterModule } from '@geek-platform/ui';

@NgModule({
  imports: [
    CommonModule,
    ListFilterModule,
  ],
  declarations: [QuizPageComponent],
  exports: [QuizPageComponent],
})
export class QuizPageModule {}
