import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginPageComponent } from '../login-page/login-page.component';
import { HomePageComponent } from '../home-page/home-page.component';
import { WelcomePageComponent } from '../welcome-page/welcome-page.component';
import { QuizePageComponent } from '../quize-page/quize-page.component';
import { EditorPageComponent } from '../editor-page/editor-page.component';
import { HomeGuard } from '../../route/guards/home-guard';
import { RouteUrls } from '../../enums/route.enum';
import { QuizAssignmentPageComponent } from '../../components/quiz-assignment-page/quiz-assignment-page.component';
import { QuizAssignmentCreatePageComponent } from '../../components/quiz-assignment-create-page/quiz-assignment-create-page.component';

const routes: Routes = [
  { path: '', component: LoginPageComponent },
  {
    path: 'home',
    component: HomePageComponent,
    canActivate: [HomeGuard],
    children: [
      {
        path: '',
        component: WelcomePageComponent,
      },
      {
        path: RouteUrls.QUIZ,
        component: QuizePageComponent,
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
