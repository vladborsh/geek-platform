import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorPageComponent } from './editor-page.component';
import { ButtonModule } from '@geek-platform/ui';
import { QuestionEditorModule } from '../question-editor/question-editor.module';

@NgModule({
  declarations: [EditorPageComponent],
  imports: [CommonModule, ButtonModule, QuestionEditorModule],
  exports: [EditorPageComponent],
})
export class EditorPageModule {}
