import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './home-page.component';
import { RouteUrls } from '../../enums/route.enum';
import { EditorPageComponent } from '../editor-page/editor-page.component';
import { QuizAssignmentPageComponent } from '../quiz-assignment-page/quiz-assignment-page.component';
import { QuizAssignmentCreatePageComponent } from '../quiz-assignment-create-page/quiz-assignment-create-page.component';

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
        component: EditorPageComponent,
      },
      {
        path: RouteUrls.QUIZ_ASSIGNMENT,
        component: QuizAssignmentPageComponent,
      },
      {
        path: RouteUrls.QUIZ_ASSIGNMENT_NEW,
        component: QuizAssignmentCreatePageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
