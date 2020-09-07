import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuizRunComponent } from './quiz-run.component';

const routes: Routes = [
  {
    path: '',
    component: QuizRunComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizRunRoutingModule {}
