import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation.component';
import { MobileOnlyModule } from '../mobile-only/mobile-only.module';

@NgModule({
  imports: [CommonModule, RouterModule, MobileOnlyModule],
  declarations: [NavigationComponent],
  exports: [NavigationComponent],
})
export class NavigationModule {}
