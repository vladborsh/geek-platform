import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginPageComponent } from '../login-page/login-page.component';
import { HomePageComponent } from '../home-page/home-page.component';
import { WelcomePageComponent } from '../welcome-page/welcome-page.component';
import { QuizePageComponent } from '../quize-page/quize-page.component';
import { EditorPageComponent } from '../editor-page/editor-page.component';

const routes: Routes = [
  { path: '', component: LoginPageComponent },
  {
    path: 'home',
    component: HomePageComponent,
    children: [
      {
        path: '',
        component: WelcomePageComponent,
      },
      {
        path: 'quize',
        component: QuizePageComponent,
      },
      {
        path: 'editor',
        component: EditorPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
