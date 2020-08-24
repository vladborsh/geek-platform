import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation.component';
import { MobileOnlyModule } from '../../directives/mobile-only/mobile-only.module';
import { DesktopOnlyModule } from '../../directives/desktop-only/desktop-only.module';

@NgModule({
  imports: [CommonModule, RouterModule, MobileOnlyModule, DesktopOnlyModule],
  declarations: [NavigationComponent],
  exports: [NavigationComponent],
})
export class NavigationModule {}
