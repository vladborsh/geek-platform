import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuizAssignmentCreatePageComponent } from './quiz-assignment-create-page.component';

const routes: Routes = [
  {
    path: '',
    component: QuizAssignmentCreatePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizAssignmentCreatePageRoutingModule {}
