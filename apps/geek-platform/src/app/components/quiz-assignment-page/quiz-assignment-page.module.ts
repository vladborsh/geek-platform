import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizAssignmentPageComponent } from './quiz-assignment-page.component';
import { ButtonModule, ListFilterModule } from '@geek-platform/ui';

@NgModule({
  imports: [
    CommonModule,
    ListFilterModule,
    ButtonModule,
  ],
  declarations: [
    QuizAssignmentPageComponent,
  ],
  exports: [
    QuizAssignmentPageComponent,
  ],
})
export class QuizAssignmentPageModule {}
