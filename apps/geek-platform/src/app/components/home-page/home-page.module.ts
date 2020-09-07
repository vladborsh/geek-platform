import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule, NavigationModule } from '@geek-platform/ui';
import { HomePageComponent } from './home-page.component';
import { HomePageRoutingModule } from './home-page-routing.module';

@NgModule({
  declarations: [HomePageComponent],
  imports: [HomePageRoutingModule, CommonModule, ButtonModule, NavigationModule],
})
export class HomePageModule {}
