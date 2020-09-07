import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatorPageComponent } from './creator-page.component';

const routes: Routes = [
  {
    path: '',
    component: CreatorPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatorPageRoutingModule {}
