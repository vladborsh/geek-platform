import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from '../login-page/login-page.component';
import { HomeGuard } from '../../route/guards/home-guard';

const routes: Routes = [
  { path: '', component: LoginPageComponent },
  {
    path: 'home',
    loadChildren: () => import('../home-page/home-page.module').then(m => m.HomePageModule),
    canActivate: [HomeGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
