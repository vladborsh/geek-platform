import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginPageModule } from '../login-page/login-page.module';
import { HomePageModule } from '../home-page/home-page.module';

const routes: Routes = [
  { path: '', redirectTo: '/home-page', pathMatch: 'full' },
  { path: 'login-page', component: LoginPageModule },
  { path: 'home-page', component: HomePageModule },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
