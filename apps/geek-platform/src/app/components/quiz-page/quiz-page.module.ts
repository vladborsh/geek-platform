import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizPageComponent } from './quiz-page.component';
import { ButtonModule, ListFilterModule } from '@geek-platform/ui';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    ListFilterModule,
  ],
  declarations: [QuizPageComponent],
  exports: [QuizPageComponent],
})
export class QuizPageModule {}
