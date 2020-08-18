import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from '@geek-platform/ui';

import { HomePageComponent } from './home-page.component';

@NgModule({
  declarations: [HomePageComponent],
  imports: [RouterModule.forRoot([]), CommonModule, ButtonModule],
  exports: [HomePageComponent],
})
export class HomePageModule {}