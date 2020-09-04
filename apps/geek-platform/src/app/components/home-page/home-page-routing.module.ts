import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './home-page.component';
import { WelcomePageComponent } from '../welcome-page/welcome-page.component';
import { QuizPageComponent } from '../quiz-page/quiz-page.component';
import { RouteUrls } from '../../enums/route.enum';
import { QuizRunComponent } from '../quiz-run/quiz-run.component';
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
        component: WelcomePageComponent,
      },
      {
        path: RouteUrls.QUIZ,
        component: QuizPageComponent,
      },
      {
        path: `${RouteUrls.QUIZ_RUN}/:quizAssignmentId`,
        component: QuizRunComponent,
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