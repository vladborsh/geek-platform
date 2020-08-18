import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorPageComponent } from './editor-page.component';
import { ButtonModule } from '@geek-platform/ui';

@NgModule({
  declarations: [EditorPageComponent],
  imports: [CommonModule, ButtonModule],
  exports: [EditorPageComponent],
})
export class EditorPageModule {}
