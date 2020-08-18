import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizePageComponent } from './quize-page.component';
import { ButtonModule } from '@geek-platform/ui';

@NgModule({
  declarations: [QuizePageComponent],
  imports: [CommonModule, ButtonModule],
  exports: [QuizePageComponent],
})
export class QuizePageModule {}