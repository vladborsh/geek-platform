import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule, InputSelectModule } from '@geek-platform/ui';
import { QuizAssignmentCreatePageComponent } from './quiz-assignment-create-page.component';
import { QuizAssignmentCreatePageRoutingModule } from './quiz-assignment-create-page-routing.module';

@NgModule({
  imports: [
    QuizAssignmentCreatePageRoutingModule,
    CommonModule,
    FormsModule,
    InputSelectModule,
    ButtonModule,
  ],
  declarations: [
    QuizAssignmentCreatePageComponent,
  ],
})
export class QuizAssignmentCreatePageModule {}
