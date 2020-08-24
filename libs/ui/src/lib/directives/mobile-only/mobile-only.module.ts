import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileOnlyDirective } from './mobile-only.directive';

@NgModule({
  declarations: [MobileOnlyDirective],
  imports: [CommonModule],
  exports: [MobileOnlyDirective],
})
export class MobileOnlyModule {}
