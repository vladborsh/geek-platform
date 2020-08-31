import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '@geek-platform/ui';
import { EditorPageComponent } from './editor-page.component';
import { QuizEditorModule } from '../quiz-editor/quiz-editor.module';

@NgModule({
  declarations: [EditorPageComponent],
  imports: [CommonModule, ButtonModule, QuizEditorModule],
  exports: [EditorPageComponent],
})
export class EditorPageModule {}
