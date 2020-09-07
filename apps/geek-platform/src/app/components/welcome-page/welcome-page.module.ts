import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '@geek-platform/ui';
import { WelcomePageComponent } from './welcome-page.component';
import { WelcomePageRoutingModule } from './welcome-page-routing.module';

@NgModule({
  declarations: [WelcomePageComponent],
  imports: [WelcomePageRoutingModule, CommonModule, ButtonModule],
})
export class WelcomePageModule {}
