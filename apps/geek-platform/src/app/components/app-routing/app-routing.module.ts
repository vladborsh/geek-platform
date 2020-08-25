import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from '../login-page/login-page.component';
import { HomePageComponent } from '../home-page/home-page.component';
import { WelcomePageComponent } from '../welcome-page/welcome-page.component';
import { QuizPageComponent } from '../quiz-page/quiz-page.component';
import { EditorPageComponent } from '../editor-page/editor-page.component';
import { HomeGuard } from '../../route/guards/home-guard';
import { RouteUrls } from '../../enums/route.enum';
import { QuizAssignmentPageComponent } from '../../components/quiz-assignment-page/quiz-assignment-page.component';
import { QuizAssignmentCreatePageComponent } from '../../components/quiz-assignment-create-page/quiz-assignment-create-page.component';
import { QuizRunComponent } from '../../components/quiz-run/quiz-run.component';

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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
