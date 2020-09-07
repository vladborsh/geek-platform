import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditorPageComponent } from './editor-page.component';

const routes: Routes = [
  {
    path: '',
    component: EditorPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditorPageRoutingModule {}
