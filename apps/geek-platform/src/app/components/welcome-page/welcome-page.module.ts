import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomePageComponent } from './welcome-page.component';
import { ButtonModule } from '@geek-platform/ui';

@NgModule({
  declarations: [WelcomePageComponent],
  imports: [CommonModule, ButtonModule],
  exports: [WelcomePageComponent],
})
export class WelcomePageModule {}
