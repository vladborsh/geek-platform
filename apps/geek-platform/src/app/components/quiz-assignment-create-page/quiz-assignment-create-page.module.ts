import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizAssignmentCreatePageComponent } from './quiz-assignment-create-page.component';
import { ButtonModule, InputSelectModule } from '@geek-platform/ui';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    InputSelectModule,
    ButtonModule,
  ],
  declarations: [
    QuizAssignmentCreatePageComponent,
  ],
  exports: [
    QuizAssignmentCreatePageComponent,
  ],
})
export class QuizAssignmentCreatePageModule {}
