import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuizAssignmentPageComponent } from './quiz-assignment-page.component';

const routes: Routes = [
  {
    path: '',
    component: QuizAssignmentPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizAssignmentPageRoutingModule {}
