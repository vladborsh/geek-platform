import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './home-page.component';
import { RouteUrls } from '../../enums/route.enum';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../welcome-page/welcome-page.module').then(m => m.WelcomePageModule),
      },
      {
        path: RouteUrls.QUIZ,
        loadChildren: () => import('../quiz-page/quiz-page.module').then(m => m.QuizPageModule),
      },
      {
        path: `${RouteUrls.QUIZ_RUN}/:quizAssignmentId`,
        loadChildren: () => import('../quiz-run/quiz-run.module').then(m => m.QuizRunModule),
      },
      {
        path: RouteUrls.EDITOR,
        loadChildren: () => import('../editor-page/editor-page.module').then(m => m.EditorPageModule),
      },
      {
        path: RouteUrls.QUIZ_ASSIGNMENT,
        loadChildren: () => import('../quiz-assignment-page/quiz-assignment-page.module').then(m => m.QuizAssignmentPageModule),
      },
      {
        path: RouteUrls.QUIZ_ASSIGNMENT_NEW,
        loadChildren: () => import('../quiz-assignment-create-page/quiz-assignment-create-page.module').then(m => m.QuizAssignmentCreatePageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
