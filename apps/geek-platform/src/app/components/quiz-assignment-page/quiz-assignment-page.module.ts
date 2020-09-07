import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule, ListFilterModule } from '@geek-platform/ui';
import { QuizAssignmentPageComponent } from './quiz-assignment-page.component';
import { QuizAssignmentPageRoutingModule } from './quiz-assignment-page-routing.module';

@NgModule({
  imports: [
    QuizAssignmentPageRoutingModule,
    CommonModule,
    ListFilterModule,
    ButtonModule,
  ],
  declarations: [
    QuizAssignmentPageComponent,
  ],
})
export class QuizAssignmentPageModule {}
