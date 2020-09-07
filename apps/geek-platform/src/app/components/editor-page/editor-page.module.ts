import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '@geek-platform/ui';
import { EditorPageComponent } from './editor-page.component';
import { EditorPageRoutingModule } from './editor-page-routing.module';
import { QuizEditorModule } from '../quiz-editor/quiz-editor.module';

@NgModule({
  declarations: [EditorPageComponent],
  imports: [EditorPageRoutingModule, CommonModule, ButtonModule, QuizEditorModule],
})
export class EditorPageModule {}
