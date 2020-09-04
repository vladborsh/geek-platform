import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule, ListFilterModule } from '@geek-platform/ui';
import { QuizPageComponent } from './quiz-page.component';

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
