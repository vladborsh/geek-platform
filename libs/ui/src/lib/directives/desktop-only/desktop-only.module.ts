import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesktopOnlyDirective } from './desktop-only.directive';

@NgModule({
  declarations: [DesktopOnlyDirective],
  imports: [CommonModule],
  exports: [DesktopOnlyDirective],
})
export class DesktopOnlyModule {}
